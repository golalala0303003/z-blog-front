<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

function goToLogin() {
  router.push("/login");
}

const username = ref("");
const password = ref("");
const confirmPassword = ref("");

async function handleRegister() {
  if (!username.value || !password.value || !confirmPassword.value) {
    return alert("请填写所有字段");
  }
  if (password.value !== confirmPassword.value) {
    return alert("两次密码输入不一致");
  }
  console.log("这个是名字"+username.value)
  try {
    const res = await fetch("http://localhost:8080/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const result = await res.json();

    if (res.ok && result.code === 200) {
      alert("注册成功！");
      router.push("/login");
    } else {
      alert(result.msg || "注册失败");
    }
  } catch (error) {
    console.error("注册请求出错", error);
    alert("注册请求失败，请检查网络或稍后再试");
  }
}
</script>


<template>
  <div class="page-container">
    <div class="login-container">
      <h2>注册</h2>
      <input v-model="username" type="text" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <input v-model="confirmPassword" type="password" placeholder="确认密码" />
      <button @click="handleRegister">注册</button>
      <div class="register-link" @click="goToLogin">
        已有账号？点击这里登录
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
  color: #333;
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
