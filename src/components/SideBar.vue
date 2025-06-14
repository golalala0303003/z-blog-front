<script setup>
import {ref} from 'vue'
const menuItems = [
  {name:"推荐",key:"recommend"},
  {name:"关注",key:"follow"},
  {name:"点赞",key:"like"},
  {name:"热门",key:"topBlogs"}
]

const selectedKey = ref('recommend')

function handleClick(key){
  console.log("发生了点击侧边栏"+key);
  selectedKey.value=key;
}

</script>

<template>
  <div class="side-bar">
    <div v-for="item in menuItems"
    :key="item.key"
    class="side-bar-item"
         :class="{ active: selectedKey === item.key }"
    @click="handleClick(item.key)"
    >
      {{item.name}}
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