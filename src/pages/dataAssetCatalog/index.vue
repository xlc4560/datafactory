<template>
  <div class="apiManagementFather">
    <!-- 分类区 -->
    <div class="category">
      <classification category-schema="数据资产目录分类" />
    </div>
    <div class="tableBox">
      <!--  数据筛选部分-->
      <div class="backColor ApiManagement">
        <!-- 筛选组 -->
        <a-form layout="inline" :model="formState" class="formAction">
          <a-form-item label="数据资产表中文名称:" class="formItemWidth">
            <a-input v-model:value="formState.assetNameCn" placeholder="请输入" />
          </a-form-item>
          <a-form-item label="数据资产表英文名称:" class="formItemWidth">
            <a-input v-model:value="formState.assetNameEn" placeholder="请输入" />
          </a-form-item>
          <a-form-item label="发布状态:" class="formItemWidth">
            <a-select v-model:value="formState.dataAssetState" placeholder="请选择" :options="StateOptions" @change="handleChange"></a-select>
          </a-form-item>
          <a-form-item class="formBtn">
            <a-button type="primary" html-type="submit" @click="search">查 询</a-button>
            <a-button type="primary" ghost @click="reset">重 置</a-button>
          </a-form-item>
        </a-form>
      </div>
      <!--  数据列表部分-->
      <div class="backColor tableWarp" style="margin: 10px 0 0 0">
        <!-- 按钮操作组 -->
        <div class="tableactionGroup">
          <a-space :size="12">
            <a-button :disabled="btnpublish" @click="batchRelease">批量发布</a-button>
            <a-button :disabled="btndisable" @click="batchDisable">批量停用</a-button>
            <a-button type="primary" @click="showDrawerAdd('new')">新增资产表</a-button>
          </a-space>
        </div>
        <!-- 表格组 -->
        <a-table :columns="columns" :data-source="data" :row-selection="rowSelection" :pagination="false" @change="sorterChange">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'assetNameCn'">
              <a @click="showModalDetails(record)">{{ text }}</a>
            </template>
            <template v-if="column.dataIndex === 'dataAssetState'">
              <a-badge v-if="text == '1'" status="success" />
              <!-- <a-badge v-else-if="text == '1'" status="error" /> -->
              <a-badge v-else-if="text == '0'" status="warning" />
              <a-badge v-else-if="text == '2'" status="default" />
              <span>{{ state[record.dataAssetState] }}</span>
            </template>
            <template v-if="column.key === 'operation'">
              <div class="option">
                <a-popconfirm title="请确认是否发布该接口" ok-text="确认" cancel-text="取消" @confirm="release(record)">
                  <a v-if="record.dataAssetState == '0' || record.dataAssetState == '2'">发布</a>
                </a-popconfirm>
                <a-popconfirm title="请确认是否停用该接口" ok-text="确认" cancel-text="取消" @confirm="disable(record)">
                  <a v-if="record.dataAssetState == '1'">停用</a>
                </a-popconfirm>
                <a v-if="record.dataAssetState == '0' || record.dataAssetState == '2'" @click="showDrawerAdd(record.key)">编辑</a>
                <!-- <a @click="delete()">删除</a> -->
                <a-popconfirm title="确认删除?" ok-text="是" cancel-text="否" @confirm="deleteItem(record)">
                  <a v-if="record.dataAssetState == '0'">删 除</a>
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
        </div>
      </div>
    </div>
  </div>
  <!-- 详情部分 -->
  <a-drawer :title="title" :width="1200" :destroy-on-close="true" :visible="visibleDetails" :footer-style="{ textAlign: 'right' }" @close="onClose">
    <assetdetails :assetcode="assetcode"></assetdetails>
    <!-- <test></test> -->
    <template #footer>
      <a-button style="margin-right: 8px" type="primary" @click="onClose">关闭</a-button>
    </template>
  </a-drawer>
  <!-- 新增、编辑 -->
  <a-drawer v-model:visible="visibleAdd" :destroy-on-close="true" :width="1200" title="数据资产表基础信息" placement="right" @after-visible-change="afterVisibleChange">
    <!-- <AddStandard :codeid="codeid" @visible="svisible2"></AddStandard> -->
    <addasset :codeid="codeid"></addasset>
  </a-drawer>
