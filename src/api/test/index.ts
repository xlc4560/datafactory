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
  GET_API_LIST = '/getApiList/api/apiList/searchAPI', //获取列表数据http://192.168.78.100:8081
  GET_API_DETAILS = '/apiList/apiDetail/', //获取接口详情
  API_STATE_UPDATE = '/updateApiState/apiList/reviseStatePort', //修改接口状态
  DELETE_API = '/deleteApi/api/apiList/delete/', // 删除接口api
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
    form.append(item, params[item as key] as string);
  });
  return api.post<resType.ApiList[]>({ url: Api.GET_API_LIST, data: form });
};
// 获取接口详情数据
export const GetApiDetails = (id: string) => api.get<resType.ApiDetails>({ url: Api.GET_API_DETAILS + id });
// 接口状态修改
export const UpdateApiState = ({ operation, idList }: { operation: number; idList: string[] }) => api.post<any>({ url: Api.API_STATE_UPDATE, data: { operation, idList } });
// 删除接口
export const DeleteApi = (id: string) => api.get({ url: Api.DELETE_API + id });
// 测试接口
export const gettest = () => api.post({ url: Api.GET_TEST });
