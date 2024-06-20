<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import request from '@/utils/request'
import { basePicURL } from '@/utils/request'
import CardAlterable from '@/components/card-alterable.vue'
import searchCompo from '@/components/search-compo.vue'
import { useMessage } from 'naive-ui'
const message = useMessage()
const router = useRouter()
const search_key = ref(router.currentRoute.value.query.search_key)

const currentData = ref([])

const updateSearchResults = async () => {
  search_key.value = router.currentRoute.value.query.search_key
  const res = await request.get(`/search/getBooksResults?search_key=${search_key.value}`)
  currentData.value = res.data.data
  for (let i = 0; i < currentData.value.length; i++) {
    currentData.value[i].picLink = basePicURL + currentData.value[i].picLink
  }
  if (res.data.message !== '查找成功') {
    message.info(res.data.message)
  }
}
onMounted(async () => {
  await updateSearchResults()
})

watch(
  () => router.currentRoute.value.path,
  () => {
    updateSearchResults()
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div class="AllBooks">
    <div class="search-title"><search-compo></search-compo></div>
    <div class="bd">
      <ul>
        <li v-for="item in currentData" :key="item.id">
          <card-alterable :item="item"></card-alterable>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.AllBooks {
  width: 1520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 800px;
  .search-title {
    width: 600px;
    height: 60px;
    margin-top: 30px;
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
    margin-top: 30px;
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
