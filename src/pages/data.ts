import type * as ApiType from './types';
// 接口状态(用于渲染select框)
export const apiStateOptions: { value: number; lable: string }[] = [
  { value: 4, lable: '已停用' },
  { value: 1, lable: '草稿' },
  { value: 2, lable: '未发布' },
  { value: 3, lable: '已发布' },
];
export const codeStateOptions: { value: number; lable: string }[] = [
  { value: 3, lable: '已停用' },
  { value: 1, lable: '未发布' },
  { value: 2, lable: '已发布' },
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

export const data = [
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
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 2,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '3',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 3,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '4',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '5',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '6',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '7',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '8',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '9',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '10',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '11',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '12',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '13',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '14',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
  {
    key: '15',
    code_id: 'xss111',
    code_name: 32,
    code_description: 'New York No. 1 Lake Park',
    code_state: 1,
    update_time: '2022 - 7 - 19',
  },
];

// 表格配置项
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
