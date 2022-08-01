import { FormState, DataItem, FormStateAdd } from './standardType';
import type { SelectProps } from 'ant-design-vue';
import type { TableColumnsType } from 'ant-design-vue';
// 声明表单绑定数据
export const formState = reactive<FormState>({
  standardSourceOrganization: null,
  standardCode: '',
  standardCnName: '',
  standardEnName: '',
  standardState: null,
});
// 下拉选择
//
export const optionsOz = ref<SelectProps['options']>([
  {
    value: '数宜信',
    label: '数宜信',
  },
]);
export const options = ref<SelectProps['options']>([
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
  { title: '标准编号', width: 250, dataIndex: 'standardCode', key: 'name', fixed: 'left' },
  { title: '中文名称', width: 250, dataIndex: 'standardCnName', key: 'name', fixed: 'left' },
  { title: '英文名称', width: 250, dataIndex: 'standardEnName', key: 'age', fixed: 'left' },
  { title: '数据类型', dataIndex: 'type', key: '1', width: 150 },
  { title: '标准状态', dataIndex: 'standardState', key: '2', width: 150 },
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
    standardCode: 'BZ00011',
    standardCnName: '标准一',
    standardEnName: 'sadasdas',
    type: 'Enum',
    standardState: 1,
    updateTime: '2022-07-26',
  },
  {
    key: 'BZ00012',
    standardCode: 'BZ00012',
    standardCnName: '标准一',
    standardEnName: 'sadasdas',
    type: 'Enum',
    standardState: 1,
    updateTime: '2022-07-26',
  },
  {
    key: 'BZ00013',
    standardCode: 'BZ00013',
    standardCnName: '标准一',
    standardEnName: 'sadasdas',
    type: 'Enum',
    standardState: 2,
    updateTime: '2022-07-26',
  },
  {
    key: 'BZ00014',
    standardCode: 'BZ00014',
    standardCnName: '标准一',
    standardEnName: 'sadasdas',
    type: 'Enum',
    standardState: 0,
    updateTime: '2022-07-26',
  },
]);
///////////////////////////////////////
// 新增标准
export const formStateAdd = reactive<FormStateAdd>({
  codeId: null, //码表编号
  standardCnName: '', //中文名称
  standardDataAccuracy: null, //数据精度
  standardDataLength: null, //数据长度
  standardDefault: '', //默认值
  standardEnName: '', //英文名称
  standardExplain: '', //标准说明
  standardIsBlank: null, //是否可为空：0不可为空，1可为空
  standardSourceOrganization: '', //来源机构编码
  standardState: null, //标准状态  0：未发布，1：已发布，2：已停用
  standardType: null, //数据类型（0：int，1：enum，2：float，3：String）
  standardValueMax: null, //取值范围-最大值
  standardValueMin: null, //取值范围-最小值
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
    value: 0,
    label: 'Int',
  },
  {
    value: 1,
    label: 'Enum',
  },
  {
    value: 2,
    label: 'Float',
  },
  {
    value: 3,
    label: 'String',
  },
]);
