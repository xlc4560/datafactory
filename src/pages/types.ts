interface FormState {
  apiResource: string | null;
  apiStatus: string | null;
  apiName: string;
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
const columns = [
  {
    title: '接口名称',
    dataIndex: 'apiName',
    // width: '20%',
  },
  {
    title: '接口描述',
    dataIndex: 'apiDesc',
    // width: '20%',
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
  },
  {
    title: 'API状态',
    dataIndex: 'apiStatus',
    ellipsis: true,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'apiOperation',
    ellipsis: true,
  },
];
export { columns };
export type { FormState, APIParams, APIResult, Key };
