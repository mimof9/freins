<script setup lang="ts">
import { ref } from "vue";
import _ from "lodash";

const label = ref("[@mimof ~]");

const commandEditingArea = ref<HTMLElement | null>(null);
const command = ref("");

function onCommandInput() {
  autoAdjustCommandHeight();
}
function autoAdjustCommandHeight() {
  if (commandEditingArea.value) {
    // 使用 scrollHeight 的问题是：删除时高度不会缩小
    // commandEditingArea.value.style.height = `${commandEditingArea.value.scrollHeight}px`;

    const lines = calcStrLines(command.value);
    console.log(lines);
    const style = window.getComputedStyle(commandEditingArea.value);
    const lineHeight = parseInt(style.lineHeight, 10);
    const expectedHeight = lines * lineHeight;
    commandEditingArea.value.style.height = `${expectedHeight}px`;
  }
}
function calcStrLines(str: string) {
  const arr = _.countBy(str);
  return (arr["\n"] || 0) + 1; // 不同平台的回车换行怎么处理？有没有类似 node 的 os.EOL
}
</script>

<template>
  <div class="wrapper">
    <div class="label">{{ label + "# " }}</div>
    <textarea
      ref="commandEditingArea"
      v-model="command"
      @input="onCommandInput"
    ></textarea>
  </div>
</template>

<style scoped>
textarea {
  outline: none;
  border: none;
  padding: 0;
  resize: none;
  overflow-y: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}
</style>
