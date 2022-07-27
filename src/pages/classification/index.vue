<template>
  <div class="menuSider">
    <div class="dataSourceTitle">
      <span>数据资产表目录</span>
      <plus-circle-outlined @click="() => classifyUpdate('新增分类')" />
    </div>
    <div class="searchInput">
      <a-input v-model:value="searchKeyword" placeholder="请输入关键字" />
    </div>
    <a-tree v-model:expandedKeys="expandedKeys" v-model:selectedKeys="selectedKeys" :tree-data="treeData" :field-names="fieldNames" :auto-expand-parent="autoExpandParent" @expand="onExpand">
      <template #title="{ name, categoryCode, children, parentId }">
        <div class="iconWarp">
          <span v-if="name.indexOf(searchKeyword) > -1" class="titleName">
            {{ name.substr(0, name.indexOf(searchKeyword)) }}
            <span style="color: #f50">{{ searchKeyword }}</span>
            {{ name.substr(name.indexOf(searchKeyword) + searchKeyword?.length) }}
          </span>
          <span v-else class="titleName">{{ name }}</span>
          <a-popover>
            <template #content>
              <ul class="menuSiderCRUD_style">
                <li @click="() => classifyUpdate('新增分类', name, categoryCode, children, parentId)">新增</li>
                <li @click="() => classifyUpdate('编辑分类', name, categoryCode, children, parentId)">编辑</li>
                <li @click="() => classifyUpdate('删除分类', name, categoryCode, children, parentId)">删除</li>
              </ul>
            </template>
            <more-outlined />
          </a-popover>
        </div>
      </template>
    </a-tree>
    <a-modal v-model:visible="visible" :title="title" cancel-text="取消" ok-text="确认" :after-close="classifyFormInstance?.resetFields" @ok="handleOk">
      <a-form ref="classifyFormInstance" :model="classifyFormData">
        <a-form-item label="分类名称" has-feedback name="classifyName" :rules="[{ required: true, message: '请输入分类名称！' }]">
          <a-input v-model:value="classifyFormData.classifyName" allow-clear placeholder="请输入分类名称"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { PlusCircleOutlined, MoreOutlined } from '@ant-design/icons-vue';
  import { treeData, getParentKey, fieldNames } from './configData';
  import type { TreeDataType } from './type';
  import { FormInstance, TreeProps } from 'ant-design-vue';
  // 搜索框value
  const searchKeyword = ref<string>('');
  // 存储树形控件所有的的key与title属性
  const dataList: TreeProps['treeData'] = [];
  // 需要展开的树形控件的key
  const expandedKeys = ref<(string | number | null | undefined)[]>([]);
  // 选中的树形控件的key
  const selectedKeys = ref<string[]>([]);
  // 树形控件是否自动展开父节点（感觉没啥用）
  const autoExpandParent = ref<boolean>(true);
  // 生成dataList的逻辑（递归调用）
  const generateList = (data: TreeDataType[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const categoryCode = node.categoryCode;
      dataList.push({ key: categoryCode, title: node.name });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  generateList(treeData);
  // 展开/收起节点时触发（感觉没啥用）
  const onExpand = (keys: string[]) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
  };
  // 监视searchKeyword属性
  watch(searchKeyword, value => {
    const expanded = dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          // 获取匹配成功节点的父节点，因为需要展开的是匹配成功节点的父节点
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      // 过滤掉重复的key
      .filter((item, i, self) => item && self.indexOf(item) === i);
    expandedKeys.value = expanded;
    searchKeyword.value = value;
    autoExpandParent.value = true;
  });
  watch(expandedKeys, () => {
    console.log('expandedKeys', expandedKeys);
  });
  watch(selectedKeys, () => {
    console.log('selectedKeys', selectedKeys);
  });
  // 新增、编辑、删除（回调）
  const visible = ref<boolean>(false);
  const title = ref<string>('');
  const classifyUpdate = (type: string, name?: string, key?: number | string, ...other: any) => {
    title.value = type;
    visible.value = true;
    console.log(name, key, other);
  };

  // 分类表单相关
  const classifyFormData = reactive<{ classifyName: string }>({
    classifyName: '',
  });
  // 获取表单dom实例
  const classifyFormInstance = ref<FormInstance>();
  const handleOk = () => {
    classifyFormInstance.value
      ?.validate()
      .then(() => {
        visible.value = false;
      })
      .catch(error => {
        console.log('error', error);
      });
  };
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
    // 输入框
    .searchInput {
      margin: 10px auto;
      width: 92%;
    }

    .ant-tree {
      overflow-x: hidden;
      overflow-y: auto;
      width: 100% !important;
      flex: 1;

      .ant-tree-treenode {
        display: flex;
        align-items: flex-start;
        padding: 0;
        width: 100%;
        height: 40px;
        outline: none;

        &:hover {
          background: #f5f9ff;

          .iconWarp {
            color: #3394fe;
            background: #f5f9ff;
          }
        }

        .ant-tree-node-content-wrapper {
          width: 100%;
          background-color: transparent;
        }
      }
      // 文本选中后的样式
      .ant-tree-node-content-wrapper.ant-tree-node-selected {
        .iconWarp {
          color: #3394fe;
        }
      }

      .ant-tree-node-selected .ant-tree-indent,
      .ant-tree-node-selected .ant-tree-switcher {
        background: #f5f9ff !important;
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
    // 控制箭头的位置
    .anticon-caret-down {
      margin-top: 15px;
    }
  }

  .menuSiderCRUD_style {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      width: 60px;
      text-align: center;
      line-height: 30px;

      &:hover {
        background-color: rgb(245, 249, 255);
      }
    }
  }

  .ant-popover-inner-content {
    padding: 5px 0;
  }
</style>
