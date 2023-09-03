/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-05-30 19:53:04 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
import {nextTick, reactive, ref} from 'vue';
import SpecialInfo from "@/views/SpecialInfo/SpecialInfo.vue";
import MouseLoading from "@/components/MouseLoading.vue";
import SearchInfo from "@/views/Case/components/SearchInfo.vue";
/* 接口 */
import { getCaseNumber, getUser, getCase } from "@/api/search.js";
import { getSameCaseForm, getSameCaseNum } from "@/api/analysisDocx.js";
import {ElMessage, ElMessageBox} from "element-plus";
import tab from "bootstrap/js/src/tab.js";
import axios from "axios";
// 导入路由函数
import { useRouter } from "vue-router";
import Charts from "@/views/Case/components/Charts.vue";
// 创建路由对象
const router = useRouter();

// 控制全局遮罩层
let global_loading = ref(false);
// 判断是初始化的搜索框还是已经有所有内容列表展示后的搜索框（true 为前者）
let isShow9 = ref(true);
// 在后续的操作控制中快速判断用户是否已经登录
let isLogin = ref(false);



/* 获取案件数量相关 */
// 总的案件的数目（通过接口获得）
let caseNum = ref();
// 案件总数处的 loading，因为接口可能会有较大的时延，所以先用 loading 动画替代
let totalNum_loading = ref(true);
// 获取所有的案件数量（在 created 阶段执行）
const getCaseNum = () => {
	getCaseNumber().then(res => {
		// 关闭 loading 动画并赋值
		totalNum_loading.value = false;
		caseNum.value = res.data;
	}).catch(err => {
		totalNum_loading.value = true;
	})
}
// 执行
getCaseNum();


/* 定义一些存储变量 */
const Case = reactive({
	allCase: [],
	// 所有案例
	allLike: {},
	// 搜索后
	allLike1: {},
	// 点击标签后
	allLike2: {},
	//搜索关键字后的案例数据
	caseArr: [],
	//存储的搜索关键字后的案例数据
	caseArr2: [],
	caseName: [],
	caseNumber: 10,
	//侧边栏的数据
	courtArr: {},
	timeArr: {},
	areaArr: {},
	courtArr1: {},
	timeArr1: {},
	areaArr1: {},
	//相似案例
	sameCase: [],
	sameCaseLength: 0,
	// 选中的小标签
	courthierarchy: [],
	area: [],
	year: [],

})


/* 搜索框功能相关 */
// 用户在搜索框中的输入
let user_input = ref("")
// 请求销毁函数
let cancelFunc = ref(null);

// 按回车键隐藏推荐
const changeStyle = (status, className) => {
	let dom = document.querySelectorAll(className);
	dom[0].style.display = status;
}
// 加在搜索上的遮罩层判断
const changeIsSearch = () => {
	sameShow2.value = false;
	changeStyle("none", ".el-autocomplete-suggestion");
	if (user_input.value !== "" && isLogin.value) {
		iscase.value = false;
		global_loading.value = true;
		isShow9.value = false;
		setTimeout(() => {
			let timer = setInterval(() => {
				if (flag2.value) {
					if (Case.caseArr.length === 0) {
						isShow4.value = true;
						global_loading.value = false;
						isShow.value = false;
						iscase.value = false;
					} else {
						isShow4.value = false;
						global_loading.value = false;
						isShow.value = true;
						iscase.value = true;
					}
					clearInterval(timer);
				}
			}, 400);
		}, 1500);
	}
	if (!isLogin.value && user_input.value !== "") {
		// 并没有成功返回数据
		ElMessage({
			message: "未登录或者登录过期，请重新登录",
			type: "warning",
			center: true,
			duration: 1000,
		});
	}
}



