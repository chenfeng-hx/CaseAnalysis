/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-05-19 11:30:34 编写而成！
 *    祝你食用愉快！！！
 */
import axios from 'axios'

// 用户登录验证
export function loginFunc(formData) {
	return axios({
		method: 'post',
		url: "/api/login",
		data: formData
	})
}

// 向用户输入的邮箱中发送验证码
export function sendCodeFunc(param) {
	return axios({
		method: 'get',
		url: '/api/send_verify_code',
		params: param
	})
}

// 用户注册验证
export function registerFunc(formData) {
	return axios ({
		method: 'post',
		url: '/api/register',
		data: formData
	})
}

// 用户修改密码
export function sendNewPwdFunc(formData) {
	return axios({
		url: '/api/forget_pwd',
		method: 'post',
		data: formData
	})
}
