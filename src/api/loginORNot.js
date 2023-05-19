/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-05-19 11:30:34 编写而成！
 *    祝你食用愉快！！！
 */
import axios from 'axios'

export function loginFunc(formdata) {
	return axios({
		method: 'post',
		url: "/api/login",
		data: formdata
	})
}