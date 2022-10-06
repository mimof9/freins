/**
 * 圆
 * 圆锥曲线
 * 抛物线
 * 阿基米德螺旋线
 * 星形线
 * 贝塞尔曲线：贝塞尔曲线还可以用来构建 Catmull–Rom 曲线
 * Catmull–Rom 曲线也是一种常用的曲线，它可以平滑折线（样条插值），我们在数据统计图表中经常会用到它
 */

// 根据点来绘制图形
type Point = [number, number];
function draw(
  points: Point[],
  context: CanvasRenderingContext2D,
  { strokeStyle = "black", fillStyle = null, close = false } = {}
) {
  context.strokeStyle = strokeStyle;

  context.beginPath();
  context.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(...points[i]);
  }

  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fill();
  }
  context.stroke();
}

/**
 * 参数方程的高阶函数
 *
 * @param xFunc x坐标的参数方程
 * @param yFunc y坐标的参数方程
 * @returns 参数方程的绘图函数、数据
 */
function parametric(
  xFunc: (...param: any[]) => number,
  yFunc: (...param: any[]) => number
) {
  /**
   *
   * @param start 参数方程中关键参数范围
   * @param end 参数方程中关键参数范围
   * @param segments 采样点个数
   * @param args 参数方程需要的其他参数
   * @returns
   */
  return function (start: number, end: number, segments = 100, ...args: any[]) {
    const points = [] as Point[];
    for (let i = 0; i <= segments; i++) {
      const p = i / segments;
      const t = start * (1 - p) + end * p; // 这个采样方式不太直观，但是对的，这是线性插值
      const x = xFunc(t, ...args); // 计算参数方程组的x
      const y = yFunc(t, ...args); // 计算参数方程组的y
      points.push([x, y]);
    }
    return {
      draw: draw.bind(null, points),
      points,
    };
  };
}

export { parametric };
