<template>
	<div>
		<div
			class="container"
			:class="{ containerActive: isShow9 }"
			v-loading="loading4"
			element-loading-background="rgba(0, 0, 0, 0)"
			element-loading-text="拼命加载中"
		>
			<!-- class="container3" v-show="isShow9" -->
			<!-- 开始时的搜索框 -->
			<div :class="{ container3: isShow9 }">
				<div class="title">
					<div class="text">本案例库已经收录了</div>
					<div
						v-loading="loading5"
						class="wait"
						element-loading-background="rgba(0, 0, 0, 0)"
					>
						<div class="text textMiddle">{{ caseNum }}</div>
					</div>
					<div class="text">个案件</div>
				</div>
				<div class="search">
					<el-autocomplete
						class="inline-input"
						v-model="state1"
						:trigger-on-focus="false"
						:fetch-suggestions="querySearch"
						@select="handleSelect"
						placeholder="请输入搜索案例关键词"
						@input="changeStyle('block', '.el-autocomplete-suggestion')"
						@keyup="changeStyle('none', '.el-autocomplete-suggestion')"
						@keyup.enter.native="changeIsSearch"
					></el-autocomplete>
					<el-button
						type="primary"
						style="letter-spacing: 5px; font-size: 16px"
						@click="changeIsSearch"
						class="searchBtn"
					><img src="../assets/搜索.svg" alt=""
					/></el-button>
				</div>

				<div class="cardBox" :class="{ putActive3: !isShow9 }">
					<div
						class="searchCard"
						@click="searchHigh()"
						:class="{ searchCardSpecial: this.currentIndex == 0 }"
					>
						案例搜索
					</div>
					<div
						class="searchCard"
						:disabled="isLock"
						@click="allCaseSearch()"
						:class="{
              searchCardSpecial: this.currentIndex == 1,
              active1: isLock == true,
            }"
					>
						所有案件
					</div>
					<div
						class="searchCard"
						@click="sameSearchBtn()"
						:class="{ searchCardSpecial: this.currentIndex == 2 }"
					>
						同案检索
					</div>
				</div>
			</div>

			<!-- 同案检索 -->
			<el-dialog
				:visible.sync="dialogVisible"
				width="70%"
				class="sameBox"
				:modal="false"
				:before-close="handleClose2"
				v-loading="loading3"
				element-loading-background="rgba(0, 0, 0, 0)"
				element-loading-text="拼命加载中"
			>
				<h1>同案检索</h1>
				<div class="content">
					<div class="tip">以下两种方式任选一种：</div>
					<div class="first">
            <span>上传起诉状:</span
			><input type="file" id="file_load" ref="file" accept=".docx" />
					</div>
					<div class="second">
            <span>输入案例号:</span
			><el-input
						placeholder="请输入内容"
						class="caseInput"
						v-model="sameInput"
					></el-input>
					</div>
					<el-button type="primary" class="third" @click="sameCaseSearch()"
					>检索</el-button
					>
				</div>
				<!-- 找不到相似案例 -->
				<div v-show="isShow6" class="notFoundSame">
					<img src="../assets/页面为空 (1).svg" alt="" />
					<div class="title">
						没有找到相似案件<img src="../assets/哭泣.svg" alt="" />
					</div>
				</div>
			</el-dialog>
			<div class="caseText caseText2 container2" v-if="sameShow2">
				<!-- 搜索关键词展示内容 -->
				<div class="right">
					<div class="rightTitle">
						<div class="text" @click="changeEcharts(true)">
							相似案例（{{ this.sameCase.length }}）
						</div>
						<div class="sort">
							<div class="sortText">
								<img src="../assets/case/download.svg" alt="" width="27" />
								<!-- <div>批量下载</div> -->
							</div>
						</div>
					</div>

					<!-- 右下内容 -->
					<div class="caseContainer">
						<div
							v-for="(item, index) in sameCase.slice(
                (currentPage - 1) * pagesize,
                currentPage * pagesize
              )"
							:key="index"
						>
							<search-info
								v-if="hackReset"
								:currentPage2="(currentPage - 1) * pagesize + 1 + index"
								:caseArr2="item"
								:special="first"
							></search-info>
						</div>
					</div>

					<div class="pagination">
						<div class="block">
							<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="currentPage"
								:page-sizes="[2, 4, 6, 8, 10]"
								:page-size="pagesize"
								layout="total, sizes, prev, pager, next, jumper"
								:total="this.sameCase.length"
							>
							</el-pagination>
						</div>
					</div>
				</div>
				<!-- :total="this.sameCase.length" -->
				<!-- 找不到你搜索的内容 -->
			</div>

			<el-main class="container2" v-show="!isShow9">
				<div v-if="iscase">
					<div class="labelsTag" v-if="isShowTag()">
						<div
							class=""
							style="
                margin-left: 37px;
                color: #2d405e;
                display: inline-block;
                font-size: 14px;
              "
						>
							已选条件：
						</div>
						<el-tag
							v-for="(tag1, index4) in courthierarchy"
							:key="index4 + 'd'"
							closable
							:disable-transitions="false"
							@close="handleClose(1, tag1)"
							style="margin: 0 8px"
						>
							{{ tag1 }}
						</el-tag>
						<el-tag
							v-for="(tag2, index5) in area"
							:key="index5 + 'f'"
							closable
							:disable-transitions="false"
							@close="handleClose(2, tag2)"
							style="margin: 0 8px"
						>
							{{ tag2 }}
						</el-tag>
						<el-tag
							v-for="(tag3, index6) in year"
							:key="index6 + 'x'"
							closable
							:disable-transitions="false"
							@close="handleClose(3, tag3)"
							style="margin: 0 8px"
						>
							{{ tag3 }}
						</el-tag>
					</div>
				</div>

				<!-- 加载动画 -->
				<div class="londing" v-if="issearch">
					<loading />
				</div>

				<div v-if="!iscase" class="blank">
					<div class="special" v-if="isShow4">
						<img src="../assets/页面为空 (1).svg" alt="" />
						<div>找不到您搜索的内容<img src="../assets/哭泣.svg" alt="" /></div>
					</div>
				</div>
				<div
					class="caseText"
					v-if="iscase"
					v-loading="loading"
					element-loading-background="rgba(0, 0, 0, 0)"
					element-loading-text="拼命加载中"
				>
					<!-- 左边内容 -->
					<div class="left">
						<div class="list">
							<div class="title">
								<img src="../assets/case/court.svg" alt="" width="25" />
								<h3>法院层级</h3>
							</div>
							<ul v-for="(val, key, index1) in courtArr" :key="index1 + 'a'">
								<li @click="chooseCourt(1, key)" v-if="key!=''">{{ key }} ({{ val }})</li>
							</ul>
						</div>
						<el-divider></el-divider>
						<div class="list">
							<div class="title">
								<img src="../assets/case/area.svg" alt="" width="25" />
								<h3>地域</h3>
							</div>

							<ul v-for="(val, key, index2) in areaArr" :key="index2 + 'b'">
								<li @click="chooseCourt(2, key)" v-if="key!=''">{{ key }} ({{ val }})</li>
							</ul>
						</div>
						<el-divider></el-divider>
						<div class="list">
							<div class="title">
								<img src="../assets/case/data.svg" alt="" width="25" />
								<h3>判决年份</h3>
							</div>

							<ul v-for="(val, key, index3) in timeArr" :key="index3 + 'c'">
								<li @click="chooseCourt(3, key)" v-if="key!=''">{{ key }} ({{ val }})</li>
							</ul>
						</div>
					</div>

					<!-- 搜索关键词展示内容 -->
					<div class="right" v-if="isShow">
						<div class="rightTitle">
							<div class="text" @click="changeEcharts(true)">
								检索案例（{{ this.allLike1.total }}）
							</div>
							<div
								class="text"
								style="margin-left: 5px"
								@click="changeEcharts(false)"
							>
								可视化
							</div>
							<div class="sort">
								<div class="sortText">
									<img src="../assets/case/download.svg" alt="" width="27" />
									<!-- <div>批量下载</div> -->
								</div>
							</div>
						</div>

						<!-- 右下内容 -->
						<div class="caseContainer" v-if="hackReset2">
							<div
								v-for="(item, index) in caseArr.slice(
                  (currentPage - 1) * pagesize,
                  currentPage * pagesize
                )"
								:key="index"
							>
								<search-info
									v-if="hackReset2"
									:currentPage2="(currentPage - 1) * pagesize + 1 + index"
									:caseArr2="item"
									:special="second"
								></search-info>
							</div>
						</div>

						<!-- 地图部分 -->
						<div class="echarts" v-if="!hackReset2">
							<charts
								style="width: 100%"
								:caseArr="caseArr"
								:allLike1="allLike1"
							></charts>
						</div>
						<div class="pagination" v-if="hackReset2">
							<div class="block">
								<el-pagination
									@size-change="handleSizeChange"
									@current-change="handleCurrentChange"
									:current-page="currentPage"
									:page-sizes="[10]"
									:page-size="pagesize"
									layout="total, sizes, prev, pager, next, jumper"
									:total="allLike1.total"
								>
								</el-pagination>
							</div>
						</div>
					</div>

					<!-- 找不到你搜索的内容 -->
				</div>
			</el-main>
			<el-footer style="padding: 0px" v-if="iscase" v-show="!isShow9"
			><bottomBar
			/></el-footer>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import contentInfo from "../components/contentInfo.vue";
