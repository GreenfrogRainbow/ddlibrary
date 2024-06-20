import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

// 统一导出useStore方法
export default pinia
export * from './modules/user'
export * from './modules/borrow'
