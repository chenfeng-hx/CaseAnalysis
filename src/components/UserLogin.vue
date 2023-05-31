/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-04-29 18:35:01 编写而成！
*    祝你食用愉快！！！
*/
<script setup lang="ts">
import {onMounted, reactive, ref, nextTick} from 'vue';
import {ElMessage, FormInstance} from "element-plus";
// 登录接口
import { loginFunc, sendCodeFunc, registerFunc, sendNewPwdFunc } from '../api/loginORNot.js';
// 导入store
import { useTokenStore } from "../store";


// store 实例
const store = useTokenStore();

/**
 * 界面切换功能实现
 */

// 控制是展示登录界面还是注册界面(true为前者)
let isLogin = ref(true);
// 控制是展示注册页面还是修改密码页面(true为前者)
let changePass = ref(true);
// 控制页面切换的方法
const changeType = () => {
	isLogin.value = !isLogin.value;
	changePass.value = true;
}

/**
 * 登录界面的功能实现
 */

// 用户名和密码
let username = ref('');
let password = ref('');
// 触发事件，向父组件发送用户名信息
const emit = defineEmits(['loginMsg', 'nameSend']);
// 登录事件
const login = () => {
	if (username.value !== "" && password.value !== "") {
		let loginFormData = new FormData();
		loginFormData.append("username", username.value);
		loginFormData.append("password", password.value);
		// 发送登录请求
		loginFunc(loginFormData)
			.then(res => {
				ElMessage({
					type: "success",
					message: res.data.detail,
					center: true,
					duration: 1000,
				});
				// 存储 token
				store.$_setToken(res.data.token);
				// 修改 <AppBar> 的登录状态
				emit("loginMsg", false);
				emit("nameSend", username.value);
			})
			.catch(() => {
				ElMessage({
					type: "error",
					message: "用户名或密码错误",
					center: true,
					duration: 1000,
				});
			});
	} else {
		ElMessage({
			type: "warning",
			message: "填写不能为空！",
			center: true,
			duration: 1000,
		});
	}
}


/**
 * 注册界面的功能实现
 */

// 注册的用户信息
const form = reactive({
	username: "",
	pass: "",
	checkPass: "",
	email: ""
})

// 注册验证码
let registerCode = ref("");

// 规则判定函数,用于校验密码
const validatePass = (rule, value, callback) => {
	if (value === "") {
		callback(new Error("请输入密码"));
	}else if (value.length > 16 || value.length < 8) {
		callback(new Error("密码长度为8~16位"));
	}  else {
		if (form.checkPass !== "") {
			registerOrChangePwdForm.value.validateField("checkPass");
		}
		callback();
	}
};
const validateCheckPass = (rule, value, callback) => {
	if (value === "") {
		callback(new Error("请再次输入密码"));
	} else if (value !== form.pass) {
		callback(new Error("两次输入密码不一致!"));
	} else {
		callback();
	}
};

// 用户输入时进行规则匹配
const rules = reactive({
	email: [
		{  message: '请输入邮箱地址', trigger: 'blur' },
		{
			type: 'email',
			message: '请输入正确的邮箱地址',
			trigger: ['blur', 'change'],
		},
	],
	pass: [{ validator: validatePass, trigger: "blur" }],
	checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
})

// 判断发送邮箱验证码的按钮是否已被”成功“点击(发送成功),成功则改变字样
let isSendCodeSuccess = ref(false);
// 字样改变值
let text = ref('发送验证码');
// 发送邮箱验证码
const sendCode = () => {
	let reg2 = /^\w{3,20}$/
	// fixme:正则表达式无法匹配到 chenfeng_worker@163.com
	let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	// 密码和”确认密码“都已经验证过了，所以只需要验证用户名和邮箱就行
	// 检查邮箱和用户名格式
	if (form.email === "")  ElMessage({ type: "warning", message: "请输入邮箱地址" });
	else if (!reg.test(form.email))  ElMessage({ type: "warning", message: "邮箱格式不正确" });
	else if (form.username === '')  ElMessage({ type: "warning", message: "请输入用户名" });
	else if (!reg2.test(form.username))  ElMessage({ type: "warning", message: "用户名格式不正确" });
	else{
		// 可以进行发送
		// 改变发送验证码按钮的字样和样式
		text.value = "已发送";
		isSendCodeSuccess.value = true;
		// 发送验证码
		sendCodeFunc({
			username: form.username,
			email: form.email,
		})
		.then(() => ElMessage({ type: "success", message: "发送成功" }))
		.catch(() => {
			ElMessage({
				type: "error",
				message: "发送失败",
			});
			text.value = "发送验证码";
			isSendCodeSuccess.value = false;
		});
	}
}

