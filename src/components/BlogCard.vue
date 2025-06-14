<script setup>

const props = defineProps({
  blog:Object
})

import {ref} from "vue";
const isLiked = ref(false);
const animate = ref(false);
function toggleLike(){
  isLiked.value = !isLiked.value;
  animate.value = true;
  setTimeout(() => animate.value = false, 300);
}

import {useRouter} from "vue-router";
const router = useRouter();
function handleClickBlogCard(){
  console.log("发生了点击blogCard,准备跳转");
  router.push(`/blog/${props.blog.id}`);
}
</script>

<template>
  <div class="blog-card" @click="handleClickBlogCard">
    <div class="blog-info">
      <div class="blog-title">{{blog.title}}</div>
      <div class="blog-writer">{{blog.writer}}</div>
    </div>

    <div class="text-info">
      <img v-bind:src="blog.img" alt="pic not found" class="blog-img">
      <div class="blog-abstract">{{blog.abstract}}</div>
    </div>

    <div class="react-info">
      <div class="create-time">{{blog.createTime}}</div>
      <div class="blog-comment">
        <img src="/comment.svg" alt="comment icon" class="icon" />
        {{blog.comment}}
      </div>
      <div class="blog-like" @click.stop="toggleLike">
        <svg
            class="icon heart"
            :class="{ liked: isLiked, animate: animate }"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
            version="1.1"
            id="svg1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg">
          <defs
              id="defs1" />
          <path
              d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
              id="path1"
          />
          <path
              style="stroke-width:0.0294479"
              d="M 11.17546,17.530756 C 9.1963989,15.726026 7.3221311,13.893445 6.4374847,12.89816 4.7221477,10.968294 4.0823408,9.747474 4.0299327,8.3042945 4.0115343,7.7976507 4.0559118,7.426826 4.1832311,7.0233129 4.5457364,5.8744241 5.5199345,4.9996268 6.7288344,4.7374462 c 0.3532964,-0.076621 1.1788917,-0.07651 1.5312883,2.061e-4 0.8776756,0.191069 1.7150786,0.6918589 2.2376253,1.3381611 0.133537,0.1651632 0.266411,0.3772405 0.375876,0.5999268 L 11.042945,7.020192 12,7.0212816 l 0.957055,0.00109 0.132516,-0.2864711 c 0.447663,-0.9677574 1.47509,-1.7424045 2.650306,-1.9982478 0.352397,-0.076716 1.177992,-0.076827 1.531289,-2.061e-4 0.695474,0.1508313 1.235185,0.4487404 1.737423,0.9590209 0.693919,0.7050308 1.000391,1.5362787 0.961478,2.6078274 -0.05247,1.4448951 -0.682635,2.6479971 -2.406188,4.5938651 -0.52698,0.594952 -2.568137,2.631178 -3.531977,3.523443 -0.910464,0.842853 -2.001283,1.833532 -2.028027,1.84185 -0.01023,0.0032 -0.383016,-0.326532 -0.828415,-0.732697 z"
              id="path2"
              class="heart-inside"
              :class="{ liked: isLiked,animate: animate }"
              transform="matrix(40,0,0,40,0,-960)"
          />
        </svg>
        {{blog.like}}
      </div>
    </div>

  </div>
</template>

<style scoped>
.blog-card {
  user-select: none;

  margin-bottom: 10px;
  padding-left: 15px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}
.blog-card:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}


.blog-info{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.blog-title{
  font-size: 2rem;
  font-weight: bold;
}
.blog-writer{
  margin-right: 1rem;
}


.text-info{
  display: flex;
  flex-direction: row;
  justify-content: start;

  margin-top: 1vh;
}
.blog-img{
  width: 10%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}
.blog-abstract{
  margin-left:10px;
}


.react-info{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin-top: 1vh;
  margin-bottom: 1vh;
}
.create-time{
  padding: 0.3rem;
}
.blog-comment{
  display: flex;
  align-items: center;

  padding: 0.5rem;
  background-color: #e1e1e1;
  border-radius: 50px;

  margin-left: 15px;

}
.blog-comment:hover{
  background-color: #d5d5d5;
}
.blog-like{
  display: flex;
  align-items: center;

  padding: 0.5rem;
  margin-right: 1rem;
  background-color: #e1e1e1;
  border-radius: 50px;

  margin-left: 15px;
}
.blog-like:hover{
  background-color: #d5d5d5;
}

.heart {
  transition: transform 0.3s ease, fill 0.3s ease;
  fill: #1f1f1f;
  cursor: pointer;
}
.heart.liked {
  fill: red;
}
.heart.animate {
  transform: scale(1.4);
}
.heart-inside{
  fill: #e1e1e1;
}
.heart-inside.liked {
  fill:red
}
</style>