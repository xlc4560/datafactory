// 声明表单绑定数据类型
export interface FormState {
  /**
   * 数据资产中文名称
   */
  assetNameCn?: string;
  /**
   * 数据资产英文名称
   */
  assetNameEn?: string;
  /**
   * 分类编号
   */
  categoryCode?: string;
  /**
   * 数据资产表状态；，0：未发布；1：已发布；2：已停用
   */
  dataAssetState?: number | null;
  /**
   * 按时间排序，0降序（默认），1升序
   */
  updateTimeOrder?: number | null;
  /**
   * 页数
   */
  page: number | null;
  /**
   * 每页大小
   */
  pageSize: number | null;
}
// 表格数据类型
export interface DataItem {
  key: string;
  assetNameCn: string;
  assetNameEn: string;
  assetDesc: string; //数据资产表描述
  dataAssetState: number; //数据资产表状态
  updateTime: string; //更新时间
}
//数据资产详细信息
export interface DataAssetInformation {
  chinesename: string;
  englishname: string;
  assetdescription: string;
  catalogue: string[];
  fieldinformation: {
    key?: number;
    fieldchinesename: string;
    fieldenglishname: string;
    fieldexplain: string;
    datatype: string;
    datalength: string;
    dataprecision: string;
    default: string;
    valueranges: string;
    enumranges: string;
  }[];
}
// 状态
export enum state {
  '未发布' = 0,
  '已发布' = 1,
  '已停用' = 2,
}
