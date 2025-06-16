<script setup>
import BlogCard from "./BlogCard.vue";
import {onMounted, ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  userId: String
})
const blogList = ref([]);



onMounted(async () => {
  try {
    const response = await axios.post('http://localhost:8080/blog/list', {
      id: props.userId,
      type: "mine"
    });
    blogList.value = response.data.data;
    console.log("从后端拉取了这些信息" + blogList.value)
  } catch (e) {
    console.error("获取博客列表失败:", e);
  }
})


</script>

<template>
  <div class="blog-list">
    <div class="blog-list-item" v-for="blog in blogList" :key="blog.title">
      <BlogCard :blog="blog"></BlogCard>
    </div>
  </div>
</template>

<style scoped>
.blog-list{
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  /* 隐藏滚动条的关键代码 */
  scrollbar-width: none;       /* Firefox */
  -ms-overflow-style: none;    /* IE 10+ */
}
.blog-list::-webkit-scrollbar {
  display: none;               /* Chrome、Safari */
}
.blog-list-item{
  margin-top: 0.3rem;
  margin-right: 1rem;

  border-top: 1px solid #ccc; /* 添加一条淡淡的灰色分割线 */
  padding-top: 2px; /* 分割线与内容之间留出一点距离 */
}
.blog-list-item:first-child {
  border-top: none; /* 第一个不加分割线 */
  padding-top: 0;
}
</style>