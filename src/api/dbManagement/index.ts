// todo 实现封装一个axios
import api from '@/utils/axios';
import * as dataSource from '@/api/dbManagement/dataSource';
import { GetAccountInfoModel } from '@/api/apiManagement/resType';
import { GETDBList, GetDBListModel, GetDBRevise } from '@/pages/dbManagement/model';

enum Api {
  // 示例测试接口
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  GET_TEST = '/getTest/api/QueryApiDetails/1', // 测试url
  GET_WTH = '/weather_mini?city=%E9%87%8D%E5%BA%86', // 获取天气数据(仅测试)

  // 开发接口
  DB_LIST = '/dataSource/list', //数据库列表
  DB_DELETE = '/dataSource/delete/{id}', //删除
  DB_REVISE = '/dataSource/stateUpdate', //修改状态
  DB_TEST = '/dataSource/connectTest', //连接测试
  DB_DETAIL = 'dataSource/detail/', //详情

  ADD_DATASOURCE = '/dataSource/add', //新增数据源
  EDIT_DATASOURCE = '/dataSource/update', //修改数据源
  CONNECT_TEST = '/dataSource/connectTest', //连接测试
  DETAIL_SOURCE = '/dataSource/detail', //数据源详情
}

//数据库列表
export const dbList = (params: GETDBList) => api.post<GetDBListModel>({ url: Api.DB_LIST, data: params });
//删除
export const dbDelete = (id: number) => api.post<GetAccountInfoModel>({ url: Api.DB_DELETE + id });
//修改状态
export const dbRevise = (params: GetDBRevise) => api.post<any>({ url: Api.DB_REVISE, data: params });
//连接测试
export const dbTest = (params: GetDBTest) => api.post<any>({ url: Api.DB_TEST, data: params });
//详情
export const dbDetail = (id: number) => api.get<GetDBListModel>({ url: Api.DB_DETAIL + id });

//测试接口
export const weatherTest = () => {
  return api.get<any>({ url: Api.GET_WTH });
};

//新增数据源
export const AddDataSource = (params: dataSource.addDataSource) => {
  return api.post<any>({ url: Api.ADD_DATASOURCE, data: params });
};

//修改数据源
export const EditDataSource = (params: dataSource.editDataSource) => {
  return api.post<any>({ url: Api.EDIT_DATASOURCE, data: params });
};

//数据源连接测试
export const ConnectTest = (params: dataSource.connectTest) => {
  return api.post<any>({ url: Api.CONNECT_TEST, data: params });
};

//数据源详情
export const DetailDataSource = (id: number) => {
  return api.get<any>({ url: Api.DETAIL_SOURCE + '/' + id });
};
