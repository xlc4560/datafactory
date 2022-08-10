<template>
  <!--  数据筛选部分-->
  <div class="backColor ApiManagement">
    <!-- 筛选组 -->
    <!--  @finish="onFinish" @finish-failed="onFinishFailed" -->
    <a-form :model="formState" class="formAction" name="horizontal_login" layout="inline" autocomplete="off">
      <a-form-item label="来源机构:" name="standardSourceOrganization" class="width">
        <!-- <a-input v-model:value="formState.standardSourceOrganization"> </a-input> -->
        <a-select v-model:value="formState.standardSourceOrganization" :options="optionsOz" placeholder="请选择" @change="handleChangeOz"></a-select>
      </a-form-item>
      <a-form-item label="标准编号:" name="standardCode" class="width">
        <a-input v-model:value="formState.standardCode" placeholder="请输入"> </a-input>
      </a-form-item>

      <a-form-item label="中文名称:" name="standardCnName" class="width">
        <a-input v-model:value="formState.standardCnName" placeholder="请输入"> </a-input>
      </a-form-item>

      <a-form-item label="英文名称:" name="standardEnName" class="width">
        <a-input v-model:value="formState.standardEnName" placeholder="请输入"> </a-input>
      </a-form-item>

      <a-form-item label="标准状态:" name="standardState" class="width">
        <a-select v-model:value="formState.standardState" placeholder="请选择" :options="options" @change="handleChange"></a-select>
      </a-form-item>

      <a-form-item class="formBtn">
        <!-- <a-button type="primary" html-type="submit">查询</a-button> -->
        <a-button type="primary" @click="search">查询</a-button>
        <a-button @click="reset">重置</a-button>
      </a-form-item>
    </a-form>
  </div>
  <!--  数据列表部分-->
  <div class="backColor tableWarp" style="margin: 10px 0px">
    <!-- 按钮操作组 -->
    <div class="tableactionGroup">
      <div class="tableactionGroup-item">
        <a-popconfirm title="是否批量发布数据标准？" ok-text="确认" cancel-text="取消" @confirm="batchRelease">
          <a-button class="li" :disabled="btnpublish">批量发布</a-button>
        </a-popconfirm>
        <a-popconfirm title="是否批量停用数据标准？" ok-text="确认" cancel-text="取消" @confirm="batchDisable">
          <a-button class="li" :disabled="btndisable">批量停用</a-button>
        </a-popconfirm>
      </div>
      <div class="tableactionGroup-item">
        <!-- <a-button class="li">导入模板下载</a-button>
        <a-button class="li">标准导入</a-button> -->
        <!-- 上传下载组件 -->
        <div class="li">
          <upload></upload>
          <a-button class="li-i" type="primary" @click="showDrawerAdd('new')">新增标准</a-button>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <a-table :columns="columns" :data-source="data" :row-selection="rowSelection" :pagination="false" @change="sorterChange">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'standardCode'">
          <a @click="showModalDetails(record)">{{ text }}</a>
        </template>
        <template v-if="column.dataIndex === 'standardType'">
          <span>{{ type[record.standardType] }}</span>
        </template>
        <template v-if="column.dataIndex === 'standardState'">
          <a-badge v-if="text == '1'" status="success" />
          <!-- <a-badge v-else-if="text == '1'" status="error" /> -->
          <a-badge v-else-if="text == '0'" status="warning" />
          <a-badge v-else-if="text == '2'" status="default" />
          <span>{{ state[record.standardState] }}</span>
        </template>
        <template v-if="column.key === 'operation'">
          <div class="option">
            <a-popconfirm title="请确认是否发布该接口" ok-text="确认" cancel-text="取消" @confirm="release(record)">
              <a v-if="record.standardState == '0' || record.standardState == '2'">发布</a>
            </a-popconfirm>
            <a-popconfirm title="请确认是否停用该接口" ok-text="确认" cancel-text="取消" @confirm="disable(record)">
              <a v-if="record.standardState == '1'">停用</a>
            </a-popconfirm>
            <a v-if="record.standardState == '0' || record.standardState == '2'" @click="showDrawerAdd(record.standardCode)">编辑</a>
            <!-- <a @click="delete()">删除</a> -->
            <a-popconfirm title="确认删除?" ok-text="是" cancel-text="否" @confirm="deleteItem(record)">
              <a v-if="record.standardState == '0'">删 除</a>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
    <!-- 分页 -->
    <div class="pagination">
      <a-pagination
        v-model:current="page"
        v-model:page-size="pageSize"
        :page-size-options="['5', '10', '20', '30']"
        show-size-changer
        show-quick-jumper
        :total="total"
        :show-total="(total:any) => `共 ${total} 条数据`"
        @change="onChange"
      />
      <!-- <a-pagination v-model:current="page" v-model:page-size="pageSize" :total="data.length" show-quick-jumper :show-total="total => `共 ${total} 条数据`" @change="onChange" /> -->
    </div>
  </div>
  <!-- 详情部分 -->
  <a-modal v-model:visible="visible" :destroy-on-close="true" title="Basic Modal" @ok="handleOk">
    <StandardDetails :standardcode="standardCode" :visible="visible"></StandardDetails>
  </a-modal>

  <!-- 新增部分 -->
  <a-drawer v-model:visible="visibleAdd" :destroy-on-close="true" size="large" class="custom-class" style="color: red" title="新增标准" placement="right" @after-visible-change="afterVisibleChange">
    <AddStandard :codeid="codeid" @visible="svisible2"></AddStandard>
  </a-drawer>
