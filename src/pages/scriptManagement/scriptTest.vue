<template>
  <a-drawer :visible="scriptTestDrawer" @close="emits('changeDrawerControlData', { dataName: 'scriptTestDrawer', value: false })"> this is 测试页; </a-drawer>
</template>

<script setup lang="ts">
  const props = defineProps({
    scriptTestDrawer: {
      type: Boolean,
      default: false,
    },
  });
  const emits = defineEmits(['changeDrawerControlData']);
</script>

<style></style>
