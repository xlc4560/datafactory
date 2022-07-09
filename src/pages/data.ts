import exp from 'constants';
import type * as ApiType from './types';
// 接口状态(用于渲染select框)
export const apiStateOptions: { value: number; lable: string }[] = [
  { value: 0, lable: '已停用' },
  { value: 1, lable: '草稿' },
  { value: 2, lable: '未发布' },
  { value: 3, lable: '已发布' },
];
// select框下拉数据
// 接口来源
export const apiResourceOptions: ApiType.apiSource[] = [{ value: '数据服务' }, { value: '指标管理' }, { value: '决策引擎' }, { value: '数据工厂' }];
// 测试数据
export const dataSource2 = ref<ApiType.dataSource[]>([
  {
    apiId: '01',
    apiName: '接口1',
    apiDesc: '接口描述接口描述接口描述接口描述',
    apiSource: '数据工厂',
    apiState: 0,
    updateTime: '2021-12-12 12:24:25',
  },
  {
    apiId: '02',
    apiName: '接口2',
    apiDesc: '接口描述接口描述接口描述接口描述',
    apiSource: '数据工厂',
    apiState: 1,
    updateTime: '2021-12-12 12:24:26',
  },
  {
    apiId: '03',
    apiName: '接口3',
    apiDesc: '接口描述接口描述接口描述接口描述',
    apiSource: '数据工厂',
    apiState: 2,
    updateTime: '2021-12-12 12:24:27',
  },
  {
    apiId: '04',
    apiName: '接口4',
    apiDesc: '接口描述接口描述接口描述接口描述',
    apiSource: '数据工厂',
    apiState: 3,
    updateTime: '1990-08-23 11:17:12',
  },
]);
