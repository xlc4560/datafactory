// todo 实现封装一个axios
import api from '@/utils/axios';
import * as Type from '@/api/dataAssetCatalog/type';
enum Api {
  // 开发接口
  ASSET_GETLIST = '/asset/getList', //检索数据资产列表
  ASSET_UPDATESTATE = '/asset/updateState', //状态修改
  ASSET_DELETE = '/asset/delete/', //删除数据资产
  ASSET_ADD = '/asset/add', //新增数据资产
  ASSET_UPDATE = '/asset/update', //数据资产更新
  ASSET_GETDETAIL = '/asset/getDetail/', //数据资产详情
  // 数据资产引用
  STANDARD_ASSETCONFIGADAPT = '/standard/assetConfigAdapt',
  // 分类查询
  CATEGORY_LIST_TREE = '/category/list/tree/',
}

// 检索数据资产列表
export const assetGetList = (params: Type.AssetGetList) => {
  return api.post<any>({ url: Api.ASSET_GETLIST, data: params });
};

// 状态修改
export const assetUpdateState = (params: Type.AssetUpdateState) => {
  return api.put<any>({ url: Api.ASSET_UPDATESTATE, data: params });
};

//删除数据资产
export const assetDelete = (assetCode: string) => {
  return api._delete<any>({ url: Api.ASSET_DELETE + assetCode });
};

// 新增数据资产
export const assetAdd = (params: Type.AssetAdd) => {
  return api.post<any>({ url: Api.ASSET_ADD, data: params });
};

//数据资产更新
export const asseUpdate = (params: Type.AssetUpdate) => {
  return api.put<any>({ url: Api.ASSET_UPDATE, data: params });
};

// 数据资产详情
export const assetGetDetail = (assetCode: string) => {
  return api.get<any>({ url: Api.ASSET_GETDETAIL + assetCode });
};

// 数据资产引用
export const standardAssetConfigAdapt = () => {
  return api.get<any>({ url: Api.STANDARD_ASSETCONFIGADAPT });
};

// 分类查询
export const categoryListTree = (categorySchema: string) => {
  return api.get<any>({ url: Api.CATEGORY_LIST_TREE + categorySchema });
};
