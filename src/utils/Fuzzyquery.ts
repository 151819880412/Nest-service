import { ILike } from 'typeorm';

// export const fuzzyquery = (obj: T) => {
export function fuzzyquery<T>(obj: T) {
  const data = { delFlag: 0 };
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] == 'number') {
      data[item] = obj[item];
    } else {
      data[item] = ILike(`%${obj[item]}%`);
    }
  });
  return data;
}
