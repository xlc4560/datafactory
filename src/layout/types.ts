/*
 *   自定义数据类型
 *  */
type menuType = {
  subName: string;
  key: string;
  icon?: string;
  children?: {
    subName: string;
    key: string;
    icon?: string;
  }[];
};
type myType = {
  item: object;
  key: number;
  keyPath: string;
  [propName: string]: any;
};
export type { menuType, myType };
