export interface test {
  test: string;
}
export interface TreeDataResType {
  categoryCode: string;
  parentId: string;
  name: string;
  icon?: null | string;
  information?: null | string;
  categorySchema?: null | string;
  children?: TreeDataResType[];
}
