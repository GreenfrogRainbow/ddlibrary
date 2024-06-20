<script setup>
import { useBorrowStore, useUserStore } from '@/stores'
import { ref, onMounted } from 'vue'

import router from '@/router'
import request from '@/utils/request'
import moment from 'moment'
// moment系统配置
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

// 调整组件主题
const borrowStore = useBorrowStore()
const userStore = useUserStore()
const borrow_book = ref([])

const borrowing_books = ref([])
const borrowed_books = ref([])
const handleInfos = () => {
  borrow_book.value = borrowStore.borrow_books
  for (let i = 0; i < borrow_book.value.length; i++) {
    borrow_book.value[i].borrow_time = parseInt(borrow_book.value[i].borrow_time)
    borrow_book.value[i].borrow_time_date = new Date(borrow_book.value[i].borrow_time)
    borrow_book.value[i].borrow_time_str = moment(borrow_book.value[i].borrow_time_date).format(
      'LL'
    )
    if (borrow_book.value[i].return_time === null && borrow_book.value[i].borrow_status === '0') {
      borrow_book.value[i].return_time = borrow_book.value[i].borrow_time + 2592000000
    } else if (
      borrow_book.value[i].return_time === null &&
      borrow_book.value[i].borrow_status === '3'
    ) {
      borrow_book.value[i].return_time = borrow_book.value[i].borrow_time + 3888000000
    } else {
      borrow_book.value[i].return_time = parseInt(borrow_book.value[i].return_time)
    }
    borrow_book.value[i].return_time_date = new Date(borrow_book.value[i].return_time)
    borrow_book.value[i].return_time_str = moment(borrow_book.value[i].return_time_date).format(
      'LL'
    )

    borrow_book.value[i].remain_days = Math.max(
      parseInt((borrow_book.value[i].return_time - Date.now()) / 86400000),
      0
    )
    if (borrow_book.value[i].borrow_status === '0') {
      borrow_book.value[i].remain_bit = parseInt((borrow_book.value[i].remain_days / 30) * 100)
      borrow_book.value[i].stutas_str = '正在借阅'
    } else if (borrow_book.value[i].borrow_status === '1') {
      borrow_book.value[i].remain_bit = 0
      borrow_book.value[i].stutas_str = '正常归还'
    } else if (borrow_book.value[i].borrow_status === '2') {
      borrow_book.value[i].stutas_str = '过期归还'
    } else if (borrow_book.value[i].borrow_status === '3') {
      borrow_book.value[i].remain_bit = parseInt((borrow_book.value[i].remain_days / 45) * 100)
      borrow_book.value[i].stutas_str = '延期阅读'
    }
  }
  if (borrow_book.value.length !== 0) {
    borrowing_books.value = borrow_book.value.filter(
      (item) => item.borrow_status !== '1' && item.borrow_status !== '2'
    )
    borrowed_books.value = borrow_book.value.filter(
      (item) => item.borrow_status === '1' || item.borrow_status === '2'
    )
    borrowStore.setBorrowNum(borrowing_books.value.length)
  }
}
onMounted(async () => {
  await borrowStore.getBorrowBooks(userStore.user.id)
  handleInfos()
})

const goBookDetails = (id) => {
  console.log(id)
  router.push(`/details?id=${id}`)
}

const record_bool = ref(false)
const record_words = ref('点击查看借阅记录')
const changeWord = () => {
  if (record_bool.value === true) {
    record_words.value = '点击查看借阅记录'
    record_bool.value = false
  } else {
    record_words.value = '收起借阅记录'
    record_bool.value = true
  }
}

import { useMessage } from 'naive-ui'
const message = useMessage()
// 延期
const delay_return = async (borrow_id, status) => {
  if (status === '0') {
    await request.post(`/borrow/delay_return?borrow_id=${borrow_id}`)
    borrowStore.getBorrowBooks(userStore.user.id)
    handleInfos()
    message.info('延期成功')
    router.go(0)
  } else {
    message.info('您已经延期过一次了哦~')
  }
}

// 加载条
</script>

