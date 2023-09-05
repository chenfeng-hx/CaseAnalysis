<script setup>/**
 * 当前代码编辑信息:
 *     由用户 尘封 使用 WebStorm 在 “vue3” 中
 *     于 2023/9/3 编写而成！
 *     祝你食用愉快！！！
 */
import {onMounted, reactive, ref} from "vue";
import * as echarts from 'echarts';
import CQChart from "@/views/Case/components/CQChart.vue";

const props = defineProps({
	caseArr: Array,
	allLike1: Object,
})

// 民事判决书的数量
let judgmentNum = ref(0);
// 民事调解书的数量
let mediationNum = ref(0);
// 基层人民法院的数量
let common = ref(0);
// 中级人民法院的数量
let medium = ref(0);
// 最高人民法院数量
let high = ref(0);

const Time = reactive({
	timeName: [],
	timeValue: [],
})

let LBChart = ref()
let Piechart = ref()

//计算民事判决书和民事调解书的数量和计算法院分布的数量
const countNum = arr => {
	judgmentNum.value = props.allLike1.typeForJudgment.民事判决书;
	mediationNum.value = props.allLike1.typeForJudgment.民事调解书;
	common.value = props.allLike1.court_level.基层人民法院;
	high.value = props.allLike1.court_level.最高人民法院;
	medium.value = props.allLike1.court_level.中级人民法院;
}

//计算时间分布
const countTime = obj => {
	let reg = /^[0-9]*$/;
	for(let i in obj){
		if(reg.test(i)){
			Time.timeName.push(i+'年')
			Time.timeValue.push(obj[i])
		}
	}
}

// 计算年份
const drawLine = () => {
	// 基于准备好的dom，初始化echarts实例
	// let myChart = echarts.init(document.getElementById("LBChart"));
	let myChart = echarts.init(LBChart.value);
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
			data: Time.timeName,
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
				data: Time.timeValue,
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
				data: Time.timeValue,
			},
		],
	});
	//多图表自适应
	window.addEventListener("resize", function () {
		myChart.resize();
	});
}

// 案件类型饼图
const drawLinepie = () => {
	// 基于准备好的dom，初始化echarts实例
	// let myChart = echarts.init(document.getElementById("Piechart"));
	let myChart = echarts.init(Piechart.value);
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
					{ value: judgmentNum.value, name: "民事判决书" },
					{ value: mediationNum.value, name: "民事调解书" },
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
}

// 法院类型饼图
const drawLinepie2 = () => {
	// 基于准备好的dom，初始化echarts实例
	let myChart = echarts.init(document.getElementById("Piechart2"));
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
					{ value: common.value, name: "基层人民法院" },
					{ value: medium.value, name: "中级人民法院" },
					{ value: high.value, name: "最高人民法院" },
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



onMounted(() => {
	countNum(props.caseArr);
	countTime(props.allLike1.time);
	drawLine();
	drawLinepie();
	drawLinepie2();
})

</script>

<template>
	<div class="row">
		<div class="title">
			<div class="text">裁判年份分布图</div>
			<div class="text">文书性质分布图</div>
		</div>
		<div class="one">
			<div id="LBChart" ref="LBChart"></div>
			<div id="Piechart" ref="Piechart"></div>
		</div>
		<div style="display: flex">
			<div class="bottomleft">
				<div class="titlebottom">法院层级分布图</div>
				<div id="Piechart2"></div>
			</div>
			<div id="areaChart">
				<CQChart :allLike1="allLike1" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.row {
	padding: 30px 15px;
	height: 1110px;
	.one {
		display: flex;
		margin-bottom: 60px;
		border-bottom: 1px dashed;
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
//.LBChart {
//	width: 50%;
//	height: 300px;
//
//}

#LBChart {
	width: 48%;
	height: 300px;
	padding-top: 20px;
	border-right: 0.5px solid rgb(214, 213, 213);
	//margin-right: 5px;
	//border-bottom: 1px solid rgb(214, 213, 213);
}
#Piechart {
	width: 49%;
	height: 300px;
	padding: 40px 0;
	margin-left: 5px;
	// border-left: 0.5px solid rgb(131, 130, 130);
	//border-bottom: 1px solid rgb(214, 213, 213);
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
	margin-left: 5px;
	// border-right: 0.5px solid rgb(214, 213, 213);
	// border-bottom: 1px solid rgb(214, 213, 213);
}
</style>