</template>
<script lang="ts" setup>
  import { formState, options, optionsOz, columns, data } from './standardData'; //搜索表单数据,下拉选择,表头,表数据
  import { DataItem, state, type } from './standardType'; //类型定义,状态,类型
  import type { SelectProps } from 'ant-design-vue';
  import StandardDetails from './standardDetails.vue';
  import AddStandard from './AddStandard.vue';
  import { standardSearch, standardRevise, standardDel } from '@/api/standard/standard'; //列表,状态修改,删除
  // 上传
  import upload from '@/components/upload.vue';
  // standardSearch

  // 搜索
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };
  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };
  // 封装获取表格列表数据方法
  // console.log(toRaw(formState));
  const standardSearchList = (page: number, pageSize: number, updateTimeOrder?: number, formState?: object) => {
    let search = { ...formState, page: page, pageSize: pageSize, updateTimeOrder: updateTimeOrder };
    standardSearch(search).then(res => {
      console.log(res);
      total.value = res.total;
      data.splice(0, data.length);
      res.records.forEach((i: any) => {
        let t = {
          key: i.standardCode,
          standardCode: i.standardCode,
          standardCnName: i.standardCnName,
          standardEnName: i.standardEnName,
          standardType: i.standardType,
          standardState: i.standardState,
          updateTime: i.updateTime,
        };
        data.push(t);
      });
    });
  };
  standardSearchList(1, 20);

  const handleChangeOz: SelectProps['onChange'] = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };
  const handleChange: SelectProps['onChange'] = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };

  const search = () => {
    console.log(toRaw(formState));
    standardSearchList(1, 20, 0, toRaw(formState));
  };
  // 重置
  const reset = () => {
    formState.standardSourceOrganization = '';
    formState.standardCnName = '';
    formState.standardCode = '';
    formState.standardEnName = '';
    formState.standardState = null;
    page.value = 1;
    standardSearchList(1, pageSize.value, 0, toRaw(formState));
  };
  // 排序
  const sorterChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
    console.log('params', sorter.order);
    if (sorter.order == 'ascend') {
      standardSearchList(1, pageSize.value, 1, toRaw(formState));
    } else if (sorter.order == 'descend') {
      standardSearchList(1, pageSize.value, 0, toRaw(formState));
    }
  };
  // 发布
  const release = (e: any) => {
    console.log(e.key);
    // 发布请求
    const codeIdList: string[] = [e.key];
    standardRevise({ standardCodeList: codeIdList, operation: 1 }).then(res => {
      console.log(res);
      reset();
    });
  };
  // 批量发布
  const batchRelease = () => {
    console.log('批量发布');
    // 发送批量发布请求
    standardRevise({ standardCodeList: tableliID, operation: 1 }).then(res => {
      console.log(res);
      reset();
    });
  };
  // 停用
  const disable = (e: any) => {
    console.log(e.key);
    // 停用请求
    const codeIdList: string[] = [e.key];
    standardRevise({ standardCodeList: codeIdList, operation: 0 }).then(res => {
      console.log(res);
      reset();
    });
  };
  // 批量停用
  const batchDisable = () => {
    console.log('批量停用');
    // 发送批量停用请求
    standardRevise({ standardCodeList: tableliID, operation: 0 }).then(res => {
      console.log(res);
      reset();
    });
  };
  // 删除
  const deleteItem = (e: any) => {
    console.log(e.key);
    // 删除请求
    // data.splice(e.key, 1);
    // codedelete(e).then(res => {
    //   console.log(res);
    //   // reset();
    //   refresh();
    // });
    standardDel(e.key).then(res => {
      console.log(res);
      reset();
    });
  };

  // 多选
  const btndisable = ref(true);
  const btnpublish = ref(true);
  let tableliID: string[] = reactive([]);
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: string[], selectedRows: DataItem[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      console.log(selectedRowKeys);

      tableliID = selectedRowKeys;
      // 控制按钮
      let len1 = 0; //选了多少个发布
      let len2 = 0; //选了多少个停用
      // let len3 = 0; //选了多少个未发布
      selectedRows.forEach(i => {
        // 停用
        if (i.standardState == 0 || i.standardState == 2) {
          len1++;
        } else if (i.standardState == 1) {
          len2++;
        }
      });
      if (len1 == selectedRows.length && selectedRows.length > 0) {
        btnpublish.value = false;
        btndisable.value = true;
      } else if (len2 == selectedRows.length && selectedRows.length > 0) {
        btnpublish.value = true;
        btndisable.value = false;
      } else if (selectedRows.length == 0) {
        btnpublish.value = true;
        btndisable.value = true;
      } else {
        btnpublish.value = true;
        btndisable.value = true;
      }
    },
    // onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
    //   console.log(record, selected, selectedRows);
    // },
    // onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
  });
  // 详情
  const visible = ref<boolean>(false);
  const standardCode = ref<string>('');
  const showModalDetails = (record: any) => {
    visible.value = true;
    console.log(record.key);
    standardCode.value = record.key;
  };

  const handleOk = (e: MouseEvent) => {
    console.log(e);
    visible.value = false;
  };
  // 分页逻辑
  let page = ref<number>(1); //当前页码
  let pageSize = ref<number>(20); //每页显示条数
  let total = ref<number>(0);
  //当前页码和每页显示条数发生改变,发送请求
  const onChange = (page: number, pageSize: number) => {
    console.log('Page: ', page, 'pageSize: ', pageSize);
    // 页码发生改变发送请求
    standardSearchList(page, pageSize, 0, toRaw(formState));
  };

  // 新增部分
  const visibleAdd = ref<boolean>(false);
  // 关闭
  const afterVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
  };
  const svisible2 = (val: any) => {
    visibleAdd.value = val.value;
    visibleAdd.value = false;
    console.log('关闭关闭');
    console.log(visibleAdd.value);
    reset();
  };
  // 新增和编辑
  const codeid = ref('');
  const showDrawerAdd = (x: string) => {
    visibleAdd.value = true;
    console.log(x);
    codeid.value = x;
  };
  // 子组件控制关闭
  // const svisible2 = (val: any) => {
  //   console.log('关闭');
  //   visible.value = val.value;
  // };
  // // svisible2();
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
      width: 300px;
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
    padding: 0px 30px;
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
        display: flex;

        .li {
          display: flex;
          margin: 10px 10px;
          flex-direction: row;
          // background-color: rgb(231, 109, 109);
          .li-i {
            display: flex;
            margin: 0px 10px;
          }
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
    // justify-content: space-between;
    a {
      margin-right: 15px;
    }
  }
  // 分页
  .pagination {
    // background-color: rgb(173, 76, 76);
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
</style>
