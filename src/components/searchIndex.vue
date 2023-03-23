<template>
	<div>

		<div class="contentBox">
			<div class="fileContent">
				{{txtInfo}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:"searchIndex",
	props:{
		txtInfo:{
			type:String
		}
	}
}
</script>

<style lang="scss" scoped>
.contentBox{

	width: 90%;
	margin-top:30px;
	margin-left: 20px;
	justify-content: center;
	//   height: 500px;
	.fileContent {
		width: 95%;
		background: rgb(252, 250, 250);
		font-size: 16px;
		text-emphasis: 2em;
		line-height: 18px;
		height: 100%;
		padding: 20px 100px 0px 20px;
		//设置可以复制
		user-select: text;
	}
}
</style>