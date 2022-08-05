// 表格配置项（列表配置）
export const stopwatch_columns = [
  {
    title: '码表编号',
    dataIndex: 'codeId',
    key: 'codeId',
    width: '10%',
    minWidth: '100px',
  },
  {
    title: '码表名称',
    dataIndex: 'codeName',
    key: 'codeName',
    ellipsis: true,
    width: '15%',
    minWidth: '100px',
  },
  {
    title: '码表说明',
    dataIndex: 'codeDescription',
    key: 'codeDescription',
    ellipsis: true,
    minWidth: '100px',
  },
  {
    title: '码表状态',
    key: 'codeState',
    dataIndex: 'codeState',
    width: '10%',
    minWidth: '100px',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    sorter: true,
    width: '15%',
    minWidth: '100px',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '260px',
  },
];

// 表格模拟数据（列表数据）
export const stopwatchData = [
  {
    codeId: 'ME017B',
    codeName: 'xxxxxxxxxxxxxxxxxxxxxx',
    codeDescription: 'hsrghaeruhg;oajrgaregharighh;iawrgjghsrghaeruhg;oajrgaregharighh;iawrgjghsrghaeruhg;oajrgaregharighh;iawrgjghsrghaeruhg;oajrgaregharighh;iawrgjg',
    codeState: 0,
    updateTime: '2022-07-18 16:18:32',
  },
  {
    codeId: 'ME017A',
    codeName: 'xxxxxxxxxxxxxxxxxxxxxx',
    codeDescription: 'hsrghaeruhg;oajrgaregharighh;iawrgjg',
    codeState: 1,
    updateTime: '2022-07-18 16:18:32',
  },
  {
    codeId: 'ME017C',
    codeName: 'xxxxxxxxxxxxxxxxxxxxxx',
    codeDescription: 'hsrghaeruhg;oajrgaregharighh;iawrgjg',
    codeState: 2,
    updateTime: '2022-07-18 16:18:32',
  },
];
// 接口状态(用于渲染select框)  0:未发布，1:已发布，2:已停用
export const stopwatchStateOptions: { value: number; lable: string }[] = [
  { value: 0, lable: '未发布' },
  { value: 1, lable: '已发布' },
  { value: 2, lable: '已停用' },
];
// 定义状态修改的枚举类型
export enum UpdateStateApi {
  RELEASE,
  DISABLE,
}
// 数据(码表状态)codeState 键值对标识，用于渲染不同的文字与颜色  0:未发布，1:已发布，2:已停用
export const codeState: { value: string; color: string }[] = [
  { value: '未发布', color: '#faad14' },
  { value: '已发布', color: '#52c41a' },
  { value: '已停用', color: '#ff4d4f' },
];
// 码表详情
export const stopwatchDetails_columns = [
  {
    title: '码值取值',
    dataIndex: 'codeConfigValue',
    key: 'codeConfigValue',
  },
  {
    title: '码值名称',
    dataIndex: 'codeConfigName',
    key: 'codeConfigName',
  },
  {
    title: '码值含义',
    dataIndex: 'codeConfigDescription',
    key: 'codeConfigDescription',
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
    dataIndex: 'codeConfigValue',
    width: '25%',
  },
  {
    title: '码值名称',
    dataIndex: 'codeConfigName',
    width: '25%',
  },
  {
    title: '码值含义',
    dataIndex: 'codeConfigDescription',
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
