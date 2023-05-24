/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-05-19 10:44:55 编写而成！
 *    祝你食用愉快！！！
 */
import { defineStore } from 'pinia'
import router from "@/router/index.js";

/* 用于操作用户身份验证 */
export const useTokenStore = defineStore('tokenStore', {
	state: () => ({
		isLogin:'0',
		ser:null,
		token:localStorage.getItem('token') ? localStorage.getItem('token') : '',   // token
		// 默认导航栏选中
		appTab: 'home',
		// 默认case案例结果标签页面选中
		caseTab:{},
		// 默认case页面左侧选中
		globalControlFirst:{}
	}),
	actions: {
		// 更新路由页面的值
		updateAppTab(path) {
			this.appTab = path
		},
		updateCaseTab(path) {
			this.caseTab = path
		},
		updateGlobalControlFirst(value){
			this.globalControlFirst = value

		},
		$_setToken(value) { // 设置存储token
			this.token = value;
			localStorage.setItem('token', value);
		},
		$_removeStorage(){  // 删除token
			localStorage.removeItem('token');
		},
		// 实现路由页面跳转功能
		changeTabName(path) {
			// 更改 appTab 的值并改变路由路径
			this.updateAppTab(path);
			router.replace("/" + path);
		}
	},
	getters: {
		getStorage: state => {
			if (!state.token) {
				state.token = JSON.parse(localStorage.getItem(key))
			}
			return state.token
		}
	}
})

/* 用于操作在不同页面控制“返回顶部”组件的展示与否 */
export const useBackTopStore = defineStore('backTopStore', {
	getters: {
		getShow: () => useTokenStore().appTab !== 'home'
	}
})
