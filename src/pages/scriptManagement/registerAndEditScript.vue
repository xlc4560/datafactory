<template>
  <a-drawer :visible="scriptEditDrawer" :title="TitleEnum[registerAndEditTitle]" width="75vw" @close="emits('changeDrawerControlData', { dataName: 'scriptEditDrawer', value: false })">
    <a-form :wrapper-col="{ span: 8 }" :label-col="{ span: 2 }">
      <a-form-item label="脚本文件" :extra="`支持上传${FileDataType[registerAndEditTitle]}类型的文件`" class="basicInfo_aEGLg">
        <a-upload v-model:file-list="fileList" :accept="FileDataType[registerAndEditTitle]" :before-upload="beforeUpload" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture">
          <a-button v-if="!fileList?.length">
            <upload-outlined></upload-outlined>
            选择文件
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="脚本名称">
        <a-input placeholder="请输入脚本名称" />
      </a-form-item>
      <a-form-item label="脚本分类">
        <a-select placeholder="请选择脚本分类">
          <a-select-option key="1">{{ 'xxxx' }}</a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="[0, 2].includes(registerAndEditTitle)">
        <a-form-item label="类名">
          <a-input placeholder="请输入类名" />
        </a-form-item>
        <a-form-item label="函数名">
          <a-input placeholder="请输入函数名" />
        </a-form-item>
        <a-form-item label="自定义异常">
          <a-input disabled style="width: 65%" />
          <a-button type="primary" style="float: right; width: 30%">码值定义</a-button>
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea :rows="3" />
        </a-form-item>
      </template>
      <template v-else-if="[1, 3].includes(registerAndEditTitle)">
        <a-form-item label="数据源">
          <a-select placeholder="请选择数据源">
            <a-select-option key="1">{{ 'xxxx' }}</a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </a-form>
    <a-descriptions :column="1">
      <a-descriptions-item>
        <a-table :columns="scriptEditInputParameterColumns" size="small" :pagination="false">
          <template #title>输入参数</template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'parameterType'">
              {{ TypeEnum[record.parameterType] }}
            </template>
            <template v-else-if="column.dataIndex === 'parameterRequire'">
              {{ RequireEnum[record.parameterRequire] }}
            </template>
          </template>
        </a-table>
      </a-descriptions-item>
      <a-descriptions-item>
        <a-table :columns="scriptEditOutputParameterColumns" size="small" :pagination="false">
          <template #title>输出参数</template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'parameterType'">
              {{ TypeEnum[record.parameterType] }}
            </template>
          </template>
        </a-table>
      </a-descriptions-item>
    </a-descriptions>
    <template #footer>
      <a-row :gutter="16">
        <a-col>
          <a-button>取 消</a-button>
        </a-col>
        <a-col>
          <a-button type="primary">确 定</a-button>
        </a-col>
      </a-row>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
  import type { UploadProps } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { registerAndEditTitle, currentScriptDetails } from './scriptHooks';
  import { scriptEditInputParameterColumns, scriptEditOutputParameterColumns } from './data';
  import { TypeEnum, RequireEnum } from './Enum';
  import { TitleEnum } from './Enum';
  import { FileDataType } from './data';
  const fileList = ref<UploadProps['fileList']>([]);
  const beforeUpload: UploadProps['beforeUpload'] = file => {
    fileList.value = [...fileList.value, file];
    return false;
  };
  const props = defineProps({
    scriptEditDrawer: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['changeDrawerControlData']);
</script>

<style scoped lang="less">
  .basicInfo_aEGLg {
    :deep(.ant-form-item) {
      margin-bottom: 24px !important;
    }
  }

  :deep(.ant-table-wrapper) {
    flex: 1;
  }
</style>
