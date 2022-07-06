<template>
  <a-layout>
    <LayOut_Header />
    <a-layout>
      <LayOut_Navmenu />
      <LayOut_Content />
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
  import LayOut_Header from '../components/layOutHeader.vue';
  import LayOut_Navmenu from '../components/layoutNavMenu.vue';
  import LayOut_Content from '../components/layoutContent.vue';
</script>
<style lang="less">
  #components-layout-demo-top-side-2 .logo {
    float: left;
    margin: 16px 24px 16px 0;
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.3);
  }

  .ant-row-rtl #components-layout-demo-top-side-2 .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }

  .site-layout-background {
    background: #fff;
  }
</style>
