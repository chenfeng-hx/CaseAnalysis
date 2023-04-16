<template>
	<div>
		<div class="bigBox">
			<div class="top">
				<div class="topLeft">
					<img src="../assets/back.svg" alt="" @click="backTo" />
					<span @click="backTo">返回</span>
				</div>
				<div
					class="topRight"
					v-show="this.currentIndex !== 2 && this.currentIndex !== 3"
				>
					{{ textInfo.title }}
				</div>
			</div>
			<div class="box">
				<!-- 侧边栏 -->
				<div class="left">
					<ul>
						<li
							:class="{ active: this.currentIndex === 0 }"
							@click="changeIndex(0)"
						>
							<img src="../assets/法律文书 (1).svg" alt="" />
							起诉状
						</li>
						<li
							:class="{ active: this.currentIndex === 1 }"
							@click="changeIndex(1)"
						>
							<img src="../assets/判决.svg" alt="" />
							判决书
						</li>

						<li
							:class="{ active: this.currentIndex === 2 }"
							@click="changeIndex(2)"
						>
							<img src="../assets/特征检索 (4).svg" alt="" />
							要素提取 (起诉状)
						</li>
						<li
							:class="{ active: this.currentIndex === 3 }"
							@click="changeIndex(3)"
						>
							<img src="../assets/特征检索 (4).svg" alt="" />
							要素提取 (判决书)
						</li>
						<li
							:class="{ active: this.currentIndex === 4 }"
							@click="changeIndex(4)"
						>
							<img src="../assets/文书 (1).svg" alt="" />
							同案智推
						</li>
					</ul>
				</div>
				<div class="right">
					<!-- 起诉状 -->
					<div class="first" v-show="this.currentIndex === 0">
						<div class="bottom">
							<div class="fileContent">
								<div class="my-component">
									<pre>{{ txtInfo }}</pre>
								</div>
							</div>
						</div>
					</div>

					<!-- 判决书 -->
					<div class="second" v-show="this.currentIndex == 1">
						<div class="bottom">
							<div class="fileContent">
								<div class="my-component">
									<pre>{{ txtInfo2 }}</pre>
								</div>
							</div>
						</div>
					</div>
					<div
						class="loadingBox"
						v-if="this.loading == true && (this.currentIndex == 2||this.currentIndex == 3)"
						v-loading="loading"
						element-loading-background="rgba(0, 0, 0, 0)"
						element-loading-text="拼命加载中"
					></div>
					<!-- 要素提取 -->
					<info-box
						v-if="this.currentIndex == 2"
						:pictureData="pictureData"
						:textInfo="{}"
					></info-box>
					<info-box
						v-if="this.currentIndex == 3"
						:pictureData="pictureData2"
						:textInfo="textInfo"
					>
					</info-box>

					<div class="forth" v-show="this.currentIndex == 4">
						<div v-if="sameCase.length != 0">
							<div class="title">检索共有{{ sameCase.length }}条相似案件:</div>
							<ul>
								<li
									v-for="(item, index) in sameCase"
									:key="index"
									@click="up(item.case_number)"
								>
									<div class="smallBox">
										<img src="../assets/标签.svg" />
										<span class="numLogo">{{ index + 1 }}.</span>
										{{ item.title }}
									</div>
									<div>相似度:{{ item.sameNum }}</div>
								</li>
							</ul>
						</div>
						<div class="title" v-show="isShow8">您还未登录，请先登录</div>
						<div class="title" v-show="isShow6">没有找到相似案件</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Message } from "element-ui";
