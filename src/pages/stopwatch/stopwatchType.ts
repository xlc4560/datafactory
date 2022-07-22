import { Ref } from 'vue';
export type Key = string | number;
export interface StopwatchFiltersType {
  codeState: number | null | undefined;
  codeName: string | null | undefined;
}

// 详情组件中使用的类型
export interface stopwatchDetailsType {
  codeConfig?: {
    id?: number;
    codeId?: string;
    codeConfigName: string;
    codeConfigValue: string;
    codeConfigDescription: string;
  }[];
  codeId?: string;
  codeName?: string;
}
// 编辑、新增组件中使用
export interface FormState {
  codeId?: string;
  codeName: string;
  codeDescription: string | null | undefined;
  codeState?: number;
  codeConfig: Ref<
    {
      codeConfigName: string;
      codeConfigValue: string;
      codeConfigDescription: string | null | undefined;
    }[]
  >;
}
