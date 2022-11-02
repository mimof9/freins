import { Vector2D } from "./vector2d";

/**
 * 画树枝的函数
 *
 * @param context Canvas2D 上下文
 * @param v0 起始向量
 * @param length 树枝的长度
 * @param thickness 树枝的粗细
 * @param direction 树枝的方向，用与x轴的夹角表示，单位是弧度，取值范围是[-PI, PI]
 * @param bias 一个随机偏向因子，用来让树枝的朝向有一定随机性
 *
 * 使用：
 * const v0 = new Vector2D(500, 0);
 * drawBranch(ctx, v0, 100, 10, 1, 3);
 */
function drawBranch(
  context: CanvasRenderingContext2D,
  v0: Vector2D,
  length: number,
  thickness: number,
  direction: number,
  bias: number
) {
  const v = new Vector2D().rotate(direction).scale(length);
  const v1 = v0.copy().add(v);

  context.lineCap = "round";
  context.lineWidth = thickness;

  context.beginPath();
  context.moveTo(v0.x, v0.y);
  context.lineTo(v1.x, v1.y);
  context.stroke();

  // 树枝
  if (thickness > 2) {
    const nextLength = length * 0.9;
    const nextTickness = thickness * 0.8;
    const nextBias = bias * 0.9;

    const leftDirection =
      Math.PI / 4 + 0.5 * (direction + 0.2) + bias * (Math.random() - 0.5);
    drawBranch(context, v1, nextLength, nextTickness, leftDirection, nextBias);

    const rightDirection =
      Math.PI / 4 + 0.5 * (direction - 0.2) + bias * (Math.random() - 0.5);
    drawBranch(context, v1, nextLength, nextTickness, rightDirection, nextBias);
  }

  // 树叶
  if (thickness < 5 && Math.random() < 0.3) {
    context.save();

    context.strokeStyle = "#c72c35";
    context.lineWidth = Math.random() * 6 + 3;

    context.beginPath();
    context.moveTo(v1.x, v1.y);
    context.lineTo(v1.x, v1.y - 2);
    context.stroke();

    context.restore();
  }
}

export { drawBranch };
