export type Key = string | number;
export interface StopwatchFiltersType {
  codeState: number | null | undefined;
  codeName: string | null | undefined;
}

// 详情组件中使用的类型
export interface stopwatchDetailsType {
  codeConfigs?: {
    id: number;
    codeId: string;
    codeConfigName: string;
    codeConfigValue: string;
    codeConfigDescription: string;
  }[];
  codeId?: string;
  codeName?: string;
}
