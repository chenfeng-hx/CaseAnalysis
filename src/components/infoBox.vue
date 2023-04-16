<template>
	<!-- 要素提取 -->
	<div class="third" >
		<!-- 没有上传起诉状和判决书 -->
		<div class="tip" v-show="textInfo.title === ''">
			请先上传起诉状或判决书！
		</div>
		<!--左侧关系图谱-->
		<div class="leftBox">
			<div class="logo">
				<img src="../assets/知识图谱.svg" alt="" />
				关系图谱
			</div>
			<!--关系图谱下面的动画-->
			<div class="area">
				<Picture
					:pictureData="pictureData"
					class="picture"
					v-if="reCreate"
				></Picture>
			</div>
		</div>
		<!--右侧基本信息展示-->
		<div class="rightBox" v-show="textInfo.title !== undefined">
			<div class="logo">
				<img src="../assets/基本信息 (2).svg" alt="" />
				基本信息
			</div>
			<ul>
				<li v-if="textInfo.title !== undefined">
                  <span class="leftInfo">案名:</span
				  ><span class="rightInfo">{{ textInfo.title }}</span>
				</li>
				<li v-if="textInfo.court !== undefined">
                  <span class="leftInfo">法院名:</span
				  ><span class="rightInfo">{{ textInfo.court }}</span>
				</li>
				<li v-if="textInfo.court_area !== undefined">
                  <span class="leftInfo">法院地区:</span
				  ><span class="rightInfo">{{ textInfo.court_area }}</span>
				</li>
				<li v-if="textInfo.typeForJudgment !== undefined">
                  <span class="leftInfo">案件类型:</span
				  ><span class="rightInfo">{{ textInfo.typeForJudgment }}</span>
				</li>
				<li v-if="textInfo.case_number !== undefined">
                  <span class="leftInfo">案件号:</span
				  ><span class="rightInfo">{{ textInfo.case_number }}</span>
				</li>
				<li v-if="textInfo.plaintiff !== undefined">
                  <span class="leftInfo">原告:</span
				  ><span class="rightInfo">{{ textInfo.plaintiff[0] }}</span>
				</li>
				<li v-if="textInfo.defendant !== undefined">
                  <span class="leftInfo">被告:</span
				  ><span class="rightInfo">{{ textInfo.defendant[0]}}</span>
				</li>
				<li v-if="textInfo.law !== undefined">
                  <span class="leftInfo">法条:</span
				  ><span class="rightInfo">{{ textInfo.law }}</span>
				</li>
				<li v-if="textInfo.time">
                  <span class="leftInfo">时间:</span
				  ><span class="rightInfo">{{ textInfo.time }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Picture from "./pictureImg.vue";

export default {
	name:"infoBox",
	props:{
		pictureData:{
			type:Object
		},
		textInfo:{
			type:Object
		},
	},
	watch: {
		pictureData: {
			handler(n, o) {
				this.reCreate = false
				setTimeout(()=>{
					this.reCreate = true
				},100)
			},
			deep: true, // 深度监听父组件传过来对象变化
		},
	},
	data(){
		return{
			// 是否展示动画，true 展示
			reCreate:true
		}
	},
	components:{
		Picture,
	},
}
</script>

<style lang="scss" scoped>
.third {
	user-select: text;
	// margin-top: 22px;
	display: flex;
	justify-content: center;
	position: relative;
	margin-bottom: 200px;
	margin-left: 80px;
	.tip {
		position: absolute;
		top: -90px;
		color: rgb(26, 160, 52);
	}
	.logo {
		display: flex;
		align-items: center;
		top: -70px;
		position: absolute;
		font-size: 1.5rem;
		color: rgb(51, 122, 183);
		img {
			width: 60px;
			height: 60px;
			margin-right: 20px;
		}
	}
	.leftBox {
		margin-left: 10px;
		width: 900px;
		border: 3px solid rgb(217, 217, 222);
		height: 1050px;
		margin-right: 3%;
		position: relative;

		.area {
			width: 100%;
			display: flex;
			justify-content: center;
		}
	}
	.rightBox {
		position: relative;
		width: 19%;
		.logo {
			top: -58px;
			img {
				width: 52px;
				height: 52px;
			}
		}
		ul {
			width: 100%;
			li {
				border: 2px solid rgb(217, 217, 222);
				border-radius: 5px;
				padding: 5px 5px;
				color: rgb(68, 68, 70);
				margin-bottom: 10px;
			}
		}
	}
}
</style>