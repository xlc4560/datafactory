<template>
  <!--  数据筛选部分-->
  <div class="backColor ApiManagement">
    <!-- 筛选组 -->
    <a-form :model="formState" class="formAction" name="horizontal_login" layout="inline" autocomplete="off" @finish="onFinish" @finish-failed="onFinishFailed">
      <a-form-item label="标准编号:" name="snumber" class="width">
        <a-input v-model:value="formState.snumber"> </a-input>
      </a-form-item>

      <a-form-item label="中文名称:" name="cname" class="width">
        <a-input v-model:value="formState.cname"> </a-input>
      </a-form-item>

      <a-form-item label="英文名称:" name="ename" class="width">
        <a-input v-model:value="formState.ename"> </a-input>
      </a-form-item>

      <a-form-item label="标准状态:" name="sstate" class="width">
        <a-select v-model:value="formState.sstate" :options="options" @change="handleChange"></a-select>
      </a-form-item>

      <a-form-item class="formBtn">
        <a-button type="primary" html-type="submit">查询</a-button>
        <a-button html-type="submit">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
  <!--  数据列表部分-->
  <div class="backColor tableWarp" style="margin: 10px 0">
    <!-- 按钮操作组 -->
    <div class="tableactionGroup">
      <div class="tableactionGroup-item">
        <a-button class="li">批量发布</a-button>
        <a-button class="li">批量停用</a-button>
      </div>
      <div class="tableactionGroup-item">
        <a-button class="li">导入模板下载</a-button>
        <a-button class="li">标准导入</a-button>
        <a-button class="li" type="primary" @click="showDrawerAdd">新增标准</a-button>
      </div>
    </div>
    <!-- 表格 -->
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }" :row-selection="rowSelection">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'id'">
          <a @click="showModalDetails">{{ text }}</a>
        </template>
        <template v-if="column.key === 'operation'">
          <div class="option">
            <a>发布</a>
            <a>停用</a>
            <a>编辑</a>
            <a>删除</a>
          </div>
        </template>
      </template>
    </a-table>
  </div>
  <!-- 详情部分 -->
  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <StandardDetails></StandardDetails>
  </a-modal>

  <!-- 新增部分 -->
  <a-drawer v-model:visible="visibleAdd" :destroy-on-close="true" size="large" class="custom-class" style="color: red" title="新增标准" placement="right" @after-visible-change="afterVisibleChange">
    <AddStandard></AddStandard>
  </a-drawer>
</template>
<script lang="ts" setup>
  import { formState, options, columns, data } from './standardData'; //搜索表单数据,下拉选择,表头,表数据
  import { DataItem } from './standardType'; //类型定义
  import type { SelectProps } from 'ant-design-vue';
  import StandardDetails from './standardDetails.vue';
  import AddStandard from './AddStandard.vue';
  // 搜索
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleChange: SelectProps['onChange'] = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };
  // 多选
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
      console.log(selected, selectedRows, changeRows);
    },
  });
  // 详情
  const visible = ref<boolean>(false);

  const showModalDetails = () => {
    visible.value = true;
  };

  const handleOk = (e: MouseEvent) => {
    console.log(e);
    visible.value = false;
  };
  // 新增部分
  const visibleAdd = ref<boolean>(false);

  const afterVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
  };

  const showDrawerAdd = () => {
    visibleAdd.value = true;
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
      justify-content: space-between;
      margin: 20px;
      padding: 0 10px;
      flex-wrap: wrap;
    }

    .width {
      margin: 10px 30px;
      width: 400px;
    }

    .formBtn {
      flex: 1;
      margin: 10px 30px;

      button {
        float: right;

        &:nth-child(1) {
          margin: 0 0 0 10px;
        }
      }
    }
  }

  .tableWarp {
    width: 100%;
    min-height: 70vh;

    .tableactionGroup {
      display: flex;
      // width: 100%;
      // flex-direction: row-reverse;
      justify-content: space-between;
      // background-color: aqua;
      //   background-color: #52c41a;
      padding: 10px 20px;

      .tableactionGroup-item {
        .li {
          margin: 10px 10px;
        }
      }
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

  .option {
    display: flex;
    justify-content: space-around;
  }
</style>
