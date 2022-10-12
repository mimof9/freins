import earcut from "earcut";
import lodash from "lodash";
import { isPointInPath } from "./isPointInPath";
import { Vector2D } from "./vector2d";

type Vertices = [number, number][];

/**
 * 画任意多边形并用三角剖分填充
 * 
 * @param ctx WebGL 渲染上下文
 * @param vertices 顶点坐标
 * 
 * 交互时要求 canvas宽高和css宽高一致
 * 
 * 使用：
// 创建 WebGL 上下文
const gl = canvas.value.getContext("webgl")!;
const vertices = [
  [-0.7, 0.5],
  [-0.4, 0.3],
  [-0.25, 0.71],
  [-0.1, 0.56],
  [-0.1, 0.13],
  [0.4, 0.21],
  [0, -0.6],
  [-0.3, -0.3],
  [-0.6, -0.3],
  [-0.45, 0.0],
] as [number, number][];
drawPath(gl, vertices, canvas.value);
 */
function drawPath(
  ctx: WebGLRenderingContext,
  vertices: Vertices,
  canvasEl: HTMLCanvasElement
) {
  // 创建 WebGL 程序
  const vertex = `
    attribute vec2 position;
    uniform vec4 u_color;
    varying vec4 v_color;

    void main() {
      gl_PointSize = 1.0;
      gl_Position = vec4(position, 1.0, 1.0);
      v_color = u_color;
    }
  `;
  const fragment = `
    precision mediump float;
    varying vec4 v_color;

    void main() {
      gl_FragColor = v_color;
    }
  `;

  const vertexShader = ctx.createShader(ctx.VERTEX_SHADER)!;
  ctx.shaderSource(vertexShader, vertex);
  ctx.compileShader(vertexShader);
  const fragmentShader = ctx.createShader(ctx.FRAGMENT_SHADER)!;
  ctx.shaderSource(fragmentShader, fragment);
  ctx.compileShader(fragmentShader);

  const program = ctx.createProgram()!;
  ctx.attachShader(program, vertexShader);
  ctx.attachShader(program, fragmentShader);
  ctx.linkProgram(program);
  ctx.useProgram(program);

  // 将数据存入缓冲区
  const points = lodash.flatMap(vertices);
  const trianctxes = earcut(points);

  const position = new Float32Array(points);
  const pointBuffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, pointBuffer);
  ctx.bufferData(ctx.ARRAY_BUFFER, position, ctx.STATIC_DRAW);

  const cells = new Uint16Array(trianctxes);
  const cellsBuffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, cellsBuffer);
  ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, cells, ctx.STATIC_DRAW);

  // 将缓冲区数据读取到 GPU
  const vPosition = ctx.getAttribLocation(program, "position");
  ctx.vertexAttribPointer(vPosition, 2, ctx.FLOAT, false, 0, 0);
  ctx.enableVertexAttribArray(vPosition);

  const colorLoc = ctx.getUniformLocation(program, "u_color");
  ctx.uniform4fv(colorLoc, [1.0, 0.0, 0.0, 1.0]);

  // 执行着色器程序完成绘制
  ctx.clear(ctx.COLOR_BUFFER_BIT);
  ctx.drawElements(ctx.TRIANGLES, cells.length, ctx.UNSIGNED_SHORT, 0);
  // ctx.drawElements(ctx.LINE_STRIP, cells.length, ctx.UNSIGNED_SHORT, 0);

  // 交互
  const { left, top } = canvasEl.getBoundingClientRect();
  canvasEl.addEventListener("mousemove", (evt) => {
    const { x, y } = evt;
    // 坐标转换
    const offsetX = (2 * (x - left)) / canvasEl.width - 1.0;
    const offsetY = 1.0 - (2 * (y - top)) / canvasEl.height;

    ctx.clear(ctx.COLOR_BUFFER_BIT);

    const colorLoc = ctx.getUniformLocation(program, "u_color");
    if (isPointInPath({ vertices, cells }, new Vector2D(offsetX, offsetY))) {
      ctx.uniform4fv(colorLoc, [1.0, 0.0, 0.0, 0.5]);
    } else {
      ctx.uniform4fv(colorLoc, [1.0, 0.0, 0.0, 1.0]);
    }

    ctx.drawElements(ctx.TRIANGLES, cells.length, ctx.UNSIGNED_SHORT, 0);
  });
}

export { drawPath };
