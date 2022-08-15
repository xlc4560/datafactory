import api from '@/utils/axios';
import * as funArgsType from './apiFunArgs';
import * as resType from './apiReturnType';
// import * as funReturnType from './apiReturnType';
enum Api {
  GET_SCRIPT_LIST = '/scriptInfo/getScriptList', // 脚本列表,
  UPDATE_STATE = '/scriptInfo/updateState', // 脚本状态修改,
  GET_SCRIPT_CONTENT = ' /scriptInfo/getScriptFile/', // 脚本文件查看
  SCRIPT_TEST = '/scriptInfo/test', // 脚本测试
  UPDATE_SCRIPT_STATE = '/scriptInfo/updateState', // 脚本状态修改
  DELETE_SCRIPT = '/scriptInfo/deleteScript/', // 脚本删除
  ADD_SCRIPT = '/scriptInfo/addScript', // 脚本新增
}
// 获取脚本列表
export const GetScriptList = (filterData: funArgsType.FilterDataType) => {
  const data = {
    current: undefined,
    pageSize: undefined,
    ...filterData,
  };
  delete data.current;
  delete data.pageSize;
  return api.post<resType.scriptListResType>({ url: Api.GET_SCRIPT_LIST, data });
};
// 脚本状态修改
export const UpdateScriptState = (params: funArgsType.UpdateStateType) => {
  return api.put<any>({ url: Api.UPDATE_SCRIPT_STATE, data: params });
};
// 脚本内容
export const GetScriptContent = (id: string | number): Promise<string> => {
  return api.post<string>({ url: `${Api.GET_SCRIPT_CONTENT}${id}` });
};
// 脚本测试
export const ScriptTest__ = (params: funArgsType.scriptTestType) => {
  return api.post<resType.scriptTestRes>({ url: Api.SCRIPT_TEST, data: params });
};
// 脚本删除
export const DeleteScript = (scriptId: number | string) => api._delete({ url: Api.DELETE_SCRIPT + scriptId });
// 新增脚本
export const AddScript = (params: funArgsType.AddScriptType) => {
  return api.post({ url: Api.ADD_SCRIPT, data: params });
};
