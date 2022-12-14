export default {
  // 页面逻辑
  path: '/DataFactory',
  name: 'DataFactory',
  meta: {
    title: '数据工厂',
  },
  redirect: '/DataFactory/DataSourceManagement/ApiManagement',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: 'DataSourceManagement',
      name: 'DataSourceManagement',
      meta: {
        title: '数据源管理',
      },
      redirect: '/DataFactory/DataSourceManagement/ApiManagement',
      component: () => import('@/layout/content.vue'),
      children: [
        {
          path: 'ApiManagement',
          name: 'ApiManagement',
          component: () => import('@/pages/apiManagement/apiManagement.vue'),
          meta: {
            title: '接口管理',
          },
        },
        {
          path: 'dbManagement',
          name: 'dbManagement',
          component: () => import('@/pages/dbManagement/dbManagement.vue'),
          meta: {
            title: '数据库管理',
          },
        },
        {
          path: 'ApiRegister',
          name: 'ApiRegister',
          meta: {
            title: '人工注册',
          },
          component: () => import('@/pages/apiRegisterAndUpdate/index.vue'),
        },
        {
          path: 'ApiRegister/:id',
          name: 'ApiUpdate',
          meta: {
            title: '编辑',
          },
          component: () => import('@/pages/apiRegisterAndUpdate/index.vue'),
        },
        {
          path: 'publishApi',
          name: 'publishApi',
          component: () => import('@/pages/error/index.vue'),
          meta: {
            title: '发布接口',
          },
        },
      ],
    },
    {
      // 页面逻辑
      path: 'DataStandardsManagement',
      name: '数据标准管理',
      meta: {
        title: '数据标准管理',
      },
      component: () => import('@/layout/content.vue'),
      children: [
        {
          path: 'stopwatch',
          name: 'stopwatch',
          component: () => import('@/pages/stopwatch/index.vue'),
          meta: {
            title: '码表管理',
          },
        },
        {
          path: 'standard',
          name: 'standard',
          component: () => import('@/pages/standard/index.vue'),
          meta: {
            title: '数据标准目录',
          },
        },
        {
          path: 'dataAssetCatalog',
          name: 'dataAssetCatalog',
          component: () => import('@/pages/dataAssetCatalog/index.vue'),
          meta: {
            title: '数据资产目录',
          },
        },
      ],
    },
    {
      path: 'ScriptManagement',
      name: 'ScriptManagement',
      meta: {
        title: '脚本管理',
      },
      component: () => import('@/layout/content.vue'),
      redirect: '/DataFactory/ScriptManagement/scriptManagement',
      children: [
        {
          path: 'scriptManagement',
          name: 'scriptManagement',
          component: () => import('@/pages/scriptManagement/index.vue'),
          meta: {
            title: '脚本管理',
          },
        },
      ],
    },
    {
      path: 'TaskManagement',
      name: 'TaskManagement',
      meta: {
        title: '任务管理',
      },
      component: () => import('@/pages/taskManagement/index.vue'),
    },
  ],
};
