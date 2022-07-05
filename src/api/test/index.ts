// todo 实现封装一个axios
import api from '@/utils/axios';
import { GetAccountInfoModel, GetStr, GetWth } from './model';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  GET_TEST = '/str/hitokoto/get?type=social',
  GET_WTH = '/weather/weather_mini?city=%E9%87%8D%E5%BA%86',
}

export const accountInfoApi = () => api.get<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });
export const getTest = () => api.get<GetStr>({ url: Api.GET_TEST });
export const getWth = () => api.get<GetWth>({ url: Api.GET_WTH });
