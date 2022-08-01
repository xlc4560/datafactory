import type * as ApiType from './types';
// 固定配置项（接口列表展示页）
const columns = [
  {
    title: '接口名称',
    dataIndex: 'apiName',
    width: '10%',
    ellipsis: true,
    minWidth: '100px',
    // maxWidth: '120px',
  },
  {
    title: '接口描述',
    dataIndex: 'apiDescription',
    ellipsis: true,
  },
  {
    title: '接口分类',
    dataIndex: 'categoryName',
    ellipsis: true,
    minWidth: '100px',
  },
  {
    title: '接口来源',
    dataIndex: 'apiSource',
    ellipsis: true,
    width: '100px',
  },
  {
    title: 'API状态',
    dataIndex: 'apiState',
    ellipsis: true,
    width: '100px',
    maxWidth: '120px',
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
    width: '260px',
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
export { columns, apiState };
// 接口状态(用于渲染select框)
export const apiStateOptions: { value: number; lable: string }[] = [
  { value: 4, lable: '已停用' },
  { value: 1, lable: '草稿' },
  { value: 2, lable: '未发布' },
  { value: 3, lable: '已发布' },
];
// select框下拉数据
// 接口来源
export const apiResourceOptions: ApiType.apiSource[] = [{ value: '数据服务' }, { value: '指标管理' }, { value: '决策引擎' }, { value: '数据工厂' }];
export const dataSource2 = [
  {
    id: 35,
    apiName: '代从毛消思',
    apiSource: 'nulla quis ut occaecat ea',
    apiState: 1,
    updateTime: '1990-08-23 11:17:12',
    pageSize: 49,
    page: 64,
  },
];

// 表格配置项(详情展示页中的表格)
export const apiDetails_columns = [
  {
    title: '参数名称',
    dataIndex: 'parameterName',
    key: 'parameterName',
  },
  {
    title: '参数位置',
    dataIndex: 'parameterPosition',
    key: 'parameterPosition',
  },
  {
    title: '数据类型',
    dataIndex: 'parameterType',
    key: 'parameterType',
  },
  {
    title: '是否必填',
    key: 'parameterRequire',
    dataIndex: 'parameterRequire',
  },
  {
    title: '默认值',
    dataIndex: 'parameterDefault',
    key: 'parameterDefault',
  },
  {
    title: '说明',
    dataindex: 'parameterDescription',
    key: 'parameterDescription',
  },
];
