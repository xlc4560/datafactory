// todo 实现封装一个axios
import api from '@/utils/axios';
import { GetAccountInfoModel } from './model';

enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
}

export const accountInfoApi = () => api.get<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });
