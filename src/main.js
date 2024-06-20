import { createApp } from 'vue'
import pinia from '@/stores'

import App from './App.vue'
import router from './router'

import './assets/common/reset.css'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import './assets/base.css'
import './assets/common.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

// 全局组件处
import cardAlterable from './components/card-alterable.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn })
app.use(vuetify)
// 全局组件
app.use(cardAlterable)

app.mount('#app')
