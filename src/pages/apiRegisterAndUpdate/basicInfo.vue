<template>
  <a-form
    ref="basicform"
    :model="apiInfo.apiBasic"
    name="basic"
    :rules="rules"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 8 }"
    autocomplete="off"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <!-- 数据填写 -->
    <div class="baiscInfo_form">
      <div class="title___2CoZR"> 基本信息 </div>
      <a-form-item label="接口分类" name="apiType">
        <a-tree-select
          v-model:value="apiInfo.apiBasic.apiType"
          :tree-data="treeData"
          placeholder="请选择接口分类"
          show-search
          :field-names="{ label: 'name', value: 'categoryCode' }"
          allow-clear
          @dropdown-visible-change="test"
        ></a-tree-select>
      </a-form-item>
      <a-form-item label="接口名称" name="apiName">
        <a-input v-model:value="apiInfo.apiBasic.apiName" placeholder="请输入接口名称" />
      </a-form-item>

      <a-form-item label="接口来源" name="apiSource">
        <a-select v-model:value="apiInfo.apiBasic.apiSource" placeholder="请选择接口来源">
          <a-select-option v-for="(item, index) in apiResourceOptions" :key="index">{{ item.value }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="接口描述" name="apiDescription">
        <a-textarea v-model:value="apiInfo.apiBasic.apiDescription" placeholder="请输入接口描述" />
      </a-form-item>
      <div class="title___2CoZR"> API参数 </div>
      <a-form-item label="协议" name="apiProtocol">
        <a-select v-model:value="apiInfo.apiBasic.apiProtocol" placeholder="请选择协议">
          <a-select-option key="0">http</a-select-option>
          <a-select-option key="1">https</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="IP端口" name="apiIpPort">
        <a-input v-model:value="apiInfo.apiBasic.apiIpPort" placeholder="请输入IP端口" />
      </a-form-item>
      <a-form-item label="Path" name="apiPath">
        <a-input v-model:value="apiInfo.apiBasic.apiPath" placeholder="请输入Path" />
      </a-form-item>
      <a-form-item label="请求方式" name="apiMethod">
        <a-select v-model:value="apiInfo.apiBasic.apiMethod" placeholder="请选择">
          <a-select-option key="0">GET</a-select-option>
          <a-select-option key="1">POST</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="超时时间" name="apiTimeout">
        <a-input-number v-model:value="apiInfo.apiBasic.apiTimeout" placeholder="请输入超时时间（单位：秒）" keyboard style="width: 100%" />
      </a-form-item>
    </div>
  </a-form>
</template>

<script setup lang="ts">
  import { rules } from './basicInfoConfig';
  import { apiResourceOptions } from '@/pages/apiManagement/data';
  import { ReadCategory } from '@/api/category';
  import { storeToRefs } from 'pinia';
  import { FormInstance } from 'ant-design-vue';
  // 从pinia中引入集中管理的状态
  import useStore from '@/store';
  const { useApiRegisterAndUpdateStore } = useStore();
  const { apiInfo } = storeToRefs(useApiRegisterAndUpdateStore);
  const props = defineProps({
    basicInfoInstance: {
      type: Object,
      default: () => ({}),
    },
  });

  const emits = defineEmits(['getapiInfo.apiBasicInfo']);
  const onFinish = (values: any) => {
    emits('getapiInfo.apiBasicInfo', apiInfo.value.apiBasic);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const treeData = ref<any>([]);
  const test = async (open: boolean) => {
    if (open) {
      treeData.value = await ReadCategory('接口分类');
      // console.log();
    }
  };
  const basicform = ref<FormInstance>();
  // 暴露子组件的属性到实例中，方便父组件中使用
  defineExpose({
    basicform,
  });
</script>

<style scoped lang="less">
  .baiscInfo_form {
    display: flex;
    flex-flow: column nowrap;
    padding: 10px 10px 100px 10px;
    // margin: 0 0 100px 0;
    // title样式
    .title___2CoZR {
      position: relative;
      padding-left: 8px;
      padding-left: 28%;
      font-weight: 700;
      color: #666;
      line-height: 40px;

      &::after {
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        left: 27.5%;
        width: 3px;
        height: 16px;
        background: #1890ff;
      }
    }
  }
</style>
