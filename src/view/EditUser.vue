<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const userId = route.params.id;

const username = ref('');
const avatar = ref('');

const newPassword = ref('');
const confirmPassword = ref('');

// 模拟从后端获取用户信息
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/user/view/${userId}`)
    username.value = response.data.data.username;
    avatar.value = response.data.data.avatar;
  } catch (e) {
    console.error("获取博客列表失败:", e);
  }

});

// 模拟上传头像成功回调
function handleAvatarUploadSuccess(url) {
  avatar.value = url;
}

// 提交修改
async function handleSave() {
  if (newPassword.value !== confirmPassword.value) {
    alert('两次密码输入不一致');
    return;
  }
  try {
    const payload = {
      id: userId,
      username: username.value,
      avatar: avatar.value,
    };

    if (newPassword.value) {
      payload.password = newPassword.value;
    }

    const res = await axios.post("http://localhost:8080/user/update", payload);
    localStorage.setItem("userId",res.data.data.id);
    localStorage.setItem("username",res.data.data.username);
    localStorage.setItem("avatar",res.data.data.avatar);
    if (res.data.code === 200) {
      alert("保存成功！");
    } else {
      alert("保存失败：" + res.data.msg);
    }
  } catch (error) {
    console.error("请求出错", error);
    alert("网络异常，请稍后再试");
  }
}

async function handleAvatarUpload(){
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async () => {
    const file = input.files[0]
    if (file) {
      const url = await uploadImage(file)
      handleAvatarUploadSuccess(url)
    }
  }
  input.click()
}

const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  try {
    const response = await axios.post('http://localhost:8080/blog/upload', formData)
    console.log('上传图片的返回url', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('上传失败', error)
    alert('上传图片失败！')
    return null
  }
}
</script>

<template>
  <div class="edit-user-container">
    <h2>编辑用户信息</h2>

    <div class="form-item">
      <label>用户名：</label>
      <input v-model="username" type="text" />
    </div>

    <div class="form-item">
      <label>头像：</label>
      <img :src="avatar" @click="handleAvatarUpload" class="avatar-preview" />
    </div>

    <div class="form-item">
      <label>新密码：</label>
      <input v-model="newPassword" type="password" />
    </div>

    <div class="form-item">
      <label>确认密码：</label>
      <input v-model="confirmPassword" type="password" />
    </div>

    <button class="save-button" @click="handleSave">保存修改</button>
  </div>
</template>

<style scoped>
.edit-user-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 1rem;
}

.form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 0.5rem;
  object-fit: cover;
  border: 2px solid #6369ff;
}

.save-button {
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  background-color: #6369ff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #4a50d6;
}
</style>
