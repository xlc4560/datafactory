import useCategoryStore from '@/store/category';
import useApiRegisterAndUpdateStore from '@/store/apiRegisterAndUpdate';
import useScriptManagementStore from '@/store/scriptManagement';
// 统一导出useStore方法,实现不同模块store的模块化管理
export default function useStore() {
  return {
    useCategoryStore: useCategoryStore(),
    useApiRegisterAndUpdateStore: useApiRegisterAndUpdateStore(),
    useScriptManagementStore: useScriptManagementStore(),
  };
}
