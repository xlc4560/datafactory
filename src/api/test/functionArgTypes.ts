// 函数GetApiList（请求接口列表）的参数类型
export interface GetApiListArgs {
  apiSource?: string;
  apiState?: number;
  apiName?: string;
  // 时间排序
  pageSize?: number;
  pageNum: number;
  order: 0 | 1;
}
