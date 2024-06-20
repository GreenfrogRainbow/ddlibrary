<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-avatar
      round
      :size="40"
      :src="userStore.user.user_pic"
      class="login-button"
      @click="goUserCenter"
    />
  </n-dropdown>
</template>

<script setup>
import { h, ref, watch } from 'vue'
import { useMessage, NAvatar, NText } from 'naive-ui'
import router from '@/router'
import { baseURL } from '@/utils/request'

import { useUserStore, useBorrowStore } from '@/stores'
const userStore = useUserStore()
const borrowStore = useBorrowStore()

const props = defineProps({
  userinfo: Object
})

const picSrc = ref('/source/userPicDefault.jpg')
picSrc.value = baseURL + picSrc.value

const emit = defineEmits(['logout'])

function renderCustomHeader() {
  return h(
    'div',
    {
      style: 'display: flex; align-items: center; padding: 8px 12px;'
    },
    [
      h(NAvatar, {
        round: true,
        style: 'margin-right: 12px;',
        src: userStore.user.user_pic
      }),
      h('div', null, [
        h('div', null, [h(NText, { depth: 2 }, { default: () => props.userinfo.nickname })]),
        h('div', { style: 'font-size: 12px;' }, [
          h(NText, { depth: 3 }, { default: () => '心中有党，前途理想' })
        ])
      ])
    ]
  )
}

const message = useMessage()

const options = ref([
  {
    key: 'header',
    type: 'render',
    render: renderCustomHeader
  },
  {
    key: 'header-divider',
    type: 'divider'
  },
  {
    value: 'borrow_num',
    label: '借阅数量：' + borrowStore.borrow_num,
    key: '瞎编的~'
  },
  {
    label: '个人收藏',
    key: '哦~~~'
  },
  {
    label: '注销',
    key: 'stmt3'
  }
])
watch(borrowStore.borrow_num, () => {
  for (let i = 0; i < options.value.length; i++) {
    if (options.value[i].value === 'borrow_num') {
      options.value[i].label = '借阅数量：' + borrowStore.borrow_num
    }
  }
})

const handleSelect = (key) => {
  if (key === 'stmt3') {
    emit('logout')
    message.info('欢迎下次光临~')
  }
}

const goUserCenter = () => {
  router.push('/user-center')
}
</script>
