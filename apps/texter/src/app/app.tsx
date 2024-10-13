/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-08-22 21:47:11
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-10-13 15:55:28
 * @FilePath: /texter/apps/texter/src/app/app.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  createMixinTonalPalette,
  createTonalPalette,
} from '../utils/generateColors';
import { toggleTheme } from '../utils/toggleTheme';
import ColorPicker from '../components/ColorPicker';
import { useDBInstance } from '../utils/DB';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { setMultiVars } from '../utils/setCSSVariable';
import IndexedDBStorage from '../utils/myDB';
export function App() {
  /**色彩梯度*/
  const redColorArr = createTonalPalette('#ff0000');
  const greenColorArr = createTonalPalette('#00ff00');
  const blueColorArr = createTonalPalette('#0000ff');
  const greyColorArr = createTonalPalette('#808080');
  const redColorArr2 = createMixinTonalPalette('#ff0000', '#808080');
  const greenColorArr2 = createMixinTonalPalette('#00ff00', '#00ff00');
  const blueColorArr2 = createMixinTonalPalette('#0000ff', '#0000ff');
  const DB = useMemo(() => new IndexedDBStorage('texter', 'config'), []);
  const defaultConfig = {
    'color-primary': 'blue',
  }
  const init = useCallback(async () => {
    if (DB) {
      const res = await DB.getItem('colors');
      console.log('getItem success: ', res);
      setMultiVars(res);
    }
  }, [DB]);

  useEffect(() => {
    init();
  }, [init]);
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
      <div className="flex-normal-nowrap gap-16px p-md">
        <div>{renderColors(redColorArr)}</div>
        <div>{renderColors(greenColorArr)}</div>
        <div>{renderColors(blueColorArr)}</div>
        <div>{renderColors(greyColorArr)}</div>
      </div>
      <div className="flex-normal-nowrap gap-16px p-md">
        <div>{renderColors(redColorArr2)}</div>
        <div>{renderColors(greenColorArr2)}</div>
        <div>{renderColors(blueColorArr2)}</div>
      </div>
      <div>
        <ColorPicker>
          <div className="btn c-primary">Picker</div>
        </ColorPicker>
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
