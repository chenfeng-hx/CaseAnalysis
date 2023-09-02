/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-04-22 18:40:13 编写而成！
 *    祝你食用愉快！！！
 */
import { createRouter, createWebHashHistory } from "vue-router";

// 路由规则
const routes = [
	{ path: '/', name: 'home', redirect: '/home' },
	{ path: '/home', name: '首页', component: () => import('@/views/Home/Home.vue') },
	{ path: '/recommendation', name: '法条推荐', component: () => import('@/views/Recommendation/Recommendation.vue') },
	{ path: '/analysis', name: '文书分析', component: () => import('@/views/Analysis/Analysis.vue') },
	{ path: '/relevant', name: '相关科普', component: () => import('@/views/Relevant/Relevant.vue') },
	{ path: '/case', name: '案例库', component: () => import('@/views/Case/Case.vue') },
	{ path: '/display', name: '数据展示', component: () => import('@/views/Display/Display.vue') },
	{ path: '/specialInfo', name: '案件详情页', component: () => import('@/views/SpecialInfo/SpecialInfo.vue') }
]

// 创建路由实例
const router = new createRouter({
	routes,
	history: createWebHashHistory(),
})

// 导出路由
export default router
