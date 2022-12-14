import { columnsType } from '@/pages/apiRegisterAndUpdate/dataType';
import type { Rule } from 'ant-design-vue/es/form';
export const tableColumns: columnsType[] = [
  {
    title: '脚本名称',
    dataIndex: 'scriptName',
    width: '20%',
    ellipsis: true,
  },
  {
    title: '脚本类型',
    dataIndex: 'scriptType',
    ellipsis: true,
  },
  {
    title: '脚本分类',
    dataIndex: 'scriptCategoryName',
    ellipsis: true,
  },
  {
    title: '脚本状态',
    dataIndex: 'scriptState',
    ellipsis: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    sorter: true,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '260px',
  },
];
export const scriptStateOption: { value: number; lable: string }[] = [
  { value: 0, lable: '未发布' },
  { value: 1, lable: '已发布' },
  { value: 2, lable: '已停用' },
];
export const scriptType: { value: number; lable: string }[] = [
  { value: 0, lable: 'Python脚本' },
  { value: 1, lable: 'SQL脚本' },
];
// 数据(码表状态)codeState 键值对标识，用于渲染不同的文字与颜色  0:未发布，1:已发布，2:已停用
export const codeState: { value: string; color: string }[] = [
  { value: '未发布', color: '#faad14' },
  { value: '已发布', color: '#52c41a' },
  { value: '已停用', color: '#ff4d4f' },
];

// 脚本详情
// 输入参数表格配置
export const inputParameterColumns: columnsType[] = [
  {
    title: '参数名称',
    dataIndex: 'parameterName',
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
  },
  {
    title: '参数描述',
    dataIndex: 'parameterDescription',
  },
];
// 输出参数表格配置
export const outputParameterColumns: columnsType[] = [
  {
    title: '参数名称',
    dataIndex: 'parameterName',
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
  },
  {
    title: '参数描述',
    dataIndex: 'parameterDescription',
  },
];

// 脚本测试表格配置
export const scriptTestTable: columnsType[] = [
  ...inputParameterColumns,
  {
    title: '测试值',
    dataIndex: 'testValue',
    width: '250px',
  },
];
// 脚本编辑、新增table
export const scriptEditInputParameterColumns: columnsType[] = [
  ...inputParameterColumns,
  {
    title: '操作',
    dataIndex: 'operation',
    width: '250px',
  },
];
export const scriptEditOutputParameterColumns: columnsType[] = [
  ...outputParameterColumns,
  {
    title: '操作',
    dataIndex: 'operation',
    width: '250px',
  },
];
export const FileDataType = ['.py', '.sql', '.py', '.sql'];
export const emptyCurrentScriptDetails = {
  fileList: [],
  scriptName: undefined,
  sourceCode: null,
  scriptCategory: undefined,
  scriptType: undefined,
  scriptClass: undefined,
  scriptFunction: undefined,
  scriptDescription: undefined,
  operatorCode: null,
  inputParameter: [],
  outputParameter: [],
};
const checkFile = async (_rule: Rule, value: File[]) => {
  if (value.length === 0) {
    return Promise.reject('请选择文件!');
  } else {
    return Promise.resolve();
  }
};
export const scriptFormRule: Record<string, Rule[]> = {
  fileList: [{ required: true, validator: checkFile, trigger: 'change' }],
  scriptName: [{ required: true, message: '请输入脚本名称!', trigger: 'change' }],
  scriptCategory: [{ required: true, message: '请选择脚本分类!', trigger: 'change' }],
  scriptClass: [{ required: true, message: '请输入类名!', trigger: 'change' }],
  scriptFunction: [{ required: true, message: '请输入函数名!', trigger: 'change' }],
  sourceCode: [{ required: true, message: '请选择数据源!', trigger: 'change' }],
};
