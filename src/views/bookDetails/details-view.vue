<script setup>
import request from '@/utils/request'
import { ref, onMounted } from 'vue'
import moment from 'moment'
import { useUserStore } from '@/stores'
import { AddCircle, FlashOutline } from '@vicons/ionicons5'
const userStore = useUserStore()

moment.locale('zh-cn', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MM月DD日',
    LLL: 'YYYY年MM月DD日Ah点mm分',
    LLLL: 'YYYY年MM月DD日ddddAh点mm分',
    l: 'YYYY-M-D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour, meridiem) {
    if (hour === 12) {
      hour = 0
    }
    if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
      return hour
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12
    }
  },
  meridiem: function (hour, minute) {
    const hm = hour * 100 + minute
    if (hm < 600) {
      return '凌晨'
    } else if (hm < 900) {
      return '早上'
    } else if (hm < 1130) {
      return '上午'
    } else if (hm < 1230) {
      return '中午'
    } else if (hm < 1800) {
      return '下午'
    } else {
      return '晚上'
    }
  },
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek: '[下]ddddLT',
    lastDay: '[昨天]LT',
    lastWeek: '[上]ddddLT',
    sameElse: 'L'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日'
      case 'M':
        return number + '月'
      case 'w':
      case 'W':
        return number + '周'
      default:
        return number
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年'
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
})

// 获取路径中参数
import { useRouter } from 'vue-router'
import { basePicURL } from '@/utils/request'

const router = useRouter()

const bookInfo = ref({})

