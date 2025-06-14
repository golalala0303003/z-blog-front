<script setup>
import BlogCard from "./BlogCard.vue";
const blogList = [
  {id:"10",
    title:"这是第一个测试标题",
    img:"https://zr-sky-take-out.oss-cn-hangzhou.aliyuncs.com/d098beae-9767-4efa-bda6-8dbf92a8e169.jpg",
    abstract:"这个是简介",
    writer:"zrr",
    createTime:"2020-03-01",
    comment:"10",
    like:"2"
  },
  {id:"11",title:"这是第2个测试标题",
    img:"https://zr-sky-take-out.oss-cn-hangzhou.aliyuncs.com/d098beae-9767-4efa-bda6-8dbf92a8e169.jpg",
    abstract:"这个是简介",
    writer:"zrr",
    createTime:"2020-03-01",
    comment:"10",
    like:"2"
  },
  {id:"12",
    title:"这是第3个测试标题",
    img:"https://zr-sky-take-out.oss-cn-hangzhou.aliyuncs.com/d098beae-9767-4efa-bda6-8dbf92a8e169.jpg",
    abstract:"这个是简介",
    writer:"zrr",
    createTime:"2020-03-01",
    comment:"10",
    like:"2"
  },
  {id:"13",
    title:"这是第4个测试标题",
    img:"https://zr-sky-take-out.oss-cn-hangzhou.aliyuncs.com/d098beae-9767-4efa-bda6-8dbf92a8e169.jpg",
    abstract:"这个是简介",
    writer:"zrr",
    createTime:"2020-03-01",
    comment:"10",
    like:"2"
  },
  {id:"14",
    title:"这是第5个测试标题",
    img:"https://zr-sky-take-out.oss-cn-hangzhou.aliyuncs.com/d098beae-9767-4efa-bda6-8dbf92a8e169.jpg",
    abstract:"这个是简介",
    writer:"zrr",
    createTime:"2020-03-01",
    comment:"10",
    like:"2"
  }
]
</script>

<template>
  <div class="blog-list">
    <div class="blog-list-item" v-for="blog in blogList" :key="blog.title">
      <BlogCard :blog="blog"></BlogCard>
    </div>
  </div>
</template>

<style scoped>
.blog-list{
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  /* 隐藏滚动条的关键代码 */
  scrollbar-width: none;       /* Firefox */
  -ms-overflow-style: none;    /* IE 10+ */
}
.blog-list::-webkit-scrollbar {
  display: none;               /* Chrome、Safari */
}
.blog-list-item{
  margin-top: 0.3rem;
  margin-right: 1rem;

  border-top: 1px solid #ccc; /* 添加一条淡淡的灰色分割线 */
  padding-top: 2px; /* 分割线与内容之间留出一点距离 */
}
.blog-list-item:first-child {
  border-top: none; /* 第一个不加分割线 */
  padding-top: 0;
}
</style>