import { TreeItem } from 'src/types/nodes.type';

export function findNestedObj(entireObj, keyToFind, valToFind): TreeItem | null {
  let foundObj: TreeItem | null = null;
  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = nestedValue;
    }
    return nestedValue;
  });
  return foundObj;
}