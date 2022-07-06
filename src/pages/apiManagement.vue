<template>
  <!--  数据筛选部分-->
  <div class="backColor ApiManagement">
    <a-form layout="inline" :model="formState" class="formAction" @finish="handleFinish" @finish-failed="handleFinishFailed">
      <a-form-item label="接口来源:">
        <a-select v-model:value="formState.apiResource" size="middle" style="width: 200px" :options="options" placeholder="请选择" />
      </a-form-item>
      <a-form-item label="api状态:">
        <a-select v-model:value="formState.apiStatus" size="middle" style="width: 200px" :options="options" placeholder="请选择" />
      </a-form-item>
      <a-form-item label="接口名称:">
        <a-input v-model:value="formState.apiName" placeholder="请输入" />
      </a-form-item>
      <a-form-item style="flex: 1">
        <a-button type="primary" html-type="submit" style="float: right; margin: 0 0 0 10px">查 询</a-button>
        <a-button type="primary" ghost style="float: right" @click="resetFields">重 置</a-button>
      </a-form-item>
    </a-form>
  </div>
  <!--  数据列表部分-->
  <div class="backColor tableWarp" style="margin: 10px 0">
    <div class="tableactionGroup">
      <a-space :size="12">
        <a-button type="primary" disabled>批量发布</a-button>
        <a-button type="primary" disabled>批量停用</a-button>
        <a-button type="primary" disabled>批量分类</a-button>
        <a-button type="primary">人工注册</a-button>
      </a-space>
    </div>
    <div class="antdTable">
      <a-table
        :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
        :columns="columns"
        :row-key="record => record.login.uuid"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'apiName'">
            <a>{{ record.name.first }} {{ record.name.last }}</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { UnwrapRef } from 'vue';
  import type { FormProps, TableProps } from 'ant-design-vue';
  import { Form } from 'ant-design-vue';
  import axios from 'axios';
  import { usePagination } from 'vue-request';
  // 引入表格配置
  import { columns } from './types';
  // 引入自定义表单数据类型
  import type { FormState, APIParams, APIResult } from './types';
  //   import { post } from '../utils/request';
  // ant-design-vue内置的Form，可用于使用相应方法
  const useForm = Form.useForm;
  // 声明表单绑定数据
  const formState: UnwrapRef<FormState> = reactive({
    apiResource: null,
    apiStatus: null,
    apiName: '',
  });
  // 用于重置表单
  const { resetFields } = useForm(formState);
  // 表单数据验证成功回调事件
  const handleFinish: FormProps['onFinish'] = () => {
    const formData = new FormData();
    formData.append('apiResource', formState.apiResource as string);
    formData.append('apiStatus', formState.apiResource as string);
    formData.append('apiName', formState.apiResource as string);
    // const res = post('http://localhost:8080', formData);
    // console.log(res);
  };
  // 表单数据验证失败回调事件
  const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
    console.log(errors);
  };
  // select框下拉数据
  const options = [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }));

  // 加载数据源
  const queryData = (params: APIParams) => {
    return axios.get<APIResult>('https://randomuser.me/api?noinfo', { params });
  };
  console.log(queryData({ results: 10, page: 1 }));

  //
  const {
    data: dataSource,
    run,
    loading,
    current,
    pageSize,
  } = usePagination(queryData, {
    formatResult: res => res.data.results,
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'results',
    },
  });

  const pagination = computed(() => ({
    total: 200,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
  }));
  // 当点击分页组件时，该回调被触发
  const handleTableChange: TableProps['onChange'] = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
    // run触发usePagination中的queryData请求
    run({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      results: pag.pageSize!,
      page: pag?.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };
  type Key = string | number;
  const state = reactive<{
    selectedRowKeys: Key[];
    loading: boolean;
  }>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  });
  // const hasSelected = computed(() => state.selectedRowKeys.length > 0);

  // const start = () => {
  //   state.loading = true;
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     state.loading = false;
  //     state.selectedRowKeys = [];
  //   }, 1000);
  // };
  const onSelectChange = (selectedRowKeys: Key[]) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    state.selectedRowKeys = selectedRowKeys;
  };
</script>

<style scoped lang="less">
  .backColor {
    background-color: #ffffff;
  }

  .ApiManagement {
    margin: 0 0 10px;

    .formAction {
      display: flex;
      margin: 20px;
      padding: 0 10px;
    }
  }

  .tableWarp {
    width: 100%;

    .tableactionGroup {
      display: flex;
      //   background-color: #52c41a;
      padding: 20px 30px;
      width: 100%;
      flex-direction: row-reverse;
    }

    .antdTable {
      padding: 20px 30px;
    }
  }
</style>
