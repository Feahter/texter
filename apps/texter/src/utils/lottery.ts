export const lottery=(total=35, n=7)=> {
if (n > total) throw new Error('抽取数量不能超过总数');
if (n <= 0 || total <= 0) throw new Error('参数必须为正整数');
  // 生成 1-total 的数组
  const numbers = Array.from({ length: total }, (_, i) => i + 1);
  // Fisher-Yates 洗牌算法随机排序
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  // 取前n个并升序排列
  return numbers.slice(0, n).sort((a, b) => a - b);
}

// 使用示例
console.log("本期号码：", lottery());
// 输出示例：本期号码： [5, 12, 18, 22, 27, 30, 34]
