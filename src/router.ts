import { createRouter, createWebHistory } from 'vue-router';

import Index from '@/pages/Index.vue';

import { routeModuleList } from './router/index';

const router = createRouter({
  history: createWebHistory(),
  routes: routeModuleList,
});

export default router;
