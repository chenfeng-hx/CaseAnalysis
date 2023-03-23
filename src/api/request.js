import axios from 'axios'
import { Message } from 'element-ui';

export function request(config) {
	// 1.创建axios的实例
	const instance = axios.create({
		baseURL: 'http://123.249.87.210:8002',
		headers: {
			"token": localStorage.getItem("token"), //	可以是授权凭证用的参数值
		},
		timeout: 20000
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
