<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores'
import { ChevronLeft, ChevronRight } from '@vicons/tabler'
import headPortrait from '@/components/head-portrait.vue'
import router from '@/router'
import request, { baseURL } from '@/utils/request'
import { useMessage } from 'naive-ui'
const message = useMessage()

// 调整组件主题
import { NConfigProvider } from 'naive-ui'
const themeOverrides = {
  common: {
    primaryColorHover: '#17669B',
    primaryColor: '#17669b'
  },
  Button: {
    primaryColor: '#17669b',
    textColor: '#17669b'
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: '#17669b'
      }
    }
  }
}
// 日期
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

const userStore = useUserStore()

const userAge = ref(0)
const birthDayNum = ref(0)
const birthDayStr = ref('')
const handleBirthIndo = () => {
  const nowTime = Date.now()
  birthDayNum.value = parseInt(userStore.user.birth)
  birthDayStr.value = moment(birthDayNum.value).format('LL')
  userAge.value = parseInt((nowTime - birthDayNum.value) / 31536000000)
}
onMounted(() => {
  userStore.getUser()
  handleBirthIndo()
  birthTime.value = birthDayNum.value
})
const goback = () => {
  router.go(-1)
}

const logout = () => {
  userStore.removeToken()
  userStore.setUser({})
  router.push('/recommend')
}

// 弹窗类
// 总弹窗
const popUpBox = ref(false)
// 弹窗内容
const genderAndProfession = ref(false)
const genderValue = ref(userStore.user.gender)
const professionValue = ref(userStore.user.profession)
const genderOptions = [
  {
    label: '男',
    value: '男'
  },
  {
    label: '女',
    value: '女'
  },
  {
    label: '未指定',
    value: '未指定'
  },
  {
    label: '不愿透露',
    value: '不愿透露'
  }
]
const professionOptions = [
  {
    label: '技术开发',
    value: '技术开发'
  },
  {
    label: '创意设计',
    value: '创意设计'
  },
  {
    label: '市场营销',
    value: '市场营销'
  },
  {
    label: '运行主管',
    value: '运行主管'
  },
  {
    label: '行政助理',
    value: '行政助理'
  },
  {
    label: '人力资源',
    value: '人力资源'
  },
  {
    label: '财务管理',
    value: '财务管理'
  },
  {
    label: '学生',
    value: '学生'
  },
  {
    label: '自由职业',
    value: '自由职业'
  },
  {
    label: '其他',
    value: '其他'
  }
]
const genderAndProfessionFunc = () => {
  popUpBox.value = true
  genderAndProfession.value = true
  const coverBody = document.getElementsByClassName('coverBody')[0]
  coverBody.style.zIndex = 1
  coverBody.style.opacity = 0.3
}
const commitGenderAndProfession = async () => {
  const res = await request.post(
    `/userinfo/setGenderAndProfession?gender=${genderValue.value}&profession=${professionValue.value}&id=${userStore.user.id}`
  )
  userStore.getUser()
  message.info(res.data.message)
  closeButton()
}