import Picture from "../components/pictureImg.vue";
import infoBox from "../components/infoBox.vue";
// import infoBox2 from "../components/infoBox.vue";
const docx = require("docx-preview");
window.JSZip = require("jszip");
export default {
	name: "specialInfo",
	components: {
		Picture,
		infoBox,
		// infoBox2
		// sameCaseContent
	},
	destroyed() {
		window.removeEventListener("scroll", this.scrollToTop);
	},
	mounted() {
		// 侦听事件并处理相应函数
		window.addEventListener("scroll", this.scrollToTop);
		this.changeIndex(this.$route.query.currentIndex);
	},

	created() {
		this.start();
	},
	data() {
		return {
			reCreate: true,
			isShow8: false,
			isShow6: false,
			currentIndex: 3,
			sameCaseLength: 0,
			sameCase: [],
			path: "",
			pictureData: {},
			pictureData2: {},
			isShow3: true,
			textInfo: {},
			loading: false,
			fileName: "",
			fileName2: "",
			previewDialogVisible: false,
			txtContent: "",
			pdfContent:
				"http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf", // pdf地址',
			wordContent: "",
			excelContent: {
				header: [],
				results: [],
			},

			txtInfo: "",
			// "重庆市永川区人民法院民事调解书\n(2020)渝0118民初8237号\n原告:姚金琼，女，1971年5月3日生，汉族，住重庆市永川\n大安镇勇胜村潘家石坝村民小组，公民身份号码xxxxxxxxxxxxxxxxx。\n委托诉讼代理人:肖乾明，重庆进明律师事务所律师。\n被告:重庆坚宜佳建筑装饰工程有限公司，住所地重庆市永川区大安办事处石栏杆路19号(铭阳玻璃厂区内)，统一社会信用代码xxxxxxxxxxxxxxx。\n法定代表人:李胜林，执行董事。\n委托诉讼代理人:陈传军，重庆知习律师事务所律师。\n被告:重庆丰运劳务有限公司，住所地重庆市永川区凤栖路9号1幢2-2，统一社会信用代码xxxxxxxxxxx。\n法定代表人:殷筱林，总经理\n。委托诉讼代理人:陈传军，重庆知习律师事务所律师。\n原告姚金琼与被告重庆坚宜佳建筑装饰工程有限公司、重庆丰运劳务有限公司劳动争议纠纷一案，n本院于2020年9月29日立案后，依法适用简易程序公开开庭进行了审理。\n原告姚金琼向本院提出诉讼请求:\n 1、解除劳动合同关系；n2、由被告支付未签订劳动合同的双倍工资差额36000元；\n 3、由被告支付经济补偿6000元;\n4、请求被告支付加班工资2000元。事实和理由:原告系被告员工，原告在2019年3月1日入职，从事塑钢门窗生产，约定月保底工资为6000元。\n被告一直未与原告签订合同，也未购买社会保险。\n现因重庆市永川区劳动人事争议仲裁委员会超时未审结案件，故起诉来院。本案审理过程中，经本院主持调解，当事人自愿达成如下协议:\n一、原告姚金琼与被告重庆丰运劳务有限公司的劳动关系于2020年10月19日解除；\n二、由被告重庆丰运劳务有限公司于2020年11月30日前支付原告姚金琼未签劳动合同双倍工资、经济补偿共计10000元，\n若逾期未足额支付由被告重庆丰运劳务有限公司按照13000元的金额支付上述费用；\n三、原告姚金琼自愿放弃其他诉讼请求；\n四、案件受理费减半收取5元，由原告姚金琼负担/n。上述协议，不违反法律规定，本院予以确认。\n本调解协议经各方当事人在笔录上签名或者盖章，本院予以确认后即具有法律效力。",
			txtInfo2: "",
			// "民事起诉状\n原告姚金琼，女，1971年5 月3日生，汉族，住重庆市永川市\n安镇永胜村潘家石坝村民小组，身份证号码:xxxxxxxxxxxxxxx 电话:Xxxxxxxxxxxx，xxxxxxxxxxxxx\n被告重庆坚宜佳建筑装饰工程有限公司，住所重庆市永川区大安办事处石栏杆路19号(铭阳玻璃厂区内)，\n统一社会信用代码Xxxxxxxxxxxxxxx\n法定代表人:李胜林执行董事，电话xxxxxxxxxxxxxxx\n被告重庆丰运劳务有限公司，住所地重庆市永川区凤栖路9号12-2\n法定代表人:殷筱林执行董事兼总经理电话 18696596891\n诉讼请求:\n 1、 解除劳动合同关系;\n 2、请求被告支付未签劳动合同的双倍工资差额36000元:;\n 3、请求被告支付经济补偿金6000元;\n 4、请求：被告支付周六周日加班工资2000元;\n5、诉讼费由被告承担。\n事实与理由:\n原告系被告的职工，原告于2019年3月1日入职，从事塑钢门窗生产，约定250元每天，每月保底工资6000元\n。被告一直没有与原告签订劳动合同，也未为原告购买五险。\n在工作中，几乎天天超时加班，周六周日也要加班，没有休息日。\n原告不堪重负，找被告协商未果，为维护原告合法权益，向仲裁委提出申请，请求依法裁决。\n重庆市永川区仲裁委因超时未结案，特向贵院起诉，望依法判决为感!\n",
		};
	},

	methods: {
		backTo() {
			this.$router.go(-1);
		},
		//  案件获取结束后要操作的步骤
		infoAfter(data) {
			this.textInfo = data;
			this.txtInfo2 = data.judgment;
			this.txtInfo = data.claim;
		},
		start() {
			this.pictureData = {}
			this.pictureData2 = {}
			this.sameCase = [];
			this.loading = true;
			const caseId = this.$route.query.index.replace('"', "");
			this.currentIndex = parseInt(this.$route.query.currentIndex);
			// 点击案例时获取案例信息
			this.$api.analysisDocx.getCaseInfo(caseId).then((res) => {
				if (res.data != "token校验失败") {
					const data = res.data;
					this.infoAfter(data);
					// 传入知识图谱的数据
					this.$api.analysisDocx
						.getJugementGeneration(caseId)
						.then((res) => {
							if (res.data.judgement_kg.node_list != []) {
								this.pictureData = res.data.claim_kg;
								this.pictureData2 = res.data.judgement_kg;
								this.loading = false;
							}
						})
						.catch((res) => {
							this.loading = false;
							this.$message.warning("出错啦");
						});
					// 通过案件号查询相似案例
					let formdata = new FormData();
					formdata.append("case_number", caseId);
					formdata.append("token", localStorage.getItem("token"));
					// 同案检索
					this.$api.analysisDocx
						.getSamecaseNum(formdata)
						.then((res) => {
							if (res.data != "token校验失败") {
								this.isShow8 = false;
								const data = res.data;
								this.sameCaseLength = data.length;
								if (data.length == 0) {
									this.isShow6 = true;
								} else {
									for (let i = 0; i < data.length; i++) {
										const vote = {};
										vote.title = data[i][1];
										vote.case_number = data[i][0];
										// 判断相似度是否为1
										vote.sameNum =
											parseFloat(data[i][3] * 100).toFixed(3) + "%";
										this.sameCase.push(vote);
										if (data[i][0] == this.$route.query.index) {
											vote.sameNum = "100.00%";
											this.sameCase.pop();
											this.sameCase.unshift(vote);
										}
									}
								}
							} else {
								this.isShow8 = true;
							}
						})
						.catch((res) => {
							this.loading = false;
						});
				} else {
					this.$message.warning("未登录或者登录过期");
					this.loading = false;
				}
			});
		},

		up(it) {
			this.$router.push({
				path: "/specialInfo",
				query: {
					index: it,
					currentIndex: 0,
				},
			});
			this.start();
		},
		changeIndex(i) {
			this.currentIndex = i;
			document.documentElement.scrollTop = 0;
		},
	},
};
</script>

