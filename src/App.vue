<template>

	<div id="App">
		<!-- <keep-alive> -->
		<!--头部导航栏-->
		<el-header><appBar/></el-header>

		<!-- <Home v-if="$store.state.appTab==='home'"/>
	  <Analysis v-if="$store.state.appTab==='analysis'"/>

	  <Case v-if="$store.state.appTab==='case'"/> -->
		<!-- <relevant v-if="$store.state.appTab==='relevant'"/> -->
		<!--页面切换，路由出口-->
		<keep-alive exclude="specialInfo,searchInfo">
			<router-view>
			</router-view>
		</keep-alive>

		<!-- <router-view></router-view> -->

	</div>

</template>

<script>
import {mapState} from "vuex";
import appBar from "./components/AppBar.vue";
import Home from "./views/Home.vue";
import Analysis from "./views/Analysis.vue";
import Case from "./views/Case.vue";
import relevant from "./views/relevant.vue";
import specialInfo from "./views/specialInfo.vue";

export default {
	name: 'App',
	//消除body中的8px边框
	beforeCreate() {
		document.querySelector('body').setAttribute('style', 'margin:0;')
	},
	computed: {
		...mapState([
			'appTab',
		])
	},
	components:{
		appBar,
		Home,
		Analysis,
		Case,
		relevant,
		specialInfo
	},
}
</script>

<style lang="scss">

//设置点击屏幕不出现竖线
body {
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
	-ms-user-select: none;
	touch-action: none;
}

/* 整个滚动条 */
/* 宽高分别对应纵向滚动条和横向滚动条的宽度 */
// ::-webkit-scrollbar {
//     width: 5px;
//     background-color: rgb(244, 249, 252);
// }
// ::-webkit-scrollbar:hover {
//     background-color: rgb(121, 124, 126);
// }
/* 整个滚动条 */
// ::-webkit-scrollbar {
//     width: 8px;
// }

/* 滚动条上的滚动滑块 */
// ::-webkit-scrollbar-thumb:hover {
//     background-color: #7b848a;
//     /* 关键代码 */
//     background-image: -webkit-linear-gradient(45deg,
//             rgba(255, 255, 255, 0.4) 25%,
//             transparent 25%,
//             transparent 50%,
//             rgba(255, 255, 255, 0.4) 50%,
//             rgba(255, 255, 255, 0.4) 75%,
//             transparent 75%,
//             transparent);
//     border-radius: 32px;
// }

/* 滚动条轨道 */
// ::-webkit-scrollbar-track {
//     background-color: #dbeffd;
//     border-radius: 32px;
// }



.el-header{
	padding: 0;
}
li{
	list-style: none;
}
*{
	margin: 0;
	padding: 0;
}
</style>
