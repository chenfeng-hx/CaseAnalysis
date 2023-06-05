/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-05-24 21:59:19 编写而成！
*    祝你食用愉快！！！
*/
<script setup>


</script>

<template>
	<!-- 注释：回到顶部 -->
	<el-backtop class="back" :right="25" :bottom="100">UP</el-backtop>


</template>

<style scoped lang="scss">
.back {
	height: 40px;
	width: 40px;
	background-color: #eeeeee;
	box-shadow: var(--el-box-shadow-lighter);
	text-align: center;
	line-height: 40px;
	color: #1989fa;
	border-radius: 5px;
	/* 在预览文档时会出现 display 为 none 的情况, 强制让它显示 */
	display: block !important;
}
</style>