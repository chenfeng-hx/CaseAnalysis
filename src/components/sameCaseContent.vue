<template>
	<div>
		<div class="title">检索共有{{ sameCaseLength }}条相似案件:</div>
		<ul>
			<li
				v-for="(item, index) in sameCase"
				:key="index"
				@click="up(item.case_number)"
			>
				<div class="smallBox">
					<img src="../assets/标签.svg" class="logoImg" alt="" /><span class="numLogo">{{index+1}}.</span> {{ item.title }}
				</div>
				<div class="numBox">相似度:{{ item.sameNum }}</div>
			</li>
		</ul>
	</div>
</template>

<script>

export default {
	name:"sameCaseContent",
	props:{
		sameCaseLength:{
			type:Number
		},
		sameCase:{
			type:Array
		}
	},
	methods:{
		// 点击相似案例跳转
		up(it) {
			this.$router.push({
				path: "/specialInfo",
				query: {
					index: it,
					currentIndex:0
				},
			});
		}
	}
}
</script>

<style scoped lang="scss">
.numLogo{
	margin-left: 10px;
	margin-right: 10px;
}

.title{
	margin-top: 20px;
	margin-bottom: 15px;
	color: rgb(26, 160, 52);
	font-size: 1.4rem;

}
ul {

	li {
		width: 85%;
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
			// width: 80%;
			.logoImg{
				width: 1.25em;
				height: 1.25em;
				margin: 0;
			}
		}

	}
	li:hover {
		color: rgb(84, 112, 198);
		cursor: pointer;
	}
}
</style>