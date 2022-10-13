<script setup lang="ts">
import { drawParticles } from "@/utils/drawParticles";
import { onMounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement>();
onMounted(() => {
  if (canvas.value) {
    canvas.value.style.width = "300px";

    // 创建 WebGL 上下文
    const gl = canvas.value.getContext("webgl")!;

    drawParticles(gl);
  }
});
</script>

<template>
  <div class="gl-wrapper">
    <canvas ref="canvas" width="300" height="300"></canvas>
  </div>
</template>

<style scoped>
.gl-wrapper {
  text-align: center;
}
</style>
