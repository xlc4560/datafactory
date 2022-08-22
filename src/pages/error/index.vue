<template>
  <h2>this is error page</h2>
  <div v-background="{ background: 'blue' }" class="div">{{ 'red' }}</div>
</template>

<script setup lang="ts">
  import { DirectiveBinding } from 'vue';
  type Binding = {
    background: string;
  };
  // 注册一个局部的自定义指令，需要以小写v开头
  let vBackground = (el: HTMLElement, binding: DirectiveBinding<Binding>) => {
    console.log('fffff', binding);
    el.style.background = binding.value.background;
  };
</script>

<style lang="less"></style>
