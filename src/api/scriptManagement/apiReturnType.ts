interface formItemMessageType {
  help?: string;
  validateStatus?: string;
}
export interface ScriptParameterType {
  [key: string]: any;
  parameterName: string;
  parameterRequire?: number;
  parameterType: number;
  parameterValue: string | null;
  isEdit?: boolean;
  formItemMessage?: {
    parameterName: formItemMessageType;
    parameterRequire: formItemMessageType;
    parameterType: formItemMessageType;
    [key: string]: any;
  };
}
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
  scriptCategoryName?: string;
  scriptState?: number;
  scriptType?: number;
  inputParameter?: ScriptParameterType[];
  outputParameter?: ScriptParameterType[];
  sourceCode?: number | null;
  operatorCode?: null;
  isDelete?: number;
  createTime?: string;
  updateTime?: string;
  fileList?: File[];
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
