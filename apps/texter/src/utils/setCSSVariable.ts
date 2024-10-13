/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-10-08 15:06:53
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-10-13 15:04:34
 * @FilePath: /texter/apps/texter/src/utils/setCssVars.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**设置css变量 */
export const setCSSVariable = (name: string, value: string | null) => {
  document.documentElement.style.setProperty(name, value);
};
/**设置多个css变量 */
export const setMultiVars = (colors: Record<string, string>) => {
  Object.entries(colors).forEach(([key, value]) => {
    setCSSVariable(`--${key}`, value);
  });
};
