export interface ArrrToTreeOptions {
  root?: string | number;
  pidKey?: string;
  idKey?: string;
  childKey?: string;
}

export function arrToTree(
  source: Array<object>,
  {
    root = 0,
    pidKey = 'parentId',
    idKey = 'id',
    childKey = 'children',
  }: ArrrToTreeOptions,
) {
  function getNode(id: string | number) {
    const node: Array<object> = [];
    console.log(node, 111, source);
    for (let i = 0, len = source.length; i < len; i++) {
      if (source[i][pidKey] === id) {
        const children = getNode(source[i][idKey]);
        if (children.length > 0) source[i][childKey] = children;
        node.push(source[i]);
      }
    }
    return node;
  }
  return getNode(root)[0];
}

export function treeToArr(array: Array<object>, key: string) {
  const list = [];
  function flatArr(arr: Array<object>) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key]) {
        list.push(Object.assign({}, arr[i], { [key]: [] }));
        flatArr(arr[i][key]);
      } else {
        list.push(arr[i]);
      }
    }
  }
  flatArr(array);
  return list;
}
