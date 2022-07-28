import { reactive } from 'vue';
export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
export const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];
export const inputParametercolumns = [
  {
    title: '参数名称',
    dataIndex: 'parameterName',
  },
  {
    title: '参数位置',
    dataIndex: 'parameterPosition',
  },
  {
    title: '数据类型',
    dataIndex: 'parameterType',
  },
  {
    title: '是否必填',
    dataIndex: 'parameterRequire',
  },
  {
    title: '默认值',
    dataIndex: 'parameterDefault',
  },
  {
    title: '参数描述',
    dataIndex: 'parameterDescription',
    width: '25%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '260px',
  },
];
export const inputParameterData = reactive<any>({
  parameterName: '',
  parameterPosition: '',
  parameterType: '',
  parameterRequire: '',
  parameterDefault: '',
  parameterDescription: '',
});
export const requestBodycolumns = [
  {
    title: '参数名称',
    dataIndex: 'parameterName',
  },
  {
    title: '数据类型',
    dataIndex: 'parameterType',
  },
  {
    title: '是否必填',
    dataIndex: 'parameterRequire',
  },
  {
    title: '默认值',
    dataIndex: 'parameterDefault',
  },
  {
    title: '参数说明',
    dataIndex: 'parameterDescription',
    width: '25%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '260px',
  },
];
export const responsecolumns = [
  {
    title: '参数名称',
    dataIndex: 'parameterName',
  },
  {
    title: '数据类型',
    dataIndex: 'parameterType',
  },
  {
    title: '参数说明',
    dataIndex: 'parameterDescription',
    width: '25%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '260px',
  },
];
