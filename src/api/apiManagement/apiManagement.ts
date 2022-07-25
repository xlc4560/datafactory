import api from '@/utils/axios';
import * as resType from './resType';
import * as funType from './functionArgTypes';
enum Api {
  ACCOUNT_INFO = '/account/getAccountInfo',
  SESSION_TIMEOUT = '/user/sessionTimeout',
  TOKEN_EXPIRED = '/user/tokenExpired',
  GET_TEST = '/getTest/api/QueryApiDetails/1', // 测试url
  GET_WTH = '/weather/weather_mini?city=%E9%87%8D%E5%BA%86', // 获取天气数据(仅测试)

  GET_API_LIST = '/api/list', //获取列表数据http://192.168.78.100:8081
  GET_API_DETAILS = '/api/detail/{id}', //获取接口详情
  API_STATE_UPDATE = '/api/revise', //修改接口状态
  DELETE_API = '/api/apiList/delete/', // 删除接口api
  UPDATE_API = '/api/apiList/apiEdit/', // 编辑接口信息
  REGISTER_API = '/api/registerApi/save', // 新增接口
  API_TEST = '/api/apiList/apiTest', // 接口测试
  API_CHECK = '/api/registerApi/check', // 信息校验
}
