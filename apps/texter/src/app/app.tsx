/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-08-22 21:47:11
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-08-24 18:09:14
 * @FilePath: /texter/apps/texter/src/app/app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createTonalPalette } from '../utils/generateColors';
import { toggleTheme } from '../utils/toggleTheme';

export function App() {
  /**色彩梯度*/
  const redColorArr = createTonalPalette('#ff0000');
  const greenColorArr = createTonalPalette('#00ff00');
  const blueColorArr = createTonalPalette('#0000ff');
  const greyColorArr = createTonalPalette('#808080');
  const renderColors = (colorArr: string[]) => {
    return colorArr.map((color, index) => (
      <div
        className="w-100px h-40px bg-gray-200 cursor-pointer"
        style={{ background: color }}
        key={index}
      >
        {color}
      </div>
    ));
  };
  return (
    <div className="bg-gray-100 size-full min-h-100vh">
      <div className="float-right cursor-pointer p-4">
        <div
          className="dark:i-carbon-moon i-carbon-sun p-3"
          onClick={toggleTheme}
        />
      </div>
      <div className="i-icon-park:plus?mask text-green size-1" />
      <div className="flex-normal-nowrap gap-16px">
        <div>{renderColors(redColorArr)}</div>
        <div>{renderColors(greenColorArr)}</div>
        <div>{renderColors(blueColorArr)}</div>
        <div>{renderColors(greyColorArr)}</div>
      </div>
      <div className="i-vscode-icons:file-type-light-pnpm" />
      <div className="i-vscode-icons:file-type-light-pnpm?mask text-red-300" />
      <div className="size-20 flex-center bg-green rd-4px shadow animated animated-(~ fade-in-up infinite slow)">
        Demo
      </div>
    </div>
  );
}

export default App;
