/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2023-03-24 11:31:11
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-08-23 22:39:08
 * @FilePath: /gaker-editor/shortcuts.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**固定短语键值对*/
const codeSnippet: Record<string, string> = {
  'flex-center': 'flex items-center justify-center',
  'flex-between': 'flex items-center justify-between',
  'flex-box': 'flex-center flex-row',
  'flex-box-wrap': 'flex-box flex-wrap',
  'flex-box-nowrap': 'flex-box flex-nowrap',
  'flex-normal': 'flex items-start justify-start',
  'flex-normal-wrap': 'flex-normal flex-wrap',
  'flex-normal-nowrap': 'flex-normal flex-nowrap',
  btn: 'py-2 px-4 font-semibold rounded-4px text-center shadow-md',
  'btn-primary': 'btn bg-primary',
  'top-line': 'border-t-1px border-t-solid border-g-grey-2',
  'bottom-line': 'border-b-1px border-b-solid border-g-grey-2',
  'rd-c': 'rd-9999px',
  'icon-normal':
    'flex-normal cursor-pointer c-g-grey-4 lh-[1] hover:c-g-grey-6',
  'flex-x-center': 'flex items-center justify-start',
  'flex-y-center': 'flex items-start justify-center',
  'border-normal':
    'w-full rd-4px b-g-grey-3 b-1px b-solid p-8px hover:b-g-primary focus:b-g-primary',
  'sticky-top': 'sticky top-0 z-10 bg-white',
};
/**转化导出*/
export const shortcuts = codeSnippet;

export default shortcuts;
