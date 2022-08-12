import { defineStore } from 'pinia';
import { FilterDataType } from '@/api/scriptManagement/apiFunArgs';

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
    } as {
      filterData: FilterDataType;
      useRun: () => void;
      currentScriptDetails: any;
    }),
});
export default useScriptManagementStore;
