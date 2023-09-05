<script setup>
import AppBar from "@/components/AppBar.vue";
import BackToTop from "@/components/BackToTop.vue";
import {useBackTopStore} from "@/store/index.js";
import { useRoute, useRouter } from "vue-router";
import {onMounted} from "vue";

/* 保证每次用户打开浏览器(退出时保存标签页)或网页都进入的是首页 */
const route = new useRoute();
const router = new useRouter();
// if (route.path !== '/home') {
// 	router.replace('/home');
// }
// console.log(route.path)
// onMounted(() => {
// 	console.log(route.path)
// })

</script>

<template>
	<div id="App">
		<!--头部导航栏-->
		<el-header><AppBar/></el-header>
		<!--页面切换，路由出口-->
		<router-view v-slot="{ Component }">
			<keep-alive exclude="SpecialInfo,searchInfo">
				<component :is="Component" />
			</keep-alive>
		</router-view>
		<!-- 回到顶部 改用 v-show 减少开销-->
		<BackToTop v-show="useBackTopStore().getShow" style="display: block !important;"/>
	</div>
</template>

<style scoped lang="scss">
@import "@/utils/css/mixin.scss";
.el-header {
	/* 清除浮动 */
	@include clearfix();

	/* 修改 el-header 的高度 */
	--el-header-height: 70px;
}
</style>


