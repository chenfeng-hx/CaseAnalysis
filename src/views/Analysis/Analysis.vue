/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-05-25 14:47:25 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
import {reactive, ref} from "vue";
import {Finished, Pointer, Promotion, Upload, UploadFilled} from '@element-plus/icons-vue';
// 引入 VueOfficeDocx 组件(渲染预览文件内容)
import VueOfficeDocx from "@vue-office/docx";
// 引入相关样式
import '@vue-office/docx/lib/index.css';
import {ElMessage} from "element-plus";
import {getClaimGeneration, getSameCaseForm, upJudgment, getCaseInfo} from "@/api/analysisDocx.js";
import MapKnowledge from "@/components/MapKnowledge.vue";
import MouseLoading from "@/components/MouseLoading.vue";
import SameCases from "@/components/SameCases.vue";

/**
 * 左侧步骤条区域逻辑
 */
/* 顶部 "上传文件" 按钮的逻辑 */
// 判断上传的是"起诉状 0"还是"判决书 1"
let fileType = ref(0);
// 文件类型名称(右侧第一个按钮的内容)
let fileTypeName = ref('起诉状');
// 上传的文件(起诉状)
let file_load_pleadings = ref();
// 上传的文件(判决书)
let file_load_judgment = ref();
// 上传文件的名称(展示在右侧顶部)
let fileName = ref('<<< 请参照左侧的步骤提示进行操作呦！');
// 改变文件类型同时改变右侧第一个按钮的文字
const changeFileType = value => {
	fileType.value = value;
	// fixme: 通过拖拽上传的文件其实是没有对 fileTypeName 的值进行判断的
	fileTypeName.value = value ? '判决书' : '起诉状';
}

// 预览文件的内容
let preview_file = ref('');

// 通过按钮上传文件后的操作(作用于 input 的 change 事件)
// 因为对于"起诉状"和"判决书"有不同的操作接口, 所以得先进行判断是哪种文件类型
const handlerFileInfo = () => {
	// 当重新上传文件(此时可以理解为没有点击重置按钮且已经有过分析文件的举动后手动帮助用户重置状态)
	// 初始化请求后的各种返回信息
	Object.assign(caseInfo, {});
	Object.assign(mapKnowledgeInfo, {});
	sameCases.value = [];

	let fileReader = new FileReader();
	// 判断文件类型
	// let fileExtension  = '';
	// 通过 fileType 的值判断应该在哪个里面取值
	if (!fileType.value) {
		// 起诉状(注释放里面, 耶, 小猪盖被~~~)
		// 可以在此处使用 || 将拖拽文件加进去变成一个独立函数
		// fileReader.readAsArrayBuffer(file_load_pleadings.value.files[0] || drag_file.value.files[0]);
		fileReader.readAsArrayBuffer(file_load_pleadings.value.files[0]);
		// 改变文件内容(因为刚好在判断, 所以就直接把操作放在 if-else 内部, 觉得不美观可以把拿出去做三元, 顺便删去这个if的大括号)
		// fileName.value = file_load_pleadings.value.files[0].name || drag_file.value.files[0].name;
		fileName.value = file_load_pleadings.value.files[0].name;
		// fileExtension = fileName.value.split('.').pop();
		// fileExtension = fileName.value.slice(fileName.value.lastIndexOf('.'));
	} else {
		// 判决书
		fileReader.readAsArrayBuffer(file_load_judgment.value.files[0]);
		fileName.value = file_load_judgment.value.files[0].name;
	}
	// 渲染为 pdf
	// if (fileExtension === '.pdf' || fileExtension === '.docx') =>

	// 将内容渲染到页面上
	fileReader.onload = () => preview_file.value = fileReader.result;
	// 改变右侧页面的文件名称(右侧等同于 event.target.files )
	// 改变步骤条的状态
	active_step.value = 1;
	// 将"第一个按钮"按下
	tabIndex.value = 1;
}

