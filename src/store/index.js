/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-05-19 10:44:55 编写而成！
 *    祝你食用愉快！！！
 */
import { defineStore } from 'pinia'

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
		updateAppTab(value) {
			this.appTab = value
		},
		updateCaseTab(value) {
			this.caseTab = value
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
