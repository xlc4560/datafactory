<template>
  <div class="apiManagementFather">
    <!-- 分类区 -->
    <div class="category">
      <classification category-schema="接口分类" />
    </div>
    <div class="tableBox">
      <!--  数据筛选部分-->
      <div class="backColor ApiManagement">
        <!-- 筛选组 -->
        <a-form layout="inline" :model="formState" class="formAction" @finish="handleFinish">
          <a-form-item label="接口来源:" class="formItemWidth">
            <a-select v-model:value="formState.apiSource" :allow-clear="true" size="middle" :options="apiResourceOptions" placeholder="请选择" />
          </a-form-item>
          <a-form-item label="api状态:" class="formItemWidth">
            <!-- :options="apiStateOptions"
          :field-names="{ label: 'label', value: 'value' }" -->
            <a-select v-model:value="formState.apiState" :allow-clear="true" size="middle" placeholder="请选择">
              <a-select-option v-for="item in apiStateOptions" :key="item.value">{{ item.lable }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="接口名称:" class="formItemWidth">
            <a-input v-model:value="formState.apiName" placeholder="请输入" />
          </a-form-item>
          <a-form-item class="formBtn">
            <a-button type="primary" html-type="submit">查 询</a-button>
            <a-button type="primary" ghost @click="ResetFields">重 置</a-button>
          </a-form-item>
        </a-form>
      </div>
      <!--  数据列表部分-->
      <div class="backColor tableWarp">
        <!-- 按钮操作组 -->
        <div class="tableactionGroup">
          <a-space :size="12">
            <a-button type="primary" :disabled="isDisabled" @click="updateApisState('1', state.selectedRowKeys)">批量发布</a-button>
            <a-button type="primary" :disabled="isDisabled" @click="updateApisState('0', state.selectedRowKeys)">批量停用</a-button>
            <a-button type="primary" :disabled="isDisabled">批量分类</a-button>
            <a-button type="primary" @click="goApiRegister">人工注册</a-button>
          </a-space>
        </div>
        <!-- 表格组 -->
        <div class="antdTable">
          <a-table
            :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
            :columns="columns"
            :row-key="rowKey"
            :data-source="dataSource?.records"
            :pagination="pagination"
            :loading="loading"
            size="small"
            @change="handleTableChange"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'apiName'">
                <a @click="apiDeatils(record)">{{ record.apiName }}</a>
              </template>
              <template v-else-if="column.dataIndex === 'apiState'">
                <span class="isNopublish" :style="{ background: apiState[record.apiState].color }"></span>
                {{ apiState[record.apiState].value }}
              </template>
              <template v-else-if="column.dataIndex === 'apiOperation'">
                <a-button type="link" size="small" @click="showDrawer(true, record.id)">接口测试</a-button>
                <a-button v-if="record.apiState === 4 || record.apiState === 2" type="link" size="small" @click="updateApisState('1', [record.id + ''])">发 布</a-button>
                <a-button v-if="record.apiState === 3" type="link" size="small" @click="updateApisState('0', [record.id + ''])">停 用</a-button>
                <a-button v-if="record.apiState !== 3" type="link" size="small" @click="updateApi(record?.id)">编 辑</a-button>
                <a-button v-if="record.apiState === 1 || record.apiState === 2" type="link" size="small" @click="deleteApi(record)">删 除</a-button>
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
      </div>
    </div>

    <!-- 接口详情弹窗 -->
    <a-modal v-model:visible="modalVisible" width="1200px" :closable="false" style="top: 10vh" class="aModal">
      <template #footer>
        <a-button key="back" @click="handleCancel">返回</a-button>
      </template>
      <api-details :records="records" />
    </a-modal>
    <!-- 接口测试抽屉 -->
    <api-test :drawer-visible="drawerVisible" :api-id="apiId + ''" @on-close="visible => showDrawer(visible, apiId)" />
  </div>
</template>

<script setup lang="ts">
  import apiDetails from './apiDetails.vue';
  import classification from '@/pages/category/index.vue';
  import type { FormProps } from 'ant-design-vue';
  import { Form } from 'ant-design-vue';
  // 页面固定配置项
  import { apiResourceOptions, apiStateOptions } from './data';
  // 分页
  import { usePagination } from 'vue-request';
  import { useRouter } from 'vue-router';
  // 引入表格配置
  import { columns, apiState } from './data';
  // 引入自定义表单数据类型
  import type * as ApiType from './types';
  import ApiTest from './apiTest.vue';
  // 网络请求
  import * as request from '@/api/apiManagement';
  import { storeToRefs } from 'pinia';
  // 从pinia中引入集中管理的状态
  import useStore from '@/store';
  const { useCategoryStore } = useStore();
  const { fiterCategoryName } = storeToRefs(useCategoryStore);
  // 将run封装到函数中避免多次调用重复传参
  const useRun = () => {
    run(
      {
        apiSource: formState.apiSource,
        apiState: formState.apiState,
        apiName: formState.apiName,
        page: pageNumGlobal.value,
        updateTimeOrder: order.value,
        pageSize: pageSizeGlobal.value,
        apiType: fiterCategoryName.value,
      },
      order.value,
    );
  };
  watch(
    fiterCategoryName,
    () => {
      useRun();
    },
    { deep: true },
  );
  const order = ref<0 | 1 | null>(0);
  const pageSizeGlobal = ref<number>(10);
  const pageNumGlobal = ref<number>(1);
  const apiId = ref<string>('');
  // 路由操作
  const router = useRouter();
  // 路由跳转到人工注册页
  const goApiRegister = () => {
    router.push({
      path: '/DataFactory/DataSourceManagement/ApiRegister',
    });
  };
  // 表格row-key配置项
  const rowKey = (record: { id: number }) => record.id + '';

  // ant-design-vue内置的Form，可用于使用相应方法
  const useForm = Form.useForm;
  // 声明表单绑定数据
  const formState = reactive<ApiType.FormState>({
    apiSource: null,
    apiState: null,
    apiName: '',
    code_state: null,
    code_name: null,
  });
  // 用于重置表单
  const ResetFields = () => {
    resetFields();
    order.value = 0;
    pageNumGlobal.value = 1;
    pageSizeGlobal.value = 10;
    useRun();
  };
  const { resetFields } = useForm(formState);
  // 表单数据验证成功回调事件（筛选数据）（筛序数据回调）
  const handleFinish: FormProps['onFinish'] = () => {
    pageNumGlobal.value = 1;
    pageSizeGlobal.value = 10;
    useRun();
  };
  // 控制按钮是否可用（操作按钮组）
  const isDisabled = ref<boolean>(true);
  // 解构usePagination返回值用于表格及分页操作
  const {
    data: dataSource,
    run,
    loading,
  } = usePagination(request.GetApiList, {
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'pageSize',
    },
  });
  // 分页组件配置项
  const pagination = computed(() => ({
    total: dataSource.value?.total,
    current: pageNumGlobal.value,
    pageSize: pageSizeGlobal.value,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: () => `共${dataSource.value?.total}条`,
  }));
  // 当点击分页组件时，该回调被触发
  const handleTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
    order.value = sorter.order === 'ascend' ? 1 : sorter.order === 'descend' ? 0 : null;
    pageSizeGlobal.value = pag.pageSize;
    pageNumGlobal.value = pag.current;
    // run触发usePagination中的queryData请求
    useRun();
  };
  // Key在上方引入
  const state = reactive<{
    selectedRowKeys: string[];
    loading: boolean;
  }>({
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  });
  // 按钮是否禁用 当页头多选框状态改变时触发
  const onSelectChange = (selectedRowKeys: string[]) => {
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
  const apiDeatils = async (record: { id: string }) => {
    records.value = {
      ...(await request.GetApiDetails(record.id)),
    };
    modalVisible.value = true;
  };
  const handleCancel = () => {
    modalVisible.value = false;
  };
  // 接口编辑按钮
  const updateApi = async (id: string) => {
    router.push({
      name: 'ApiUpdate',
      params: {
        id,
      },
    });
  };
  // 接口测试抽屉组件
  const drawerVisible = ref<boolean>(false);
  const showDrawer = (visible: boolean, id: string) => {
    apiId.value = id;
    drawerVisible.value = visible;
  };
  // 接口删除操作
  const deleteApi = async (record: { id: string }) => {
    await request.DeleteApi(record.id);
    useRun();
  };
  // 批量更改接口状态
  const updateApisState = async (operation: string | number, idList: string[]) => {
    await request.UpdateApiState({ operation: operation + '', idList });
    useRun();
  };
</script>
<style scoped lang="less">
  .apiManagementFather {
    position: relative;
    width: 100%;

    .category {
      position: absolute;
      width: 16vw;
      height: 100%;
      background-color: white;
    }

    .backColor {
      background-color: #ffffff;
    }
    // table盒子
    .tableBox {
      margin-left: 17vw;
      // 筛选部分相关
      .ApiManagement {
        position: relative;
        overflow: hidden;
        width: 100%;

        .formAction {
          display: flex;
          flex-flow: row nowrap;
          margin: 20px;
          padding: 0 10px;
          width: 100%;

          .formItemWidth {
            flex: 2;
          }

          .formBtn {
            flex: 3;
            margin-right: 30px;

            button {
              float: right;

              &:nth-child(1) {
                margin: 0 0 0 10px;
              }
            }
          }
        }
      }
      // 表格相关
      .tableWarp {
        margin: 10px 0 0 0;
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
    }
  }
</style>
