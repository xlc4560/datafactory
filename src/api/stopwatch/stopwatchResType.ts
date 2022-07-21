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
export interface StopwatchDetailsRes {
  codeConfig?: {
    id?: number;
    codeId?: string;
    codeConfigName: string;
    codeConfigValue: string;
    codeConfigDescription: string;
  }[];
  codeId: string;
  codeName: string;
}
