/**
* 当前代码编辑信息:
*    由用户 尘封 使用 WebStorm 在 “CaseAnalysis” 中
*    于 2023-05-21 19:35:49 编写而成！
*    祝你食用愉快！！！
*/
<script setup>

import {reactive, ref} from "vue";

/**
 * 选择法律词条 :
 * 		通过点击左侧的法律目录，改变样式和展示的法律内容
 */
// 控制法律条文目录的活跃样式和展示的对应的法律条文内容
let choseLaw = ref(1);
// 对应的法律条文内容
const lowContents = reactive([
	`<h2>` +
	"第五十四条" +
	`</h2><p>` +
	"人民法院公开审理行政案件，但涉及国家秘密、个人隐私和法律另有规定的除外。涉及商业秘密的案件，当事人申请不公开审理的，可以不公开审理。" +
	`</p>`,

	`<h2>` +
	"第六十一条" +
	`</h2><p>` +
	"在涉及行政许可、登记、征收、征用和行政机关对民事争议所作的裁决的行政诉讼中，当事人申请一并解决相关民事争议的，人民法院可以一并审理。在行政诉讼中，人民法院认为行政案件的审理需以民事诉讼的裁判为依据的，可以裁定中止行政诉讼。" +
	`</p>`,

	`<h2>` +
	"第八十九条" +
	`</h2><p>` +
	"人民法院审理上诉案件，按照下列情形，分别处理：" +
	`<br>` +
	"（一）原判决、裁定认定事实清楚，适用法律、法规正确的，判决或者裁定驳回上诉，维持原判决、裁定；" +
	`<br>` +
	"（二）原判决、裁定认定事实错误或者适用法律、法规错误的，依法改判、撤销或者变更；" +
	`<br>` +
	"（三）原判决认定基本事实不清、证据不足的，发回原审人民法院重审，或者查清事实后改判；" +
	`<br>` +
	"（四）原判决遗漏当事人或者违法缺席判决等严重违反法定程序的，裁定撤销原判决，发回原审人民法院重审。" +
	`<br>` +
	"原审人民法院对发回重审的案件作出判决后，当事人提起上诉的，第二审人民法院不得再次发回重审。" +
	`<br>` +
	"人民法院审理上诉案件，需要改变原审判决的，应当同时对被诉行政行为作出判决。" +
	`</p>`,

	`<h2>` +
	"第十条" +
	`</h2><p>` +
	"【禁止作为商标使用的文字、图形】下列标志不得作为商标使用：" +
	`<br>` +
	"（一）同中华人民共和国的国家名称、国旗、国徽、军旗、勋章相同或者近似的，以及同中央国家机关所在地特定地点的名称或者标志性建筑物的名称、图形相同的；" +
	`<br>` +
	"（二）同外国的国家名称、国旗、国徽、军旗相同或者近似的，但该国政府同意的除外；" +
	`<br>` +
	"（三）同政府间国际组织的名称、旗帜、徽记相同或者近似的，但经该组织同意或者不易误导公众的除外；" +
	`<br>` +
	"（四）与表明实施控制、予以保证的官方标志、检验印记相同或者近似的，但经授权的除外；" +
	`<br>` +
	"（五）同“红十字”、“红新月”的名称、标志相同或者近似的；" +
	`<br>` +
	"（六）带有民族歧视性的；" +
	`<br>` +
	"（七）夸大宣传并带有欺骗性的；" +
	`<br>` +
	"（八）有害于社会主义道德风尚或者有其他不良影响的。" +
	`<br>` +
	"县级以上行政区划的地名或者公众知晓的外国地名，不得作为商标。但是，地名具有其他含义或者作为集体商标、证明商标组成部分的除外；已经注册的使用地名的商标继续有效。" +
	`</p>`,


]);
// 改变的方法
const changeLawContent = newLawIndex => {
	choseLaw.value = newLawIndex;
}

</script>

