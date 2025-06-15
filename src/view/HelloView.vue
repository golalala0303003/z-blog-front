<template>
  <div>
    <h1>前端 Hello 页面</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const message = ref('')

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8080/user/hello')
    const result = await response.json()
    if (result.code === 200 && result.data) {
      message.value = result.data.message
    } else {
      message.value = '接口返回失败: ' + result.msg
    }
  } catch (err) {
    message.value = '请求异常'
    console.error(err)
  }
})
</script>
