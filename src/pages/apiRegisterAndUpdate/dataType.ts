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
}
export interface inputParameterDataType {
  parameterName: string;
  parameterPosition: number | null;
  parameterType: number | null;
  parameterRequire: number | null;
  parameterDefault?: string;
  parameterDescription?: string;
  parameterId: string;
  isEdit: boolean;
  parameterIdParentId?: string | null;
  children?: inputParameterDataType[];
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
  apiTimeout: string;
}
export interface apiParameterType {
  parameterName: string;
  parameterPosition: number;
  parameterType: number;
  parameterRequire: number;
  parameterDefault?: string;
  parameterDescription?: string;
}
export interface apiInfoType {
  apiBasic: apiBasicType;
  parameters: apiParameterType[];
  responseBody: { parameterName: string; parameterType: number; parameterDescription?: string }[];
}
