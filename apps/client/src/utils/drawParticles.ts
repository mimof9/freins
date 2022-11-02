interface RandomTriangle {
  u_color: number[];
  u_rotation: number;
  u_scale: number;
  u_direction: number[];
  startTime: number;
  u_duration: number;
  u_current: number;
}

function genRandomTriangle(): RandomTriangle {
  // 颜色
  const u_color = [Math.random(), Math.random(), Math.random(), 1.0];
  // 旋转
  const u_rotation = Math.random() * Math.PI;
  // 缩放
  const u_scale = Math.random() * 0.05 + 0.03;
  // 方向
  const rad = Math.random() * Math.PI * 2; // 弧度
  const u_direction = [Math.cos(rad), Math.sin(rad)];
  // 生命周期
  const startTime = performance.now(); // 开始时间
  const u_duration = 3; // 持续时间
  const u_current = 0; // 当前时间

  return {
    u_color,
    u_rotation,
    u_scale,
    u_direction,
    startTime,
    u_duration,
    u_current,
  };
}

function setTriangleUniforms(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  {
    u_color,
    u_rotation,
    u_scale,
    u_direction,
    u_duration,
    u_current,
  }: RandomTriangle
) {
  let loc = gl.getUniformLocation(program, "u_color");
  gl.uniform4fv(loc, u_color);

  loc = gl.getUniformLocation(program, "u_rotation");
  gl.uniform1f(loc, u_rotation);

  loc = gl.getUniformLocation(program, "u_scale");
  gl.uniform1f(loc, u_scale);

  loc = gl.getUniformLocation(program, "u_direction");
  gl.uniform2fv(loc, u_direction);

  loc = gl.getUniformLocation(program, "u_duration");
  gl.uniform1f(loc, u_duration);

  loc = gl.getUniformLocation(program, "u_current");
  gl.uniform1f(loc, u_current);
}

let triangles = [] as RandomTriangle[];
function update(gl: WebGLRenderingContext, program: WebGLProgram) {
  // 产生粒子
  for (let i = 0; i < 1 * Math.random(); i++) {
    triangles.push(genRandomTriangle());
  }

  // 移除消亡粒子
  triangles = triangles.filter((triangle) => {
    return triangle.u_current <= triangle.u_duration;
  });

  // 绘制粒子
  gl.clear(gl.COLOR_BUFFER_BIT);
  triangles.forEach((triangle) => {
    triangle.u_current = (performance.now() - triangle.startTime) / 1000;
    setTriangleUniforms(gl, program, triangle);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  });

  requestAnimationFrame(() => update(gl, program));
}

/**
 * 三角形粒子动画
 *
 * @param gl WebGL 渲染上下文
 */
function drawParticles(gl: WebGLRenderingContext) {
  // 创建 WebGL 程序
  const vertex = `
  #define PI 3.14159265358979323846

  attribute vec2 position;
  uniform float u_rotation;
  uniform float u_scale;
  uniform vec2 u_direction;
  uniform float u_duration;
  uniform float u_current;
  varying float vProgress;

  void main() {
    float progress = min(1.0, u_current / u_duration);
    float rad = u_rotation + PI * progress;
    float scale = u_scale * progress * (2.0 - progress);
    vec2 offset = u_direction * progress * progress;

    mat3 rotateMatrix = mat3(
      cos(rad), sin(rad), 0.0,
      -sin(rad), cos(rad), 0.0,
      0.0, 0.0, 1.0
    );
    mat3 scaleMatrix = mat3(
      scale, 0.0, 0.0,
      0.0, scale, 0.0,
      0.0, 0.0, 1.0
    );
    mat3 translateMatrix = mat3(
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      offset.x, offset.y, 1.0
    );

    gl_PointSize = 1.0;
    vec3 pos = translateMatrix * scaleMatrix * rotateMatrix * vec3(position, 1.0);
    gl_Position = vec4(pos, 1.0);
    vProgress = progress;
  }
`;
  const fragment = `
  precision mediump float;

  uniform vec4 u_color;
  varying float vProgress;
  void main()
  {
    gl_FragColor.xyz = u_color.xyz;
    gl_FragColor.a = (1.0 - vProgress) * u_color.a;
  }   
`;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragmentShader, fragment);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  // 将数据存入缓冲区
  const position = new Float32Array([-1, -1, 0, 1, 1, -1]);
  const pointBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);

  // 将缓冲区数据读取到 GPU
  const vPosition = gl.getAttribLocation(program, "position");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // 更新
  requestAnimationFrame(() => update(gl, program));
}

export { drawParticles };
