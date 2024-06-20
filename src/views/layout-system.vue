<script setup>
import router from '@/router/index'
import { ref, onMounted } from 'vue'
import { useUserStore, useBorrowStore } from '@/stores'
import headPortrait from '@/components/head-portrait.vue'
import { zhCN, dateZhCN } from 'naive-ui'
import request from '@/utils/request'

const userStore = useUserStore()
const borrowStore = useBorrowStore()
const logined = ref(userStore.token === '')

onMounted(async () => {
  if (userStore.token !== '') {
    await borrowStore.getBorrowBooks(userStore.user.id)
  }
  await request.post('/admin/addClickCount')
})
const goLogin = () => {
  router.push('/login')
}

const logout = () => {
  userStore.removeToken()
  userStore.setUser({})
  borrowStore.setBorrowNum(0)
  borrowStore.setBorrowBooks()
  logined.value = userStore.token === ''
}

const goRecommend = () => {
  router.push('/recommend')
}
</script>

<template>
  <n-message-provider :locale="zhCN" :date-locale="dateZhCN">
    <div class="main1">
      <header class="header_home">
        <h2 class="Logo" @click="goRecommend">ddLibrary</h2>
        <nav class="navigation">
          <router-link to="/recommend">推荐</router-link>
          <router-link to="/allbooks">标签</router-link>
          <router-link to="/borrow">借阅</router-link>
          <router-link to="/favorite">收藏</router-link>
        </nav>
        <n-button class="login-button" @click="goLogin" v-if="logined">登录</n-button>
        <div class="rightBar" v-if="!logined">
          <headPortrait :userinfo="userStore.user" @logout="logout"></headPortrait>
        </div>
      </header>
      <hr class="header-hr" />
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!--      <div class="footer">-->
      <!--        <div class="rightFooter">-->
      <!--          <div class="FooterInfos">联系邮箱</div>-->
      <!--          <div class="FooterInfos">联系电话</div>-->
      <!--          <div class="FooterInfos">反馈</div>-->
      <!--          <div class="FooterInfos">管理</div>-->
      <!--          <div class="FooterInfos">@2023 ddLibrary.Inc</div>-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="footer">
        <div class="first">
          <a href="home.html">@2023 ddLibrary.Inc</a>
        </div>
        <div class="vect">
          <a href="#">推荐</a>
          <a href="#">分类</a>
          <a href="#">借阅</a>
          <a href="#">书架</a>
        </div>
        <div class="Us">
          <div>Contact Me</div>
          <div>Mail: wang2481724413@hotmail.com</div>
          <div>Phone: 400-512-422</div>
        </div>
      </div>
    </div>
  </n-message-provider>
</template>

<style lang="less" scoped>
.main1 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

.header-hr {
  width: 99vw;
  margin-top: 0;
  border: 1px #a3ccae solid;
  box-shadow: 0 0 32px 0 #282828;
}

.rightBar {
  position: absolute;
  top: 18px;
  right: 150px;
  cursor: pointer;
}

.header_home {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;

  .login-button {
    position: absolute;
    right: 150px;
  }
  .Logo {
    position: absolute;
    left: 8%;
    font-size: 36px;
    font-weight: 600;
    color: #1f6662;
    pointer-events: auto;
    height: 50px;
    cursor: pointer;
  }

  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .navigation a {
    width: 150px;
    font-size: 20px;
    text-decoration: none;
    color: #09203f;
    padding: 6px 30px;
    margin: 0 20px;
    font-weight: 500;
    text-align: center;
    border-radius: 30px;
  }
  .navigation a:hover {
    background-image: linear-gradient(#a3ccae -70%, #fff);
    color: #1f6662;
  }
}

a.router-link-active {
  background-image: linear-gradient(#a3ccae -50%, #fff);
  color: #1f6662;
  border-bottom: #1f6662 5px solid;
  border-radius: 30px;
}

recommend-view {
  border: #282828 2px solid;
}

.footer {
  margin-top: 30px;
  width: 100%;
  height: 150px;
  background: #cccccc;
  display: flex;
  flex-direction: row;
  .first {
    margin-top: 40px;
    position: absolute;
    left: 20%;
  }
  .vect {
    margin-top: 40px;
    position: absolute;
    left: 40%;
    display: flex;
    flex-direction: column;
  }
  .Us {
    margin-top: 40px;
    position: absolute;
    left: 67%;
  }
}
</style>
