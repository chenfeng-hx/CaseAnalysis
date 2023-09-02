import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { createPinia } from "pinia";
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'

import '@/static/css/base.css'
createApp(App).use(createPinia()).use(router).mount('#app')
