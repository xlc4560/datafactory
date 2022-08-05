<template>
  <div class="parameterConfigStyle">
    <myTableVue
      ref="InputParameterInstance"
      :my-nanoid="tableConfig.nanoid_"
      :table-columns="tableConfig.inputParametercolumns"
      header-title="输入参数"
      :table-data-child="tableConfig.inputParameterData"
      :table-data="data"
      table-data-name="inputParameters"
      :is-render-json-import-btn="false"
    />
    <myTableVue
      ref="RequestBodyInstance"
      :my-nanoid="tableConfig.nanoid_"
      :table-columns="tableConfig.requestBodycolumns"
      header-title="请求body"
      :table-data-child="tableConfig.requestBodyData"
      :table-data="data"
      table-data-name="requestBody"
      :is-render-json-import-btn="true"
    />
    <myTableVue
      ref="ResponseBodyInstance"
      :my-nanoid="tableConfig.nanoid_"
      :table-columns="tableConfig.responsecolumns"
      header-title="返回参数"
      :table-data-child="tableConfig.responseData"
      :table-data="data"
      table-data-name="responseBody"
      :is-render-json-import-btn="true"
    />
  </div>
</template>

<script setup lang="ts">
  import myTableVue from '@/components/myTable/index.vue';
  import * as tableConfig from './tableConfigData';
  import { inputParameterDataType } from './dataType';
  const data: inputParameterDataType[] = [
    {
      parameterName: '12',
      parameterPosition: 0,
      parameterType: 0,
      parameterRequire: 0,
      parameterDefault: '12',
      parameterDescription: '1221',
      isEdit: false,
      id: tableConfig.nanoid_(),
      parameterPid: '0',
    },
    {
      parameterName: '12',
      parameterPosition: 1,
      parameterType: 1,
      parameterRequire: 1,
      parameterDefault: '12',
      parameterDescription: '1221',
      isEdit: false,
      id: tableConfig.nanoid_(),
      parameterPid: '0',
    },
    {
      parameterName: '12',
      parameterPosition: 0,
      parameterType: 2,
      parameterRequire: 0,
      parameterDefault: '12',
      parameterDescription: '1221',
      isEdit: false,
      id: tableConfig.nanoid_(),
      parameterPid: '0',
    },
  ];
  // 获取子组件实例
  const InputParameterInstance = ref<InstanceType<typeof myTableVue>>();
  const RequestBodyInstance = ref<InstanceType<typeof myTableVue>>();
  const ResponseBodyInstance = ref<InstanceType<typeof myTableVue>>();
  // 暴露给父组件
  defineExpose({
    InputParameterInstance,
    RequestBodyInstance,
    ResponseBodyInstance,
  });
</script>

<style scoped lang="less">
  .parameterConfigStyle {
    padding-bottom: 30px;
    background-color: rgb(240, 242, 245);
  }
</style>
