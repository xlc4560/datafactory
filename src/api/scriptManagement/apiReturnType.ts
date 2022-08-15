export interface scriptInfoListType {
  id?: number;
  scriptEncode?: string;
  scriptRoute?: string;
  scriptName?: string;
  scriptMethod?: string;
  scriptFunction?: string;
  scriptClass?: string;
  scriptDescription?: string;
  scriptCategory?: string;
  scriptState?: number;
  scriptType?: number;
  inputParameter?: string | null;
  outputParameter?: string | null;
  sourceCode?: number | null;
  operatorCode?: null;
  isDelete?: number;
  createTime?: string;
  updateTime?: string;
  [key: string]: any;
}
export interface scriptListResType {
  total: number; // 总页数
  totalPage: number; // 总条数
  scriptInfoList?: scriptInfoListType[];
}
export interface scriptTestRes {
  code: number;
  data: string | null | number;
  msg: string;
}
