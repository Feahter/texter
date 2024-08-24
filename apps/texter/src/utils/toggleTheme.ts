/*
 * @Author: Arthur arthur@lwork.com
 * @Date: 2024-08-24 14:22:12
 * @LastEditors: Arthur arthur@lwork.com
 * @LastEditTime: 2024-08-24 15:17:38
 * @FilePath: /texter/apps/texter/src/utils/themeViewTansition.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const toggleTheme = (
  event: { clientX: number; clientY: number },
  config?: {
    isDark: boolean;
    duration: number;
    easing: string;
  }
) => {
  const { clientX: x, clientY: y } = event;
  const { duration = 400 } = config || {};
  let { isDark = false, easing = 'ease-in' } = config || {};
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = document.startViewTransition(() => {
    const root = document.documentElement;
    isDark = root.classList.contains('dark');
    if (isDark) {
      easing = 'ease-out';
    }
    root.classList.remove(isDark ? 'dark' : 'light');
    root.classList.add(isDark ? 'light' : 'dark');
  });
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration,
        easing,
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      }
    );
  });
};
