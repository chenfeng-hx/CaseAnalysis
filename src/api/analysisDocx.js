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
// export function getSameCaseForm(formData){
// 	return request({
// 		method:"post",
// 		url:"/api/get_sim_exa_from_file",
// 		data:formData
// 	})
// }
//
//
// //同案检索 上传索引号
// export function getSameCaseNum(formData){
// 	return request({
// 		method:"post",
// 		url:"/api/get_sim_exa_from_case",
// 		data:formData
// 	})
// }
//
// // 上传判决书
// export function upJudgment(formData){
// 	return request({
// 		method:"post",
// 		url:"/api/upload_case_jud",
// 		data:formData
// 	})
// }
//
// // 上传起诉状
// export function upClaim(formData){
// 	return request({
// 		method:"post",
// 		url:"/api/upload_case_cla",
// 		data:formData
// 	})
// }
//
// //根据判决书获取知识图谱
// export function getJudgementGeneration(id){
// 	return request({
// 		method:"get",
// 		url:"/api/kg_generation",
// 		params: {
// 			case_number: id,
// 		},
// 	})
// }
//
// //根据起诉状获取知识图谱
// // export function getClaimGeneration(formData){
// // 	return request({
// // 		method:"POST",
// // 		url:"/api/kg_claim",
// // 		data:formData
// // 	})
// // }
//
// // 修改以可以在变量发生改变时取消请求
// export const getClaimGeneration = (formData, fileType) => {
// 	if (cancel && fileType !== 0) {
// 		console.log('取消上次请求');
// 		cancel('取消上次请求');
// 	}
// 	return request({
// 		method:"POST",
// 		url:"/api/kg_claim",
// 		data:formData,
// 		cancelToken: new axios.CancelToken(function executor(c) {
// 			cancel = c;
// 		}),
// 	})
// }
//
//
//
// //获取案件基本信息
// export function getCaseInfo(id){
// 	return request({
// 		method:"get",
// 		url:"/api/case_info",
// 		params: {
// 			case_number: id,
// 		},
// 	})
//
// }

// http://10.16.43.202:8002/kg_claim

// 同案检索 上传文件
export function getSameCaseForm(formData){
	return request({
		method:"post",
		url:"http://123.249.87.210:8002/get_sim_exa_from_file",
		data:formData
	})
}


//同案检索 上传索引号
export function getSameCaseNum(formData){
	return request({
		method:"post",
		url:"http://123.249.87.210:8002/get_sim_exa_from_case",
		data:formData
	})
}

// 上传判决书
export function upJudgment(formData){
	return request({
		method:"post",
		url:"http://123.249.87.210:8002/upload_case_jud",
		data:formData
	})
}

// 上传起诉状
export function upClaim(formData){
	return request({
		method:"post",
		url:"http://123.249.87.210:8002/upload_case_cla",
		data:formData
	})
}

//根据判决书获取知识图谱
export function getJudgementGeneration(id){
	return request({
		method:"get",
		url:"http://123.249.87.210:8002/kg_generation",
		params: {
			case_number: id,
		},
	})
}


// 修改以可以在变量发生改变时取消请求
export const getClaimGeneration = (formData, fileType) => {
	if (cancel && fileType !== 0) {
		console.log('取消上次请求');
		cancel('取消上次请求');
	}
	return request({
		method:"POST",
		url:"http://123.249.87.210:8002/kg_claim",
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
		url:"http://123.249.87.210:8002/case_info",
		params: {
			case_number: id,
		},
	})

}
