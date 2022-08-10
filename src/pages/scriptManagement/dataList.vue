<template>
  <div class="backColor tableWarp">
    <!-- 按钮操作组 -->
    <div class="tableactionGroup">
      <a-space :size="12">
        <a-button :disabled="btnIsDisabled" @click="updateState({ idList: state.selectedRowKeys, scriptState: 1 })">批量发布</a-button>
        <a-button :disabled="btnIsDisabled" @click="updateState({ idList: state.selectedRowKeys, scriptState: 2 })">批量停用</a-button>
        <a-button :disabled="btnIsDisabled" @click="updateScriptType">批量分类</a-button>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1"> Python脚本 </a-menu-item>
              <a-menu-item key="2"> SQL脚本 </a-menu-item>
            </a-menu>
          </template>
          <a-button type="primary"> 新增脚本 </a-button>
        </a-dropdown>
      </a-space>
    </div>
    <div class="antdTable">
      <a-table
        :row-selection="{ selectedRowKeys: selectedRowKeysRef, onChange: onSelectChange }"
        :row-key="rowKey"
        :columns="tableColumns"
        :data-source="dataSource?.scriptInfoList"
        :loading="loading"
        :pagination="pagination"
        size="small"
        @change="handleTableChange"
      >
        <template #headerCell="{ column }">
          <strong>{{ column.title }}</strong>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'scriptName'">
            <a>{{ record.scriptName }}</a>
          </template>
          <template v-else-if="column.dataIndex === 'scriptState'">
            <span class="isNopublish" :style="{ background: codeState[record.scriptState].color }"></span>
            {{ codeState[record.scriptState].value }}
          </template>
          <template v-else-if="column.dataIndex === 'scriptType'">
            {{ scriptType[record.scriptType].lable }}
          </template>
        </template>
      </a-table>
    </div>
    <!-- 修改分类 -->
    <a-modal v-model:visible="modalVisible" width="1000px" title="脚本批量分类">
      <a-form :model="newScriptCategory">
        <a-form-item label="脚本分类" has-feedback name="value" :rules="[{ required: true, message: '请输入必填项!' }]">
          <a-select v-model:value="newScriptCategory.value" :allow-clear="true" placeholder="请选择分类!" @dropdown-visible-change="modalSelectDropDown">
            <a-select-option key="0">{{ 'xxxx' }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { tableColumns, codeState, scriptType } from './data';
  import * as request from '@/api/scriptManagement';
  import { ReadCategory } from '@/api/category';
  import { usePagination } from 'vue-request'; // 分页
  // 从pinia中引入集中管理的状态
  import useStore from '@/store';
  import { storeToRefs } from 'pinia';
  const { useScriptManagementStore, useCategoryStore } = useStore();
  const { useRun, filterData } = storeToRefs(useScriptManagementStore);
  const { fiterCategoryName } = storeToRefs(useCategoryStore);
  watch(
    () => fiterCategoryName,
    () => {
      console.log(fiterCategoryName);
    },
    { deep: true },
  );
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
    total: dataSource.value?.total,
    current: filterData.value.page,
    pageSize: filterData.value.size,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: () => `共${dataSource.value?.total}条`,
  }));

  // 将run方法封装到函数中,便于后续使用
  useRun.value = () => {
    run(filterData.value);
  };
  // 点击排序或者分页组件时会触发
  const handleTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
    filterData.value.orderByDate = sorter.order === 'ascend' ? 1 : sorter.order === 'descend' ? 0 : undefined;
    filterData.value.size = pag.pageSize;
    filterData.value.page = pag.current;
    run(filterData.value);
  };
  const btnIsDisabled = ref<boolean>(false);
  // 表格rowkey
  const rowKey = (record: { [key: string]: any; record: string }) => record.id;
  // 多选状态
  const state = reactive<{
    selectedRowKeys: (string | number)[];
  }>({
    selectedRowKeys: [1], // Check here to configure the default column
  });
  const { selectedRowKeys: selectedRowKeysRef } = toRefs(state);
  // 当选择状态发生改变时的回调
  const onSelectChange = (selectedRowKeys: (string | number)[]) => {
    if (selectedRowKeys.length > 0) {
      btnIsDisabled.value = false;
    } else {
      btnIsDisabled.value = true;
    }
    state.selectedRowKeys = selectedRowKeys;
  };

  // 批量修改状态
  const updateState = (params: { idList: (number | string)[]; scriptState: number }) => {
    request.updateState(params);
  };
  const newScriptCategory = ref<{ value: string }>({ value: '' });
  // 控制弹窗是否显示
  const modalVisible = ref<boolean>(false);
  // 批量修改分类
  const updateScriptType = () => {
    modalVisible.value = true;
  };
  const modalSelectDropDown = async () => {
    console.log(await ReadCategory('脚本分类'));
  };
</script>

<style></style>
