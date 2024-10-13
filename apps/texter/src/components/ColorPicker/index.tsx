/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-08-24 22:29:10
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-08-30 10:45:30
 * @FilePath: /texter/apps/texter/src/components/ColorPicker/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { FC, useState } from 'react';

interface Props {
  children: React.ReactNode;
}
const ColorPicker: FC<Props> = ({ ...props }) => {
  const { children } = props;
  const [show, showSet] = useState(false);
  const handleShow = () => {
    showSet(!show);
  };
  return (
    <div>
      <div className="cursor-pointer" onClick={handleShow}>
        {children}
      </div>
      {show && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 bg-black opacity-50"
          onClick={handleShow}
        >
          <div className="absolute z-2">test</div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
