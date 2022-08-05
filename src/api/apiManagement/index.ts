// todo 实现封装一个axios
import api from '@/utils/axios';
import * as resType from './resType';
import * as funType from './functionArgTypes';
import { apiInfoType, inputParameterDataType } from '@/pages/apiRegisterAndUpdate/dataType';
enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  GET_TEST = '/getTest/api/QueryApiDetails/1', // 测试url
  GET_WTH = '/weather/weather_mini?city=%E9%87%8D%E5%BA%86', // 获取天气数据(仅测试)

  GET_API_LIST = '/api/list', //获取列表数据http://192.168.78.100:8081
  GET_API_DETAILS = '/api/detail/', //获取接口详情
  API_STATE_UPDATE = '/api/revise', //修改接口状态
  DELETE_API = '/api/delete/', // 删除接口api
  UPDATE_API = '/api/edit', // 编辑接口信息
  REGISTER_API = '/api/draft', // 新增接口
  API_TEST = '/api/test', // 接口测试
  API_CHECK = '/api/verify', // 信息校验
}

//获取码表列表数据
export const codegetlist = (params: GETLIST) => api.post<GetAccountInfoModel>({ url: Api.CODE_LIST, data: params });

export const accountInfoApi = () => api.get<resType.GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });
export const getTest = () => api.get<resType.GetStr>({ url: Api.GET_TEST });
export const getWth = () => api.get<resType.GetWth>({ url: Api.GET_WTH });
// 获取接口列表数据函数
export const GetApiList = (params: funType.GetApiListArgs, order: number | null | undefined = 0) => {
  params.updateTimeOrder = order as 0 | 1 | null;
  return api.post<resType.ApiList>({ url: Api.GET_API_LIST, data: params });
};
// 获取接口详情数据
export const GetApiDetails = (id: string) => api.post<resType.ApiDetails>({ url: Api.GET_API_DETAILS + id });
// 接口状态修改
export const UpdateApiState = ({ operation, idList }: { operation: string; idList: string[] }) => api.post<any>({ url: Api.API_STATE_UPDATE, data: { operation, idList } });

// 删除接口
export const DeleteApi = (id: string) => api.post({ url: Api.DELETE_API + id });
// 编辑接口信息
export const UpdateApi = (params: funType.UpdateApi) => {
  params.apiParameter?.forEach((item: any) => {
    delete item.parameterApiId;
  });
  const data = { ...params.apiBasic, parameters: params.apiParameter };
  return api.post<any>({ url: Api.UPDATE_API, data });
};
// 接口测试
export const ApiTest = (params: funType.ApiTest) => {
  params.apiParameterList?.forEach(item => {
    item.parameterValue = item.parameterDefault;
    delete item.parameterDefault;
    delete item.parameterDescription;
  });
  return api.post<string>({ url: Api.API_TEST, data: params });
};
// 注册接口
export const RegisterApi = (params: any) => {
  delete params.apiBasic.id;
  params.apiParameter.forEach((item: any) => {
    delete item.inputstate;
    delete item.parameterApiId;
  });
  const data = { ...params.apiBasic, parameters: params.apiParameter };
  return api.post<object>({ url: Api.REGISTER_API, data });
};
// 数据校验
export const ApiCheck = (params: funType.ApiCheck) => {
  return api.post({
    url: Api.API_CHECK,
    data: {
      apiName: params.apiBasic.apiName,
      apiSource: params.apiBasic.apiSource,
      apiProtocol: params.apiBasic.apiProtocol,
      apiIpPort: params.apiBasic.apiIpPort,
      apiPath: params.apiBasic.apiPath,
      apiMethod: params.apiBasic.apiMethod,
      apiTimeout: params.apiBasic.apiTimeout,
      apiType: params.apiBasic.apiType,
    },
  });
};
// 新增接口2.0 宋杰龙版本
export const apiDraft = (params: apiInfoType) => {
  const parameters: inputParameterDataType[] = [];
  const arrayFlat = (data: inputParameterDataType[]) => {
    data.forEach((item: inputParameterDataType) => {
      parameters.push(item);
      if (item.children?.length) {
        arrayFlat(item.children);
      }
    });
  };
  arrayFlat(params.requestBody);
  arrayFlat(params.responseBody);
  return api.post<object>({ url: Api.REGISTER_API, data: { ...params.apiBasic, parameters: parameters.concat(params.inputParameters) } });
};

// 测试接口（用于测试网络请求及代理配置是否成功）
export const gettest = () => api.post({ url: Api.GET_TEST });
