<script setup>
import BlogRichText from "../components/BlogRichText.vue";
const content = "<h1>欢迎阅读我的博客</h1>\n" +
    "<p>这是一个使用 <strong>TinyMCE</strong> 编辑器展示的富文本内容示例。</p>\n" +
    "\n" +
    "<h2>图片展示</h2>\n" +
    "<p>下面这张图是我上传的头像：</p>\n" +
    "<p>\n" +
    "  <img \n" +
    "    src=\"https://zr-sky-take-out.oss-cn-hangzhou.aliyuncs.com/f2722314-009d-4abb-8802-74e09faa34bb.jpg\" \n" +
    "    alt=\"头像图片\" \n" +
    "    style=\"width: 300px; border-radius: 10px;\" \n" +
    "  />\n" +
    "</p>\n" +
    "\n" +
    "<h2>段落示例</h2>\n" +
    "<p>\n" +
    "  本文用于测试博客内容页的富文本显示功能。你可以通过设置 TinyMCE 的\n" +
    "  <code>readonly</code> 模式，使内容以静态方式展示。后续可以继续扩展更多功能，例如评论、点赞、阅读数等。\n" +
    "</p>\n" +
    "\n" +
    "<blockquote>\n" +
    "  “写代码就像写诗，一样需要灵感与逻辑的结合。”\n" +
    "</blockquote>\n"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"+"<p>1</p>"


import {onMounted, onUnmounted, ref} from "vue";
import {useRoute} from "vue-router";
const route = useRoute();

import BlogTopBar from "../components/BlogTopBar.vue";
import UserColumn from "../components/UserColumn.vue";

const showFunctionColumn = ref(true);
const showUserColumn = ref(true);
function handleResize() {
  const width = window.innerWidth;
  showFunctionColumn.value = width > 992;
  showUserColumn.value = width > 992;
  console.log("handleResize"+"侦测到了浏览器窗口变化"+width);
}
onMounted(()=>{
  console.log("已经接收到id，准备发送请求相关文章"+route.params.id)
  //TODO请求后端获取文章

  handleResize();
  window.addEventListener("resize", handleResize);
})
onUnmounted(()=>{
  window.removeEventListener("resize", handleResize);
})
</script>

<template>
  <BlogTopBar class="top-bar"></BlogTopBar>
  <div class="main-container">
    <div v-if="showFunctionColumn" class="function-column">功能栏</div>
    <div class="text-column">
      <div class="title-row">标题</div>
      <BlogRichText :content="content"></BlogRichText>
      <div class="comment">这是评论区</div>
    </div>
    <UserColumn v-if="showUserColumn" class="user-column"></UserColumn>
  </div>
</template>

<style scoped>
.top-bar {
  height: 7vh;

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}
.main-container {

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top:10vh;
}
.function-column {
  width: 10vw;
  height: 30vh;
  background-color: #4a50e0;

  top: 12vh;
  position: sticky;
}
.text-column {
  margin-top: 1vh;


  max-width: 1000px;
  background-color: #ededed;

  flex: 1 1 auto;
}
.user-column{
  margin-right:3vh;
  width:15vw;
  height:40vh;

  position: sticky;
  top: 12vh;
}
.comment {
  background-color: blue;
}
</style>