/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-04-22 11:29:19 编写而成！
 *    祝你食用愉快！！！
 */
import {request}  from "./request"

//搜索用户信息
export function getUser(){
	return request({
		url:"/api/get_user_info",
		method: "get",
	})
}

//搜索案例 模糊搜索
export function getCase(key,court_level,court_area,time,page){
	return request({
		url:"/api/case_like_search",
		method:'post',
		// 简写形式
		data: {
			// 案件匹配的关键字
			key,
			// 案件法院层级
			court_level,
			// 案件发生地点
			court_area,
			// 案件发生时间
			time,
			// 所求的页码数
			page
		},
	})
}

// 获取全部案件的数量
export const getCaseNumber = () => {
	return request({
		url: '/api/get_count',
		method: 'get',
	})
}
