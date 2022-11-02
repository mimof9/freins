import { Vector2D } from "./vector2d";

/**
 * 判断点是否在三角形内
 *
 * @param p1 三角形顶点向量
 * @param p2
 * @param p3
 * @param point 待判断的点
 * @returns
 */
function inTriangle(p1: Vector2D, p2: Vector2D, p3: Vector2D, point: Vector2D) {
  const a = p2.copy().sub(p1);
  const b = p3.copy().sub(p2);
  const c = p1.copy().sub(p3);

  const u1 = point.copy().sub(p1);
  const u2 = point.copy().sub(p2);
  const u3 = point.copy().sub(p3);

  const s1 = Math.sign(a.crossProduct(u1));
  let p = a.dotProduct(u1) / a.length ** 2;
  if (s1 === 0 && p >= 0 && p <= 1) return true;

  const s2 = Math.sign(b.crossProduct(u2));
  p = b.dotProduct(u2) / b.length ** 2;
  if (s2 === 0 && p >= 0 && p <= 1) return true;

  const s3 = Math.sign(c.crossProduct(u3));
  p = c.dotProduct(u3) / c.length ** 2;
  if (s3 === 0 && p >= 0 && p <= 1) return true;

  return s1 === s2 && s2 === s3;
}

function isPointInPath(
  {
    vertices,
    cells,
  }: {
    vertices: [number, number][];
    cells: Uint16Array;
  },
  point: Vector2D
) {
  let ret = false;
  for (let i = 0; i < cells.length; i += 3) {
    const p1 = new Vector2D(...vertices[cells[i]]);
    const p2 = new Vector2D(...vertices[cells[i + 1]]);
    const p3 = new Vector2D(...vertices[cells[i + 2]]);
    if (inTriangle(p1, p2, p3, point)) {
      ret = true;
      break;
    }
  }
  return ret;
}

export { inTriangle, isPointInPath };