// 点击第一个按钮
const searchHigh = () => {
	// 关闭“同案搜索”相关的内容
	dialogVisible.value = false;
	sameShow2.value = false;
	// 改变搜索框的形态
	isShow9.value = true;
	tabIndex.value = 0;
}
// 监视输入框的内容，进行模糊检索
const querySearch = (queryString, callback) => {
	sameShow2.value = false;
	if (typeof cancelFunc.value === "function") {
		cancelFunc();
	}
	if (user_input.value === "") {
		changeStyle("none", ".el-autocomplete-suggestion");
	} else {
		const searchKey = queryString;
		isShow4.value = false;
		flag2.value = false;
		// 模糊搜索
		axios({
			url: 'http://123.249.87.210:8002/case_like_search',
			// url: '/api/case_like_search',
			method: "post",
			headers: {
				token: localStorage.getItem("token"),
			},
			data: {
				key: queryString,
				court_level: "",
				court_area: "",
				time: "",
				page: 1
			},
			cancelToken: new axios.CancelToken((c) => {
				cancelFunc.value = c;
			})
		}).then(res => {
			if (res.data === "token校验失败") {
				ElMessage({
					message: "未登录或者登录过期，请重新登录",
					type: "warning",
					center: true,
					duration: 1000,
				});
				isLogin.value = false;
			} else {
				isLogin.value = true;
				// 能够搜索出来数据
				if (res.data.res.length !== 0) {
					Case.caseArr = res.data.res;
					Case.allLike1 = res.data.like_info;
					Case.allLike2 = res.data.like_info;
					Case.caseArr2 = res.data.res;
					Case.courtArr = res.data.like_info.court_level;
					Case.areaArr = res.data.like_info.court_area;
					Case.timeArr = res.data.like_info.time;
					// 获取模糊检索的列表
					Case.caseName = [];
					for (let i = 0; i < res.data.res.length; i++) {
						Case.caseName.push({
							value: res.data.res[i].title,
							ID: res.data.res[i].case_number,
						})
					}
					callback(Case.caseName);
				} else {
					iscase.value = false;
					isShow4.value = true;
					changeStyle("none", ".el-autocomplete-suggestion");
				}
				flag2.value = true;
			}
		}).catch(err => {
			Case.caseArr = [];
			issearch.value = false;
			flag2.value = true;
			iscase.value = false;
			isShow4.value = true;
		})
	}
}
// 跳转到要点击的案件页面
const handleSelect = (item) => {
	const caseId = item.ID;
	iscase.value = false;
	global_loading.value = true;

	setTimeout(() => {
		global_loading.value = false;
		router.push({
			path: "/specialInfo",
			query: {
				caseNumber: caseId,
				currentIndex: 0
			}
		})
	}, 1500);
}


/* 功能按钮相关 */
// 功能按钮的编号
let tabIndex = ref(0);
// 控制按钮，在用户未登录前不希望用户可以使用该按钮（刚开始时没有控制的，用于让用户点击一次按钮进行身份验证）
let lock = ref(false);


/* 全部案件相关 */
// 搜索所有案例
const allCaseStart = () => {
	getCase("案", "", "", "").then(res => {
		console.log(res);
		if (res.data !== "token校验失败") {
			// 成功返回了第一页的数据
			if (res.data.res.length !== 0) {
				// 保存所有的案件信息
				Case.allCase = res.data.res;
				// 保存没有加标签时的信息
				Case.caseArr2 = res.data.res;
				Case.courtArr1 = res.data.like_info.court_level;
				Case.areaArr1 = res.data.like_info.court_area;
				Case.timeArr1 = res.data.like_info.time;
				Case.allLike = res.data.like_info;
			} else {

				// 不可能进入这
			}
		}

	}).catch(err => {

	})
}
// 在 Created 阶段执行
allCaseStart();

// 展示所有案例（"全部案件"按钮功能）
const allCaseSearch = () => {
	lock.value = true;
	// 每次判断有没有登录
	getUser().then(res => {
		if (res.data !== "token校验失败") {
			// 关闭 "同案检索" 弹窗
			dialogVisible.value = false;
			//
			sameShow2.value = false;
			// 说明之间的 Created 阶段查询到了所有的案件信息
			if (Case.allCase.length !== 0) {
				// 侧边栏数据赋值
				Case.allLike1 = Case.allLike;
				Case.allLike2 = Case.allLike;
				// 清空用户输入
				user_input.value = "";
				// "激活"第二个按钮
				tabIndex.value = 1;
				// 切换搜索框状态
				isShow9.value = false;
				Case.caseArr = Case.allCase;
				Case.caseArr2 = Case.allCase;
				// 保存侧边栏数据
				Case.courtArr = Case.courtArr1;
				Case.areaArr = Case.areaArr1;
				Case.timeArr = Case.timeArr1;
				//
				isShow4.value = false;
				issearch.value = false;
				iscase.value = true;
				isShow.value = true;
			} else {
				// 说明在进入 案例库 路由时没有通过身份认证，需要再次调用接口查询
				// 开启全局 loading 动画
				global_loading.value = true;
				allCaseStart();
				let timer = setInterval(() => {
					if (Case.allCase.length !== 0) {
						Case.allLike1 = Case.allLike;
						Case.allLike2 = Case.allLike;
						user_input.value = "";
						tabIndex.value = 1;
						isShow9.value = false;
						Case.caseArr = Case.allCase;
						Case.caseArr2 = Case.allCase;
						Case.courtArr = Case.courtArr1;
						Case.areaArr = Case.areaArr1;
						Case.timeArr = Case.timeArr1;
						isShow4.value = false;
						issearch.value = false;
						iscase.value = true;
						isShow.value = true;
						// 关闭全局 loading
						global_loading.value = false;
						clearInterval(timer);
					}
				}, 1500);
			}
		} else {
			// 并没有成功返回数据
			ElMessage({
				message: "未登录或者登录过期，请重新登录",
				type: "warning",
				center: true,
				duration: 1000,
			});
		}
	}).catch(err => {
		console.log(err.message);
	})
	setTimeout(() => {
		lock.value = false;
	}, 2000);
}



