/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-04-22 14:28:38 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
// 引入子组件
import BottomBar from "@/views/Home/components/BottomBar.vue";
import {reactive} from "vue";
// 引入部分图片
import analysis from '@/assets/svg/analysis.svg';
import exhibition from '@/assets/svg/exhibition.svg';
import retrieval from '@/assets/svg/retrieval.svg';
import data from '@/assets/svg/data.svg';
import smile from '@/assets/images/smile.png';
import lawHall from '@/assets/images/lawHall.png';
import hall from '@/assets/images/hall.png';

import {useTokenStore} from "@/store/index.js";

/* 循环更新路由跳转卡片信息 */
// 路由卡片动态数组
const showCard = reactive([
	{
		id:0,
		name:'文书分析',
		img: analysis,
		path:'analysis'
	},
	{
		id:1,
		name:'案例展示',
		img: exhibition,
		path:'Case'
	},
	{
		id:2,
		name:'类案检索',
		img: retrieval,
		path:'Case'
	},
	{
		id:3,
		name:'相关科普',
		img: data,
		path:'relevant'
	},
]);

// 三张展示卡片信息
const infoCard = reactive([
	{
		selfClass: 'card1',
		img: smile,
		info1: '自动化',
		info2: '文本分词、类案检索、数据分析...'
	},
	{
		selfClass: 'card2',
		img: lawHall,
		info1: '200+',
		info2: '人工标注数据集训练与测试'
	},
	{
		selfClass: 'card3',
		img: hall,
		info1: '反馈学习',
		info2: '根据用户标注反馈训练优化模型'
	},
])

// 获取点击的导航标签并进行路由跳转
const store = useTokenStore();
// 点击导航后进行路由跳转
const { changeTabName } = store;

</script>

<template>
	<!-- 注释 -->
	<!-- 首页导航栏 -->
	<el-container>
		<el-main>
			<!-- 首页文字加背景 -->
			<div class="background">
				<div class="text">
					<div class="center">
						<div class="text1">我们是司法文本的</div>
						<div class="text2">分析者</div>
					</div>
				</div>
			</div>
			<!-- "立即使用"展示卡片 -->
			<div class="content">
				<!-- 顶部文字 -->
				<div class="title">
					<span class="textLeft">我们可以做</span>
					<span class="textRight">什么</span>
				</div>
				<!-- 路由跳转卡片 -->
				<div class="exhibition">
					<!--循环立即使用卡片-->
					<div v-for="item in showCard" :key="item.id" class="box">
						<div class="icon">
							<img :src="item.img" alt="">
						</div>
						<div class="text">{{item.name}}</div>
						<div class="btn">
							<el-button type="primary" @click="changeTabName(item.path)">立即使用</el-button>
						</div>
					</div>
				</div>
			</div>
			<!--三张展示卡片-->
			<div class="showInfoCard">
				<div class="background-card">
					<el-card :body-style="{ padding: '0' }" :class="item.selfClass" v-for="item in infoCard" :key="item.info1">
						<img :src="item.img" class="image" alt="">
						<div class="inCards">
							<span class="intro1">{{ item.info1 }}</span>
							<br>
							<br>
							<span class="intro2">{{ item.info2 }}</span>
						</div>
					</el-card>
				</div>
				<div class="bg"></div>
			</div>
		</el-main>
		<!--尾部信息展示-->
		<el-footer><BottomBar/></el-footer>
	</el-container>

</template>

