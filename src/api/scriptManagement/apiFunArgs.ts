export interface FilterDataType {
  scriptState?: number; // 脚本状态 0：未发布，1：已发布，2：已停用
  scriptName?: string;
  page?: number;
  size?: number;
  orderByDate?: number; // 时间排序true：降序(默认)，false：升序
  scriptCategory?: string;
  scriptType?: number;
}
