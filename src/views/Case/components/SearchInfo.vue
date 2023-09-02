<script setup>
/**
 * 当前代码编辑信息:
 *     由用户 尘封 使用 WebStorm 在 “vue3” 中
 *     于 2023/9/3 编写而成！
 *     祝你食用愉快！！！
 */

import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()

const caseTab = reactive({
	name: "first",
	item: {},
})

const props = defineProps({
	caseArr2: Object,
	currentPage2: Number,
	special: Boolean,
})

// Created
caseTab.item = props.caseArr2;

const up = (it, currentNum) =>{
	router.push({
		path: "/specialInfo",
		query: {
			caseNumber: it,
			currentIndex: currentNum
		}
	})
}



</script>

<template>
	<div>
		<div class="caseSim" >
			<div class="topTotic">
				<div class="numberAndText">
					<div class="numberAndText">
						<div class="number">{{currentPage2}}</div>
					</div>
				</div>
				<div class="function">
					<el-divider direction="vertical" v-if="!special"></el-divider>
					<div class="listDown" v-if="!special">相似度：{{caseTab.item.sameNum}}</div>
					<el-divider direction="vertical"></el-divider>
					<div class="listDown" @click="up(caseTab.item.case_number,4)">同案智推</div>
					<el-divider direction="vertical"></el-divider>
					<div class="listDown" @click="up(caseTab.item.case_number,0)">Word</div>
				</div>
			</div>

			<div class="articleTopic" @click="up(caseTab.item.case_number,0)" :class="{articleTopicActive:!special}" >
				{{caseTab.item.title}}
			</div>
			<div class="keyWord" v-if="special">

				<el-tag type="info">{{caseTab.item.case_number}}</el-tag>
				<el-tag type="info">{{caseTab.item.court_level}}</el-tag>
				<el-tag type="info">{{caseTab.item.typeForJudgment}}</el-tag>
				<el-tag type="info">原告:{{caseTab.item.plaintiff[0]}}</el-tag>
				<el-tag type="info">被告:{{caseTab.item.defendant[0]}}</el-tag>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
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