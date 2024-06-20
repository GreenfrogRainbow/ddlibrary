<template>
  <el-upload
    :auto-upload="false"
    class="avatar-uploader"
    :show-file-list="false"
    :on-change="onSelectFile"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const imageUrl = ref('')

const onSelectFile = (uploadFile) => {
  // 图片预览1
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // 图片预览2
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
</script>

<style scoped></style>

<style></style>
