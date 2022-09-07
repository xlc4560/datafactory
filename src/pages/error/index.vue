<template>
  <h2>this is error page</h2>
  <div v-if="true" v-background="{ background: color }" class="div">{{ 'red' }}</div>
  <test v-model:xxxx="str" msg1="1111" />
  <!-- :msg2="{ a: 1, b: 2 }" title="3333" -->
  <a-button
    @click="
      () => {
        // isShow = !isShow;
        color = 'red';
      }
    "
    >test</a-button
  >
</template>

<script setup lang="ts">
  // 用于注册自定义指令
  import { DirectiveBinding } from 'vue';
  import test from './test.vue';
  type Binding = {
    background: string;
  };
  const isShow = ref<boolean>(false);
  const color = ref<string>('blue');
  const str = ref<string>('blue');
  watch(str, () => {
    console.log(str);
  });
  // 注册一个局部的自定义指令，需要以小写v开头(此种写法是简写形式)
  let vBackground = (el: HTMLElement, binding: DirectiveBinding<Binding>) => {
    console.log('fffff', binding);
    el.style.background = binding.value.background;
  };
</script>

<style lang="less"></style>
