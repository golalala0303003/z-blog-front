<script setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
const router = useRouter();
function goToRegister(){
  router.push("/register");
}

const username = ref('')
const password = ref('')

function handleLogin(){
  router.push("/home");
}
</script>

<template>
  <div class="page-container">
    <div class="login-container">
      <h2>登录</h2>
      <input v-model="username" type="text" placeholder="用户名" style="width: 100%"/>
      <input v-model="password" type="password" placeholder="密码" style="width: 100%"/>
      <button @click="handleLogin" style="width: 100%">登录</button>
      <div class="register-link" @click="goToRegister">
        没有账号？点击这里注册
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f9fb;
}

.login-container {
  width: 500px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #ffffff;
}

h2 {
  color: #333333;
  text-align: center;
  margin-bottom: 20px;
}

input {
  display: block;
  width: 100%;
  margin: 12px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #66b1ff;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #66b1ff;
}

.register-link {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: right;
  cursor: pointer;
}

.register-link:hover {
  color: #409eff;
}
</style>
