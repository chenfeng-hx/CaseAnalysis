import {request}  from "./request"


//同案检索 上传文件
export function getSamecaseForm(formdata){
    return request({
method:"post",
url:"/get_sim_exa_from_file",
data:formdata
    })
}


//同案检索 上传索引号
export function getSamecaseNum(formdata){
    return request({
method:"post",
url:"/get_sim_exa_from_case",
data:formdata
    })
}

// 上传判决书
export function upJugment(formdata){
    return request({
method:"post",
url:"/upload_case_jud",
data:formdata
    })
}

// 上传起诉状
export function upClaim(formdata){
    return request({
method:"post",
url:"/upload_case_cla",
data:formdata
    })
}

//根据判决书获取知识图谱
export function getJugementGeneration(id){
    return request({
method:"get",
url:"/kg_generation",
params: {
    case_number: id,
  },
    })
}

//根据起诉状获取知识图谱
export function getClaimGeneration(formdata){
    return request({
method:"POST",
url:"/kg_claim",
data:formdata
    })
}


//获取案件基本信息
export function getCaseInfo(id){
    return request({
method:"get",
url:"/case_info",
params: {
    case_number: id,
  },
    })

}

// http://10.16.43.202:8002/kg_claim