import { Vector2D } from "./vector2d";

/**
 * 计算正多边形顶点坐标
 *
 * @param edges 边数
 * @param x 起点
 * @param y 起点
 * @param step 一条边的长度
 * @returns
 */
function regularShape(edges = 3, x: number, y: number, step: number) {
  const result = [];
  // const delta = Math.PI * (1 - (edges - 2) / edges);
  const delta = (Math.PI * 2) / edges;
  let v0 = new Vector2D(x, y);
  const v1 = new Vector2D(step, 0);
  result.push(v0);
  for (let i = 0; i < edges; i++) {
    v0 = v0.copy().add(v1.rotate(delta));
    result.push(v0);
  }
  return result;
}

/**
 * 画一组给定点的路径
 *
 * @param context
 * @param points
 * @param strokeStyle
 * @param fillStyle
 */
function draw(
  context: CanvasRenderingContext2D,
  points: Vector2D[],
  strokeStyle = "black",
  fillStyle = "red"
) {
  context.strokeStyle = strokeStyle;
  if (fillStyle) {
    context.fillStyle = fillStyle;
  }

  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.closePath();

  context.fill();
  context.stroke();
}

export { regularShape, draw };
