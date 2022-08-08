//新增数据源参数类型
export interface addDataSource {
  id?: number;
  dataSourceType: string; //数据库类型
  dataSourceName: string; //数据源名称
  dataSourceUrl: string; //连接地址
  dataSourceDriverClassName: string; //驱动类名
  dataSourceConnectParameter: string; //连接参数
  dataSourceUsername: string; //用户名
  dataSourcePassword: string; //密码
  dataSourceDescription: string; //数据源描述
}

//编辑数据源
export interface editDataSource {
  id?: number;
  dataSourceType: string; //数据库类型
  dataSourceName: string; //数据源名称
  dataSourceUrl: string; //连接地址
  dataSourceDriverClassName: string; //驱动类名
  dataSourceConnectParameter: string; //连接参数
  dataSourceUsername: string; //用户名
  dataSourcePassword: string; //密码
  dataSourceDescription: string; //数据源描述
}

//数据源连接测试
export interface connectTest {
  dataSourceDriverClassName: string; //驱动类名
  dataSourcePassword: string; //密码
  dataSourceUrl: string; //URL
  dataSourceUsername: string; //用户名
}

//数据源详情
export interface detailDatasource {
  id: number; //id
}
