<template>
  <div class="scriptManagement">
    <!-- 分类区 -->
    <div class="category">
      <classification category-schema="脚本分类" />
    </div>
    <div class="tableBox">
      <data-filter-vue />
      <data-list-vue @change-drawer-control-data="changeDrawerControlData" />
    </div>
    <script-details :script-details-drawer="modalControlData.scriptDetailsDrawer" @change-drawer-control-data="changeDrawerControlData" />
    <script-test :script-test-drawer="modalControlData.scriptTestDrawer" @change-drawer-control-data="changeDrawerControlData" />
  </div>
</template>

<script setup lang="ts">
  // 分类组件
  import classification from '@/pages/category/index.vue';
  // 筛选组件
  import dataFilterVue from './dataFilter.vue';
  // 列表组件
  import dataListVue from './dataList.vue';
  // 详情页
  import ScriptDetails from './scriptDetails.vue';
  // 测试页
  import ScriptTest from './scriptTest.vue';
  // 从pinia中引入集中管理的状态
  // import useStore from '@/store';
  // import { storeToRefs } from 'pinia';
  // const { useScriptManagementStore, useCategoryStore } = useStore();

  const modalControlData = reactive<{ scriptDetailsDrawer: boolean; scriptTestDrawer: boolean; [key: string]: boolean }>({
    scriptDetailsDrawer: false,
    scriptTestDrawer: false,
  });
  // 状态更改
  const changeDrawerControlData = ({ dataName, value }: { dataName: string; value: boolean }) => {
    modalControlData[dataName] = value;
  };
</script>

<style scoped lang="less">
  .scriptManagement {
    position: relative;
    width: 100%;

    .category {
      position: absolute;
      width: 240px;
      height: 100%;
      background-color: white;
    }

    .backColor {
      background-color: #ffffff;
    }
    // table盒子
    .tableBox {
      margin-left: 260px;
      // 筛选部分相关
      :deep(.scriptManagement-filter) {
        position: relative;
        // margin: 0 0 10px;
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
      :deep(.tableWarp) {
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
