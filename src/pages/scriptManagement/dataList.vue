<template>
  <div class="backColor tableWarp">
    <!-- 按钮操作组 -->
    <div class="tableactionGroup">
      <a-space :size="12">
        <a-button :disabled="btnIsDisabled" @click="UpdateState({ idList: state.selectedRowKeys, operation: 1 })">批量发布</a-button>
        <a-button :disabled="btnIsDisabled" @click="UpdateState({ idList: state.selectedRowKeys, operation: 0 })">批量停用</a-button>
        <a-button :disabled="btnIsDisabled" @click="updateScriptType">批量分类</a-button>
        <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="openDrawer('scriptEditDrawer', 2)"> Python脚本 </a-menu-item>
              <a-menu-item key="2" @click="openDrawer('scriptEditDrawer', 3)"> SQL脚本 </a-menu-item>
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
            <a @click="openDrawer('scriptDetailsDrawer', 5, record)">{{ record.scriptName }}</a>
          </template>
          <template v-else-if="column.dataIndex === 'scriptState'">
            <span class="isNopublish" :style="{ background: codeState[record.scriptState].color }"></span>
            {{ codeState[record.scriptState].value }}
          </template>
          <template v-else-if="column.dataIndex === 'scriptType'">
            {{ scriptType[record.scriptType].lable }}
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <a-button type="link" @click="openDrawer('scriptTestDrawer', 5, record)">测试</a-button>
            <a-button v-if="[0, 2].includes(record.scriptState)" type="link" @click="openDrawer('scriptEditDrawer', record.scriptType, record)">编辑</a-button>
            <a-button v-if="[1].includes(record.scriptState)" type="link" @click="UpdateState({ idList: [record.id], operation: 0 })">停用</a-button>
            <a-button v-if="[0].includes(record.scriptState)" type="link" @click="deleteScript(record.id)">删除</a-button>
            <a-button v-if="[0, 2].includes(record.scriptState)" type="link" @click="UpdateState({ idList: [record.id], operation: 1 })">发布</a-button>
          </template>
          <template v-else>
            <a-tooltip placement="topLeft">
              <template #title>{{ record[column.dataIndex] }}</template>
              {{ record[column.dataIndex] }}
            </a-tooltip>
          </template>
        </template>
      </a-table>
    </div>
    <!-- 修改分类 -->
    <a-modal v-model:visible="modalVisible" width="1000px" title="脚本批量分类" style="top: 20vh" @ok="updateModalOk({ ids: state.selectedRowKeys, categoryCode: newScriptCategory.value })">
      <a-form ref="formRef" :model="newScriptCategory">
        <div style="min-height: 200px">
          <a-form-item label="脚本分类" has-feedback name="value" :rules="[{ required: true, message: '请输入必填项!' }]">
            <a-tree-select
              v-model:value="newScriptCategory.value"
              :tree-data="treeData"
              placeholder="请选择接口分类"
              show-search
              :field-names="{ label: 'name', value: 'categoryCode' }"
              allow-clear
              :dropdown-style="{ height: '200px' }"
              @dropdown-visible-change="modalSelectDropDown"
            ></a-tree-select>
          </a-form-item>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { tableColumns, codeState, scriptType, emptyCurrentScriptDetails } from './data';
  import * as request from '@/api/scriptManagement';
  import { scriptInfoListType } from '@/api/scriptManagement/apiReturnType';
  import { ReadCategory } from '@/api/category';
  import { usePagination } from 'vue-request'; // 分页
  import { filterData, useRun, currentScriptDetails, registerAndEditTitle } from './scriptHooks';
  import { message } from 'ant-design-vue';
  import { FormInstance } from 'ant-design-vue/es/form';
  import { cloneDeep } from 'lodash-es';

  const emits = defineEmits(['changeDrawerControlData']);
  // 以下是分页逻辑
  const {
    data: dataSource,
    run,
    loading,
  } = usePagination(request.GetScriptList, {
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
    console.log(filterData);

    run(filterData.value);
  };
  const btnIsDisabled = ref<boolean>(true);
  // 表格rowkey
  const rowKey = (record: { [key: string]: any; record: string }) => record.id;
  // 多选状态
  const state = reactive<{
    selectedRowKeys: number[];
  }>({
    selectedRowKeys: [], // Check here to configure the default column
  });
  const { selectedRowKeys: selectedRowKeysRef } = toRefs(state);
  // 当选择状态发生改变时的回调
  const onSelectChange = (selectedRowKeys: number[]) => {
    if (selectedRowKeys.length > 0) {
      btnIsDisabled.value = false;
    } else {
      btnIsDisabled.value = true;
    }
    state.selectedRowKeys = selectedRowKeys;
  };

  // 批量修改状态
  const UpdateState = async (params: { idList: number[]; operation: number }) => {
    try {
      loading.value = true;
      await request.UpdateScriptState(params);
      message.success('修改成功!', 1);
      state.selectedRowKeys = [];
      btnIsDisabled.value = true;
    } catch (error) {
    } finally {
      loading.value = false;
      await run(filterData.value);
    }
  };
  // 批量删除
  const deleteScript = async (scriptId: string | number) => {
    try {
      loading.value = true;
      await request.DeleteScript(scriptId);
      state.selectedRowKeys = [];
      btnIsDisabled.value = true;
    } catch (error) {
    } finally {
      loading.value = false;
      await run(filterData.value);
    }
  };
  const newScriptCategory = ref<{ value: string }>({ value: '' });
  // 控制弹窗是否显示
  const modalVisible = ref<boolean>(false);
  // 批量修改分类
  const updateScriptType = () => {
    modalVisible.value = true;
  };
  const formRef = ref<FormInstance>();
  const updateModalOk = async (params: { ids: number[]; categoryCode: string }) => {
    try {
      await formRef.value?.validate();
      await request.UpdateScriptCategory(params);
      state.selectedRowKeys = [];
      btnIsDisabled.value = true;
      message.success('修改成功', 1);
    } catch (error) {
    } finally {
      modalVisible.value = false;

      run(filterData.value);
    }
  };
  const treeData = ref<any>([]);
  const modalSelectDropDown = async () => {
    treeData.value = await ReadCategory('脚本分类');
  };
  const openDrawer = (dataName: string, drawerTitle: number, record?: scriptInfoListType) => {
    if (record) {
      currentScriptDetails.value = record;
    } else {
      currentScriptDetails.value = cloneDeep(emptyCurrentScriptDetails);
    }
    registerAndEditTitle.value = drawerTitle;
    emits('changeDrawerControlData', { dataName, value: true });
  };
</script>
