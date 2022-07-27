// 搜索数据类型
export interface FormState {
  snumber: string; //标准编号
  cname: string; //中文名称
  ename: string; //英文名称
  sstate: string | null; //标准状态
}
// 表格数据类型
export interface DataItem {
  key: string;
  id: string; //标准编号
  cname: string; //中文名称
  ename: string; //英文名称
  type: string; //数据类型
  sstate: number; //标准状态
  updateTime: string; //更新时间
}
// 状态
export enum state {
  '未发布' = 1,
  '已发布' = 2,
  '已停用' = 3,
}
///////////////////////////////////////
// 新增标准
export interface FormStateAdd {
  cname: string; //中文名称
  ename: string; //英文名称
  specification: string; //标准说明
  Source: string; //来源机构
  iskong: string; //是否可为空
  type: string; //数据类型
  typeInt?: {
    min: number;
    max: number;
    defult: number;
  };
  typeEnum?: {
    scope: string;
    defult: number;
  };
  typeFloat?: {
    min: number;
    max: number;
    defult: number;
  };
  typeString?: {
    long: number;
    defult: string;
  };
}
