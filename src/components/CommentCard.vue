<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="comment-card">
    <div class="header">
      <span class="author">{{ comment.author }}</span>
      <span class="time">{{ comment.createTime }}</span>
    </div>
    <div class="content">
      {{ comment.content }}
    </div>
  </div>
</template>

<style scoped>
.comment-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #555;
}

.author {
  font-weight: 600;
}

.content {
  font-size: 1rem;
  color: #333;
  white-space: pre-wrap;
}
</style>
