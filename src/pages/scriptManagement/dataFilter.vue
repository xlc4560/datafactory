<template>
  <div class="backColor scriptManagement-filter">
    <!-- 筛选组 -->
    <a-form ref="formInstance" layout="inline" class="formAction" :model="filterData" @finish="handleOk">
      <a-form-item label="脚本类型:" class="formItemWidth" name="scriptType">
        <a-select v-model:value="filterData.scriptType" :allow-clear="true" size="middle" placeholder="请选择">
          <a-select-option v-for="item in scriptType" :key="item.value">{{ item.lable }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="脚本状态:" class="formItemWidth" name="scriptState">
        <a-select v-model:value="filterData.scriptState" :allow-clear="true" size="middle" placeholder="请选择">
          <a-select-option v-for="item in scriptStateOption" :key="item.value">{{ item.lable }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="脚本名称:" class="formItemWidth" name="scriptName">
        <a-input v-model:value="filterData.scriptName" placeholder="请输入" />
      </a-form-item>
      <a-form-item class="formBtn">
        <a-button type="primary" html-type="submit">查 询</a-button>
        <a-button type="primary" ghost @click="formInstance?.resetFields()">重 置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import type { FormInstance } from 'ant-design-vue';
  import { scriptStateOption, scriptType } from './data';
  import { fiterCategoryName, filterData, useRun } from './scriptHooks';
  const formInstance = ref<FormInstance>();
  watch(
    () => fiterCategoryName,
    () => {
      filterData.value.scriptCategory = fiterCategoryName.value;
      useRun.value();
    },
    { deep: true },
  );
  //   表单校验通过回调
  const handleOk = () => {
    useRun.value();
  };
</script>
