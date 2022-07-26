<template>
  <!-- <div v-for="item in 50" :key="item">
    <h1>this is h1</h1>
  </div> -->
  <h4>普通</h4>
  <JsonViewer :value="jsonData" copyable boxed sort theme="light" @on-key-click="keyClick" />
  <h4>暗黑</h4>
  <JsonViewer :value="jsonData" copyable boxed sort theme="dark" @on-key-click="keyClick" />
</template>

<script setup lang="ts">
  import { JsonViewer } from 'vue3-json-viewer';
  import 'vue3-json-viewer/dist/index.css';
  let obj = {
    name: 'qiu', //字符串
    age: 18, //数组
    isMan: false, //布尔值
    date: new Date(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fn: () => {},
    arr: [1, 2, 5],
    reg: /ab+c/i,
  };
  const jsonData = reactive(obj);
  const keyClick = (keyName: string): void => {
    console.log(keyName, '被点击了');
  };
</script>

<style scoped></style>
