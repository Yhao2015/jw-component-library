import { createApp } from 'vue'

/* element-plus 样式 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'dayjs/locale/zh-cn'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'

import './assets/markdown.css'

import JW from '../packages'
import Preview from './components/Preview.vue'

let app = createApp(App)

/* 字体图标 */
import * as Icons from '@element-plus/icons-vue'
// 注册全局组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})
app.component('Preview', Preview)
app.use(JW).use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
