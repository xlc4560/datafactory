// 搜索数据类型
export interface FormState {
  standardSourceOrganization: string | null; //来源机构分类编码
  standardCode: string; //标准编号
  standardCnName: string; //中文名称
  standardEnName: string; //英文名称
  standardState: string | null; //标准状态
}
// 表格数据类型
export interface DataItem {
  key: string;
  standardCode: string; //标准编号
  standardCnName: string; //中文名称
  standardEnName: string; //英文名称
  standardType: string; //数据类型
  standardState: number; //标准状态
  updateTime: string; //更新时间
}
// 状态
export enum state {
  '未发布' = 0,
  '已发布' = 1,
  '已停用' = 2,
}
// 数据类型
export enum type {
  // 0：int，1：enum，2：float，3：String
  'int' = 0,
  'enum' = 1,
  'float' = 2,
  'String' = 3,
}
///////////////////////////////////////
// 新增标准
export interface FormStateAdd {
  codeId?: string | null; //码表编号
  codeName?: string; //码表名称
  standardCode?: string;
  standardCnName: string; //中文名称
  standardDataAccuracy?: number | null; //数据精度
  standardDataLength?: number | null; //数据长度
  standardDefault?: string | null; //默认值
  standardEnName: string; //英文名称
  standardExplain?: string | null; //标准说明
  standardIsBlank: number | null | string; //是否可为空：0不可为空，1可为空
  standardSourceOrganization: string; //来源机构编码
  standardState: number | null | string; //标准状态  0：未发布，1：已发布，2：已停用
  standardType: number | null | string; //数据类型（0：int，1：enum，2：float，3：String）
  standardValueMax?: number | null; //取值范围-最大值
  standardValueMin?: number | null; //取值范围-最小值
}
