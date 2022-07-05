export default {
  // 页面逻辑
  path: '/Home',
  name: '首页',
  redirect: '/Home/DataSourceManagement/ApiManagement',
  component: () => import('../../layout/index.vue'),
  children: [
    {
      path: 'DataSourceManagement',
      name: '数据源管理',
      redirect: '/Home/DataSourceManagement/ApiManagement',
      component: () => import('../../pages/apiManagement.vue'),
      children: [
        {
          path: 'ApiManagement',
          name: '接口管理',
          component: () => import('../../pages/apiManagement.vue'),
        },
      ],
    },
    {
      // 页面逻辑
      path: 'DataStandardsManagement',
      name: '数据标准管理',
      component: () => import('../../pages/contentTest.vue'),
    },
  ],
};
