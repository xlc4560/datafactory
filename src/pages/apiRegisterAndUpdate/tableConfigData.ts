import { nanoid } from 'nanoid';
import { reactive } from 'vue';
import { columnsType, inputParameterDataType } from './dataType';
export const nanoid_ = () => nanoid();
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

export const inputParametercolumns: columnsType[] = [
  {
    title: '参数名称',
    dataIndex: 'parameterName',
    minWidth: '120px',
    maxWidth: '150px',
  },
  {
    title: '参数位置',
    dataIndex: 'parameterPosition',
    selectOption: [
      {
        key: 0,
        label: 'query',
      },
      {
        key: 1,
        label: 'header',
      },
    ],
    minWidth: '120px',
    // width: '11%',
    maxWidth: '150px',
  },
  {
    title: '数据类型',
    dataIndex: 'parameterType',
    selectOption: [
      {
        key: 0,
        label: 'String',
      },
      {
        key: 1,
        label: 'Integer',
      },
      {
        key: 2,
        label: 'number',
      },
    ],
    minWidth: '120px',
    // width: '11%',
    maxWidth: '150px',
  },
  {
    title: '是否必填',
    dataIndex: 'parameterRequire',
    selectOption: [
      {
        key: 0,
        label: '否',
      },
      {
        key: 1,
        label: '是',
      },
    ],
    minWidth: '120px',
    // width: '11%',
    maxWidth: '150px',
  },
  {
    title: '默认值',
    dataIndex: 'parameterDefault',
    minWidth: '120px',
    // width: '11%',
    maxWidth: '150px',
    ellipsis: true,
  },
  {
    title: '参数描述',
    dataIndex: 'parameterDescription',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '260px',
  },
];
export const inputParameterData = reactive<inputParameterDataType>({
  parameterName: '',
  parameterPosition: null,
  parameterType: null,
  parameterRequire: null,
  parameterDefault: '',
  parameterDescription: '',
  id: nanoid_(),
  parameterPid: '0',
  isEdit: true,
});
export const requestBodycolumns = [
  {
    title: '参数名称',
    dataIndex: 'parameterName',
    width: '180px',
  },
  {
    title: '数据类型',
    dataIndex: 'parameterType',
    selectOption: [
      {
        key: 0,
        label: 'String',
      },
      {
        key: 1,
        label: 'Integer',
      },
      {
        key: 2,
        label: 'number',
      },
      {
        key: 3,
        label: 'Object',
      },
      {
        key: 4,
        label: 'Array',
      },
    ],
    minWidth: '120px',
    width: '13%',
    maxWidth: '150px',
  },
  {
    title: '是否必填',
    dataIndex: 'parameterRequire',
    selectOption: [
      {
        key: 0,
        label: '否',
      },
      {
        key: 1,
        label: '是',
      },
    ],
    minWidth: '120px',
    width: '13%',
    maxWidth: '150px',
  },
  {
    title: '默认值',
    dataIndex: 'parameterDefault',
    minWidth: '120px',
    width: '13%',
    maxWidth: '150px',
  },
  {
    title: '参数说明',
    dataIndex: 'parameterDescription',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '260px',
  },
];
export const requestBodyData = reactive<inputParameterDataType>({
  parameterName: '',
  parameterPosition: 2,
  parameterType: null,
  parameterRequire: null,
  parameterDefault: '',
  parameterDescription: '',
  id: nanoid_(),
  parameterPid: '0',
  isEdit: true,
});
export const responsecolumns = [
  {
    title: '参数名称',
    dataIndex: 'parameterName',
    width: '180px',
  },
  {
    title: '数据类型',
    dataIndex: 'parameterType',
    selectOption: [
      {
        key: 0,
        label: 'String',
      },
      {
        key: 1,
        label: 'Integer',
      },
      {
        key: 2,
        label: 'number',
      },
      {
        key: 3,
        label: 'Object',
      },
      {
        key: 4,
        label: 'Array',
      },
    ],
    minWidth: '120px',
    width: '13%',
    maxWidth: '150px',
  },
  {
    title: '参数说明',
    dataIndex: 'parameterDescription',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '260px',
  },
];
export const responseData = reactive<inputParameterDataType>({
  parameterName: '',
  parameterPosition: 3,
  parameterType: null,
  parameterRequire: null,
  parameterDefault: '',
  parameterDescription: '',
  id: nanoid_(),
  parameterPid: '0',
  isEdit: true,
});
