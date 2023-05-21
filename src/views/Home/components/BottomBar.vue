/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-05-21 09:32:41 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
import { useTokenStore } from "@/store/index.js";
const store = useTokenStore();
const { changeTabName } = store;

</script>

<template>
	<!-- 注释 -->
	<div class="container">
		<!-- 左侧展示信息 -->
		<div class="info">
			<div class="left">
				<ul>
					<li>产品</li>
					<li @click="changeTabName('analysis')">文书分析</li>
					<li @click="changeTabName('case')">案例检索</li>
					<li @click="changeTabName('relevant')">相关科普</li>
					<li @click="changeTabName('display')">数据展示</li>
					<li @click="changeTabName('recommendation')">法条推荐</li>
				</ul>
			</div>
			<div class="right">
				<ul>
					<li>公司</li>
					<li>关于我们</li>
					<li>隐私政策</li>
					<li>新手指引</li>
					<li>联系我们</li>
				</ul>
			</div>
		</div>
		<!-- 右侧联系方式 -->
		<div class="phone">
			<div class="top">
				<div>
					<ul>
						<li>友情链接</li>
						<li><a href="http://www.cqupt.edu.cn/" target="_blank">重庆邮电大学</a></li>
						<li><a href="https://wenshu.court.gov.cn/" target="_blank">裁判文书网</a></li>
					</ul>
				</div>
			</div>
			<div class="bottom">
				<ul>
					<li><img src="@/assets/svg/联系.svg" alt=""></li>
					<li><img src="@/assets/svg/联系客服.svg" alt=""></li>
					<li><img src="@/assets/svg/邮箱.svg" alt=""></li>
					<li><img src="@/assets/svg/详细地址.svg" alt=""><span>地址：重庆|南岸</span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.container{
	width: 100%;
	height: 230px;
	background-color: #1e1e1e;
	color: rgb(255, 255, 255, .5);
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;

	/* 左侧展示信息 */
	.info {
		width: 420px;
		display: flex;
		justify-content: space-around;
		margin-left: 82px;
		margin-top: 7px;
	}

	/* 右侧联系方式 */
	.phone {
		margin-right: 300px;
		margin-top: 7px;

		.top {
			ul {
				li {
					display: inline-block;
					margin-right: 15px;

					&:first-of-type {
						margin-right: 0;
						text-align: left;
						display: block;
					}

					a {
						color: rgb(255, 255, 255, .5);
						&:hover {
							color: #FFFFFF;
						}
						&:active {
							color: rgb(255, 255, 255, .5);
						}
					}
				}
			}
		}

		.bottom {
			margin-top: 1px;
			ul {
				li {
					display: inline-block;
					margin-right: 15px;

					&:first-of-type {
						color: rgb(255, 255, 255, .5);
						font-size: 14px;
						margin-right: 15px;
						cursor: pointer;
					}

					img {
						width: 30px;
						height: 30px;
						border-radius: 50%;
						border: 2px solid rgb(255, 255, 255, .3);
						padding: 4px;
						line-height: 38px;
					}

					span {
						float: right;
						display: inline-block;
						padding-top: 12px;
						padding-left: 6px;
					}
				}
			}
		}
	}

	/* 共用 */
	ul {
		li {
			margin: 10px 0;
			font-size: 14px;
			cursor: pointer;
			text-align: center;

			&:first-of-type {
				color: #FFFFFF;
				font-size: 18px;
				margin-bottom: 17px;
				cursor: default;
			}

			&:hover {
				color: #FFFFFF;
			}
		}
	}
}


</style>