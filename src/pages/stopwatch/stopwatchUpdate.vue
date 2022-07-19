<template>
  <a-form
    :model="formState"
    name="basic"
    class="stopwatchUpdate"
    :label-col="{ style: { width: '100px' } }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <div class="title___2CoZR">码表基本信息</div>
    <a-form-item label="码表名称" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item label="码表说明" name="password">
      <a-textarea v-model:value="formState.password" :rows="3" />
    </a-form-item>
    <a-divider />
    <a-table :columns="stopwatchUpdate_columns" :data-source="editData" size="small" :pagination="false">
      <template #title>
        <div class="table_title">
          <div class="title___2CoZR">码值配置</div>
          <a-button @click="addConfigurationItem">添加配置项</a-button>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <!-- v-model:value="editableData[record.key][column.dataIndex]" -->
          <a-input v-model:value="record.name" style="margin: -5px 0" />
        </template>
        <template v-else-if="column.dataIndex === 'money'">
          <a-input v-model:value="record.money" style="margin: -5px 0" />
        </template>
        <template v-else-if="column.dataIndex === 'address'">
          <a-input v-model:value="record.address" style="margin: -5px 0" />
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-popconfirm title="确认删除?" ok-text="是" cancel-text="否" @confirm="deleteConfigurationItem(record)">
            <a href="#">删 除</a>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </a-form>
</template>

<script setup lang="ts">
  import { stopwatchUpdate_columns } from './stopwatchData';
  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
  });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const data = [
    {
      key: '1',
      name: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
      action: 0,
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
      action: 0,
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
      action: 0,
    },
  ];
  //   响应式列表数据
  const editData = ref<any>(
    data.reduce((total: any, currentValue): object[] => {
      total.push(reactive<any>(currentValue));
      return total;
    }, []),
  );
  //   添加配置项回调
  const addConfigurationItem = () => {
    editData.value.push(
      reactive<any>({
        key: '',
        name: '',
        money: '',
        address: '',
        action: null,
      }),
    );
  };
  //   删除配置项回调
  const deleteConfigurationItem = (item: any) => {
    const index = editData.value.indexOf(item);
    editData.value.splice(index, 1);
  };
</script>

<style lang="less">
  th.column-money,
  td.column-money {
    text-align: right !important;
  }
  //   表单class
  .stopwatchUpdate {
    & .ant-form-item-control {
      flex: auto !important;
      max-width: 100% !important;
    }
    // 标题样式
    .title___2CoZR {
      position: relative;
      padding-left: 8px;
      font-weight: 700;
      line-height: 40px;

      &:before {
        content: '';
        position: absolute;
        top: calc(50% - 8px);
        left: 0;
        width: 3px;
        height: 16px;
        background: #1890ff;
      }
    }
    // 标题（码值配置）配置
    & .table_title {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
