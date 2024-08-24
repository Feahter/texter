/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-08-22 21:47:11
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-08-24 15:56:32
 * @FilePath: /texter/apps/texter/src/app/app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { toggleTheme } from '../utils/toggleTheme';

export function App() {
  return (
    <div className="bg-gray-100 size-full min-h-100vh">
      <div className="float-right cursor-pointer p-4">
        <div
          className="dark:i-carbon-moon i-carbon-sun p-3"
          onClick={toggleTheme}
        />
      </div>
      <h1 className="text-3xl font-bold c-red flex-normal-nowrap"> </h1>
      <div className="i-vscode-icons:file-type-light-pnpm" />
      <div className="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
      <div className="i-icon-park:plus?mask text-green size-1" />
      <div className="size-20 flex-center bg-green rd-4px shadow animated animated-(~ fade-in-up infinite slow)">
        Demo
      </div>
    </div>
  );
}

export default App;
