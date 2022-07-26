import { FormState, DataItem } from './standardType';
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
  { title: '更新时间', dataIndex: 'updateTime', key: '3', width: 150 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 200,
  },
];
export const data = reactive<DataItem[]>([
  {
    id: 'BZ00011',
    cname: '标准一',
    ename: 'sadasdas',
    type: 'Enum',
    sstate: 0,
    updateTime: '2022-07-26',
  },
  {
    id: 'BZ00011',
    cname: '标准一',
    ename: 'sadasdas',
    type: 'Enum',
    sstate: 0,
    updateTime: '2022-07-26',
  },
  {
    id: 'BZ00011',
    cname: '标准一',
    ename: 'sadasdas',
    type: 'Enum',
    sstate: 0,
    updateTime: '2022-07-26',
  },
  {
    id: 'BZ00011',
    cname: '标准一',
    ename: 'sadasdas',
    type: 'Enum',
    sstate: 0,
    updateTime: '2022-07-26',
  },
]);
