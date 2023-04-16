<template>
	<div>
		<!-- <div v-for="(item, index) in caseInfo" :key="index"> -->

		<div class="caseSim" >
			<div class="topTotic">
				<div class="numberAndText">
					<div class="numberAndText">
						<div class="number">{{currentPage2}}</div>
					</div>
				</div>
				<div class="function">
					<!-- <div class="listDown">加入检索报告</div> -->
					<el-divider direction="vertical" v-if="!this.special"></el-divider>
					<div class="listDown" v-if="!this.special">相似度：{{item.sameNum}}</div>
					<el-divider direction="vertical"></el-divider>
					<div class="listDown" @click="up(item.case_number,4)">同案智推</div>
					<el-divider direction="vertical"></el-divider>
					<div class="listDown" @click="up(item.case_number,0)">Word</div>
				</div>
			</div>

			<div class="articleTopic" @click="up(item.case_number,0)" :class="{articleTopicActive:!this.special}" >
				{{item.title}}
			</div>
			<div class="keyWord" v-if="this.special">

				<el-tag type="info">{{item.case_number}}</el-tag>
				<el-tag type="info">{{item.court_level}}</el-tag>
				<el-tag type="info">{{item.typeForJudgment}}</el-tag>
				<el-tag type="info">原告:{{item.plaintiff[0]}}</el-tag>
				<el-tag type="info">被告:{{item.defendant[0]}}</el-tag>
			</div>
		</div>
	</div>
	<!-- </div> -->
</template>

<script>
export default {
	name: "searchInfo",

	data() {
		return {
			caseTab: {
				name: "first",
			},
			item: {},
		};
	},
	props: {
		caseArr2: {
			type: Object,
		},
		currentPage2:{
			type:Number
		},
		// <Case> 中传递一个字符串，但是却接收布尔值
		special:{
			type:Boolean
		}
	},
	created() {
		this.item = this.caseArr2;
	},
	methods: {
		// 跳转至具体的文章内容
		up(it,currentNum) {
			this.$router.push({
				path: "/specialInfo",
				query: {
					index:it,
					currentIndex:currentNum
				},
			});
		},
		// fixme：无用处
		sendNum(it){
			this.currentIndex = it
		}
	},
};
</script>

<style lang="scss" scoped>
.caseSim {
	overflow: hidden;
	text-overflow: ellipsis;
	// white-space: nowrap;
	width: 90%;
	margin: 12px auto;
	// height: 350px;
	border: 1px solid rgb(199, 205, 207);
	position: relative;
	padding-right:20px;
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
		  /*fixme：*没找到*/
			.textWord {
				color: #b3b3b3;
				height: 20px;
				min-width: 20px;
				line-height: 20px;
				font-size: 10px;
				text-align: center;
				top: 0;
				left: 30px;
			}
		}
		.function {
			display: flex;
			line-height: 26px;
			.listDown {
				font-size: 0.95rem;
				color: #0b71b4;
				cursor: pointer;
				padding: 0 10px;
				line-height: 26px;
			}
			.listDown:hover{
				color: #0b314b;
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
			margin-right: 10px;
		}
		.el-tag:hover{
			border-color:#6094cc;
			cursor: pointer;
		}
		margin-bottom: 20px;
	}
	/*fixme：*没找到*/
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
	/*fixme：*没找到*/
	.bottomResult {
		font-size: 14px;
		line-height: 24px;
		text-indent: 2em;
		letter-spacing: 0.5px;
		transition: 0.3s;
		text-align: start;
	}
	/*fixme：*没找到*/
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
}
</style>