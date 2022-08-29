<script setup lang="ts">
import { onMounted, ref } from "vue";

const list = ref(["item1", "item2", "item3"]);

const listContainer = ref<HTMLElement | null>(null);

// 把第一项复制到末尾，当滚动到最后一项时，继续滚动即可到第一项
// 当滚动到末尾的第一项时，去掉过渡效果，重置到第一项
list.value.push(list.value[0]);
const lastIndex = list.value.length - 1;
let currentIndex = 0;

/**
 *  intervalTime > transitionTime
 * @param ele
 * @param intervalTime 轮播间隔 s
 * @param transitionTime 过渡动画 s
 */
function autoPlay(
  ele: HTMLElement,
  intervalTime: number,
  transitionTime: number
) {
  setTimeout(() => {
    currentIndex++;
    ele.style.transition = `all ${transitionTime}s`;
    ele.style.transform = `translateY(${-20 * currentIndex}px)`; // 获取 item 的高度
    autoPlay(ele, intervalTime, transitionTime);

    if (currentIndex === lastIndex) {
      setTimeout(() => {
        currentIndex = 0;
        ele.style.transition = "none";
        ele.style.transform = `translateY(0)`;
      }, transitionTime * 1000); // 过渡动画完成后，重置位置
    }
  }, intervalTime * 1000);
}

onMounted(() => {
  if (listContainer.value) {
    autoPlay(listContainer.value, 2, 1);
  }
});
</script>

<template>
  <div class="container">
    <div class="list-container" ref="listContainer">
      <div class="item" v-for="(item, index) in list" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  overflow: hidden;
  height: 20px;
  border: 1px solid black;
}

.list-container {
}

.item {
  height: 20px;
}
</style>