// 注册表的 ref 引用
const registerOrChangePwdForm = ref<FormInstance>();

// 注册方法
const sendRegisterForm = () => {
	registerOrChangePwdForm.value.validate(valid => {
		if (valid) {
			let registerFormData = new FormData();
			registerFormData.append("password", form.pass);
			registerFormData.append("email", form.email);
			registerFormData.append("verify", registerCode.value);
			registerFormData.append("username", form.username);
			// 发送注册请求
			registerFunc(registerFormData)
			.then(res => {
				if (res.data.detail === "success") {
					ElMessage({
						type: "success",
						message: "注册成功,请进行登录",
					});
					// 切换为登录页面
					this.changeType();
				} else if (res.data.detail === "该用户已存在") {
					ElMessage({
						type: 'error',
						message: "注册失败了，请换个用户名试试吧！",
						duration: 2000,
					})
				} else if (res.data.detail === "验证码错误") {
					ElMessage({
						type: 'error',
						message: "不可以拿别人的验证码哦，快看看是不是输错了",
						duration: 2000,
					})
				} else{
					// 不应该将其他如 ”该用户已存在“ 之类的信息返回给用户，会出现安全问题
					ElMessage({
						type: "error",
						message: "注册失败,请保证信息的完整度和准确度哦",
					});
				}
			}).catch(() => {
				ElMessage({
					type: "error",
					message: "注册失败",
				});
			});
			text.value = "发送验证码";
			isSendCodeSuccess.value = false;
		} else {
			ElMessage({
				type: "warning",
				message: "请保证信息的完整度和准确度哦！",
				center: true,
				duration: 1000,
			});
		}
	});
}

/**
 * 找回密码界面的功能实现
 */

// 找回密码验证码
let changePwdCode = ref("");

// 将表单内容置为空并切换页面
const forgetBtn = () => {
	isLogin.value = false;
	changePass.value = false;
	form.username = "";
	form.pass = "";
	form.checkPass = "";
	form.email = "";
	text.value = "发送验证码";
	isSendCodeSuccess.value = false;
}

// 发送更改密码请求
const sendChangePwdForm = () => {
	registerOrChangePwdForm.value.validate(valid => {
		if (valid) {
			let changePwdFormData = new FormData();
			changePwdFormData.append("password", form.pass);
			changePwdFormData.append("email", form.email);
			changePwdFormData.append("verify", changePwdCode.value);
			// 发送更改密码请求
			sendNewPwdFunc(changePwdFormData)
			.then(() => {
				ElMessage({
					type: "success",
					message: "修改成功, 请重新登录！",
					center: true,
					duration: 1000,
				});
				// 返回登录页面
				changeType();
			}).catch(() => {
				text.value = "发送验证码";
				isSendCodeSuccess.value = false;
				ElMessage({
					type: "warning",
					message: "修改失败, 请确保验证码或邮箱输入正确",
					center: true,
					duration: 1500,
				});
			});
		} else {
			ElMessage({
				type: "warning",
				message: "请输入完整的正确信息",
				center: true,
				duration: 1000,
			});
		}
	});
}

// 判断是提交"注册"信息还是提交"忘记密码"信息(用于回车注册或回车修改密码)
const chooseFunc = () => {
	// 判断用户进入的是哪一个页面, 以此来确定调用什么函数
	changePass.value ? sendRegisterForm() : sendChangePwdForm();
}


// onMounted(() => {
// 	// 挂载上时给登录用的 input 框加上焦点
// 	nextTick(() => {
// 		document.getElementById('loginName').focus();
// 	})
// })

</script>

