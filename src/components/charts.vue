<template>
	<div class="row">
		<div class="title">
			<div class="text">裁判年份分布图</div>
			<div class="text">文书性质分布图</div>
		</div>
		<div class="one">
			<div id="LBChart"></div>
			<div id="Piechart"></div>
		</div>
		<div style="display: flex">
			<div class="bottomleft">
				<div class="titlebottom">法院层级分布图</div>
				<div id="Piechart2"></div>
			</div>
			<div id="areaChart">
				<chartcq :allLike1="allLike1"></chartcq>
			</div>
		</div>
	</div>
</template>

<script>
import chartcq from "./chartCQ.vue";

export default {
	name: "chart",
	props: {
		caseArr: {
			type: Array,
		},
		allLike1: {
			type: Object,
		}
	},
	data() {
		return {
			//  民事判决书的数量
			judgmentNum: 0,
			// 民事调解书的数量
			mediationNum: 0,
			// 基层人民法院的数量
			common: 0,
			// 中级人民法院数量
			medium: 0,
			// 最高人民法院数量
			high: 0,
			timeName:[],
			timeValue:[],
		};
	},
	mounted() {
		this.countNum(this.caseArr);
		this.countTime(this.allLike1.time)
		this.drawLine();
		this.drawLinepie();
		this.drawLinepie2();
	},
	components: {
		chartcq,
	},
	methods: {
		//计算民事判决书和民事调解书的数量和计算法院分布的数量
		countNum(arr) {
			this.judgmentNum = this.allLike1.typeForJudgment.民事判决书;
			this.mediationNum = this.allLike1.typeForJudgment.民事调解书;
			this.common = this.allLike1.court_level.基层人民法院;
			this.high = this.allLike1.court_level.最高人民法院;
			this.medium = this.allLike1.court_level.中级人民法院;
		},
		//计算时间分布
		countTime(obj){
			let reg = /^[0-9]*$/;
			for(let i in obj){
				if(reg.test(i)){
					this.timeName.push(i+'年')
					this.timeValue.push(obj[i])
				}
			}
		},

		// 计算年份
		drawLine() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(document.getElementById("LBChart"));
			// 绘制图表
			myChart.setOption({
				// backgroundColor: "#0f375f",
				grid: {
					top: "12%",
					lef: "15%",
					// right: "15%",
					bottom: "20%", //也可设置left和right设置距离来控制图表的大小
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow",
						label: {
							show: true,
						},
					},
				},
				xAxis: {
					// 这里修改data  x轴横坐标
					data: this.timeName,
					axisLine: {
						show: true, //隐藏X轴轴线
						lineStyle: {
							color: "#2d405e",
						},
					},
					axisTick: {
						show: true, //隐藏X轴刻度
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: "#2d405e", //X轴文字颜色
						},
					},
				},
				yAxis: [
					{
						type: "value",
						name: "案例年份分布",
						nameTextStyle: {
							color: "#2d405e",
						},
						splitLine: {
							show: false,
						},
						axisTick: {
							show: true,
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "#2d405e",
							},
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: "#2d405e",
							},
						},
					},
					{
						type: "value",
						nameTextStyle: {
							color: "#2d405e",
						},
						position: "right",
						splitLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLine: {
							show: false,
						},
						axisLabel: {
							show: false,
							// formatter: "{value} %", //右侧Y轴文字显示
							formatter: "{value} ", //右侧Y轴文字显示
							textStyle: {
								color: "#2d405e",
							},
						},
					},
				],
				series: [
					{
						name: "案件数量",
						type: "line",
						yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
						smooth: true, //平滑曲线显示
						showAllSymbol: true, //显示所有图形。
						symbol: "circle", //标记的图形为实心圆
						symbolSize: 10, //标记的大小
						itemStyle: {
							//折线拐点标志的样式
							color: "#f59a23",
						},
						lineStyle: {
							color: "#f59a23",
						},
						areaStyle: {
							color: "rgba(5,140,255, 0.2)",
						},
						// 这里修改data  案件数量
						data: this.timeValue,
					},
					{
						name: "案件数量",
						type: "bar",
						barWidth: 15,
						itemStyle: {
							normal: {
								color: {
									type: "linear",
									x: 0,
									y: 0,
									x2: 1,
									y2: 0,
									colorStops: [
										{
											offset: 0,
											color: "#00FFE3", // 0% 处的颜色
										},
										{
											offset: 1,
											color: "#4693EC", // 100% 处的颜色
										},
									],
									globalCoord: false, // 缺省为 false
								},
							},
						},
						// 这里修改data  案件数量
						data: this.timeValue,
					},
				],
			});
			//多图表自适应
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},

		// 案件类型饼图
		drawLinepie() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(document.getElementById("Piechart"));
			// 绘制图表
			myChart.setOption({
				// backgroundColor: "#0f375f",
				legend: {
					orient: "vertical",
					left: "left",
				},
				series: [
					{
						name: "Access From",
						type: "pie",
						radius: ["40%", "70%"],
						// emphasis: {
						label: {
							show: true,
							formatter: function (arg) {
								return arg.value;
							},
							fontSize: "16",
							fontWeight: "bold",
							// },
						},
						// 这里修改data  案件数量
						data: [
							{ value: this.judgmentNum, name: "民事判决书" },
							{ value: this.mediationNum, name: "民事调解书" },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
			});
			//多图表自适应
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		},

		// 法院类型饼图
		drawLinepie2() {
			// 基于准备好的dom，初始化echarts实例
			let myChart = this.$echarts.init(document.getElementById("Piechart2"));
			// 绘制图表
			myChart.setOption({
				// backgroundColor: "#0f375f",

				legend: {
					orient: "vertical",
					left: "left",
				},
				color: ["#11a7b7", "#2bdb82", "rgb(92, 123, 217)"],
				series: [
					{
						name: "Access From",
						type: "pie",
						radius: ["40%", "70%"],
						label: {
							show: true,
							formatter: function (arg) {
								return arg.value;
							},
							fontSize: "16",
							fontWeight: "bold",
						},
						// 这里修改data  案件数量
						data: [
							{ value: this.common, name: "基层人民法院" },
							{ value: this.medium, name: "中级人民法院" },
							{ value: this.high, name: "最高人民法院" },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
						selectedMode: 'multiple',
						selectedOffset: 30
					},
				],
			});
			//多图表自适应
			window.addEventListener("resize", function () {
				myChart.resize();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.row {
	padding: 30px 15px;
	height: 1110px;
	.one {
		display: flex;
	}
	.title {
		display: flex;
		.text {
			width: 50%;
			text-align: left;
			font-weight: bold;
			font-size: 18px;
			color: #434343;
		}
	}
	.titlebottom {
		text-align: left;
		font-weight: bold;
		font-size: 18px;
		color: #434343;
	}
}
#LBChart {
	width: 48%;
	height: 300px;
	padding-top: 20px;
	border-right: 0.5px solid rgb(214, 213, 213);
	border-bottom: 1px solid rgb(214, 213, 213);
}
#Piechart {
	width: 49%;
	height: 300px;
	padding: 40px 0;
	// border-left: 0.5px solid rgb(131, 130, 130);
	border-bottom: 1px solid rgb(214, 213, 213);
}
.bottomleft {
	width: 48%;
	height: 300px;
	padding: 20px 0;
	border-right: 0.5px solid rgb(214, 213, 213);
	// border-bottom: 1px solid rgb(214, 213, 213);
	.titlebottom {
		text-align: left;
		font-weight: bold;
		font-size: 18px;
		color: #434343;
	}
	#Piechart2 {
		width: 100%;
		height: 100%;
		padding: 10px 0;
	}
}
#areaChart {
	width: 48%;
	height: 300px;
	padding-top: 20px;
	// border-right: 0.5px solid rgb(214, 213, 213);
	// border-bottom: 1px solid rgb(214, 213, 213);
}
</style>

