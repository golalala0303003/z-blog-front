<script setup>
import TopBar from "../components/TopBar.vue";
import SideBar from "../components/SideBar.vue";
import BlogList from "../components/BlogList.vue";
import UserColumn from "../components/UserColumn.vue";
</script>

<template>
  <TopBar class="top-bar" ></TopBar>
  <div class="content-container">
    <SideBar class="side-bar" ></SideBar>
    <BlogList class="blog-list"></BlogList>
    <UserColumn class="user-column"></UserColumn>
  </div>

</template>

<style scoped>
.top-bar {
  height: 7vh;
}
.content-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.side-bar{
  width: 15vw;
  height: 89vh;
}
.blog-list{
  height:89vh;
  width:45vw;
  margin-left:1vw;
  margin-right:1vw;
}
.user-column{
  margin-top:2vh;
  margin-right:3vh;
  width:15vw;
  height:40vh;
}
</style>