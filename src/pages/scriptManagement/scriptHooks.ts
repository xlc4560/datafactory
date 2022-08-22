import { ScriptParameterType } from '@/api/scriptManagement/apiReturnType';
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
// 参数名规则
const NameReg = /^[a-zA-Z_]([a-zA-Z0-9_]+)?$/;
export const formValidate = (record: ScriptParameterType, dataName: string): boolean => {
  if (dataName !== 'parameterDescription' && record.formItemMessage) {
    if (['', null, undefined].includes(record[dataName])) {
      record.formItemMessage[dataName].validateStatus = 'error';
      record.formItemMessage[dataName].help = '请输入必填项!';
      return false;
    } else if (dataName === 'parameterName') {
      if (!NameReg.test(record.parameterName)) {
        record.formItemMessage.parameterName.validateStatus = 'error';
        record.formItemMessage.parameterName.help = '英文大小写、数字及下划线,且只能英文开头';
        return false;
      } else {
        record.formItemMessage.parameterName.help = undefined;
        record.formItemMessage.parameterName.validateStatus = 'success';
        return true;
      }
    } else {
      record.formItemMessage[dataName].help = undefined;
      record.formItemMessage[dataName].validateStatus = 'success';
      return true;
    }
  }
  return true;
};
