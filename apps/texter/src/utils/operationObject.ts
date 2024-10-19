/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-03-28 21:31:37
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-10-19 12:05:18
 * @FilePath: /saleswork-admin/src/utils/getValueByKey.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 获取对象中指定key的值
 * @param obj 对象
 * @param key 对象中的key
 */
export const getValueByKey = (obj: Record<string, any>, key: string): any => {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }
  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      const result = getValueByKey(obj[prop], key);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return undefined;
};

/**替换对象中指定key的值,返回新对象 */
export const replaceValueByKey = (
  obj: Record<string, any>,
  key: string,
  value: any
): Record<string, any> => {
  if (!obj) return obj;

  // 处理当前对象如果具有指定的键
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return {
      ...obj,
      [key]: value,
    };
  }

  const result: Record<string, any> = Array.isArray(obj) ? [] : {};

  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        result[prop] = replaceValueByKey(obj[prop], key, value);
      } else {
        result[prop] = obj[prop];
      }
    }
  }

  return result;
};