<style scoped lang="scss">
.el-main {
	padding: 0;

	/* 首页文字加背景 */
	.background {
		height: 100vh;
		background: linear-gradient(rgba(117, 122, 128, .3), rgba(209, 230, 250, .6)), url('@/assets/images/background.jpg');
		/* 背景图垂直、水平均居中 */
		background-position: center center;
		/* 背景图不平铺 */
		background-repeat: no-repeat;
		/* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
		background-attachment: fixed;
		/* 让背景图基于容器大小伸缩 */
		background-size: cover;
		/* 设置背景颜色，背景图加载过程中会显示背景色 */
		background-color: #FFFFFF;

		/* 首页文字 */
		.text {
			height: 100%;
			width: 100%;
			background: rgba(0, 0, 0, .6);
			position: relative;

			.center {
				height: 300px;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				font-size: 55px;
				font-style: italic;
				letter-spacing: 7px;
				padding-left: 100px;
				color: rgb(246, 248, 250);

				.text1 {
					height: 70px;
				}

				.text2 {
					font-style: normal;
					color: rgb(241, 241, 101);
					font-weight: 120;
					font-size: 60px;
				}
			}
		}
	}
	/* "立即使用"展示卡片 */
	.content {
		height: 520px;
		margin-top: 60px;

		/* 顶部文字 */
		.title{
			letter-spacing: 2px;
			text-align: center;
			.textLeft{
				font-size: 45px;
				display: inline-block;
				height: 100%;
			}
			.textRight{
				font-size: 50px;
				display: inline-block;
				height: 100%;
				font-style: italic;
				color: rgb(196, 196, 26);
				font-weight: 100;
			}
		}

		/* 循环“立即使用”卡片 */
		.exhibition{
			display: flex;
			margin-top: 20px;
			width: 100%;
			justify-content: center;

			/* 单个卡片样式 */
			.box{
				width: 240px;
				text-align: center;
				height: 334px;
				margin: 0 15px;
				box-shadow: 0 5px 12px 2px #a3a2a2;
				border-radius: 4px;
				font-size: 28px;
				padding: 50px 24px 24px 24px;

				.text{
					margin-top: 30px;
					font-size: 30px;
				}
				.icon{
					margin-top: 5px;
					margin-bottom: 10px;

					&>img{
						width: 80px;
					}
				}
				.describe{
					text-align: left;
					padding-top: 10px;
					font-size: 14px;
					text-indent: 1em;
				}
				.btn{
					padding-top: 58px;

					.el-button{
						width: 100%;
					}
				}
			}
		}
	}
	/* 三种展示卡片 */
	.showInfoCard {
		margin-bottom: 50px;

		.background-card {
			position: relative;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			background-color: #F5F9FC;
			height: 350px;
			width: 74%;
			margin-top: 30px;
			margin-left: 13%;

			.card1, .card2, .card3{
				position: absolute;
				box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
				background-color: #FFFFFF;
				height: 73%;
				width: 30%;
				top:15%;
				left:2%;
				z-index: 1;

				.image {
					width: 20%;
					margin-left: 40%;
					margin-top: 4%;;
					display: block;
				}

				.inCards {
					padding: 14px;
					text-align: center;

					.intro1{
						font-family: "思源宋体 CN Heavy";
						font-size: xx-large;
						color: #1D5C93;
					}

					.intro2{
						font-family: "方正苏新诗柳楷简体";
						font-size: medium;
						color: #2C3E50;
					}

				}
			}

			.card2 { left:35%; }
			.card3 { left:68%; }
		}

		.bg {
			background:linear-gradient(to left,#FFFFFF,#b6b6b6,#FFFFFF);
			height:3px;
			position: relative;
			margin-top: 30px;
		}
	}
}

:deep .el-header{
	padding: 0 0 0 0;
}

// 盒子动画效果
.box {
	overflow: hidden;
	position: relative;
	border: 1px solid rgb(196, 194, 194);
	background-color: rgb(248, 244, 244);
	transition: all .2s;
}

.box:hover {
	transform: translateY(-20px);
	box-shadow: 0 26px 40px -24px rgb(119, 107, 107);
	background: linear-gradient(180deg, #f97949 0%, #e42626 100%);
	color: #ffffff;
	.text{
		font-size: 35px;
	}
	.describe{
		color: #ffffff;
	}
	.el-button--primary {
		background-color: #ffffff;
		border-color:#ffffff;
		color: #E42626;
	}
}

.el-footer{
	padding: 0;
	background-color: transparent;
}

</style>
