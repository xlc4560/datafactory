<template>
  <h1>{{ title }}</h1>
  <a-button>test</a-button>
  <a-input placeholder="Basic usage" />
  <a-space>
    <home-outlined />
    <setting-filled />
    <smile-outlined />
    <sync-outlined spin />
    <smile-outlined :rotate="180" />
    <loading-outlined />
  </a-space>
</template>
<script lang="ts" setup>
  import { HomeOutlined, SettingFilled, SmileOutlined, SyncOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { getWth } from '@/api/test';
  console.log(
    getWth().then(res => {
      console.log(res);
    }),
  );

  const title = ref(useRoute().matched[0].meta.title);
</script>
