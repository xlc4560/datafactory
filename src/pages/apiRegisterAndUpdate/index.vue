<template>
  <!-- 步骤条部分-->
  <div class="backColor stopwatch">
    <a-steps :current="1" class="formAction">
      <a-step>
        <!-- <span slot="title">Finished</span> -->
        <template #title>基本信息</template>
      </a-step>
      <a-step title="参数配置" />
      <a-step title="调用配置" />
    </a-steps>
  </div>
  <!-- 基本信息填写表单部分 -->
  <div class="backColor baiscInfoFather">
    <basicInfoVue v-if="currentStep === 1" />
    <parameterConfigVue v-else-if="currentStep === 0" />
    <useSettingVue v-else-if="currentStep === 2" />
  </div>
</template>

<script setup lang="ts">
  import basicInfoVue from './basicInfo.vue';
  import parameterConfigVue from './parameterConfig.vue';
  import useSettingVue from './useSetting.vue';
  const currentStep = ref<0 | 1 | 2>(0);
  // 下一步
  const goNextStep = () => {
    currentStep.value++;
  };
  // 上一步
  const goBackStep = () => {
    currentStep.value--;
  };
</script>

<style scoped lang="less">
  .backColor {
    background-color: #ffffff;
  }

  .stopwatch {
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
</style>
