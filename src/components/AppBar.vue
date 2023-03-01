<template>
    <div class="topBar">
     <div class="topContent">
      <div class="logoImg">
        <div class="icon">
          <img src="../assets/lawIcon.svg" alt="" style="width:35px">
        </div>
        <div style="">Ai法律检索</div>
      </div>
      <div class="tab">
        <div class="text" :class="{ 'tabs-active': appTab === 'home'}" @click="changTabName('home');" >首页</div>
        <div class="text" :class="{ 'tabs-active': appTab === 'analysis'}" @click="changTabName('analysis');">文书分析</div>

        <div class="text" :class="{ 'tabs-active': appTab === 'Case'}" @click="changTabName('Case')">案例库</div>
        <div class="text" :class="{ 'tabs-active': appTab === 'relevant'}" @click="changTabName('relevant')">相关科普</div>
        <!-- <div class="text" :class="{ 'tabs-active': appTab === 'personCenter'}" @click="changTabName('personCenter')">个人中心</div> -->
      </div>
      <div class="signBtn">
        <el-button type="primary" @click="dialogVisible = true" plain v-if="isShow18">注册/登录</el-button>
        <span v-if="!isShow18">你好！{{username}} <span class="exit" @click="exitS()">退出登录</span></span>
      </div>
     </div>
     <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="0%"
      center
      :append-to-body = true
       :show-close="false"
       
      >
      <login @loginMsg="loginMsg1" @loginName="nameSend"></login>
    </el-dialog>


   
    </div>
</template>

<script>
import { mapState } from "vuex";
import login from "../components/Userlogin.vue";
import axios from "axios";
export default {
  name: "appBar",

  data() {
    return {
      dialogVisible: false,
      appTab: "home",
      username:"user",
      isShow18:true,
      sameInput:"(2019)渝0118民初17号"
    };
  },
 
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.appTab = val.fullPath.substring(1);
      },
      // 深度观察监听
      deep: true,
    },

  },
  created(){
        // 获取信息
        axios({ 
          url: "http://123.249.87.210:8002/get_user_info",
          method:"get",
            headers: {
                    "token": localStorage.getItem("token"),
                    //	可以是授权凭证用的参数值
                },
        }).then((res) => {
          if(res.data!="token校验失败"){
                    this.isShow18 = false
            this.username = res.data.username
          }else{
                    this.$message({
              message: "未登录或者登录过期",
              type: "warning",
              center: "true",
              duration: 2000,
              customClass: "press",
            });
          }
            }
        ).catch((res)=>{
             this.$message.warning("出错啦");
          });
  },
  components:{
login
  },

  methods: {

    // 登陆成功
    loginMsg1(val){
      this.dialogVisible = val
      this.isShow18 = false
// console.log(val);
    },
    // 获取用户名
nameSend(val){
this.username = val
// this.$emit("useChange",this.username)  
},
// 退出登录
exitS(){
this.isShow18 = true
  localStorage.removeItem("token");
  //  this.$router.go(0)
  this.$message({
          type: "success",
          message: "已退出登录",
        });
       
},

      register(value){
      //  this.$store.commit('updateDialog', value)
      this.dialogVisible = true
    },
    changTabName(name) {
      this.appTab = name;
      this.$router.replace("/" + name);
      // this.$store.commit('updateAppTab', name)
    },
    jumpPage(val) {
      this.$router.replace(val);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};

</script>


<style scoped lang="scss">
.topBar {
  height: 70px;
  background-color: rgb(39, 37, 35);
  position: fixed;

  top:0px;
  float:inherit;

  top: 0px;
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

      .icon{
        padding-right: 3px;
      }
    }
    .tab{

      .icon {
        padding-right: 3px;
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
      // background-color: blueviolet;

      
      .text {

        text-align: center;
        cursor: pointer;
        width: fit-content;
        margin: 0 20px;


      }
      .tabs-active{
        color: rgb(12, 170, 6);
      }
    
    .signBtn{
      width: 10%;
      white-space: nowrap;
      justify-content: center;

      }
      .tabs-active {
        color: #f1f165;
      }
    }
    .signBtn {
      width: 13%;
      white-space: nowrap;
      justify-content: center;
      span{
        color: rgb(26, 160, 52);
        font-size: 1rem;
        // margin-right: 50px;
      }
      .exit:hover{
color: rgb(84, 112, 198);
cursor: pointer;
      }

      // background-color: red;
    }
  }
}
</style>
