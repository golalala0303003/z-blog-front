<script setup>
import BlogCard from "./BlogCard.vue";
import {onMounted, ref, watch} from "vue";
import axios from "axios";

const props = defineProps({
  type: String
})
const blogList = ref([]);

async function fetchBlogListByType(type) {
  console.log("BlogList 接收到类型:", type)

  const userId = localStorage.getItem("userId"); // 读取存储的用户ID
  try {
    const response = await axios.post('http://localhost:8080/blog/list', {
      id: userId,
      type: type
    });
    blogList.value = response.data.data;
    console.log("从后端拉取了这些信息"+blogList.value)
  } catch (e) {
    console.error("获取博客列表失败:", e);
  }
}

onMounted(() => {
  fetchBlogListByType(props.type)
})

watch(() => props.type, (newType) => {
  fetchBlogListByType(newType)
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