<template>
  <!--  数据筛选部分-->
  <div class="backColor ApiManagement">
    <a-form layout="inline" :model="formState" class="formAction" @finish="handleFinish" @finish-failed="handleFinishFailed">
      <a-form-item label="接口来源:">
        <a-select v-model:value="formState.apiResource" :allow-clear="true" size="middle" style="width: 200px" :options="apiResourceOptions" placeholder="请选择" />
      </a-form-item>
      <a-form-item label="api状态:">
        <!-- :options="apiStateOptions"
          :field-names="{ label: 'label', value: 'value' }" -->
        <a-select v-model:value="formState.apiSate" :allow-clear="true" size="middle" style="width: 200px" placeholder="请选择">
          <a-select-option v-for="item in apiStateOptions" :key="item.value">{{ item.lable }}</a-select-option>
        </a-select>
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
        <a-button type="primary" :disabled="isDisabled">批量发布</a-button>
        <a-button type="primary" :disabled="isDisabled">批量停用</a-button>
        <a-button type="primary" :disabled="isDisabled">批量分类</a-button>
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
            <a @click="apiDeatils(record)">{{ record.name.first }} {{ record.name.last }}</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <a-modal v-model:visible="visible" width="1200px" :closable="false">
    <template #footer>
      <a-button key="back" @click="handleCancel">返回</a-button>
    </template>
    <api-details :records="records" />
  </a-modal>
</template>

<script setup lang="ts">
  import apiDetails from './apiDetails.vue';
  import type { UnwrapRef } from 'vue';
  import type { FormProps, TableProps } from 'ant-design-vue';
  import { Form } from 'ant-design-vue';
  import axios from 'axios';
  import { usePagination } from 'vue-request';
  // 引入表格配置
  import { columns } from './types';
  // 引入自定义表单数据类型
  import type * as ApiType from './types';
  //   import { post } from '../utils/request';
  // ant-design-vue内置的Form，可用于使用相应方法
  const useForm = Form.useForm;
  // 声明表单绑定数据
  const formState: UnwrapRef<ApiType.FormState> = reactive({
    apiResource: null,
    apiSate: null,
    apiName: '',
  });
  // 用于重置表单
  const { resetFields } = useForm(formState);
  // 表单数据验证成功回调事件（筛选数据）
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
  // 接口来源
  const apiResourceOptions: ApiType.apiSource[] = [{ value: '数据服务' }, { value: '指标管理' }, { value: '决策引擎' }, { value: '数据工厂' }];
  // 接口状态
  const apiStateOptions: ApiType.apiState[] = [
    { value: 0, lable: '已停用' },
    { value: 1, lable: '草稿' },
    { value: 2, lable: '未发布' },
    { value: 3, lable: '已发布' },
  ];

  // 加载数据源
  const queryData = (params: ApiType.APIParams) => {
    return axios.get<ApiType.APIResult>('https://randomuser.me/api?noinfo', { params });
  };
  // 控制按钮是否可用
  const isDisabled = ref<boolean>(true);

  // 解构usePagination返回值用于表格及分页操作
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
  // console.log(dataSource.value);

  // const a = ref<string>('嗨害嗨');
  // console.log(a.value);

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
  // Key在上方引入
  const state = reactive<{
    selectedRowKeys: ApiType.Key[];
    loading: boolean;
  }>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  });
  const onSelectChange = (selectedRowKeys: ApiType.Key[]) => {
    if (selectedRowKeys.length) {
      isDisabled.value = false;
    } else {
      isDisabled.value = true;
    }
    state.selectedRowKeys = selectedRowKeys;
  };
  // 查看接口详情
  const visible = ref<boolean>(false);
  const records = ref<object>({});
  const apiDeatils = (record: object) => {
    records.value = { ...record };
    console.log(records.value);
    visible.value = true;
  };
  const handleCancel = (e: MouseEvent) => {
    console.log(e);
    visible.value = false;
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
