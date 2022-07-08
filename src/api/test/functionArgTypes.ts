// 函数GetApiList（请求接口列表）的参数类型
export interface GetApiListArgs {
  apiSource?: string;
  apiState?: number;
  apiName?: string;
  // 时间排序
  order?: 0 | 1;
  pageSize?: string;
  pageNum: number;
}
