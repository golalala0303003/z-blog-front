<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Props
const props = defineProps({
  blogId: {
    type: [String, Number],
    required: true
  }
})

// Emit
const emit = defineEmits(['success'])

// 评论内容
const commentContent = ref('')

// 发送评论
const handleSend = async () => {
  if (!commentContent.value.trim()) {
    alert('请输入评论内容')
    return
  }

  try {
    const res = await axios.post('http://localhost:8080/comment/add', {
      blogId: props.blogId,
      content: commentContent.value,
      authorId: localStorage.getItem('userId')
    })

    if (res.data.code === 200) {
      commentContent.value = ''
      emit('success')
    } else {
      alert('评论失败：' + res.data.msg)
    }
  } catch (error) {
    console.error('发送评论失败', error)
    alert('发送失败，请检查网络连接')
  }
}
</script>

<template>
  <div class="comment-editor">
    <textarea
        v-model="commentContent"
        placeholder="写下你的评论..."
        class="comment-input"
    />
    <button class="send-button" @click="handleSend">发送</button>
  </div>
</template>

<style scoped>
.comment-editor {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fafafa;
}

.comment-input {
  min-height: 80px;
  padding: 0.5rem;
  resize: vertical;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.send-button {
  align-self: flex-end;
  padding: 0.4rem 1rem;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}
.send-button:hover {
  background-color: #66b1ff;
}
</style>
