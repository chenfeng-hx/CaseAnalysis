<script setup>
import AppBar from "@/components/AppBar.vue";
</script>

<template>
	<div id="App">
		<!--头部导航栏-->
		<el-header><AppBar/></el-header>
		<!--页面切换，路由出口-->
		<keep-alive exclude="specialInfo,searchInfo">
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<style scoped>

</style>
