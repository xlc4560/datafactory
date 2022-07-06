// todo 实现封装一个axios
import api from '@/utils/axios';
import * as resType from './model';
import * as funType from './functionArgTypes';
enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  GET_TEST = '/str/hitokoto/get?type=social',
  GET_WTH = '/weather/weather_mini?city=%E9%87%8D%E5%BA%86',
  GET_API_LIST = '/api/list/',
}

export const accountInfoApi = () => api.get<resType.GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });
export const getTest = () => api.get<resType.GetStr>({ url: Api.GET_TEST });
export const getWth = () => api.get<resType.GetWth>({ url: Api.GET_WTH });
// 获取接口列表数据函数
export const GetApiList = ({ page, params }: funType.GetApiListArgs) => api.post<resType.GetApiList>({ url: Api.GET_API_LIST + page, data: params });