// 是否展示用户选中的小标签
const isShowTag = () => {
	return !(Case.courthierarchy.length === 0 && Case.area.length === 0 && Case.year.length === 0);
}
// 选择标签
const chooseCourt = (id, value) => {
	flag.value = false;
	currentPage.value = 1;
	if (value === selectCourt.value || value === selectArea.value || value === selectTime.value) {
		flag.value = true;
	}
	if (flag.value === false) {
		if (id === 1) {
			selectCourt.value = value;
			if (Case.courthierarchy.length === 0) {
				Case.courthierarchy.push(value);
			} else {
				Case.courthierarchy.splice(0, 1, value);
			}
		}
		if (id === 2) {
			selectArea.value = value;
			if (Case.area.length === 0) {
				Case.area.push(value);
			} else {
				Case.area.splice(0, 1, value);
			}
		}
		if (id === 3) {
			selectTime.value = value;
			if (Case.year.length === 0) {
				Case.year.push(value);
			} else {
				Case.year.splice(0, 1, value);
			}
		}
		loading.value = true;
		getCase(user_input.value, selectCourt.value, selectArea.value, selectTime.value, 1).then(res => {
			if (res.data !== "token校验失败") {
				Case.caseNumber = res.data.res.length;
				Case.caseArr = res.data.res;
				Case.allLike1 = res.data.like_info;
				// 判断是否能搜索出来
				if (res.data.res.length !== 0) {
					// 获取模糊检索的列表
					Case.caseName = [];
					for (let i = 0; i < res.data.res.length; i++) {
						Case.caseName.push({
							value: res.data.res[i].title,
							ID: res.data.res[i].case_number,
						})
					}
				}
				hackReset2.value = false;
				nextTick(() => {
					hackReset2.value = true;
				})
			} else {
				// 并没有成功返回数据
				ElMessage({
					message: "未登录或者登录过期，请重新登录",
					type: "warning",
					center: true,
					duration: 1000,
				});
			}
			loading.value = false;
		}).catch(err => {})
	}
}
// 关闭选中的小标签
const handleClose = (id, tag) => {
	currentPage.value = 1;
	// indexOf() 方法可返回某个指定的字符串在大串中首次出现的位置
	if (id === 1) {
		Case.courthierarchy.splice(Case.courthierarchy.indexOf(tag), 1);
		selectCourt.value = "";
	}
	if (id === 2) {
		Case.area.splice(Case.area.indexOf(tag), 1);
		selectArea.value = "";
	}
	if (id === 3) {
		Case.year.splice(Case.year.indexOf(tag), 1);
		selectTime.value = "";
	}
	if (selectCourt.value === "" && selectArea.value === "" && selectTime.value === "") {
		Case.caseArr = Case.caseArr2;
		Case.allLike1 = Case.allLike2;
	} else {
		getCase(user_input.value, selectCourt.value, selectArea.value, selectTime.value, 1).then(res => {
			Case.allLike1 = res.data.like_info;
			Case.caseArr = res.data.res;
			if (res.data.res.length !== 0) {
				// 获取模糊检索的列表
				Case.caseName = [];
				for (let i = 0; i < res.data.res.length; i++) {
					Case.caseName.push({
						value: res.data.res[i].title,
						ID: res.data.res[i].case_number,
					})
				}
			}
		}).catch(err => {})
	}
	hackReset2.value = false;
	nextTick(() => {
		hackReset2.value = true;
	})
}



