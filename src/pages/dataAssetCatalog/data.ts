import { FormState, DataItem } from './types';
import type { SelectProps } from 'ant-design-vue';
import type { TableColumnsType } from 'ant-design-vue';
export const formState = reactive<FormState>({
  assetNameCn: '',
  assetNameEn: '',
  dataAssetState: null,
  categoryCode: '',
  oderByDate: null,
  page: null,
  size: null,
});
export const StateOptions = ref<SelectProps['options']>([
  {
    value: 0,
    label: '未发布',
  },
  {
    value: 1,
    label: '已发布',
  },
  {
    value: 2,
    label: '已停用',
  },
]);

// 表格
export const columns: TableColumnsType = [
  { title: '数据资产表中文名称', width: 150, dataIndex: 'assetNameCn', key: 'name', fixed: 'left' },
  { title: '数据资产表英文名称', width: 150, dataIndex: 'assetNameEn', key: 'age', fixed: 'left' },
  { title: '数据资产表描述', dataIndex: 'assetDesc', key: '1', width: 150 },
  { title: '发布状态', dataIndex: 'dataAssetState', key: '2', width: 100 },
  { title: '更新时间', dataIndex: 'updateTime', key: '3', width: 150, sorter: true },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 150,
  },
];
export const data = reactive<DataItem[]>([
  {
    key: 'BZ00011',
    assetNameCn: 'BZ00011',
    assetNameEn: '标准一',
    assetDesc: 'sadasdas',
    dataAssetState: 1,
    updateTime: '2022-07-26',
  },
  {
    key: 'BZ00012',
    assetNameCn: 'BZ00012',
    assetNameEn: '标准一',
    assetDesc: 'sadasdas',
    dataAssetState: 0,
    updateTime: '2022-07-26',
  },
  {
    key: 'BZ00013',
    assetNameCn: 'BZ00013',
    assetNameEn: '标准一',
    assetDesc: 'sadasdas',
    dataAssetState: 2,
    updateTime: '2022-07-26',
  },
  // {
  //   key: 'BZ00012',
  //   standardCode: 'BZ00012',
  //   standardCnName: '标准一',
  //   standardEnName: 'sadasdas',
  //   type: 'Enum',
  //   standardState: 1,
  //   updateTime: '2022-07-26',
  // },
  // {
  //   key: 'BZ00013',
  //   standardCode: 'BZ00013',
  //   standardCnName: '标准一',
  //   standardEnName: 'sadasdas',
  //   type: 'Enum',
  //   standardState: 2,
  //   updateTime: '2022-07-26',
  // },
  // {
  //   key: 'BZ00014',
  //   standardCode: 'BZ00014',
  //   standardCnName: '标准一',
  //   standardEnName: 'sadasdas',
  //   type: 'Enum',
  //   standardState: 0,
  //   updateTime: '2022-07-26',
  // },
]);
