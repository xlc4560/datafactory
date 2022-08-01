// todo 实现封装一个axios
import api from '@/utils/axios';
import * as FunArgsType from '@/api/standard/standardFunArgsType';
enum Api {
  // 开发接口
  STANDARD_SEARCH = '/standard/search', //检索数据标准列表
  STANDARD_ADD = '/standard/add', //添加数据标准
  STANDARD_UPDATESTANDARD = '/standard/updateStandard', //编辑数据标准
  STANDARD_DETAIL = '/standard/detail/', //数据标准详情查询
  STANDARD_REVISE = '/standard/revise', //数据标准状态修改
  STANDARD_DEL = '/standard/', //删除数据标准
}

//检索数据标准列表
export const standardSearch = (params: FunArgsType.StandardSearch) => {
  return api.post<any>({ url: Api.STANDARD_SEARCH, data: params });
};
// 添加数据标准
export const standardAdd = (params: FunArgsType.StandardAdd) => {
  return api.post<any>({ url: Api.STANDARD_ADD, data: params });
};
// 编辑数据标准
export const standardUpdateStandard = (params: FunArgsType.StandardUpdateStandard) => {
  return api.put<any>({ url: Api.STANDARD_UPDATESTANDARD, data: params });
};
//数据标准详情查询
export const standardDetail = (standardCode: string) => {
  return api.get<any>({ url: Api.STANDARD_DETAIL + standardCode });
};
//数据标准状态修改
export const standardRevise = (params: FunArgsType.StandardRevise) => {
  return api.put<any>({ url: Api.STANDARD_REVISE, data: params });
};
//删除数据标准
export const standardDel = (standardCode: string) => {
  return api.del<any>({ url: Api.STANDARD_DEL + standardCode });
};
