<template>
  <div class="backColor tableWarp">
    <!-- 按钮操作组 -->
    <div class="tableactionGroup">
      <a-space :size="12">
        <a-button>批量发布</a-button>
        <a-button>批量停用</a-button>
        <a-button>批量分类</a-button>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1"> 1st menu item </a-menu-item>
              <a-menu-item key="2"> 2nd menu item </a-menu-item>
              <a-menu-item key="3"> 3rd item </a-menu-item>
            </a-menu>
          </template>
          <a-button type="primary"> 新增脚本 </a-button>
        </a-dropdown>
      </a-space>
    </div>
    <div class="antdTable">
      <a-table :columns="tableColumns">
        <template #headerCell="{ column }">
          <strong>{{ column.title }}</strong>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { tableColumns } from './data';
  import * as request from '@/api/scriptManagement';
  import { usePagination } from 'vue-request'; // 分页
  // 从pinia中引入集中管理的状态
  import useStore from '@/store';
  import { storeToRefs } from 'pinia';
  const { useScriptManagementStore, useCategoryStore } = useStore();
  const { useRun, filterData } = storeToRefs(useScriptManagementStore);
  const { fiterCategoryName } = storeToRefs(useCategoryStore);
  // 定义全局变量接收分页参数
  const order = ref<number | undefined>(undefined);
  const sizeGlobal = ref<number>(10);
  const pageGlobal = ref<number>(1);
  // 以下是分页逻辑
  const {
    data: dataSource,
    run,
    loading,
  } = usePagination(request.getScriptList, {
    defaultParams: [
      {
        page: 1,
        size: 10,
        orderByDate: undefined,
      },
    ],
  });
  // 表格分页配置
  const pagination = computed(() => ({
    total: 200,
    current: pageGlobal.value,
    pageSize: sizeGlobal.value,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: () => `共${200}条`,
  }));

  // 将run方法封装到函数中,便于后续使用
  useRun.value = () => {
    run({
      scriptCategory: fiterCategoryName.value,
      ...filterData.value,
    });
  };
</script>

<style></style>
