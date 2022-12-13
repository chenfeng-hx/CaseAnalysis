import {request}  from "./request"


//搜索用户信息
export function getUser(formdata){
    return request({
url:"/get_user_info"
    })
}

//搜索案例 模糊搜索
export function getCase(key,court_level,court_area,time){
    return request({
url:"/case_like_search",
method:'post',
data: {
    key: key,
    court_level: court_level,
    court_area: court_area,
    time: time,
  },
    })
}
