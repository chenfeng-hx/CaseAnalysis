/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-05-25 14:47:25 编写而成！
*    祝你食用愉快！！！
*/
<script setup>


</script>

<template>
	<!-- 注释: 文书分析 -->
	<div class="container">
		<!-- 可折叠的步骤条 -->
		<el-affix position="top" :offset="70">
			<div class="step">
				zheshi
			</div>
		</el-affix>
		<!-- 三个展示区域 -->
		<div class="tabs">

		</div>
		<div class="blank"></div>
	</div>
</template>

<style scoped lang="scss">
/* 步骤条 */
.container {
	display: flex;

	.step {
		width: 250px;
		height: 800px;
		background-color: pink;
		margin-top: 15px;
		margin-left: 10px;
	}
	.blank {
		height: 1500px;
	}
	.tabs {
		background-color: blue;
		width: auto;
		height: 50px;

	}
}
</style>