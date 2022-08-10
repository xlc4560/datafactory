import api from '@/utils/axios';
import * as funArgsType from './apiFunArgs';
import * as resType from './apiReturnType';
// import * as funReturnType from './apiReturnType';
enum Api {
  GET_SCRIPT_LIST = '/script/scriptInfo/getScriptList',
  UPDATE_STATE = '/scriptInfo/updateState',
}

export const getScriptList = (filterData: funArgsType.FilterDataType) => {
  const data = {
    current: undefined,
    pageSize: undefined,
    ...filterData,
  };
  delete data.current;
  delete data.pageSize;
  return api.post<resType.scriptLstResType>({ url: Api.GET_SCRIPT_LIST, data });
};
export const updateState = (params: { idList: (number | string)[]; scriptState: number | string }) => {
  return api.post<any>({ url: Api.UPDATE_STATE, data: params });
};
