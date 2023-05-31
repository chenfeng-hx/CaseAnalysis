/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-05-30 19:45:27 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
import * as echarts from 'echarts';
import {watch} from "vue-demi";

/* 左侧绘画"知识图谱"相关 */
// 接收 canvas 的绘画参数信息和提取出的案件信息
const props = defineProps({
	mapKnowledgeInfo: Object,
	caseInfo: Object,
})
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

// 当 props 变化时重新刷新图表
watch(props.mapKnowledgeInfo, () => {
	echartsInit();
})

</script>

<template>
	<!-- 注释： 知识图谱组件: 分为两个部分, 知识图谱 canvas 和 提取出来的案件要素 -->
	<div class="container">
		<!-- 左侧的知识图谱 -->
		<div class="left-map-knowledge">
			<!-- canvas 容器 -->
			<div id="mapping"></div>
		</div>
		<!-- 右侧的案件要素 -->
		<div class="right-infoBox">

		</div>
	</div>
</template>

<style scoped lang="scss">
/* 最外侧的容器 */
.container {

	/* 左侧的知识图谱 */
	.left-map-knowledge {

		/* 放 canvas 的容器 */
		#mapping {
			width: 800px;
			height: 800px;
			margin: 20px auto;
			border: 1px solid #999999;
			display: flex;
			justify-content: center;
			align-items: center;

			.canvas {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>