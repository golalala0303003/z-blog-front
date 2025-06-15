<script setup>
import { ref } from 'vue'
import TiptapEditor from "../components/TiptapEditor.vue";
import axios from "axios";

import { useRouter } from "vue-router";
const router = useRouter();

const title = ref('')
const content = ref('')
const cover = ref('');

async function publishPost() {
  console.log('标题:', title.value)
  console.log('内容:', content.value)
  console.log('封面图片:', cover.value)
  console.log('作者id',localStorage.getItem('userId'))
  const authorId = localStorage.getItem('userId')

  if (!title.value || !content.value || !cover.value || !authorId) {
    alert("请填写完整信息后再发布")
    return
  }

  const postData = {
    title: title.value,
    content: content.value,
    cover: cover.value,
    authorId: parseInt(authorId),
  }

  try {
    const response = await axios.post('http://localhost:8080/blog/write', postData)
    if (response.data.code === 200) {
      alert("文章发布成功！")
      // 可选：清空表单或跳转到博客列表页
      title.value = ''
      content.value = ''
      cover.value = ''

      router.back()
    } else {
      alert("发布失败：" + response.data.msg)
    }
  } catch (error) {
    console.error("发布请求出错", error)
    alert("发布请求出错，请稍后重试")
  }

}

function uploadCover() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'

  input.onchange = async () => {
    const file = input.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('http://localhost:8080/blog/upload', formData)
      cover.value = response.data.data
      console.log('封面上传成功，地址：', cover.value)
    } catch (error) {
      console.error('上传封面图失败', error)
      alert('上传封面图失败！')
    }
  }

  input.click()
}
</script>

<template>
  <div class="write-container">
    <div class="write-card">
      <h2 class="page-title">写一篇新文章</h2>

      <input
          class="title-input"
          v-model="title"
          type="text"
          placeholder="请输入文章标题"
      />

      <div class="cover-section">
        <button @click="uploadCover" class="cover-upload-button">上传封面图</button>
        <img v-if="cover" class="cover-preview" :src="cover" alt="封面预览" />
      </div>

      <div class="editor-wrapper">
        <TiptapEditor v-model:content="content" />
      </div>

      <div class="btn-center">
        <button class="publish-button" @click="publishPost">发布文章</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.write-container {
  width: 100vw;
  min-height: 100vh;
  background: #f0f6fc;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
  box-sizing: border-box;
}

.write-card {
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.page-title {
  font-size: 26px;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
}

.title-input {
  width: 100%;
  padding: 14px;
  font-size: 18px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: 0.2s;
}

.title-input:focus {
  border-color: #409eff;
  box-shadow: 0 0 3px rgba(64, 158, 255, 0.4);
}

.cover-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.cover-upload-button {
  background: #37c3f8;
  color: white;
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.cover-upload-button:hover {
  background: #5daf34;
}

.cover-preview {
  max-width: 200px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.editor-wrapper {
  background: #ffffff;
  min-height: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 30px;
  box-shadow: inset 0 0 4px rgba(0,0,0,0.05);
}

.btn-center {
  display: flex;
  justify-content: center;
}

.publish-button {
  background: #409eff;
  color: white;
  padding: 14px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.publish-button:hover {
  background: #66b1ff;
}
</style>
