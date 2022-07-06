export interface GetAccountInfoModel {
  email: string;
  name: string;
  introduction: string;
  phone: string;
  address: string;
}
export interface GetStr {
  str: string;
}
export interface GetWth {
  data: object;
  desc: string;
  status: number;
}

// 请求api接口列表的响应值类型
export interface GetApiList {
  code: number;
  message: string;
  data: {
    records: {
      id: number;
      apiName: string;
      apiSource: string;
      apiType: null;
      apiDescription: string;
      apiProtocol: number;
      apiMethod: number;
      apiIpPort: string;
      apiPath: string;
      apiState: number;
      apiRequestBody: string;
      apiResponse: string;
      apiTimeout: number;
      apiDeleted: number;
      createTime: string;
      updateTime: string;
    };
    total: number;
    size: number;
    current: number;
    orders: string[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: null;
    maxLimit: null;
    pages: number;
  };
}
