<template>
  <!--  数据列表部分-->
  <div class="backColor tableWarp">
    <!-- 按钮操作组 -->
    <div class="tableactionGroup">
      <a-space :size="12">
        <a-button :disabled="btnIsDisabled" @click="updataStopwatchState(UpdateStateApi.RELEASE)">批量发布</a-button>
        <a-button :disabled="btnIsDisabled" @click="updataStopwatchState(UpdateStateApi.DISABLE)">批量停用</a-button>
      </a-space>
      <a-space :size="12">
        <a-button>导入模板下载</a-button>
        <a-button>标准导入</a-button>
        <a-button type="primary" @click="stopwatchUpdate(0, { codeId: '' })">新增码表</a-button>
      </a-space>
    </div>
    <!-- 表格组 -->
    <div class="antdTable">
      <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeysRef, onChange: onSelectChange }"
        :columns="stopwatch_columns"
        :row-key="rowKey"
        :data-source="dataSource?.list"
        :pagination="pagination"
        :loading="loading"
        size="small"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'codeId'">
            <a @click="stopwatchDetails(record)">{{ record.codeId }}</a>
          </template>
          <template v-if="column.dataIndex === 'codeState'">
            <span class="isNopublish" :style="{ background: codeState[record.codeState].color }"></span>
            {{ codeState[record.codeState].value }}
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <a-button v-if="record.codeState === 0 || record.codeState === 2" type="link" size="small" @click="updataStopwatchState(UpdateStateApi.RELEASE, record.codeId)">发 布</a-button>
            <a-button v-if="record.codeState === 1" type="link" size="small" @click="updataStopwatchState(UpdateStateApi.DISABLE, record.codeId)">停 用</a-button>
            <a-button v-if="record.codeState === 0 || record.codeState === 2" type="link" @click="stopwatchUpdate(1, record)">编 辑</a-button>
            <a-popconfirm title="确认删除?" ok-text="是" cancel-text="否" @confirm="deleteStopwatch(record.codeId)">
              <a-button v-if="record.codeState === 0" type="link">删 除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { stopwatch_columns, codeState, UpdateStateApi } from './stopwatchData';
  import type { Key, StopwatchFiltersType } from './stopwatchType';
  import * as request from '@/api/stopwatch/stopwatch';
  import { usePagination } from 'vue-request'; // 分页
  // 定义全局变量接收分页参数
  const order = ref<0 | 1 | null>(null);
  const sizeGlobal = ref<number>(10);
  const pageGlobal = ref<number>(1);
  // 接收来自筛选组件的数据
  const props = defineProps({
    stopwatchFilters: {
      type: Object,
      default: () =>
        reactive<StopwatchFiltersType>({
          codeState: null,
          codeName: '',
        }),
    },
  });
  // 声明自定义事件用于和父组件通信
  const emits = defineEmits(['openModal', 'openDrawer']);
  // 以下是分页逻辑
  const {
    data: dataSource,
    run,
    loading,
  } = usePagination(request.getStopwatchList, {
    defaultParams: [
      {
        page: 1,
        size: 10,
        orderBy: null,
        codeState: props.stopwatchFilters.codeState,
        codeName: props.stopwatchFilters.codeName,
      },
    ],
  });
  // 表格分页配置
  const pagination = computed(() => ({
    total: dataSource.value?.total,
    current: pageGlobal.value,
    pageSize: sizeGlobal.value,
    hideOnSinglePage: true,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: () => `共${dataSource.value?.total}条`,
  }));
  // 将run方法封装到函数中,便于后续使用
  const useRun: () => void = () => {
    run({
      page: pageGlobal.value,
      size: sizeGlobal.value,
      orderBy: order.value,
      codeState: props.stopwatchFilters.codeState,
      codeName: props.stopwatchFilters.codeName,
    });
  };
  // 监视数据是否发生变化
  watch(props.stopwatchFilters, () => {
    useRun();
  });

  // 控制批量操作按钮是否可点击
  const btnIsDisabled = ref<boolean>(true);
  // 表格row-key配置
  const rowKey = (record: { codeId: string }) => record.codeId;
  // 多选状态
  const state = reactive<{
    selectedRowKeys: (string | number)[];
  }>({
    selectedRowKeys: [], // Check here to configure the default column
  });
  const { selectedRowKeys: selectedRowKeysRef } = toRefs(state);
  // 当选择状态发生改变时的回调
  const onSelectChange = (selectedRowKeys: Key[]) => {
    if (selectedRowKeys.length > 0) {
      btnIsDisabled.value = false;
    } else {
      btnIsDisabled.value = true;
    }
    state.selectedRowKeys = selectedRowKeys;
  };
  // 批量操作按钮回调
  const updataStopwatchState = async (operation: 0 | 1, codeId?: string) => {
    if (codeId) {
      await request.updateStopwatchState({ codeId: [codeId], operation });
    } else {
      await request.updateStopwatchState({ codeId: state.selectedRowKeys, operation });
    }
    // 重新获取列表数据
    useRun();
    // 清空选中的数据
    state.selectedRowKeys = [];
  };
  // 打开码表详情弹窗回调
  const stopwatchDetails = (record: any) => {
    // 触发父组件中的回调emits(事件名, 事件参数)
    emits('openModal', true, record);
  };
  // 打开码表编辑、注册抽屉回调
  const stopwatchUpdate = (isRegister: 0 | 1, record: any) => {
    // 传递函数或数据到index（所有组件共同的父组件）组件中，为了其他兄弟组件中使用
    emits('openDrawer', true, record, isRegister, useRun);
  };
  // 删除码表回调
  const deleteStopwatch = async (codeId: string) => {
    await request.deleteStopwatch(codeId);
    useRun();
  };
  // 当点击分页组件时，该回调被触发
  const handleTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
    order.value = sorter.order === 'ascend' ? 1 : (order.value = sorter.order === 'descend' ? 0 : null);
    sizeGlobal.value = pag.pageSize;
    pageGlobal.value = pag.current;
    // useRun触发usePagination中的queryData请求
    useRun();
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
