<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="BlogRichTextContent" v-html="content"></div>
</template>

<style scoped>

</style>