<style scoped lang="scss">
.numLogo {
	margin-left: -15px;
	margin-right: 10px;
}

.box {
	display: flex;
	margin-top: 10px;
	position: relative;
	.left {
		position: absolute;
		top: 0px;
		background-color: rgb(255, 255, 255);
		color: #111;
		box-shadow: 3px 2px 2px rgb(232, 233, 238);
		width: 18%;
		height: 1200px;
		border-radius: 0 10px 0 0;
		ul {
			border-radius: 0 10px 0 0;

			width: 100%;
			overflow: hidden;
			li {
				user-select: text;
				display: flex;
				padding-left: 15%;
				// padding-right: 30px;
				// justify-content: center;
				// justify-content: center;
				align-items: center;
				width: 100%;
				height: 70px;
				font-size: 1.25rem;
				font-family: "Times New Roman", Times, serif;
				font-weight: 800;
				// color: black;
				color: #6e7079;
				img {
					margin-right: 10px;
				}
			}
			li:hover {
				cursor: pointer;
			}
			.active {
				background-color: rgb(243, 244, 250);
				// color: #ccc;
				color: black;
			}
		}
	}
	.right {
		margin-left: 16%;
		width: 82%;
	}
}

.my-component {
	border-radius: 10px 10px 10px 10px;
	box-shadow: -3px -2px 2px rgb(232, 233, 238);
	box-shadow: 0px 0px 3px 0px rgb(232, 233, 238);
	// box-shadow: inset 5em 1em gold;
	pre {
		all: initial;
		width: 100%;
		// overflow: scroll;
		white-space: pre-wrap; /* css-3 */
		white-space: -moz-pre-wrap; /* Mozilla, since1999 */
		white-space: -pre-wrap; /* Opera 4-6 */
		white-space: -o-pre-wrap; /*Opera 7 */
		word-wrap: break-word; /* Internet Explorer 5.5+ */
	}
	width: 90%;
	height: 100%;
	margin: 0 auto;
	// overflow-y: scroll;
	margin-bottom: 80px;
	padding-left: 40px;
	padding-right: 20px;
	padding-top: 30px;
	padding-bottom: 50px;
	//设置可以复制
	user-select: text;
	font-size: 19px;
}

