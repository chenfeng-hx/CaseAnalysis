// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'default-passive-events';
import * as echarts from 'echarts'
import api from './api'
Vue.prototype.$api = api
// import * as mammoth from 'mammoth'
Vue.prototype.$echarts = echarts

// 使用vuex
import store from './store'
Vue.prototype.$store = store
// 引入ElementUI组件库
import ElementUI, { Message } from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
// import * as echarts from 'echarts';

Vue.use(ElementUI);

Vue.config.productionTip = false



new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
