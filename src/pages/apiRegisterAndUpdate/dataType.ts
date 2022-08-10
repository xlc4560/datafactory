export interface columnsType {
  title: string;
  dataIndex: string;
  selectOption?: {
    key: number;
    label: string;
  }[];
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  ellipsis?: boolean;
  sorter?: boolean;
}
export interface codeType {
  [key: string]: any;
  codeDescription?: string;
  codeName?: string;
  codeConfig?: {
    codeId?: string;
    codeConfigDescription?: string;
    codeConfigName?: string;
    codeConfigValue?: string;
    isEdit?: boolean;
  }[];
}

export interface inputParameterDataType {
  [key: string]: any;
  parameterName?: string;
  parameterPosition?: number | null;
  parameterType?: number | null;
  parameterRequire?: number | null;
  parameterDefault?: string;
  parameterDescription?: string;
  id?: string;
  parameterPid?: string;
  isEdit?: boolean;
  parameterIdParentId?: string | null;
  children?: inputParameterDataType[];
  codeId?: string | null;
  code?: codeType;
}
export interface apiBasicType {
  apiType: string | null;
  apiName: string;
  apiSource: string;
  apiDescription?: string;
  apiProtocol: number | null;
  apiIpPort: string;
  apiPath: string;
  apiMethod: number | null;
  apiTimeout: number | null;
  apiState?: number;
}
export interface apiParameterType {
  parameterName: string;
  parameterPosition: number;
  parameterType: number;
  parameterRequire: number;
  parameterDefault?: string;
  parameterDescription?: string;
  id?: string;
  codeId?: string | null;
}
export interface apiInfoType {
  [key: string]: any;
  apiBasic: apiBasicType;
  inputParameters: inputParameterDataType[];
  requestBody: inputParameterDataType[];
  responseBody: inputParameterDataType[];
}