/* 同案检索相关 */
// 是否开启弹窗
let dialogVisible = ref(false);
// 上传的文件
let file = ref();
// 案例号输入
let sameInput = ref("");
// 弹窗的 loading 动画
let same_case_search_loading = ref(false);
// 没有找到案例显示
let notFoundSameCase = ref(false);
// 是否展示搜索后的结果
let sameShow2 = ref(false);
// 当前所处的页面
let currentPage = ref(1);
// 分页数量
let pageSize = ref(10);
// 选中的小标签
let selectCourt = ref("");
let selectTime = ref("");
let selectArea = ref("");
// 点击“同案检索”按钮
const sameSearchBtn = () => {
	// 打开弹窗
	dialogVisible.value = true;
	// 切换 tab
	tabIndex.value = 2;
}
// 关闭弹窗之前询问用户
const handleClose2 = done => {
	ElMessageBox.confirm('确认关闭吗？', {
		confirmButtonText: '是的',
		cancelButtonText: '不'
	})
		.then(() => {
			dialogVisible.value = false;
			done();
		})
		.catch(() => {
			// catch error
		})
}
// 同案检索
const sameCaseSearch = () => {
	currentPage.value = 1;
	sameShow2.value = false;
	notFoundSameCase.value = false;
	// 判断是以文件方式还是案例号
	// 文件方式
	if (file.value.files.length !== 0) {
		Case.sameCase = [];
		let formData = new FormData();
		formData.append("submit_file", file.value.files[0]);
		getSameCaseForm(formData).then(res => {
			same_case_search_loading.value = false;
			if (res.data === "token校验失败") {
				// 并没有成功返回数据
				ElMessage({
					message: "未登录或者登录过期，请重新登录",
					type: "warning",
					center: true,
					duration: 1000,
				});
			} else {
				same_case_search_loading.value = true;
				setTimeout(() => {
					const data = res.data.res_list;
					const id = res.data.case_info.title;
					sameChange(data, id, 0);
				}, 1000);
			}
		}).catch(err => {
			notFoundSameCase.value = true;
			same_case_search_loading.value = false;
		})
	} else if (sameInput.value !== "") {
		// 通过案件号的方式查询相似案例
		const caseId = sameInput.value.replace('"', "");
		let formData = new FormData();
		formData.append("case_number", caseId);
		// 同案检索
		getSameCaseNum(formData).then(res => {
			same_case_search_loading.value = true;
			setTimeout(() => {
				const data = res.data.sameChange;
				const id = sameInput.value;
				sameChange(data, id, 1);
			}, 1000);
		}).catch(err => {
			if (err.response.status === 401) {
				// 并没有成功返回数据
				ElMessage({
					message: "未登录或者登录过期，请重新登录",
					type: "warning",
					center: true,
					duration: 1000,
				});
			} else {
				notFoundSameCase.value = true;
			}
			same_case_search_loading.value = false;
		})
	} else {
		ElMessage({
			type: "warning",
			message: "请上传起诉状或者输入案件号",
			center: true,
			duration: 1500,
		})
	}
}
// 同案检索成功后的操作
const sameChange = (data, id, status) => {
	same_case_search_loading.value = false;
	Case.sameCase = [];
	Case.sameCaseLength = data.length;
	if (status === 0) {
		const len = id.length;
		const len2 = parseInt(0.7 * len);
		for (let i = 0; i < data.length; i++) {
			const vote = {};
			vote.title = data[i][1];
			vote.case_number = data[i][0];
			vote.sameNum = parseFloat(data[i][3] * 100).toFixed(2) + "%";
			Case.sameCase.push(vote);
			if (data[i][1].substr(0, len2) === id.substr(0, len2)) {
				vote.sameNum = "100.00%";
				Case.sameCase.pop()
				Case.sameCase.unshift(vote)
			}
		}
	} else {
		for (let i = 0; i < data.length; i++) {
			const vote = {};
			vote.title = data[i][1];
			vote.case_number = data[i][0];
			vote.sameNum = parseFloat(data[i][3] * 100).toFixed(2) + "%";
			Case.sameCase.push(vote);
			if (data[i][0] === id) {
				vote.sameNum = "100.00%";
				Case.sameCase.pop()
				Case.sameCase.unshift(vote)
			}
		}
	}

	// 找不到搜索内容消失
	isShow4.value = false;
	// 搜索出来的内容消失
	iscase.value = false;
	isShow9.value = false;
	dialogVisible.value = false;
	same_case_search_loading.value = false;
	// 展示相似案例
	dialogVisible.value = false;
	sameShow2.value = true;
}
// 分页功能
const handleSizeChange = (val) => {
	pageSize.value = val;
}
// 分页时销毁组件
const handleCurrentChange = val => {
	currentPage.value = val;
	getCase(user_input.value, selectCourt.value, selectArea.value, selectTime.value, val).then(res => {
		for (let i = val * 10 - 10, j = 0; j < 10;  i++, j++) {
			Case.caseArr[i] = res.data.res[j];
		}
	}).catch(err => {

	})
	setTimeout(() => {
		hackReset2.value = false;
		nextTick(() => {
			hackReset2.value = true;
		})
	}, 250);
}


/* 图表相关 */
// 切换图表
const changeEcharts = val => {
	hackReset2.value = val;
}


/* 未知变量 */
let isShow4 = ref(false);
let issearch = ref(false);
let iscase = ref(false);
let isShow = ref(false);
let flag = ref(false);
let flag2 = ref(false);   // 加在搜索框上的loading的判断
let hackReset = ref(true)  // 可能和图表相关
let hackReset2 = ref(true)  // 可能和图表相关
let first = ref(false)
let second= ref(true)
let loading= ref(false)

</script>

