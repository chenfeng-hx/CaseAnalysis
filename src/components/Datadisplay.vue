<template>
	<div class="contain_echart">
		<div class="gray-bg" style="padding: 50px 0">
			<div class="container">
				<div class="row process-item-wrap">
					<div class="col-lg-3 col-md-6 col-12 wow fadeInLeft" data-wow-delay=".2s">
						<a @click="choseEchartPage('casesClosed')">
							<div class="single-process-item mb-50">
								<div class="process-num">
									<p>01</p>
								</div>
								<div class="process-icon" :class="{ 'page-active': echartsPage === 'casesClosed' }">
									<img src="../static/images/law-book.png" alt="" />
								</div>
								<div class="process-content">
									<h5>时间范围</h5>
								</div>
							</div>
						</a>
					</div>
					<div class="col-lg-3 col-md-6 col-12 wow fadeInLeft" data-wow-delay=".4s">
						<a @click="choseEchartPage('people')">
							<div class="single-process-item mb-50">
								<div class="process-num">
									<p>02</p>
								</div>
								<div class="process-icon" :class="{ 'page-active': echartsPage === 'people' }">
									<img src="../static/images/contract.png" alt="" />
								</div>
								<div class="process-content">
									<h5>性别分布</h5>
								</div>
							</div>
						</a>
					</div>
					<div class="col-lg-3 col-md-6 col-12 wow fadeInLeft" data-wow-delay=".6s">
						<a @click="choseEchartPage('specifiCrimes')">
							<div class="single-process-item mb-50">
								<div class="process-num">
									<p>03</p>
								</div>
								<div class="process-icon" :class="{ 'page-active': echartsPage === 'specifiCrimes' }">
									<img src="../static/images/lawyer-2.png" alt="" />
								</div>
								<div class="process-content">
									<h5>案由比例</h5>
								</div>
							</div>
						</a>
					</div>
					<div class="col-lg-3 col-md-6 col-12 wow fadeInLeft" data-wow-delay=".8s">
						<a @click="choseEchartPage('areaText')">
							<div class="single-process-item mb-50">
								<div class="process-num">
									<p>04</p>
								</div>
								<div class="process-icon" :class="{ 'page-active': echartsPage === 'areaText' }">
									<img src="../static/images/podium-2.png" alt="" />
								</div>
								<div class="process-content">
									<h5>地区人口</h5>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="echartContainer">
			<div id="echart" style="height: 100%"></div>
			<div id="echartContainer" style="height: 100%"></div>
		</div>

		<div class="gray-bg section-padding" style="padding: 10px 0">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 col-md-12 col-12">
						<div class="section-title">
							<h2>数据来源</h2>
						</div>
					</div>

					<div class="col-lg-6 text-right"></div>
				</div>
				<div class="row">
					<div class="col-lg-4 col-md-6 col-sm-12 wow fadeInLeft" data-wow-delay=".4s">
						<div class="single-blog-item">
							<div class="blog-bg">
								<img src="../static/images/web1.png" alt="" />
							</div>
							<div class="blog-content">
								<h5>
									<a href="https://wenshu.court.gov.cn/website/wenshu/181029CR4M5A62CH/index.html"
										target="_blank">中国裁判文书网</a>
								</h5>
								<a href="https://wenshu.court.gov.cn/website/wenshu/181029CR4M5A62CH/index.html"
									target="_blank" class="read-more">了解更多</a>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 col-sm-12 wow fadeInLeft" data-wow-delay=".6s">
						<div class="single-blog-item">
							<div class="blog-bg">
								<img src="../static/images/web2.png" alt="" />
							</div>
							<div class="blog-content">
								<h5>
									<a href="http://gongbao.court.gov.cn/ArticleList.html?serial_no=sftj"
										target="_blank">中华人民共和国最高人民法院公报</a>
								</h5>

								<a href="http://gongbao.court.gov.cn/ArticleList.html?serial_no=sftj" target="_blank"
									class="read-more">了解更多</a>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6 col-sm-12 wow fadeInLeft" data-wow-delay=".8s">
						<div class="single-blog-item">
							<div class="blog-bg">
								<img src="../static/images/web3.png" alt="" />
							</div>
							<div class="blog-content">
								<h5>
									<a href="http://www.court.gov.cn/fabu-gengduo-21.html?page=2"
										target="_blank">中华人民共和国最高人民法院</a>
								</h5>
								<a href="http://www.court.gov.cn/fabu-gengduo-21.html?page=2" target="_blank"
									class="read-more">了解更多</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "display",
	data() {
		return {
			echartsPage: "casesClosed",
			updateFrequency: 2000,
			month: [],
			startIndex: 0,
			startName: "",
			startCut: "",
			option: {},
			newArr: [
				{
					cdate: "2017",
					cname:
						"最高人民法院,北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区,新疆维吾尔自治区高级人民法院生产建设兵团分院",
					cut: "15824,433605,299481,670693,329466,454260,497115,416641,479013,504407,1009487,1239328,829716,711846,441620,979373,1300372,612280,660912,1038345,381705,71654,546266,1052930,234815,497967,12740,460529,216401,79707,143001,160345,29248",
				},
				{
					cdate: "2018",
					cname:
						"最高人民法院,北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区,新疆维吾尔自治区高级人民法院生产建设兵团分院",
					cut: "20665,816364,292217,896484,357769,467661,685419,424533,525060,501584,1109502,1398713,921922,668118,531523,1144181,1415889,709512,870847,1209359,418629,57425,609254,1133805,312342,620975,16470,548376,284158,84227,154623,151028,25530",
				},
				{
					cdate: "2019",
					cname:
						"最高人民法院,北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区,新疆维吾尔自治区高级人民法院生产建设兵团分院",
					cut: "26108,720412,305369,1025478,423329,517746,910700,508597,635872,693990,1393995,1372010,1121214,671274,615273,1626801,1772606,830856,1152494,1476205,532703,71530,648718,1284035,417011,655744,19867,696220,336478,99116,178339,259013,29820",
				},
				{
					cdate: "2020",
					cname:
						"最高人民法院,北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区,新疆维吾尔自治区高级人民法院生产建设兵团分院",
					cut: "27866,611175,298185,860937,400259,399325,1494020,442468,523155,583050,1325185,1315075,1136891,632574,604727,1846828,1801982,769359,1013399,1775107,628433,41192,608662,1265737,632237,633871,23679,693557,310533,110264,150779,371817,27946",
				},
				{
					cdate: "2021",
					cname:
						"最高人民法院,北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区,新疆维吾尔自治区高级人民法院生产建设兵团分院",
					cut: "8018,396013,212280,395084,205163,150906,1356367,431619,367750,385667,830001,521841,627392,305431,239536,1036694,989398,266874,849307,1003182,364490,10606,318806,830630,527575,240001,17620,599571,214189,80822,79523,316649,23639",
				},
			],
		};
	},
	watch: {},
	mounted() {
		this.choseEchartPage("casesClosed");
	},
	computed: {},
	methods: {
		choseEchartPage(val) {
			this.echartsPage = val;
			let myChart = this.$echarts.init(document.getElementById("echart"));
			this.echartsPage = val;
			if (val === "casesClosed") {
				myChart.clear();
				myChart.setOption({
					title: {
						text: "2012-2019结案数量统计图",
					},
					legend: {
						top: "bottom",
					},
					toolbox: {
						show: true,
						feature: {
							mark: { show: true },
							dataView: { show: true, readOnly: false },
							restore: { show: true },
							saveAsImage: { show: true },
						},
					},
					series: [
						{
							// name: "Nightingale Chart",
							type: "pie",
							radius: [50, 180],
							center: ["50%", "50%"],
							roseType: "area",
							itemStyle: {
								borderRadius: 8,
							},
							data: [
								{ value: 29022356, name: "2019" },
								{ value: 25168463, name: "2018" },
								{ value: 22754188, name: "2017" },
								{ value: 19772378, name: "2016" },
								{ value: 16713793, name: "2015" },
								{ value: 13796525, name: "2014" },
								{ value: 12946633, name: "2013" },
								{ value: 12396632, name: "2012" },
							],
						},
					],
				});
			}
			if (val === "people") {
				myChart.clear();
				myChart.setOption({
					title: {
						text: "2019男女犯罪比例图",
					},
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "shadow",
						},
					},
					legend: {
						data: ["男", "女"],
					},
					grid: {
						left: "3%",
						right: "4%",
						bottom: "3%",
						containLabel: true,
					},
					xAxis: [
						{
							type: "value",
						},
					],
					yAxis: [
						{
							type: "category",
							axisTick: {
								show: false,
							},
							data: [
								"渎职罪",
								"贪污贿赂罪",
								"危害国防利益罪",
								"妨害社会管理秩序罪",
								"侵犯财产罪",
								"侵犯公民人身权利民主权利罪",
								"破坏社会主义市场经济秩序罪",
								"危害公共安全罪",
							],
						},
					],
					series: [
						{
							name: "男",
							type: "bar",
							label: {
								show: true,
								position: "right",
							},
							emphasis: {
								focus: "series",
							},
							data: [2388, 14243, 625, 443142, 357535, 183956, 87499, 398475],
						},
						{
							name: "女",
							type: "bar",
							stack: "Total",
							label: {
								show: true,
								position: "right",
							},
							emphasis: {
								focus: "series",
							},
							// data: [-223, -829, -78, -73560, -42292, -13877, -25428, -13944],
							data: [223, 829, 78, 73560, 42292, 13877, 25428, 13944],
						},
					],
				});
			}
			if (val == "specifiCrimes") {
				myChart.clear();

				setTimeout(function () {
					var option = {
						title: {
							text: "2017-2019\n五种罪行罪犯人数变化图",
						},
						legend: {},
						tooltip: {
							trigger: "axis",
							showContent: false,
						},
						dataset: {
							source: [
								["product", "2017", "2018", "2019"],
								["危害公共安全罪", 264055, 333536, 412419],
								["破坏社会主义市场经济秩序罪", 95643, 113463, 112927],
								["侵犯公民人身权利民主权利罪", 177341, 183352, 197833],
								["侵犯财产罪", 344139, 374195, 399827],
								["妨害社会管理秩序罪", 356981, 398093, 516702],
							],
						},
						xAxis: { type: "category" },
						yAxis: { gridIndex: 0 },
						grid: { top: "55%" },
						series: [
							{
								type: "line",
								smooth: true,
								seriesLayoutBy: "row",
								emphasis: { focus: "series" },
							},
							{
								type: "line",
								smooth: true,
								seriesLayoutBy: "row",
								emphasis: { focus: "series" },
							},
							{
								type: "line",
								smooth: true,
								seriesLayoutBy: "row",
								emphasis: { focus: "series" },
							},
							{
								type: "line",
								smooth: true,
								seriesLayoutBy: "row",
								emphasis: { focus: "series" },
							},
							{
								type: "line",
								smooth: true,
								seriesLayoutBy: "row",
								emphasis: { focus: "series" },
							},
							{
								type: "pie",
								id: "pie",
								radius: "30%",
								center: ["50%", "25%"],
								emphasis: {
									focus: "self",
								},
								label: {
									formatter: "{b}: {@2017} ({d}%)",
								},
								encode: {
									itemName: "product",
									value: "2017",
									tooltip: "2017",
								},
							},
						],
					};
					myChart.on("updateAxisPointer", (event) => {
						const xAxisInfo = event.axesInfo[0];
						// console.log(event);
						if (xAxisInfo) {
							const dimension = xAxisInfo.value + 1;
							myChart.setOption({
								series: {
									id: "pie",
									label: {
										formatter: "{b}: {@[" + dimension + "]} ({d}%)",
									},
									encode: {
										value: dimension,
										tooltip: dimension,
									},
								},
							});
						}
					});
					myChart.setOption(option);
				});
				if (option && typeof option === "object") {
					myChart.setOption(option);
				}
			}
			if (val == "areaText") {
				for (var i = 0; i < this.newArr.length; ++i) {
					if (this.month.length == 0) {
						this.month.push(this.newArr[i]);
					}
				}
				var startMonth = this.month[this.startIndex].cdate; //cdate
				var startName = this.month[this.startIndex].cname.split(","); //cname
				var startCut = this.month[this.startIndex].cut.split(","); //cut
				myChart.clear();
				var option = {
					title: {
						text: "2017-2021文书数量排行前十名",
					},
					grid: {
						top: 40,
						bottom: 30,
						left: 120,
						right: 60,
					},
					xAxis: {
						max: "dataMax",
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
							},
						},
					},
					dataset: {
						source: this.newArr,
					},
					yAxis: {
						type: "category",
						inverse: true,
						data: startName,
						axisLabel: {
							show: true,
							textStyle: {
								fontSize: 14,
							},
							rich: {
								flag: {
									fontSize: 25,
									padding: 5,
								},
							},
						},
						animationDuration: 0,
						animationDurationUpdate: 150,
						max: 10,
					},
					series: [
						{
							realtimeSort: true,
							seriesLayoutBy: "column",
							type: "bar",
							label: {
								show: true,
								precision: 1,
								position: "right",
								valueAnimation: true,
								fontFamily: "monospace",
							},
							data: startCut,
						},
					],
					animationDuration: 0,
					animationDurationUpdate: 1000,
					animationEasing: "linear",
					animationEasingUpdate: "linear",
					graphic: {
						elements: [
							{
								type: "text",
								right: 30,
								bottom: 60,
								style: {
									text: startMonth,
									font: "20px monospace",
									fill: "rgba(96,96,96)",
								},
								z: 100,
							},
						],
					},
				};
				myChart.setOption(option);
				for (let i = this.startIndex; i < this.newArr.length - 1; ++i) {
					setTimeout(() => {
						const newOption = this.updateYear(this.newArr[i + 1], option);
						myChart.setOption(newOption);
					}, (i + 1) * this.updateFrequency);
				}
			}
		},
		updateYear(year, option) {
			option.yAxis.data = year.cname.split(",");
			option.series[0].data = year.cut.split(",");
			option.graphic.elements[0].style.text = year.cdate;
			return option;
		},
	},
};
</script>

<style scoped>
@import "@/static/css/font-awesome.min.css";
@import "@/static/css/line-awesome.min.css";
@import "@/static/css/animate.css";
@import "@/static/css/magnific-popup.css";
@import "@/static/css/flaticon.css";
@import "@/static/css/owl.carousel.css";
@import "@/static/css/responsive.css";

.echartContainer {
	width: 100%;
	height: 500px;
}

.page-active {
	border-color: #c79c65;
	opacity: 0.8;
}

.echartContainer {
	margin: 20px auto;
	padding: 0 50px;
}

.contain_echart {
	width: 100%;
	min-width: 900px;

	/* max-width: 1200px; */

}
</style>

<style scoped src="../static/css/bootstrap.min.css"></style>
<style scoped src="../static/css/style.css"></style>