/* 中间 "步骤条" 的逻辑 */
// 判断当前进行到了哪一步(相当于 el-steps 自带的 active, 新名字)
let active_step = ref(0);
// 存储拖拽上传的文件
let drag_file = ref();
// 对拖拽文件进行处理
const handlerFileDrop = event => {
	// 将拖拽上去的文件保存下来
	drag_file.value = event.dataTransfer.files[0];
	// 改变右侧页面的文件名称
	fileName.value = drag_file.value.name;
	// 改变步骤条的状态
	active_step.value = 1;
	// 同样的操作预览文件内容
	let fileReader = new FileReader();
	fileReader.readAsArrayBuffer(drag_file.value);
	fileReader.onload = () => preview_file.value = fileReader.result;
}

/* 下方两个按钮的功能 */
// "重置" 按钮的功能
const reSetStatus = () => {
	// 初始化步骤条的状态
	active_step.value = 0;
	// 初始化右侧页面文件名称
	fileName.value = '<<< 请参照左侧的步骤提示进行操作呦！';
	// 初始化右侧"预览文件"
	preview_file.value = '';
	// 初始化右侧顶部按钮状态
	tabIndex.value = 0;
	// 初始化请求后的各种返回信息
	Object.assign(caseInfo, {});
	Object.assign(mapKnowledgeInfo, {});
	sameCases.value = [];
	// 初始化 input 框中收到的以前的文件信息
	file_load_judgment.value = '';
	file_load_pleadings.value = '';
	drag_file.value = '';
}

/* 上传文件逻辑 */
// 保存返回的分析出来的案件信息(传递给子组件)
const caseInfo = reactive({});
// 保存返回的"知识图谱"的绘画信息(传递给子组件)
const mapKnowledgeInfo = reactive({});
// 上传文件并进行分析(在不同的发送请求的过程中对步骤条的状态进行改变)
const analysisFile = () => {
	// 先判断上传的文件类型
	// 起诉状
	if (!fileType.value) {
		// 先判断是否上传了文件, 没有上传文件时发送消息并结束
		if (file_load_pleadings.value.files.length === 0) {
			ElMessage({
				type: 'warning',
				message: '请先上传诉求文件',
				duration: 1000
			});
			return;
		}
		// 没有中断函数就证明已上传文件
		let pleadingsFileFormData = new FormData();
		pleadingsFileFormData.append("submit_file", file_load_pleadings.value.files[0]);
		// 改变步骤条状态
		active_step.value = 2;
		ElMessage({
			type: 'success',
			message: '正在分析中...',
			duration: 1000,
		});
		// 发送请求
		getClaimGeneration(pleadingsFileFormData)
			.then(res => {
				console.log(res);
				if (res.data !== 'token校验失败') {
					active_step.value = 3;
					// 蹭一下"用户认证", "同案智推"没有设置
					searchSameCases();
					// 请求"知识图谱"成功
					if (res.data.claim_kg.node_list.length !== 0) {
						// 保存"原告""被告""案件题目"等信息
						Object.assign(caseInfo, res.data.claim_info);
						// 保存绘画"知识图谱"的数据信息
						Object.assign(mapKnowledgeInfo, res.data.claim_kg);
						// 开始判断发送"同案智推"和当前的请求是否都成功并发送用户提示消息
						if (sameCases.value.length !== 0) {
							active_step.value = 4;
							ElMessage({
								type: 'success',
								message: '分析成功',
								duration: 1500,
								center: true,
							});
						} else {
							console.log(sameCases.value.length)
							active_step.value = 4;
							ElMessage({
								type: 'warning',
								message: '知识图谱分析成功, 同案检索分析失败',
								duration: 1500,
								center: true,
							});
						}
						// 请求"知识图谱"失败
					} else {
						if (sameCases.value.length !== 0) {
							active_step.value = 4;
							ElMessage({
								type: 'warning',
								message: '知识图谱分析失败, 同案检索分析成功',
								duration: 1500,
								center: true,
							});
						} else {
							active_step.value = 1;
							ElMessage({
								type: 'error',
								message: '分析失败, 请重新上传文件并保证文件的正确性',
								duration: 1500,
								center: true,
							});
						}
					}
				} else {
					// 身份认证失败
					ElMessage({
						message: "未登录或者登录过期，请重新登录",
						type: "warning",
						center: true,
						duration: 1000,
					});
				}
			})
			.catch(res => console.log(res))
	} else {
		// 判决书(和上面的步骤几乎是一样的, 但因为接口不同所以要写两遍)
		// 先判断是否上传了文件, 没有上传文件时发送消息并结束~~(也可以把 === 0 去掉, 然后换成 || , 没试不知道 !err 不 !err)~~
		if (file_load_judgment.value.files.length === 0) {
			ElMessage({
				type: 'warning',
				message: '请先上传诉求文件',
				duration: 1000
			});
			return;
		}
		let judgmentFileFormData = new FormData();
		judgmentFileFormData.append('submit_file', file_load_judgment.value.files[0]);
		judgmentFileFormData.append('flag', 0);
		// 改变步骤条状态
		active_step.value = 2;
		ElMessage({
			type: 'success',
			message: '正在分析中...',
			duration: 1000,
		});
		// 发送请求
		upJudgment(judgmentFileFormData)
			.then(res => {
				if (res.data !== 'token校验失败') {
					active_step.value = 3;
					// 获取案例号
					let case_number = res.data.replace('"', "");
					// 获取案件基本信息
					getCaseInfo(case_number)
						.then(res => {
							// 保存案件信息
							Object.assign(caseInfo, res.data);
						})
						.catch(() => {
							ElMessage({
								type: 'success',
								message: '基本信息分析失败, 请重新上传文件',
								duration: 1000,
							})
						})
					getJudgementGeneration(case_number)
						.then(res => {
							if (res.data.judgment_kg_list !== []) {
								Object.assign(mapKnowledgeInfo, res.data.judgment_kg);
								active_step.value = 4;
								ElMessage({
									type: 'success',
									message: '分析完成',
									duration: 1000,
								})
							} else {
								ElMessage({
									type: 'warning',
									message: '知识图谱分析失败, 请重新上传文件',
									duration: 1000,
								})
							}
						})
						.catch(() => {
							active_step.value = 1;
							ElMessage({
								type: 'error',
								message: '文件上传失败',
								duration: 1000,
							})
						})
				} else {
					active_step.value = 1;
					// 身份认证失败
					ElMessage({
						message: "未登录或者登录过期，请重新登录",
						type: "warning",
						center: true,
						duration: 1000,
					});
				}
			})
	}
}

