<template>
  <div>
    <div class="top">
      <button class="climb">爬取文件</button>
      <span>选择日期</span>
      <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
        start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div class="center">
      <button class="climb">上传</button>
      <input type="file">
      <button class="climb climb2">提交</button>
      <span class="btn" v-for="(item, index) in btnTask" :key="index" @click="showMore(index)">
        <el-button type="primary">{{ item }}</el-button>
      </span>
    </div>
    <div class="contentBox">
      <div class="fileContent">
        <pre>{{ txtInfo }}</pre>
      </div>
    </div>

    <div class="bottom" v-show="isShow">
      <div class="answer">
        <div class="left">
          <div class="title">基本信息</div>
          <ul>
            <li>
              <span class="leftInfo">法院名:</span><span class="rightInfo">重庆市合川区人民法院</span>
            </li>
            <li>
              <span class="leftInfo">法院等级:</span><span class="rightInfo">基层人民政府</span>
            </li>
            <li>
              <span class="leftInfo">法院地区:</span><span class="rightInfo">合川区</span>
            </li>
            <li>
              <span class="leftInfo">案件类型:</span><span class="rightInfo">民事判决书</span>
            </li>
            <li>
              <span class="leftInfo">案件号:</span><span class="rightInfo">(2021)渝0117民初8466号</span>
            </li>
            <li>
              <span class="leftInfo">原告:</span><span class="rightInfo">张青军</span>
            </li>
            <li>
              <span class="leftInfo">被告:</span><span class="rightInfo">重庆建发置业有限公司</span>
            </li>
            <li>
              <span class="leftInfo">法条:</span><span class="rightInfo">自愿达成协议</span>
            </li>
          </ul>
        </div>
        <div class="area">
          <div class="title">知识图谱</div>
          <Picture :pictureData="pictureData" class="picture"></Picture>
        </div>
        <!-- <div class="right">信息抽取结果</div> -->
      </div>
      <div class="title">信息抽取</div>

    </div>
  </div>
</template>

<script>
import Picture from "../components/pictureImg.vue";
export default {
  name: "caseContent",
  components: {
    Picture
  },
  created() {
    //   console.log(this.$route.query.index);
    this.txtInfo = this.$route.query.index
  },
  data() {
    return {
      isShow: false,
      txtInfo: '',
      btnTask: ["摘要生成", " 信息抽取", "自动分词", "类案检索"],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: '',

      value2: ''
    };

  },
  methods: {
    showMore(it) {
      if (it == 1) {
        this.isShow = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  margin-top: 100px;
  margin-left: 30px;

  .title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 20px;
  }

  ul {

    li {
      font-size: 18px;
      margin-bottom: 20px;
      width: 300px;
      display: flex;
      justify-content: space-between;
    }

  }

}

.climb2 {
  margin-right: 200px;
}

.btn {
  margin: 0px 15px;

  .el-button {
    background: rgb(0, 41, 65) !important;
    border-color: rgb(0, 41, 65) !important;
  }

  .el-button:focus {
    background: rgb(87, 87, 250) !important;
    border-color: rgb(87, 87, 250) !important;
  }
}

.climb {
  border: none;
  width: 80px;
  height: 40px;
  background-color: rgb(222, 182, 136);
  line-height: 40px;
  margin-left: 30px;
  font-size: 12px;
  color: white;
}

.top {
  margin-top: 50px;

  span {
    margin-left: 40px;
    margin-right: 30px;
  }
}

.center {
  margin-top: 80px;

  input {
    margin-left: 40px;
  }
}

.contentBox {

  width: 90%;
  margin-top: 50px;
  margin-left: 30px;
  justify-content: center;
  height: 400px;

  //   height: 500px;
  .fileContent {
    //   pre{
    word-break: break-all;

    width: 95%;
    background: rgb(249, 247, 249);
    height: 100%;
    overflow: scroll;
    font-size: 16px;
    text-emphasis: 2em;
    line-height: 18px;
    height: 100%;
    padding: 30px 100px 50px 20px;
    //设置可以复制
    user-select: text;

  }
}
</style>