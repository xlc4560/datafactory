<template>
  <div>
    <!-- 搜索 -->
    <div class="backColor ApiManagement">
      <a-form name="customized_form_controls" layout="inline" class="formAction">
        <a-form-item name="name" label="数据源名称:">
          <a-input v-model:value="dataSourceList.dataSourceName" class="width" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="state" label="应用状态:">
          <a-select v-model:value="dataSourceList.dataSourceState" placeholder="请选择" value-in-label class="width" :options="dbStateOptions">
            <!-- <a-select-option v-for="item in dbStateOptions" :key="item.value">{{ item.lable }}</a-select-option> -->
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
        <addDataSource :visible="visible" :dbid="dbid" @changevisible="changevisible" @reset="reset"></addDataSource>
      </a-drawer>
      <!-- 表格 -->
      <div class="antdTable">
        <a-table :columns="columns" :data-source="data" :pagination="false" @change="sorterChange">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'dataSourceState'">
              <span class="isNopublish" :style="{ background: dataSourceState[record.dataSourceState].color }"></span>
              {{ dataSourceState[record.dataSourceState].value }}
            </template>

            <!-- 编辑部分 -->
            <template v-if="column.dataIndex === 'db_operation'">
              <div>
                <a class="a" @click="connected(record)">连通测试</a>

                <a-popconfirm title="请确认是否停用该数据库" ok-text="确认" cancel-text="取消" @confirm="disable(record)">
                  <a v-if="record.dataSourceState === 1" class="a">停用</a>
                </a-popconfirm>

                <a-popconfirm title="请确认是否发布该数据库" ok-text="确认" cancel-text="取消" @confirm="release(record)">
                  <a v-if="record.dataSourceState === 0 || record.dataSourceState === 2" class="a">发布</a>
                </a-popconfirm>

                <a v-if="record.dataSourceState === 0 || record.dataSourceState === 2" class="a" @click="addData(record.key)">编辑</a>

                <a-popconfirm v-if="record.dataSourceState === 0" title="请确认是否删除该数据库?" ok-text="是" cancel-text="否" @confirm="confirm(record.key)">
                  <a class="a">删除</a>
                </a-popconfirm>
              </div>
            </template>
          </template>
        </a-table>
        <!-- 分页 -->
        <div class="pagination">
          <a-pagination
            v-model:current="current1"
            v-model:page-size="pageSize1"
            show-quick-jumper
            :total="total"
            :show-total="total => `共 ${total} 条数据`"
            :page-size-options="['5', '10', '20', '30']"
            show-size-changer
            @change="onChange"
            @showSizeChange="onShowSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // 引入新增数据源组件
  import addDataSource from './addDataSource.vue';
  // 引入表格配置
  import { columns, dataSourceState, dbStateOptions } from './dbtypes';
  // 引入自定义表单数据类型
  import type * as DBType from './dbtypes';
  import { dbList, dbRevise, dbDelete, dbTest, dbDetail } from '@/api/dbManagement/index'; //获取接口列表,删除接口,修改状态,详情

  //定义列表数据
  const data = ref([]);

  //定义检索数据参数
  let current1 = ref<number>(1); //当前页码
  let pageSize1 = ref<number>(5); //每页显示条数
  let total = ref<number>();
  const onShowSizeChange = (current: number, pageSize: number) => {
    console.log(current, pageSize);
  };

  //初始检索数据参数对象
  const dataSourceList = reactive<DBType.dataSourceList>({
    page: 1,
    size: 5,
    oderByDate: null,
    dataSourceState: null, //应用状态
    dataSourceName: '', //数据源名称f
  });

  //检索数据源方法
  function showlist1(dataSourceList: DBType.dataSourceList) {
    data.value = [];
    dbList(dataSourceList).then(res => {
      res.list.forEach((i: { id: any; dataSourceName: any; dataSourceType: any; dataSourceUrl: any; dataSourceState: any; updateTime: any }) => {
        let t = {
          key: i.id,
          dataSourceName: i.dataSourceName,
          dataSourceType: i.dataSourceType,
          dataSourceUrl: i.dataSourceUrl,
          dataSourceState: i.dataSourceState,
          updateTime: i.updateTime,
        };
        data.value.push(t);
      });
      total.value = res.total;
    });
  }

  //进页面调用一次（初始列表）
  showlist1(dataSourceList);

  //查询
  const inquire = () => {
    // console.log(dataSourceList);
    current1.value = 1;
    dataSourceList.page = current1.value;
    // 发送请求查询
    showlist1(dataSourceList);
  };

  // 重置列表
  const reset = () => {
    dataSourceList.dataSourceState = null;
    dataSourceList.dataSourceName = '';
    showlist1(dataSourceList);
    current1.value = 1;
  };

  //排序
  const sorterChange = (pagination: any, filters: any, sorter: any) => {
    // console.log(sorter.order);
    if (sorter.order === 'ascend') {
      dataSourceList.oderByDate = 1;
      dataSourceList.page = current1.value;
      showlist1(dataSourceList);
    } else {
      dataSourceList.oderByDate = 0;
      dataSourceList.page = current1.value;
      showlist1(dataSourceList);
    }
  };

  //当前页码和每页显示条数发生改变,发送请求
  const onChange = (page: number, size: number) => {
    // console.log('Page: ', page, 'pageSize: ', size);
    current1.value = page;
    pageSize1.value = size;
    dataSourceList.page = current1.value;
    dataSourceList.size = pageSize1.value;
    // 页码发生改变发送请求
    showlist1(dataSourceList);
  };

  //连通测试
  const connected = (e: any) => {
    //详情
    dbDetail(e.key).then(res => {
      let t = {
        dataSourceDriverClassName: res.dataSourceDriverClassName,
        dataSourcePassword: res.dataSourcePassword,
        dataSourceUrl: res.dataSourceUrl,
        dataSourceUsername: res.dataSourceUsername,
      };
      //测试
      dbTest(t).then(res1 => {
        console.log(res1);
      });
    });
  };

  // 发布
  const release = (e: { key: any }) => {
    dataSourceList.dataSourceState = null;
    dataSourceList.dataSourceName = '';
    current1.value = 1;
    dataSourceList.page = current1.value;

    // 发布请求;
    dbRevise({ id: e.key, dataSourceState: 1 }).then(res => {
      console.log(res);
      //调用列表
      showlist1(dataSourceList);
    });
  };

  // 停用
  const disable = (e: { key: any }) => {
    dataSourceList.dataSourceState = null;
    dataSourceList.dataSourceName = '';
    current1.value = 1;
    dataSourceList.page = current1.value;
    // 停用请求
    dbRevise({ id: e.key, dataSourceState: 2 }).then(res => {
      console.log(res);
      //调用列表
      showlist1(dataSourceList);
    });
  };

  // 删除
  const confirm = (e: number) => {
    dataSourceList.dataSourceState = null;
    dataSourceList.dataSourceName = '';
    current1.value = 1;
    dataSourceList.page = current1.value;
    console.log(e);
    // 删除请求
    dbDelete(e).then(res => {
      console.log(res);
      //调用列表
      showlist1(dataSourceList);
    });
  };

  //抽屉组件
  const visible = ref<boolean>(false);
  const onClose = () => {
    visible.value = false;
  };
  const dbid = ref<string>();
  const addData = (x: string) => {
    visible.value = true;
    dbid.value = x.toString();
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
