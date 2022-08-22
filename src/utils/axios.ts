/*
 *   axios二次封装
 */
import { message as antdMessage } from 'ant-design-vue';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
// 创建axios实例
const instance = axios.create({
  // baseURL: '',
  timeout: 10000,
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
    const { code, data, msg } = response.data as { code: number; data: any; msg: string };
    if (code === 100200) {
      if (msg !== '返回成功') {
        antdMessage.success(msg, 1);
      }
    } else {
      antdMessage.error(msg, 1);
      return { code, data, msg };
    }
    return data;
  },
  error => {
    switch (error?.code) {
      case 'ECONNABORTED':
        antdMessage.error('请求超时', 1);
        break;
      case 'ERR_BAD_RESPONSE':
        antdMessage.error(error.message, 1);
        break;
      case 'ERR_BAD_REQUEST':
        antdMessage.error('路径错误', 1);
        break;
    }
    return Promise.reject(error as any);
  },
);

export function get<T>({ url, params }: { url: string; params?: AxiosRequestConfig<any> }): Promise<T> {
  return instance.get(url, params);
}
export function post<T>({ url, data, config }: { url: string; data?: any; config?: AxiosRequestConfig<any> }): Promise<T> {
  return instance.post(url, data, config);
}
// 箭头函数写法
export const put: <T>({ url, data, config }: { url: string; data?: any; config?: AxiosRequestConfig<any> }) => Promise<T> = ({ url, data, config }) => {
  return instance.put(url, data, config);
};
export const _delete: <T>({ url, data, config }: { url: string; data?: any; config?: AxiosRequestConfig<any> }) => Promise<T> = ({ url, config }) => {
  return instance.delete(url, config);
};
export default { get, post, put, _delete };
