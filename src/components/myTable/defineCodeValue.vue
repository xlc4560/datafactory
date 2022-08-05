<template>
  <a-modal :visible="props.isShow" title="码值定义" style="top: 22vh" width="1000px" @cancel="emits('closeModal')" @ok="handleOk">
    <div class="codeValueActionBtn">
      <a-space size="small">
        <a-button type="primary" @click="showCodeModal('新增码表码值')">新增码表码值</a-button>
        <a-button type="primary" @click="createNewCodeValue">新增自定义码值</a-button>
        <a-button type="primary" :disabled="codeValueTableData.length > 0" @click="showCodeModal('码表引用')">码表引用</a-button>
      </a-space>
    </div>

    <a-card :bordered="false" class="codeValueCard">
      <a-form ref="codeValueTableFormInstance" :model="currentParameter?.code?.codeConfig">
        <a-table :columns="codeValueModalTableColumns" size="small" :data-source="currentParameter?.code?.codeConfig" :pagination="false">
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'operation'">
              <a-button v-if="!record.isEdit" type="link" @click="editCodeValue(record)">编辑</a-button>
              <a-button v-if="!record.isEdit" type="link" @click="deleteCodeValue(record)">删除</a-button>
              <a-button v-if="record.isEdit" type="link" @click="saveCodeValue(record)">保存</a-button>
            </template>
            <template v-else>
              <template v-if="record.isEdit">
                <a-form-item :name="[index, column.dataIndex]" has-feedback :rules="[{ required: ['codeConfigName', 'codeConfigValue'].includes(column.dataIndex), message: '请输入必填项' }]">
                  <a-input v-model:value="record[column.dataIndex]" placeholder="请输入" allow-clear />
                </a-form-item>
              </template>
            </template>
          </template>
        </a-table>
      </a-form>
    </a-card>

    <div class="codeValueForm">
      <a-form ref="codeValueFooterFormInstance" :model="currentParameter?.code" :label-col="{ span: 3 }">
        <a-form-item name="codeName" label="码表名称" :rules="[{ required: true, message: '请输入码表名称!' }]">
          <a-input v-model:value="currentParameter.code.codeName" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="码表说明">
          <a-textarea v-model:value="currentParameter.code.codeDescription" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  <a-modal :visible="isCodeModalVisible" :title="codeModalTitle" style="top: 29vh" width="1000px" @ok="codeModalOk" @cancel="closeCodeModal">
    <a-form ref="codeValueModalForm" :model="selectedFormDataValue">
      <a-form-item label="码表选择" name="selectedValue" :wrapper-col="{ span: 10 }" :rules="[{ required: true, message: '请选择!' }]">
        <a-select
          v-model:value="selectedFormDataValue.selectedValue"
          show-search
          :filter-option="filterOption"
          :options="selectCodeOptions"
          :field-names="{ label: 'codeName', value: 'codeId' }"
          placeholder="请选择"
          allow-clear
          @dropdown-visible-change="selectChange"
          @select="selectedHooks"
        >
        </a-select>
      </a-form-item>
    </a-form>
    <div style="overflow: auto">
      <a-table size="small" :row-selection="codeModalTableIsSelect" :row-key="rowKey" :columns="codeModalTableColumns" :data-source="codeValueModalTableData" :pagination="false"> </a-table>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import { FormInstance, message } from 'ant-design-vue';
  // 自定义
  import { getReleaseCodeList, getStopwatchDetails } from '@/api/stopwatch/stopwatch';
  import type { tableDatatype, codeConfigType } from './dataType';
  import { codeModalTableColumns, codeValueModalTableColumns } from './tableConfig';
  // pinia数据
  import { storeToRefs } from 'pinia';
  import useStore from '@/store';
  const { useApiRegisterAndUpdateStore } = useStore();
  const { currentParameter } = storeToRefs(useApiRegisterAndUpdateStore);
  // 接收来自父组件的值  props值
  const props = defineProps({
    isShow: {
      type: Boolean,
      default: false,
    },
  });
  // 接收父组件中给当前自定义的方法  emit事件
  const emits = defineEmits(['closeModal']);
  // 表格数据
  const codeValueTableData = ref<tableDatatype[]>([]);
  const codeValueModalTableData = ref<codeConfigType[] | undefined>([]);
  // 获取表单实例
  const codeValueTableFormInstance = ref<FormInstance>(); // 表格中的表单实例
  const codeValueFooterFormInstance = ref<FormInstance>(); // 表格下方的表单实例
  const codeValueModalForm = ref<FormInstance>(); // 弹窗中的表格实例
  // 控制该组件中的弹窗是否显示
  const isCodeModalVisible = ref<boolean>(false);
  // 控制该组件中弹窗的title
  const codeModalTitle = ref<string>('');
  // 控制该组件中的表格是否可选,以及可选的回调是什么
  const codeModalTableIsSelect = ref<null | { selectedRowKeys: any; onChange: (selectedRowKey: number[]) => void }>(null);
  // 码表select框数据 （组件中的弹窗会使用到，用于渲染select的下拉框）
  const selectCodeOptions = ref<{ codeId?: string; codeName?: string }[]>([]);
  // 选中的数据 （组件中的弹窗会使用，记录下拉框选中的数据）
  const selectedFormDataValue = reactive<{ selectedValue: string }>({ selectedValue: '' });
  // 选中的数据（弹窗中选中表格字段的数据）
  const selectedRowKeys = ref<number[]>([]);
  // 点击确定按钮触发父组件中的closeModal方法
  const handleOk = async () => {
    try {
      await codeValueTableFormInstance.value?.validate();
      await codeValueFooterFormInstance.value?.validate();
      // 关闭码值定义弹窗
      emits('closeModal');
    } catch (error) {
      message.warning('请填写完整', 1);
    }
  };
  // 新增自定义码值
  const createNewCodeValue = () => {
    currentParameter.value?.code?.codeConfig?.push({
      codeConfigDescription: '',
      codeConfigName: '',
      codeConfigValue: '',
      codeId: '',
      isEdit: true,
    });
  };
  // 编辑回调
  const editCodeValue = async (record: any) => {
    try {
      await codeValueTableFormInstance.value?.validate();
      codeValueTableData.value.forEach((i: any) => (i.isEdit = false));
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
    currentParameter.value?.code?.codeConfig?.splice(currentParameter.value?.code?.codeConfig?.indexOf(record), 1);
  };

  // 展示码表弹窗
  const showCodeModal = (title: string) => {
    isCodeModalVisible.value = true;
    codeModalTitle.value = title;
    if (title === '新增码表码值') {
      codeModalTableIsSelect.value = { selectedRowKeys, onChange: onSelectChange };
    } else {
      codeModalTableIsSelect.value = null;
    }
  };
  // 关闭码表弹窗
  const closeCodeModal = () => {
    isCodeModalVisible.value = false;
    codeValueModalTableData.value = [];
    selectedFormDataValue.selectedValue = '';
  };
  // 自定义码表的key
  const rowKey = (record: codeConfigType) => record.id;
  // 获取码表select框数据（select框下拉回调）
  const selectChange = async () => {
    selectCodeOptions.value = await getReleaseCodeList();
  };
  // 搜索功能
  const filterOption = (inputValue: string, option: { codeId: string; codeName: string }) => {
    return option.codeName.includes(inputValue);
  };
  // select框选中回调
  const selectedHooks = async (value: string, option: { codeId: string; codeName: string }) => {
    codeValueModalTableData.value = (await getStopwatchDetails(option.codeId)).codeConfig;
  };
  // table的字段选中状态改变时触发
  const onSelectChange = (selectedRowKey: number[]) => {
    selectedRowKeys.value = selectedRowKey;
  };
  // 确定回调
  const codeModalOk = async () => {
    try {
      await codeValueModalForm.value?.validate();
      if (codeModalTitle.value === '新增码表码值') {
        if (selectedRowKeys.value.length === 0) {
          message.error('请选择编码!', 1);
        } else {
          selectedRowKeys.value.forEach((key: number) => {
            codeValueModalTableData.value?.forEach((data: codeConfigType) => {
              if (key === data.id) {
                currentParameter.value?.code?.codeConfig?.push({ ...data, isEdit: false });
              }
            });
          });
          closeCodeModal();
        }
      } else {
        currentParameter.value ? (currentParameter.value.codeId = selectedFormDataValue.selectedValue) : (currentParameter.value = {});
      }
    } catch (error) {}
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
