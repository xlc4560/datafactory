// todo 实现封装一个axios
import api from '@/utils/axios';
import * as resType from '@/api/stopwatch/stopwatchResType';
import * as funArgsType from '@/api/stopwatch/stopwatchFunArgsType';
enum Api {
  CREATE_CATEGORY = '/category/add', // 增加一条分类
  DELETE_CATEGORY = '/category/delete/', // 删除一条分类
  UPDATE_CATEGORY = '/category/update', // 修改一条分类
  READ_CATEGORY_LIST = '/category/list/tree/', // 查询分类列表
}
// export const CreateCategory = ()=>{
//     return api.get
// }
