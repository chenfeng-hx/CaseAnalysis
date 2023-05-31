/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-04-22 18:40:13 编写而成！
 *    祝你食用愉快！！！
 */
import {createRouter, createWebHashHistory} from "vue-router";

// 路由规则
const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/home', component: () => import('@/views/Home/Home.vue') },
	{ path: '/recommendation', component: () => import('@/views/Recommendation/Recommendation.vue') },
	{ path: '/analysis', component: () => import('@/views/Analysis/Analysis.vue') },
	{ path: '/case', component: () => import('@/views/Case/Case.vue') },
]

// 创建路由实例
const router = new createRouter({
	routes,
	history: createWebHashHistory(),
})

// 导出路由
export default router
