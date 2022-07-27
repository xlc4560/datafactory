// todo 实现封装一个axios
import api from '@/utils/axios';
import * as funArgsType from './functionArgTypes';
import * as resDataType from './responseTypes';
enum Api {
  CREATE_CATEGORY = '/category/add', // 增加一条分类
  DELETE_CATEGORY = '/category/delete/', // 删除一条分类
  UPDATE_CATEGORY = '/category/update', // 修改一条分类
  READ_CATEGORY_LIST = '/category/list/tree/', // 查询分类列表
}
export const CreateCategory = (data: funArgsType.CreateAndUpdateCategoryArgType) => {
  return api.post<any>({ url: Api.CREATE_CATEGORY, data });
};
export const DeleteCategory = (categoryCode: string) => api._delete({ url: `${Api.DELETE_CATEGORY}${categoryCode}` });

export const ReadCategory = (categorySchema: string) => api.get<resDataType.TreeDataResType[]>({ url: `${Api.READ_CATEGORY_LIST}${categorySchema}` });

export const UpdateCategory = (data: funArgsType.CreateAndUpdateCategoryArgType) => {
  return api.put({ url: Api.UPDATE_CATEGORY, data });
};
