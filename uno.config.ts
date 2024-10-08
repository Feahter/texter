/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2023-03-22 22:00:35
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-08-24 15:55:02
 * @FilePath: /gaker-editor/unocss.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// https://unocss.dev/
// https://unocss-preset-extra.moomfe.com/
import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetMini,
  presetIcons,
} from 'unocss';
import { presetExtra } from 'unocss-preset-extra';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { shortcuts } from './shortcuts';

const config = defineConfig({
  envMode: false ? 'dev' : 'build', //todo
  presets: [
    presetAttributify(),
    presetUno(),
    presetMini(),
    presetExtra(),
    presetIcons(),
  ],
  transformers: [transformerVariantGroup()],
  /**https://github.com/unocss/unocss/tree/main/packages/autocomplete*/
  rules: [
    // 多行文本超出部分省略号 ellipsis-n (已内置 line-clamp-n)
    [
      /^ellipsis-(\d+)$/,
      ([, l]) => {
        if (~~l === 1) {
          return {
            overflow: 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
          };
        }
        return {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': l,
        };
      },
    ],
    //  隐藏滚动条
    [
      /^hide-scroll-bar$/,
      () => {
        return [
          {
            '-ms-overflow-style': 'none' /* IE and Edge */,
            'scrollbar-width': 'none' /* Firefox */,
          },
          `.hide-scroll-bar::-webkit-scrollbar {display: none;}` /* Chrome, Safari and Opera */,
        ];
      },
    ],
  ],
  shortcuts: [shortcuts],
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      text: 'rgba(0, 0, 0, 0.88)',
      container: '#ffffff',
      border: '#d9d9d9',
    },
    spacing: {
      xxs: '4px',
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    vars: {
      '--color-primary': '#eee',
    },
    breakpoints: {
      xs: '360px',
      sm: '720px',
      md: '1024px',
      lg: '1440px',
      xl: '1600px',
      xxl: '1920px',
    },
  },
});

export default config;