onMounted(async () => {
  const zhen = ['平装', '精装']
  const bookId = router.currentRoute.value.query.id
  const res = await request.get(`/tags/getSingleById?id=${bookId}`)
  bookInfo.value = res.data.data
  bookInfo.value.picLink = basePicURL + bookInfo.value.picLink
  bookInfo.value.pages = 442
  bookInfo.value.zhuangzhen = zhen[bookInfo.value.title.length % 2]
  let score = 7.0
  if (bookInfo.value.scor !== null) {
    console.log(bookInfo.value.scor)
    score = parseFloat(bookInfo.value.scor)
    console.log(score)
  }
  valueData.value[0].value = parseInt((score * 1000 + 300).toFixed(0))
  valueData.value[1].value = parseInt((score * 50 + 2000).toFixed(0))
  valueData.value[2].value = parseInt((score * 30 + 500).toFixed(0))
  valueData.value[3].value = parseInt((score * 10 + 500).toFixed(0))
  valueData.value[4].value = parseInt((score * 5 + 500).toFixed(0))

  avgScore.value = parseFloat(
    (
      (valueData.value[0].value * 10 +
        valueData.value[1].value * 8 +
        valueData.value[2].value * 6 +
        valueData.value[3].value * 4 +
        valueData.value[4].value * 2) /
      (valueData.value[0].value +
        valueData.value[1].value +
        valueData.value[2].value +
        valueData.value[3].value +
        valueData.value[4].value)
    ).toFixed(1)
  )

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'))
  // 绘制图表
  myChart.setOption({
    series: [
      {
        type: 'pie',
        data: valueData.value,
        emphasis: {
          focus: 'item',
          label: {
            show: true,
            formatter: function (param) {
              return param.data.name + ': ' + param.data.value + '人'
            },
            position: 'top'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
})

// 图表
import * as echarts from 'echarts'
const avgScore = ref(0)
const valueData = ref([
  {
    value: 0,
    name: '10分'
  },
  {
    value: 0,
    name: '8分'
  },
  {
    value: 0,
    name: '6分'
  },
  {
    value: 0,
    name: '4分'
  },
  {
    value: 0,
    name: '2分'
  }
])

// 1372003014426 -- 1692003014426
const comment_data = ref({})
onMounted(async () => {
  const bookId = router.currentRoute.value.query.id
  const res = await request.get(`/comment/getComment?book_id=${bookId}`)
  comment_data.value = res.data.data
  if (comment_data.value !== null) {
    for (let i = 0; i < 5; i++) {
      comment_data.value[i].comment_time = parseInt(comment_data.value[i].comment_time)
      comment_data.value[i].comment_time = new Date(comment_data.value[i].comment_time)
      comment_data.value[i].comment_time = moment(comment_data.value[i].comment_time).format('LLLL')
    }
  }
})

// 新评论
import { useMessage } from 'naive-ui'
const message = useMessage()
const newCommentValue = ref('')
const newCommentScore = ref(0)
const updateOrSubmit = ref('提交')
const updateID = ref(0)
const addNewCommit = () => {
  if (updateOrSubmit.value === '提交') {
    if (newCommentValue.value === '') return message.info('评论内容不能为空')
    const score = newCommentScore.value
    const book_id = router.currentRoute.value.query.id
    const commenter_id = userStore.user.id
    const commenter_nickname = userStore.user.nickname
    const comment_time = Date.now()
    const content = newCommentValue.value
    request.post('/comment/addComment', {
      score,
      book_id,
      commenter_id,
      commenter_nickname,
      comment_time,
      content
    })
    message.success('点评成功')
    router.go(0)
  } else {
    if (newCommentValue.value === '') return message.info('评论内容不能为空')
    const id = updateID.value
    const score = newCommentScore.value
    const book_id = router.currentRoute.value.query.id
    const commenter_id = userStore.user.id
    const commenter_nickname = userStore.user.nickname
    const comment_time = Date.now()
    const content = newCommentValue.value
    request.post('/comment/updateComment', {
      id,
      score,
      book_id,
      commenter_id,
      commenter_nickname,
      comment_time,
      content
    })
    message.success('更新成功')
    router.go(0)
  }
}

const handlePositiveClick = (id) => {
  //删除确认
  request.post('/comment/deleteComment', { id })
  message.info('删除成功')
  router.go(0)
}
const editComment = ref(null)
const editCommentFunc = (id, content, score) => {
  newCommentValue.value = content
  newCommentScore.value = score
  updateOrSubmit.value = '更新'
  updateID.value = id
  editComment.value.focus()
}
const popUpBox = ref(false)
const newFavoTitle = ref('')
const favosOptions = ref([])
const favosValue = ref('')

const addNewFavo = async () => {
  if (newFavoTitle.value !== '') {
    const res = await request.post(`/favorite/addNewFavo?newFavoTitle=${newFavoTitle.value}`)
    await getFavosOptions()
    message.success(res.data.message)
  } else {
    message.error('不能为空哦~')
  }
}

const getFavosOptions = async () => {
  const res = await request.get(`/favorite/getFavoTitleList?user_id=${userStore.user.id}`)
  favosOptions.value = res.data.data
}
const addIntoFavoriteFunc = async () => {
  await getFavosOptions()
  popUpBox.value = true
  const coverBody = document.getElementsByClassName('slider')[0]
  coverBody.style.zIndex = 1
  coverBody.style.opacity = 0.3
}

const closeButton = () => {
  popUpBox.value = false
  const coverBody = document.getElementsByClassName('slider')[0]
  coverBody.style.zIndex = -1
  coverBody.style.opacity = 0
}
const commitFavorite = async () => {
  const bookId = router.currentRoute.value.query.id
  const res = await request.post(
    `/favorite/addNewBook?book_id=${bookId}&favorite_id=${favosValue.value}`
  )
  message.success(res.data.message)
  closeButton()
}
</script>

<template>
  <div class="bookDetails">
    <div class="bookTitle">
      {{ bookInfo.title }}
    </div>
    <div class="bookBasicInfo">
      <div class="bookInfo">
        <div class="bookImg">
          <img :src="bookInfo.picLink" alt="正在加急补充~~~" />
        </div>
        <div class="infos">
          <div class="subItems" v-if="bookInfo.author !== ''">作者：{{ bookInfo.author }}</div>
          <div class="subItems" v-if="bookInfo.price !== ''">价格：{{ bookInfo.price }}</div>
          <div class="subItems" v-if="bookInfo.time !== ''">出版时间：{{ bookInfo.time }}</div>
          <div class="subItems" v-if="bookInfo.publish !== ''">出版社：{{ bookInfo.publish }}</div>
          <div class="subItems" v-if="bookInfo.yizhe !== ''">译者：{{ bookInfo.yizhe }}</div>
          <div class="subItems">页数：{{ bookInfo.pages }}</div>
          <div class="subItems">装帧：{{ bookInfo.zhuangzhen }}</div>
          <div class="subItems" v-if="bookInfo.ISBN !== ''">ISBN：{{ bookInfo.ISBN }}</div>
        </div>
      </div>
      <div class="bookScore">
        <div class="ScoreTitle">评分</div>
        <div class="avgScore">
          <div class="scoreNumber">{{ avgScore }}</div>
          <n-rate allow-half readonly :value="avgScore / 2" />
        </div>
        <div class="chartBox" style="width: 90%; height: 75%">
          <div id="main" style="width: 100%; height: 100%"></div>
        </div>
      </div>
    </div>
    <div class="bookBrief">
      <div class="BriefTitle">图书简介</div>
      <div class="content">{{ bookInfo.brief }}</div>
    </div>
    <div class="comment">
      <div class="commentTitle">图书评论</div>
      <n-timeline>
        <n-timeline-item type="info" v-for="item in comment_data" :key="item.id">
          <div class="commentItems">
            <div class="commentInfos">
              <div class="commenter">{{ item.commenter_nickname }}</div>
              <div class="scoreBox">
                <n-rate size="small" allow-half readonly :default-value="item.score" />
              </div>
              <div class="commentTime">
                {{ item.comment_time }}
              </div>
              <div
                class="editComment"
                v-if="item.commenter_id === userStore.user.id"
                @click="editCommentFunc(item.id, item.content, item.score)"
              >
                编辑
              </div>
              <div class="deleteComment" v-if="item.commenter_id === userStore.user.id">
                <n-popconfirm
                  positive-text="确认"
                  negative-text="取消"
                  @positive-click="handlePositiveClick(item.id)"
                >
                  <template #trigger>
                    <n-button>×</n-button>
                  </template>
                  确认删除吗？
                </n-popconfirm>
              </div>
            </div>
            <div class="commentContent">{{ item.content }}</div>
          </div>
        </n-timeline-item>
        <n-timeline-item type="info" line-type="dashed">
          <div class="commentItems">
            <div class="topInfo">
              <n-space vertical>
                <n-input
                  ref="editComment"
                  v-model:value="newCommentValue"
                  type="textarea"
                  placeholder="欢迎添加书评~"
                  :autosize="{
                    minRows: 3
                  }"
                />
              </n-space>
            </div>
            <div class="bottomInfo">
              <n-rate
                size="small"
                :default-value="newCommentScore"
                v-model:value="newCommentScore"
              />
              <n-button round type="warning" @click="addNewCommit">{{ updateOrSubmit }}</n-button>
            </div>
          </div>
        </n-timeline-item>
        <n-timeline-item />
      </n-timeline>
    </div>
  </div>
  <div class="slider"></div>
  <div class="addIntoFavorite">
    <n-button type="primary" @click="addIntoFavoriteFunc">添加收藏</n-button>
  </div>
  <div class="popUpBox" v-if="popUpBox">
    <div class="pages">
      <div class="popUpTitle">添加进入收藏夹</div>
      <div class="subItems">
        <div class="subTitle">创建新收藏夹</div>
        <div class="addNewFavo">
          <n-input v-model:value="newFavoTitle" type="text" placeholder="新收藏夹~" />
          <n-button type="primary" @click="addNewFavo">点击添加</n-button>
        </div>
      </div>
      <div class="subItems">
        <div class="subTitle">收藏夹</div>
        <n-space vertical>
          <n-select placeholder="请选择" v-model:value="favosValue" :options="favosOptions">
          </n-select>
        </n-space>
      </div>
      <div class="saveOrQuit">
        <n-button class="saveButton" @click="commitFavorite">保存</n-button>
        <n-button @click="closeButton">取消</n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.addIntoFavorite {
  position: fixed;
  top: 50%;
  right: 5%;
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
      .addNewFavo {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    .saveOrQuit {
      margin-top: 20px;
      position: relative;
      left: 300px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .saveButton {
        margin-right: 20px;
      }
    }
  }
}
.bookDetails {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .bookTitle {
    font-weight: 1000;
    font-size: 30px;
    margin-top: 20px;
  }
  .bookBasicInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    .bookInfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 20px;
      border-radius: 20px;
      box-shadow: 0 10px 32px 1px rgb(221, 219, 219);
      width: 630px;
      height: 430px;
      .bookImg {
        max-width: 270px;
        max-height: 380px;
        position: relative;
        left: 30px;
      }
      .infos {
        height: auto;
        width: 300px;
        margin-left: 45px;
        margin-top: 5px;
        border-left: #cccccc 1px solid;
        padding: 3px 0 3px 10px;
      }
    }
    .bookScore {
      margin-left: 50px;
      margin-top: 20px;
      height: 430px;
      width: 600px;
      border-radius: 20px;
      box-shadow: 0 10px 32px 1px rgb(221, 219, 219);
      display: flex;
      flex-direction: column;
      align-items: center;
      .ScoreTitle {
        font-weight: 700;
        font-size: 25px;
      }
      .avgScore {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 15px;
        margin-bottom: 15px;
        .scoreNumber {
          position: relative;
          top: 3px;
          font-size: 35px;
          font-weight: 600;
          margin-right: 20px;
        }
      }
    }
  }

  .bookBrief {
    margin-top: 40px;
    width: 1300px;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0 10px 32px 1px rgb(221, 219, 219);
    .BriefTitle {
      font-weight: 700;
      font-size: 20px;
    }
    .content {
      margin-top: 20px;
      text-indent: 20px;
      white-space: pre-wrap;
      text-align: left;
      line-height: 2;
    }
  }

  .comment {
    padding: 30px;
    margin-top: 30px;
    width: 1300px;
    border-radius: 20px;
    box-shadow: 0 10px 32px 1px rgb(221, 219, 219);
    .commentTitle {
      font-weight: 700;
      font-size: 20px;
    }
    .commentItems {
      padding: 15px 30px 15px 30px;
      width: 1200px;
      min-height: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 32px 1px rgb(221, 219, 219);
      .commentInfos {
        display: flex;
        flex-direction: row;
        align-items: center;
        .commentTitle {
          font-weight: 700;
          font-size: 20px;
        }
        .scoreBox {
          margin-left: 50px;
        }
        .commentTime {
          margin-left: 20px;
        }
        .editComment {
          color: blue;
          margin-left: 560px;
          cursor: pointer;
        }
        .deleteComment {
          position: relative;
          top: -5px;
          cursor: pointer;
          margin-left: 20px;
          font-size: 30px;
          width: 20px;
          text-align: center;
        }
      }
      .commentContent {
        margin-top: 10px;
      }
      .bottomInfo {
        width: 90%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
      }
    }
  }
}
</style>
