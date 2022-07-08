<template>
  <a-layout class="content">
    <div class="divAndSectionPublic"></div>
    <section class="divAndSectionPublic">
      <a-breadcrumb style="margin: 1.3vh 0; font-size: 1.6vh">
        <a-breadcrumb-item v-for="item in routeMatch" :key="item.name">{{ item.name }}</a-breadcrumb-item>
      </a-breadcrumb>
    </section>
    <a-layout-content class="main" :style="{ margin: ['0', '2.4vh', '2.4vh'], minHeight: '80vh' }">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
  import { useRoute, RouteLocationMatched } from 'vue-router';
  import { computed } from 'vue';
  import { cloneDeep } from 'lodash-es';
  const routeMatch = computed<RouteLocationMatched[]>(() => {
    const match = cloneDeep(useRoute().matched) as RouteLocationMatched[];
    match.splice(0, 1);
    return match;
  });
</script>

<style scoped lang="less">
  .content {
    .main {
      display: flex;
      flex-direction: column;
    }

    .divAndSectionPublic {
      width: 100%;
      height: 5vh;
    }

    section {
      position: fixed;
      z-index: 9;
      padding: 0 2.4vh;
      background-color: rgb(255, 255, 255);
    }
  }
</style>
