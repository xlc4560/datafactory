//  码表列表响应类型
export interface StopwatchListRes {
  total: number;
  totalPage: number;
  list: {
    codeId: string;
    codeName: string;
    codeDescription: string;
    codeState: number;
    createTime: string;
    updateTime: string;
  }[];
}
// 码表详情响应类型
export interface codeConfigType {
  id?: number;
  codeId?: string;
  codeConfigName: string;
  codeConfigValue: string;
  codeConfigDescription: string;
}
export interface StopwatchDetailsRes {
  codeConfig?: codeConfigType[];
  codeId: string;
  codeName: string;
}
