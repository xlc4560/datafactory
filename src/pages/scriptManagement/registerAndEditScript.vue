<template>
  <a-drawer
    :visible="scriptEditDrawer"
    :title="TitleEnum[registerAndEditTitle]"
    width="75vw"
    @after-visible-change="afterClose"
    @close="emits('changeDrawerControlData', { dataName: 'scriptEditDrawer', value: false })"
  >
    <a-form :wrapper-col="{ span: 8 }" :label-col="{ span: 2 }">
      <a-form-item label="脚本文件" :extra="`支持上传${FileDataType[registerAndEditTitle]}类型的文件`" class="basicInfo_aEGLg">
        <a-upload v-model:file-list="fileList" :accept="FileDataType[registerAndEditTitle]" :before-upload="beforeUpload" list-type="picture">
          <a-button v-if="!fileList?.length">
            <upload-outlined></upload-outlined>
            选择文件
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="脚本名称">
        <a-input v-model:value="currentScriptDetails.scriptName" placeholder="请输入脚本名称" />
      </a-form-item>
      <a-form-item label="脚本分类">
        <a-tree-select
          v-model:value="currentScriptDetails.scriptCategory"
          :tree-data="scriptCategoryData"
          placeholder="请选择接口分类"
          show-search
          :field-names="{ label: 'name', value: 'categoryCode' }"
          allow-clear
          :dropdown-style="{ height: '200px' }"
          @dropdown-visible-change="TreeSelectDropDown"
        ></a-tree-select>
      </a-form-item>
      <template v-if="[0, 2].includes(registerAndEditTitle)">
        <a-form-item label="类名">
          <a-input v-model:value="currentScriptDetails.scriptClass" placeholder="请输入类名" />
        </a-form-item>
        <a-form-item label="函数名">
          <a-input v-model:value="currentScriptDetails.scriptFunction" placeholder="请输入函数名" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-model:value="currentScriptDetails.scriptDescription" :rows="3" />
        </a-form-item>
      </template>
      <template v-else-if="[1, 3].includes(registerAndEditTitle)">
        <a-form-item label="数据源">
          <a-select v-model:value="currentScriptDetails.sourceCode" placeholder="请选择数据源">
            <a-select-option key="1">{{ 'xxxx' }}</a-select-option>
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
        <scriptTableVue :table-columns="scriptEditOutputParameterColumns" data-name="outputParameter" />
      </a-descriptions-item>
    </a-descriptions>
    <template #footer>
      <a-row :gutter="16">
        <a-col>
          <a-button>取 消</a-button>
        </a-col>
        <a-col>
          <a-button type="primary" @click="handleOk">确 定</a-button>
        </a-col>
      </a-row>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import scriptTableVue from './scriptTable.vue';
  import { ReadCategory } from '@/api/category';
  import type { UploadProps } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { registerAndEditTitle, currentScriptDetails, formValidate } from './scriptHooks';
  import { scriptEditInputParameterColumns, scriptEditOutputParameterColumns } from './data';
  import { TitleEnum } from './Enum';
  import { FileDataType } from './data';
  import { AddScript } from '@/api/scriptManagement';
  const scriptCategoryData = ref<any>();
  const fileList = ref<UploadProps['fileList']>([]);
  const beforeUpload: UploadProps['beforeUpload'] = file => {
    fileList.value = [...fileList.value, file];
    return false;
  };
  const afterClose = () => {
    fileList.value = [];
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
  const handleOk = async () => {
    await AddScript({ scriptFile: fileList?.value[0], scriptJson: JSON.stringify(currentScriptDetails.value) });
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
