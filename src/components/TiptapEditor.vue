<script setup>
import {onBeforeUnmount, ref, watch} from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import axios from "axios";
import Image from '@tiptap/extension-image'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:content'])


const editor = useEditor({
  extensions: [StarterKit,Image],
  content: props.content || '<p>写点什么吧</p>',
  onUpdate({ editor }) {
    emit('update:content', editor.getHTML())
  },
})

watch(
    () => props.content,
    (newContent) => {
      if (editor.value && newContent !== editor.value.getHTML()) {
        editor.value.commands.setContent(newContent)
      }
    }
)
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

const setHeading = (level) => {
  editor.value?.chain().focus().toggleHeading({ level }).run()
}

const toggleBold = () => {
  editor.value?.chain().focus().toggleBold().run()
}

const toggleItalic = () => {
  editor.value?.chain().focus().toggleItalic().run()
}

const toggleStrike = () => {
  editor.value?.chain().focus().toggleStrike().run()
}

const toggleBulletList = () => {
  editor.value?.chain().focus().toggleBulletList().run()
}

const toggleOrderedList = () => {
  editor.value?.chain().focus().toggleOrderedList().run()
}

const undo = () => {
  editor.value?.chain().focus().undo().run()
}

const redo = () => {
  editor.value?.chain().focus().redo().run()
}

const insertImage = async () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async () => {
    const file = input.files[0]
    if (file) {
      const url = await uploadImage(file)
      if (url) {
        editor.value.chain().focus().setImage({ src: url }).run()
      }
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
  <div class="editor-wrapper">
    <div class="toolbar">
      <button @click="setHeading(1)">H1</button>
      <button @click="setHeading(2)">H2</button>
      <button @click="toggleBold">加粗</button>
      <button @click="toggleItalic">斜体</button>
      <button @click="toggleStrike">删除线</button>
      <button @click="toggleBulletList">无序列表</button>
      <button @click="toggleOrderedList">有序列表</button>
      <button @click="undo">撤销</button>
      <button @click="redo">重做</button>
      <button @click="insertImage">插入图片</button>
    </div>
    <editor-content :editor="editor" class="editor-box" />
  </div>
</template>

<style scoped>
.editor-wrapper {
  height: 50vh;
  padding: 20px;
  border: 1px solid #d0e6ff;
  border-radius: 12px;
  background-color: #f5faff;
  max-width: 800px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.toolbar button {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  background-color: #e3f1ff;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toolbar button:hover {
  background-color: #c9e2ff;
}

.editor-box {
  min-height: 300px;
  max-height: 90%;
  overflow-y: scroll;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>
