/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-05-30 19:45:27 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
// import * as echarts from 'echarts';
// 按需引入 echarts
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { GraphChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import {watch} from "vue-demi";
import {isReactive} from "vue";

echarts.use([
	ToolboxComponent,
	TooltipComponent,
	LegendComponent,
	GraphChart,
	CanvasRenderer
]);

/* 左侧绘画"知识图谱"相关 */
// 接收 canvas 的绘画参数信息和提取出的案件信息
const props = defineProps({
	mapKnowledgeInfo: Object,
	caseInfo: Object,
})

//bug 不知道为啥加了这行代码就可以重画canvas了
// 问了gpt的答案：因为在 Vue 3 中，添加 console.log(isReactive(‘变量名’))
// 可以使警告消失的原因可能是由于当第一次触发 watch 时，父组件传递给子组件的 reactive 对象还未完成初始化，
// 导致其是非响应式的 Object 类型，而不是 reactive Proxy 对象。此时使用 isReactive() 函数判断其是否为响应式对象，
// 可以确保当 reactive 对象完成初始化后，watcher 正确监听到 reactive 对象的变化
// 但是实际生产不建议这样做
isReactive(props.mapKnowledgeInfo)
isReactive(props.caseInfo)

// 改用 toRefs 做
// const mapDatas = toRefs(props.mapKnowledgeInfo);
// 将 caseInfo 案件信息中的内容解构出来
// const { title, court, court_area, typeForJudgment, case_number, plaintiff, defendant, law, time } = toRefs(props.caseInfo);

// 为什么加这行代码: 因为下面的和title一样的这些值都是 undefined
// 解决原因：gpt:打印 title 值的同时 Vue 响应该变量的变化，从而将其变成响应式数据，触发依赖并使其有值
// console.table(title.value)

// 进行绘画
const echartsInit = () => {
	// canvas 容器
	let mapContainer = document.getElementById('mapping');
	// 创建一个 echarts 实例
	let mapCharts = echarts.init(mapContainer);
	// 准备数据(fixme:还有问题,待排查)
	// const categories = props.mapKnowledgeInfo.node_list.reduce((ret, item) => {
	// 	ret.push({name: item.category})     // 居然被 gpt 改出了错误
	// }, []);
	const categories = [];
	for (let i = 0; i < props.mapKnowledgeInfo.node_list.length; i++) {
		let item = {};
		item.name = props.mapKnowledgeInfo.node_list[i].category;
		categories.push(item);
	}
	// 配置项
	const option = {
		// canvas 的标题(先不放, 图比较大的时候不好看)
		// title: {
		// 	text: '知识图谱',
		// 	textStyle: {
		// 		color: '#333333',
		// 		fontStyle: 'normal',
		// 	},
		// 	top: 'top',
		// 	left: 'center',
		// },
		// 提示框组件
		tooltip: {
			// 是否展示
			show: true,
			// 触发方式(鼠标经过触发)
			trigger: 'item',
		},
		// 工具箱组件
		toolbox: {
			// 显示工具箱
			show: true,
			// 工具栏图标的方向
			orient: 'vertical',
			// 工具栏的相对位置
			top: 1,
			right: 1,
			// 图标的大小
			itemSize: 20,
			// 图标间距
			itemGap: 10,
			// 鼠标经过展示每个图标的标题
			showTitle: true,
			// 功能配置项
			feature: {
				// 还原
				restore: {
					// 显示
					show: true,
				},
				// 下载
				saveAsImage: {
					// 显示
					show: true,
				}
			}
		},
		// 图表组件(数据)
		legend: [{
			data: categories.map(item => item.name)
		}],
		// 图标相关
		series: [{
			type: 'graph',      // 类型: 关系图
			layout: 'force',    // 采用力引导布局
			roam: true,         // 开启鼠标缩放和平移漫游
			symbolSize: 50,     // 调整节点的大小
			edgeSymbol: ['circle', 'arrow'],     // 边两端的标记类型,箭头
			edgeSymbolSize: [2, 10],   // 边两段标记的大小

			// 图标相关
			edgeLabel: {
				show: true,     // 是否显示标签
				fontSize: 13,   // 文字的字体大小
				formatter: item => item.data.name   // 标签内容格式器
			},
			// 力引导图的相关配置
			force: {
				repulsion: 800,    // 节点之间的斥力因子(距离)
				edgeLength: [70, 125],   // 边两边的节点之间的距离
				gravity: 0.11,     // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢
			},
			// 鼠标漫游缩放时节点的相应缩放比例，当设为 0 时节点不随着鼠标的缩放而缩放
			nodeScaleRatio: 0.6,
			// 显示力引导图的迭代动画(在多次拖拽或是缩放操作后进行重新布局),开启后可防止卡死
			layoutAnimation: true,
			// 圆形图像可以被拖拽
			draggable: true,
			// 关系边的公用线条样式
			lineStyle: {
				width: 2,   // 线宽
				color: '#4b565b',   // 线的颜色
			},
			// 图形上的文本标签
			label: {
				show: true,  // 显示文本标签
			},
			// 展示的数据
			data: props.mapKnowledgeInfo.node_list,
			links: props.mapKnowledgeInfo.relation_list,
			categories: categories,
		}],

	};
	// 设置配置项并刷新图表
	mapCharts.setOption(option);
}

// 当 props 变化时重新刷新图表(监听不到)
watch(props.mapKnowledgeInfo, () => {
	echartsInit();
})

</script>

<template>
	<!-- 注释： 知识图谱组件: 分为两个部分, 知识图谱 canvas 和 提取出来的案件要素 -->
	<div class="container">
		<div class="not-map" v-show="!(caseInfo.title && caseInfo.title.length)">
			<img src="@/assets/svg/网络信号差.svg" alt="暂无信息">
		</div>
		<div class="has-map" v-show="caseInfo.title && caseInfo.title.length">
			<!-- 左侧的知识图谱 -->
			<div class="left-map-knowledge">
				<!-- 上面的标题 -->
				<div class="mapTitle">
					<img src="@/assets/svg/关系图谱.svg" alt="知识图谱">
					<span>关系图谱</span>
				</div>
				<!-- canvas 容器 -->
				<div id="mapping"></div>
			</div>
			<!--region-->
			<!-- 右侧的案件要素 -->
			<!--<div class="right-infoBox" v-show="caseInfo.title && caseInfo.title.length">-->
			<!--	&lt;!&ndash; 上面的标题 &ndash;&gt;-->
			<!--	<div class="mapTitle">-->
			<!--		<img src="@/assets/svg/基本信息.svg" alt="知识图谱">-->
			<!--		<span>案件信息</span>-->
			<!--	</div>-->
			<!--	&lt;!&ndash; 下方的信息卡片 &ndash;&gt;-->
			<!--	<div class="cards">-->
			<!--		<div class="card red" v-if="title && title.length">-->
			<!--			<div class="tip">案件名称</div>-->
			<!--			<div class="second-text">{{ title }}</div>-->
			<!--		</div>-->
			<!--		<div class="card blue" v-if="court && court.length">-->
			<!--			<div class="tip">法院级别</div>-->
			<!--			<div class="second-text">{{ court }}</div>-->
			<!--		</div>-->
			<!--		<div class="card green" v-if="court_area && court_area.length">-->
			<!--			<div class="tip">法院地区</div>-->
			<!--			<div class="second-text">{{ court_area }}</div>-->
			<!--		</div>-->
			<!--		<div class="card red" v-if="typeForJudgment && typeForJudgment.length">-->
			<!--			<div class="tip">案件类型</div>-->
			<!--			<div class="second-text">{{ typeForJudgment }}</div>-->
			<!--		</div>-->
			<!--		<div class="card blue" v-if="case_number && case_number.length">-->
			<!--			<div class="tip">案件编号</div>-->
			<!--			<div class="second-text">{{ case_number }}</div>-->
			<!--		</div>-->
			<!--		<div class="card green" v-if="plaintiff && plaintiff.length">-->
			<!--			<div class="tip">原告</div>-->
			<!--			<div class="second-text" v-for="item in plaintiff" :key="item">{{ item }}</div>-->
			<!--		</div>-->
			<!--		<div class="card green" v-if="defendant && defendant.length">-->
			<!--			<div class="tip">被告</div>-->
			<!--			<div class="second-text" v-for="item in defendant" :key="item">{{ item }}</div>-->
			<!--		</div>-->
			<!--		<div class="card red" v-if="law && law.length">-->
			<!--			<div class="tip">应用法条</div>-->
			<!--			<div class="second-text">{{ law }}</div>-->
			<!--		</div>-->
			<!--		<div class="card blue" v-if="time && time.length">-->
			<!--			<div class="tip">案件时间</div>-->
			<!--			<div class="second-text">{{ time }}</div>-->
			<!--		</div>-->
			<!--	</div>-->
			<!--</div>-->
			<!--endregion-->
			<div class="right-infoBox" v-show="props.caseInfo.title && props.caseInfo.title.length">
				<!-- 上面的标题 -->
				<div class="mapTitle">
					<img src="@/assets/svg/基本信息.svg" alt="知识图谱">
					<span>案件信息</span>
				</div>
				<!-- 下方的信息卡片 -->
				<div class="cards">
					<div class="card red" v-if="props.caseInfo.title && props.caseInfo.title.length">
						<div class="tip">案件名称</div>
						<div class="second-text">{{ props.caseInfo.title }}</div>
					</div>
					<div class="card blue" v-if="props.caseInfo.court && props.caseInfo.court.length">
						<div class="tip">法院级别</div>
						<div class="second-text">{{ props.caseInfo.court }}</div>
					</div>
					<div class="card green" v-if="props.caseInfo.court_area && props.caseInfo.court_area.length">
						<div class="tip">法院地区</div>
						<div class="second-text">{{ props.caseInfo.court_area }}</div>
					</div>
					<div class="card red" v-if="props.caseInfo.typeForJudgment && props.caseInfo.typeForJudgment.length">
						<div class="tip">案件类型</div>
						<div class="second-text">{{ props.caseInfo.typeForJudgment }}</div>
					</div>
					<div class="card blue" v-if="props.caseInfo.case_number && props.caseInfo.case_number.length">
						<div class="tip">案件编号</div>
						<div class="second-text">{{ props.caseInfo.case_number }}</div>
					</div>
					<div class="card green" v-if="props.caseInfo.plaintiff && props.caseInfo.plaintiff.length">
						<div class="tip">原告</div>
						<div class="second-text" v-for="item in props.caseInfo.plaintiff" :key="item">{{ item }}</div>
					</div>
					<div class="card green" v-if="props.caseInfo.defendant && props.caseInfo.defendant.length">
						<div class="tip">被告</div>
						<div class="second-text" v-for="item in props.caseInfo.defendant" :key="item">{{ item }}</div>
					</div>
					<div class="card red" v-if="props.caseInfo.law && props.caseInfo.law.length">
						<div class="tip">应用法条</div>
						<div class="second-text">{{ props.caseInfo.law }}</div>
					</div>
					<div class="card blue" v-if="props.caseInfo.time && props.caseInfo.time.length">
						<div class="tip">案件时间</div>
						<div class="second-text">{{ props.caseInfo.time }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
/* 最外侧的容器 */
.container {
	display: flex;
	justify-content: center;
	margin: 20px 5px 0 11px;

	.not-map {
		height: 700px;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 500px;
		}
	}

	.has-map {
		display: flex;
		justify-content: center;
		margin: 20px 5px 0 11px;
	}

	/* 公共样式 */
	/* 上面的标题 */
	.mapTitle {
		display: flex;
		align-items: center;

		img {
			width: 35px;
			height: 35px;
		}
		span {
			font-size: 1.5em;
			margin-left: 5px;
		}
	}

	/* 左侧的知识图谱 */
	.left-map-knowledge {
		margin-right: 30px;

		/* 放 canvas 的容器 */
		#mapping {
			width: 800px;
			height: 800px;
			border: 2px solid #999999;
			margin-top: 5px;

			.canvas {
				width: 100%;
				height: 100%;
			}
		}
	}

	/* 右侧的案件要素 */
	.right-infoBox {

		/* 下方的要素卡片 */
		.cards {
			display: flex;
			flex-direction: column;
			gap: 15px;
			margin-top: 5px;
		}

		.cards .red {
			background-color: #f43f5e;
		}

		.cards .blue {
			background-color: #3b82f6;
		}

		.cards .green {
			background-color: #22c55e;
		}

		.cards .card {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			text-align: center;
			height: 100px;
			width: 250px;
			border-radius: 10px;
			color: white;
			cursor: pointer;
			transition: 400ms;
		}

		.cards .card .tip {
			font-size: 1em;
			font-weight: 700;
		}

		.cards .card .second-text {
			font-size: .7em;
			margin-top: 1px;
		}

		.cards .card:hover {
			transform: scale(1.1, 1.1);
		}

		.cards:hover > .card:not(:hover) {
			filter: blur(10px);
			transform: scale(0.9, 0.9);
		}
	}
}
</style>