<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['typeChange'])

const menuItems = [
  { name: "推荐", key: "recommend" },
  { name: "我的", key: "mine" },
  { name: "点赞", key: "like" }
]

const selectedKey = ref('recommend')

function handleClick(key) {
  console.log("点击了侧边栏:", key)
  selectedKey.value = key
  emit('typeChange', key)  // 向父组件发送事件
}
</script>

<template>
  <div class="side-bar">
    <div
        v-for="item in menuItems"
        :key="item.key"
        class="side-bar-item"
        :class="{ active: selectedKey === item.key }"
        @click="handleClick(item.key)"
    >
      {{ item.name }}
    </div>
  </div>
</template>


<style scoped>
.side-bar{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ffffff;

  border-right: 1px solid #ccc;
  padding-right: 2px;
}
.side-bar-item {
  user-select: none;

  display: flex;
  justify-content: center;

  margin: 5px;
  background-color: #ffffff;

  font-size: 2rem;

  border-radius: 10px;
}
.side-bar-item:hover{
  background-color: #e3e3e3;
  cursor: pointer;
}
.side-bar-item.active {
  background-color: #a3a3a3; /* 选中时背景色加深 */
  font-weight: bold;
  //color: #ff262c;
}
</style>