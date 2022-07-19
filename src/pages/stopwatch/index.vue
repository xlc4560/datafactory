<template>
  <!-- 数据筛选组件 -->
  <StopwatchDataFilterVue />
  <!-- 列表部分 -->
  <StopwatchTableList :show-modal="showModal" @open-modal="showModal" @open-drawer="showDrawer" />
  <!-- 详情弹窗 -->
  <a-modal v-model:visible="visible" width="800px" title="Basic Modal" @ok="handleOk">
    <StopwatchDetails :data="data" />
  </a-modal>
  <!-- 编辑、新增 -->
  <a-drawer :title="isRegister" width="800px" :visible="drawerVisible" @close="onClose">
    <StopwatchUpdateVue />
  </a-drawer>
</template>

<script lang="ts" setup>
  import StopwatchDataFilterVue from './stopwatchDataFilter.vue';
  import StopwatchTableList from './stopwatchTableList.vue';
  import StopwatchDetails from './stopwatchDetails.vue';
  import StopwatchUpdateVue from './stopwatchUpdate.vue';
  const visible = ref<boolean>(false);
  const drawerVisible = ref<boolean>(false);
  const data = ref<any>({});
  const showModal = (visibleValue: boolean, record: any) => {
    visible.value = visibleValue;
    data.value = record;
    console.log(record);
  };
  const handleOk = (e: MouseEvent) => {
    console.log(e);
    visible.value = false;
  };
  const isRegister = ref<string>('新增码表');
  const showDrawer = (visibleValue: boolean, record: any, isRegisterValue: 0 | 1) => {
    drawerVisible.value = visibleValue;
    isRegister.value = isRegisterValue === 0 ? '新增码表' : '码表编辑';
  };
  const onClose = () => {
    drawerVisible.value = false;
  };
</script>

<style></style>
