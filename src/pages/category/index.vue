<template>
  <div class="menuSider">
    <div class="dataSourceTitle">
      <span>数据资产表目录</span>
      <plus-circle-outlined @click="() => classifyUpdate(0, searchKeyword, '0')" />
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
                <li @click="() => classifyUpdate(0, name, categoryCode, children, parentId)">新增</li>
                <li @click="() => classifyUpdate(1, name, categoryCode, children, parentId)">编辑</li>
                <li @click="() => classifyUpdate(2, name, categoryCode, children, parentId)">删除</li>
              </ul>
            </template>
            <more-outlined />
          </a-popover>
        </div>
      </template>
    </a-tree>
    <a-modal v-model:visible="visible" :title="title" cancel-text="取消" ok-text="确认" :after-close="classifyFormInstance?.resetFields" @ok="handleOk">
      <a-form v-if="operationType !== 2" ref="classifyFormInstance" :model="classifyFormData">
        <a-form-item label="分类名称" has-feedback name="classifyName" :rules="[{ required: true, message: '请输入分类名称！' }]">
          <a-input v-model:value="classifyFormData.classifyName" allow-clear placeholder="请输入分类名称"></a-input>
        </a-form-item>
      </a-form>
      <div v-else>请确认是否删除该分类?</div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { PlusCircleOutlined, MoreOutlined } from '@ant-design/icons-vue';
  import { getParentKey, fieldNames } from './configData';
  import type { TreeDataType } from './type';
  import { FormInstance, TreeProps } from 'ant-design-vue';
  import * as catagoryResquest from '@/api/category';
  import { storeToRefs } from 'pinia';
  // 从pinia中引入集中管理的状态
  import useStore from '@/store';
  const { useCategoryStore } = useStore();
  const { categoryName } = storeToRefs(useCategoryStore);
  // 声明接收props值
  const props = defineProps({
    categorySchema: {
      type: String,
      default: () => '',
    },
  });
  // 监视props.categorySchema发生改变时就发起请求
  const treeData = ref<TreeDataType[]>([]);
  watch(
    () => props.categorySchema,
    async value => {
      treeData.value = await catagoryResquest.ReadCategory(value);
      generateList(treeData.value);
    },
    { deep: true, immediate: true },
  );
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
          return getParentKey(item.key, treeData.value);
        }
        return null;
      })
      // 过滤掉重复的key
      .filter((item, i, self) => item && self.indexOf(item) === i);
    expandedKeys.value = expanded;
    searchKeyword.value = value;
    autoExpandParent.value = true;
  });
  // 监视展开的key
  watch(expandedKeys, () => {
    console.log('expandedKeys', expandedKeys);
  });
  // 监视选中的key
  watch(selectedKeys, () => {
    categoryName.value = selectedKeys.value[0];
    console.log('selectedKeys', selectedKeys);
  });
  // 新增、编辑、删除（回调）
  const visible = ref<boolean>(false);
  const title = ref<string>('');
  const parentCode = ref<string>('');
  const operationType = ref<number | null>(null);
  const classifyUpdate = (type: number, categoryName: string, categoryCode?: string, ...other: any) => {
    operationType.value = type;
    visible.value = true;
    console.log(categoryName, categoryCode, other);
    // 0：新增，1：编辑，2：删除
    switch (type) {
      case 0:
        title.value = '新增分类';
        classifyFormData.classifyName = '';
        break;
      case 1:
        title.value = '编辑分类';
        classifyFormData.classifyName = categoryName;
        break;
      case 2:
        title.value = '删除分类';
        classifyFormData.classifyName = '';
        break;
    }
    parentCode.value = categoryCode as string;
  };

  // 分类表单相关
  const classifyFormData = reactive<{ classifyName: string }>({
    classifyName: '',
  });
  // 获取表单dom实例
  const classifyFormInstance = ref<FormInstance>();
  // 弹窗框确认按钮回调
  const handleOk = async () => {
    // 触发表单验证
    if (operationType.value !== 2) {
      classifyFormInstance.value
        ?.validate()
        .then(async () => {
          switch (operationType.value) {
            // 新增
            case 0:
              await catagoryResquest.CreateCategory({
                parentCode: parentCode.value,
                categoryName: classifyFormData.classifyName,
                categorySchema: props.categorySchema,
              });
              treeData.value = await catagoryResquest.ReadCategory(props.categorySchema);
              generateList(treeData.value);
              break;
            case 1:
              await catagoryResquest.UpdateCategory({
                categoryCode: parentCode.value,
                categoryName: classifyFormData.classifyName,
                categorySchema: props.categorySchema,
              });
              treeData.value = await catagoryResquest.ReadCategory(props.categorySchema);
              generateList(treeData.value);
              break;
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    } else {
      (async () => {
        await catagoryResquest.DeleteCategory(parentCode.value);
        treeData.value = await catagoryResquest.ReadCategory(props.categorySchema);
        generateList(treeData.value);
      })();
    }
    visible.value = false;
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
      overflow: auto;
      width: 100% !important;
      flex: 1;

      .ant-tree-treenode {
        display: flex;
        align-items: flex-start;
        padding: 0;
        width: 100%;
        height: 40px;
        // outline: none; // 用于定义轮廓
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
          white-space: nowrap; // 规定段落中的文本不进行换行
          cursor: pointer; // (鼠标)不同的光标
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
    list-style-type: none; // 设置ul列表的默认样式为none
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
