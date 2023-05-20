/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-04-22 14:37:35 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
import {ref} from "vue";
import { getUser } from "@/api/search.js";
import { ElMessage } from 'element-plus'
import router from '@/router';
import UserLogin from "@/components/UserLogin.vue";

// 因为 setup 本就代替了 created，beforeCreate 钩子，所以本来在这两个钩子中执行的函数可以直接在 setup 中执行
// 获取信息（验证信息，失败则会传回“token校验失败”）
/**
 * 用户信息验证模块
 * 在用户首次打开页面的时候进行 token 身份校验：
 * 		如果校验成功则不显示登录按钮
 * 		并显示相对应的用户名称(返回值详情查看接口文档)
 */
getUser().then((res) => {
		if(res.data !== "token校验失败"){
			// 说明登录过，应该是后端比对 token，返回用户信息
			isLogin.value = false;
			username.value = res.data.username;
		} else{
			// 发送提示信息
			ElMessage({
				message: "未登录或者登录过期，请重新登录",
				type: "warning",
				center: true,
				duration: 1000,
			});
		}
	}
).catch(() => ElMessage.warning("出错啦") );

// 控制展示登录按钮还是登录用户的信息
let isLogin = ref(true);

// 用于登录过后输出用户名
let username = ref("");

// 控制模态框是否展示
let dialogVisible = ref(false);

/* 下面两个函数用于传递给 login 子组件用于控制用户名信息的传出 */
// 登录成功
const loginMsg = flag => {
	dialogVisible.value = flag;   // false:关闭登录框
	isLogin.value = false;       // 显示用户名称
}

// 获取用户名
const nameSend = newUserName => {
	username.value = newUserName;    // 返回用户名称信息
}

// 退出登录时展示提示消息
const exitLogin = () => {
	isLogin.value = true;     // 重新展示登录按钮
	localStorage.removeItem("token");    // 移除存储的 token
	ElMessage({
		type: 'success',
		message: '已退出登录',
		center: true,
		duration: 500,
	})
}


/**
 * 路由导航跳转模块
 * 在点击导航按钮后进行路由页面的切换
 */
// 获取点击的导航标签并进行路由跳转
let appTab = ref("home");
// 点击导航后进行路由跳转
const changeTabName = name => {
	appTab.value = name;
	router.replace("/" + name);
}

</script>

<template>
	<!-- 注释 -->
	<div class="topBar">
		<!--布局-->
		<div class="topContent">
			<!--左侧logo-->
			<div class="logoImg" @click="changeTabName('home')">
				<div class="logo">
					<img src="../assets/logo.svg" alt="logo">
				</div>
				<div>Ai法律检索</div>
			</div>
			<!--中间导航区-->
			<div class="tab">
				<!--选中的导航块加上选中样式，并同时切换路由-->
				<div class="text" :class="{ 'tabs-active': appTab === 'home'}" @click="changeTabName('home');" >首页</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'analysis'}" @click="changeTabName('analysis');">文书分析</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'Case'}" @click="changeTabName('Case')">案例库</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'relevant'}" @click="changeTabName('relevant')">相关科普</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'display'}" @click="changeTabName('display')">数据展示</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'recommendation'}" @click="changeTabName('recommendation')">法条推荐</div>
			</div>
			<!--登录/注册-->
			<div class="signBtn">
				<!--未登录时显示登录按钮-->
				<el-button type="primary" @click="dialogVisible = true" plain v-if="isLogin">注册/登录</el-button>
				<!--否则显示用户名，并带有退出登录的下拉菜单-->
				<!-- mark: 可以在此处修改 trigger 的触发方式 click/ hover -->
				<el-dropdown trigger="click">
					<span class="el-dropdown-link">
						 <span v-if="!isLogin">你好！ {{ username }} </span>
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item @click="exitLogin">
								<img src="../assets/退出登录.svg" alt="" style="width: 20px; margin-right: 3px;">退出登录
							</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<!--弹出登录/注册模态框-->
			<el-dialog
				v-model="dialogVisible"
				width="0%"
				center
				:append-to-body = true
				:show-close="false"
			>
				<!--使用 <UserLogin> 组件-->
				<UserLogin @loginMsg="loginMsg" @nameSend="nameSend"></UserLogin>
			</el-dialog>
		</div>
	</div>
</template>

<style scoped lang="scss">
.topBar {
	height: 70px;
	background-color: rgb(39, 37, 35);
	position: fixed;
	/* 让头部导航栏的宽高扩展至100% */
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-content: center;

	.topContent {
		width: 100%;
		display: flex;
		/* 调整元素在主轴的位置 */
		justify-content: space-between;
		/* 调整元素在纵轴的位置 */
		align-items: center;
		/* 左侧 logo */
		.logoImg {
			width: 10%;
			display: flex;
			white-space: nowrap;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			font-size: 22px;
			padding-left: 20px;
			cursor: pointer;

			.logo {
				padding-right: 3px;

				img {
					width: 35px;
				}
			}
		}
		/* 中间导航区 */
		.tab {
			width: 60%;
			display: flex;
			padding: 0 20px;
			white-space: nowrap;
			justify-content: center;
			color: #ffffff;
			font-size: 18px;

			.text {
				text-align: center;
				/* 基于元素内容自动调整宽度 */
				width: fit-content;
				margin: 0 20px;
				cursor: pointer;
			}

			.tabs-active {
				color: #f1f165;
			}
		}

		/* 登录/注册按钮 */
		.signBtn {
			width: 13%;
			white-space: nowrap;

			span {
				color: rgb(26, 160, 52);
				font-size: 1rem;
				cursor: pointer;
			}

		}
	}
}
</style>

