export default {
  // 页面逻辑
  path: '/Home',
  name: '数据工厂',
  redirect: '/Home/DataSourceManagement/ApiManagement',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: 'DataSourceManagement',
      name: '数据源管理',
      redirect: '/Home/DataSourceManagement/ApiManagement',
      component: () => import('@/layout/content.vue'),
      children: [
        {
          path: 'ApiManagement',
          name: '接口管理',
          component: () => import('@/pages/apiManagement.vue'),
          meta: {
            title: '接口管理',
          },
        },
        {
          path: 'ManualReg',
          name: '人工注册',
          component: () => import('@/pages/ManualReg.vue'),
        },
        {
          path: 'ManualReg/:id',
          name: 'ManualRegEdit',
          component: () => import('@/pages/ManualReg.vue'),
        },
      ],
    },
    {
      // 页面逻辑
      path: 'DataStandardsManagement',
      name: '数据标准管理',
      component: () => import('@/pages/contentTest.vue'),
    },
  ],
};
