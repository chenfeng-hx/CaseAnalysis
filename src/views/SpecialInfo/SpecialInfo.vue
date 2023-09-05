/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-06-04 18:18:02 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
import { useRouter, useRoute } from "vue-router";
import {nextTick, onMounted, reactive, ref} from 'vue';
import {getCaseInfo, getJudgementGeneration, getSameCaseNum} from "@/api/analysisDocx.js";
import MapKnowledge from "@/components/MapKnowledge2.vue";
import SameCases from "@/components/SameCases.vue";
import {ElMessage} from "element-plus";


/* 返回按钮逻辑 */
// 创建路由实例
const router = useRouter();
const route = useRoute();
// 返回跳转方法
const backView = () => router.go(-1);

/* 左侧导航栏逻辑 */
// 当前导航栏所在的页面
let navIndex = ref(1);

// 更改当前展示的内容
const changeNavIndex = newNavIndex => {
	navIndex.value = newNavIndex;
}
/* 右侧页面所展示的案件信息 */
const CaseDetails = reactive({
	// 保存案件信息
	caseInfo: {},
	// 保存起诉状的知识图谱
	pendingMap: {},
	// 保存判决书的知识图谱
	judgmentMap: {},
	// 保存同案智推信息
	sameCases: []
})

// 获取当前的展示信息
const getCaseInfoData = (caseNumber=null) => {
	CaseDetails.caseInfo = {};
	CaseDetails.pendingMap = {};
	CaseDetails.judgmentMap = {};
	CaseDetails.sameCases = [];
	// 接收传递过来的参数
	let caseId = caseNumber ? caseNumber : route.query.caseNumber;
	// 获取案件信息
	getCaseInfo(caseId)
		.then(res => {
			if (res.data !== 'token校验失败') {
				// console.log(res.data);
				// 保存案件信息
				CaseDetails.caseInfo = res.data;
				// 查询知识图谱
				getJudgementGeneration(caseId)
					.then(res => {
						// console.log("nihO",res.data);
						if (res.data.judgement_kg.node_list !== []) {
							// 保存知识图谱
							CaseDetails.pendingMap = res.data.claim_kg;
							CaseDetails.judgmentMap = res.data.judgement_kg;
						}
					})
					.catch(() => {
						ElMessage({
							message: "知识图谱获取失败",
							type: "error",
							center: true,
							duration: 1000,
						});
					})
			} else {
				ElMessage({
					message: "未登录或者登录过期，请重新登录",
					type: "warning",
					center: true,
					duration: 1000,
				});
			}
		})
		.catch(() => {
			ElMessage({
				message: "案件信息获取失败",
				type: "error",
				center: true,
				duration: 1000,
			});
		})
	// 获取同案智推信息
	let sameCasesFormData = new FormData();
	// 所需要的 token 已经在请求头中携带了
	sameCasesFormData.append('case_number', caseId);
	getSameCaseNum(sameCasesFormData).then(res => {
		const data = res.data;
		if (res.data !== 'token校验失败') {
			if (data.length !== 0) {
				// 有同案智推数据
				for (let i = 0; i < data.length; i++) {
					const item = {};
					// 案例号 [(2019)渝0118民初7829号]
					item.case_number = data[i][0];
					// 案例名称
					item.title = data[i][1];
					item.similarityValue = (data[i][3] * 100).toFixed(2) + "%";
					CaseDetails.sameCases.push(item);
				}
			} else {
				ElMessage({
					message: "该案例没有相似案例",
					type: "warning",
					center: true,
					duration: 1000,
				});
			}
		} else {
			ElMessage({
				message: "未登录或者登录过期，请重新登录",
				type: "warning",
				center: true,
				duration: 1000,
			});
		}
	}).catch(() => {
		ElMessage({
			message: "获取相似案例出错啦",
			type: "error",
			center: true,
			duration: 1000,
		});
	})
}

// 初始化信息
onMounted(() => {
	getCaseInfoData();
})

// 触发事件（如果是在 SpecialInfo 组件中点击 SameCases 跳转，则只更新数据）
const updateData = ({ caseNumber }) => {
	getCaseInfoData(caseNumber);
	nextTick(() => {
		navIndex.value = 1;
	})
}

</script>