const birthAndNation = ref(false)
const birthTime = ref(0)
const nationValue = ref('中国')
const nationOptions = [
  { value: '安哥拉', label: '安哥拉' },
  { value: '阿富汗', label: '阿富汗' },
  { value: '阿尔巴尼亚', label: '阿尔巴尼亚' },
  { value: '阿尔及利亚', label: '阿尔及利亚' },
  { value: '安道尔共和国', label: '安道尔共和国' },
  { value: '安圭拉岛', label: '安圭拉岛' },
  { value: '安提瓜和巴布达', label: '安提瓜和巴布达' },
  { value: '阿根廷', label: '阿根廷' },
  { value: '亚美尼亚', label: '亚美尼亚' },
  { value: '阿森松', label: '阿森松' },
  { value: '澳大利亚', label: '澳大利亚' },
  { value: '奥地利', label: '奥地利' },
  { value: '阿塞拜疆', label: '阿塞拜疆' },
  { value: '巴哈马', label: '巴哈马' },
  { value: '巴林', label: '巴林' },
  { value: '孟加拉国', label: '孟加拉国' },
  { value: '巴巴多斯', label: '巴巴多斯' },
  { value: '白俄罗斯', label: '白俄罗斯' },
  { value: '比利时', label: '比利时' },
  { value: '伯利兹', label: '伯利兹' },
  { value: '贝宁', label: '贝宁' },
  { value: '百慕大群岛', label: '百慕大群岛' },
  { value: '玻利维亚', label: '玻利维亚' },
  { value: '博茨瓦纳', label: '博茨瓦纳' },
  { value: '巴西', label: '巴西' },
  { value: '文莱', label: '文莱' },
  { value: '保加利亚', label: '保加利亚' },
  { value: '布基纳法索', label: '布基纳法索' },
  { value: '缅甸', label: '缅甸' },
  { value: '布隆迪', label: '布隆迪' },
  { value: '喀麦隆', label: '喀麦隆' },
  { value: '加拿大', label: '加拿大' },
  { value: '开曼群岛', label: '开曼群岛' },
  { value: '中非共和国', label: '中非共和国' },
  { value: '乍得', label: '乍得' },
  { value: '智利', label: '智利' },
  { value: '中国', label: '中国' },
  { value: '哥伦比亚', label: '哥伦比亚' },
  { value: '刚果', label: '刚果' },
  { value: '库克群岛', label: '库克群岛' },
  { value: '哥斯达黎加', label: '哥斯达黎加' },
  { value: '古巴', label: '古巴' },
  { value: '塞浦路斯', label: '塞浦路斯' },
  { value: '捷克', label: '捷克' },
  { value: '丹麦', label: '丹麦' },
  { value: '吉布提', label: '吉布提' },
  { value: '多米尼加共和国', label: '多米尼加共和国' },
  { value: '厄瓜多尔', label: '厄瓜多尔' },
  { value: '埃及', label: '埃及' },
  { value: '萨尔瓦多', label: '萨尔瓦多' },
  { value: '爱沙尼亚', label: '爱沙尼亚' },
  { value: '埃塞俄比亚', label: '埃塞俄比亚' },
  { value: '斐济', label: '斐济' },
  { value: '芬兰', label: '芬兰' },
  { value: '法国', label: '法国' },
  { value: '法属圭亚那', label: '法属圭亚那' },
  { value: '法属玻利尼西亚', label: '法属玻利尼西亚' },
  { value: '加蓬', label: '加蓬' },
  { value: '冈比亚', label: '冈比亚' },
  { value: '格鲁吉亚', label: '格鲁吉亚' },
  { value: '德国', label: '德国' },
  { value: '加纳', label: '加纳' },
  { value: '直布罗陀', label: '直布罗陀' },
  { value: '希腊', label: '希腊' },
  { value: '格林纳达', label: '格林纳达' },
  { value: '关岛', label: '关岛' },
  { value: '危地马拉', label: '危地马拉' },
  { value: '几内亚', label: '几内亚' },
  { value: '圭亚那', label: '圭亚那' },
  { value: '海地', label: '海地' },
  { value: '洪都拉斯', label: '洪都拉斯' },
  { value: '匈牙利', label: '匈牙利' },
  { value: '冰岛', label: '冰岛' },
  { value: '印度', label: '印度' },
  { value: '印度尼西亚', label: '印度尼西亚' },
  { value: '伊朗', label: '伊朗' },
  { value: '伊拉克', label: '伊拉克' },
  { value: '爱尔兰', label: '爱尔兰' },
  { value: '以色列', label: '以色列' },
  { value: '意大利', label: '意大利' },
  { value: '科特迪瓦', label: '科特迪瓦' },
  { value: '牙买加', label: '牙买加' },
  { value: '日本', label: '日本' },
  { value: '约旦', label: '约旦' },
  { value: '柬埔寨', label: '柬埔寨' },
  { value: '哈萨克斯坦', label: '哈萨克斯坦' },
  { value: '肯尼亚', label: '肯尼亚' },
  { value: '韩国', label: '韩国' },
  { value: '科威特', label: '科威特' },
  { value: '吉尔吉斯坦', label: '吉尔吉斯坦' },
  { value: '老挝', label: '老挝' },
  { value: '拉脱维亚', label: '拉脱维亚' },
  { value: '黎巴嫩', label: '黎巴嫩' },
  { value: '莱索托', label: '莱索托' },
  { value: '利比里亚', label: '利比里亚' },
  { value: '利比亚', label: '利比亚' },
  { value: '列支敦士登', label: '列支敦士登' },
  { value: '立陶宛', label: '立陶宛' },
  { value: '卢森堡', label: '卢森堡' },
  { value: '马达加斯加', label: '马达加斯加' },
  { value: '马拉维', label: '马拉维' },
  { value: '马来西亚', label: '马来西亚' },
  { value: '马尔代夫', label: '马尔代夫' },
  { value: '马里', label: '马里' },
  { value: '马耳他', label: '马耳他' },
  { value: '马里亚那群岛', label: '马里亚那群岛' },
  { value: '马提尼克', label: '马提尼克' },
  { value: '毛里求斯', label: '毛里求斯' },
  { value: '墨西哥', label: '墨西哥' },
  { value: '摩尔多瓦', label: '摩尔多瓦' },
  { value: '摩纳哥', label: '摩纳哥' },
  { value: '蒙古', label: '蒙古' },
  { value: '蒙特塞拉特岛', label: '蒙特塞拉特岛' },
  { value: '摩洛哥', label: '摩洛哥' },
  { value: '莫桑比克', label: '莫桑比克' },
  { value: '纳米比亚', label: '纳米比亚' },
  { value: '瑙鲁', label: '瑙鲁' },
  { value: '尼泊尔', label: '尼泊尔' },
  { value: '荷属安的列斯', label: '荷属安的列斯' },
  { value: '荷兰', label: '荷兰' },
  { value: '新西兰', label: '新西兰' },
  { value: '尼加拉瓜', label: '尼加拉瓜' },
  { value: '尼日尔', label: '尼日尔' },
  { value: '尼日利亚', label: '尼日利亚' },
  { value: '朝鲜', label: '朝鲜' },
  { value: '挪威', label: '挪威' },
  { value: '阿曼', label: '阿曼' },
  { value: '巴基斯坦', label: '巴基斯坦' },
  { value: '巴拿马', label: '巴拿马' },
  { value: '巴布亚新几内亚', label: '巴布亚新几内亚' },
  { value: '巴拉圭', label: '巴拉圭' },
  { value: '秘鲁', label: '秘鲁' },
  { value: '菲律宾', label: '菲律宾' },
  { value: '波兰', label: '波兰' },
  { value: '葡萄牙', label: '葡萄牙' },
  { value: '波多黎各', label: '波多黎各' },
  { value: '卡塔尔', label: '卡塔尔' },
  { value: '留尼旺', label: '留尼旺' },
  { value: '罗马尼亚', label: '罗马尼亚' },
  { value: '俄罗斯', label: '俄罗斯' },
  { value: '圣卢西亚', label: '圣卢西亚' },
  { value: '圣文森特岛', label: '圣文森特岛' },
  { value: '东萨摩亚(美)', label: '东萨摩亚(美)' },
  { value: '西萨摩亚', label: '西萨摩亚' },
  { value: '圣马力诺', label: '圣马力诺' },
  { value: '圣多美和普林西比', label: '圣多美和普林西比' },
  { value: '沙特阿拉伯', label: '沙特阿拉伯' },
  { value: '塞内加尔', label: '塞内加尔' },
  { value: '塞舌尔', label: '塞舌尔' },
  { value: '塞拉利昂', label: '塞拉利昂' },
  { value: '新加坡', label: '新加坡' },
  { value: '斯洛伐克', label: '斯洛伐克' },
  { value: '斯洛文尼亚', label: '斯洛文尼亚' },
  { value: '所罗门群岛', label: '所罗门群岛' },
  { value: '索马里', label: '索马里' },
  { value: '南非', label: '南非' },
  { value: '西班牙', label: '西班牙' },
  { value: '斯里兰卡', label: '斯里兰卡' },
  { value: '圣卢西亚', label: '圣卢西亚' },
  { value: '圣文森特', label: '圣文森特' },
  { value: '苏丹', label: '苏丹' },
  { value: '苏里南', label: '苏里南' },
  { value: '斯威士兰', label: '斯威士兰' },
  { value: '瑞典', label: '瑞典' },
  { value: '瑞士', label: '瑞士' },
  { value: '叙利亚', label: '叙利亚' },
  { value: '塔吉克斯坦', label: '塔吉克斯坦' },
  { value: '坦桑尼亚', label: '坦桑尼亚' },
  { value: '泰国', label: '泰国' },
  { value: '多哥', label: '多哥' },
  { value: '汤加', label: '汤加' },
  { value: '特立尼达和多巴哥', label: '特立尼达和多巴哥' },
  { value: '突尼斯', label: '突尼斯' },
  { value: '土耳其', label: '土耳其' },
  { value: '土库曼斯坦', label: '土库曼斯坦' },
  { value: '乌干达', label: '乌干达' },
  { value: '乌克兰', label: '乌克兰' },
  { value: '阿拉伯联合酋长国', label: '阿拉伯联合酋长国' },
  { value: '英国', label: '英国' },
  { value: '美国', label: '美国' },
  { value: '乌拉圭', label: '乌拉圭' },
  { value: '乌兹别克斯坦', label: '乌兹别克斯坦' },
  { value: '委内瑞拉', label: '委内瑞拉' },
  { value: '越南', label: '越南' },
  { value: '也门', label: '也门' },
  { value: '南斯拉夫', label: '南斯拉夫' },
  { value: '津巴布韦', label: '津巴布韦' },
  { value: '扎伊尔', label: '扎伊尔' },
  { value: '赞比亚', label: '赞比亚' }
]

