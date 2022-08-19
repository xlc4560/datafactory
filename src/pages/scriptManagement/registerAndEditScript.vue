<template>
  <a-drawer
    :visible="scriptEditDrawer"
    :title="TitleEnum[registerAndEditTitle]"
    width="75vw"
    destroy-on-close
    @after-visible-change="afterClose"
    @close="emits('changeDrawerControlData', { dataName: 'scriptEditDrawer', value: false })"
  >
    <a-form ref="scriptFormRef" :model="currentScriptDetails" :rules="scriptFormRule" :wrapper-col="{ span: 8 }" :label-col="{ span: 2 }">
      <a-form-item label="脚本文件" :extra="`支持上传${FileDataType[registerAndEditTitle]}类型的文件`" class="basicInfo_aEGLg" :name="[2, 3].includes(registerAndEditTitle) ? 'fileList' : ''">
        <a-upload v-model:file-list="currentScriptDetails.fileList" :accept="FileDataType[registerAndEditTitle]" :before-upload="beforeUpload" list-type="picture">
          <a-button v-if="!currentScriptDetails.fileList?.length">
            <upload-outlined></upload-outlined>
            选择文件
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="脚本名称" name="scriptName">
        <a-input v-model:value="currentScriptDetails.scriptName" placeholder="请输入脚本名称" />
      </a-form-item>
      <a-form-item label="脚本分类" name="scriptCategory">
        <a-tree-select
          v-model:value="currentScriptDetails.scriptCategory"
          :tree-data="scriptCategoryData"
          placeholder="请选择脚本分类"
          :field-names="{ label: 'name', value: 'categoryCode' }"
          allow-clear
          :dropdown-style="{ height: '200px' }"
          @dropdown-visible-change="TreeSelectDropDown"
        ></a-tree-select>
      </a-form-item>
      <template v-if="[0, 2].includes(registerAndEditTitle)">
        <a-form-item label="类名" name="scriptClass">
          <a-input v-model:value="currentScriptDetails.scriptClass" placeholder="请输入类名" />
        </a-form-item>
        <a-form-item label="函数名" name="scriptFunction">
          <a-input v-model:value="currentScriptDetails.scriptFunction" placeholder="请输入函数名" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-model:value="currentScriptDetails.scriptDescription" :rows="3" />
        </a-form-item>
      </template>
      <template v-else-if="[1, 3].includes(registerAndEditTitle)">
        <a-form-item label="数据源" name="sourceCode">
          <a-select
            v-model:value="currentScriptDetails.sourceCode"
            :first-active-value="['0']"
            show-search
            placeholder="请选择数据源"
            style="width: 200px"
            :filter-option="filterOption"
            @change="handleChange"
            @search="searchValue"
            @dropdown-visible-change="dataSourceDropDown"
          >
            <a-select-option v-for="item in dataSourceOption" :key="item.dataSourceName" :value="item.id">
              <span v-if="item.dataSourceName.toLocaleLowerCase().indexOf(searchKeyWord.toLocaleLowerCase()) > -1" class="titleName">
                {{ item.dataSourceName.substr(0, item.dataSourceName.toLowerCase().indexOf(searchKeyWord.toLocaleLowerCase())) }}
                <span style="color: rgb(89, 166, 253)">
                  {{ item.dataSourceName.substr(item.dataSourceName.toLowerCase().indexOf(searchKeyWord.toLocaleLowerCase()), searchKeyWord.length) }}
                </span>
                {{ item.dataSourceName.substr(item.dataSourceName.toLowerCase().indexOf(searchKeyWord.toLocaleLowerCase()) + searchKeyWord?.length) }}
              </span>
              <span v-else class="titleName">{{ item.label }}</span>
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </a-form>
    <a-descriptions :column="1">
      <!-- 输入参数 -->
      <a-descriptions-item>
        <scriptTableVue :table-columns="scriptEditInputParameterColumns" data-name="inputParameter" />
      </a-descriptions-item>
      <!-- 输出参数 -->
      <a-descriptions-item>
        <scriptTableVue :table-columns="scriptEditOutputParameterColumns" data-name="outputParameter" table-title="输出参数" />
      </a-descriptions-item>
    </a-descriptions>
    <template #footer>
      <a-row :gutter="16">
        <a-col>
          <a-popconfirm title="确认退出?" ok-text="确定" cancel-text="取消" @confirm="emits('changeDrawerControlData', { dataName: 'scriptEditDrawer', value: false })">
            <a-button>取 消</a-button>
          </a-popconfirm>
        </a-col>
        <a-col>
          <a-popconfirm title="确认提交?" ok-text="确定" cancel-text="取消" @confirm="handleOk">
            <a-button type="primary">确 定</a-button>
          </a-popconfirm>
        </a-col>
      </a-row>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import { FormInstance, message } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadProps } from 'ant-design-vue';
  // 自定义表格组件
  import scriptTableVue from './scriptTable.vue';
  // 获取分类列表api
  import { ReadCategory } from '@/api/category';
  // 脚本新增与编辑api
  import { AddScript, UpdateScript } from '@/api/scriptManagement';
  // 数据源列表api
  import { dbList } from '@/api/dbManagement';
  // 自定义hooks，获取pinia中的数据
  import { registerAndEditTitle, currentScriptDetails, useRun } from './scriptHooks';
  // 自定义表格配置项，以及表单验证规则
  import { scriptEditInputParameterColumns, scriptEditOutputParameterColumns, FileDataType, scriptFormRule } from './data';
  // 自定义title枚举
  import { TitleEnum } from './Enum';
  // 脚本详情类型
  import { ScriptParameterType } from '@/api/scriptManagement/apiReturnType';
  import { cloneDeep } from 'lodash-es';
  const scriptFormRef = ref<FormInstance>();
  const scriptCategoryData = ref<any>();
  const dataSourceOption = ref<any>();
  const beforeUpload: UploadProps['beforeUpload'] = file => {
    currentScriptDetails.value.fileList = [...currentScriptDetails.value.fileList, file];
    return false;
  };
  const afterClose = () => {
    currentScriptDetails.value.fileList = [];
  };
  const props = defineProps({
    scriptEditDrawer: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['changeDrawerControlData']);
  // 分类下拉框 下拉回调
  const TreeSelectDropDown = async (visible: boolean) => {
    if (visible) {
      scriptCategoryData.value = await ReadCategory('脚本分类');
    }
  };
  const handleChange = () => {
    searchKeyWord.value = '';
    // console.log(value);
  };
  const searchValue = (value: string) => {
    searchKeyWord.value = value;
  };
  const searchKeyWord = ref<string>('');
  const filterOption = (input: string, option: any) => {
    return option.key.toLowerCase().indexOf(searchKeyWord.value.toLowerCase()) >= 0;
  };
  const dataSourceDropDown = async (visible: boolean) => {
    if (visible) {
      dataSourceOption.value = (await dbList({})).list;
    }
  };
  watch(
    registerAndEditTitle,
    () => {
      if (currentScriptDetails.value.scriptType === undefined) {
        if ([0, 2].includes(registerAndEditTitle.value)) {
          currentScriptDetails.value.scriptType = 0;
        } else {
          currentScriptDetails.value.scriptType = 1;
        }
      }
    },
    { deep: true },
  );
  // 抽屉确认按钮回调
  const handleOk = async () => {
    try {
      await scriptFormRef.value?.validate();
    } catch (error) {
      message.error('数据校验未通过', 1);
    }
    const params = cloneDeep(currentScriptDetails.value);
    delete params.fileList;
    params.inputParameter?.forEach((item: ScriptParameterType) => {
      delete item.formItemMessage;
      delete item.isEdit;
    });
    params.outputParameter?.forEach((item: ScriptParameterType) => {
      delete item.formItemMessage;
      delete item.isEdit;
      delete item.parameterRequire;
    });
    try {
      const editScriptRes = ref<any>();
      // 0,1 编辑  2,3 新增
      if ([0, 1].includes(registerAndEditTitle.value)) {
        editScriptRes.value = await UpdateScript({ scriptFile: currentScriptDetails.value.fileList[0], scriptJson: JSON.stringify(params) });
      } else {
        editScriptRes.value = await AddScript({ scriptFile: currentScriptDetails.value.fileList[0], scriptJson: JSON.stringify(params) });
      }
      if (!editScriptRes.value?.code) {
        emits('changeDrawerControlData', { dataName: 'scriptEditDrawer', value: false });
      }
      useRun.value();
    } catch (error) {}
  };
</script>

<style scoped lang="less">
  .table_title {
    display: flex;
    justify-content: space-between;
  }

  .basicInfo_aEGLg {
    :deep(.ant-form-item) {
      margin-bottom: 24px !important;
    }
  }

  :deep(.ant-table-wrapper) {
    flex: 1;
  }
</style>
