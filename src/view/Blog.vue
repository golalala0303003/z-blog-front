<script setup>
import BlogRichText from "../components/BlogRichText.vue";
import { onMounted, onUnmounted, ref } from "vue";
import {useRoute, useRouter} from "vue-router";
import BlogTopBar from "../components/BlogTopBar.vue";
import UserColumn from "../components/UserColumn.vue";
import axios from "axios";
import CommentArea from "../components/CommentArea.vue";

const content = ref("");
const cover = ref("");
const title = ref("");
const author = ref("");
const avatar = ref("");
const createTime = ref("");

const route = useRoute();
const router = useRouter();
const showFunctionColumn = ref(true);
const showUserColumn = ref(true);
const currentUser = localStorage.getItem("username");

function handleResize() {
  const width = window.innerWidth;
  showFunctionColumn.value = width > 992;
  showUserColumn.value = width > 992;
  console.log("handleResize 侦测到了浏览器窗口变化 " + width);
}

const handleDelete = async () => {
  if (!confirm("确定要删除这篇博客吗？")) return;
  try {
    await axios.delete(`http://localhost:8080/blog/delete/${route.params.id}`);
    alert("删除成功！");
    router.back()
  } catch (error) {
    console.error("删除失败", error);
    alert("删除失败！");
  }
};

const handleEdit = () => {
  router.push(`/edit-blog/${route.params.id}`);
};

onMounted(async () => {
  console.log("已经接收到id，准备发送请求相关文章 " + route.params.id);
  try {
    const response = await axios.get(`http://localhost:8080/blog/${route.params.id}`);
    content.value = response.data.data.content;
    title.value = response.data.data.title;
    cover.value = response.data.data.cover;
    author.value = response.data.data.author;
    avatar.value = response.data.data.avatar;
    createTime.value = response.data.data.createTime;

    console.log("博客详情获取成功");
  } catch (error) {
    console.error("获取博客失败", error);
    alert("无法加载博客内容");
  }
  handleResize();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <BlogTopBar class="top-bar" />

  <div class="main-container">
    <div v-if="showFunctionColumn" class="function-column">功能栏</div>

    <div class="text-column">
      <img v-if="cover" :src="cover" class="cover-img" alt="封面图" />

      <h1 class="title">{{ title }}</h1>

      <div v-if="author === currentUser" class="action-buttons">
        <button class="edit-button" @click="handleEdit">编辑</button>
        <button class="delete-button" @click="handleDelete">删除</button>
      </div>

      <div class="author-info">
        <img class="author-avatar" :src="avatar" alt="作者头像" />
        <div class="author-text">
          <div class="author-id">作者：{{ author }}</div>
          <div class="create-time">发表于：{{ new Date(createTime).toLocaleString() }}</div>
        </div>
      </div>

      <BlogRichText :content="content" />

      <CommentArea class="comment" :blog-id="route.params.id">这是评论区</CommentArea>
    </div>

    <UserColumn v-if="showUserColumn" class="user-column" />
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

/* 整体容器 */
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10vh;
  padding: 0 20px;
}

/* 左侧功能栏 */
.function-column {
  width: 12vw;
  min-width: 120px;
  background-color: #f4f6fa;
  padding: 10px;
  margin-right: 20px;
  border-radius: 8px;
  position: sticky;
  top: 12vh;
  height: fit-content;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* 中间正文栏 */
.text-column {
  max-width: 800px;
  width: 100%;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

/* 封面图 */
.cover-img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
}

/* 标题样式 */
.title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

/* 按钮区域 */
.action-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.edit-button,
.delete-button {
  margin: 0 8px;
  padding: 6px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease;
}

.edit-button {
  background-color: #4caf50;
  color: white;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.delete-button:hover {
  background-color: #e53935;
}

/* 评论区 */
.comment {
  margin-top: 40px;
  padding: 16px;
  background-color: #f1f3f5;
  border-radius: 8px;
  color: #333;
  font-size: 16px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
}

/* 右侧用户栏 */
.user-column {
  width: 15vw;
  min-width: 160px;
  margin-left: 20px;
  background-color: #fafafa;
  padding: 12px;
  border-radius: 8px;
  position: sticky;
  top: 12vh;
  height: fit-content;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* 响应式处理 */
@media (max-width: 992px) {
  .main-container {
    flex-direction: column;
    align-items: center;
  }

  .function-column,
  .user-column {
    display: none;
  }

  .text-column {
    width: 100%;
    max-width: 100%;
    margin: 0;
    box-shadow: none;
  }
}

.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.author-text {
  display: flex;
  flex-direction: column;
  color: #555;
  font-size: 14px;
}

.author-id {
  font-weight: bold;
}

.create-time {
  color: #888;
  font-size: 13px;
}
</style>
