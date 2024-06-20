<script setup>
import recommendSlideshow from '@/components/recommend/recommend-slideshow.vue'
import recommendLatest from '@/components/recommend/recommend-latest.vue'
import recommendLiterature from '@/components/recommend/recomend-literature.vue'
import recommendForeignLiterature from '@/components/recommend/recomend-foreign-literature.vue'
import recommendSuspense from '@/components/recommend/recomend-suspense.vue'
import recommendFiction from '@/components/recommend/recomend-fiction.vue'
import recommendHunmanity from '@/components/recommend/recomend-humanity.vue'
import recommendBiography from '@/components/recommend/recomend-biography.vue'
import recommendMasterwork from '@/components/recommend/recomend-masterwork.vue'
import recommendYouth from '@/components/recommend/recomend-youth.vue'
import recommendEconomics from '@/components/recommend/recomend-economics.vue'
import recommendBizarre from '@/components/recommend/recomend-bizarre.vue'
import recommendScienceFiction from '@/components/recommend/recomend-science-fiction.vue'
import recommendPeotry from '@/components/recommend/recomend-peotry.vue'
import recommendArt from '@/components/recommend/recomend-art.vue'
import { ref } from 'vue'
import searchCompo from '@/components/search-compo.vue'
import request from '@/utils/request'

const popUpBool = ref(false)
const aimNewsTitle = ref('')
const aimNewsContent = ref(``)
const closePopUpBox = () => {
  popUpBool.value = false
}
const openNewsBox = (item) => {
  aimNewsTitle.value = item.title
  aimNewsContent.value = item.content
  popUpBool.value = true
}
</script>

<template>
  <div class="popUp" v-if="popUpBool">
    <div class="popUpNewsTitle">{{ aimNewsTitle }}</div>
    <div class="closeButton" @click="closePopUpBox">×</div>
    <div class="newsContent">
      <el-scrollbar height="550px">
        {{ aimNewsContent }}
      </el-scrollbar>
    </div>
  </div>
  <div class="search">
    <search-compo></search-compo>
  </div>
  <recommend-slideshow @openNews="openNewsBox"></recommend-slideshow>
  <recommend-latest></recommend-latest>
  <recommend-literature></recommend-literature>
  <recommend-fiction></recommend-fiction>
  <recommend-masterwork></recommend-masterwork>
  <recommend-suspense></recommend-suspense>
  <recommend-hunmanity></recommend-hunmanity>
  <recommend-foreign-literature></recommend-foreign-literature>
  <recommend-youth></recommend-youth>
  <recommend-biography></recommend-biography>
  <recommend-art></recommend-art>
  <recommend-economics></recommend-economics>
  <recommend-bizarre></recommend-bizarre>
  <recommend-peotry></recommend-peotry>
  <recommend-science-fiction></recommend-science-fiction>
</template>

<style scoped>
recommend-latest {
  max-width: 1520px;
}
.popUp {
  width: 90%;
  height: 80%;
  border-radius: 3%;
  background-color: #f2f2f2;
  position: fixed;
  left: 5%;
  top: 10%;
  z-index: 10;
  padding: 50px;
  .popUpNewsTitle {
    font-size: 30px;
  }
  .newsContent {
    margin-top: 20px;
    text-overflow: ellipsis;
    white-space: pre-wrap;
  }
  .closeButton {
    position: fixed;
    right: 140px;
    top: 110px;
    font-size: 50px;
    cursor: pointer;
  }
}
.search {
  width: 600px;
  height: 60px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