import bottomBar from "../components/BottomBar.vue";
import loading from "../components/Loading.vue";
import searchInfo from "../components/searchInfo.vue";
import axios from "axios";
import sameCaseContent from "../components/sameCaseContent.vue";
import charts from "../components/charts.vue";
export default {
	name: "case",
	data() {
		return {
			// 锁所有案例按钮
			isLock: false,
			first: false,
			second: true,
			// 搜索后更新的侧边栏数据
			//所有案例
			allLike: {},
			//搜索后
			allLike1: {},
			//点击标签
			allLike2: {},

			currentIndex: 0,
			//相似案例
			sameCase: [],
			sameCaseLength: 0,
			sameShow2: false,
			loading3: false,
			isShow6: false,
			sameInput: "",
			dialogVisible: false,
			loading5: true,
			isShow9: true,
			// 所有案例：
			allCase: [],
			courtArr1: {},
			timeArr2: {},
			areaArr3: {},
			loading4: false,

			caseNum: "",
			loading: false,
			cancelFun: null,
			flag: false,
			flag2: false,
			hackReset2: true,
			hackReset: true,
			isShow: false,
			isShow4: false,
			isShow5: false,
			state1: "",
			//  数据是否传入
			issearch: false,
			iscase: false,
			// 当前点击的是哪个类案
			current: 0,
			selectIndex: 1,
			//  当前页面
			currentPage: 1,
			//  分页每页数量
			pagesize: 10,
			// 数组大小
			total: null,
			// 选中的小标签
			courthierarchy: [],
			area: [],
			year: [],
			caseTab1: {
				name: "first",
			},

			//搜索关键字后的案例数据
			caseArr: [],
			//存储的搜索关键字后的案例数据
			caseArr2: [],
			caseName: [],
			caseNumber: 10,

			//侧边栏的数据
			courtArr: {},
			timeArr: {},
			areaArr: {},
			selectCourt: "",
			selectTime: "",
			selectArea: "",
			isLogin: false,
		};
	},

	created() {
		axios({
			url: "http://123.249.87.210:8002/get_count",
			method: "get",
		}).then((res) => {
			this.loading5 = false;
			this.caseNum = res.data;
		}).catch((res)=>{
			this.loading5 = false;
		});
		// 所有案例搜索
		this.allCaseStart();
	},
	computed: {
		...mapState(["globalControlFirst"]),
	},
	components: {
		bottomBar,
		loading,
		contentInfo,
		searchInfo,
		sameCaseContent,
		charts,
	},
	methods: {
		// 搜索所有案例
		allCaseStart() {
			this.$api.search
				.getCase("案", "", "", "")
				.then((res) => {
					//确定已经搜索完成
					if (res.data != "token校验失败") {
						//判断是否能搜索出来
						if (res.data.res.length != 0) {
							// allCase保存所有案件信息
							this.allCase = res.data.res;
							//caseArr2保存没有加标签时的信息
							this.caseArr2 = res.data.res;
							this.allLike = res.data.like_info;
							this.courtArr1 = res.data.like_info.court_level;
							this.areaArr1 = res.data.like_info.court_area;
							this.timeArr1 = res.data.like_info.time;
						}
					} else {
						this.isLogin2 = false;
						// this.loginTip();
					}
					// 返回模糊查询后的列表数据 并且记录 点击时取案件的case_number来获取详细信息
				})
				.catch(() => {});
		},

		// 登录
		loginTip() {
			this.$message({
				type: "warning",
				message: "未登录或登录过期",
				center: "true",
				duration: 1000,
				customClass: "press",
				center: "true",
			});
		},

		// 点击同案检索
		sameSearchBtn() {
			this.dialogVisible = true;
			this.currentIndex = 2;
		},

		changeEcharts(val) {
			this.hackReset2 = val;
		},

		// 展示所有案例
		allCaseSearch() {
			this.isLock = true;
			//每次判断有没有登录
			this.$api.search.getUser().then((res) => {
				if (res.data != "token校验失败") {
					this.dialogVisible = false;
					this.sameShow2 = false;
					if (this.allCase.length != 0) {
						//侧边栏数据赋值
						this.allLike1 = this.allLike;
						this.allLike2 = this.allLike;
						this.state1 = "";
						this.currentIndex = 1;
						this.isShow9 = false;
						this.caseArr = this.allCase;
						this.caseArr2 = this.allCase;
						this.courtArr = this.courtArr1;
						this.areaArr = this.areaArr1;
						this.timeArr = this.timeArr1;
						this.isShow4 = false;
						this.issearch = false;
						this.iscase = true;
						this.isShow = true;
					} else {
						this.loading4 = true;
						this.allCaseStart();
						var timer = setInterval(() => {
							if (this.allCase.length != 0) {
								this.allLike1 = this.allLike;
								this.allLike2 = this.allLike;
								this.state1 = "";
								this.currentIndex = 1;
								this.isShow9 = false;
								this.caseArr = this.allCase;
								this.courtArr = this.courtArr1;
								this.areaArr = this.areaArr1;
								this.timeArr = this.timeArr1;
								this.isShow4 = false;
								this.issearch = false;
								this.iscase = true;
								this.isShow = true;
								this.caseArr2 = this.allCase;
								this.loading4 = false;
								clearInterval(timer);
							}
						}, 1000);
					}
				} else {
					this.loginTip();
				}
			});
			setTimeout(() => {
				this.isLock = false;
			}, 2000);
		},

		handleClose2(done) {
			this.$confirm("确认关闭？")
				.then((_) => {
					this.dialogVisible = false;
					done();
				})
				.catch((_) => {});
		},

		// 点击搜索按钮
		searchHigh() {
			this.dialogVisible = false;
			this.sameShow2 = false;
			this.isShow9 = true;
			this.currentIndex = 0;
		},

		// 同案检索成功后的操作
		sameChange(data, id, status) {
			this.loading3 =false
			this.sameCase = [];
			this.sameCaseLength = data.length;
			if (status == 0) {
				const len = id.length;
				const len2 = parseInt(0.7 * len);
				for (let i = 0; i < data.length; i++) {
					const vote = {};
					vote.title = data[i][1];
					vote.case_number = data[i][0];
					vote.sameNum = parseFloat(data[i][3] * 100).toFixed(3) + "%";
					this.sameCase.push(vote);
					if (data[i][1].substr(0, len2) == id.substr(0, len2)) {
						vote.sameNum = "100.00%";
						this.sameCase.pop()
						this.sameCase.unshift(vote)
					}

				}
			} else {
				for (let i = 0; i < data.length; i++) {
					const vote = {};
					vote.title = data[i][1];
					vote.case_number = data[i][0];
					vote.sameNum = parseFloat(data[i][3] * 100).toFixed(3) + "%";
					this.sameCase.push(vote);
					if (data[i][0] == id) {
						vote.sameNum = "100.00%";
						this.sameCase.pop()
						this.sameCase.unshift(vote)
					}

				}
			}

			//找不到搜索内容消失
			this.isShow4 = false;
			// 搜索出来的内容消失
			this.iscase = false;
			this.isShow9 = false;
			this.dialogVisible = false;
			this.loading3 = false;
			//展示相似案例
			this.dialogVisible = false;
			this.sameShow2 = true;
		},
		//同案检索
		sameCaseSearch() {
			this.currentPage = 1;
			this.sameShow2 = false;
			this.isShow6 = false;
			//判断是以文件方式还是案例号
			// 文件方式
			if (this.$refs.file.files.length != 0) {
				this.sameCase = [];
				let formdata3 = new FormData();
				formdata3.append("submit_file", this.$refs.file.files[0]);
				this.$api.analysisDocx
					.getSamecaseForm(formdata3)
					.then((res) => {
						this.loading3 = false;
						if (res.data == "token校验失败") {
							this.$message({
								type: "warning",
								message: "请先登录",
								customClass: "press",
								center: "true",
								duration: 1000,
							});
						} else {
							this.loading3 = true;
							this.$api.analysisDocx;
							setTimeout(() => {
								const data = res.data.res_list;
								const id = res.data.case_info.title;
								this.sameChange(data, id, 0);
							}, 1000);
						}
					})
					.catch((res) => {
						// console.log(res);
						this.isShow6 = true;
						this.loading3 = false;
					});

				// 案例号
			} else if (this.sameInput != "") {
				const caseId = this.sameInput.replace('"', "");
				//通过案件号查询相似案例
				let formdata = new FormData();
				formdata.append("case_number", caseId);
				// 同案检索
				this.$api.analysisDocx
					.getSamecaseNum(formdata)
					.then((res) => {
						this.loading3 = true;
						setTimeout(() => {
							const data = res.data.sameChange;
							const id = this.sameInput;
							this.sameChange(data, id, 1);
						}, 1000);
					})
					.catch((res) => {
						if (res.response.status == 401) {
							this.loginTip();
						} else {
							this.isShow6 = true;
						}
						this.loading3 = false;
					});
			} else {
				this.$message({
					type: "warning",
					message: "上传起诉状或者输入案件号",
					customClass: "press",
					center: "true",
					duration: 1500,
				});
			}
		},

		//按回车键推荐隐藏
		changeStyle(status, className) {
			let dom = document.querySelectorAll(className);
			dom[0].style.display = status;
		},

		// 跳转到点击的案件页面
		handleSelect(item) {
			const caseId = item.ID;
			this.iscase = false;
			this.issearch = true;

			setTimeout(() => {
				this.issearch = false;
				this.$router.push({
					path: "/specialInfo",
					query: {
						index: caseId,
						currentIndex: 0,
					},
				});
			}, 1500);
		},

		// 监视输入框的内容 进行模糊检索
		querySearch(queryString, callback) {
			this.sameShow2 = false;
			if (typeof this.cancelFun === "function") {
				this.cancelFun();
			}
			if (this.state1 == "") {
				this.changeStyle("none", ".el-autocomplete-suggestion");
			} else {
				const searchKey = queryString;
				this.isShow5 = false;
				this.isShow4 = false;
				this.flag2 = false;
				// let self=this;
				// 模糊搜索
				axios({
					url: "http://123.249.87.210:8002/case_like_search",
					method: "post",
					headers: {
						token: localStorage.getItem("token"), //	可以是授权凭证用的参数值
					},
					data: {
						key: queryString,
						court_level: "",
						court_area: "",
						time: "",
						page: 1,
					},
					// 用来销毁请求
					cancelToken: new axios.CancelToken((c) => {
						this.cancelFun = c;
					}),
				})
					.then((res) => {
						//确定已经搜索完成
						if (res.data == "token校验失败") {
							this.loginTip();
							this.isLogin = false;
						} else {
							this.isLogin = true;
							//判断是否能搜索出来
							if (res.data.res.length != 0) {
								this.caseArr = res.data.res;
								this.allLike1 = res.data.like_info;
								this.allLike2 = res.data.like_info;
								this.caseArr2 = res.data.res;
								this.courtArr = res.data.like_info.court_level;
								this.areaArr = res.data.like_info.court_area;
								this.timeArr = res.data.like_info.time;
								// 获取模糊检索的列表
								this.caseName = [];
								for (let i = 0; i < res.data.res.length; i++) {
									this.caseName.push({
										value: res.data.res[i].title,
										ID: res.data.res[i].case_number,
									});
								}
								callback(this.caseName);
								//  this.iscase = tr,,ue;
							} else {
								this.iscase = false;
								this.isShow4 = true;

								this.changeStyle("none", ".el-autocomplete-suggestion");
							}
							this.flag2 = true;
						}
						// 返回模糊查询后的列表数据 并且记录 点击时取案件的case_number来获取详细信息
					})
					.catch(() => {
						this.caseArr = [];
						this.flag2 = true;
						this.issearch = false;
						this.iscase = false;
						this.isShow4 = true;
					});
			}
		},
		// 分页功能
		handleSizeChange(val) {
			this.pagesize = val;
		},
		//分页时销毁组件
		handleCurrentChange(val) {
			this.currentPage = val;
			this.$api.search
				.getCase(
					this.state1,
					this.selectCourt,
					this.selectArea,
					this.selectTime,
					val
				)
				.then((res) => {
					for (var i = val * 10 - 10, j = 0; j < 10; i++, j++) {
						this.caseArr[i] = res.data.res[j];
					}
				});

			setTimeout(() => {
				this.hackReset2 = false;
				this.$nextTick(() => {
					this.hackReset2 = true;
				});
			}, 250);
		},
		// 关闭选中的小标签
		handleClose(id, tag) {
			this.currentPage = 1;
			// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
			if (id == 1) {
				this.courthierarchy.splice(this.courthierarchy.indexOf(tag), 1);
				this.selectCourt = "";
			}
			if (id == 2) {
				this.area.splice(this.area.indexOf(tag), 1);
				this.selectArea = "";
			}
			if (id == 3) {
				this.year.splice(this.year.indexOf(tag), 1);
				this.selectTime = "";
			}

			if (
				this.selectCourt == "" &&
				this.selectArea == "" &&
				this.selectTime == ""
			) {
				this.caseArr = this.caseArr2;
				this.allLike1 = this.allLike2;
			} else {
				this.$api.search
					.getCase(
						this.state1,
						this.selectCourt,
						this.selectArea,
						this.selectTime,
						1
					)
					.then((res) => {
						this.allLike1 = res.data.like_info;
						// this.caseNumber = res.data.res.length;
						this.caseArr = res.data.res;
						//判断是否能搜索出来
						if (res.data.res.length != 0) {
							// 获取模糊检索的列表
							this.caseName = [];
							for (let i = 0; i < res.data.res.length; i++) {

								this.caseName.push({
									value: res.data.res[i].title,
									ID: res.data.res[i].case_number,
								});
							}
						}
					});
			}
			this.hackReset2 = false;
			this.$nextTick(() => {
				this.hackReset2 = true;
			});
		},

		//选择标签
		chooseCourt(id, value) {
			this.flag = false;
			this.currentPage = 1;
			if (
				value == this.selectCourt ||
				value == this.selectArea ||
				value == this.selectTime
			) {
				this.flag = true;
			}

			if (this.flag == false) {
				if (id == 1) {
					this.selectCourt = value;
					if (this.courthierarchy.length == 0) {
						this.courthierarchy.push(value);
					} else {
						this.courthierarchy.splice(0, 1, value);
					}
				}
				if (id == 2) {
					this.selectArea = value;
					if (this.area.length == 0) {
						this.area.push(value);
					} else {
						this.area.splice(0, 1, value);
					}
				}
				if (id == 3) {
					this.selectTime = value;
					if (this.year.length == 0) {
						this.year.push(value);
					} else {
						this.year.splice(0, 1, value);
					}
				}
				this.loading = true;
				this.$api.search
					.getCase(
						this.state1,
						this.selectCourt,
						this.selectArea,
						this.selectTime,
						1
					)
					.then((res) => {
						if (res.data != "token校验失败") {
							this.caseNumber = res.data.res.length;
							this.caseArr = res.data.res;
							this.allLike1 = res.data.like_info;
							//判断是否能搜索出来
							if (res.data.res.length != 0) {
								// 获取模糊检索的列表
								this.caseName = [];
								for (let i = 0; i < res.data.res.length; i++) {
									this.caseName.push({
										value: res.data.res[i].title,
										ID: res.data.res[i].case_number,
									});
								}
							}
							this.hackReset2 = false;
							this.$nextTick(() => {
								this.hackReset2 = true;
							});
						} else {
							this.isLogin();
						}
						this.loading = false;
					});
			}
		},
		isShowTag() {
			if (
				this.courthierarchy.length == 0 &&
				this.area.length == 0 &&
				this.year.length == 0
			)
				return false;
			else return true;
		},

		// 加在搜索上的遮罩层判断
		changeIsSearch() {
			this.sameShow2 = false;
			this.changeStyle("none", ".el-autocomplete-suggestion");
			if (this.state1 != "" && this.isLogin) {
				this.iscase = false;
				this.issearch = true;
				this.isShow9 = false;
				// this.isShow9 = false
				setTimeout(() => {
					var timer = setInterval(() => {
						if (this.flag2 == true) {
							if (this.caseArr.length == 0) {
								this.isShow4 = true;
								this.issearch = false;
								this.isShow = false;
								this.iscase = false;
							} else {
								this.isShow4 = false;
								this.issearch = false;
								this.isShow = true;
								this.iscase = true;
							}
							clearInterval(timer);
						}
					}, 400);
				}, 1500);
			}
			if (!this.isLogin && this.state1 != "") {
				this.loginTip();
			}
		},
	},
};
</script>

