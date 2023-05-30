<template xmlns="http://www.w3.org/1999/html">
	<div class="topBar">
		<div class="topContent">
			<!--左侧logo-->
			<div class="logoImg" @click="changTabName('home')">
				<div class="icon">
					<img src="../assets/lawIcon.svg" alt="" style="width:35px">
				</div>
				<div style="">Ai法律检索</div>
			</div>
			<!--中间导航区-->
			<div class="tab">
				<!--选中的导航块加上选中样式，并同时切换路由-->
				<div class="text" :class="{ 'tabs-active': appTab === 'home'}" @click="changTabName('home');" >首页</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'analysis'}" @click="changTabName('analysis');">文书分析</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'Case'}" @click="changTabName('Case')">案例库</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'relevant'}" @click="changTabName('relevant')">相关科普</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'display'}" @click="changTabName('display')">数据展示</div>
				<div class="text" :class="{ 'tabs-active': appTab === 'recommendation'}" @click="changTabName('recommendation')">法条推荐</div>
			</div>
			<!--登录/注册-->
			<div class="frsmobi">
				<div class="signBtn">
					<el-button type="primary" @click="dialogVisible = true; flag = true" plain v-if="isShow18">注册/登录</el-button>
					<span v-if="!isShow18">你好！{{ username }} <span class="exit" @click="exitS()">退出登录</span></span>
				</div>
				<div class="mobitab">
					<div class="meun-icon" @click="ifshowtab()">
						<svg t="1680077174134" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
							 p-id="1210" width="30" height="36">
							<path
								d="M66.488889 211.781818h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485 0-27.397172-22.768485-49.648485-50.980202-49.648485H66.488889C38.341818 112.484848 15.508687 134.723232 15.508687 162.133333s22.833131 49.648485 50.980202 49.648485z m891.009293 248.242424H66.488889C38.277172 460.024242 15.508687 482.262626 15.508687 509.672727s22.768485 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.410101-22.923636-49.648485-50.993131-49.648485z m0 351.63798H66.488889c-28.134141 0-50.980202 22.238384-50.980202 49.648485s22.833131 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.397172-22.781414-49.648485-50.993131-49.648485z m0 0"
								p-id="1211" fill="#e6e6e6"></path>
						</svg>
					</div>
				</div>
			</div>
		</div>
			<!--<div class="signBtn">-->
			<!--	<el-button type="primary" @click="dialogVisible = true; flag = true" plain v-if="isShow18">注册/登录</el-button>-->
			<!--	<span v-if="!isShow18">你好！{{username}} <span class="exit" @click="exitS()">退出登录</span></span>-->
			<!--</div>-->
		</div>
		<!--弹出登录/注册模态框-->
		<el-dialog
			:visible.sync="dialogVisible"
			width="0%"
			center
			:append-to-body = true
			:show-close="false"
		>
			<!--使用 <Userlogin> 组件-->
			<login @loginMsg="loginMsg1" @loginName="nameSend" :flag="flag" v-if="!username"></login>
		</el-dialog>
	</div>
</template>

<script>
import login from "../components/Userlogin.vue";
import axios from "axios";
export default {
	name: "appBar",
	data() {
		return {
			// 控制模态框是否展示
			dialogVisible: false,
			// 获取点击的导航标签并进行路由跳转
			appTab: "home",
			// 用于登录过后输出用户名
			username:"user",
			// 用于控制“登录”按钮和用户名的切换展示
			isShow18:true,
			sameInput:"(2019)渝0118民初17号",
			flag: false,
			isshowtab: true,
			screenWidth: 0
		};
	},
	watch: {
		// 对点击导航栏的路由进行获取并进行跳转（可以删去 mark）
		$route: {
			handler: function (route) {
				// console.log(route);
				this.appTab = route.fullPath.substring(1);
			},
			// 深度观察监听
			deep: true,
		},
	},

	screenWidth: {

		handler: function (val, oldVal) {

			if (val < 600) {

				this.isshowtab = false

			} else {

				this.isshowtab = true

			}

		},

		immediate: true

	},

},
mounted() {

	this.screenWidth = document.body.clientWidth

	window.onresize = () => {

		return (() => {

			this.screenWidth = document.body.clientWidth

		})()

	}

},


