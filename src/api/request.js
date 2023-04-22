/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-04-22 11:14:30 编写而成！
 *    祝你食用愉快！！！
 */
import axios from 'axios'

export function request(config) {
	// 1.创建axios的实例
	const instance = axios.create({
		baseURL: 'http://123.249.87.210:8002',
		headers: {
			"token": localStorage.getItem("token"), //	可以是授权凭证用的参数值
		},
		timeout: 20000
	})

	// 3.发送真正的网络请求
	return instance(config)
}
