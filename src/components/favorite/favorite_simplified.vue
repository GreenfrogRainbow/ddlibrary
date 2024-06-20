<script setup>
import CardAlterable from '@/components/card-alterable-test.vue'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores'
import { basePicURL } from '@/utils/request'
import { useMessage } from 'naive-ui'
const message = useMessage()
import request from '@/utils/request'
const userStore = useUserStore()

const favorite_list = ref([])
const getFavoSimp = async () => {
  const res = await request.get(`/favorite/getFavoList?user_id=${userStore.user.id}`)
  favorite_list.value = res.data.data
  if (favorite_list.value.length === 0) {
    message.info('您还没有创建过任何文件夹哦~')
  } else {
    for (let i = 0; i < favorite_list.value.length; i++) {
      const res = await request.get(
        `/favorite/getFavoSimp?favorite_id=${favorite_list.value[i].id}`
      )
      favorite_list.value[i].simpList = res.data.data
      if (favorite_list.value.length !== 0) {
        for (let j = 0; j < favorite_list.value[i].simpList.length; j++) {
          favorite_list.value[i].simpList[j].picLink =
            basePicURL + favorite_list.value[i].simpList[j].picLink
        }
      }
    }
  }
}
onMounted(async () => {
  await getFavoSimp()
})

const edit_id = ref(0)
const edit_title = ref('')
const edit_brief = ref('')
const popUpBox = ref(false)
const editFavo = (id, title, brief) => {
  popUpBox.value = true
  edit_id.value = id
  edit_title.value = title
  edit_brief.value = brief
  const coverBody = document.getElementsByClassName('slider')[0]
  coverBody.style.zIndex = 1
  coverBody.style.opacity = 0.3
}

const deleteFavo = async (favorite_id) => {
  const res = await request.post(`/favorite/deleteFavorite?favorite_id=${favorite_id}`)
  message.success(res.data.message)
  await getFavoSimp()
  closeButton()
}

const commitEdit = async () => {
  const res = await request.post(
    `/favorite/setFavorite?id=${edit_id.value}&title=${edit_title.value}&favorite_brief=${edit_brief.value}`
  )
  await getFavoSimp()
  await message.info(res.data.message)
  closeButton()
}
const closeButton = () => {
  popUpBox.value = false
  const coverBody = document.getElementsByClassName('slider')[0]
  coverBody.style.zIndex = -1
  coverBody.style.opacity = 0
}
import router from '@/router/index'
const goDetail = (id) => {
  router.push({
    name: 'favoriteCatalogue',
    params: { favoriteCatalogue: id }
  })
}
</script>

<template>
  <div class="simplified-body">
    <div class="favorite-items" v-for="item in favorite_list" :key="item.id">
      <div class="goods wrapper">
        <div class="title">
          <div class="left">
            <h3>{{ item.title }}</h3>
            <p>{{ item.favorite_brief }}</p>
          </div>
          <div class="right">
            <a href="#" class="edit" @click="editFavo(item.id, item.title, item.favorite_brief)"
              >编辑收藏夹</a
            >
            <a href="#" class="more" @click="goDetail(item.id)"
              >查看全部
              <span class="iconfont icon-arrow-right-bold"></span>
            </a>
          </div>
        </div>
        <div class="bd">
          <ul class="fir">
            <li v-for="item in item.simpList" :key="item.id">
              <card-alterable :item="item"></card-alterable>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="slider"></div>
  <div class="popUpBox" v-if="popUpBox">
    <div class="pages">
      <div class="popUpTitle">编辑收藏夹</div>
      <div class="subItems">
        <div class="subTitle">修改名称</div>
        <n-input v-model:value="edit_title" type="text" placeholder="有新名字了吗~" />
      </div>
      <div class="subItems">
        <div class="subItems">
          <div class="subTitle">修改简介</div>
          <n-input v-model:value="edit_brief" type="text" placeholder="禁止非主流~" />
        </div>
      </div>
      <div class="saveOrQuit">
        <n-button class="saveButton" @click="commitEdit" type="primary">保存</n-button>
        <n-popconfirm
          positive-text="确认"
          negative-text="取消"
          @positive-click="deleteFavo(edit_id)"
        >
          <template #trigger>
            <n-button type="error">删除</n-button>
          </template>
          确认删除吗？
        </n-popconfirm>
        <n-button class="cancelButton" @click="closeButton" type="info">取消</n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.simplified-body {
  width: 100%;
  min-height: 750px;
}
.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0;
  z-index: -1;
}
.popUpBox {
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: auto;
  border-radius: 5px;
  background-color: #fff;
  z-index: 10;
  .pages {
    padding: 10px;
    .popUpTitle {
      font-size: 20px;
      font-weight: 800;
    }
    .subItems {
      width: 100%;
      margin-top: 20px;
      .subTitle {
        margin-bottom: 5px;
      }
    }
    .saveOrQuit {
      margin-top: 20px;
      position: relative;
      left: 250px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .saveButton {
        margin-right: 20px;
      }
      .cancelButton {
        margin-left: 20px;
      }
    }
  }
}

.favorite-items {
  border-bottom: #dbecf4 5px solid;
  padding-bottom: 20px;
}

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
</style>