<template>
	<!-- 注释: 案例库 -->
	<div class="Case">
		<!-- 全局遮罩层 -->
		<div class="marks" v-show="global_loading"><MouseLoading /></div>
		<!-- 搜索框 -->
		<div :class="{ initSearch: isShow9 }">
			<!-- 标题 -->
			<div class="initSearchTitle">
				<div class="titleText">本案例库已经收录了</div>
				<!--案例库收录数量：刚加载出来的时候 caseNum 还不知道，所以用 loading 动画替换-->
				<div v-loading="totalNum_loading" class="wait" element-loading-background="rgba(0, 0, 0, 0)">
					<div class="titleText textMiddle">{{ caseNum }}</div>
				</div>
				<div class="titleText">个案件</div>
			</div>
			<!--搜索框-->
			<div class="search">
				<!--根据用户输入通过模糊匹配给出选项-->
				<el-autocomplete
					v-model="user_input"
					:trigger-on-focus="false"
					:fetch-suggestions="querySearch"
					@select="handleSelect"
					placeholder="请输入搜索案例关键词"
					@input="changeStyle('block', '.el-autocomplete-suggestion')"
					@keyup="changeStyle('block', '.el-autocomplete-suggestion')"
					@keyup.enter.native="changeIsSearch"
					placement="bottom"
				></el-autocomplete>
				<el-button
					type="primary"
					style="letter-spacing: 5px; font-size: 16px"
					@click="changeIsSearch"
					class="searchBtn"
				>
					<img src="@/assets/svg/搜索.svg" alt=""/>
				</el-button>
			</div>
			<!-- 三个功能按钮 -->
			<div class="cardBox" :class="{ putActive3: !isShow9 }">
				<!--案例搜索-->
				<div class="searchCard" @click="searchHigh" :class="{ searchCardSpecial: tabIndex === 0 }">案例搜索</div>
				<!--所有案件-->
				<div class="searchCard" @click="allCaseSearch" :class="{ searchCardSpecial: tabIndex === 1, active1: lock }">所有案件</div>
				<!--同案检索-->
				<div class="searchCard" @click="sameSearchBtn" :class="{ searchCardSpecial: tabIndex === 2 }">同案检索</div>
			</div>
		</div>
		<!-- 同案检索 -->
		<!-- 同案检索弹出框 -->
		<el-dialog
			v-model="dialogVisible"
			width="70%"
			class="sameBox"
			:modal="false"
			:before-close="handleClose2"
			v-loading="same_case_search_loading"
			element-loading-background="rgba(0, 0, 0, 0)"
			element-loading-text="拼命加载中"
		>
			<h1>同案检索</h1>
			<div class="content">
				<div class="tip">以下两种方式任选一种：</div>
				<div class="first">
					<span>上传起诉状:</span><input type="file" id="file_load" ref="file" accept=".docx" />
				</div>
				<div class="second">
           			 <span>输入案例号:</span><el-input placeholder="请输入内容" class="caseInput" v-model="sameInput"></el-input>
				</div>
				<el-button type="primary" class="third" @click="sameCaseSearch">检索</el-button>
			</div>
			<!-- 找不到相似案例 -->
			<div v-show="notFoundSameCase" class="notFoundSame">
				<img src="@/assets/svg/页面为空.svg" alt="" />
				<div class="title">没有找到相似案件<img src="@/assets/svg/哭泣.svg" alt="" /></div>
			</div>
		</el-dialog>
		<!-- 同案检索搜索结果 -->
		<div class="caseText caseText2 container2" v-if="sameShow2">
			<!-- 搜索关键词展示内容 -->
			<div class="right">
				<div class="rightTitle">
					<!--fixme：去掉this-->
					<div class="text" @click="changeEcharts(true)">相似案例（{{ Case.sameCase.length }}）</div>
					<!--fixme：批量下载功能未实现-->
					<div class="sort">
						<div class="sortText">
							<img src="@/assets/svg/download.svg" alt="" width="27" />
							<!-- <div>批量下载</div> -->
						</div>
					</div>
				</div>

				<!-- 右下内容 -->
				<div class="caseContainer">
					<div v-for="(item, index) in Case.sameCase.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="index">
						<search-info
							v-if="hackReset"
							:currentPage2="(currentPage - 1) * pageSize + 1 + index"
							:caseArr2="item"
							:special="first"
						></search-info>
					</div>
				</div>
				<!--mark：需求三里的分页器内容和页码数不匹配问题，内容不变-->
				<div class="pagination">
					<div class="block">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="currentPage"
							:page-sizes="[2, 4, 6, 8, 10]"
							:page-size="pageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="Case.sameCase.length"
						>
						</el-pagination>
					</div>
				</div>
			</div>
			<!-- :total="this.sameCase.length" -->
			<!-- 找不到你搜索的内容 -->
		</div>
		<!-- 全部案件 -->
		<el-main class="container2" v-show="!isShow9">
			<div v-if="iscase">
				<div class="labelsTag" v-if="isShowTag()">
					<div style="margin-left: 37px;color: #2d405e;display: inline-block;font-size: 14px;">已选条件：</div>
					<el-tag
						v-for="(tag1, index4) in Case.courthierarchy"
						:key="index4 + 'd'"
						closable
						:disable-transitions="false"
						@close="handleClose(1, tag1)"
						style="margin: 0 8px"
					>
						{{ tag1 }}
					</el-tag>
					<el-tag
						v-for="(tag2, index5) in Case.area"
						:key="index5 + 'f'"
						closable
						:disable-transitions="false"
						@close="handleClose(2, tag2)"
						style="margin: 0 8px"
					>
						{{ tag2 }}
					</el-tag>
					<el-tag
						v-for="(tag3, index6) in Case.year"
						:key="index6 + 'x'"
						closable
						:disable-transitions="false"
						@close="handleClose(3, tag3)"
						style="margin: 0 8px"
					>
						{{ tag3 }}
					</el-tag>
				</div>
			</div>

			<div v-if="!iscase" class="blank">
				<div class="special" v-if="isShow4">
					<img src="@/assets/svg/页面为空.svg" alt="" />
					<div>找不到您搜索的内容<img src="@/assets/svg/哭泣.svg" alt="" /></div>
				</div>
			</div>

			<div
				class="caseText"
				v-if="iscase"
				v-loading="loading"
				element-loading-background="rgba(0, 0, 0, 0)"
				element-loading-text="拼命加载中"
			>
				<!-- 左边内容 -->
				<div class="left">
					<div class="list">
						<div class="title">
							<img src="@/assets/svg/court.svg" alt="" width="25" />
							<h3>法院层级</h3>
						</div>
						<ul v-for="(val, key, index1) in Case.courtArr" :key="index1 + 'a'">
							<li @click="chooseCourt(1, key)" v-if="key!==''">{{ key }} ({{ val }})</li>
						</ul>
					</div>
					<el-divider></el-divider>

					<div class="list">
						<div class="title">
							<img src="@/assets/svg/area.svg" alt="" width="25" />
							<h3>地域</h3>
						</div>
						<ul v-for="(val, key, index2) in Case.areaArr" :key="index2 + 'b'">
							<li @click="chooseCourt(2, key)" v-if="key!==''">{{ key }} ({{ val }})</li>
						</ul>
					</div>
					<el-divider></el-divider>

					<div class="list">
						<div class="title">
							<img src="@/assets/svg/data.svg" alt="" width="25" />
							<h3>判决年份</h3>
						</div>
						<ul v-for="(val, key, index3) in Case.timeArr" :key="index3 + 'c'">
							<li @click="chooseCourt(3, key)" v-if="key!==''">{{ key }} ({{ val }})</li>
						</ul>
					</div>
				</div>

				<!-- 搜索关键词展示内容 -->
				<div class="right" v-if="isShow">
					<div class="rightTitle">
						<div class="text" @click="changeEcharts(true)">
							检索案例（{{ Case.allLike1.total }}）
						</div>
						<div
							class="text"
							style="margin-left: 5px"
							@click="changeEcharts(false)"
						>
							可视化
						</div>
						<div class="sort">
							<div class="sortText">
								<img src="@/assets/svg/download.svg" alt="" width="27" />
								<!-- <div>批量下载</div> -->
							</div>
						</div>
					</div>

					<!-- 右下内容 -->
					<div class="caseContainer" v-if="hackReset2">
						<div v-for="(item, index) in Case.caseArr.slice((currentPage - 1) * pageSize,currentPage * pageSize)" :key="index">
							<search-info
								v-if="hackReset2"
								:currentPage2="(currentPage - 1) * pageSize + 1 + index"
								:caseArr2="item"
								:special="second"
							></search-info>
						</div>
					</div>

					<!-- 地图部分(可视化部分) -->
					<div class="echarts" v-if="!hackReset2">
						<Charts
							style="width: 100%"
							:caseArr="Case.caseArr"
							:allLike1="Case.allLike1"
						></Charts>
					</div>
					<div class="pagination" v-if="hackReset2">
						<!--todo：在这增加翻页回到顶部-->
						<div class="block">
							<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="currentPage"
								:page-sizes="[10]"
								:page-size="pageSize"
								layout="total, sizes, prev, pager, next, jumper"
								:total="Case.allLike1.total"
							>
							</el-pagination>
						</div>
					</div>
				</div>

				<!-- 找不到你搜索的内容 -->
			</div>
		</el-main>
	</div>
