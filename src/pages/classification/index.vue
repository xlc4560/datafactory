<template>
  <div class="menuSider">
    <div class="dataSourceTitle">
      <span>数据资产表目录</span>
      <plus-circle-outlined />
    </div>
    <div class="searchInput">
      <a-input placeholder="请输入关键字" />
    </div>
    <a-tree v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys" v-model:checkedKeys="checkedKeys" :checkable="false" :tree-data="treeData" :field-names="fieldNames">
      <template #title="{ name }">
        <div class="iconWarp">
          <span class="titleName">{{ name }}</span>
          <more-outlined />
        </div>
        <!-- <span v-if="key === '0-0-1'" style="color: #1890ff">{{ name }} </span>
        <template v-else>{{ name }} <more-outlined /></template> -->
      </template>
    </a-tree>
  </div>
</template>

<script setup lang="ts">
  import { PlusCircleOutlined, MoreOutlined } from '@ant-design/icons-vue';
  import type { TreeProps } from 'ant-design-vue';
  const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);
  const selectedKeys = ref<string[]>(['0-0-0', '0-0-1']);
  const checkedKeys = ref<string[]>(['0-0-0', '0-0-1']);

  const fieldNames: TreeProps['fieldNames'] = {
    children: 'child',
    title: 'name',
  };

  const treeData: TreeProps['treeData'] = [
    {
      name: '工商司法',
      key: '0-0',
      child: [
        {
          name: '张晨成',
          key: '0-0-0',
          //   disabled: true,
          child: [
            { name: 'leaf', key: '0-0-0-0', disableCheckbox: true },
            { name: 'leaf', key: '0-0-0-1' },
          ],
        },
        {
          name: 'parent 1-1',
          key: '0-0-1',
          child: [{ key: '0-0-1-0', name: 'zcvc' }],
        },
      ],
    },
  ];
  watch(expandedKeys, () => {
    console.log('expandedKeys', expandedKeys);
  });
  watch(selectedKeys, () => {
    console.log('selectedKeys', selectedKeys);
  });
  watch(checkedKeys, () => {
    console.log('checkedKeys', checkedKeys);
  });
</script>

<style lang="less">
  .menuSider {
    display: flex;
    width: 100%;
    height: 100%;
    flex-flow: column nowrap;

    .dataSourceTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      height: 48px;
      font-size: 16px;
      font-weight: 700;
      line-height: 48px;
    }

    .searchInput {
      margin: 10px auto;
      width: 92%;
    }

    .ant-tree {
      width: 100% !important;

      .ant-tree-node-content-wrapper {
        width: 100%;
      }

      .ant-tree-treenode :hover {
        background-color: #ffffff;

        .titleName {
          color: #3394fe;
        }
      }

      .ant-tree-treenode {
        display: flex;
        align-items: flex-start;
        padding: 0;
        width: 100% !important;
        height: 40px;
        background-color: #ffffff;
        outline: none;
      }

      .ant-tree-node-selected {
        background-color: #ffffff;
        // background-color: #f5f9ff;
      }

      .iconWarp {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        width: 100%;
        height: 100%;
        line-height: 40px;

        .titleName {
          display: inline-block;
          overflow: hidden;
          max-width: 120px;
          height: 40px;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          line-height: 40px;
        }
      }
    }

    .anticon-caret-down {
      margin-top: 15px;
    }

    .ant-tree-node-selected {
      .titleName {
        color: #3394fe;
      }
    }
  }
</style>
