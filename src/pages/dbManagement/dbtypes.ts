//数据库管理

// 常用类型
interface FormState {
  dbstate: number | null;
  dbname: string | null;
}

export type { FormState };

// 数据库应用状态(用于渲染select框)
const dbStateOptions: { value: number; lable: string }[] = [
  { value: 1, lable: '未发布' },
  { value: 2, lable: '已发布' },
  { value: 3, lable: '已停用' },
];

// 固定配置项（表格配置，表头）
const columns = [
  {
    title: '数据源名称',
    dataIndex: 'code_id',
    ellipsis: true,
  },
  {
    title: '数据库类型',
    dataIndex: 'code_name',
    // width: '20%',
  },
  {
    title: '连接信息',
    dataIndex: 'code_description',
    ellipsis: true,
  },

  {
    title: '应用状态',
    dataIndex: 'code_state',
    ellipsis: true,
    width: '10%',
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

//列表死数据
const data = [
  {
    key: '1',
    code_id: 'John Brown',
    code_name: 333,
    code_description: 'New York No. 1 Lake Park',
    code_state: 2,
    update_time: '2022 - 7 - 17',
  },
  {
    key: '2',
    code_id: 'John Brown',
    code_name: 333,
    code_description: 'New York No. 1 Lake Park',
    code_state: 3,
    update_time: '2022 - 7 - 17',
  },
  {
    key: '3',
    code_id: 'John Brown',
    code_name: 333,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 17',
  },
  {
    key: '4',
    code_id: 'John Brown',
    code_name: 444,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 17',
  },
  {
    key: '5',
    code_id: 'John Brown',
    code_name: 555,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 17',
  },
  {
    key: '6',
    code_id: 'John Brown',
    code_name: 666,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 17',
  },
  {
    key: '7',
    code_id: 'John Brown',
    code_name: 777,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 17',
  },
  {
    key: '8',
    code_id: 'John Brown',
    code_name: 888,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 17',
  },
];

// 数据codeState 键值对标识，用于渲染不同的文字与颜色
const dbState: { value: string; color: string }[] = [
  { value: '已停用', color: '#ff4d4f' },
  { value: '未发布', color: '#faad14' },
  { value: '已发布', color: '#52c41a' },
  { value: '已停用', color: '#ff4d4f' },
];

export { columns, data, dbState, dbStateOptions };