</template>

<style scoped lang="scss">
/* 全局总容器 */
.Case {
	width: 100vw;
}

/* 全局遮罩层 */
.marks {
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, .3);
	z-index: 2;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
}

/* 搜索框 */
// 刚开始搜索框的样式
.initSearch {
	width: 50%;
	min-width: 700px;
	height: 350px;
	background-color: rgba(224, 225, 232, 0.25);
	backdrop-filter: blur(6px);
	-webkit-backdrop-filter: blur(6px);
	border: 1px solid hsla(0, 0%, 100%, 0.18);
	box-shadow: 0 6px 15px 0 hsla(0, 0%, 55.7%, 0.19);
	border-radius: 12px;
	-webkit-border-radius: 12px;
	color: white;
	margin: 150px auto;
	padding-top: 40px;
	.initSearchTitle {
		.titleText {
			font-size: 1.3rem;
		}
	}

	/* 初始标题样式 */
	.initSearchTitle {
		display: flex;
		justify-content: center;
		margin: 20px 0;
		color: black;

		.titleText {
			//font-size: 38px;
		}

		.wait {
			margin-right: 20px;
		}

		.textMiddle {
			color: rgb(107, 156, 242);
			margin-left: 15px;
		}
	}

	/* 初始搜索框样式 */
	.search {
		display: flex;
		align-items: center; /*垂直居中*/
		justify-content: center;
		margin-top: 32px;

		.searchBtn {
			width: 10%;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 20px;
				height: 20px;
			}
		}
		.el-autocomplete {
			width: 70%;
			display: table;
			padding-right: 5px;
			position: relative;
			z-index: 0;
		}
		.el-button {
			width: 10%;
			margin-left: 5px;
		}

		:deep(.el-input__inner) {
			height: 40px;
			width: 500px;
		}
	}
}

