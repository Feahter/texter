/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-08-22 21:47:11
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-08-24 14:43:56
 * @FilePath: /texter/apps/texter/src/main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import '@unocss/reset/tailwind.css';
import 'virtual:uno.css';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
