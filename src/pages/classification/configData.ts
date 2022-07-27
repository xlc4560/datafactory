import type { TreeDataType } from './type';
import type { TreeProps } from 'ant-design-vue';
// 模拟数据
export const treeData: TreeDataType[] = [
  {
    categoryCode: '0-0',
    parentId: '0',
    name: '工商司法',
    icon: null,
    information: null,
    categorySchema: '接口分类',
    children: [
      {
        categoryCode: '0-0-0',
        parentId: '0-0',
        name: '财务信息',
        icon: null,
        information: null,
        categorySchema: '接口分类',
        children: [
          {
            categoryCode: '0-0-0-0',
            parentId: '0-0-0',
            name: '个人',
            icon: null,
            information: null,
            categorySchema: '接口分类',
            children: [
              {
                categoryCode: '0-0-0-0-0',
                parentId: '0-0-0-0',
                name: '他人',
                icon: null,
                information: null,
                categorySchema: '接口分类',
              },
            ],
          },
        ],
      },
      {
        categoryCode: '0-0-1',
        parentId: '0-0',
        name: '工商注册基本信息',
        icon: null,
        information: null,
        categorySchema: '接口分类',
      },
      {
        categoryCode: '0-0-2',
        parentId: '0-0',
        name: '环保处罚',
        icon: null,
        information: null,
        categorySchema: '接口分类',
      },
    ],
  },
  {
    categoryCode: '0-1',
    parentId: '0',
    name: '测试132456',
    icon: null,
    information: null,
    categorySchema: '接口分类',
    children: [
      {
        categoryCode: '0-1-0',
        parentId: '0-1',
        name: '杞人忧天',
        icon: null,
        information: null,
        categorySchema: '接口分类',
        children: [
          {
            categoryCode: '0-1-0-0',
            parentId: '0-1-0',
            name: '滥竽充数',
            icon: null,
            information: null,
            categorySchema: '接口分类',
            children: [
              {
                categoryCode: '0-1-0-0-0',
                parentId: '0-1-0-0',
                name: '举案齐眉',
                icon: null,
                information: null,
                categorySchema: '接口分类',
              },
            ],
          },
        ],
      },
      {
        categoryCode: '0-1-1',
        parentId: '0-1',
        name: '长相思兮',
        icon: null,
        information: null,
        categorySchema: '接口分类',
      },
      {
        categoryCode: '0-1-2',
        parentId: '0-1',
        name: '白驹过隙',
        icon: null,
        information: null,
        categorySchema: '接口分类',
      },
    ],
  },
];
// 自定义树形控件的配置项的别名
export const fieldNames: TreeProps['fieldNames'] = {
  children: 'children',
  title: 'name',
  key: 'categoryCode',
};
// 根据子节点获取对应的父级节点（用于展开树形结构）
export const getParentKey = (categoryCode: string | number, tree: TreeDataType[]): string | number | undefined => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.categoryCode === categoryCode)) {
        parentKey = node.categoryCode;
      } else if (getParentKey(categoryCode, node.children)) {
        parentKey = getParentKey(categoryCode, node.children);
      }
    }
  }
  return parentKey;
};
