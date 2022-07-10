// todo 实现封装一个axios
import api from '@/utils/axios';
import * as resType from './resType';
import * as funType from './functionArgTypes';
enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  GET_TEST = '/getTest/api/QueryApiDetails/1', // 测试url
  GET_WTH = '/weather/weather_mini?city=%E9%87%8D%E5%BA%86', // 获取天气数据(仅测试)
  GET_API_LIST = '/getApiInfo/api/apiList/searchAPI', //获取列表数据http://192.168.78.100:8081
  GET_API_DETAILS = '/details/api/apiList/apiDetail/', //获取接口详情
  API_STATE_UPDATE = '/details/api/apiList/reviseStatePort', //修改接口状态
  DELETE_API = '/api/apiList/delete/', // 删除接口api
  UPDATE_API = '/apiList/apiEdit/', // 编辑接口信息
  REGISTER_API = '/registerApi/api/registerApi/save', // 新增接口
  API_TEST = '/apiList/apiTest', // 接口测试
}

export const accountInfoApi = () => api.get<resType.GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });
export const getTest = () => api.get<resType.GetStr>({ url: Api.GET_TEST });
export const getWth = () => api.get<resType.GetWth>({ url: Api.GET_WTH });
// 获取接口列表数据函数
export const GetApiList = (params: funType.GetApiListArgs, order = 0) => {
  type key = keyof funType.GetApiListArgs;
  params.order = order as 0 | 1;
  const form = new FormData();
  Object.keys(params).forEach((item: string) => {
    if (params[item as key] !== null && params[item as key] !== undefined && params[item as key] !== '') {
      form.append(item, params[item as key] as string);
    }
  });
  return api.post<resType.ApiList>({ url: Api.GET_API_LIST, data: form });
};
// 获取接口详情数据
export const GetApiDetails = (id: string) => api.get<resType.ApiDetails>({ url: Api.GET_API_DETAILS + id });
// 接口状态修改
export const UpdateApiState = ({ operation, idList }: { operation: string; idList: string[] }) => {
  const form = new FormData();
  form.append('operation', operation);
  form.append('idList', idList.toString());
  return api.post<any>({ url: Api.API_STATE_UPDATE, data: form });
};
// 删除接口
export const DeleteApi = (id: string) => api.get({ url: Api.DELETE_API + id });
// 编辑接口信息
export const UpdateApi = (params: funType.UpdateApi, state: 0 | 1) => api.post<any>({ url: Api.UPDATE_API + state, data: params });
// 接口测试
export const ApiTest = (params: funType.ApiTest) => {
  type key = keyof funType.ApiTest;
  const form = new FormData();
  Object.keys(params).forEach((item: string) => {
    if (params[item as key] !== null && params[item as key] !== undefined && params[item as key] !== '') {
      form.append(item, params[item as key] as string);
    }
  });
  return api.post<string>({ url: Api.API_TEST, data: form });
};
// 注册接口
export const RegisterApi = (params: funType.register) => {
  type key = keyof funType.register;
  const form = new FormData();
  Object.keys(params).forEach((item: string) => {
    if (params[item as key] !== null && params[item as key] !== undefined && params[item as key] !== '') {
      form.append(item, params[item as key] as string);
    }
  });
  return api.post<object>({ url: Api.REGISTER_API, data: params });
};
// 测试接口（用于测试网络请求及代理配置是否成功）
export const gettest = () => api.post({ url: Api.GET_TEST });
