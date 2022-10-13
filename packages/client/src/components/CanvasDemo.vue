<script setup lang="ts">
import { drawBranch } from "@/utils/drawBranch";
import { parametric } from "@/utils/parametric";
import { draw, regularShape } from "@/utils/regularShape";
import { Vector2D } from "@/utils/vector2d";
import { onMounted, ref } from "vue";
const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  if (canvas.value) {
    const ctx = canvas.value.getContext("2d")!;

    ctx.translate(canvas.value.width / 2, canvas.value.height / 2);
    ctx.scale(1, -1);

    // 树
    const v0 = new Vector2D(0, 0);
    drawBranch(ctx, v0, 50, 10, 1, 3);

    // 正多边形
    // draw(ctx, regularShape(3, 100, 0, 100)); // 绘制三角形
    // draw(ctx, regularShape(6, 200, 0, 50)); // 绘制六边形
    // draw(ctx, regularShape(12, 300, 0, 25)); // 绘制十一边形
    // draw(ctx, regularShape(60, 400, 0, 5)); // 绘制六十边形

    // 规则曲线
    // const circle = parametric(
    //   (t) => 100 + 100 * Math.cos(t),
    //   (t) => 100 + 100 * Math.sin(t)
    // );
    // circle(-Math.PI, Math.PI).draw(ctx);

    // 贝塞尔曲线
    // const p0 = new Vector2D(0, 0); // 起点
    // const p1 = new Vector2D(100, 0).rotate(0.75); // 控制点
    // const p2 = new Vector2D(150, 0).rotate(-0.75); // 控制点
    // const p3 = new Vector2D(200, 0); // 控制点
    // // 二阶
    // const quadricBezier = parametric(
    //   (t, [{ x: x0 }, { x: x1 }, { x: x2 }]) =>
    //     (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
    //   (t, [{ y: y0 }, { y: y1 }, { y: y2 }]) =>
    //     (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2
    // );
    // quadricBezier(0, 1, 100, [p0, p1, p3]).draw(ctx);
    // // 三阶
    // const cubicBezier = parametric(
    //   (t, [{ x: x0 }, { x: x1 }, { x: x2 }, { x: x3 }]) =>
    //     (1 - t) ** 3 * x0 +
    //     3 * t * (1 - t) ** 2 * x1 +
    //     3 * (1 - t) * t ** 2 * x2 +
    //     t ** 3 * x3,
    //   (t, [{ y: y0 }, { y: y1 }, { y: y2 }, { y: y3 }]) =>
    //     (1 - t) ** 3 * y0 +
    //     3 * t * (1 - t) ** 2 * y1 +
    //     3 * (1 - t) * t ** 2 * y2 +
    //     t ** 3 * y3
    // );
    // cubicBezier(0, 1, 100, [p0, p1, p2, p3]).draw(ctx);
  }
});
</script>

<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas" width="1000" height="1000"></canvas>
  </div>
</template>

<style scoped>
.canvas-wrapper {
  text-align: center;
}

canvas {
  width: 500px;
  height: 500px;
}
</style>
