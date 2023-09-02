/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-05-30 19:53:04 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
import {reactive, ref} from 'vue';
import SpecialInfo from "@/views/SpecialInfo/SpecialInfo.vue";
import MouseLoading from "@/components/MouseLoading.vue";
/* 接口 */
import { getCaseNumber, getUser, getCase } from "@/api/search.js";
import {ElMessage, ElMessageBox} from "element-plus";
import tab from "bootstrap/js/src/tab.js";

// 控制全局遮罩层
let global_loading = ref(false);
// 判断是初始化的搜索框还是已经有所有内容列表展示后的搜索框（true 为前者）
let isShow9 = ref(true);



/* 获取案件数量相关 */
// 总的案件的数目（通过接口获得）
let caseNum = ref(2888);
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
	//侧边栏的数据
	courtArr: {},
	timeArr: {},
	areaArr: {},
	courtArr1: {},
	timeArr1: {},
	areaArr1: {},
})


/* 搜索框功能相关 */
// 用户在搜索框中的输入
let user_input = ref("")

// 按回车键隐藏推荐
const changeStyle = (status, className) => {
	let dom = document.querySelectorAll(className);
	dom[0].style.display = status;
}
// 搜索内容
const changeIsSearch = () => {

}


/* 功能按钮相关 */
// 功能按钮的编号
let tabIndex = ref(0);
// 控制按钮，在用户未登录前不希望用户可以使用该按钮
let lock = ref(false);
// 搜索所有案例
const allCaseStart = () => {
	getCase("案", "", "", "").then(res => {
		if (res.data !== "token校验失败") {
			// 成功返回了第一页的数据
			if (res.data.res.length !== 0) {
				// 保存所有的案件信息
				Case.allCase = res.data.res;
				// 保存没有加标签时的信息
				Case.caseArr2 = red.data.res;
				Case.courtArr1 = res.data.like_info.court_level;
				Case.areaArr1 = res.data.like_info.court_area;
				Case.timeArr1 = res.data.like_info.time;
				Case.allLike = res.data.like_info;
			} else {
				// 并没有成功返回数据
				ElMessage({
					message: "未登录或者登录过期，请重新登录",
					type: "warning",
					center: true,
					duration: 1000,
				});
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
				//
				Case.courtArr = "";

			}
		}
	}).catch(err => {

	})
}

/* 同案检索相关 */
// 是否开启弹窗
let dialogVisible = ref(true);
// 弹窗的 loading 动画
let same_case_search_loading = ref(false);
// 没有找到案例显示
let notFoundSameCase = ref(false);
// 关闭弹窗之前询问用户
const handleClose = (done) => {
	ElMessageBox.confirm('确认关闭吗？')
		.then(() => {
			dialogVisible.value = false;
			done();
		})
		.catch(() => {
			// catch error
		})
}


/* 未知变量 */
let sameShow2 = ref(false);

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
					@keyup="changeStyle('none', '.el-autocomplete-suggestion')"
					@keyup.enter.native="changeIsSearch"
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
				<div class="searchCard" @click="searchHigh()" :class="{ searchCardSpecial: tabIndex === 0 }">案例搜索</div>
				<!--所有案件-->
				<div class="searchCard" @click="allCaseSearch()" :class="{ searchCardSpecial: tabIndex === 1, active1: lock }">所有案件</div>
				<!--同案检索-->
				<div class="searchCard" @click="sameSearchBtn()" :class="{ searchCardSpecial: tabIndex === 2 }">同案检索</div>
			</div>
		</div>
		<!-- 同案检索 -->
		<!-- 同案检索弹出框 -->
		<el-dialog
			:visible.sync="dialogVisible"
			width="70%"
			class="sameBox"
			:modal="false"
			:before-close="handleClose"
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
					<div class="text" @click="changeEcharts(true)">
						相似案例（{{ this.sameCase.length }}）
					</div>
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
					<div
						v-for="(item, index) in sameCase.slice(
                (currentPage - 1) * pagesize,
                currentPage * pagesize
              )"
						:key="index"
					>
						<search-info
							v-if="hackReset"
							:currentPage2="(currentPage - 1) * pagesize + 1 + index"
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
							:page-size="pagesize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="this.sameCase.length"
						>
						</el-pagination>
					</div>
				</div>
			</div>
			<!-- :total="this.sameCase.length" -->
			<!-- 找不到你搜索的内容 -->
		</div>
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
}

/* 初始标题样式 */
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
		font-size: 1.25rem;
	}
	.first,
	.second {
		margin-top: 30px;
		margin-bottom: 40px;
		display: flex;
		align-items: center;
		input {
			margin-left: 30px;
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

</style>