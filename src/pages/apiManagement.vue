<template>
  <!--  数据筛选部分-->
  <div class="backColor ApiManagement">
    <!-- 筛选组 -->
    <a-form layout="inline" :model="formState" class="formAction" @finish="handleFinish" @finish-failed="handleFinishFailed">
      <a-form-item label="接口来源:">
        <a-select v-model:value="formState.apiSource" :allow-clear="true" size="middle" style="width: 200px" :options="apiResourceOptions" placeholder="请选择" />
      </a-form-item>
      <a-form-item label="api状态:">
        <!-- :options="apiStateOptions"
          :field-names="{ label: 'label', value: 'value' }" -->
        <a-select v-model:value="formState.apiState" :allow-clear="true" size="middle" style="width: 200px" placeholder="请选择">
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
    <!-- 按钮操作组 -->
    <div class="tableactionGroup">
      <a-space :size="12">
        <a-button type="primary" :disabled="isDisabled">批量发布</a-button>
        <a-button type="primary" :disabled="isDisabled">批量停用</a-button>
        <a-button type="primary" :disabled="isDisabled">批量分类</a-button>
        <a-button type="primary" @click="goApiRegister">人工注册</a-button>
      </a-space>
    </div>
    <!-- 表格组 -->
    <div class="antdTable">
      <a-table
        :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
        :columns="columns"
        :row-key="record => record.apiId"
        :data-source="dataSource2"
        :pagination="pagination"
        :loading="loading"
        size="middle"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'apiName'">
            <a @click="apiDeatils(record)">{{ record.apiName }}</a>
          </template>
          <template v-if="column.dataIndex === 'apiClassify'">
            {{ record.apiClassify ? record.apiClassify : '暂无数据' }}
          </template>
          <template v-if="column.dataIndex === 'apiState'">
            <span class="isNopublish" :style="{ background: apiState[record.apiState].color }"></span>
            {{ apiState[record.apiState].value }}
          </template>
          <template v-if="column.dataIndex === 'apiOperation'">
            <a-button type="link" size="small" @click="showDrawer">接口测试</a-button>
            <a-button v-if="record.apiState !== 3" type="link" size="small">发 布</a-button>
            <a-button v-if="record.apiState === 3" type="link" size="small">停 用</a-button>
            <a-button v-if="record.apiState !== 3" type="link" size="small">编 辑</a-button>
            <a-button v-if="record.apiState === 0" type="link" size="small">删 除</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <!-- 接口详情弹窗 -->
  <a-modal v-model:visible="modalVisible" width="1200px" :closable="false" style="top: 20px">
    <template #footer>
      <a-button key="back" @click="handleCancel">返回</a-button>
    </template>
    <!--  :records="records" -->
    <api-details :records="records" />
  </a-modal>
  <!-- 接口测试抽屉 -->
  <!-- <a-drawer v-model:visible="drawerVisible" class="custom-class" width="50%" title="接口测试" @after-visible-change="afterVisibleChange"> -->
  <api-test :key="drawerVisibleKey" :drawer-visible="drawerVisible" />
  <!-- </a-drawer> -->
</template>

