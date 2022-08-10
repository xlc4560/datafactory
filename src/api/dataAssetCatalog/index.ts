// todo 实现封装一个axios
import api from '@/utils/axios';
import * as Type from '@/api/dataAssetCatalog/type';
enum Api {
  // 开发接口
  ASSET_GETLIST = '/asset/getList', //检索数据资产列表
  ASSET_UPDATESTATE = '/asset/updateState', //状态修改
  ASSET_DELETE = '/asset/delete/', //删除数据资产
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