const birthAndNationFunc = () => {
  popUpBox.value = true
  birthAndNation.value = true
  const coverBody = document.getElementsByClassName('coverBody')[0]
  coverBody.style.zIndex = 1
  coverBody.style.opacity = 0.3
}
const cmmitBirthAndNation = async () => {
  const res = await request.post(
    `/userinfo/setBirthAndNation?birth=${birthTime.value}&nation=${nationValue.value}&id=${userStore.user.id}`
  )
  await userStore.getUser()
  message.info(res.data.message)
  handleBirthIndo()
  closeButton()
}

const emailAndNumber = ref(false)
const emailValue = ref(userStore.user.email)
const phoneValue = ref(userStore.user.phone)

const emailAndNumberFunc = () => {
  popUpBox.value = true
  emailAndNumber.value = true
  const coverBody = document.getElementsByClassName('coverBody')[0]
  coverBody.style.zIndex = 1
  coverBody.style.opacity = 0.3
}

const commitEmailAndNumber = async () => {
  const res = await request.post(
    `/userinfo/setEmailAndNumber?email=${emailValue.value}&phone=${phoneValue.value}&id=${userStore.user.id}`
  )
  userStore.getUser()
  message.info(res.data.message)
  closeButton()
}

const passwordPopUpBox = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const reNewPassword = ref('')

