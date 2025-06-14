<template>
  <header class="container">
    <div class="header-left">
      <div class="title">
        <span class="logo-letter">Z</span>-Blog
      </div>
    </div>

    <div class="header-center">
      <input class="search-input" type="text" placeholder="搜索博客..." />
      <button class="search-btn">🔍</button>
    </div>

    <div class="header-right">
      <!-- 预留区域：将来可加登录按钮、头像等 -->
    </div>
  </header>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  padding: 1rem 2rem;
  position: relative;
}

.header-left {
  flex: 1;
}

.header-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #333;
  display: flex;
  align-items: center;
}

.logo-letter {
  background: linear-gradient(135deg, #6369ff, #a362ff);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  margin-right: 0.5rem;
  font-size: 3.2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.search-input {
  padding: 0.4rem 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  outline: none;
  width: 250px;
}

.search-btn {
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  background-color: #6369ff;
  color: white;
  border: none;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #4a50e0;
}
</style>
