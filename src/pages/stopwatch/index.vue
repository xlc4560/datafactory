<template>
  <!-- 数据筛选组件 -->
  <StopwatchDataFilterVue @get-filter-data="getFilterData" />
  <!-- 列表部分 -->
  <StopwatchTableList :stopwatch-filters="stopwatchFilters" @open-modal="showModal" @open-drawer="showDrawer" />
  <!-- 详情弹窗 -->
  <a-modal v-model:visible="visible" width="800px" :title="stopwatchData.codeName" @ok="handleOk">
    <StopwatchDetails :stopwatch-data="stopwatchData" />
  </a-modal>
  <!-- 编辑、新增 -->
  <StopwatchUpdateVue :drawer-data="drawerData" :run="run" />
</template>

<script lang="ts" setup>
  import StopwatchDataFilterVue from './stopwatchDataFilter.vue';
  import StopwatchTableList from './stopwatchTableList.vue';
  import StopwatchDetails from './stopwatchDetails.vue';
  import StopwatchUpdateVue from './stopwatchUpdate.vue';
  import type { StopwatchFiltersType } from './stopwatchType';
  const visible = ref<boolean>(false);
  const drawerData = reactive<{ visible: boolean; isRegister: string; codeId?: string | null; id: number }>({ visible: false, isRegister: '', id: 0 });
  const stopwatchData = reactive<{ codeId: string; codeName: string }>({ codeId: '', codeName: '' });
  // 获取筛选组件的数据
  const stopwatchFilters = reactive<StopwatchFiltersType>({ codeState: null, codeName: '' });
  // const filterData = reactive<>()
  const getFilterData = (params: StopwatchFiltersType) => {
    stopwatchFilters.codeState = params.codeState;
    stopwatchFilters.codeName = params.codeName;
  };
  // 打开弹窗
  const showModal = (visibleValue: boolean, record: any) => {
    visible.value = visibleValue;
    stopwatchData.codeId = record.codeId;
    stopwatchData.codeName = record.codeName;
  };
  const handleOk = (e: MouseEvent) => {
    visible.value = false;
  };
  // 页面数据查询方法
  const run = ref<() => void>();
  const showDrawer = (visibleValue: boolean, record: any, isRegisterValue: 0 | 1, useRun: () => void) => {
    drawerData.visible = visibleValue;
    drawerData.isRegister = isRegisterValue === 0 ? '新增码表' : '码表编辑';
    if (record) {
      drawerData.codeId = record.codeId;
    }
    drawerData.id++;
    run.value = useRun;
  };
</script>

<style></style>
