import {
  argbFromHex,
  hexFromArgb,
  TonalPalette,
} from '@material/material-color-utilities';

// 定义 tone 梯度
const TONE_ARR = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 94, 97, 100];
export const createTonalPalette = (hex: string) => {
  // 将 hex 格式颜色转化为 argb 格式
  const argb = argbFromHex(hex);
  // 创建 palette
  const palette = TonalPalette.fromInt(argb);
  // 在 palette 上取一组 tone 梯度对应的颜色数组
  const colorArr = TONE_ARR.map((t) => hexFromArgb(palette.tone(t)));
  return colorArr;
};
