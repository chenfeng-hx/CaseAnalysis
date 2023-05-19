/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-04-22 18:40:13 编写而成！
 *    祝你食用愉快！！！
 */
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/home', component: () => import('@/views/Home/Home.vue') },

]

const router = new createRouter({
	routes,
	history: createWebHashHistory(),
})

export default router
