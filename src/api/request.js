import axios from 'axios'
import { Message } from 'element-ui';

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://42.192.225.73:88/',
    headers: {
      "token": localStorage.getItem("token"), //	可以是授权凭证用的参数值
  },
    timeout: 5000
  })
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  // instance.interceptors.request.use(config => {
  //   return config
  // }, err => {
  //   // console.log(err);
  // })
  // // 2.2.响应拦截
  // instance.interceptors.response.use(res => {
  
  //   if(res.data != "token校验失败"){
  //   return res
  //   }else{
  //     Message.warning('您还未登录，请先登录！')
  //   }
  // }, err => {
  //   console.log(err);
  // })

  // 3.发送真正的网络请求
  return instance(config)
}
