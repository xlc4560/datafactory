<template>
  <!--  数据筛选部分-->
  <div class="backColor stopwatch">
    <!-- 筛选组 -->
    <a-form layout="inline" :model="stopwatchFilters" class="formAction" @finish="handleFinish" @finish-failed="handleFinishFailed">
      <a-form-item label="api状态:">
        <a-select v-model:value="stopwatchFilters.codeState" class="width" :allow-clear="true" size="middle" placeholder="请选择">
          <a-select-option v-for="item in stopwatchStateOptions" :key="item.value">{{ item.lable }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="接口名称:">
        <a-input v-model:value="stopwatchFilters.codeName" class="width" placeholder="请输入" />
      </a-form-item>
      <a-form-item class="formBtn">
        <a-button type="primary" html-type="submit">查 询</a-button>
        <a-button @click="resetFields">重 置</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import type { FormProps } from 'ant-design-vue';
  import { stopwatchStateOptions } from './stopwatchData';
  import type { StopwatchFiltersType } from './stopwatchType';
  const emits = defineEmits(['getFilterData']);
  const stopwatchFilters = reactive<StopwatchFiltersType>({ codeState: null, codeName: '' });
  const handleFinish: FormProps['onFinish'] = () => {
    // console.log(stopwatchFilters);
    emits('getFilterData', stopwatchFilters);
  };

  const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
    console.log(errors);
  };
  const resetFields = (): void => {
    stopwatchFilters.codeName = '';
    stopwatchFilters.codeState = null;
    emits('getFilterData', stopwatchFilters);
  };
</script>

<style scoped lang="less">
  .backColor {
    background-color: #ffffff;
  }

  .stopwatch {
    // margin: 0 0 10px;
    .formAction {
      display: flex;
      margin: 20px;
      padding: 0 10px;
    }

    .width {
      width: 200px;
    }

    .formBtn {
      flex: 1;

      button {
        float: right;

        &:nth-child(1) {
          margin: 0 0 0 10px;
        }
      }
    }
  }
</style>
