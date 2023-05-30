<template>
  <!-- 首页导航栏 -->
  <el-container>
    <el-main>
      <div class="background">
        <div class="text">
          <div class="centor">
            <div class="text1">我们是司法文本的</div>
            <div class="text2">分析者</div>
          </div>

        </div>
      </div>
      <div class="content">
        <div class="title">
          <span class="textLeft">我们可以做</span>
          <span class="textRight">什么</span>
        </div>
        <div class="exhibition">
          <div v-for="item in arrcard" :key="item.id" class="box">
            <div class="icon">
              <img :src="item.img" alt="">
            </div>
            <div class="text">{{ item.name }}</div>
            <div class="describe">
              {{ item.describe }}
            </div>
            <div class="btn">
              <el-button type="primary" @click="changTabName(item.path)">立即使用</el-button>
            </div>
          </div>
        </div>
        <!-- <div class="box">
           <div class="box1"></div>
        </div> -->
      </div>
      <div style="margin-bottom:50px" class="content-bottom">
        <card />
      </div>
      <!-- <div class="demonstration"></div> -->
    </el-main>
    <el-footer>
      <bottomBar />
    </el-footer>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import bottomBar from "../components/BottomBar.vue";
import card from "../components/cardBody.vue"
export default {
  name: 'Home',
  data() {
    return {
      arrcard: [
        {
          id: 0,
          name: '文书分析',
          img: require('../assets/analysis.svg'),
          path: 'analysis'
        },
        {
          id: 1,
          name: '案例展示',
          img: require('../assets/exhibition.svg'),
          path: 'Case'
        },
        {
          id: 2,
          name: '类案检索',
          img: require('../assets/retrieval.svg'),
          path: 'Case'
        },
        {
          id: 3,
          name: '相关科普',
          img: require('../assets/data.svg'),
          path: 'relevant'
        },

      ]
    }
  },
  computed: {
    ...mapState([
      'appTab',
    ])
  },
  components: {
    bottomBar,
    card
  },
  methods: {
    changTabName(name) {

      this.$router.replace("/" + name);
      // this.$store.commit('updateAppTab', name)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-main {
  padding: 0px;

  .background {
    height: 100vh;
    // background-image: url('../assets/backgroundimg.jpg') ;
    background: linear-gradient(rgba(117, 122, 128, 0.3), rgba(209, 230, 250, 0.6)), url('../assets/backgroundimg.jpg');
    /* 背景图垂直、水平均居中 */
    background-position: center center;
    /* 背景图不平铺 */
    background-repeat: no-repeat;
    /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
    background-attachment: fixed;
    /* 让背景图基于容器大小伸缩 */
    background-size: cover;
    /* 设置背景颜色，背景图加载过程中会显示背景色 */
    background-color: #FFFFFF;

    // background-position: center center;
    // overflow: auto;
    .text {
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, .6);
      position: relative;

      .centor {
        height: 300px;
        position: absolute;
        margin: auto;
        justify-content: center;
        align-content: center;
        font-size: 55px;
        font-style: italic;
        letter-spacing: 7px;
        padding-left: 100px;
        color: rgb(246, 248, 250);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;



        .text2 {
          font-style: normal;
          color: rgb(241, 241, 101);
          font-weight: 120;
          font-size: 60px;
        }
      }

    }
  }

  .content {
    // height: 520px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      // display: flex;
      letter-spacing: 2px;
      text-align: center;

      .textLeft {
        font-size: 45px;
        display: inline-block;
        height: 100%;

      }

      .textRight {
        font-size: 50px;
        display: inline-block;
        height: 100%;
        font-style: italic;
        color: rgb(196, 196, 26);
        font-weight: 100;
      }
    }

    .exhibition {
      display: flex;
      margin-top: 20px;
      width: 90vw;
      justify-content: space-between;


      .box {
        width: 25vw;
        text-align: center;
        box-shadow: 5px;
        height: 334px;
        margin: 20px;
        box-shadow: 0px 5px 12px 2px #a3a2a2;
        border-radius: 4px;
        font-size: 28px;
        padding: 24px;
        padding-top: 50px;

        .text {
          margin-top: 30px;
          font-size: 30px;
        }

        .icon {
          margin-top: 5px;
          margin-bottom: 10px;

          >img {
            width: 80px;
          }
        }

        .describe {
          text-align: left;
          padding-top: 10px;
          font-size: 14px;
          text-indent: 1em;
          // color: #999999;
        }

        .btn {
          // width: 80%;
          padding-top: 58px;

          .el-button {
            width: 100%;
          }
        }
      }
    }
  }
}

/deep/.el-header {
  padding: 0px 0px 0px 0px;
}

// 盒子动画效果
.box {
  overflow: hidden;
  position: relative;
  border: 1px solid rgb(196, 194, 194);
  background-color: rgb(248, 244, 244);
  transition: all .2s;
}

.box:hover {
  transform: translateY(-20px);
  box-shadow: 0 26px 40px -24px rgb(119, 107, 107);
  background: linear-gradient(180deg, #f97949 0%, #e42626 100%);
  color: #ffffff;

  .text {
    font-size: 35px;
  }

  .describe {
    color: #ffffff;
  }

  .el-button--primary {
    /* color: #FFF; */
    /* background-color: #409EFF; */
    /* border-color: #409EFF; */
    background-color: #ffffff;
    border-color: #ffffff;
    color: #E42626;
  }
}

.el-footer {
  padding: 0px;
  background-color: transparent;
}






@media screen and (max-width:600px) {


  .exhibition {


    flex-wrap: wrap;

    .box {
      width: 40vw;
    }


  }


}
</style>
