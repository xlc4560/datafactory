<template>
  <!-- 步骤条部分-->
  <div class="backColor apiRegisterAndUpdate">
    <a-steps :current="currentStep" class="formAction">
      <a-step title="基本信息" />
      <a-step title="参数配置" />
    </a-steps>
  </div>
  <!-- 基本信息填写表单部分 -->
  <div class="backColor baiscInfoFather">
    <basicInfoVue v-if="currentStep === 0" ref="basicInfoInstance" />
    <parameterConfigVue v-if="currentStep === 1" ref="parameterConfigInstance" />
    <!-- <useSettingVue v-show="currentStep === 2" ref="useSettingInstance" /> -->
  </div>
  <!-- 数据提交、下一步 -->
  <div class="footer_v9rLv">
    <a-space :size="12" style="float: right">
      <!-- @confirm="" -->
      <a-popconfirm style="padding: 12px 16px" title="是否取消此次接口编辑?" ok-text="是" cancel-text="否" @confirm="cancel">
        <a-button class="btn">取 消</a-button>
      </a-popconfirm>
      <a-popconfirm title="是否保存为未发布并退出?" ok-text="是" cancel-text="否" @confirm="saveApi(2)">
        <a-button class="btn"> 保存为未发布 </a-button>
      </a-popconfirm>
      <a-popconfirm title="是否保存为草稿并退出?" ok-text="是" cancel-text="否" @confirm="saveApi(1)">
        <a-button class="btn"> 保存为草稿 </a-button>
      </a-popconfirm>
      <a-button v-if="currentStep < 1" type="primary" class="btn" @click="goNextStep">下一步</a-button>
      <a-button v-if="currentStep >= 1" type="primary" class="btn" @click="goBackStep">上一步</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { ApiCheck, apiDraft, GetApiDetails, apiEdit } from '@/api/apiManagement';
  import basicInfoVue from './basicInfo.vue';
  import parameterConfigVue from './parameterConfig.vue';
  import { apiInfoDefault } from './basicInfoConfig';
  import { message } from 'ant-design-vue';
  // 从pinia中引入集中管理的状态
  import useStore from '@/store';
  import { storeToRefs } from 'pinia';
  const { useApiRegisterAndUpdateStore } = useStore();
  const { apiInfo } = storeToRefs(useApiRegisterAndUpdateStore);
  const router = useRouter();
  console.log(router);

  const route = useRoute();
  console.log(route);

  if (route.params.id) {
    (async () => {
      const res = await GetApiDetails(route.params.id as string);
      apiInfo.value.apiBasic = res.apiBasic;
      apiInfo.value.inputParameters = res.apiParameter ? res.apiParameter : [];
      apiInfo.value.requestBody = res.requestBody ? res.requestBody : [];
      apiInfo.value.responseBody = res.responseBody ? res.responseBody : [];
    })();
  } else {
    apiInfo.value.apiBasic = cloneDeep(apiInfoDefault.apiBasic);
    apiInfo.value.inputParameters = cloneDeep(apiInfoDefault.inputParameters);
    apiInfo.value.requestBody = cloneDeep(apiInfoDefault.requestBody);
    apiInfo.value.responseBody = cloneDeep(apiInfoDefault.responseBody);
  }

  const currentStep = ref<0 | 1 | 2>(0);
  // 下一步
  const goNextStep = async () => {
    try {
      await basicInfoInstance.value?.basicform?.validate();
      await ApiCheck({ apiBasic: { ...apiInfo.value.apiBasic } });
      currentStep.value++;
    } catch (error) {
      message.warning('数据格式校验失败', 1);
    }
  };
  // 上一步
  const goBackStep = () => {
    currentStep.value--;
  };
  // 获取basicInfoVue组件的实例 用于触发表单验证
  const basicInfoInstance = ref<InstanceType<typeof basicInfoVue>>();
  const parameterConfigInstance = ref<InstanceType<typeof parameterConfigVue>>();

  // 保存回调
  const saveApi = async (apiState: number) => {
    try {
      // 表单验证
      if (currentStep.value === 0) {
        await basicInfoInstance.value?.basicform?.validate();
      } else {
        await parameterConfigInstance.value?.InputParameterInstance?.formRef?.validate();
        await parameterConfigInstance.value?.RequestBodyInstance?.formRef?.validate();
        await parameterConfigInstance.value?.ResponseBodyInstance?.formRef?.validate();
      }
      apiInfo.value.apiBasic.apiState = apiState;
      // 开始存入数据库
      if (route.params.id) {
        // 编辑
        await apiEdit(apiInfo.value);
      } else {
        // 注册
        await apiDraft(apiInfo.value);
      }

      router.push({
        path: '/DataFactory/DataSourceManagement/ApiManagement',
      });
    } catch (error) {
      message.warning('数据格式校验失败', 1);
    }
  };
  // 取消更改
  const cancel = () => {
    router.push({
      path: '/DataFactory/DataSourceManagement/ApiManagement',
    });
  };
</script>

<style scoped lang="less">
  .backColor {
    background-color: #ffffff;
  }

  .apiRegisterAndUpdate {
    .formAction {
      display: flex;
      margin: 20px 15%;
      padding: 0 10px;
      width: 70%;
    }
  }

  .baiscInfoFather {
    margin-top: 10px;
  }

  .footer_v9rLv {
    position: fixed;
    right: 0;
    bottom: 0;
    padding-top: 8px;
    width: 100vw;
    height: 48px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 -5px 30px 5px rgb(219, 219, 219);

    .btn {
      right: 20px;
    }
  }
</style>
