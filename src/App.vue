<script setup></script>

<template>
  <div class="home">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/common/reset.css';
@import url('https://fonts.font.im/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
.home {
  font-family: '华文细黑', 'Poppins', '微软雅黑 Light', Alimama-fangyuan, serif;
}
</style>
