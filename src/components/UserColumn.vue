<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();
const isLogin = ref(true);
const userId = ref("114514")
function toggleLogin(){
  if(isLogin.value){
    console.log(isLogin.value+"退出登录动作");
    isLogin.value = !isLogin.value;
  }else {
    console.log("跳转登录界面")
    router.push("/login");
    isLogin.value = !isLogin.value;
  }
}
function goToUserInfo(){
  router.push(`/user/${userId.value}`);
}
</script>

<template>
  <div class="user-column">
    <img
        class="user-avatar"
        src="https://zr-sky-take-out.oss-cn-hangzhou.aliyuncs.com/f2722314-009d-4abb-8802-74e09faa34bb.jpg"
        alt="用户头像"
    />
    <div class="username">capta1nRui</div>
    <div class="user-tag" @click="goToUserInfo">个人中心</div>
    <div class="login-button" @click="toggleLogin">{{isLogin ? '退出登录' : '点击登录'}}</div>
  </div>
</template>

<style scoped>
.user-column {
  user-select: none;
  background: linear-gradient(135deg, #6369ff, #a362ff);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-column:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.user-avatar {
  width: 50%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 3px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  object-fit: cover;
}

.username {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  letter-spacing: 1px;
}

.user-tag {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
}
.user-tag:hover {
  background-color: rgba(175, 175, 175, 0.2);
  cursor: pointer;
}
.login-button {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.6rem;
  margin-top: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
}
.login-button:hover {
  background-color: rgba(175, 175, 175, 0.2);
  cursor: pointer;
}
</style>
