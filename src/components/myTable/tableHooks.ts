import type { inputParameterDataType } from '@/pages/apiRegisterAndUpdate/dataType';

export const generateFlatArr = (data: inputParameterDataType[], flatArr: inputParameterDataType[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    flatArr.push(node);
    if (node.children) {
      generateFlatArr(node.children, flatArr);
    }
  }
};
