<script setup>
import AppBar from "@/components/AppBar.vue";
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
	</div>
</template>

<style scoped>

</style>
