<template>
  <a-modal :visible="props.isShow" title="码值定义" style="top: 22vh" width="1000px" @cancel="emits('closeModal')" @ok="handleOk">
    <div class="codeValueActionBtn">
      <a-space size="small">
        <a-button type="primary" @click="showCodeModal('新增码表码值')">新增码表码值</a-button>
        <a-button type="primary" @click="createNewCodeValue">新增自定义码值</a-button>
        <a-button type="primary" :disabled="TableData.length > 0" @click="showCodeModal('码表引用')">码表引用</a-button>
      </a-space>
    </div>

    <a-card :bordered="false" class="codeValueCard">
      <a-form ref="codeValueTableFormInstance" :model="TableData">
        <a-table :columns="codeValueModalTableColumns" size="small" :data-source="TableData" :pagination="false">
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'operation'">
              <a-button v-if="!record.isEdit" type="link" @click="editCodeValue(record)">编辑</a-button>
              <a-button v-if="!record.isEdit" type="link" @click="deleteCodeValue(record)">删除</a-button>
              <a-button v-if="record.isEdit" type="link" @click="saveCodeValue(record)">保存</a-button>
            </template>
            <template v-else>
              <template v-if="record.isEdit">
                <a-form-item :name="[index, column.dataIndex]" has-feedback :rules="[{ required: ['codeName', 'codeValue'].includes(column.dataIndex), message: '请输入必填项' }]">
                  <a-input v-model:value="record[column.dataIndex]" placeholder="请输入" allow-clear />
                </a-form-item>
              </template>
            </template>
          </template>
        </a-table>
      </a-form>
    </a-card>

    <div class="codeValueForm">
      <a-form ref="codeValueFooterFormInstance" :model="codeValueFormData" :label-col="{ span: 3 }">
        <a-form-item name="codeName" label="码表名称" :rules="[{ required: true, message: '请输入码表名称!' }]">
          <a-input v-model:value="codeValueFormData.codeName" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="码表说明">
          <a-textarea v-model:value="codeValueFormData.codeDescription" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  <a-modal :visible="isCodeModalVisible" :title="codeModalTitle" style="top: 29vh" width="1000px" @cancel="closeCodeModal">
    <a-form>
      <a-form-item label="码表选择" :wrapper-col="{ span: 10 }" :rules="[{ required: true, message: '请选择!' }]">
        <a-select show-search placeholder="请选择"> </a-select>
      </a-form-item>
    </a-form>
    <div style="overflow: auto">
      <a-table size="small" :columns="codeModalTableColumns" :data-source="SimulationData" :pagination="false"> </a-table>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { FormInstance, message } from 'ant-design-vue';
  import { codeValueModalTableColumns, SimulationData, codeModalTableColumns } from './tableConfig';
  // pinia数据
  import { storeToRefs } from 'pinia';
  import useStore from '@/store';
  const { useApiRegisterAndUpdateStore } = useStore();
  const { apiInfo } = storeToRefs(useApiRegisterAndUpdateStore);
  // 接收来自父组件的值
  const props = defineProps({
    isShow: {
      type: Boolean,
      default: false,
    },
  });
  // 接收父组件中给当前自定义的方法
  const emits = defineEmits(['closeModal']);
  // 点击确定按钮更改父组件中的数据
  const handleOk = async () => {
    try {
      await codeValueTableFormInstance.value?.validate();
      // 关闭码值定义弹窗
      emits('closeModal');
    } catch (error) {
      message.warning('请填写完整', 1);
    }
  };
  // 模拟数据
  const TableData = ref<any>([
    {
      codeId: '1345',
      codeName: 'xxxx',
      codeValue: '13456',
      codeDescription: 'dbfaaksjbfaj',
      isEdit: false,
    },
    {
      codeId: '4877',
      codeName: 'xxxx',
      codeValue: '13456',
      codeDescription: 'dbfaaksjbfaj',
      isEdit: true,
    },
  ]);
  // 对话框中表单的绑定数据
  const codeValueFormData = reactive<{ codeName: string; codeDescription?: string }>({
    codeName: '',
    codeDescription: '',
  });
  // 获取表单实例
  const codeValueTableFormInstance = ref<FormInstance>(); // 表格中的表单实例
  const codeValueFooterFormInstance = ref<FormInstance>(); // 表格下方的表单实例
  const isCodeModalVisible = ref<boolean>(false);
  const codeModalTitle = ref<string>('');
  // 展示码表弹窗
  const showCodeModal = (title: string) => {
    isCodeModalVisible.value = true;
    codeModalTitle.value = title;
  };
  // 新增自定义码值
  const createNewCodeValue = () => {
    TableData.value.push({
      codeId: '',
      codeName: '',
      codeValue: '',
      codeDescription: '',
      isEdit: true,
    });
    console.log(TableData);
  };
  // 编辑回调
  const editCodeValue = async (record: any) => {
    try {
      await codeValueTableFormInstance.value?.validate();
      TableData.value.forEach((i: any) => (i.isEdit = false));
      record.isEdit = true;
    } catch (error) {
      message.warning('请填写完整!', 1);
    }
  };
  // 保存回调
  const saveCodeValue = async (record: any) => {
    try {
      await codeValueTableFormInstance.value?.validate();
      record.isEdit = false;
    } catch (error) {
      message.warning('表单校验失败', 1);
    }
  };
  // 删除回调
  const deleteCodeValue = async (record: any) => {
    TableData.value.splice(TableData.value.indexOf(record), 1);
  };
  // 关闭码表弹窗
  const closeCodeModal = () => {
    isCodeModalVisible.value = false;
  };
</script>

<style scoped lang="less">
  :deep(.ant-card-body) {
    padding-top: 0;
  }

  .codeValueActionBtn {
    margin-bottom: 10px;
    padding-left: 25px;
  }

  .codeValueCard {
    :deep(.ant-form-item) {
      margin-bottom: 0;
    }

    :deep(.ant-form-item-explain) {
      position: absolute;
      top: -55px;
      right: 0px;
      display: flex;
      border-radius: 3px;
      padding: 5px 10px;
      background: rgb(255, 255, 255);
      box-shadow: 0 5px 10px 5px rgb(233, 233, 233);
      line-height: 32px;
    }

    :deep(.ant-form-item-explain::before) {
      position: absolute;
      top: 42px;
      right: 20px;
      display: block;
      border-top: 10px solid rgb(255, 255, 255);
      border-right: 5px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 5px solid transparent;
      content: '';
    }
  }

  .codeValueForm {
    padding: 0px 24px 0px 0px;
  }
</style>
