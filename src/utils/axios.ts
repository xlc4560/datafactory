/*
 *   axios二次封装
 */
import { message as antdMessage } from 'ant-design-vue';
import axios from 'axios';
// 创建axios实例
const instance = axios.create({
  baseURL: '/getApiInfo',
  timeout: 1000,
});
// 请求拦截
instance.interceptors.request.use(
  // 在请求发出前作出相应修改，如：添加token、配置请求头等；
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      //  这里面获取的请求头的键(tokenHeader)根据每个后端的习惯封装的名称各不相同
      // config.headers.common['tokenHeader'] as string = token;
    }
    // console.log(config);
    return config;
  },
  // 使用Promise.reject返回请求错误信息
  error => {
    return Promise.reject(error);
  },
);
// 响应拦截
instance.interceptors.response.use(
  // 对响应内容做相应的逻辑处理，如：筛选、过滤等
  response => {
    const { code, data, message } = response.data as { code: number; data: any; message: string };
    switch (code) {
      case 23:
        antdMessage.success(message, 1);
        break;

      default:
        break;
    }
    return data;
  },
  error => {
    switch (error?.code) {
      case 'ECONNABORTED':
        antdMessage.error('请求超时', 1);
        break;
    }
    return Promise.reject(error);
  },
);

export function get<T>({ url, params }: { url: string; params?: object }): Promise<T> {
  return instance.get(url, params);
}
export function post<T>({ url, data, config }: { url: string; data?: any; config?: object }): Promise<T> {
  return instance.post(url, data, config);
}

export default { get, post };
