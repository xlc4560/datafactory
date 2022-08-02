export interface ApifoxModal {
  /**
   * 响应码
   */
  code: number;
  /**
   * 数据
   */
  data?: string;
  /**
   * 提示信息
   */
  message: string;
}

/**
 * 数据
 */
export interface Page {
  /**
   * 数据
   */
  list: [];
  /**
   * 总条数
   */
  total: number;
  /**
   * 总页数
   */
  totalPage: string;
}

/**
 * 数据源
 */
export interface dataSource {
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 链接参数
   */
  dataSourceConnectParameter?: string;
  /**
   * 逻辑删除，0删除，1未删除，默认为1
   */
  dataSourceDeleted: number;
  /**
   * 数据源描述
   */
  dataSourceDescription?: string;
  /**
   * 驱动类名
   */
  dataSourceDriverClassName: string;
  /**
   * 数据源名称
   */
  dataSourceName: string;
  /**
   * 密码
   */
  dataSourcePassword: string;
  /**
   * 编码
   */
  dataSourceSncoding: string;
  /**
   * 数据源来源
   */
  dataSourceSource: string;
  /**
   * 数据源描述，0：未发布 1：已发布 2：已停用
   */
  dataSourceState: number;
  /**
   * 数据源类型，（如MySql）
   */
  dataSourceType: string;
  /**
   * 链接地址
   */
  dataSourceUrl: string;
  /**
   * 用户名
   */
  dataSourceUsername: string;
  /**
   * 数据源ID
   */
  id: number;
  /**
   * 更新时间
   */
  updateTime: string;
}

// 数据库列表
export interface GETDBList {
  updateTime?: string; //更新时间
  dataSourceUrl?: string; //连接信息
  dataSourceType?: string; //数据源类型
  dataSourceState?: string; //0:已停用 1:草稿 2:未发布 3:已发布
  dataSourceName?: string; //数据源名称
  oderByDate?: number; //0：降序（默认） 1：升序
  page?: number; //页码
  size?: number; //每页显示条数
}

//应用状态修改
export interface GetDBRevise {
  id: number;
  dataSourceState: number;
}

export interface GetDBListModel {
  [x: string]: number;
  current: number;
  size: number;
  total: number;
}

//连接测试
export interface GetDBTest {
  dataSourceDriverClassName: string; //驱动类名
  dataSourcePassword: string; //密码
  dataSourceUrl: string; //URL
  dataSourceUsername: string; //用户名
}

export interface GETDBDetail {
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 链接参数
   */
  dataSourceConnectParameter?: string;
  /**
   * 数据源描述
   */
  dataSourceDescription?: string;
  /**
   * 驱动类名
   */
  dataSourceDriverClassName: string;
  /**
   * 编码，默认值UTF-8
   */
  dataSourceEncoding?: string;
  /**
   * 数据源名称
   */
  dataSourceName: string;
  /**
   * 密码
   */
  dataSourcePassword: string;
  /**
   * 数据源描述，0：未发布 1：已发布 2：已停用
   */
  dataSourceState: number;
  /**
   * 数据源类型，（如MySql）
   */
  dataSourceType: string;
  /**
   * 链接地址
   */
  dataSourceUrl: string;
  /**
   * 用户名
   */
  dataSourceUsername: string;
  /**
   * 数据源ID
   */
  id: number;
  /**
   * 逻辑删除，0删除，1未删除，默认为1
   */
  isDelete: number;
  /**
   * 数据源来源
   */
  sourceOrigin: string;
  /**
   * 更新时间
   */
  updateTime: string;
}
