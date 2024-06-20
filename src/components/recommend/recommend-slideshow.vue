<template>
  <div class="news">
    <div class="slide">
      <n-carousel show-arrow autoplay style="width: 100%; height: 350px">
        <img
          class="carousel-img"
          v-for="item in recommendList"
          :key="item.id"
          :src="item.pic"
          @click="getBookDetail(item.book_id)"
          style="cursor: pointer"
        />
        <template #arrow="{ prev, next }">
          <div class="custom-arrow">
            <button type="button" class="custom-arrow--left" @click="prev">
              <n-icon><ArrowBack /></n-icon>
            </button>
            <button type="button" class="custom-arrow--right" @click="next">
              <n-icon><ArrowForward /></n-icon>
            </button>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li
              v-for="index of total"
              :key="index"
              :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>
    </div>
    <el-card class="box-card">
      <el-scrollbar height="300px">
        <div
          v-for="item in newsList"
          :key="item.id"
          class="scrollbar-demo-item"
          @click="openNews(item)"
        >
          <div class="newsTitle">{{ item.title }}</div>
          <div class="time">{{ item.time }}</div>
        </div>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script setup>
import { ArrowBack, ArrowForward } from '@vicons/ionicons5'
import router from '@/router/index'
import { onMounted, ref } from 'vue'
import request from '@/utils/request'

const emit = defineEmits(['openNews'])
const newsList = ref([])

const openNews = (val) => {
  emit('openNews', val)
}
const getBookDetail = (val) => {
  router.push(`/details?id=${val}`)
}

const recommendList = ref([])
onMounted(async () => {
  const res = await request.get('/admin/getRecommendSlide')
  recommendList.value = res.data.data
  const res1 = await request.get('/admin/getNews')
  newsList.value = res1.data.data
})
</script>

<style scoped>
.news {
  display: flex;
  height: 400px;
  width: 70%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  .slide {
    width: 65%;
    height: 350px;
  }
}

.carousel-img {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition:
    width 0.3s,
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}

.box-card {
  background-color: #a3ccae66;
  width: 400px;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #f2f2f2;
  color: #282828;
  justify-content: space-around;
  cursor: pointer;
  .newsTitle {
    width: 60%;
  }
  .time {
    width: 35%;
  }
  &:hover {
    color: #fff;
    background-color: #a3ccaeff;
  }
}
</style>
<script setup></script>
