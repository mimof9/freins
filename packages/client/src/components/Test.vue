<script setup lang="ts">
import { drawParticles } from "@/utils/drawParticles";
import { onMounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement>();
onMounted(() => {
  if (canvas.value) {
    // 创建 WebGL 上下文
    const gl = canvas.value.getContext("webgl")!;

    // drawParticles(gl);
  }
});
</script>

<template>
  <canvas width="500" height="500" ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  width: 500px;
  height: 500px;
}
</style>
