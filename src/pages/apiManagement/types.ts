// 常用类型
interface FormState {
  apiSource: string | null;
  apiState: number | null;
  apiName: string | null;

  //码表
  code_state: number | null;
  code_name: string | null;
}
type APIParams = {
  results: number;
  page?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};
type APIResult = {
  results: {
    gender: 'female' | 'male';
    name: string;
    email: string;
  }[];
};
type Key = string | number;
// 接口参数的类型
export interface apiParameter {
  id?: number | string | null;
  parameterApiId?: number | null;
  parameterName?: string;
  parameterType?: number | null | string;
  parameterRequire?: number | null | string; //是否必须 (0:非必填 1:必填)
  parameterPosition?: number | null | string; //参数位置(0:query 1:header 3:body)
  parameterDescription?: string;
  parameterDefault?: string;
  parameterUseValue?: string;
}
// 接口来源
interface apiSource {
  value: string;
}
// 接口状态(用于标识select框数据类型)
// interface apiState {
//   value: number;
//   lable: string;
// }
// 用于标识需要渲染到表格中的数据的类型
interface dataSource {
  apiId: string;
  apiName: string;
  apiDesc: string;
  apiClassify?: string;
  apiSource: string;
  apiState: number;
  updateTime: string;

  //码表
  code_id: string;
  code_name: string;
  code_description: string;
  code_state: number;
  update_time: string;
}
export type { FormState, APIParams, APIResult, Key, apiSource, dataSource };
