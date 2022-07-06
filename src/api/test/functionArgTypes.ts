// 函数GetApiList（请求接口列表）的参数类型
export interface GetApiListArgs {
  page: number;
  params: { apiSource: string; apiState: number; apiName: string; updateTimeOrder: boolean; pageSize: string };
}
