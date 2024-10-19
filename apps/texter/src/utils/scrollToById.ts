/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-10-13 18:11:38
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-10-13 18:11:41
 * @FilePath: /texter/apps/texter/src/utils/scrollToById.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** 根据id滚动 */
export const scrollToById = (id: string) => {
  const dom = document.getElementById(id);
  if (dom) {
    dom.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};
