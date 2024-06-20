<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import request from '@/utils/request'
import { basePicURL } from '@/utils/request'
import CardAlterable from '@/components/card-alterable.vue'
import { useMessage } from 'naive-ui'
const message = useMessage()
const router = useRouter()
const favorite_id = ref(router.currentRoute.value.params.favoriteCatalogue)
const favorite_infos = ref({})

const currentData = ref([])

const updateSearchResults = async () => {
  favorite_id.value = router.currentRoute.value.params.favoriteCatalogue
  const res = await request.get(`/favorite/getFavoDetail?favorite_id=${favorite_id.value}`)
  currentData.value = res.data.data
  for (let i = 0; i < currentData.value.length; i++) {
    currentData.value[i].picLink = basePicURL + currentData.value[i].picLink
  }
  if (res.data.message !== '查找成功') {
    message.info(res.data.message)
  }
}
onMounted(async () => {
  const res = await request.get(`/favorite/getFavoInfos?favorite_id=${favorite_id.value}`)
  favorite_infos.value = res.data.data
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
    <div class="favoInfos">
      <div class="title">{{ favorite_infos.title }}</div>
      <div class="brief">{{ favorite_infos.favorite_brief }}</div>
    </div>
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
  .favoInfos {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      position: relative;
      left: -700px;
      font-size: 30px;
      font-weight: 800;
    }
    .brief {
      position: relative;
      left: -600px;
      font-size: 20px;
      font-weight: 300;
    }
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
