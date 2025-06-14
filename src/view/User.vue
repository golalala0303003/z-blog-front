<script setup>
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import BlogTopBar from "../components/BlogTopBar.vue";
import SideBar from "../components/SideBar.vue";

const route = useRoute();
onMounted(() => {
  console.log("用户的id为"+route.params.id)
  //TODO根据id请求获得用户信息
})
</script>

<template>
  <BlogTopBar></BlogTopBar>
  <div class="main-container">
    <SideBar class="side-bar"></SideBar>
    <div class="content-container"></div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
}
.side-bar{
  width: 15vw;
  height: 89vh;
}
.content-container {
  width: 100%;
  background-color: #00fb1b;
}
</style>