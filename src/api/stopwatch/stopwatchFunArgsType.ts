// 获取码表列表参数类型
export interface GetStopwatchList {
  page: number; // 页码
  size: number; // 每页条数
  codeState?: number | null | undefined; // 码表状态
  codeName?: string | null | undefined; // 码表名称
  orderBy?: number | null | undefined; // 时间排序
}

// 新增码表参数类型
export interface AddStopwatch {
  codeId?: string;
  codeName: string;
  codeDescription: string | null | undefined;
  codeState?: number;
  codeConfig: {
    codeConfigName: string;
    codeConfigValue: string;
    codeConfigDescription: string | null | undefined;
  }[];
}
// 编辑码表
export interface EditStopwatch {
  codeld?: number;
  codeName: string;
  codeDescription: string | null | undefined;
  codeState?: number;
  codeConfig: {
    codeConfigName: string;
    codeConfigValue: string;
    codeConfigDescription: string | null | undefined;
  }[];
}
// 码表状态修改
export interface UpdateStopwatchState {
  codeId: (string | number)[];
  operation: 0 | 1;
}
