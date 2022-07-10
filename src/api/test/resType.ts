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
export interface ApiList {
  apiBasics: { id: number; apiName: string; apiSource: string; apiState: number; updateTime: string; pageSize: number; pageNum: number; apiDescription: string; apiType: string; totalNum: number }[];
  totalNum: number;
}
export interface ApiDetails {
  id: number;
  apiName: string;
  apiSource: string;
  apiType: string;
  apiProtocol: number; // 接口协议(0:http 1:https)
  apiMethod: number; // 请求方式请求方式(0:get 1:post)
  apiIpPort: string;
  apiPath: string;
  apiState: number;
  apiResponse: string;
  apiTimeout: number;
  apiRequestBody?: string;
  apiDescription?: string;
  apiParameter?: {
    parameterApiId: number;
    parameterName: string;
    parameterType: number;
    parameterRequire: number; //是否必须 (0:非必填 1:必填)
    parameterPosition: number; //参数位置(0:query 1:header 3:body)
    parameterDescription?: string;
    parameterDefault: string;
  }[];
}
