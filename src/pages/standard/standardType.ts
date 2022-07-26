export interface FormState {
  snumber: string; //标准编号
  cname: string; //中文名称
  ename: string; //英文名称
  sstate: string | null; //标准状态
}

export interface DataItem {
  id: string; //标准编号
  cname: string; //中文名称
  ename: string; //英文名称
  type: string; //数据类型
  sstate: number; //标准状态
  updateTime: string; //更新时间
}