const changePassword = () => {
  popUpBox.value = true
  passwordPopUpBox.value = true
  const coverBody = document.getElementsByClassName('coverBody')[0]
  coverBody.style.zIndex = 1
  coverBody.style.opacity = 0.3
}
const commitPassword = async () => {
  const res = await request.post(
    `/userinfo/setPassword?oldPassword=${oldPassword.value}&newPassword=${newPassword.value}&id=${userStore.user.id}`
  )
  message.info(res.data.message)
  closeButton()
}

const nicknamePopUpBox = ref(false)
const nicknameChange = ref(userStore.user.nickname)

const changeNickname = () => {
  popUpBox.value = true
  nicknamePopUpBox.value = true
  const coverBody = document.getElementsByClassName('coverBody')[0]
  coverBody.style.zIndex = 1
  coverBody.style.opacity = 0.3
}

const commitNickname = async () => {
  const res = await request.post(
    `/userinfo/setNickname?nickname=${nicknameChange.value}&id=${userStore.user.id}`
  )
  userStore.getUser()
  message.info(res.data.message)
  closeButton()
}

const userPicPopUpBox = ref(false)
const changeUserPic = () => {
  popUpBox.value = true
  userPicPopUpBox.value = true
  const coverBody = document.getElementsByClassName('coverBody')[0]
  coverBody.style.zIndex = 1
  coverBody.style.opacity = 0.3
}
const closeButton = () => {
  popUpBox.value = false
  genderAndProfession.value = false
  birthAndNation.value = false
  emailAndNumber.value = false
  passwordPopUpBox.value = false
  nicknamePopUpBox.value = false
  userPicPopUpBox.value = false
  const coverBody = document.getElementsByClassName('coverBody')[0]
  coverBody.style.zIndex = -1
  coverBody.style.opacity = 0
}

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
const commitUserPic = async () => {
  const res = await request.patch('/userinfo/setUserPic', {
    avatar: imageUrl.value,
    id: userStore.user.id
  })
  await userStore.getUser()
  closeButton()
  message.info(res.data.message)
}

