// 表格配置项（列表配置）
export const stopwatch_columns = [
  {
    title: '码表编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '码表名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
  },
  {
    title: '码表说明',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
  },
  {
    title: '码表状态',
    key: 'state',
    dataIndex: 'state',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    sorter: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
];

// 表格模拟数据（列表数据）
export const stopwatchData = [
  {
    key: '1',
    id: 'ME017B',
    name: 'xxxxxxxxxxxxxxxxxxxxxx',
    description: 'hsrghaeruhg;oajrgaregharighh;iawrgjg',
    state: 0,
    updateTime: '2022-07-18 16:18:32',
    action: '13454',
  },
  {
    key: '2',
    id: 'ME017B',
    name: 'xxxxxxxxxxxxxxxxxxxxxx',
    description: 'hsrghaeruhg;oajrgaregharighh;iawrgjg',
    state: 0,
    updateTime: '2022-07-18 16:18:32',
    action: '635453',
  },
];

// 码表详情
export const stopwatchDetails_columns = [
  {
    title: '码值取值',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '码值名称',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '码值含义',
    dataIndex: 'address',
    key: 'address',
  },
];

// 码表详情（模拟数据）
export const stopwatchDetails_data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

// 编辑、新增码表（表格配置）
export const stopwatchUpdate_columns = [
  {
    title: '码值取值',
    dataIndex: 'name',
    width: '25%',
  },
  {
    title: '码值名称',
    dataIndex: 'money',
    width: '25%',
  },
  {
    title: '码值含义',
    dataIndex: 'address',
    width: '25%',
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '25%',
  },
];

// 编辑、新增码表（模拟表格数据）
export const stopwatchUpdate_data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
    action: 0,
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
    action: 0,
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
    action: 0,
  },
];
