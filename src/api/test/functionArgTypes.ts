// 函数GetApiList（请求接口列表）的参数类型
export interface GetApiListArgs {
  apiSource?: string | null;
  apiState?: number | null;
  apiName?: string | null;
  // 时间排序
  pageSize?: number | null;
  pageNum: number;
  order: 0 | 1;
}

export interface UpdateApi {
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
  };
}

export interface ApiTest {
  apiPath: string;
  apiName: string;
  apiMethod: string;
  apiRequestBody?: string;
  apiParameter?: {
    parameterName: string;
    parameterType: number;
    parameterRequire: number; //是否必须 (0:非必填 1:必填)
    parameterPosition: number; //参数位置(0:query 1:header 3:body)
    parameterDescription?: string;
    parameterDefault: string;
  };
}

export interface register {
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
  };
}