.middle {
	display: flex;
	padding-top: 50px;
	width: 100%;
	margin-left: 80px;
	// justify-content: center;
}
.bottom {
	// width: 90%;
	margin: 0 auto;
	justify-content: center;

	.fileContent {
		width: 100%;
		// height: 600px;
		// margin: 0px auto;
		// background: rgb(252, 250, 250);
		background-color: #fff;
		font-size: 50px;
		margin-bottom: 30px;
		margin-left: 20px;
		// text-align: center;
	}
}
.forth {
	margin-top: 30px;
	margin-left: 100px;
	.title {
		font-size: 1.25rem;
		color: rgb(84, 112, 198);
		margin-bottom: 10px;
	}
	ul {
		li {
			width: 82%;
			height: 50px;
			display: flex;
			align-items: center;
			font-size: 1.25rem;
			justify-content: space-between;
			img {
				margin-right: 20px;
			}
			.smallBox {
				display: flex;
				align-items: center;
				// width: 77%;
			}
		}
		li:hover {
			color: rgb(84, 112, 198);
			cursor: pointer;
		}
	}
}

// 最上方
.top {
	display: flex;
	height: 70px;
	background-color: rgb(255, 255, 255);
	// margin-top: 5px;
	.topLeft {
		width: 18%;
		display: flex;
		align-items: center;
		margin-right: 10px;
		// border: 1px solid #ccc;
		border-radius: 0 0 10px 0;

		box-shadow: 3px 2px 2px rgb(232, 233, 238);
		img {
			margin-left: 10%;
		}
		img:hover {
			cursor: pointer;
		}
		span {
			font-size: 20px;
			margin-left: 15px;
		}
		span:hover {
			cursor: pointer;
		}
	}
	.topRight {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding-left: 40px;
		color: rgb(84, 112, 198);
		font-size: 1.5rem;
		// margin-top: ;
		width: 78%;
		margin-left: 14px;
		border-radius: 0 0 10px 10px;
		box-shadow: -2px 2px 2px rgb(232, 233, 238);
		// box-shadow: 2px 2px 5px rgb(222, 220, 220);
		// box-shadow: 0 6px 10px 0 hsla(0, 0%, 55.7%, 0.25);
	}
}
.bigBox {
	user-select: text;
}

.loadingBox {
	position: relative;
	top: 300px;
	// background: red;
}
// background-color: rgb(227, 229, 231);
</style>