<template>
  <a-layout class="content">
    <div class="divAndSectionPublic"></div>
    <section class="divAndSectionPublic">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item v-for="item in routeMatch" :key="item.name">{{ item.meta.title }}</a-breadcrumb-item>
      </a-breadcrumb>
    </section>
    <a-layout-content class="main">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
  import { useRoute, RouteLocationMatched } from 'vue-router';
  import { computed } from 'vue';
  const routeMatch = computed<RouteLocationMatched[]>(() => {
    const match = [...useRoute().matched];
    // match.splice(0, 1);
    return match;
  });
</script>

<style scoped lang="less">
  .content {
    .main {
      display: flex;
      flex-direction: column;
      margin: 2vh;
      min-height: calc(100vh - 90px);
    }

    .divAndSectionPublic {
      width: 100%;
      height: 50px;
    }

    section {
      position: fixed;
      z-index: 9;
      padding: 0 24px;
      background-color: rgb(255, 255, 255);
    }
  }
</style>
