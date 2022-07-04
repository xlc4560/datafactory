<template>
  <div class="test-wrapper"> {{ a }} </div>
</template>
<script lang="ts" setup>
  const a = ref<boolean>(true);
</script>
<style lang="less" scoped>
  .test-wrapper {
    height: 100%;
  }
</style>
