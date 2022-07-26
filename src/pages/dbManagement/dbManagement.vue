<template>
  <div>
    <!-- 搜索 -->
    <div class="backColor ApiManagement">
      <a-form name="customized_form_controls" layout="inline" class="formAction">
        <a-form-item name="name" label="数据源名称:">
          <a-input v-model:value="formState.dbname" class="width" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="state" label="应用状态:">
          <a-select v-model:value="formState.dbstate" placeholder="请选择" label-in-value class="width">
            <a-select-option v-for="item in dbStateOptions" :key="item.value">{{ item.lable }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item class="formBtn">
          <a-button type="primary" style="margin-left: 10px; background: #1890ff" @click="inquire">查询</a-button>
          <a-button @click="reset">重置</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="backColor tableWarp" style="margin: 10px 0">
      <!-- 新增 -->
      <div class="tableactionGroup">
        <a-button type="primary" style="margin-left: 10px; background: #1890ff" @click="addData('new')">新增数据源</a-button>
      </div>
      <!-- 新增数据源抽屉 -->
      <a-drawer :visible="visible" size="large" title="新增数据源" :destroy-on-close="true" @close="onClose">
        <addDataSource :visible="visible" :codeid="codeid" @changevisible="changevisible"></addDataSource>
      </a-drawer>
      <!-- 表格 -->
      <div class="antdTable">
        <a-table :columns="columns" :data-source="data" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'code_state'">
              <span class="isNopublish" :style="{ background: dbState[record.code_state].color }"></span>
              {{ dbState[record.code_state].value }}
            </template>

            <!-- 编辑部分 -->
            <template v-if="column.dataIndex === 'code_operation'">
              <div>
                <a-popconfirm @confirm="release(record)">
                  <a class="a">连通测试</a>
                </a-popconfirm>

                <a-popconfirm title="请确认是否停用该接口" ok-text="确认" cancel-text="取消" @confirm="disable(record)">
                  <a v-if="record.code_state === 2" class="a">停用</a>
                </a-popconfirm>

                <a-popconfirm title="请确认是否发布该接口" ok-text="确认" cancel-text="取消" @confirm="release(record)">
                  <a v-if="record.code_state === 1 || record.code_state === 3" class="a">发布</a>
                </a-popconfirm>

                <a v-if="record.code_state === 1 || record.code_state === 3" class="a" @click="addData('edit')">编辑</a>

                <a-popconfirm v-if="record.code_state === 1" title="请确认是否删除该接口?" ok-text="是" cancel-text="否" @confirm="confirm(record.key)" @cancel="cancel">
                  <a class="a">删除</a>
                </a-popconfirm>
              </div>
            </template>
          </template>
        </a-table>
        <!-- 分页 -->
        <div class="pagination">
          <a-pagination v-model:current="current1" v-model:page-size="pageSize1" show-quick-jumper :total="total" :show-total="total => `共 ${total} 条数据`" @change="onChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // 引入新增数据源组件
  import addDataSource from './addDataSource.vue';
  import type { SelectProps, TableProps, Pagination } from 'ant-design-vue';
  // 引入表格配置
  import { columns, data, dbState, dbStateOptions } from './dbtypes';
  // 引入自定义表单数据类型
  import type * as DBType from './dbtypes';
  const current1 = ref<number>(1); //当前页码
  const pageSize1 = ref<number>(5); //每页显示条数
  const total = ref<number>(0);
  total.value = data.length;

  // 声明表单绑定数据
  const formState = reactive<DBType.FormState>({
    dbstate: null, //应用状态
    dbname: null, //数据库名称
  });

  // 发送请求获取列表详情
  const reset = () => {
    state.value = '';

    console.log(state.value);

    // 发送请求查询
  };
  const inquire = () => {
    console.log(state.value);

    // 发送请求查询
  };
  // 发布
  const release = e => {
    console.log(e.id);
    // 发布请求
  };
  // 停用
  const disable = e => {
    console.log(e.id);
    // 停用请求
  };
  // 删除
  const confirm = e => {
    console.log(e);
    // 删除请求
  };

  //当前页码和每页显示条数发生改变,发送请求
  const onChange = (page: number, pageSize: number) => {
    console.log('Page: ', page, 'pageSize: ', pageSize);
    // 页码发生改变发送请求
  };

  //抽屉组件
  const visible = ref<boolean>(false);
  const onClose = () => {
    visible.value = false;
  };
  const codeid = ref('');
  const addData = (x: string) => {
    visible.value = true;
    // console.log(x);
    codeid.value = x;
  };
  const changevisible = (val: { data: boolean }) => {
    visible.value = val.data;
  };
</script>
<style lang="less" scoped>
  .backColor {
    padding: 1px 0;
    background-color: #ffffff;
  }

  .ApiManagement {
    // margin: 0 0 10px;
    .formAction {
      display: flex;
      margin: 20px;
      padding: 0 10px;
    }

    .width {
      width: 200px;
    }

    .formBtn {
      flex: 1;

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

  .a {
    margin-right: 10px;
  }

  // 分页
  .pagination {
    // background-color: rgb(173, 76, 76);
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
</style>