<script setup lang="ts">
  import apiDetails from './apiDetails.vue';
  import type { FormProps, TableProps } from 'ant-design-vue';
  import { Form } from 'ant-design-vue';
  import axios from 'axios';
  // 分页
  import { usePagination } from 'vue-request';
  import { useRouter } from 'vue-router';
  // 引入表格配置
  import { columns, apiState } from './types';
  // 引入自定义表单数据类型
  import type * as ApiType from './types';
  import ApiTest from './apiTest.vue';
  // 网络请求
  import * as request from '@/api/test';
  // 路由操作
  const router = useRouter();
  // 路由跳转到人工注册页
  const goApiRegister = () => {
    router.push({
      path: '/Home/DataSourceManagement/ApiRegister',
    });
  };
  // ant-design-vue内置的Form，可用于使用相应方法
  const useForm = Form.useForm;
  // 声明表单绑定数据
  const formState = reactive<ApiType.FormState>({
    apiSource: undefined,
    apiState: undefined,
    apiName: '',
  });
  // 用于重置表单
  const { resetFields } = useForm(formState);
  // 表单数据验证成功回调事件（筛选数据）（筛序数据回调）
  const handleFinish: FormProps['onFinish'] = () => {
    const formData = new FormData();
    formData.append('apiResource', formState.apiSource as string);
    formData.append('apiStatus', formState.apiState as unknown as string);
    formData.append('apiName', formState.apiName as string);
    console.log({
      apiSource: formState.apiSource,
      apiState: formState.apiState,
      apiName: formState.apiName,
      pageNum: 10,
    });
    const res = request.GetApiList({
      apiSource: formState.apiSource,
      apiState: formState.apiState,
      apiName: formState.apiName,
      pageNum: 10,
    });
    console.log(res);
  };
  // 表单数据验证失败回调事件
  const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
    console.log(errors);
  };

  // select框下拉数据
  // 接口来源
  const apiResourceOptions: ApiType.apiSource[] = [{ value: '数据服务' }, { value: '指标管理' }, { value: '决策引擎' }, { value: '数据工厂' }];
  // 接口状态(用于渲染select框)
  const apiStateOptions: { value: number; lable: string }[] = [
    { value: 0, lable: '已停用' },
    { value: 1, lable: '草稿' },
    { value: 2, lable: '未发布' },
    { value: 3, lable: '已发布' },
  ];

  // 加载数据源
  const queryData = (params: ApiType.APIParams) => {
    return axios.get<ApiType.APIResult>('https://randomuser.me/api?noinfo', { params });
  };
  // 控制按钮是否可用（操作按钮组）
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
  // console.log(dataSource);

  // const a = ref<string>('嗨害嗨');
  // console.log(a);
  // 测试数据
  const dataSource2 = ref<ApiType.dataSource[]>([
    {
      apiId: '01',
      apiName: '接口1',
      apiDesc: '接口描述接口描述接口描述接口描述',
      apiSource: '数据工厂',
      apiState: 0,
      updateTime: '2021-12-12 12:24:25',
    },
    {
      apiId: '02',
      apiName: '接口2',
      apiDesc: '接口描述接口描述接口描述接口描述',
      apiSource: '数据工厂',
      apiState: 1,
      updateTime: '2021-12-12 12:24:26',
    },
    {
      apiId: '03',
      apiName: '接口3',
      apiDesc: '接口描述接口描述接口描述接口描述',
      apiSource: '数据工厂',
      apiState: 2,
      updateTime: '2021-12-12 12:24:27',
    },
    {
      apiId: '04',
      apiName: '接口4',
      apiDesc: '接口描述接口描述接口描述接口描述',
      apiSource: '数据工厂',
      apiState: 3,
      updateTime: '1990-08-23 11:17:12',
    },
  ]);
  const pagination = computed(() => ({
    total: 200,
    current: current.value,
    pageSize: pageSize.value,
    hideOnSinglePage: true,
    showQuickJumper: true,
    showTotal: () => `共${200}条`,
  }));
  // 当点击分页组件时，该回调被触发
  const handleTableChange: TableProps['onChange'] = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
    console.log(pag, sorter, filters);

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
  // 按钮是否禁用 当页头多选框状态改变时触发
  const onSelectChange = (selectedRowKeys: ApiType.Key[]) => {
    console.log(selectedRowKeys);

    if (selectedRowKeys.length) {
      isDisabled.value = false;
    } else {
      isDisabled.value = true;
    }
    state.selectedRowKeys = selectedRowKeys;
  };
  // 查看接口详情
  const modalVisible = ref<boolean>(false);
  const records = ref<object>({});
  const apiDeatils = (record: object) => {
    records.value = { ...record };
    modalVisible.value = true;
  };
  const handleCancel = (e: MouseEvent) => {
    console.log(e);
    modalVisible.value = false;
  };
  // 接口测试抽屉组件
  const drawerVisible = ref<boolean>(false);
  const drawerVisibleKey = ref<number>(0);
  const showDrawer = () => {
    drawerVisible.value = true;
    drawerVisibleKey.value++;
  };
</script>

<style scoped lang="less">
  .backColor {
    background-color: #ffffff;
  }

  .ApiManagement {
    // margin: 0 0 10px;

    .formAction {
      display: flex;
      margin: 20px;
      padding: 0 10px;
    }
  }

  .tableWarp {
    width: 100%;
    min-height: 70vh;

    .tableactionGroup {
      display: flex;
      //   background-color: #52c41a;
      padding: 20px 20px;
      width: 100%;
      flex-direction: row-reverse;
    }

    .antdTable {
      padding: 0 20px 10px;
    }

    .isNopublish {
      display: inline-block;
      // background: #faad14;
      margin-right: 3px;
      border-radius: 50%;
      width: 7px;
      height: 7px;
    }
  }
</style>