<style scoped lang="scss">
.blank {
	height: 800px;
	width: 100%;
	display: flex;
	justify-content: center;
	.special {
		margin-top: 50px;
		height: 600px;
		img {
			width: 250px;
			height: 250px;
			margin-top: 80px;
		}
		div {
			margin: 5px auto;
			display: flex;
			justify-content: center;
			color: rgb(84, 112, 198);
			font-size: 1.25em;
			img {
				width: 1.25em;
				height: 1.25em;
				margin: 0;
			}
		}
	}
}
.title {
	display: flex;
	justify-content: center;
	margin: 20px 0px;
	color: black;
	.text {
		font-size: 38px;
	}
	.wait {
		//  margin-left: 5px;
		margin-right: 20px;
	}
	.textMiddle {
		color: rgb(107, 156, 242);
		margin-left: 15px;
		// margin-right: 10px;
	}
}
.search {
	// height: 300px;
	// position: relative;
	display: flex;
	align-items: center; /*垂直居中*/
	justify-content: center;
	.searchBtn {
		// width: 30px;
		// height: 30px;
		width: 10%;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 20px;
			height: 20px;
		}
	}
	.el-autocomplete {
		width: 70%;
		display: table;
		padding-right: 5px;
		position: relative;
		z-index: 0;
	}
	.el-button {
		width: 10%;
	}
}
.labelsTag {
	background: rgb(245, 245, 245);
	width: 80%;
	align-items: center; /*垂直居中*/

	// justify-content: center;/*水平居中*/
	margin: 0 auto;
	display: flex;
	border-radius: 3px;
	height: 40px;
	margin-top: 10px;
	transition: 0.3s all;
}

