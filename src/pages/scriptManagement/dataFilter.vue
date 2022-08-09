<template>
  <div class="backColor scriptManagement-filter">
    <!-- 筛选组 -->
    <a-form layout="inline" class="formAction" :model="filterData" @finish="handleOk">
      <a-form-item label="脚本类型:" class="formItemWidth">
        <a-select v-model:value="filterData.scriptType" :allow-clear="true" size="middle" placeholder="请选择">
          <a-select-option v-for="item in scriptType" :key="item.value">{{ item.lable }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="脚本状态:" class="formItemWidth">
        <a-select v-model:value="filterData.scriptState" :allow-clear="true" size="middle" placeholder="请选择">
          <a-select-option v-for="item in scriptStateOption" :key="item.value">{{ item.lable }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="脚本名称:" class="formItemWidth">
        <a-input v-model:value="filterData.scriptName" placeholder="请输入" />
      </a-form-item>
      <a-form-item class="formBtn">
        <a-button type="primary" html-type="submit">查 询</a-button>
        <a-button type="primary" ghost>重 置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  // 从pinia中引入集中管理的状态
  import useStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { scriptStateOption, scriptType } from './data';
  const { useScriptManagementStore, useCategoryStore } = useStore();
  const { filterData, useRun } = storeToRefs(useScriptManagementStore);
  const { fiterCategoryName } = storeToRefs(useCategoryStore);
  watch(
    () => fiterCategoryName,
    () => {
      filterData.value.scriptCategory = fiterCategoryName.value;
    },
    { deep: true },
  );
  //   表单校验通过回调
  const handleOk = () => {
    useRun.value();
  };
</script>

<style></style>
