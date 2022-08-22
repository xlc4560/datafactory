<template>
  <a-table :columns="tableColumns" :data-source="currentScriptDetails[dataName]" size="small" :pagination="false">
    <template #title>
      <div class="table_title">
        <h3>{{ tableTitle }}</h3>
        <a-button type="primary" ghost @click="addScriptParameter">添加配置项</a-button>
      </div>
    </template>
    <template #bodyCell="{ column, record, index }">
      <template v-if="record.isEdit">
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="link" @click="editCurrentScript(record, false, index)">保存</a-button>
          <a-button type="link" @click="cancelSave(record, false, index)">取消</a-button>
        </template>
        <template v-else>
          <a-form-item :help="record.formItemMessage[column.dataIndex]?.help" :validate-status="record.formItemMessage[column.dataIndex]?.validateStatus">
            <a-input
              v-if="['parameterName', 'parameterDescription'].includes(column.dataIndex)"
              v-model:value="record[column.dataIndex]"
              placeholder="请输入"
              allow-clear
              @change="formValidate(record, column.dataIndex)"
            />
            <a-select v-else-if="column.dataIndex === 'parameterType'" v-model:value="record[column.dataIndex]" allow-clear placeholder="请选择" @change="formValidate(record, column.dataIndex)">
              <a-select-option v-for="item in column.selectOption" :key="item.key">{{ item.label }}</a-select-option>
            </a-select>
            <a-select v-else-if="column.dataIndex === 'parameterRequire'" v-model:value="record[column.dataIndex]" allow-clear placeholder="请选择" @change="formValidate(record, column.dataIndex)">
              <a-select-option v-for="item in column.selectOption" :key="item.key">{{ item.label }}</a-select-option>
            </a-select>
          </a-form-item>
        </template>
      </template>
      <template v-else>
        <template v-if="column.dataIndex === 'parameterType'">
          {{ TypeEnum[record.parameterType] }}
        </template>
        <template v-else-if="column.dataIndex === 'parameterRequire'">
          {{ RequireEnum[record.parameterRequire] }}
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <a-button type="link" @click="editCurrentScript(record, true, index)">编辑</a-button>
          <a-button type="link" @click="deleteCurrentScript(index)">删除</a-button>
        </template>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
  import { columnsType } from '@/pages/apiRegisterAndUpdate/dataType';
  import { currentScriptDetails, formValidate } from './scriptHooks';
  import { TypeEnum, RequireEnum } from './Enum';
  import { ScriptParameterType } from '@/api/scriptManagement/apiReturnType';
  import { PropType } from 'vue';
  import { message } from 'ant-design-vue';
  import { cloneDeep } from 'lodash-es';
  const props = defineProps({
    tableColumns: {
      type: Array as PropType<columnsType[]>,
      default: () => [],
    },
    dataName: {
      type: String,
      default: 'inputParameter',
    },
    tableTitle: {
      type: String,
      default: '输入参数',
    },
  });
  const beforeEditData: any = [];
  //  新增参数
  const addScriptParameter = () => {
    currentScriptDetails.value[props.dataName].push({
      isEdit: true,
      parameterIndex: undefined,
      parameterName: undefined,
      parameterRequire: 0,
      parameterType: undefined,
      formItemMessage: {
        parameterName: {
          help: undefined,
          validateStatus: 'success',
        },
        parameterRequire: {
          help: undefined,
          validateStatus: 'success',
        },
        parameterType: {
          help: undefined,
          validateStatus: 'success',
        },
      },
    });
    beforeEditData[currentScriptDetails.value[props.dataName].length] = undefined;
  };

  // 编辑、保存回调
  const editCurrentScript = (record: ScriptParameterType, isSave: boolean, index: number) => {
    // 点击编辑时，存储一次数据
    if (isSave) {
      beforeEditData[index] = cloneDeep(record);
      record.isEdit = isSave;
    } else {
      const keyName: string[] = Object.keys(record.formItemMessage as object);
      const arr = keyName.map((key: string) => {
        return formValidate(record, key);
      });
      if (arr.includes(false)) {
        message.error('请填写规范!');
      } else {
        record.isEdit = isSave;
      }
    }
  };
  //   删除回调
  const deleteCurrentScript = (index: number) => {
    currentScriptDetails.value[props.dataName].splice(index, 1);
  };
  // 取消回调
  const cancelSave = (record: ScriptParameterType, isSave: boolean, index: number) => {
    if (beforeEditData[index]) {
      Object.assign(record, beforeEditData[index]);
    } else {
      currentScriptDetails.value[props.dataName].splice(index, 1);
    }
  };
</script>

<style scoped lang="less">
  .table_title {
    display: flex;
    justify-content: space-between;
  }

  :deep(.ant-table-row .ant-form-item) {
    margin-bottom: 0;
  }
  //  控制报红样式
  :deep(.ant-table-cell .ant-form-item-explain) {
    position: absolute;
    top: -55px;
    right: 0px;
    z-index: 1;
    display: flex;
    border-radius: 3px;
    padding: 5px 10px;
    white-space: nowrap;
    background: rgb(255, 255, 255);
    box-shadow: 0 5px 10px 5px rgb(233, 233, 233);
    line-height: 32px;

    ::before {
      position: absolute;
      top: 42px;
      right: 20px;
      z-index: 99;
      display: block;
      border-top: 10px solid rgb(255, 255, 255);
      border-right: 5px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 5px solid transparent;
      content: '';
    }
  }
</style>
