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

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/user/view/${userId}`);
    console.log(response.data);
    username.value = response.data.data.username;
    avatar.value = response.data.data.avatar;

    const storedUserId = localStorage.getItem("userId");
    if (Number(storedUserId) === response.data.data.id) {
      isThisPageYours.value = true;
    } else {
      isThisPageYours.value = false;
    }
  } catch (e) {
    console.error("获取用户信息失败:", e);
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
        <h3 class="blog-history-title">历史博客</h3>
        <div class="blog-scroll-wrapper">
          <BlogListForUser :user-id="userId" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2rem;
  background-color: #f0f2f5;
}

.content-container {
  width: 80%;
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}


.user-info-card {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 1.5rem;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 1.8rem;
  margin: 0;
}

.edit-button {
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #337ecc;
}


.blog-list-wrapper {
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.blog-history-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  border-left: 4px solid #409eff;
  padding-left: 0.6rem;
}

.blog-scroll-wrapper {
  max-height: 60vh;
  overflow-y: auto;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.blog-scroll-wrapper::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>
