<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import TiptapEditor from '../components/TiptapEditor.vue'

const router = useRouter()
const route = useRoute()

const title = ref('')
const content = ref('')
const cover = ref('')
const blogId = route.params.id

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/blog/${blogId}`)
    const blog = response.data.data
    title.value = blog.title
    content.value = blog.content
    cover.value = blog.cover
  } catch (error) {
    console.error('加载博客失败', error)
    alert('无法加载博客内容')
  }
})

async function updateBlog() {
  const authorId = localStorage.getItem('userId')

  if (!title.value || !content.value || !cover.value || !authorId) {
    alert("请填写完整信息后再保存")
    return
  }

  const postData = {
    id: parseInt(blogId),
    title: title.value,
    content: content.value,
    cover: cover.value,
    authorId: parseInt(authorId),
  }

  try {
    const response = await axios.put('http://localhost:8080/blog/update', postData)
    if (response.data.code === 200) {
      alert("文章更新成功！")
      router.push(`/blog/${blogId}`)
    } else {
      alert("更新失败：" + response.data.msg)
    }
  } catch (error) {
    console.error("更新出错", error)
    alert("请求失败，请稍后重试")
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
      <h2 class="page-title">编辑文章</h2>

      <input
          class="title-input"
          v-model="title"
          type="text"
          placeholder="请输入文章标题"
      />

      <div class="cover-section">
        <button @click="uploadCover" class="cover-upload-button">更换封面图</button>
        <img v-if="cover" class="cover-preview" :src="cover" alt="封面预览" />
      </div>

      <div class="editor-wrapper">
        <TiptapEditor v-model:content="content" />
      </div>

      <div class="btn-center">
        <button class="publish-button" @click="updateBlog">保存修改</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.write-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f7f9fc;
  min-height: 100vh;
}

.write-card {
  background-color: #fff;
  padding: 32px;
  max-width: 900px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
}

.title-input {
  width: 100%;
  padding: 10px 14px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
}

.cover-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.cover-upload-button {
  width: fit-content;
  padding: 6px 14px;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 10px;
}

.cover-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  object-fit: cover;
}

.editor-wrapper {
  margin-bottom: 30px;
}

.btn-center {
  display: flex;
  justify-content: center;
}

.publish-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
