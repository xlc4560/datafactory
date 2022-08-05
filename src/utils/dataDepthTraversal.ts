// 获取树形结构中指定参数的值
export function generateKeyList<T>(data: any[], key: T): T[] {
  const keyList: T[] = [];
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    keyList.push(node[key]);
    if (node.children) {
      generateKeyList(node.children, key);
    }
  }
  return keyList;
}
