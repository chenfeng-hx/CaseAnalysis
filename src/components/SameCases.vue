/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-06-02 22:26:04 编写而成！
*    祝你食用愉快！！！
*/
<script setup>
// 导入路由函数
import { useRouter, useRoute } from "vue-router";
// 接收参数
const props = defineProps({
	sameCases: Array
})
const emit = defineEmits(['updateData'])
// 创建路由对象
const router = useRouter();
const route = useRoute();
// 点击文章标题跳转至文章的详情页
const jumpToDetail = caseNumber => {
	router.push({
		path: '/specialInfo',
		query: {
			caseNumber: caseNumber,
			currentIndex: 0
		}
	})
	if (route.path === '/specialInfo') {
		emit('updateData', { caseNumber: caseNumber });
	}
}

</script>

<template>
	<!-- 注释: 同案智推模块 -->
	<div class="case-container">
		<div class="not-case" v-show="!sameCases.length">
			<img src="@/assets/svg/无信息.svg" alt="暂无信息">
		</div>
		<div v-show="sameCases.length">
			<div class="title">检索共有{{ sameCases.length }}条相似案件:</div>
			<ul>
				<li v-for="(item, index) in sameCases" :key="index" @click="jumpToDetail(item.case_number)">
					<div class="smallBox">
						<img src="@/assets/svg/标签.svg" class="logoImg" alt="" />
						<span class="numLogo">{{ index+1 }}.</span> {{ item.title }}
					</div>
					<div class="numBox">相似度:{{ item.similarityValue }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped lang="scss">
.case-container {
	margin: 40px 0 0 30px;
	width: 100%;
}

.numLogo {
	margin-left: 10px;
	margin-right: 10px;
}

.title {
	margin-top: 20px;
	margin-bottom: 15px;
	color: rgb(26, 160, 52);
	font-size: 1.4rem;

}

.not-case {
	display: flex;
	justify-content: center;
	img {
		width: 500px;
	}
}

ul {

	li {
		width: 85%;
		height: 50px;
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		//font-size: 1.25rem;

		font-size: 1.15rem;
		justify-content: space-between;

		img {
			margin-right: 20px;
		}

		.smallBox {
			display: flex;
			align-items: center;
			font-size: 1.15rem;

			// width: 80%;
			.logoImg {
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