<template>
  <div class="borrow-body">
    <ul class="borrowing">
      <li v-for="item in borrowing_books" :key="item.borrow_id">
        <span class="card">
          <div class="card-div">
            <div class="slider" :style="{ width: item.remain_bit + '%' }"></div>
            <div class="cardColumn">
              <div class="subColumn">
                <div class="cardTitle">借阅书目：{{ item.title }}</div>
                <div class="cardTitleRight" @click="goBookDetails(item.book_id)">查看书目信息</div>
              </div>
              <div class="subColumn">
                <div class="subTitle">借出日期：</div>
                <div class="subInfo">{{ item.borrow_time_str }}</div>
                <div class="subRIghtTitle">预定归还日期：</div>
                <div class="subInfo">{{ item.return_time_str }}</div>
              </div>
              <div class="subColumn">
                <div class="subTitle">剩余天数：</div>
                <div class="subInfo">{{ item.remain_days }}</div>
                <div class="subRIghtTitle">状态：</div>
                <div class="subInfo">{{ item.stutas_str }}</div>
              </div>
              <div class="subColumnBar">
                <div class="subTitle">
                  <n-popconfirm
                    positive-text="确认"
                    negative-text="取消"
                    @positive-click="delay_return(item.borrow_id, item.borrow_status)"
                  >
                    <template #trigger> 申请延期 </template>
                    确认延期吗？
                  </n-popconfirm>
                </div>
              </div>
            </div>
          </div>
        </span>
      </li>
    </ul>
    <div class="history-books" @click="changeWord">{{ record_words }}</div>
    <ul class="borrowing" v-if="record_bool">
      <li v-for="item in borrowed_books" :key="item.id">
        <span class="card">
          <div class="card-div">
            <div class="slider" :style="{ width: item.remain_bit + '%' }"></div>
            <div class="cardColumn">
              <div class="subColumn">
                <div class="cardTitle">借阅书目：{{ item.title }}</div>
                <div class="cardTitleRight" @click="goBookDetails(item.book_id)">查看书目信息</div>
              </div>
              <div class="subColumn">
                <div class="subTitle">借出日期：</div>
                <div class="subInfo">{{ item.borrow_time_str }}</div>
                <div class="subRIghtTitle">预定归还日期：</div>
                <div class="subInfo">{{ item.return_time_str }}</div>
              </div>
              <div class="subColumn">
                <div class="subTitle">剩余天数：</div>
                <div class="subInfo">{{ item.remain_days }}</div>
                <div class="subRIghtTitle">状态：</div>
                <div class="subInfo">{{ item.stutas_str }}</div>
              </div>
              <div class="subColumnBar"></div>
            </div>
          </div>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.borrow-body {
  width: 1500px;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.borrow-body ul {
  width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.borrow-body ul li {
  margin-top: 30px;
  width: 1500px;
  height: 270px;
  .card {
    position: absolute;
    margin-top: 40px;
    width: 1500px;
    height: 240px;
    border-radius: 10px;
    box-shadow: 1px 1px 4px 1px #a1a1a1;
    background-color: #fff;
    border-top: rgb(24, 160, 88) 4px solid;
    .slider {
      pointer-events: none;
      position: absolute;
      top: -3px;
      right: 0;
      height: 240px;
      background-color: white;
      border-radius: 0 10px 10px 0;
      border: white 4px solid;
    }
  }
}
.cardColumn {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  .subColumn {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0 20px 30px;
    border-bottom: #cccccc 1px solid;
    .subTitle {
      font-weight: 400;
      width: 132px;
      color: #a1a1a1;
    }
    .subRIghtTitle {
      font-weight: 400;
      width: 150px;
      color: #a1a1a1;
      margin-left: 50px;
    }
    .cardTitle {
      width: 1000px;
      font-weight: 700;
    }
    .cardTitleRight {
      cursor: pointer;
      position: relative;
      left: 300px;
      font-weight: 700;
      color: #17669b;
    }
    .subSetTitle {
      width: 450px;
      color: #a1a1a1;
    }
    .subInfo {
      margin-left: 50px;
      font-size: 15px;
      font-weight: 700;
      position: relative;
      left: 100px;
      width: 600px;
    }
  }
  .subColumnBar {
    height: 45px;
    z-index: 20;
    background-color: #f2f2f2;
    border-radius: 0 0 10px 10px;
    padding: 12px 0 3px 30px;
    .subTitle {
      cursor: pointer;
      font-weight: 700;
      color: #17669b;
    }
  }
}
.navigation a {
  margin-left: 30px;
  font-size: 20px;
  font-weight: 700;
}
.history-books {
  position: relative;
  left: -50px;
  margin-top: 50px;
  cursor: pointer;
  font-weight: 700;
  color: #17669b;
}
</style>