<template>
	<!-- 注释：文章详情页展示 -->
	<div class="container">
		<!-- 导航栏 -->
		<nav>
			<ul>
				<li>
					<!-- 回退按钮 -->
					<button @click="backView">
						<img src="@/assets/svg/返回.svg" alt="">
						<span style="font-family: 'Microsoft YaHei';">返回</span>
					</button>
				</li>
				<li @click="changeNavIndex(1)" :class="{active : navIndex === 1}">
					<img src="@/assets/svg/法律文书.svg" alt="">
					<span>起诉状</span>
				</li>
				<li @click="changeNavIndex(2)" :class="{active : navIndex === 2}">
					<img src="@/assets/svg/判决.svg" alt="">
					<span>判决书</span>
				</li>
				<li @click="changeNavIndex(3)" :class="{active : navIndex === 3}">
					<img src="@/assets/svg/特征检索.svg" alt="">
					<span>要素提取(起诉状)</span>
				</li>
				<li @click="changeNavIndex(4)" :class="{active : navIndex === 4}">
					<img src="@/assets/svg/特征检索.svg" alt="">
					<span>要素提取(判决书)</span>
				</li>
				<li @click="changeNavIndex(5)" :class="{active : navIndex === 5}">
					<img src="@/assets/svg/文书.svg" alt="">
					<span>同案智推</span>
				</li>
			</ul>
		</nav>
		<!-- 文章详情 -->
		<div class="detail">
			<!-- 文章标题 -->
			<div class="fileName" v-show="navIndex !== 3 && navIndex !== 4">{{ CaseDetails.caseInfo.title }}</div>
			<!-- 文章内容 -->
			<div class="fileContent">
				<!-- 起诉状 -->
				<div class="pleading" v-show="navIndex === 1">
					<pre>{{ CaseDetails.caseInfo.claim }}</pre>
				</div>
				<!-- 判决书 -->
				<div class="judgment" v-show="navIndex === 2">
					<pre>{{ CaseDetails.caseInfo.judgment }}</pre>
				</div>
				<!-- 要素提取 -->
				<div class="map" v-show="navIndex === 3">
					<map-knowledge v-if="navIndex === 3" :map-knowledge-info="CaseDetails.pendingMap" :case-info="CaseDetails.caseInfo"/>
				</div>
				<div class="map" v-show="navIndex === 4">
					<map-knowledge v-if="navIndex === 4" :map-knowledge-info="CaseDetails.judgmentMap" :case-info="CaseDetails.caseInfo" />
				</div>
				<!-- 同案智推 -->
				<div class="cases" v-show="navIndex === 5">
					<same-cases :same-cases="CaseDetails.sameCases" @updateData="updateData"  />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100vh;
	display: flex;

	/* 导航栏 */
	nav {
		width: 20%;
		height: 100%;
		border-right: 1px solid #999999;

		ul {
			li {
				width: 90%;
				height: 70px;
				user-select: none;
				display: flex;
				align-items: center;
				line-height: 70px;
				transition: all 0.5s;
				cursor: pointer;
				border-radius: 25px;
				padding-left: 25px;
				font-weight: 500;
				font-size: 20px;
				font-family: 'Microsoft YaHei';

				span {
					margin-left: 10px;
				}

				img {
					width: 30px;
				}

				&.active {
					background-color: #e8e8e8;
				}

				&:hover {
					background-color: #e8e8e8;
					transform: scale(1.01);
				}

				&:active {
					transform: scale(0.95) rotate(1.7deg);
				}

				&:first-of-type {
					border-bottom: 1px solid #999999;
					border-radius: 0;
					margin-bottom: 5px;
					padding-left: 0;
					width: 100%;
				}

				/* 按钮的动画逻辑 */
				button {
					display: flex;
					height: 3em;
					width: 100px;
					align-items: center;
					justify-content: center;
					//border-radius: 3px;
					border-radius: 10px;
					letter-spacing: 1px;
					transition: all 0.2s linear;
					cursor: pointer;
					border: none;
					background: #FFFFFF;
					font-size: 15px;
					margin-left: 15px;

					img {
						width: 25px;
						margin: 0 5px;
						transition: all 0.4s ease-out;
					}

					&:hover{
						box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
						transform: scale(1.02);
						img {
							transform: translateX(-5px);
						}
					}
				}
			}


		}
	}

	/* 案件信息 */
	.detail{
		width: 80%;
		height: 100%;

		/* 文章标题 */
		.fileName {
			width: 700px;
			height: 40px;
			margin: 0 auto;
			border-radius: 0 0 5px 5px;
			border: 2px solid #999999;
			border-top: none;
			line-height: 40px;
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			box-shadow: 3px 3px 1px rgba(0,0,0,.4);
			color: rgb(84, 112, 198);
		}

		/* 文章内容 */
		.fileContent {
			width: 95%;
			margin: 10px auto;
			padding: 10px;

			pre {
				all: initial;
				width: 100%;
				white-space: pre-wrap; /* css-3 */
				white-space: -moz-pre-wrap; /* Mozilla, since1999 */
				white-space: -o-pre-wrap; /*Opera 7 */
				word-wrap: break-word; /* Internet Explorer 5.5+ */
			}
		}
	}
}


</style>