created(){
		// 获取信息（验证信息，失败则会传回“token校验失败”）
		axios({
			url: "http://123.249.87.210:8002/get_user_info",
			method:"get",
			headers: {
				//	可以是授权凭证用的参数值
				"token": localStorage.getItem("token"),
			},
		}).then((res) => {
				if(res.data !== "token校验失败"){
					// 说明登录过，应该是后端比对 token，返回用户信息
					this.isShow18 = false
					this.username = res.data.username
				}else{
					// 发送提示信息
					this.$message({
						message: "未登录或者登录过期，请重新登录",
						type: "warning",
						center: "true",
						duration: 2000,
						customClass: "press",
					});
				}
			}
		).catch(()=>{
			this.$message.warning("出错啦");
		});
	},
	components:{
		login
	},
	methods: {
		// 登录成功
		loginMsg1(val){
			this.dialogVisible = val   // false:关闭登录框
			this.isShow18 = false;
			this.flag = false;
			// console.log(val);
		},
		// 获取用户名
		nameSend(username){
			this.username = username
		},
		// 退出登录
		exitS(){
			this.isShow18 = true
			localStorage.removeItem("token");
			this.username = "";
			//  this.$router.go(0)
			// fixme
			this.$message({
				type: "success",
				message: "已退出登录",
			});

    },

    register(value) {
      //  this.$store.commit('updateDialog', value)
      this.dialogVisible = true
    },
    changTabName(name) {
      this.appTab = name;
      this.$router.replace("/" + name);
      // this.$store.commit('updateAppTab', name)
      // 跳转后关闭下拉导航栏
      if (this.screenWidth < 600) {
        this.ifshowtab();
      }

    },
    jumpPage(val) {
      this.$router.replace(val);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },

    ifshowtab() {
      this.isshowtab = !this.isshowtab
    }
  },
};
</script>

<style scoped lang="scss">
.topBar {
  height: 70px;
  background-color: rgb(39, 37, 35);
  position: fixed;

  top: 0;
  right: 0;
  left: 0;
  float: inherit;

  width: 100%;
  display: flex;
  align-content: center;
  z-index: 1;

	.topContent {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.logoImg {
			width: 10%;
			display: flex;
			white-space: nowrap;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 22px;
			padding-left: 20px;
			cursor: pointer;

      .icon {
        padding-right: 3px;
      }

      div:hover {
        color: yellow;
      }
    }

		.tab {
			width: 60%;
			display: flex;
			padding: 0 20px;
			white-space: nowrap;
			justify-content: center;
			color: #fff;
			font-size: 18px;

			.text {
				text-align: center;
				cursor: pointer;
				width: fit-content;
				margin: 0 20px;
			}

      .tabs-active {
        color: rgb(12, 170, 6);
      }

      .signBtn {
        width: 10%;
        white-space: nowrap;
        justify-content: center;

      }

      .tabs-active {
        color: #f1f165;
      }
    }

    .frsmobi {
      display: flex;
      justify-content: space-between;
    }

    .signBtn {
      width: 13%;
      white-space: nowrap;
      justify-content: center;

			span{
				color: rgb(26, 160, 52);
				font-size: 1rem;
			}

      .exit:hover {
        color: rgb(84, 112, 198);
        cursor: pointer;
      }

      // background-color: red;
    }

    .mobitab {
      opacity: 0;
    }


  }
}

@media screen and (max-width: 600px) {

  .topBar .topContent {


    .tab {

      display: block;
      position: fixed;
      top: 70px;
      background-color: rgba(0, 0, 0, 0.6);
      width: 600px;

      div {
        padding: 20px;

      }


    }

    .mobitab {
      opacity: 1;
      margin: 0 30px 0 20px;

    }


  }

}
</style>