const defaultPic = ref(baseURL + '/source/userDefault.jpg')
const handleLostPic = () => (e) => {
  e.target.src = defaultPic.value
}
</script>

<template>
  <div class="center-body animated bounceInDown">
    <div class="user-center-bar">
      <n-icon size="40" class="goSetting" color="#131B27" @click="goback">
        <ChevronLeft />
      </n-icon>
      <div class="rightBar">
        <headPortrait :userinfo="userStore.user" @logout="logout"></headPortrait>
      </div>
    </div>
    <div class="title">
      <div class="yourInfoTitle">您的信息</div>
      <div class="changePassword" @click="changePassword">
        <div class="pswIcon">
          <img src="http://127.0.0.1:3007/source/key.png" alt="P" id="pswIconImg" />
        </div>
        <div class="changePswText">更改密码</div>
      </div>
    </div>
    <div class="card fir">
      <div class="subPhotoColumn">
        <n-avatar round :size="150" :src="userStore.user.user_pic" @error="handleLostPic($event)" />
        <div class="subInfo">
          <div class="subsubInfo">添加照片，个性化你的账户。</div>
          <button id="changePhoto" @click="changeUserPic">更改照片</button>
        </div>
      </div>
      <div class="subColumn">
        <div class="subTitle">昵称</div>
        <div class="subInfo">{{ userStore.user.nickname }}</div>
        <div class="subInfoRight" @click="changeNickname">编辑昵称</div>
      </div>
    </div>
    <div class="card">
      <div class="subColumn">
        <div class="cardTitle">公开资料信息</div>
        <div class="cardTitleRight" @click="genderAndProfessionFunc">编辑公开资料信息</div>
      </div>
      <div class="subColumn">
        <div class="subTitle">年龄</div>
        <div class="subInfo">{{ userAge }}</div>
        <div class="subSetTitle">便于我们了解您的喜好</div>
      </div>
      <div class="subColumn">
        <div class="subTitle">性别</div>
        <div class="subInfo">{{ userStore.user.gender }}</div>
        <div class="subSetTitle">性别用于账户安全设置</div>
        <n-icon size="20" class="goSetting" color="#415167" @click="genderAndProfessionFunc">
          <ChevronRight />
        </n-icon>
      </div>
      <div class="subColumn">
        <div class="subTitle">工作或身份</div>
        <div class="subInfo">{{ userStore.user.profession }}</div>
        <div class="subSetTitle">便于我们了解您的喜好</div>
        <n-icon size="20" class="goSetting" color="#415167" @click="genderAndProfessionFunc">
          <ChevronRight />
        </n-icon>
      </div>
      <div class="subColumnBar"></div>
    </div>
    <div class="card">
      <div class="subColumn">
        <div class="cardTitle">个人资料信息</div>
        <div class="cardTitleRight" @click="birthAndNationFunc">编辑个人资料信息</div>
      </div>
      <div class="subColumn">
        <div class="subTitle">出生日期</div>
        <div class="subInfo">{{ birthDayStr }}</div>
        <div class="subSetTitle">出生日期以用于账户安全设置</div>
        <n-icon size="20" class="goSetting" color="#415167" @click="birthAndNationFunc">
          <ChevronRight />
        </n-icon>
      </div>
      <div class="subColumn">
        <div class="subTitle">国家或地区</div>
        <div class="subInfo">{{ userStore.user.nation }}</div>
        <div class="subSetTitle">你的国家/地区已用于隐私设置</div>
        <n-icon size="20" class="goSetting" color="#415167" @click="birthAndNationFunc">
          <ChevronRight />
        </n-icon>
      </div>
      <div class="subColumnBar"></div>
    </div>
    <div class="card">
      <div class="subColumn">
        <div class="cardTitle">账户信息</div>
        <div class="cardTitleRight" @click="emailAndNumberFunc">编辑账户信息</div>
      </div>
      <div class="subColumn">
        <div class="subTitle">电子邮箱地址</div>
        <div class="subInfo">{{ userStore.user.email }}</div>
        <div class="subSetTitle">电子邮箱以用于账户安全设置</div>
        <n-icon size="20" class="goSetting" color="#415167" @click="emailAndNumberFunc">
          <ChevronRight />
        </n-icon>
      </div>
      <div class="subColumn">
        <div class="subTitle">电话号码</div>
        <div class="subInfo">{{ userStore.user.phone }}</div>
        <div class="subSetTitle">电话号码以用于账户安全设置</div>
        <n-icon size="20" class="goSetting" color="#415167" @click="emailAndNumberFunc">
          <ChevronRight />
        </n-icon>
      </div>
      <div class="subColumnBar"></div>
    </div>
    <!--      <div class="card">-->
    <!--        <div class="title"></div>-->
    <!--        <div class="subColumn">-->
    <!--          <div class="subTitle"></div>-->
    <!--          <div class="subInfo"></div>-->
    <!--        </div>-->
    <!--      </div>-->
    <div class="footer">
      <div class="leftFooter">
        <div class="FooterInfos">隐私</div>

        <div class="FooterInfos">中国</div>
      </div>
      <div class="rightFooter">
        <div class="FooterInfos">联系邮箱</div>
        <div class="FooterInfos">联系电话</div>
        <div class="FooterInfos">反馈</div>
        <div class="FooterInfos">管理</div>
        <div class="FooterInfos">@2023 ddLibrary.Inc</div>
      </div>
    </div>
  </div>
  <div class="coverBody"></div>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="popUpBox" v-if="popUpBox">
      <div class="pages" v-if="genderAndProfession">
        <div class="popUpTitle">编辑公开资料信息</div>
        <div class="subItems">
          <div class="subTitle">性别</div>
          <n-space vertical>
            <n-select placeholder="请选择" v-model:value="genderValue" :options="genderOptions" />
          </n-space>
        </div>
        <div class="subItems">
          <div class="subTitle">工作或职位</div>
          <n-space vertical>
            <n-select
              placeholder="请选择"
              v-model:value="professionValue"
              :options="professionOptions"
            />
          </n-space>
        </div>
        <div class="saveOrQuit">
          <n-button class="saveButton" @click="commitGenderAndProfession">保存</n-button>
          <n-button @click="closeButton">取消</n-button>
        </div>
      </div>
      <div class="pages" v-if="birthAndNation">
        <div class="popUpTitle">编辑个人资料信息</div>
        <div class="subItems">
          <div class="subTitle">生日</div>
          <n-date-picker v-model:value="birthTime" type="date" />
        </div>
        <div class="subItems">
          <div class="subTitle">国家或地区</div>
          <n-space vertical>
            <n-select placeholder="请选择" v-model:value="nationValue" :options="nationOptions" />
          </n-space>
        </div>
        <div class="saveOrQuit">
          <n-button class="saveButton" @click="cmmitBirthAndNation">保存</n-button>
          <n-button @click="closeButton">取消</n-button>
        </div>
      </div>
      <div class="pages" v-if="emailAndNumber">
        <div class="popUpTitle">编辑账户信息</div>
        <div class="subItems">
          <div class="subTitle">邮箱</div>
          <n-input v-model:value="emailValue" type="text" placeholder="邮箱" />
        </div>
        <div class="subItems">
          <div class="subTitle">手机</div>
          <n-input v-model:value="phoneValue" type="text" placeholder="手机号" />
        </div>
        <div class="saveOrQuit">
          <n-button class="saveButton" @click="commitEmailAndNumber">保存</n-button>
          <n-button @click="closeButton">取消</n-button>
        </div>
      </div>
      <div class="pages" v-if="passwordPopUpBox">
        <div class="popUpTitle">更改密码</div>
        <div class="subItems">
          <div class="subTitle">原密码</div>
          <n-input v-model:value="oldPassword" type="text" placeholder="原密码" />
        </div>
        <div class="subItems">
          <div class="subTitle">新密码</div>
          <n-input v-model:value="newPassword" type="text" placeholder="新密码" />
        </div>
        <div class="subItems">
          <div class="subTitle">重复新密码</div>
          <n-input v-model:value="reNewPassword" type="text" placeholder="重复新密码" />
        </div>
        <div class="saveOrQuit">
          <n-button class="saveButton" @click="commitPassword">保存</n-button>
          <n-button @click="closeButton">取消</n-button>
        </div>
      </div>
      <div class="pages" v-if="nicknamePopUpBox">
        <div class="popUpTitle">更改昵称</div>
        <div class="subItems">
          <div class="subTitle">昵称</div>
          <n-input v-model:value="nicknameChange" type="text" placeholder="昵称" />
        </div>
        <div class="saveOrQuit">
          <n-button class="saveButton" @click="commitNickname">保存</n-button>
          <n-button @click="closeButton">取消</n-button>
        </div>
      </div>
      <div class="pages" v-if="userPicPopUpBox">
        <div class="popUpTitle">更改头像</div>
        <div class="subPic">
          <el-upload
            :auto-upload="false"
            class="avatar-uploader"
            :show-file-list="false"
            :on-change="onSelectFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        <div class="saveOrQuit">
          <n-button class="saveButton" @click="commitUserPic">保存</n-button>
          <n-button @click="closeButton">取消</n-button>
        </div>
      </div>
    </div>
  </n-config-provider>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.coverBody {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 144.5%;
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

.user-center-bar {
  padding: 5px 0 5px 40px;
  width: 100%;
  height: 50px;
  background-color: #17669b;
  display: flex;
  flex-direction: row;
  align-items: center;
  .goSetting {
    cursor: pointer;
  }
}

.rightBar {
  position: absolute;
  right: 50px;
}

.center-body {
  background-color: #f2f2f2;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

.title {
  font-size: 25px;
  font-weight: 900;
  position: relative;
  left: -650px;
  margin-bottom: 0;
  .changePassword {
    cursor: pointer;
    width: 130px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    left: 1330px;
    border-radius: 3px;
    .pswIcon {
      position: relative;
      left: 5px;
      width: 30px;
      height: 30px;
      border-radius: 50px;
      background-color: #dbecf4;
      #pswIconImg {
        vertical-align: baseline;
      }
    }
    .changePswText {
      margin-left: 5px;
      font-weight: 800;
      font-size: 15px;
    }
    &:hover {
      .pswIcon {
        background-color: #9ecde0;
      }
      .changePswText {
        color: #17669b;
      }
    }
  }
}

.card {
  margin-top: 40px;
  width: 1500px;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 1px #a1a1a1;
  background-color: #fff;
  .subPhotoColumn {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0 20px 30px;
    border-bottom: #cccccc 1px solid;
    .subInfo {
      margin-left: 50px;
      font-size: 15px;
      font-weight: 500;
      position: relative;
    }
    #changePhoto {
      color: #282828;
      border: #282828 1px solid;
      border-radius: 5px;
      background-color: #fff;
      cursor: pointer;
      margin-top: 5px;
      padding: 7px 20px 7px 20px;
      &:hover {
        background-color: #dbecf4;
      }
    }
  }

  .subColumn {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0 20px 30px;
    border-bottom: #cccccc 1px solid;
    .subTitle {
      font-weight: 400;
      width: 150px;
      color: #a1a1a1;
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
    .subInfoRight {
      cursor: pointer;
      font-weight: 600;
      color: #17669b;
      position: relative;
      left: 550px;
    }
    .goSetting {
      cursor: pointer;
      position: relative;
      left: 150px;
    }
  }
  .subColumnBar {
    height: 45px;
    background-color: #f2f2f2;
    border-radius: 0 0 10px 10px;
  }
}

.fir {
  margin-top: 10px;
}

.footer {
  margin-top: 40px;
  margin-bottom: 10px;
  width: 85%;
  display: flex;
  flex-direction: row;
  .leftFooter {
    display: flex;
    flex-direction: row;
    .FooterInfos {
      cursor: pointer;
      margin-left: 40px;
      font-size: 10px;
    }
  }
  .rightFooter {
    position: absolute;
    right: 200px;
    display: flex;
    flex-direction: row;
    .FooterInfos {
      cursor: pointer;
      margin-left: 40px;
      font-size: 10px;
    }
  }
}
</style>
