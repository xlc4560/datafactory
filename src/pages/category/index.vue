<template>
  <div class="menuSider">
    <div class="dataSourceTitle">
      <span>{{ categorySchema }}</span>
      <plus-circle-outlined @click="() => classifyUpdate(0, searchKeyword, '0')" />
    </div>
    <div class="searchInput">
      <a-input v-model:value="searchKeyword" placeholder="请输入关键字" />
    </div>
    <a-spin :spinning="categorySpinning">
      <a-tree
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        :tree-data="treeData"
        :field-names="fieldNames"
        :auto-expand-parent="autoExpandParent"
        :loading="true"
        @expand="onExpand"
      >
        <template #title="{ name, categoryCode }">
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
                  <li @click="() => classifyUpdate(0, name, categoryCode, parentCode)">新增</li>
                  <li @click="() => classifyUpdate(1, name, categoryCode, parentCode)">编辑</li>
                  <li @click="() => classifyUpdate(2, name, categoryCode, parentCode)">删除</li>
                </ul>
              </template>
              <more-outlined class="icon" />
            </a-popover>
          </div>
        </template>
      </a-tree>
    </a-spin>
    <a-modal v-model:visible="visible" :title="title" cancel-text="取消" ok-text="确认" :after-close="classifyFormInstance?.resetFields" @ok="handleOk">
      <a-spin :spinning="spinning">
        <a-form v-if="operationType !== 2" ref="classifyFormInstance" :model="classifyFormData">
          <a-form-item
            label="分类名称"
            has-feedback
            name="classifyName"
            :rules="[
              { required: true, message: '请输入分类名称！' },
              { pattern: /^[^\s]*$/, message: '不能输入空格' },
            ]"
          >
            <a-input v-model:value="classifyFormData.classifyName" allow-clear placeholder="请输入分类名称"></a-input>
          </a-form-item>
        </a-form>
        <div v-else>请确认是否删除该分类?</div>
      </a-spin>
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
  const { fiterCategoryName } = storeToRefs(useCategoryStore);
  // 声明接收props值
  const props = defineProps({
    categorySchema: {
      type: String,
      default: () => '',
    },
  });
  const spinning = ref<boolean>(false);
  const categorySpinning = ref<boolean>(false);
  // 监视props.categorySchema发生改变时就发起请求
  const treeData = ref<TreeDataType[]>([]);
  watch(
    () => props.categorySchema,
    async value => {
      try {
        categorySpinning.value = true;
        treeData.value = await catagoryResquest.ReadCategory(value);
        generateList(treeData.value);
      } catch (error) {
      } finally {
        categorySpinning.value = false;
      }
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
    data.forEach(item => {
      const node = item;
      const categoryCode = node.categoryCode;
      dataList.push({ key: categoryCode, title: node.name });
      if (node.children) {
        generateList(node.children);
      }
    });
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
  // 监视选中的key
  watch(selectedKeys, () => {
    fiterCategoryName.value = selectedKeys.value[0];
  });
  // 新增、编辑、删除（回调）
  const visible = ref<boolean>(false);
  const title = ref<string>('');
  const parentCode = ref<string>('');
  const categoryCode_forUpdate = ref<string>('');
  const operationType = ref<number | null>(null);
  const classifyUpdate = (type: number, categoryName: string, categoryCode?: string, parent_code?: string) => {
    operationType.value = type;
    visible.value = true;
    // 0：新增，1：编辑，2：删除
    switch (type) {
      case 0:
        title.value = '新增分类';
        classifyFormData.classifyName = '';
        parentCode.value = categoryCode as string;
        break;
      case 1:
        title.value = '编辑分类';
        classifyFormData.classifyName = categoryName;
        parentCode.value = parent_code as string;
        categoryCode_forUpdate.value = categoryCode as string;
        break;
      case 2:
        title.value = '删除分类';
        classifyFormData.classifyName = '';
        categoryCode_forUpdate.value = categoryCode as string;
        break;
    }
  };

  // 分类表单相关
  const classifyFormData = reactive<{ classifyName: string }>({
    classifyName: '',
  });
  // 获取表单dom实例
  const classifyFormInstance = ref<FormInstance>();
  // 弹窗框确认按钮回调
  const handleOk = async () => {
    const editRes = ref();
    spinning.value = true;
    // 触发表单验证
    if (operationType.value !== 2) {
      try {
        await classifyFormInstance.value?.validate();
        switch (operationType.value) {
          // 新增
          case 0:
            categorySpinning.value = true;
            editRes.value = await catagoryResquest.CreateCategory({
              parentCode: parentCode.value,
              categoryName: classifyFormData.classifyName,
              categorySchema: props.categorySchema,
            });
            treeData.value = await catagoryResquest.ReadCategory(props.categorySchema);
            generateList(treeData.value);
            break;
          case 1:
            categorySpinning.value = true;
            editRes.value = await catagoryResquest.UpdateCategory({
              parentCode: parentCode.value,
              categoryName: classifyFormData.classifyName,
              categorySchema: props.categorySchema,
              categoryCode: categoryCode_forUpdate.value,
            });
            treeData.value = await catagoryResquest.ReadCategory(props.categorySchema);
            generateList(treeData.value);
            break;
        }
      } catch (error) {
      } finally {
        categorySpinning.value = false;
        spinning.value = false;
      }
    } else {
      (async () => {
        try {
          categorySpinning.value = true;
          editRes.value = await catagoryResquest.DeleteCategory(categoryCode_forUpdate.value);
          treeData.value = await catagoryResquest.ReadCategory(props.categorySchema);
          generateList(treeData.value);
        } catch (error) {
        } finally {
          categorySpinning.value = false;
          spinning.value = false;
        }
      })();
    }
    if (!editRes.value?.code) {
      visible.value = false;
    }
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

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-thumb {
        // border-radius: 20px;
        background-color: rgb(153, 153, 153);
      }

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
        // background-color: antiquewhite;
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

        .icon {
          float: right;
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

  .ant-popover {
    .ant-popover-inner-content {
      padding: 5px 0;
    }
  }
</style>
