/**
 * 当前代码编辑信息:
 *    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
 *    于 2023-04-22 11:09:19 编写而成！
 *    祝你食用愉快！！！
 */
import {request}  from "./request"
import axios from "axios";

let cancel;

//同案检索 上传文件
export function getSameCaseForm(formdata){
	return request({
		method:"post",
		url:"/api/get_sim_exa_from_file",
		data:formdata
	})
}


//同案检索 上传索引号
export function getSameCaseNum(formdata){
	return request({
		method:"post",
		url:"/api/get_sim_exa_from_case",
		data:formdata
	})
}

// 上传判决书
export function upJudgment(formdata){
	return request({
		method:"post",
		url:"/api/upload_case_jud",
		data:formdata
	})
}

// 上传起诉状
export function upClaim(formdata){
	return request({
		method:"post",
		url:"/api/upload_case_cla",
		data:formdata
	})
}

//根据判决书获取知识图谱
export function getJudgementGeneration(id){
	return request({
		method:"get",
		url:"/api/kg_generation",
		params: {
			case_number: id,
		},
	})
}

//根据起诉状获取知识图谱
// export function getClaimGeneration(formdata){
// 	return request({
// 		method:"POST",
// 		url:"/api/kg_claim",
// 		data:formdata
// 	})
// }

// 修改以可以在变量发生改变时取消请求
export const getClaimGeneration = (formData, fileType) => {
	if (cancel && fileType !== 0) {
		console.log('取消上次请求');
		cancel('取消上次请求');
	}
	return request({
		method:"POST",
		url:"/api/kg_claim",
		data:formData,
		cancelToken: new axios.CancelToken(function executor(c) {
			cancel = c;
		}),
	})
}



//获取案件基本信息
export function getCaseInfo(id){
	return request({
		method:"get",
		url:"/api/case_info",
		params: {
			case_number: id,
		},
	})

}

// http://10.16.43.202:8002/kg_claim
