<template>
  this is childComponent
  <a-button @click="handlerClick">xxxxx</a-button>
</template>

<script setup lang="ts">
  import { useAttrs } from 'vue';
  // 3.2版本不需要引入 defineProps，直接用
  const props = defineProps({
    msg1: {
      type: String,
      default: '',
      required: true,
    },
    xxxx: {
      type: String,
      default: '',
      required: true,
    },
  });

  // const employee: new () = new Employee('xxx', 'xxx');
  // 方法二 适用于 Vue3.2版本
  const attrs = useAttrs();
  console.log(attrs);
  // import { defineEmits } from "vue"
  const emit = defineEmits(['xxxx', 'update:xxxx']);

  // 用法
  const handlerClick = () => {
    emit('update:xxxx', '新的xxxx');
  };
</script>

<style></style>
