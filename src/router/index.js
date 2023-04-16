import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../views/Home.vue')
const Case = () => import ("../views/Case.vue")
const analysis =() => import ('../views/Analysis.vue')
const relevant =() => import ('../views/relevant.vue')
const caseContent =() => import ('../views/caseContent.vue')
const specialInfo =() => import ('../views/specialInfo.vue')
const personCenter =() => import ('../views/personalCenter.vue')
const recommendation =() => import ('../components/recommendation.vue')
const dataDisplay =() => import ('../components/Datadisplay.vue')



Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}



const router = new VueRouter({
	routes: [
		{
			path: '/',
			redirect: '/home'
		},
		{
			path: '/home',
			component: home
		},
		{
			path: '/Case',
			component: Case
		},
		{
			path:"/analysis",
			component:analysis
		},
		{
			path:"/specialInfo",
			component:specialInfo
		},
		{
			path: '/relevant',
			component: relevant
		},
		{
			path:"/caseContent",
			component:caseContent
		},
		{
			path:"/personCenter",
			component:personCenter
		},
		{
			path:"/recommendation",
			component:recommendation
		},
		{
			path:"/display",
			component:dataDisplay
		},
	],
	mode: 'hash',
	scrollBehavior() {
		//x代表横坐标，y代表纵坐标,每次经过跳转页面后可以到达页面顶端
		return { x: 0,y: 0 };
	}
})
// const originalPush = VueRouter.prototype.push
export default router
