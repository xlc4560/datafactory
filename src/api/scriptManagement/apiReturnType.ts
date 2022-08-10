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
  outputParameter?: null;
  sourceCode?: number | null;
  operatorCode?: null;
  isDelete?: number;
  createTime?: string;
  updateTime?: string;
}
export interface scriptLstResType {
  total: number; // 总页数
  totalPage: number; // 总条数
  scriptInfoList?: scriptInfoListType[];
}
