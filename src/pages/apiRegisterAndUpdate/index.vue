<template>
  <!-- 步骤条部分-->
  <div class="backColor apiRegisterAndUpdate">
    <a-steps :current="currentStep" class="formAction">
      <a-step title="基本信息" />
      <a-step title="参数配置" />
      <a-step title="调用配置" />
    </a-steps>
  </div>
  <!-- 基本信息填写表单部分 -->
  <div class="backColor baiscInfoFather">
    <basicInfoVue v-show="currentStep === 0" ref="basicInfoInstance" />
    <parameterConfigVue v-show="currentStep === 1" ref="parameterConfigInstance" />
    <!-- <useSettingVue v-show="currentStep === 2" ref="useSettingInstance" /> -->
  </div>
  <!-- 数据提交、下一步 -->
  <div class="footer_v9rLv">
    <a-space :size="12" style="float: right">
      <a-popconfirm title="请确认是否取消此次接口编辑?" ok-text="是" cancel-text="否">
        <a-button class="btn">取 消</a-button>
      </a-popconfirm>
      <a-button html-type="submit" class="btn"> 保存并退出 </a-button>
      <a-button type="primary" class="btn" @click="goNextStep">下一步</a-button>
      <a-button v-if="currentStep >= 1" type="primary" class="btn" @click="goBackStep">上一步</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
  import basicInfoVue from './basicInfo.vue';
  import parameterConfigVue from './parameterConfig.vue';
  import { apiInfoType } from './dataType';
  import { storeToRefs } from 'pinia';
  // 从pinia中引入集中管理的状态
  import useStore from '@/store';
  import { message } from 'ant-design-vue';
  const { useApiRegisterAndUpdateStore } = useStore();
  const { apiInfo } = storeToRefs(useApiRegisterAndUpdateStore);

  const currentStep = ref<0 | 1 | 2>(0);
  // 下一步
  const goNextStep = () => {
    basicInfoInstance.value?.basicform?.validate().then(
      () => {
        message.success('数据格式校验成功', 1);
        currentStep.value++;
      },
      error => {
        message.warning('数据格式校验失败', 1);
      },
    );
  };
  // 上一步
  const goBackStep = () => {
    currentStep.value--;
  };
  // 获取Apibasic数据的回调
  const getApibasicInfo = (data: apiInfoType['apiBasic']) => {
    apiInfo.value.apiBasic = data;
  };
  // 获取basicInfoVue组件的实例
  const basicInfoInstance = ref<InstanceType<typeof basicInfoVue>>();
  const parameterConfigInstance = ref<InstanceType<typeof parameterConfigVue>>();
  // const useSettingInstance = ref<InstanceType<typeof useSettingVue>>();
  onMounted(() => {
    // console.log(parameterConfigInstance);
  });
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
    width: calc(100vw - 210px);
    height: 48px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 -5px 30px 5px rgb(219, 219, 219);

    .btn {
      // position: absolute;
      // margin-right: 20px;
      right: 20px;
    }
  }
</style>
