import { storeToRefs } from 'pinia';
import useStore from '@/store';
const { useScriptManagementStore, useCategoryStore } = useStore();
export const { currentScriptDetails, filterData, useRun, registerAndEditTitle } = storeToRefs(useScriptManagementStore);
export const { fiterCategoryName } = storeToRefs(useCategoryStore);
export const jsonDataParse = (dataName: string): [] | null => {
  if (currentScriptDetails.value[dataName]) {
    return JSON.parse(currentScriptDetails.value[dataName] as string);
  } else {
    return null;
  }
};
