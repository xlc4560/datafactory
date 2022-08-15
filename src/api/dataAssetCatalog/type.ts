// 检索数据资产列表
export interface AssetGetList {
  assetNameCn?: string; //数据资产中文名称
  assetNameEn?: string; //数据资产英文名称
  categoryCode?: string; //分类编号
  dataAssetState?: number | null; //数据资产表状态；，0：未发布；1：已发布；2：已停用
  updateTimeOrder?: number | null; //按时间排序，0降序（默认），1升序
  page: number | null; //页数
  pageSize: number | null; //每页大小
}
// 状态修改
export interface AssetUpdateState {
  assetCodes: string[]; //数据资产编码数组
  operation: number; //操作，0：发布 1：停用
}

// // 新增数据资产
export interface AssetAdd {
  assetCode?: string; //数据资产编号
  assetDesc?: string; //数据资产表描述
  assetNameCn: string; //数据资产名称
  assetNameEn: string; //数据资产英文名称
  categoryCodes: { value: string }[]; //目录编号数组
  //数据资产配置
  assetConfigs: {
    assetConfigDescription?: string; //字段描述
    assetConfigName: string; //字段中文名称
    assetConfigNameEn: string; //字段英文名称
    standardCode: string; //数据标准目录编号
    editable?: boolean; // 编辑状态
  }[];
}

// 数据资产更新
export interface AssetUpdate {
  assetCode?: string; //数据资产编号
  assetDesc?: string; //数据资产表描述
  assetNameCn: string; //数据资产名称
  assetNameEn: string; //数据资产英文名称
  categoryCodes: { value: string }[]; //目录编号数组
  //数据资产配置
  assetConfigs: {
    assetConfigDescription?: string; //字段描述
    assetConfigName: string; //字段中文名称
    assetConfigNameEn: string; //字段英文名称
    standardCode: string; //数据标准目录编号
    editable?: boolean; // 编辑状态
  }[];
}
