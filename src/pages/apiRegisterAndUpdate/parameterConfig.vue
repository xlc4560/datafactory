<template>
  <div style="background-color: rgb(240, 242, 245)">
    <myTableVue :table-columns="tableConfig.inputParametercolumns" header-title="输入参数" />
    <myTableVue :table-columns="tableConfig.requestBodycolumns" header-title="请求body" :is-render-json-import-btn="true" />
    <myTableVue :table-columns="tableConfig.responsecolumns" header-title="返回参数" :is-render-json-import-btn="true" />
  </div>
</template>

<script setup lang="ts">
  import myTableVue from '@/components/myTable.vue';
  import * as tableConfig from './tableConfigData';
</script>

<style scoped lang="less"></style>
