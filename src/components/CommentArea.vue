<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CommentList from './CommentList.vue'
import CommentEditor from './CommentEditor.vue'

const props = defineProps({
  blogId: {
    type: [String, Number],
    required: true
  }
})

const commentList = ref([
  {
    id: 1,
    blogId: 101,
    author: '小明',
    content: '这篇文章写得很好，受益匪浅！',
    createTime: '2025-06-16 10:24:00'
  },
  {
    id: 2,
    blogId: 101,
    author: '小红',
    content: '我也觉得写得不错，排版清晰。',
    createTime: '2025-06-16 11:03:21'
  },
  {
    id: 3,
    blogId: 101,
    author: '张三',
    content: '请问你用的是什么富文本组件？',
    createTime: '2025-06-16 12:10:05'
  },
  {
    id: 3,
    blogId: 101,
    author: '张三',
    content: '请问你用的是什么富文本组件？',
    createTime: '2025-06-16 12:10:05'
  },
  {
    id: 3,
    blogId: 101,
    author: '张三',
    content: '请问你用的是什么富文本组件？',
    createTime: '2025-06-16 12:10:05'
  },
  {
    id: 3,
    blogId: 101,
    author: '张三',
    content: '请问你用的是什么富文本组件？',
    createTime: '2025-06-16 12:10:05'
  },
  {
    id: 3,
    blogId: 101,
    author: '张三',
    content: '请问你用的是什么富文本组件？',
    createTime: '2025-06-16 12:10:05'
  },
  {
    id: 3,
    blogId: 101,
    author: '张三',
    content: '请问你用的是什么富文本组件？',
    createTime: '2025-06-16 12:10:05'
  },
])
const showEditor = ref(false)

// 获取评论列表
const fetchComments = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/comment/list/${props.blogId}`)
    commentList.value = res.data.data || []
  } catch (error) {
    console.error('获取评论失败', error)
  }
}

// 添加评论成功后刷新列表
const handleCommentSuccess = async () => {
  await fetchComments()
  showEditor.value = false
}

onMounted(() => {
  console.log('mounted, 正在加载评论区 blogId=' + props.blogId)
  fetchComments()
})
</script>

<template>
  <div class="comment-area">
    <div class="comment-header">
      <h3 class="comment-title">评论区（{{ commentList.length }}）</h3>
      <button @click="showEditor = !showEditor" class="toggle-editor">
        {{ showEditor ? '取消评论' : '写评论' }}
      </button>
    </div>

    <CommentEditor
        v-if="showEditor"
        :blog-id="props.blogId"
        @success="handleCommentSuccess"
    />

    <CommentList :comments="commentList" />
  </div>
</template>

<style scoped>
.comment-area {
  margin-top: 2rem;
  padding: 1.2rem;
  border-top: 2px solid #eee;
  background-color: #f9f9f9;
  border-radius: 10px;
}

/* 标题和按钮并列 */
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.comment-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.toggle-editor {
  padding: 6px 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.toggle-editor:hover {
  background-color: #66b1ff;
}
</style>