</template>
<script setup lang="ts">
  import type { SelectProps } from 'ant-design-vue';
  import { formState, StateOptions } from './data'; //查询，状态
  import { columns, data } from './data';
  import { DataItem, state } from './types';
  //   详情
  import assetdetails from './assetDetails.vue';
  //   新增、编辑
  import addasset from './addAsset.vue';

  //
  import { assetGetList, assetUpdateState, assetDelete, assetGetDetail } from '@/api/dataAssetCatalog/index';

  //测试
  import test from './test.vue';
  //   分类
  import classification from '@/pages/category/index.vue';
  // 从pinia中引入集中管理的状态
  import useStore from '@/store';
  const { useCategoryStore } = useStore();
  const { fiterCategoryName } = storeToRefs(useCategoryStore);
  watch(fiterCategoryName, () => {
    // 获取分类id
    console.log(fiterCategoryName.value);
    formState.categoryCode = fiterCategoryName.value;
    assetSearchList();
  });
  assetGetDetail('ZC00001').then(res => {
    console.log(res);
  });

  // 封装获取表格列表数据方法
  // console.log(toRaw(formState));
  const assetSearchList = () => {
    assetGetList(toRaw(formState)).then(res => {
      console.log(res);
      total.value = res.total;
      data.splice(0, data.length);
      res.records.forEach((i: any) => {
        let t = {
          key: i.assetCode,
          assetNameCn: i.assetNameCn,
          assetNameEn: i.assetNameEn,
          assetDesc: i.assetDesc,
          dataAssetState: i.dataAssetState,
          updateTime: i.updateTime,
        };
        data.push(t);
      });
    });
  };
  //   下拉状态选择
  const handleChange: SelectProps['onChange'] = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };
  //   查询
  const search = () => {
    console.log(toRaw(formState));
    formState.page = 1;
    formState.pageSize = 20;
    assetSearchList();
  };
  search();
  // 重置
  const reset = () => {
    formState.page = 1;
    formState.pageSize = 20;
    formState.assetNameCn = '';
    formState.assetNameEn = '';
    formState.dataAssetState = null;
    formState.categoryCode = '';
    console.log(toRaw(formState));
    assetSearchList();
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
        if (i.dataAssetState == 0 || i.dataAssetState == 2) {
          len1++;
        } else if (i.dataAssetState == 1) {
          len2++;
        }
      });
      if (len1 == selectedRows.length && selectedRows.length > 0) {
        btnpublish.value = false;
        btndisable.value = true;
      } else if (len2 == selectedRows.length && selectedRows.length > 0) {
        btnpublish.value = true;
        btndisable.value = false;
      } else {
        btnpublish.value = true;
        btndisable.value = true;
      }
    },
  });
  // 分页逻辑
  let page = ref<number>(1); //当前页码
  let pageSize = ref<number>(20); //每页显示条数
  let total = ref<number>(0);
  //当前页码和每页显示条数发生改变,发送请求
  const onChange = (page: number, pageSize: number) => {
    console.log('Page: ', page, 'pageSize: ', pageSize);
    page = page <= 0 ? 1 : page;
    formState.page = page;
    formState.pageSize = pageSize;
    // 页码发生改变发送请求
    // standardSearchList(page, pageSize, 0, toRaw(formState));
    assetSearchList();
  };
  // 排序
  const sorterChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
    console.log('params', sorter.order);
    if (sorter.order == 'ascend') {
      formState.updateTimeOrder = 1;
      // standardSearchList(1, pageSize.value, 1, toRaw(formState));
    } else if (sorter.order == 'descend') {
      formState.updateTimeOrder = 0;
      // standardSearchList(1, pageSize.value, 0, toRaw(formState));
    }
    assetSearchList();
  };
  // 详情
  const visibleDetails = ref<boolean>(false);
  const assetcode = ref<string>('');
  const title = ref<string>('');
  const showModalDetails = (record: any) => {
    visibleDetails.value = true;

    title.value = record.key;
    assetcode.value = record.key;
    console.log(assetcode.value);
  };
  const onClose = () => {
    visibleDetails.value = false;
  };
  //   新增、编辑
  const codeid = ref('');
  const showDrawerAdd = (x: string) => {
    visibleAdd.value = true;
    console.log(x);
    codeid.value = x;
  };
  // 关闭
  const afterVisibleChange = (bool: boolean) => {
    console.log('visible', bool);
  };

  // 发布
  const release = (e: any) => {
    console.log(e.key);
    // 发布请求
    const codeIdList: string[] = [e.key];
    console.log(codeIdList);
    assetUpdateState({ assetCodes: codeIdList, operation: 0 }).then(() => {
      search();
    });
  };
  // 批量发布
  const batchRelease = () => {
    console.log('批量发布');
    console.log(tableliID);
    // 发送批量发布请求
    assetUpdateState({ assetCodes: tableliID, operation: 0 }).then(() => {
      search();
    });
  };
  // 停用
  const disable = (e: any) => {
    console.log(e.key);
    // 停用请求
    const codeIdList: string[] = [e.key];
    console.log(codeIdList);
    assetUpdateState({ assetCodes: codeIdList, operation: 1 }).then(() => {
      search();
    });
  };
  // 批量停用
  const batchDisable = () => {
    console.log('批量停用');
    console.log(tableliID);
    assetUpdateState({ assetCodes: tableliID, operation: 1 }).then(() => {
      search();
    });
  };
  // 删除
  const deleteItem = (e: any) => {
    console.log(e.key);
    // 删除请求
    assetDelete(e.key);
    search();
  };
  // 新增部分
  const visibleAdd = ref<boolean>(false);
</script>
<style scoped lang="less">
  .apiManagementFather {
    position: relative;
    width: 100%;

    .category {
      position: absolute;
      width: 240px;
      height: 100%;
      background-color: white;
    }

    .backColor {
      padding: 0px 20px;
      background-color: #ffffff;
    }
    // table盒子
    .tableBox {
      margin-left: 260px;
      // 筛选部分相关
      .ApiManagement {
        position: relative;
        // margin: 0 0 10px;
        overflow: hidden;
        width: 100%;

        .formAction {
          display: flex;
          flex-flow: row nowrap;
          margin: 20px 0;
          padding: 0 10px;
          width: 105%;

          .formItemWidth {
            flex: 2;
            width: 600px;
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