.caseText {
	display: flex;
	// width: 80%;
	text-align: center;
	margin: 0 auto;
	padding-top: 5px;
	margin-bottom: 100px;
	// align-items: center;/*垂直居中*/

	justify-content: center; /*水平居中*/
	transition: 0.3s all;
}
.left {
	width: 18%;
	float: left;
	text-align: left;
	box-sizing: border-box;
	background: rgb(245, 245, 245);
	border-radius: 3px;
	// height: 700px;
	.list {
		margin-left: 5px;
		.title {
			justify-content: start;
			margin: 8px;
		}
		li:hover {
			.list {
				margin-left: 5px;
				.title {
					justify-content: start;
					margin: 8px;
				}
				li:hover {
					background-color: #d7e5f9;
					color: #165ac6;
					cursor: pointer;
				}
			}
		}
	}
}

.right {
	width: 62%;

	margin-left: 10px;
	.rightTitle {
		background: rgb(245, 245, 245);
		display: flex;
		.text {
			flex: 0 0 200px;
			background: #0b71b4;
			color: #fff;
			font-size: 14px;
			font-weight: 600;
			height: 30px;
			line-height: 30px;
			width: 215px;
		}

		.sort {
			width: 100%;
			display: flex;
			text-align: end;
			align-items: center; /*垂直居中*/
			justify-content: end;
			.sortText {
				padding-right: 10px;
				margin-right: 10px;
				font-size: 15px;
				height: 30px;
				display: flex;
				align-items: center;
				cursor: pointer;
				color: #0b71b4;

				img {
					margin: 0 2px;
				}
			}
		}
	}

	.caseContainer {
		background: rgb(245, 245, 245);
		align-items: center; /*垂直居中*/
		justify-content: center;
		padding-bottom: 28px;
		padding-top: 1px;
	}

	.pagination {
		.caseContainer {
			background: rgb(245, 245, 245);
			align-items: center; /*垂直居中*/
			justify-content: center;
			padding-bottom: 28px;
			padding-top: 1px;
		}
		.echarts {
			background: rgb(245, 245, 245);
		}

		.pagination {
			margin-top: 10px;
		}
	}
}

