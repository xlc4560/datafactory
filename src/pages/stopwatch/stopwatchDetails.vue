<template>
  <a-table :columns="stopwatchDetails_columns" :data-source="stopwatchDetails.value.codeConfigs" size="small" :pagination="false"> </a-table>
</template>

<script lang="ts" setup>
  import { stopwatchDetails_columns } from './stopwatchData';
  import { stopwatchDetailsType } from './stopwatchType';
  import { getStopwatchDetails } from '@/api/stopwatch/stopwatch';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = defineProps({
    stopwatchData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  });
  const stopwatchDetails = reactive<{ value: stopwatchDetailsType }>({ value: {} });
  watch(
    props.stopwatchData,
    async () => {
      stopwatchDetails.value = await getStopwatchDetails(props.stopwatchData.codeId);
      console.log(stopwatchDetails.value.codeConfigs);
    },
    { immediate: true },
  );
</script>

<style></style>