<template>
	<!-- 登录模块 -->
	<div class="contain">
		<div class="big-box" :class="{ active: isLogin }">
			<!-- 登录 -->
			<div class="big-contain" v-if="isLogin">
				<div class="showTitle">登录</div>
				<div class="login">
					<div class="loginName">
						<span class="left"><label for="loginName">用户名</label></span>
						<el-input id="loginName" v-model.trim="username" @keyup.enter="login" clearable></el-input>
					</div>
					<div class="loginPwd">
						<span class="left"><label for="loginPwd">密码</label></span>
						<el-input id="loginPwd" v-model="password" @keyup.enter="login" show-password></el-input>
					</div>
					<div class="forgetPwd" @click="forgetBtn">忘记密码？邮箱找回</div>
				</div>
				<button class="subBtn" @click="login">登录</button>
			</div>
			<!-- 注册账号 / 修改密码 -->
			<div class="big-contain" v-if="!isLogin">
				<!-- 标题 -->
				<div class="showTitle" v-text="changePass ? '注册账号' : '修改密码' "></div>
				<!-- 表单内容 -->
				<div class="bottom" >
					<el-form ref="registerOrChangePwdForm" :model="form" :rules="rules" label-width="82px" status-icon scroll-to-error>
						<!-- 不论是注册账号还是修改密码都会展示 -->
						<el-form-item label="用户名">
							<el-input v-model="form.username" @keyup.enter="chooseFunc"></el-input>
						</el-form-item>
						<span class="userTip">只能包含数字、字母、下划线，并且第一个字母为大写</span>

						<!-- 密码切换展示 -->
						<el-form-item :label="changePass ? '密码' : '新密码'" prop="pass">
							<el-input
								type="password"
								v-model="form.pass"
								autocomplete="off"
								placeholder="请输入8~16位的密码"
								show-password
								@keyup.enter="chooseFunc"
							></el-input>
						</el-form-item>

						<!-- 不论是注册账号还是修改密码都会展示 -->
						<el-form-item label="确认密码" prop="checkPass">
							<el-input
								type="password"
								v-model="form.checkPass"
								autocomplete="off"
								show-password
								@keyup.enter="chooseFunc"
							></el-input>
						</el-form-item>

						<el-form-item prop="email" :label="changePass ? '邮箱' : '以前的邮箱'">
							<el-input v-model="form.email" @keyup.enter="chooseFunc"></el-input>
						</el-form-item>

						<!-- 只有注册账号展示的内容 -->
						<el-form-item class="shut" v-show="changePass">
							<el-input v-model="registerCode" class="emailBox" placeholder="输入验证码" @keyup.enter="chooseFunc"></el-input>
							<el-button class="remove" @click="sendCode" :class="{ active1: isSendCodeSuccess }">{{ text }}</el-button>
						</el-form-item>

						<!-- 只有修改密码展示的内容 -->
						<el-form-item class="shut" v-show="!changePass">
							<el-input v-model="changePwdCode" class="emailBox" placeholder="输入验证码" @keyup.enter="chooseFunc"></el-input>
							<el-button class="remove" @click="sendCode" :class="{ active1: isSendCodeSuccess }">{{ text }}</el-button>
						</el-form-item>
					</el-form>
				</div>
				<button class="subBtn" @click="sendRegisterForm"  v-show="changePass">注册</button>
				<button class="subBtn" @click="sendChangePwdForm" v-show="!changePass">提交</button>
			</div>
		</div>
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

.forgetPwd {
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


/* 侧边栏展示部分 */
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

/* 表单注册样式 */
.bottom {
	margin-top: 35px;
}

.userTip {
	display: block;
	width: 100%;
	font-size: 10px;
	margin-left: 70px;
	margin-top: -15px;
	margin-bottom: 10px;
	color: rgb(54, 171, 152);
}

.emailTip{
	display: block;
	margin-left: -80px;
	width: 150px;
}

.shut {
	margin-top: -20px;

	.emailBox {
		width: 150px;
		margin-top: 20px;
		/* 调整 el-input 的宽高，验证码的 width 应该小一些 */
		&:deep .el-input__inner {
			width: 135px;
		}
	}

	.remove {
		width: 100px;
		margin-top: 20px;
		margin-left: 20px;
	}

	.active1 {
		//pointer-events: none;  /* 禁止鼠标点击事件 */
		cursor: not-allowed;
	}
}

/* 调整 el-input 的宽高 */
:deep .el-input__inner {
	width: 200px;
	--el-input-inner-height: 32px;
}

</style>