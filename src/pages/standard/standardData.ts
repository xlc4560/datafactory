import { FormState, DataItem, FormStateAdd } from './standardType';
import type { SelectProps } from 'ant-design-vue';
import type { TableColumnsType } from 'ant-design-vue';
// 声明表单绑定数据
export const formState = reactive<FormState>({
  snumber: '',
  cname: '',
  ename: '',
  sstate: null,
});
// 下拉选择
export const options = ref<SelectProps['options']>([
  {
    value: 1,
    label: '未发布',
  },
  {
    value: 2,
    label: '已发布',
  },
  {
    value: 3,
    label: '已停用',
  },
]);

// 表格
export const columns: TableColumnsType = [
  { title: '标准编号', width: 250, dataIndex: 'id', key: 'name', fixed: 'left' },
  { title: '中文名称', width: 250, dataIndex: 'cname', key: 'name', fixed: 'left' },
  { title: '英文名称', width: 250, dataIndex: 'ename', key: 'age', fixed: 'left' },
  { title: '数据类型', dataIndex: 'type', key: '1', width: 150 },
  { title: '标准状态', dataIndex: 'sstate', key: '2', width: 150 },
  { title: '更新时间', dataIndex: 'updateTime', key: '3', width: 150, sorter: true },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 200,
  },
];
export const data = reactive<DataItem[]>([
  {
    key: 'BZ00011',
    id: 'BZ00011',
    cname: '标准一',
    ename: 'sadasdas',
    type: 'Enum',
    sstate: 1,
    updateTime: '2022-07-26',
  },
  {
    key: 'BZ00012',
    id: 'BZ00012',
    cname: '标准一',
    ename: 'sadasdas',
    type: 'Enum',
    sstate: 1,
    updateTime: '2022-07-26',
  },
  {
    key: 'BZ00013',
    id: 'BZ00013',
    cname: '标准一',
    ename: 'sadasdas',
    type: 'Enum',
    sstate: 2,
    updateTime: '2022-07-26',
  },
  {
    key: 'BZ00014',
    id: 'BZ00014',
    cname: '标准一',
    ename: 'sadasdas',
    type: 'Enum',
    sstate: 3,
    updateTime: '2022-07-26',
  },
]);
///////////////////////////////////////
// 新增标准
export const formStateAdd = reactive<FormStateAdd>({
  cname: '',
  ename: '',
  specification: '', //标准说明
  Source: '', //来源机构
  iskong: '', //是否可为空
  type: '', //数据类型
});
// 下拉选择是否为空
export const optionsEmpty = ref<SelectProps['options']>([
  {
    value: '0',
    label: '可为空',
  },
  {
    value: '1',
    label: '不可为空',
  },
]);
// 选择状态
export const optionsType = ref<SelectProps['options']>([
  {
    value: 'Int',
    label: 'Int',
  },
  {
    value: 'Enum',
    label: 'Enum',
  },
  {
    value: 'Float',
    label: 'Float',
  },
  {
    value: 'String',
    label: 'String',
  },
]);
