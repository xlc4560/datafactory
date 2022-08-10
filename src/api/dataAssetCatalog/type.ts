// 检索数据资产列表
export interface AssetGetList {
  assetNameCn?: string; //数据资产中文名称
  assetNameEn?: string; //数据资产英文名称
  categoryCode?: string; //分类编号
  dataAssetState?: number | null; //数据资产表状态；，0：未发布；1：已发布；2：已停用
  oderByDate?: number | null; //按时间排序，0降序（默认），1升序
  page: number | null; //页数
  size: number | null; //每页大小
}
// 状态修改
export interface AssetUpdateState {
  assetCodes: string[]; //数据资产编码数组
  operation: number; //操作，0：发布 1：停用
}
