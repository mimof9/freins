<script setup lang="ts">
import { onMounted, ref } from "vue";

const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  if (canvas.value) {
    console.log(canvas.value);
  }
});
</script>

<template>
  <canvas width="1000" height="1000" ref="canvas"></canvas>
</template>

<style scoped>
canvas {
  width: 500px;
  height: 500px;
}
</style>