// 存储返回的相同案件信息
const sameCases = ref([]);
// "同案智推"请求
const searchSameCases = () => {
	let searchSameCasesFormData = new FormData();
	// 起诉状
	if (!fileType.value) {
		searchSameCasesFormData.append('submit_file', file_load_pleadings.value.files[0]);
	} else {  // 判决书
		searchSameCasesFormData.append('submit_file', file_load_judgment.value.files[0])
	}
	// 发送请求
	getSameCaseForm(searchSameCasesFormData)
		.then(res => {
			console.log(res);
			const data = res.data.res_list;
			if (data.length !== 0) {
				// 有同案智推数据
				for (let i = 0; i < data.length; i++) {
					const item = {};
					// 案例号 [(2019)渝0118民初7829号]
					item.case_number = data[i][0];
					// 案例名称
					item.title = data[i][1];
					item.similarityValue = (data[i][3] * 100).toFixed(2) + "%";
					sameCases.value.push(item);
				}
			}
		})
		.catch(res => console.log(res));
}

/**
 * 右侧区域逻辑
 */
// 判断当前点击的是哪一个按钮
let tabIndex = ref(0);
// 改变点击的按钮, 并进行右侧展示页面的切换
const changeTabIndex = value => {
	// 改变当前有"按下状态样式"的按钮
	tabIndex.value = value;
	// 回到顶部
	document.documentElement.scrollTop = 0;
}

</script>

