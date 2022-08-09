import api from '@/utils/axios';
import * as funArgsType from './apiFunArgs';
// import * as funReturnType from './apiReturnType';
enum Api {
  GET_SCRIPT_LIST = '/scriptInfo/getScriptList',
}

export const getScriptList = (filterData: funArgsType.FilterDataType) => {
  return api.post({ url: Api.GET_SCRIPT_LIST, data: filterData });
};
