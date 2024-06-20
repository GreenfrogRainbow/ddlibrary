<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import request from '@/utils/request'
import { basePicURL } from '@/utils/request'
import CardAlterable from '@/components/card-alterable.vue'
const router = useRouter()
const tag = router.currentRoute.value.params.tag

const page = ref(1)
const maxPage = ref(0)
const currentData = ref([])
onMounted(async () => {
  const res = await request.get(`/tags/getBooksByTag?tag=${tag}&page=${page.value - 1}`)
  currentData.value = res.data.data
  for (let i = 0; i < currentData.value.length; i++) {
    currentData.value[i].picLink = basePicURL + currentData.value[i].picLink
  }
})
onMounted(async () => {
  const res = await request.get(`/tags/getPagesByTag?tag=${tag}`)
  const num = res.data.data
  maxPage.value = parseInt(num / 25) + 1
})
watch(page, async () => {
  const res = await request.get(`/tags/getBooksByTag?tag=${tag}&page=${page.value - 1}`)
  currentData.value = res.data.data
  for (let i = 0; i < currentData.value.length; i++) {
    currentData.value[i].picLink = basePicURL + currentData.value[i].picLink
  }
})
</script>

<template>
  <div class="AllBooks">
    <div class="tag-title">{{ tag }}</div>
    <div class="bd">
      <ul>
        <li v-for="item in currentData" :key="item.id">
          <card-alterable :item="item"></card-alterable>
        </li>
      </ul>
    </div>
    <div class="page-bar">
      <n-pagination v-model:page="page" :page-count="maxPage" />
    </div>
  </div>
</template>

<style scoped>
.AllBooks {
  width: 1520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tag-title {
    margin-top: 10px;
    font-weight: 700;
    font-size: 30px;
  }
  .bd {
    width: 1520px;
  }
  .bd ul {
    max-width: 1520px;
    min-width: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .bd li {
    margin-top: 40px;
    width: 304px;
    height: 404px;
    flex-shrink: 0;
    overflow: auto;
    background-color: #fff;
  }
  .page-bar {
    margin-top: 30px;
  }
}
</style>
