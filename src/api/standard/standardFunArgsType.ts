// 检索数据标准列表
export interface StandardSearch {
  page: number; //页码
  pageSize: number; //每页的条数
  standardCnName?: string; //中文名
  standardCode?: string; //标准编号
  standardEnName?: string; //英文名
  standardSourceOrganization?: string; //来源机构分类编码
  standardState?: number; //标准状态
  updateTimeOrder?: number; //时间排序 0：降序（默认）1：升序
}
//添加数据标准
export interface StandardAdd {
  codeId?: string; //码表编号
  standardCnName: string; //中文名称
  standardDataAccuracy?: number; //数据精度
  standardDataLength?: number; //数据长度
  standardDefault?: string; //默认值
  standardEnName: string; //英文名称
  standardExplain?: string; //标准说明
  standardIsBlank: number; //是否可为空：0不可为空，1可为空
  standardSourceOrganization: string; //来源机构编码
  standardState: number; //标准状态  0：未发布，1：已发布，2：已停用
  standardType: number; //数据类型（0：int，1：enum，2：float，3：String）
  standardValueMax?: number; //取值范围-最大值
  standardValueMin?: number; //取值范围-最小值
}
// 编辑数据标准
export interface StandardUpdateStandard {
  codeId?: string | null; //码表编码
  standardCnName: string; //中文名
  standardDataAccuracy?: number | null; //数据精度
  standardDataLength?: number | null; //数据长度
  standardDefault: string; //默认值
  standardEnName: string; //英文名
  standardExplain: string; //说明
  standardIsBlank: number | null; //是否为空（0：为空，1：非空）
  standardSourceOrganization: string; //来源机构
  standardState: number | null; //标准状态  0：未发布，1：已发布，2：已停用
  standardType: number | null; //数据类型（0：int，1：enum，2：float，3：String）
  standardValueMax?: number | null; //取值范围最大值
  standardValueMin?: number | null; //取值范围最小值
}

// 数据标准状态修改
export interface StandardRevise {
  operation: number | null;
  /**
   * 标准编号数组
   */
  standardCodeList: string[];
}
