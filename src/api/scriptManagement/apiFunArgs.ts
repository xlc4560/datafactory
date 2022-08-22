// 数据筛选
export interface FilterDataType {
  scriptState?: number; // 脚本状态 0：未发布，1：已发布，2：已停用
  scriptName?: string;
  page?: number;
  size?: number;
  orderByDate?: number; // 时间排序true：降序(默认)，false：升序
  scriptCategory?: string;
  scriptType?: number;
}
// 脚本测试
export interface scriptTestType {
  id: number;
  parameterList?: {
    parameterName: string;
    parameterValue: string;
  }[];
}
// 脚本状态修改
export interface UpdateStateType {
  idList: number[];
  operation: number;
}
// 脚本分类修改
export interface UpdateCategoryType {
  ids: number[];
  categoryCode: string;
}

export interface InputParamsType {
  parameterName: string;
  parameterType: number; // 0:String 1:Integer 2:number
  parameterRequire: number; // 0:非必填 1:必填
  parameterDescription: string;
}
export interface OutputParamsType {
  parameterName: string;
  parameterType: number; // 0:String 1:Integer 2:number
  parameterRequire: number; // 0:非必填 1:必填
  parameterDescription: string;
}
// 新增脚本
export interface AddScriptType {
  scriptName: string;
  sourceCode: number;
  scriptCategory: string;
  scriptType: number; //脚本类型0:python 1:mysql
  scriptClass: string;
  scriptFunction: string;
  scriptDescription: string;
  inputParameter: InputParamsType[];
  outputParameter: OutputParamsType[];
}