<template>
	<!-- 注释: 文书分析 -->
	<div class="container">
		<!-- 固钉 -->
		<el-affix position="top" :offset="70">
			<!-- 可隐藏的步骤条 -->
			<div class="step">
				<!-- 上传文件按钮下拉菜单 -->
				<div class="top">
					<!-- 上传文件按钮同时进行文件类型的选择 -->
					<div class="upLoad">
						<el-tooltip content="只支持 .docx 文档哦" placement="bottom">
							<el-dropdown trigger="click">
								<el-button type="primary">
									上传文件<el-icon class="el-icon--right"><Upload/></el-icon>
								</el-button>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item style="justify-content: center">----请选择文件类型----</el-dropdown-item>
										<!-- 两个按钮共用同一个 input_file 框 -->
										<el-dropdown-item
											@click="changeFileType(0)"
											style="justify-content: center"
										><label for="file_load_pleadings">起诉状</label>
											<input
												id="file_load_pleadings"
												type="file"
												ref="file_load_pleadings"
												accept=".docx"
												style="display: none"
												@change="handlerFileInfo"
											/>
										</el-dropdown-item>
										<el-dropdown-item
											@click="changeFileType(1)"
											style="justify-content: center"
										><label for="file_load_judgment">判决书</label>
											<input
												id="file_load_judgment"
												type="file"
												ref="file_load_judgment"
												accept=".docx"
												style="display: none"
												@change="handlerFileInfo"
											/>
										</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</el-tooltip>
					</div>
				</div>
				<!-- 步骤条 -->
				<!-- 在步骤条最外侧盒子处添加拖拽事件, 保证区域的大小 -->
				<div
					class="stepShow"
					@dragover.prevent
					@drop.prevent="handlerFileDrop"
				>
					<el-steps direction="vertical" align-center :space="120" :active="active_step">
						<el-step title="上传文件" description="可以点右上角菜单或拖拽文件至本区域上传" :icon="UploadFilled" />
						<el-step title="Ai分析" description="点击进行分析提交文件进行模型分析" :icon="Pointer" />
						<el-step title="要素提取中" description="请耐心等待哟~" :icon="Promotion" />
						<el-step title="分析成功" description='请点击"争议要素"或"同案智推"查看相关的分析结果！' :icon="Finished" />
					</el-steps>
				</div>
				<!-- 重置按钮和下一步按钮 -->
				<div class="funcBtn">
					<el-button plain @click="reSetStatus">重置</el-button>
					<el-button type="success" plain @click="analysisFile">进行分析</el-button>
				</div>
			</div>
		</el-affix>
		<!-- 三个展示区域 -->
		<div class="views">
			<!-- 右上面的展示标签 -->
			<div class="tabs">
				<div class="filename">{{ fileName }}</div>
				<button role="button" class="button-name" :class="{ 'active' : tabIndex === 1 }" @click="changeTabIndex(1)">{{ fileTypeName }}</button>
				<button role="button" class="button-name" :class="{ 'active' : tabIndex === 2 }" @click="changeTabIndex(2)">争议要素</button>
				<button role="button" class="button-name" :class="{ 'active' : tabIndex === 3 }" @click="changeTabIndex(3)" v-show="fileType === 0">同案智推</button>
			</div>
			<!-- 右下的展示盒子: 文件内容、知识图谱或是同案智推 -->
			<div class="box">
				<!-- 文件预览盒子 -->
				<div class="preview" v-show="tabIndex === 1">
					<!-- 没有点击按钮时显示 -->
					<div class="not-file" v-show="fileName === '<<< 请参照左侧的步骤提示进行操作呦！' && tabIndex === 1">
						<img src="@/assets/svg/请先上传文件.svg" alt="请先上传文件">
						<!--<span>请先上传文件@.@</span>-->
					</div>
					<vue-office-docx :src="preview_file"  v-show="tabIndex === 1" />
				</div>
				<!-- 知识图谱盒子 -->
				<div class="map-show">
					<MapKnowledge :map-knowledge-info="mapKnowledgeInfo" :case-info="caseInfo" v-show="tabIndex === 2" />
				</div>
				<!-- 同案智推盒子 -->
				<div class="same-cases">
					<same-cases :same-cases="sameCases" v-show="tabIndex === 3" />
				</div>
			</div>
		</div>
		<div style="height: 1500px"></div>
	</div>
</template>

