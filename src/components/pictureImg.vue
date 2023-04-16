<template>

	<div class="box">
		<div id="main" class="main"></div>
		<!--   -->
	</div>
</template>

<script>
import * as echarts from "echarts";

export default {
	name: "pictureImg",
	props: {
		pictureData: {
			type: Object,
		},
	},
	data() {
		return {
			data1: [],
			links: [],
			categories2: [{
				name: ''
			}]
		};
	},
	watch: {
		pictureData: {
			handler(n, o) {
				this.data1 = n.node_list;
				this.links = n.relation_list;
				// this.company_id = n //赋值给data
				this.echartsInit();
			},
			deep: true, // 深度监听父组件传过来对象变化
		},
	},

	mounted() {
		if (this.pictureData.node_list !== undefined) {
			this.data1 = this.pictureData.node_list;
			this.links = this.pictureData.relation_list;
			this.echartsInit();
		}
	},

	methods: {
		echartsInit() {
			const arr = []
			for (let i = 0; i < this.data1.length; i++) {
				let vote = {}
				vote.name = this.data1[i].category
				arr.push(vote)
			}
			let myChart = echarts.init(document.getElementById("main"));
			let categories = arr;
			const option = {
				// 图的标题
				// title: {
				//   // text: "知识图谱",
				// },
				// 提示框的配置
				tooltip: {
					formatter: function (x) {
						return x.data.des;
					},
				},
				// 工具箱
				toolbox: {
					// 显示工具箱
					show: true,
					feature: {
						mark: {
							show: true,
						},
						// 还原
						restore: {
							show: true,
						},
						// 保存为图片
						saveAsImage: {
							show: true,
						},
					},
				},
				legend: [
					{
						// selectedMode: 'single',
						data: categories.map(function (a) {
							return a.name;
						}),
					},
				],

				// color:['#fc853e','#28cad8','#9564bf','#bd407e','#28cad8','#e5a214',],
				series: [
					{
						type: "graph", // 类型:关系图
						layout: "force", //图的布局，类型为力导图
						symbolSize: 50, // 调整节点的大小
						roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
						edgeSymbol: ["circle", "arrow"],
						edgeSymbolSize: [2, 10],

						edgeLabel: {
							normal: {
								textStyle: {
									fontSize: 16,
								},
							},
						},
						force: {
							repulsion: 800,  //距离
							edgeLength: [70, 125],
							gravity: 0.11
						},
						nodeScaleRatio: 0.6,
						layoutAnimation: true,

						draggable: true,
						lineStyle: {
							normal: {
								width: 2,
								color: "#4b565b",
							},
						},
						// bug:重复声明
						edgeLabel: {
							normal: {
								show: true,
								formatter: function (x) {
									return x.data.name;
								},
							},
						},
						label: {
							normal: {
								show: true,
								textStyle: {},
							},
						},
						data: this.data1,
						links: this.links,
						categories: categories,
					},
				],
			};
			myChart.setOption(option);
		},
	},
};
</script>


<style lang="scss" scoped>
#main {
	display: flex;
	justify-content: center;
	align-items: center;

	.canvas {
		width: 100%;
		height: 100%;
	}
}
.main {
	width: 850px;
	height:1000px;
	margin: 20px auto;
}

</style>