<template>
	<!-- 注释 -->
	<!-- 法条分类展示 -->
	<div id="service-2" style="padding: 10px 0">
		<div class="container">
			<div class="row">
				<div class="offset-lg-2 col-lg-8 text-center">
					<div class="section-title">
						<h2>法条分类</h2>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-45 col-md-6 col-sm-12 animate__pulse">
					<a href="https://www.pkulaw.com/chl/7c7e81f43957c58bbdfb.html?keyword=%E5%AE%AA%E6%B3%95" target="_blank">
						<div class="single-service-area blue-bg mb-50">
							<div class="service-icon">
								<i class="flaticon-international-business"></i>
							</div>
							<h4>宪法</h4>
						</div>
					</a>
				</div>
				<div class="col-lg-45 col-md-6 col-sm-12 wow fadeInLeft" data-wow-delay=".6s">
					<a href="https://www.pkulaw.com/chl/aa00daaeb5a4fe4ebdfb.html?keyword=%E6%B0%91%E6%B3%95" target="_blank">
						<div class="single-service-area service-2 mb-50">
							<div class="service-icon">
								<i class="flaticon-family"></i>
							</div>
							<h4>民事</h4>
						</div>
					</a>
				</div>
				<div class="col-lg-45 col-md-6 col-sm-12 wow fadeInLeft" data-wow-delay=".4s">
					<a href="https://www.pkulaw.com/chl/39c1b78830b970eabdfb.html?keyword=%E5%88%91%E6%B3%95" target="_blank">
						<div class="single-service-area blue-bg service-3 mb-50">
							<div class="service-icon">
								<i class="flaticon-balance"></i>
							</div>
							<h4>刑事</h4>
						</div>
					</a>
				</div>

				<div class="col-lg-45 col-md-6 col-sm-12 wow fadeInLeft" data-wow-delay=".2s">
					<a href="https://www.pkulaw.com/chl/7ab5e7d605f859e6bdfb.html?keyword=%E5%90%88%E5%90%8C" target="_blank">
						<div class="single-service-area service-4 mb-70">
							<div class="service-icon">
								<i class="flaticon-contract"></i>
							</div>
							<h4>经济</h4>
						</div>
					</a>
				</div>
				<div class="col-lg-45 col-md-6 col-sm-12 wow fadeInLeft" data-wow-delay=".4s">
					<a href="https://www.pkulaw.com/chl/6393f2e43412bddbbdfb.html?keyword=%E5%8A%B3%E5%8A%A8%E6%B3%95" target="_blank">
						<div class="single-service-area blue-bg service-5 mb-50">
							<div class="service-icon">
								<i class="flaticon-certificate"></i>
							</div>
							<h4>行政</h4>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- 高频引用排行 -->
	<div class="row">
		<div class="offset-lg-2 col-lg-8 text-center">
			<div class="section-title">
				<h2>高频引用排行</h2>
				<h8>数据来自“两高公报”历年行政类司法案例数据统计分析报告 （1985-2021年）</h8>
			</div>
		</div>
	</div>

	<!-- 排行榜 1 -->
	<div class="team-area section-padding">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-12">
					<div class="section-title text-center">
						<h3 style="font-size: 40px; font-weight: bold">
							一、法律依据引用排行
						</h3>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInLeft" data-wow-delay=".2s">
					<div class="single-team-member">
						<div class="team-member-bg">
							<div class="team-content">
								<div class="team-title">
									<a href="http://www.pkulaw.cn/fulltext_form.aspx?Db=chl&Gid=76c54b08f88ee7efbdfb&keyword=%e4%b8%ad%e5%8d%8e%e4%ba%ba%e6%b0%91%e5%85%b1%e5%92%8c%e5%9b%bd%e8%a1%8c%e6%94%bf%e8%af%89%e8%ae%bc%e6%b3%95&EncodingName=&Search_Mode=accurate&Search_IsTitle=0" target="_blank">1：中华人民共和国行政诉讼法</a>
								</div>
								<div class="team-subtitle">
									<p>引用236次</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInLeft" data-wow-delay=".4s">
					<div class="single-team-member">
						<div class="team-member-bg team-bg-2">
							<div class="team-content">
								<div class="team-title">
									<a href="http://www.pkulaw.cn/fulltext_form.aspx?Db=chl&Gid=e3fef157898345b5bdfb&keyword=%e6%9c%80%e9%ab%98%e4%ba%ba%e6%b0%91%e6%b3%95%e9%99%a2%e5%85%b3%e4%ba%8e%e6%89%a7%e8%a1%8c%e3%80%8a%e4%b8%ad%e5%8d%8e%e4%ba%ba%e6%b0%91%e5%85%b1%e5%92%8c%e5%9b%bd%e8%a1%8c%e6%94%bf&EncodingName=&Search_Mode=accurate&Search_IsTitle=0" target="_blank">2：最高人民法院关于执行《中华人民共和国行政诉讼法》若干问题的解释[失效]</a>
								</div>
								<div class="team-subtitle">
									<p>引用87次</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInLeft" data-wow-delay=".6s">
					<div class="single-team-member">
						<div class="team-member-bg team-bg-3">
							<div class="team-content">
								<div class="team-title">
									<a href="http://www.pkulaw.cn/fulltext_form.aspx?Db=chl&Gid=16d30cb264c54080bdfb&keyword=%e4%b8%ad%e5%8d%8e%e4%ba%ba%e6%b0%91%e5%85%b1%e5%92%8c%e5%9b%bd%e5%95%86%e6%a0%87%e6%b3%95&EncodingName=&Search_Mode=accurate&Search_IsTitle=0" target="_blank">3：中华人民共和国商标法(2001修正)</a>
								</div>
								<div class="team-subtitle">
									<p>引用64次</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInLeft" data-wow-delay=".8s">
					<div class="single-team-member">
						<div class="team-member-bg team-bg-4">
							<div class="team-content">
								<div class="team-title">
									<a href="http://www.pkulaw.cn/fulltext_form.aspx?Db=chl&Gid=bf1a8ad9bb819918bdfb&keyword=%e4%b8%ad%e5%8d%8e%e4%ba%ba%e6%b0%91%e5%85%b1%e5%92%8c%e5%9b%bd%e8%a1%8c%e6%94%bf%e8%af%89%e8%ae%bc%e6%b3%95&EncodingName=&Search_Mode=accurate&Search_IsTitle=0" target="_blank">4：中华人民共和国行政诉讼法(2014修正)</a>
								</div>
								<div class="team-subtitle">
									<p>引用41次</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInLeft" data-wow-delay=".2s">
					<div class="single-team-member pt-150">
						<div class="team-member-bg team-bg-5">
							<div class="team-content">
								<div class="team-title">
									<a href="http://www.pkulaw.cn/fulltext_form.aspx?Db=chl&Gid=76c54b08f88ee7efbdfb&keyword=%e4%b8%ad%e5%8d%8e%e4%ba%ba%e6%b0%91%e5%85%b1%e5%92%8c%e5%9b%bd%e8%a1%8c%e6%94%bf%e8%af%89%e8%ae%bc%e6%b3%95&EncodingName=&Search_Mode=accurate&Search_IsTitle=0" target="_blank">5：中华人民共和国行政诉讼法(2017修正)</a>
								</div>
								<div class="team-subtitle">
									<p>引用24次</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInLeft" data-wow-delay=".4s">
					<div class="single-team-member pt-150">
						<div class="team-member-bg team-bg-6">
							<div class="team-content">
								<div class="team-title">
									<a href="http://www.pkulaw.cn/fulltext_form.aspx?Db=chl&Gid=1f3ccf5f58fce56dbdfb&keyword=%e4%b8%ad%e5%8d%8e%e4%ba%ba%e6%b0%91%e5%85%b1%e5%92%8c%e5%9b%bd%e5%9b%bd%e5%ae%b6%e8%b5%94%e5%81%bf%e6%b3%95&EncodingName=&Search_Mode=accurate&Search_IsTitle=0" target="_blank">6：中华人民共和国国家赔偿法</a>
								</div>
								<div class="team-subtitle">
									<p>引用23次</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInLeft" data-wow-delay=".6s">
					<div class="single-team-member pt-150">
						<div class="team-member-bg team-bg-7">
							<div class="team-content">
								<div class="team-title">
									<a href="http://www.pkulaw.cn/fulltext_form.aspx?Db=chl&Gid=0f9b03417b83498abdfb&keyword=%e4%b8%ad%e5%8d%8e%e4%ba%ba%e6%b0%91%e5%85%b1%e5%92%8c%e5%9b%bd%e8%a1%8c%e6%94%bf%e5%a4%84%e7%bd%9a%e6%b3%95&EncodingName=&Search_Mode=accurate&Search_IsTitle=0" target="_blank">7：中华人民共和国行政处罚法</a>
								</div>
								<div class="team-subtitle">
									<p>引用20次</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-3 col-md-6 col-sm-6 col-12 wow fadeInLeft" data-wow-delay=".8s">
					<div class="single-team-member pt-150">
						<div class="team-member-bg team-bg-8">
							<div class="team-content">
								<div class="team-title">
									<a href="http://www.pkulaw.cn/fulltext_form.aspx?Db=chl&Gid=c03be4ebd2c15959bdfb&keyword=%e6%9c%80%e9%ab%98%e4%ba%ba%e6%b0%91%e6%b3%95%e9%99%a2%e5%85%b3%e4%ba%8e%e8%a1%8c%e6%94%bf%e8%af%89%e8%ae%bc%e8%af%81%e6%8d%ae%e8%8b%a5%e5%b9%b2%e9%97%ae%e9%a2%98%e7%9a%84&EncodingName=&Search_Mode=accurate&Search_IsTitle=0" target="_blank">8：最高人民法院关于行政诉讼证据若干问题的规定</a>
								</div>
								<div class="team-subtitle">
									<p>引用20次</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 排行榜 2 -->
	<div id="service-page" class="service-details-section section-padding pb-0">
		<div class="container">
			<div class="row">
				<div class="col-lg-4">
					<div class="service-list">
						<h5 style="font-weight: bold">二、法律条文引用排行</h5>
						<a id="one2" :class="{ 'active' : choseLaw === 1 }" @click="changeLawContent(1)">中华人民共和国行政诉讼法第五十四条（90）</a>
						<a id="two2" :class="{ 'active' : choseLaw === 2 }"  @click="changeLawContent(2)">中华人民共和国行政诉讼法第六十一条（74）</a>
						<a id="three2" :class="{ 'active' : choseLaw === 3 }"  @click="changeLawContent(3)">中华人民共和国行政诉讼法(2014修正) 第八十九条（11）</a>
						<a id="four2" :class="{ 'active' : choseLaw === 4 }"  @click="changeLawContent(4)">中华人民共和国商标法(2001修正) 第十条（10）</a>
					</div>
				</div>

				<div class="col-lg-8">
					<div class="single-service" id="list2" v-html="lowContents[choseLaw - 1]"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- 高频法条推荐 -->
	<div class="case-area pb-50">
		<div class="container">
			<div class="offset-lg-2 col-lg-8 text-center">
				<div class="section-title">
					<h2>高频法条<b>推荐</b></h2>
				</div>
			</div>

			<div class="row">
				<div class="col-lg-4 col-md-6 col-12 wow fadeInLeft" data-wow-delay=".2s">
					<div class="single-case-item mb-50 bg-cover case-bg-6">
						<div class="case-inner">
							<a href="高频法条.html" class="case-icon">
								<i class="las la-plus"></i>
							</a>
							<div class="hover-info">
								<h6>宪法</h6>
								<h4>国家的根本大法</h4>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-md-6 col-12 wow fadeInUp" data-wow-delay=".4s">
					<div class="single-case-item mb-50 bg-cover case-bg-2">
						<div class="case-inner">
							<a href="高频法条.html" class="case-icon">
								<i class="las la-plus"></i>
							</a>
							<div class="hover-info">
								<h6>民事</h6>
								<h4>民法通则、民事诉讼法等</h4>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-4 col-md-6 col-12 wow fadeInRight" data-wow-delay=".4s">
					<div class="single-case-item mb-50 bg-cover case-bg-5">
						<div class="case-inner">
							<a href="高频法条.html" class="case-icon">
								<i class="las la-plus"></i>
							</a>
							<div class="hover-info">
								<h6>刑事</h6>
								<h4>实体法与程序法</h4>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-4 col-md-6 col-12 wow fadeInLeft" data-wow-delay=".6s">
					<div class="single-case-item mb-50 bg-cover case-bg-3">
						<div class="case-inner">
							<a href="高频法条.html" class="case-icon">
								<i class="las la-plus"></i>
							</a>
							<div class="hover-info">
								<h6>行政</h6>
								<h4>劳动法、安全法等</h4>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-4 col-md-6 col-12 wow fadeInRight" data-wow-delay=".6s">
					<div class="single-case-item mb-50 bg-cover case-bg">
						<div class="case-inner">
							<a href="高频法条.html" class="case-icon">
								<i class="las la-plus"></i>
							</a>
							<div class="hover-info">
								<h6>经济</h6>
								<h4>合同法、税法等</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "bootstrap";
/* 引入字体图标 */
@import "@/static/css/flaticon.css";
/* 也就是原来的 style.css */
@import "@/static/css/capricorn-theme.css";
@import "@/static/css/responsive.css";
@import "@/static/css/line-awesome.css";

.col-lg-45 {
	flex: 0 0 33.33%;
	max-width: 20%;


}
a {
	text-decoration: none;
	cursor: pointer;
}


</style>