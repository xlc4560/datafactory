// 函数GetApiList（请求接口列表）的参数类型
export interface GetApiListArgs {
  apiSource?: string | null;
  apiState?: number | null;
  apiName?: string | null;
  //码表
  code_state: number | null;
  code_name: string | null;

  // 时间排序
  pageSize?: number | null;
  pageNum: number;
  order: 0 | 1;
}
export interface GetApiListArgs {
  //码表
  code_state: number | null;
  code_name: string | null;

  // 时间排序
  pageSize?: number | null;
  pageNum: number;
  order: 0 | 1;
}

export interface UpdateApi {
  id: number | null;
  apiName: string;
  apiSource: string;
  apiType: string;
  apiProtocol: number | null; // 接口协议(0:http 1:https)
  apiMethod: number | null; // 请求方式请求方式(0:get 1:post)
  apiIpPort: string;
  apiPath: string;
  apiState: number | null;
  apiResponse: string | null;
  apiTimeout: number | null;
  apiRequestBody?: string;
  apiDescription?: string;
  apiParameter?: {
    parameterApiId: number | null;
    parameterName: string;
    parameterType: number | null;
    parameterRequire: number | null; //是否必须 (0:非必填 1:必填)
    parameterPosition: number | null; //参数位置(0:query 1:header 3:body)
    parameterDescription?: string;
    parameterDefault: string;
  }[];
}
// api的参数类型
export interface apiParameter {
  parameterApiId: number | null;
  parameterName: string;
  parameterType: number | null;
  parameterRequire: number | null; //是否必须 (0:非必填 1:必填)
  parameterPosition: number | null; //参数位置(0:query 1:header 3:body)
  parameterDescription?: string;
  parameterDefault: string;
}
// 用于注册函数
export interface ApiTest {
  apiPath: string;
  apiName: string;
  apiMethod: string;
  apiRequestBody?: string;
  apiParameter?: {
    id?: number | string | null;
    parameterApiId?: number | null;
    parameterName?: string;
    parameterType?: number | null | string;
    parameterRequire?: number | null | string; //是否必须 (0:非必填 1:必填)
    parameterPosition?: number | null | string; //参数位置(0:query 1:header 3:body)
    parameterDescription?: string;
    parameterDefault?: string;
    parameterUseValue?: string;
  }[];
}
// 用于注册函数
export interface register {
  checkOperation: number | string | null;
  id: number | null;
  apiName: string;
  apiSource: string;
  apiType: string;
  apiProtocol: number | null; // 接口协议(0:http 1:https)
  apiMethod: number | null; // 请求方式请求方式(0:get 1:post)
  apiIpPort: string;
  apiPath: string;
  apiState: number | null;
  apiResponse: string | null;
  apiTimeout: number | null;
  apiRequestBody?: string;
  apiDescription?: string;
  apiParameter?: {
    parameterApiId: number | null;
    parameterName: string;
    parameterType: number | null;
    parameterRequire: number | null; //是否必须 (0:非必填 1:必填)
    parameterPosition: number | null; //参数位置(0:query 1:header 3:body)
    parameterDescription?: string;
    parameterDefault: string;
  }[];
}
// 用于接口验证函数
export interface ApiCheck {
  id: number | null | string;
  apiName: string;
  apiSource: string;
  apiType: string;
  apiProtocol: number | null; // 接口协议(0:http 1:https)
  apiMethod: number | null; // 请求方式请求方式(0:get 1:post)
  apiIpPort: string;

  apiPath: string;

  apiTimeout: number | null;
  apiDescription?: string;
  checkOperation: number | null;
}
