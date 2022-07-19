<template>
  <!--  数据列表部分-->
  <div class="backColor tableWarp">
    <!-- 按钮操作组 -->
    <div class="tableactionGroup">
      <a-space :size="12">
        <a-button :disabled="btnIsDisabled">批量发布</a-button>
        <a-button :disabled="btnIsDisabled">批量停用</a-button>
      </a-space>
      <a-space :size="12">
        <a-button>导入模板下载</a-button>
        <a-button>标准导入</a-button>
        <a-button type="primary" @click="stopwatchUpdate(0)">新增码表</a-button>
      </a-space>
    </div>
    <!-- 表格组 -->
    <div class="antdTable">
      <a-table :columns="stopwatch_columns" :data-source="stopwatchData" :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'id'">
            <a @click="stopwatchDetails(record)">{{ record.id }}</a>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button type="link" size="small">发 布</a-button>
            <a-button type="link" size="small">停 用</a-button>
            <a-button type="link" @click="stopwatchUpdate(1, record)">编 辑</a-button>
            <a-popconfirm title="确认删除?" ok-text="是" cancel-text="否" @confirm="deleteStopwatch(record)">
              <a-button type="link">删 除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { stopwatch_columns, stopwatchData } from './stopwatchData';
  const emits = defineEmits(['openModal', 'openDrawer']);
  type Key = string | number;
  const btnIsDisabled = ref<boolean>(true);
  const state = reactive<{
    selectedRowKeys: Key[];
    loading: boolean;
  }>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  });
  const onSelectChange = (selectedRowKeys: Key[]) => {
    if (selectedRowKeys.length > 0) {
      btnIsDisabled.value = false;
    } else {
      btnIsDisabled.value = true;
    }
    state.selectedRowKeys = selectedRowKeys;
  };
  const stopwatchDetails = (record: any) => {
    emits('openModal', true, record);
  };
  const stopwatchUpdate = (isRegister: 0 | 1, record: any = {}) => {
    emits('openDrawer', true, record, isRegister);
  };
  const deleteStopwatch = (record: any) => {
    console.log(record);
  };
</script>

<style lang="less" scoped>
  .backColor {
    background-color: #ffffff;
  }

  .tableWarp {
    margin: 10px 0;
    width: 100%;
    min-height: 70vh;

    .tableactionGroup {
      display: flex;
      //   flex-direction: row-reverse;
      justify-content: space-between;
      padding: 20px 20px;
      width: 100%;
    }

    .antdTable {
      padding: 0 20px 10px;
    }

    .isNopublish {
      display: inline-block;
      // background: #faad14;
      margin-right: 3px;
      border-radius: 50%;
      width: 7px;
      height: 7px;
    }
  }
</style>
