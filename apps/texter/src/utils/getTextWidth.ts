/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-10-13 17:45:09
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-10-13 17:51:47
 * @FilePath: /texter/apps/texter/src/utils/getTextWidth.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const tCanvas = document.createElement('canvas');
const context = tCanvas.getContext('2d');
const defaultFont = window.getComputedStyle(document.body).fontFamily;
/**测量给定文本在特定字体下的宽度*/
export const getTextWidth = (text: string, font = defaultFont): number => {
  if (!context) {
    throw new Error('Canvas context is not supported in this environment.');
  }
  if (context) {
    context.font = font;
    return context.measureText(text).width;
  }
  return 0;
};
