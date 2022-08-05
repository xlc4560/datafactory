<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible class="placeholderLabel" collapsed-width="40"></a-layout-sider>
  <a-layout-sider v-model:collapsed="collapsed" collapsible class="navMenu" collapsed-width="40">
    <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" :style="{ height: '100%', borderRight: 0 }" @open-change="clickMenu" @click="clickMenu">
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
            <a-menu-item v-for="i in item.children" :key="i.key">
              <span>
                {{ i.subName }}
              </span>
            </a-menu-item>
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
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router';
  import { Icon } from '@/utils/icon';
  import type { menuType } from '../layout/types';
  // 内敛菜单收缩标识
  const collapsed = ref<boolean>(false);
  // 使用路由
  const router = useRouter();
  // 选中的
  const selectedKeys = ref<string[]>(['/DataFactory/DataSourceManagement/ApiManagement']);
  // 打开的
  const openKeys = ref<string[]>(['/DataFactory/DataSourceManagement']);
  const menuData = reactive<menuType[]>([
    {
      subName: '数据源管理',
      key: '/DataFactory',
      icon: 'UserOutlined',
      children: [
        {
          subName: '接口管理',
          key: '/DataFactory/DataSourceManagement/ApiManagement',
        },
        {
          subName: '已发布接口',
          key: '/DataFactory/DataSourceManagement/publishApi',
        },
        {
          subName: '数据库管理',
          key: '/api2',
        },
      ],
    },
    {
      subName: '数据标准管理',
      key: '/DataFactory/DataStandardsManagement/',
      icon: 'LaptopOutlined',
      children: [
        {
          subName: '码表管理',
          key: '/DataFactory/DataStandardsManagement/stopwatch',
        },
        {
          subName: '数据标准目录',
          key: '/DataFactory/DataStandardsManagement/standard',
        },
      ],
    },
  ]);
  //
  watch(
    useRoute(),
    newVal => {
      selectedKeys.value[0] = newVal.path;
    },
    { immediate: true },
  );

  // 菜单点击事件
  function clickMenu({ key }: { key: string | undefined }): void {
    if (key !== undefined) {
      router.push({
        path: key,
      });
    }
  }
</script>

<style scoped lang="less">
  .placeholderLabel {
    flex: 0 0 200px;
  }

  .navMenu {
    position: fixed;
    top: 50px;
    overflow-x: hidden; /* 禁止x轴滚动条 */
    overflow-y: auto;
    width: 200px;
    height: 93vh;
    background-color: rgb(255, 255, 255);

    &::-webkit-scrollbar {
      width: 0;
    }
  }
</style>
