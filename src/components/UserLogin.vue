/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-04-29 18:35:01 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
import {ref} from 'vue';
import { ElMessage } from "element-plus";
import { loginFunc } from '@/api/loginORNot'
/* 界面切换功能实现 */
// 控制是展示登录界面还是注册界面(true为前者)
let isLogin = ref(true);


/* 登录界面的功能实现 */
// 用户名和密码
let username = ref('');
let password = ref('');
const emit = defineEmits(['loginMsg', 'nameSend']);
// 登录方法
function login() {
	if (username.value !== "" && password.value !== "") {
		let loginFormData = new FormData();
		loginFormData.append("username", username.value);
		loginFormData.append("password", password.value);
		loginFunc(loginFormData)
			.then((res) => {
				ElMessage({
					type: "success",
					message: res.data.detail,
					center: "true",
					duration: 1000,
					customClass: "press",
				});
				this.$store.commit("$_setToken", res.data.token);
				// 修改 <AppBar> 的登录状态
				emit("loginMsg",false);
				emit("nameSend", username.value);
			})
			.catch((err) => {
				ElMessage({
					type: "warning",
					message: err.response.data.detail,
					center: "true",
					duration: 1000,
					customClass: "press",
				});
			});
	} else {
		ElMessage({
			type: "warning",
			message: "填写不能为空！",
			center: "true",
			duration: 1000,
			customClass: "press",
		});

	}
}


/* 注册界面的功能实现 */


/* 找回密码界面的功能实现 */



</script>

<template>
	<!-- 注释 -->
	<div class="contain">
		<div class="big-box" :class="{ active: isLogin }">
			<!-- 登录 -->
			<div class="big-contain" v-if="isLogin">
				<div class="showTitle">登录</div>
				<div class="login">
					<div class="loginName">
						<span class="left"><label for="loginName">用户名</label></span>
						<el-input id="loginName" v-model.trim="username" clearable></el-input>
					</div>
					<div class="loginPwd">
						<span class="left"><label for="loginPwd">密码</label></span>
						<el-input id="loginPwd" v-model="password" show-password></el-input>
					</div>
					<div class="forget" @click="forgetBtn()">忘记密码？邮箱找回</div>
				</div>
				<button class="subBtn" @click="login" @keyup.enter="enterLogin">登录</button>
			</div>
			<!-- 注册账号 / 修改密码 -->

			<!--侧边栏欢迎消息-->
			<div class="small-box" :class="{ active: isLogin }">
				<div class="small-contain" key="smallContainRegister" v-if="isLogin">
					<div class="sTitle">你好，朋友!</div>
					<p class="sContent">开始注册，和我们一起探索更深层次的司法文本信息</p>
					<button class="sButton" @click="changeType" v-show="changePass">注册</button>
				</div>
				<div class="small-contain" key="smallContainLogin" v-else>
					<div class="sTitle">欢迎回来!</div>
					<p class="sContent">与我们保持联系，请登录你的账户</p>
					<button class="sButton" @click="changeType">登录</button>
				</div>
			</div>
			<!-- 修改密码（增加页面高度） -->
			<div class="blank"></div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.contain {
	width: 700px;
	height: 500px;
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, 0);
	background-color: #ffffff;
	border-radius: 5px;
	box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
	z-index: -1000;
}

.big-box {
	width: 70%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 30%;
	/* 点击按钮切换注册和登录的动画 */
	transform: translateX(0%);
	transition: all 1s;

	&.active {
		left: 0;
		transition: all 0.5s;
	}

	.big-contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

}


.subBtn {
	width: 20%;
	height: 40px;
	border-radius: 24px;
	border: none;
	outline: none;
	background-color: rgb(57, 167, 176);
	color: #ffffff;
	font-size: 0.9em;
	cursor: pointer;
}

.forget {
	margin: 15px auto 20px 56%;
	font-size: 14px;
	cursor: pointer;

	&:hover {
		color: rgb(143, 143, 225);
	}
}

.loginName,
.loginPwd {
	display: flex;
	align-items: center;
	margin: 30px 0;

	.left {
		width: 80px;
		font-size: 16px;
		color: black;

		label {
			cursor: pointer;
		}
	}
}

.showTitle {
	font-size: 1.5em;
	font-weight: bold;
	color: rgb(57, 167, 176);
}

.small-box {
	width: 30%;
	height: 100%;
	background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
	position: absolute;
	top: 0;
	left: 0;
	transition: all 1s;
	transform: translateX(0%);
	border-top-left-radius: inherit;
	border-bottom-left-radius: inherit;

	&.active {
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}

	.small-contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.sTitle {
		font-size: 1.5em;
		font-weight: bold;
		color: #ffffff;
	}

	.sContent {
		font-size: 0.8em;
		color: #ffffff;
		text-align: center;
		padding: 2em 2em;
		line-height: 1.7em;
	}

	.sButton {
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #ffffff;
		outline: none;
		background-color: transparent;
		color: #ffffff;
		font-size: 0.9em;
		cursor: pointer;
	}
}





</style>