<template>
  <a-layout-header class="header" />
  <a-layout-header class="header" style="position: fixed; z-index: 9">
    <div class="logo" style="z-index: 999"> </div>
    <a-menu v-model:selectedKeys="selectedKeys1" theme="dark" mode="horizontal" :style="{ lineHeight: '50px', flex: 1 }">
      <a-menu-item key="1">数据工厂</a-menu-item>
      <a-menu-item key="2">指标管理</a-menu-item>
      <a-menu-item key="3">决策引擎</a-menu-item>
      <a-menu-item key="4">系统管理</a-menu-item>
    </a-menu>
    <div class="avatar">
      <a-avatar :size="{ xs: 9, sm: 12, md: 15, lg: 20, xl: 28, xxl: 40 }">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <span class="userName">
        <strong> 管理员 </strong>
      </span>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
  import { UserOutlined } from '@ant-design/icons-vue';
  import { ref } from 'vue';
  const selectedKeys1 = ref<string[]>(['1']);
</script>

<style scoped lang="less">
  .header {
    display: flex;
    padding: 0 !important;
    width: 100%;
    height: 50px !important;

    .logo {
      padding: 0 !important;
      width: 200px;
      height: 50px;
      background: url('../assets/images/logo.png');
      background-size: cover;
      line-height: 50px !important;
    }

    .avatar {
      // background-color: aqua;
      flex: 0 0 150px;
      display: flex;
      align-items: center;
    }

    .userName {
      margin: 0 1vh;
      font-size: 1.5vh;
      color: white;
      line-height: 5vh;
    }
  }
</style>
