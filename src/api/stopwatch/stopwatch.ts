// todo 实现封装一个axios
import api from '@/utils/axios';
import * as resType from '@/api/stopwatch/stopwatchResType';
import * as funArgsType from '@/api/stopwatch/stopwatchFunArgsType';
enum Api {
  // 示例测试接口
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  GET_TEST = '/getTest/api/QueryApiDetails/1', // 测试url
  GET_WTH = '/weather/weather_mini?city=%E9%87%8D%E5%BA%86', // 获取天气数据(仅测试)

  // 开发接口
  GET_STOPWATCH_LIST = '/code/list/', // 获取码表列表数据
  ADD_STOPWATCH = '/code/add', // 新增码表
  EDIT_STOPWATCH = '/code/edit', // 编辑码表
  DELETE_STOPWATCH = '/code/delete/', // 删除码表
  GET_STOPWATCH_DETAILS = '/code/detail/', // 查看码表详情
  UPDATE_STOPWATCH_STATE = '/code/stateUpdate', // 码表状态修改
}
// 检索列表回调
export const getStopwatchList = (params: funArgsType.GetStopwatchList) => {
  console.log(params);
  const data = {
    codeState: params.codeState,
    codeName: params.codeName,
    orderBy: params.orderBy,
  };
  return api.post<resType.StopwatchListRes>({ url: `${Api.GET_STOPWATCH_LIST}${params.page}/${params.size}`, data });
};

// 新增码表
export const addStopwatch = (params: funArgsType.AddStopwatch) => {
  delete params?.codeId;
  return api.post<any>({ url: Api.ADD_STOPWATCH, data: params });
};

// 编辑码表信息
export const editStopwatch = (params: funArgsType.EditStopwatch) => {
  return api.post<any>({ url: Api.EDIT_STOPWATCH, data: params });
};

// 删除码表
export const deleteStopwatch = (codeId: string) => {
  return api.get<any>({ url: Api.DELETE_STOPWATCH + codeId });
};
// 码表详情查看
export const getStopwatchDetails = (codeId: string) => {
  // const {data}= api.get<resType.StopwatchDetailsRes>({ url: Api.GET_STOPWATCH_DETAILS + codeId });

  return api.get<resType.StopwatchDetailsRes>({ url: Api.GET_STOPWATCH_DETAILS + codeId });
};

// 码表状态修改
export const updateStopwatchState = (params: funArgsType.UpdateStopwatchState) => {
  return api.post<any>({ url: Api.UPDATE_STOPWATCH_STATE, data: params });
};
