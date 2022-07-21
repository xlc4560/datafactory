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

  GET_API_LIST = '/api/apiList/searchAPI', //获取列表数据http://192.168.78.100:8081
  GET_API_DETAILS = '/api/apiList/apiDetail/', //获取接口详情
  API_STATE_UPDATE = '/api/apiList/reviseStatePort', //修改接口状态
  DELETE_API = '/api/apiList/delete/', // 删除接口api
  UPDATE_API = '/api/apiList/apiEdit/', // 编辑接口信息
  REGISTER_API = '/api/registerApi/save', // 新增接口
  API_TEST = '/api/apiList/apiTest', // 接口测试
  API_CHECK = '/api/registerApi/check', // 信息校验
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
export const UpdateApi = (params: funType.UpdateApi, state: 1 | 2) => {
  type updateApi = keyof funType.UpdateApi;
  type parameters = keyof funType.apiParameter;
  let isParameter = 0;
  const form = new FormData();
  Object.keys(params).forEach(item => {
    if (item !== 'apiParameter') {
      form.append(item, params[item as updateApi] as string);
    } else if (item === 'apiParameter') {
      if (params.apiParameter?.length) {
        isParameter = 1;
        (params.apiParameter as funType.apiParameter[]).forEach((apiParameter, index) => {
          Object.keys(apiParameter).forEach(key => {
            form.append(`list[${index}].${key}`, apiParameter[key as parameters] as string);
          });
        });
      }
    }
  });
  form.append('isParameter', isParameter + '');
  return api.post<any>({ url: Api.UPDATE_API + state, data: form });
};
// 接口测试
export const ApiTest = (params: funType.ApiTest) => {
  type key = keyof funType.ApiTest;
  type parameters = keyof funType.apiParameter;
  const form = new FormData();
  Object.keys(params).forEach((item: string) => {
    if (params[item as key] !== null && params[item as key] !== undefined && params[item as key] !== '') {
      if (item === 'apiParameter') {
        // form.append(item, JSON.stringify(params[item as key]));
        if (params.apiParameter?.length) {
          (params.apiParameter as funType.apiParameter[]).forEach((apiParameter, index) => {
            Object.keys(apiParameter).forEach(key => {
              form.append(`list[${index}].${key}`, apiParameter[key as parameters] as string);
            });
          });
        }
      } else {
        form.append(item, params[item as key] as string);
      }
    }
  });
  return api.post<string>({ url: Api.API_TEST, data: form });
};
// 注册接口
export const RegisterApi = (params: funType.register) => {
  type register = keyof funType.register;
  type parameters = keyof funType.apiParameter;
  const form = new FormData();
  Object.keys(params).forEach((item: string) => {
    if (params[item as register] !== null && params[item as register] !== undefined && params[item as register] !== '') {
      if (item === 'apiParameter') {
        (params.apiParameter as funType.apiParameter[]).forEach((apiParameter, index) => {
          Object.keys(apiParameter).forEach(key => {
            form.append(`parameters[${index}].${key}`, apiParameter[key as parameters] as string);
          });
        });
      } else if (item === 'apiResponse' || item === 'apiState') {
        form.append(item, params[item as register] as string);
      } else {
        form.append(`checkDTO.${item}`, params[item as register] as string);
      }
    }
  });
  return api.post<object>({ url: Api.REGISTER_API, data: form });
};
// 数据校验
export const ApiCheck = (params: funType.ApiCheck) => {
  const form = new FormData();
  Object.keys(params).forEach(item => {
    if (params[item as keyof funType.ApiCheck] !== null && params[item as keyof funType.ApiCheck] !== undefined && params[item as keyof funType.ApiCheck] !== '') {
      if (item !== 'apiParameter') {
        form.append(item, params[item as keyof funType.ApiCheck] as string);
      }
    }
  });
  form.delete('createTime');
  form.delete('updateTime');
  form.delete('apiDeleted');
  form.delete('apiState');
  form.delete('apiRequestBody');
  form.delete('apiResponse');
  return api.post({ url: Api.API_CHECK, data: form });
};

// 测试接口（用于测试网络请求及代理配置是否成功）
export const gettest = () => api.post({ url: Api.GET_TEST });
