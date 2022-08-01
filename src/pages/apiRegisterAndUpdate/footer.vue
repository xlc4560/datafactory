<template>
  <!-- 数据提交、下一步 -->
  <div class="footer_v9rLv">
    <a-form-item :wrapper-col="{ offset: 16, push: 1 }">
      <a-button class="btn">取 消</a-button>
      <a-button html-type="submit" class="btn"> 保存并退出 </a-button>
      <a-button type="primary" class="btn">下一步</a-button>
    </a-form-item>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  .footer_v9rLv {
    position: fixed;
    bottom: 0;
    left: -20px;
    padding-top: 8px;
    width: calc(100% + 100px);
    height: 48px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 -5px 30px 5px rgb(219, 219, 219);

    .btn {
      margin-left: 20px;
    }
  }
</style>
