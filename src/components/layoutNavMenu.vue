<template>
  <!--  :style="{flex: `0 0 ${width}`}"-->
  <div class="placeholderLabel"></div>
  <!--  v-model:collapsed="collapsed" collapsed-width="40"-->
  <a-layout-sider class="navMenu" width="200" style="background: #fff">
    <a-menu v-model:selectedKeys="selectedKeys2" v-model:openKeys="openKeys" mode="inline" :style="{ height: '100%', borderRight: 0 }" @open-change="clickMenu" @click="clickMenu">
      <template v-for="item in menuData" :key="item.key">
        <a-sub-menu v-if="item.children" :key="item.key">
          <template #title>
            <span>
              <!--动态渲染icon-->
              <Icon :icon="item.icon" />
              {{ item.subName }}
            </span>
          </template>
          <span v-if="!item.children"></span>
          <template v-else>
            <a-menu-item v-for="i in item.children" :key="i.key">{{ i.subName }}</a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item v-else :key="item.key + ''">
          <template #icon>
            <span>
              <!--动态渲染icon-->
              <Icon :icon="item.icon" />
              {{ item.subName }}
            </span>
          </template>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
  <!--  <a-button type="default" size="large" style="position: fixed; bottom: 0;" @click="toggleCollapsed(e)">-->
  <!--    <MenuUnfoldOutlined v-if="collapsed" />-->
  <!--    <MenuFoldOutlined v-else />-->
  <!--  </a-button>-->
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  // import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { Icon } from '@/utils/icon';
  import type { menuType } from '../layout/types';
  const selectedKeys2 = ref<string[]>(['/Home/DataSourceManagement/ApiManagement#/']);
  // 内敛菜单收缩标识
  // const collapsed = ref<boolean>(false);
  const openKeys = ref<string[]>(['/Home/DataSourceManagement']);
  const router = useRouter();
  const menuData = reactive<menuType[]>([
    {
      subName: '数据源管理',
      key: '/Home/DataSourceManagement',
      icon: 'UserOutlined',
      children: [
        {
          subName: '接口管理',
          key: '/Home/DataSourceManagement/ApiManagement#/',
        },
        {
          subName: '已发布接口',
          key: '/api1',
        },
        {
          subName: '数据库管理',
          key: '/api2',
        },
      ],
    },
    {
      subName: '数据标准管理',
      key: '/Home/DataStandardsManagement#/',
      icon: 'LaptopOutlined',
    },
  ]);
  // 获取placeholderLabel节点
  // const placeholderLabel = ref(null);
  // 设置初始宽度
  // const width = ref<string>('200px');
  // 菜单内联收缩事件回调
  // const toggleCollapsed = () => {
  //   width.value = collapsed.value ? '200px' : '40px';
  //   collapsed.value = !collapsed.value;
  //   openKeys.value = collapsed.value ? [] : ['/Home'];
  // };
  // 菜单点击事件
  function clickMenu({ key }: { key: string | undefined }): void {
    if (key !== undefined) {
      router.push({
        path: key,
      });
    }
  }
</script>

<style scoped>
  .placeholderLabel {
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    background: rgb(255, 255, 255);
    flex: 0 0 200px;
  }

  .navMenu {
    position: fixed;
    top: 50px;
  }
</style>
