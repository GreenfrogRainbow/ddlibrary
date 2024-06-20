<script setup>
import CardAlterable from '@/components/card-alterable.vue'
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import { basePicURL } from '@/utils/request'
import router from '@/router/index'

const secBool = ref(false)
const list1 = ref([])
const list2 = ref([])

onMounted(async () => {
  const res = await request.get('/recommend/getRecommendYouthList')
  const listHelp = res.data.data
  for (let i = 0; i < 4; i++) {
    list2.value.push(listHelp[i + 4])
  }
  for (let i = 0; i < 5; i++) {
    list1.value.push(listHelp[i])
  }
  for (let i = 0; i < 4; i++) {
    list1.value[i].picLink = basePicURL + list1.value[i].picLink
    list2.value[i].picLink = basePicURL + list2.value[i].picLink
  }
})

const goAll = () => {
  router.push('/allbooks/青春')
}
</script>

<template>
  <div class="goods wrapper">
    <div class="title">
      <div class="left">
        <h3>青春</h3>
        <p>品味人生</p>
      </div>
      <div class="right">
        <a href="#" class="more" @click="goAll"
          >查看全部
          <span class="iconfont icon-arrow-right-bold"></span>
        </a>
      </div>
    </div>
    <div class="bd">
      <ul class="fir">
        <li v-for="item in list1" :key="item.id">
          <card-alterable :item="item"></card-alterable>
        </li>
      </ul>

      <ul class="sec" v-if="secBool">
        <li v-for="item in list2" :key="item.id">
          <card-alterable :item="item"></card-alterable>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.goods {
  width: 1520px;
}

.goods .bd ul {
  max-width: 1520px;
  min-width: 0;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
}

.goods .bd li {
  width: 304px;
  height: 404px;
  flex-shrink: 0;
  background-color: #fff;
}

.goods .bd li h4 {
  margin-top: 17px;
  margin-bottom: 8px;
  font-size: 20px;
}

.goods .bd li p {
  font-size: 18px;
  color: #aa2113;
}

.goods .bd li p span {
  font-size: 22px;
}

.sec {
  margin-top: 40px;
}
</style>