/* 后续标题样式 */
.initSearchTitle {
	display: flex;
	justify-content: center;
	margin: 20px 0;
	color: black;

	.titleText {
		font-size: 38px;
	}

	.wait {
		margin-right: 20px;
	}

	.textMiddle {
		color: rgb(107, 156, 242);
		margin-left: 15px;
	}
}

/* 后续搜索框样式 */
.search {
	display: flex;
	align-items: center; /*垂直居中*/
	justify-content: center;
	margin-top: 15px;

	.searchBtn {
		width: 10%;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 20px;
			height: 20px;
		}
	}
	.el-autocomplete {
		width: 70%;
		display: table;
		padding-right: 5px;
		position: relative;
		z-index: 0;
	}
	.el-button {
		width: 10%;
		margin-left: 5px;
	}

	:deep(.el-input__inner) {
		height: 40px;
		width: 815px;
	}
}

/* 功能按钮样式 */
.cardBox {
	display: flex;
	justify-content: space-evenly;
	//margin-top: 40px;
	margin-top: 55px;

	.searchCard {
		color: rgb(93, 172, 255);
		border-radius: 10px;
		font-family: Lato, sans-serif;
		font-weight: 500;
		font-size: 20px;
		text-align: center;
		cursor: pointer;
		position: relative;
		display: inline-block;
		box-shadow: 2px 2px 5px rgb(222, 220, 220);
		outline: none;
		width: 120px;
		height: 55px;
		background: #fff;
		line-height: 55px;
		padding: 0;
		border: none;
	}
	.searchCardSpecial {
		background-color: rgb(99, 151, 241);
		color: #fff;
	}
	div::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		border-top: 2.5px solid;
		border-left: 2.5px solid;
		// box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
		width: 0;
		height: 0;
		transition: all 0.3s ease;
		visibility: hidden;
		box-sizing: border-box;
		color: rgb(228, 236, 250);
	}
	div::after {
		content: "";
		position: absolute;
		right: 0;
		bottom: 0;
		border-right: 2.5px solid;
		border-bottom: 2.5px solid;
		width: 0;
		height: 0;
		transition: all 0.3s ease;
		visibility: hidden;
		box-sizing: border-box;

		color: rgb(228, 236, 250);
	}
	div:hover::before {
		width: 100%;
		height: 100%;
		visibility: visible;
	}
	div:hover::after {
		width: 100%;
		height: 100%;
		visibility: visible;
	}
	div:hover {
		background-color: rgb(99, 151, 241);
		box-shadow:
			// 2px 2px 2px 0 , 7px 7px 20px 0 rgb(0 0 0 / 10%), 4px 4px 5px 0 rgb(0 0 0 / 10%)
			inset 2px 2px 2px 0 rgb(148, 147, 147), 7px 7px 30px 0 rgb(203, 201, 201),
			4px 4px 5px 0 rgb(104, 104, 104);
		color: #fff;
		border-radius: 0;
	}
	.active {
		background-color: rgb(99, 151, 241);
		box-shadow:
			// 2px 2px 2px 0 , 7px 7px 20px 0 rgb(0 0 0 / 10%), 4px 4px 5px 0 rgb(0 0 0 / 10%)
			inset 2px 2px 2px 0 rgb(148, 147, 147), 7px 7px 30px 0 rgb(203, 201, 201),
			4px 4px 5px 0 rgb(104, 104, 104);
		color: #fff;
		border-radius: 0;
		border: 2.5px solid rgb(228, 236, 250);
	}

	/* 禁止鼠标点击 */
	.active1 {
		pointer-events: none; // 禁止鼠标点击事件
		cursor: not-allowed;  // 样式不显示是因为会和上面这一条冲突，而不用上面这一条，虽然会改变鼠标样式，但是还是会发生点击事件
	}

}

/* 后续按钮样式 */
.putActive3 {
	position: relative;
	margin-top: 0;
	top: -100px;
	left: calc(100% - 180px);
	width: 180px;
	display: flex;
	flex-wrap: wrap;
	.searchCard {
		margin-bottom: 20px;
	}
}

