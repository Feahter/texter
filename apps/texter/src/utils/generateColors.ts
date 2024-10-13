import {
  argbFromHex,
  Blend,
  Hct,
  hexFromArgb,
  TonalPalette,
} from '@material/material-color-utilities';

/**定义冥度数组*/
const TONE_ARR = [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 94, 97, 100];
/**生成色彩梯度*/
export const createTonalPalette = (hex: string) => {
  // 将 hex 格式颜色转化为 argb 格式
  const argb = argbFromHex(hex);
  // 创建 palette
  const palette = TonalPalette.fromInt(argb);
  // 在 palette 上取一组 tone 梯度对应的颜色数组
  const colorArr = TONE_ARR.map((t) => hexFromArgb(palette.tone(t)));
  return colorArr;
};

/**生产混合色彩梯度*/
export const createMixinTonalPalette = (
  color: string,
  mixinColor?: string,
  isVariant?: boolean
) => {
  // 判断是否需要对颜色做 harmonize 处理
  const argb = mixinColor
    ? Blend.harmonize(argbFromHex(color), argbFromHex(mixinColor))
    : argbFromHex(color);

  // 将颜色转为 hct 格式
  const hct = Hct.fromInt(argb);

  // 创建 palette，其实从 fromHueAndChroma 方法可以窥探到 tonal palette 生成逻辑
  const palette = TonalPalette.fromHueAndChroma(
    hct.hue,
    isVariant ? Math.min(hct.chroma / 6, 8) : hct.chroma
  );

  // 在 palette 上取一组 tone 梯度对应的颜色数组
  const colorArr = TONE_ARR.map((t) => hexFromArgb(palette.tone(t)));
  // 生成 Figma tokens 插件可用的数据对象
  //   const tokensObj = Object.fromEntries(
  //     TONE_ARR.map((t, i) => [t, { value: colorArr[i], type: 'color' }])
  //   );

  return colorArr;
};
