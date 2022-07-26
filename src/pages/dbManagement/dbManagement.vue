<template>
  <div>
    <a-button type="primary" @click="addData('new')">新增数据源</a-button><br /><br />
    <a-button type="primary" @click="addData('edit')">编辑数据源</a-button>
    <a-drawer :visible="visible" size="large" title="新增数据源" :destroy-on-close="true" @close="onClose">
      <addDataSource :visible="visible" :codeid="codeid" @changevisible="changevisible"></addDataSource>
    </a-drawer>
    <!-- <addDataSource ref="visible" :codeid="codeid"></addDataSource> -->
  </div>
</template>
<script lang="ts" setup>
  //新增数据源组件
  import addDataSource from './addDataSource.vue';
  const visible = ref<boolean>(false);
  const onClose = () => {
    visible.value = false;
  };
  const codeid = ref('');
  const addData = (x: string) => {
    visible.value = true;
    // console.log(x);
    codeid.value = x;
  };
  const changevisible = (val: { data: boolean }) => {
    visible.value = val.data;
  };
</script>
<style lang="scss" scoped></style>
