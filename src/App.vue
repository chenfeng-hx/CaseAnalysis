<script setup>
import AppBar from "@/components/AppBar.vue";
import BackToTop from "@/components/BackToTop.vue";
import {useBackTopStore} from "@/store/index.js";
</script>

<template>
	<div id="App">
		<!--头部导航栏-->
		<el-header><AppBar/></el-header>
		<!--页面切换，路由出口-->
		<router-view v-slot="{ Component }">
			<keep-alive exclude="specialInfo,searchInfo">
				<component :is="Component" />
			</keep-alive>
		</router-view>
		<!-- 回到顶部 -->
		<BackToTop v-if="useBackTopStore().getShow" />
	</div>
</template>


