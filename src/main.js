// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 使用vue-router
import router from './router'
// 导入 echarts
import * as echarts from 'echarts'
import api from './api'
// 注册为全局变量
Vue.prototype.$api = api
Vue.prototype.$echarts = echarts

// 使用vuex
import store from './store'
Vue.prototype.$store = store
// 引入ElementUI组件库与样式
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 关闭生产环境提醒
Vue.config.productionTip = false


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
