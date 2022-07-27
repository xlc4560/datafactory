export type Key = {
  arr: [];
  str: string;
};
export interface TreeDataType {
  categoryCode: string;
  parentId: string;
  name: string;
  icon?: null | string;
  information?: null | string;
  categorySchema?: null | string;
  children?: TreeDataType[];
}
