import { defineStore } from 'pinia';
import { FilterDataType } from '@/api/scriptManagement/apiFunArgs';
import { scriptInfoListType } from '@/api/scriptManagement/apiReturnType';
const useScriptManagementStore = defineStore('useScriptManagementStore', {
  state: () =>
    ({
      filterData: {
        scriptName: undefined,
        scriptState: undefined,
        page: 1,
        size: 10,
        oderByDate: undefined,
        scriptCategory: undefined,
        scriptType: undefined,
      },
      useRun: () => ({}),
      currentScriptDetails: {},
      registerAndEditTitle: 0,
    } as {
      filterData: FilterDataType;
      useRun: () => void;
      currentScriptDetails: scriptInfoListType;
      registerAndEditTitle: number;
    }),
});
export default useScriptManagementStore;
