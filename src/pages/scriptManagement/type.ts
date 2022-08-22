import { scriptInfoListType } from '@/api/scriptManagement/apiReturnType';
export interface ModalControlDataType {
  scriptDetailsDrawer: boolean;
  scriptTestDrawer: boolean;
  scriptEditDrawer: boolean;
  [key: string]: boolean;
}
export interface ScriptParameterType {
  parameterName: string;
  parameterRequire?: number;
  parameterType: number;
  parameterValue: string | null;
}