/* 同案搜索 */
.sameBox {
	h1 {
		display: flex;
		justify-content: center;
		// margin: 20px auto;
	}
	.content {
		font-size: 1.2rem;
	}
	.tip {
		margin-top: 40px;
		color: rgb(136, 160, 52);
		font-size: 1.05rem;
	}
	.first,
	.second {
		margin-top: 30px;
		margin-bottom: 40px;
		display: flex;
		align-items: center;
		font-size: 1.05rem;
		input {
			margin-left: 30px;
		}
	}
	.second {
		:deep(.el-input__inner) {
			height: 40px;
		}
	}
	.caseInput {
		width: 50%;
		margin-left: 30px;
	}
	.third {
		margin-left: calc(50% - 20px);
		position: relative;
		z-index: 100;
	}
	.notFoundSame {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: -80px;
		img {
			margin-top: 10px;
			width: 200px;
			height: 380px;
		}
		.title {
			display: flex;
			align-items: center;
			//margin-top: 20px;
			width: 100%;
			margin-top: -100px;
			color: rgb(51, 122, 183);
			// justify-content: center;
			img {
				width: 1.25em;
				height: 1.25em;
				margin: 0;
			}
		}
	}
}

/* 同案检索内容 */
.caseText {
	display: flex;
	// width: 80%;
	text-align: center;
	margin: 0 auto;
	padding-top: 5px;
	margin-bottom: 100px;
	// align-items: center;/*垂直居中*/

	justify-content: center; /*水平居中*/
	transition: 0.3s all;
}
.container2 {
	margin-top: -220px;
}
.caseText2 {
	margin-top: -200px;

	.right {
		width: 75%;
	}
}

.right {
	width: 62%;
	margin-left: 10px;

	.rightTitle {
		background: rgb(245, 245, 245);
		display: flex;
		.text {
			flex: 0 0 200px;
			background: #0b71b4;
			color: #fff;
			font-size: 14px;
			font-weight: 600;
			height: 30px;
			line-height: 30px;
			width: 215px;
		}

		.sort {
			width: 100%;
			display: flex;
			text-align: end;
			align-items: center; /*垂直居中*/
			justify-content: end;
			.sortText {
				padding-right: 10px;
				margin-right: 10px;
				font-size: 15px;
				height: 30px;
				display: flex;
				align-items: center;
				cursor: pointer;
				color: #0b71b4;

				img {
					margin: 0 2px;
				}
			}
		}
	}

	.caseContainer {
		background: rgb(245, 245, 245);
		align-items: center; /*垂直居中*/
		justify-content: center;
		padding-bottom: 28px;
		padding-top: 1px;
	}

	.pagination {
		.caseContainer {
			background: rgb(245, 245, 245);
			align-items: center; /*垂直居中*/
			justify-content: center;
			padding-bottom: 28px;
			padding-top: 1px;
		}
		.echarts {
			background: rgb(245, 245, 245);
		}

		.pagination {
			margin-top: 10px;
		}
	}
}

/* 全部案件 */
.caseContainer {
	background: rgb(245, 245, 245);
	align-items: center; /*垂直居中*/
	justify-content: center;
	padding-bottom: 28px;
	padding-top: 1px;
}
.labelsTag {
	background: rgb(245, 245, 245);
	width: 80%;
	align-items: center; /*垂直居中*/

	// justify-content: center;/*水平居中*/
	margin: 0 auto;
	display: flex;
	border-radius: 3px;
	height: 40px;
	margin-top: 10px;
	transition: 0.3s all;
}
.blank {
	height: 800px;
	width: 100%;
	display: flex;
	justify-content: center;
	.special {
		margin-top: 50px;
		height: 600px;
		img {
			width: 250px;
			height: 250px;
			margin-top: 80px;
		}
		div {
			margin: 5px auto;
			display: flex;
			justify-content: center;
			color: rgb(84, 112, 198);
			font-size: 1.25em;
			img {
				width: 1.25em;
				height: 1.25em;
				margin: 0;
			}
		}
	}
}

.left {
	width: 18%;
	float: left;
	text-align: left;
	box-sizing: border-box;
	background: rgb(245, 245, 245);
	border-radius: 3px;
	// height: 700px;
	.list {
		margin-left: 5px;
		.title {
			justify-content: start;
			margin: 8px;
			display: flex;
		}
		li:hover {
			.list {
				margin-left: 5px;
				.title {
					justify-content: start;
					margin: 8px;
				}
				li:hover {
					background-color: #d7e5f9;
					color: #165ac6;
					cursor: pointer;
				}
			}
		}
	}
}
h3 {
	letter-spacing: 2px;
	font-size: 16px;
	font-weight: 600;
	color: #2d405e;
	margin: 0;
	padding: 4px 2px;
}

.el-divider--vertical {
	height: 1.25em;
	margin-top: 2px;
}
.el-footer {
	padding: 0;
}

ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
	li {
		padding: 6px 0;
		font-size: 14px;
		display: block;
		font-weight: 400;
		color: rgb(45, 64, 94);
		padding-left: 40px;
	}
	li:hover {
		background-color: #d7e5f9;
		color: #165ac6;
	}
}
.el-divider--vertical {
	height: 1.25em;
	margin-top: 2px;
}


/* 分页器 */
.block {
	display: inline-flex;
	margin-top: 10px;
}

</style>