<template>
  <a-modal :visible="props.isShow" title="码值定义" style="top: 22vh" width="1000px" @cancel="emits('closeModal')" @ok="emits('closeModal')">
    <a-table :columns="codeBindTableColumns" :pagination="false" size="small" :destroy-on-close="true" :data-source="tableData.codeConfig">
      <template #title>
        <div class="paramTitle">
          <span class="titleStyle">码表名称:{{ tableData.codeName }}</span>
          <a-row justify="end" :gutter="16">
            <a-col v-if="isRenderUnbindBtn">
              <a-button type="primary" @click="unbindBtn">解除码表引用</a-button>
            </a-col>
          </a-row>
        </div>
      </template>
    </a-table>
  </a-modal>
</template>

<script setup lang="ts">
  import { codeBindTableColumns } from './tableConfig';
  import { getStopwatchDetails } from '@/api/stopwatch/stopwatch';
  // pinia数据
  import { storeToRefs } from 'pinia';
  import useStore from '@/store';
  const { useApiRegisterAndUpdateStore } = useStore();
  const { currentParameter } = storeToRefs(useApiRegisterAndUpdateStore);
  // 接收来自父组件的值  props值
  const props = defineProps({
    isShow: {
      type: Boolean,
      default: false,
    },
    isRenderUnbindBtn: {
      type: Boolean,
      default: false,
    },
  });
  // 接收父组件中给当前自定义的方法  emit事件
  const emits = defineEmits(['closeModal']);
  const tableData = ref<any>([]);
  watch(
    currentParameter,
    () => {
      if (currentParameter.value?.codeId) {
        (async () => {
          tableData.value = await getStopwatchDetails(currentParameter.value?.codeId as string);
        })();
      }
    },
    { deep: true, immediate: true },
  );
  const unbindBtn = () => {
    if (currentParameter.value) {
      currentParameter.value.codeId = null;
    }
  };
</script>

<style scoped lang="less">
  .paramTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .titleStyle {
      font-size: 16px;
      color: #666;
    }
  }
</style>
