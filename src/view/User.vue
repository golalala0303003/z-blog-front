<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BlogTopBar from "../components/BlogTopBar.vue";

import BlogListForUser from "../components/BlogListForUser.vue";
import axios from "axios";


const route = useRoute();
const router = useRouter();

const userId = route.params.id;
const username = ref("");
const avatar = ref("");

const isThisPageYours = ref(false);
// 模拟获取用户信息
onMounted(async () => {
  console.log("用户的id为 " + userId);
  try {
    const response = await axios.get(`http://localhost:8080/user/view/${userId}`)
    username.value = response.data.data.username;
    avatar.value = response.data.data.avatar;
    console.log("后端返回id", response.data.data.id, typeof response.data.data.id);
    console.log("本地存储id", localStorage.getItem("userId"), typeof localStorage.getItem("userId"));

    isThisPageYours.value = Number(localStorage.getItem("userId")) === response.data.data.id;
    console.log(isThisPageYours.value);
  } catch (e) {
    console.error("获取博客列表失败:", e);
  }
});

function goEditUser() {
  router.push(`/user/${userId}/edit`);
}
</script>

<template>
  <BlogTopBar />
  <div class="main-container">
    <div class="content-container">
      <div class="user-info-card">
        <img :src="avatar" alt="用户头像" class="avatar" />
        <div class="info">
          <h2 class="username">{{ username }}</h2>
          <button v-if="isThisPageYours" @click="goEditUser" class="edit-button">修改信息</button>
        </div>
      </div>

      <div class="blog-list-wrapper">
        <BlogListForUser :user-id="userId" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
}

.content-container {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.user-info-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
  border: 3px solid #6369ff;
}

.info {
  flex: 1;
}

.username {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.edit-button {
  padding: 0.5rem 1rem;
  background-color: #6369ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.edit-button:hover {
  background-color: #4b52cc;
}

.blog-list-wrapper {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
