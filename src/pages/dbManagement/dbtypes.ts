//数据库管理

// 常用类型
interface FormState {
  dataSourceState: number | null;
  dataSourceName: string | null;
}

export type { FormState };

// 数据库应用状态(用于渲染select框)
const dbStateOptions: { value: number; lable: string }[] = [
  { value: 0, lable: '未发布' },
  { value: 1, lable: '已发布' },
  { value: 2, lable: '已停用' },
];

// 固定配置项（表格配置，表头）
const columns = [
  {
    title: '数据源名称',
    dataIndex: 'dataSourceName',
    ellipsis: true,
  },
  {
    title: '数据库类型',
    dataIndex: 'dataSourceType',
    // width: '20%',
  },
  {
    title: '连接信息',
    dataIndex: 'dataSourceUrl',
    ellipsis: true,
  },

  {
    title: '应用状态',
    dataIndex: 'dataSourceState',
    ellipsis: true,
    width: '10%',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    sorter: true,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'db_operation',
    width: '20%',
    ellipsis: true,
  },
];

//列表死数据
const data = [
  {
    key: '1',
    dataSourceName: 'John Brown',
    dataSourceType: 333,
    dataSourceUrl: 'New York No. 1 Lake Park',
    dataSourceState: 0,
    oderByDate: '2022 - 7 - 17',
  },
  {
    key: '2',
    dataSourceName: 'John Brown',
    dataSourceType: 333,
    dataSourceUrl: 'New York No. 1 Lake Park',
    dataSourceState: 1,
    oderByDate: '2022 - 7 - 17',
  },
  {
    key: '3',
    dataSourceName: 'John Brown',
    dataSourceType: 333,
    dataSourceUrl: 'New York No. 1 Lake Park',
    dataSourceState: 2,
    oderByDate: '2022 - 7 - 17',
  },
  {
    key: '3',
    dataSourceName: 'John Brown',
    dataSourceType: 333,
    dataSourceUrl: 'New York No. 1 Lake Park',
    dataSourceState: 2,
    oderByDate: '2022 - 7 - 17',
  },
  {
    key: '3',
    dataSourceName: 'John Brown',
    dataSourceType: 333,
    dataSourceUrl: 'New York No. 1 Lake Park',
    dataSourceState: 2,
    oderByDate: '2022 - 7 - 17',
  },
  {
    key: '3',
    dataSourceName: 'John Brown',
    dataSourceType: 333,
    dataSourceUrl: 'New York No. 1 Lake Park',
    dataSourceState: 2,
    oderByDate: '2022 - 7 - 17',
  },
  {
    key: '3',
    dataSourceName: 'John Brown',
    dataSourceType: 333,
    dataSourceUrl: 'New York No. 1 Lake Park',
    dataSourceState: 2,
    oderByDate: '2022 - 7 - 17',
  },
  {
    key: '3',
    dataSourceName: 'John Brown',
    dataSourceType: 333,
    dataSourceUrl: 'New York No. 1 Lake Park',
    dataSourceState: 2,
    oderByDate: '2022 - 7 - 17',
  },
  {
    key: '3',
    dataSourceName: 'John Brown',
    dataSourceType: 333,
    dataSourceUrl: 'New York No. 1 Lake Park',
    dataSourceState: 2,
    oderByDate: '2022 - 7 - 17',
  },
];

// 数据codeState 键值对标识，用于渲染不同的文字与颜色
const dataSourceState: { value: string; color: string }[] = [
  { value: '未发布', color: '#faad14' },
  { value: '已发布', color: '#52c41a' },
  { value: '已停用', color: '#ff4d4f' },
  { value: '未发布', color: '#faad14' },
];

export { columns, data, dataSourceState, dbStateOptions };
