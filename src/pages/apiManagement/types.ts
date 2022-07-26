// 常用类型
interface FormState {
  apiSource: string | null;
  apiState: number | null;
  apiName: string | null;

  //码表
  code_state: number | null;
  code_name: string | null;
}
type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};
type APIResult = {
  results: {
    gender: 'female' | 'male';
    name: string;
    email: string;
  }[];
};
type Key = string | number;
// 接口参数的类型
export interface apiParameter {
  id?: number | string | null;
  parameterApiId?: number | null;
  parameterName?: string;
  parameterType?: number | null | string;
  parameterRequire?: number | null | string; //是否必须 (0:非必填 1:必填)
  parameterPosition?: number | null | string; //参数位置(0:query 1:header 3:body)
  parameterDescription?: string;
  parameterDefault?: string;
  parameterUseValue?: string;
}
// 接口来源
interface apiSource {
  value: string;
}
// 接口状态(用于标识select框数据类型)
// interface apiState {
//   value: number;
//   lable: string;
// }
// 用于标识需要渲染到表格中的数据的类型
interface dataSource {
  apiId: string;
  apiName: string;
  apiDesc: string;
  apiClassify?: string;
  apiSource: string;
  apiState: number;
  updateTime: string;

  //码表
  code_id: string;
  code_name: string;
  code_description: string;
  code_state: number;
  update_time: string;
}
export type { FormState, APIParams, APIResult, Key, apiSource, dataSource };

// 固定配置项（表格配置）
const columns = [
  {
    title: '接口名称',
    dataIndex: 'apiName',
    // width: '20%',
  },
  {
    title: '接口描述',
    dataIndex: 'apiDescription',
    ellipsis: true,
  },
  {
    title: '接口分类',
    dataIndex: 'apiClassify',
    ellipsis: true,
  },
  {
    title: '接口来源',
    dataIndex: 'apiSource',
    ellipsis: true,
    width: '7%',
  },
  {
    title: 'API状态',
    dataIndex: 'apiState',
    ellipsis: true,
    width: '7%',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    sorter: true,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'apiOperation',
    width: '20%',
  },
];

//码表管理固定配置项（表格配置）
const firstcolumn = [
  {
    title: '码表编号',
    dataIndex: 'code_id',
    ellipsis: true,
  },
  {
    title: '码表名称',
    dataIndex: 'code_name',
    // width: '20%',
  },
  {
    title: '码表说明',
    dataIndex: 'code_description',
    ellipsis: true,
  },

  {
    title: '码表状态',
    dataIndex: 'code_state',
    ellipsis: true,
    width: '7%',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    sorter: true,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'code_operation',
    width: '20%',
    ellipsis: true,
  },
];
// 数据apiState 键值对标识，用于渲染不同的文字与颜色
const apiState: { value: string; color: string }[] = [
  { value: '已停用', color: '#ff4d4f' },
  { value: '草稿', color: '#18c9e4' },
  { value: '未发布', color: '#faad14' },
  { value: '已发布', color: '#52c41a' },
  { value: '已停用', color: '#ff4d4f' },
];
// 数据codeState 键值对标识，用于渲染不同的文字与颜色
const codeState: { value: string; color: string }[] = [
  { value: '已停用', color: '#ff4d4f' },
  { value: '未发布', color: '#faad14' },
  { value: '已发布', color: '#52c41a' },
  { value: '已停用', color: '#ff4d4f' },
];
export { columns, apiState, firstcolumn, codeState };
