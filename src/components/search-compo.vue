<template>
  <span class="search">
    <n-select
      v-model:value="value"
      filterable
      placeholder="搜索"
      :options="options"
      :loading="loading"
      clearable
      remote
      @search="handleSearch"
      size="large"
    />
    <n-button size="large" @click="search">搜索</n-button>
  </span>
</template>

<script setup>
import { ref } from 'vue'
import request from '@/utils/request'
import router from '@/router/index'

const loadingRef = ref(false)
const optionsRef = ref([])

const value = ref(null)
const loading = loadingRef.value
const options = ref(optionsRef.value)
const handleSearch = async (query) => {
  if (!query.length) {
    optionsRef.value = []
    return
  }
  loadingRef.value = true
  const res = await request.get(`/search/getBooksResult?search_key=${query}`)
  options.value = res.data.data
  value.value = query
  loadingRef.value = false
}

const search = async () => {
  await router.push(`/searchresults?search_key=${value.value}`)
}
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
