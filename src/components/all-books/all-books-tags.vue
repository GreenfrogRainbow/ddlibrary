<script setup>
import router from '@/router/index'
const selectTagFunc = (tag) => {
  router.push({
    name: 'allbooksbytag',
    params: { tag: tag }
  })
}
const literatureList = [
  '小说',
  '文学',
  '外国文学',
  '经典',
  '中国文学',
  '随笔',
  '日本文学',
  '散文',
  '村上春树',
  '诗歌',
  '童话',
  '名著',
  '儿童文学',
  '古典文学',
  '余华',
  '王小波',
  '当代文学',
  '杂文',
  '张爱玲',
  '外国名著',
  '鲁迅',
  '钱钟书',
  '诗词',
  '茨威格',
  '米兰·昆德拉',
  '杜拉斯',
  '港台'
]
const popularList = [
  '漫画',
  '推理',
  '绘本',
  '悬疑',
  '东野圭吾',
  '科幻',
  '青春',
  '言情',
  '推理小说',
  '奇幻',
  '日本漫画',
  '武侠',
  '耽美',
  '科幻小说',
  '网络小说',
  '三毛',
  '韩寒',
  '亦舒',
  '阿加莎·克里斯蒂',
  '金庸',
  '穿越',
  '安妮宝贝',
  '轻小说',
  '魔幻',
  '郭敬明',
  '青春文学',
  '几米',
  'J.K.罗琳',
  '幾米',
  '张小娴',
  '校园',
  '古龙',
  '高木直子',
  '沧月',
  '余秋雨',
  '王朔'
]
const cultureList = [
  '历史',
  '心理学',
  '哲学',
  '社会学',
  '传记',
  '文化',
  '艺术',
  '社会',
  '政治',
  '设计',
  '政治学',
  '宗教',
  '电影',
  '建筑',
  '中国历史',
  '数学',
  '回忆录',
  '思想',
  '人物传记',
  '艺术史',
  '国学',
  '人文',
  '音乐',
  '绘画',
  '戏剧',
  '西方哲学',
  '近代史',
  '二战',
  '军事',
  '佛教',
  '考古',
  '自由主义',
  '美术'
]
const lifeList = [
  '爱情',
  '成长',
  '生活',
  '心理',
  '女性',
  '旅行',
  '励志',
  '教育',
  '摄影',
  '职场',
  '美食',
  '游记',
  '灵修',
  '健康',
  '情感',
  '人际关系',
  '两性',
  '养生',
  '手工',
  '家居',
  '自助游'
]
const administeredList = [
  '经济学',
  '管理',
  '经济',
  '商业',
  '金融',
  '投资',
  '营销',
  '理财',
  '创业',
  '股票',
  '广告',
  '企业史',
  '策划'
]
const scienceList = [
  '科普',
  '互联网',
  '科学',
  '编程',
  '交互设计',
  '算法',
  '用户体验',
  '科技',
  'web',
  '交互',
  '通信',
  'UE',
  '神经网络',
  'UCD',
  '程序'
]
</script>

<template>
  <div class="all-body">
    <div class="left-column">
      <div class="tags-card-items">
        <div class="tags-title">文学</div>
        <div class="tags-card">
          <div
            class="tags"
            @click="selectTagFunc(item)"
            v-for="(item, index) in literatureList"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="tags-card-items">
        <div class="tags-title">文化</div>
        <div class="tags-card">
          <div
            class="tags"
            @click="selectTagFunc(item)"
            v-for="(item, index) in cultureList"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="tags-card-items">
        <div class="tags-title">科技</div>
        <div class="tags-card">
          <div
            class="tags"
            @click="selectTagFunc(item)"
            v-for="(item, index) in scienceList"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="right-column">
      <div class="tags-card-items">
        <div class="tags-title">流行</div>
        <div class="tags-card">
          <div
            class="tags"
            @click="selectTagFunc(item)"
            v-for="(item, index) in popularList"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="tags-card-items">
        <div class="tags-title">生活</div>
        <div class="tags-card">
          <div
            class="tags"
            @click="selectTagFunc(item)"
            v-for="(item, index) in lifeList"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="tags-card-items">
        <div class="tags-title">经管</div>
        <div class="tags-card">
          <div
            class="tags"
            @click="selectTagFunc(item)"
            v-for="(item, index) in administeredList"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.all-body {
  width: 100%;
  display: flex;
  flex-direction: row;
  .right-column {
    margin-right: 30px;
  }
}
.tags-card-items {
  margin-top: 30px;
  margin-left: 30px;
  width: 800px;
  border-radius: 30px;
  box-shadow: 0 10px 32px 1px rgb(221, 219, 219);
  padding: 20px 50px 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .tags-title {
    margin-left: 100px;
    font-weight: 800;
    font-size: 30px;
  }
  .tags-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .tags {
      width: 135px;
      height: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 32px 1px rgb(221, 219, 219);
      margin-left: 50px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #dbecf4;
      }
    }
  }
}
</style>