<style scoped lang="scss">
.container {
	display: flex;

	/* 步骤条 */
	.step {
		width: 250px;
		height: 700px;
		//background-color: pink;
		margin: 15px 10px 0 10px;
		padding: 5px;
		border-radius: 10px;
		box-shadow:
			2px 2px 2px 1px rgba(0, 0, 0, .2),   	/* 右下角 */
			-2px -2px 2px 1px rgba(0, 0, 0, .2),  	/* 左上角 */
			-2px 2px 2px 1px rgba(0, 0, 0, .2),     /* 左下角 */
			2px -2px 2px 1px rgba(0, 0, 0, .2);  	/* 右上角 */

		/* 上传文件按钮 */
		.top {
			position: relative;
			height: 100px;

			.upLoad {
				display: inline-block;
				width: 110px;
				height: 32px;
				position: relative;
				top: 10px;
				/* mark:如果取消调整el-button宽高的话就调整为 140px */
				left: 150px;

				.el-button {
					width: 90px;
					height: 28px;
					--el-button-bg-color: #ee3f4d;
					--el-button-hover-bg-color: #ee4f4d;
					--el-button-active-bg-color: #ee4f4d;
					--el-button-border-color: none;
					--el-button-active-color: none;
					--el-button-outline-color: none;
					--el-button-hover-border-color: none;
					--el-button-active-border-color: none;


					&:hover {
						background-color: #ee3f4d;
					}

					&:active {
						background-color: #ee3f4d;
					}
				}

				.text-center {
					justify-content: center;
				}
			}
		}

		/* 步骤条区域 */
		.stepShow {
		}

		/* 重置按钮和下一步按钮 */
		.funcBtn {
			display: flex;
			justify-content: center;
			position: relative;
			bottom: -55px;

			.el-button {
				height: 40px;

				&:last-of-type {
					width: 150px;
				}
			}

		}
	}



	/* 右侧的展示区 */
	.views {

		/* 上面的展示标签和文件名 */
		.tabs {
			width: 1100px;
			height: 40px;
			margin-top: 5px;
			display: flex;
			align-items: center;
			border-radius: 2px;
			justify-content: space-around;
			margin-bottom: 5px;

			.button-name {
				align-items: center;
				appearance: none;
				background-color: #FCFCFD;
				border-radius: 4px;
				border-width: 0;
				box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px,rgba(45, 35, 66, 0.15) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
				box-sizing: border-box;
				color: #36395A;
				cursor: pointer;
				display: inline-flex;
				font-family: "JetBrains Mono",monospace;
				height: 40px;
				justify-content: center;
				line-height: 1;
				list-style: none;
				overflow: hidden;
				padding-left: 16px;
				padding-right: 16px;
				position: relative;
				text-align: left;
				text-decoration: none;
				transition: box-shadow .15s,transform .15s;
				user-select: none;
				-webkit-user-select: none;
				touch-action: manipulation;
				white-space: nowrap;
				will-change: box-shadow,transform;
				font-size: 18px;
			}

			.button-name:focus {
				box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
			}

			.button-name:hover {
				box-shadow: rgba(45, 35, 66, 0.3) 0 4px 8px, rgba(45, 35, 66, 0.2) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
				transform: translateY(-2px);
			}

			.button-name:active {
				box-shadow: #D6D6E7 0 3px 7px inset;
				transform: translateY(2px);
			}

			.active {
				box-shadow: #D6D6E7 0 3px 7px inset;
				transform: translateY(2px);
			}

			.filename {
				padding: 0 10px;
				width: 700px;
				height: 100%;
				text-align: center;
				line-height: 40px;
				/* 限制文本在一行内显示 */
				white-space: nowrap;
				/* 隐藏容器内溢出的内容 */
				overflow: hidden;
				/* 当文本超出容器时，显示省略号 */
				text-overflow: ellipsis;
				font-size: 14px;
				border-radius: 5px;
				border: 1px solid rgba(51, 51, 51, .2);
				box-shadow:
					2px 2px 2px 1px rgba(51, 51, 51, .3),   	/* 右下角 */
					-2px 2px 2px 1px rgba(51, 51, 51, .3),     /* 左下角 */
					2px -2px 2px 1px rgba(51, 51, 51, .3);  	/* 右上角 */
			}
		}

		/* 右下的文件内容和知识图谱 */
		.box {
			width: 1100px;
			min-height: 700px;

			/* 没有文件时 */
			.not-file {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 800px;
			}

			/* 文件预览盒子 */
			.preview {
				height: 700px;
				//position: relative;
				//background-color: pink;
				span {
					position: absolute;
					color: #febc2b;
					font-weight: 120;
					font-size: 20px;
					top: 365px;
					right: 324px;
				}

				:deep(.vue-office-docx) {
					overflow-y: visible;
				}

				:deep(.docx-wrapper) {
					background: none;
					padding: 15px;
				}
			}

			img {
				width: 500px;
			}
		}
	}
}
</style>