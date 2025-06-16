<script setup>
import { defineProps } from 'vue'
import CommentCard from './CommentCard.vue'

const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="comment-list">
    <CommentCard
        v-for="(comment, index) in comments"
        :key="comment.id || index"
        :comment="comment"
    />
  </div>
</template>

<style scoped>
.comment-list {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* 评论之间的间距 */
  max-height: 300px; /* 限制最大高度 */
  overflow-y: auto;

  /* 隐藏滚动条的样式 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.comment-list::-webkit-scrollbar {
  display: none; /* Chrome、Safari */
}
</style>