h3 {
	letter-spacing: 2px;
	font-size: 16px;
	font-weight: 600;
	color: #2d405e;
	margin: 0;
	padding: 4px 2px;
}

.el-divider--vertical {
	height: 1.25em;
	margin-top: 2px;
}
.el-footer {
	padding: 0px;
}

ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
	li {
		padding: 6px 0;
		font-size: 14px;
		display: block;
		font-weight: 400;
		color: rgb(45, 64, 94);
		padding-left: 40px;
	}
	li:hover {
		background-color: #d7e5f9;
		color: #165ac6;
	}
}
.el-divider--vertical {
	height: 1.25em;
	margin-top: 2px;
}
.el-footer {
	padding: 0px;
}
// .container {
//   // background-image: url("../assets/banner(2).png");

// }

// 刚开始搜索框的样式
.container3 {
	//  margin-top: calc(20% - 137px);
	width: 50%;
	min-width: 700px;
	height: 350px;
	background-color: rgba(224, 225, 232, 0.25);
	backdrop-filter: blur(6px);
	-webkit-backdrop-filter: blur(6px);
	border: 1px solidhsla(0, 0%, 100%, 0.18);
	box-shadow: 0 6px 15px 0 hsla(0, 0%, 55.7%, 0.19);
	border-radius: 12px;
	-webkit-border-radius: 12px;
	color: white;
	margin: 0 auto;
	padding-top: 40px;
	.title {
		.text {
			font-size: 1.5rem;
		}
	}
}
.cardBox {
	display: flex;
	justify-content: space-evenly;
	margin-top: 40px;
	.searchCard {
		color: rgb(93, 172, 255);
		border-radius: 10px;
		font-family: Lato, sans-serif;
		font-weight: 500;
		font-size: 20px;
		text-align: center;
		cursor: pointer;
		position: relative;
		display: inline-block;
		box-shadow: 2px 2px 5px rgb(222, 220, 220);
		outline: none;
		width: 120px;
		height: 55px;
		background: #fff;
		line-height: 55px;
		padding: 0;
		border: none;
	}
	.searchCardSpecial {
		background-color: rgb(99, 151, 241);
		color: #fff;
	}
	div::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		border-top: 2.5px solid;
		border-left: 2.5px solid;
		// box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
		width: 0;
		height: 0;
		transition: all 0.3s ease;
		visibility: hidden;
		box-sizing: border-box;
		color: rgb(228, 236, 250);
	}
	div::after {
		content: "";
		position: absolute;
		right: 0;
		bottom: 0;
		border-right: 2.5px solid;
		border-bottom: 2.5px solid;
		width: 0;
		height: 0;
		transition: all 0.3s ease;
		visibility: hidden;
		box-sizing: border-box;

		color: rgb(228, 236, 250);
	}
	div:hover::before {
		width: 100%;
		height: 100%;
		visibility: visible;
	}
	div:hover::after {
		width: 100%;
		height: 100%;
		visibility: visible;
	}
	div:hover {
		background-color: rgb(99, 151, 241);
		box-shadow:
			// 2px 2px 2px 0 , 7px 7px 20px 0 rgb(0 0 0 / 10%), 4px 4px 5px 0 rgb(0 0 0 / 10%)
			inset 2px 2px 2px 0 rgb(148, 147, 147), 7px 7px 30px 0 rgb(203, 201, 201),
			4px 4px 5px 0 rgb(104, 104, 104);
		color: #fff;
		border-radius: 0;
	}
	.active {
		background-color: rgb(99, 151, 241);
		box-shadow:
			// 2px 2px 2px 0 , 7px 7px 20px 0 rgb(0 0 0 / 10%), 4px 4px 5px 0 rgb(0 0 0 / 10%)
			inset 2px 2px 2px 0 rgb(148, 147, 147), 7px 7px 30px 0 rgb(203, 201, 201),
			4px 4px 5px 0 rgb(104, 104, 104);
		color: #fff;
		border-radius: 0;
		border: 2.5px solid rgb(228, 236, 250);
	}
}
.sameBox {
	h1 {
		display: flex;
		justify-content: center;
		// margin: 20px auto;
	}
	.content {
		font-size: 1.2rem;
	}
	.tip {
		margin-top: 40px;
		color: rgb(136, 160, 52);
		font-size: 1.25rem;
	}
	.first,
	.second {
		margin-top: 30px;
		margin-bottom: 40px;
		display: flex;
		align-items: center;
		input {
			margin-left: 30px;
		}
	}
	.caseInput {
		width: 50%;
		margin-left: 30px;
	}
	.third {
		margin-left: calc(50% - 20px);
		position: relative;
		z-index: 100;
	}
	.notFoundSame {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: -80px;
		img {
			margin-top: 10px;
			width: 200px;
			height: 380px;
		}
		.title {
			display: flex;
			align-items: center;
			margin-top: 20px;
			width: 100%;
			margin-top: -100px;
			color: rgb(51, 122, 183);
			// justify-content: center;
			img {
				width: 1.25em;
				height: 1.25em;
				margin: 0;
			}
		}
	}
}
.containerActive {
	width: 100%;
	height: 700px;
	background-image: url("../assets/bgc3.png");
	background-size: 100% 100%;
	padding-top: 100px;
	opacity: 0.95;
}
.putActive3 {
	// float: right;
	// position: fixed;
	position: relative;
	margin-top: 0;
	top: -100px;
	left: calc(100% - 160px);
	width: 180px;
	display: flex;
	flex-wrap: wrap;
	.searchCard {
		margin-bottom: 20px;
	}
}
.container2 {
	margin-top: -220px;
}
.caseText2 {
	margin-top: -200px;

	.right {
		width: 75%;
	}
}
.active1 {
	pointer-events: none; // 禁止鼠标点击事件
}
</style>