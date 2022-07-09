export default {
  // 页面逻辑
  path: '/',
  name: '首页',
  redirect: '/Home',
  component: () => import('@/layout/content.vue'),
};
