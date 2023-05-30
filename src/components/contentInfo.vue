<template>
	<div class="caseSim">
		<div class="topTotic">
			<div class="numberAndText">
				<div class="numberAndText">
					<div class="number">{{ parseInt(numIndex) + 1 }}</div>
					<div class="textWord">全文共4586字</div>
				</div>

			</div>
			<div class="function">
				<div class="listDown">加入检索报告</div>
				<el-divider direction="vertical"></el-divider>
				<div class="listDown">同案智推</div>
				<el-divider direction="vertical"></el-divider>
				<div class="listDown">Word</div>
			</div>
		</div>
		<div class="articleTopic">梁某2、梁某1肖像权纠纷民事申请再审审查民事案</div>
		<div class="keyWord">
			<el-tag type="info">请求财产损失</el-tag>
			<el-tag type="info">个人形象被歪曲</el-tag>
			<el-tag type="info">职务侵权</el-tag>
			<el-tag type="info">请求停止侵害</el-tag>
			<el-tag type="info">请求赔礼道歉</el-tag>
			<el-tag type="info">请求精神损失费</el-tag>
			<el-tag type="info">请求支付惩罚性赔偿</el-tag>
			<el-tag type="info">过错责任原则</el-tag>
			<el-tag type="info">精神损害</el-tag>
			<el-tag type="info">受害人有过错</el-tag>
			<el-tag type="info">以营利为目的,未经公民同意利用其肖像做广告、商标、装饰橱窗</el-tag>
			<el-tag type="info">在产品上使用肖像</el-tag>
		</div>
		<div class="result">
			<!-- <div class="bip" @click="changCaseName(item.id,'first');" :class="{'focus':(caseTab.name == 'first')&&(caseTab.index==parseInt(item.id))}" >裁判结果</div>
			<div class="bip" @click="changCaseName(item.id,'second');" :class="{'focus':(caseTab.name == 'second')&&(caseTab.index==parseInt(item.id))}" >裁判理由</div>
			<div class="bip" @click="changCaseName(item.id,'third');" :class="{'focus':(caseTab.name == 'third')&&(caseTab.index==parseInt(item.id))}">文章摘要</div>
			<div class="bip" @click="changCaseName(item.id,'fourth');" :class="{'focus':(caseTab.name == 'fourth')&&(caseTab.index==parseInt(item.id))}" >引用法条</div> -->
			<div class="bip" @click="changCaseName('first');" :class="{ 'focus': (caseTab.name == 'first') }">裁判结果</div>
			<div class="bip" @click="changCaseName('second');" :class="{ 'focus': (caseTab.name == 'second') }">裁判理由</div>
			<div class="bip" @click="changCaseName('third');" :class="{ 'focus': (caseTab.name == 'third') }">文章摘要</div>
			<div class="bip" @click="changCaseName('fourth');" :class="{ 'focus': (caseTab.name == 'fourth') }">引用法条</div>
		</div>
		<div class="bottomResult" v-if="(caseTab.name == 'first')" style="margin:0 20px">
			驳回梁某2的再审申请。
		</div>
		<div class="bottomResult" v-if="(caseTab.name == 'second')" style="margin:0 20px">
			本院认为,《中华人民共和国侵权责任法》第二十条规定:“侵害他人人身权益造成财产损失的,按照被侵权人因此受到的损失赔偿;被侵权人的损失难以确定,侵权人因此获得利益的,按照其获得的利益赔偿;侵权人因此获得的利益难以确定,被侵权人和侵权人就赔偿数额协商不一致,向人民法院提起诉讼的,由人民法院根据实际情况确定赔偿数额。”在本案中,首先,被侵权人的损失难以确定,也无法证明侵权人获得的利益,且双方就赔偿数额不
		</div>
		<div class="bottomResult" v-if="(caseTab.name == 'third')" style="margin:0 20px">
			一、撤销本院民事判决及XXXXXX人民法院民事判决; 二、被申请人明山区沐风宜和瑜伽会馆经营者向再审申请人刘某某直接口头赔礼道歉; 三、驳回再审申请人刘某某的其他诉讼请求。
			一审案件受理费250元,二审案件受理费250元,均由被申请人明山区沐风宜和瑜伽会馆负担。 本判决为终审判决
		</div>
		<div class="bottomResult" v-if="(caseTab.name == 'fourth')" style="margin:0 20px">
			<div>《中华人民共和国民事诉讼法》第一百七十条</div>
			<div>《中华人民共和国民事诉讼法》第一百二十七条 、第一百七十条</div>
			<div>《最高人民法院关于适用《中华人民共和国民事诉讼法>的解释》第三百二十条</div>
		</div>

		<div class="label">
			<div class="labelText">劳动争议纠纷</div>
			<div class="labelText">中级法院</div>
			<div class="labelText">南岸区</div>
			<div class="labelText">2021</div>
		</div>


	</div>
</template>

<script>
export default {
	name: "contentInfo",
	data() {
		return {
			caseTab: {
				name: "first",
			}
		}
	},
	props: {
		numIndex: {
			type: Number,
		},
		caseTab1: {
			type: String
		}
	},
	created() {
		this.caseTab.name = this.caseTab1
	},
	methods: {

		changCaseName(name) {
			this.caseTab.name = name

		},
	}
}
</script>

<style lang="scss" scoped>
.caseSim {
	width: 90%;
	margin: 12px auto;
	// height: 350px;
	border: 1px solid rgb(199, 205, 207);
	position: relative;

	.topTotic {
		display: flex;

		.numberAndText {
			display: flex;
			flex: 1;

			.number {
				color: #b3b3b9;
				background-color: #f7f8f7;
				height: 20px;
				min-width: 20px;
				line-height: 20px;
				font-size: 10px;
				text-align: center;
				padding: 0;
				left: 1px;
			}

			.textWord {
				color: #b3b3b3;
				height: 20px;
				min-width: 20px;
				line-height: 20px;
				font-size: 10px;
				text-align: center;
				padding: 0;
				top: 0;
				left: 30px;
			}
		}

		.function {
			display: flex;
			line-height: 26px;

			.listDown {
				font-size: 13px;
				color: #0b71b4;
				cursor: pointer;
				padding: 0 10px;
				line-height: 26px;
			}
		}
	}

	.articleTopic {
		cursor: pointer;
		font-weight: normal;
		font-size: 20px;
		transition: 0.3s all;
		text-align: start;
		margin: 15px 30px;
	}

	.articleTopic:hover {
		color: #6094cc;
	}

	.keyWord {
		width: 90%;
		text-align: justify;
		margin-left: 20px;

		.el-tag {
			margin-top: 5px;
		}
	}

	.result {
		display: flex;
		border-bottom: 2px solid #0b71b4;
		margin: 15px 20px;

		.bip {
			width: 100px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			font-size: 14px;
			margin-right: 3px;
			cursor: pointer;
			color: #6094cd;
			font-weight: 600;
			transition: 0.5s;
			display: inline-block;
		}

		.focus {
			background: #0b71b4;
			color: #fff;
		}

		.test {
			color: red;
		}
	}

	.bottomResult {
		font-size: 14px;
		line-height: 24px;
		text-indent: 2em;
		letter-spacing: 0.5px;
		transition: 0.3s;
		text-align: start;
	}

	.label {
		display: flex;
		// position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 10px 15px;

		.labelText {
			margin-right: 30px;
			color: #666;
			font-size: 14px;
		}

		.labelText:first-child {
			font-weight: bold;
			color: red;
		}
	}
}

.caseSim:hover {
	border: 1px solid rgb(96, 148, 205);
}</style>