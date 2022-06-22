<template>
  <div class="layout-wrapper">fjsdklfjsdlkjfkl ljsfksdjflsjflksjfldjsklfjsdkfjlksdkfjsdkljfskljfldsjlfjsdjfsljfklsdjfkldsjf</div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'LayoutWrapper',
    components: {},
    setup() {
      const test = () => {
        console.log('test');
      };
      return {
        test,
      };
    },
  });
</script>
<style lang="less" scoped>
  .layout-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
