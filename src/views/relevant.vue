<template>
  <div class="content">
    <div class="box">
      <!-- 侧边栏 -->
      <div class="left">
        <ul>
          <li :class="{ active: this.itemName === '劳动保障监察条例' }" @click="changeContent('劳动保障监察条例')">《劳动保障监察条例》</li>
          <li :class="{ active: this.itemName === '女职工劳动保护特别规定' }" @click="changeContent('女职工劳动保护特别规定')">《女职工劳动保护特别规定》
          </li>
          <li :class="{ active: this.itemName === '社会保险费征缴暂行条例' }" @click="changeContent('社会保险费征缴暂行条例')">《社会保险费征缴暂行条例》</li>
          <li :class="{ active: this.itemName === '工伤保险条例' }" @click="changeContent('工伤保险条例')">《工伤保险条例》</li>
          <li :class="{ active: this.itemName === '中华人民共和国劳动法' }" @click="changeContent('中华人民共和国劳动法')">《中华人民共和国劳动法》</li>
          <li :class="{ active: this.itemName === '中华人民共和国劳动合同法' }" @click="changeContent('中华人民共和国劳动合同法')">《中华人民共和国劳动合同法》
          </li>
          <li :class="{ active: this.itemName === '中华人民共和国劳动争议调解仲裁法' }" @click="changeContent('中华人民共和国劳动争议调解仲裁法')">
            《中华人民共和国劳动争议调解仲裁法》</li>
          <li :class="{ active: this.itemName === '中华人民共和国职业病防治法' }" @click="changeContent('中华人民共和国职业病防治法')">
            《中华人民共和国职业病防治法》</li>
        </ul>
      </div>
      <!--下载文书-->
      <div class="right">
        <div class="my-component" ref="preview"></div>
        <div class="down"> <a :href="urlChange" target="_blank" :download="itemName + '.docx'"><img src="../assets/下载.svg"
              alt="">
            <div>下载文书</div>
          </a> </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const docx = require("docx-preview");
window.JSZip = require("jszip");

export default {
  name: "relevant",
  data() {
    return {
      itemName: '劳动保障监察条例',
      urlChange: '/static/劳动保障监察条例.docx'
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },

  mounted() {
    // 侦听事件并处理相应函数
    window.addEventListener("scroll", this.scrollToTop);
  },

  created() {
    axios({
      method: "get",
      url: "/static/劳动保障监察条例.docx",
      responseType: 'arraybuffer'
    }).then((res) => {
      docx.renderAsync(res.data, this.$refs.preview);
    })
  },
  methods: {
    changeContent(item) {
      document.documentElement.scrollTop = 0;
      if (item !== this.itemName) {
        this.itemName = item
        this.urlChange = '/static/' + item + '.docx'
        axios({
          method: "get",
          url: this.urlChange,
          responseType: 'arraybuffer'
        }).then((res) => {
          docx.renderAsync(res.data, this.$refs.preview);
        })
      }

    }
  }
}
</script>

<style lang="scss" scoped>
// .content{
//     margin-top: 50px;
// }
.box {
  display: flex;
  margin-top: 10px;
  position: relative;

  .left {
    position: fixed;
    background-color: rgb(255, 255, 255);
    color: #111;
    box-shadow: 3px 2px 2px rgb(232, 233, 238);
    width: 20%;
    // height: 1200px;
    height: 2000px;

    ul {
      width: 100%;
      overflow: hidden;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 70px;
        // line-height: 70px;
        font-size: 1.0rem;
        font-family: "Times New Roman", Times, serif;
        font-weight: 800;
        // color: black;
        color: #6e7079;

        img {
          margin-right: 10px;
        }
      }

      li:hover {
        cursor: pointer;
      }

      .active {
        background-color: rgb(243, 244, 250);
        color: black;
      }
    }
  }

  .right {
    width: 80%;
    display: flex;
    justify-content: center;
    margin-left: 18%;
    user-select: text;

    ::v-deep .docx-wrapper {
      width: 100%;
      // font-size: 2rem;
      background-color: white;
      padding: 10px;
    }

  }
}

.down {
  position: fixed;

  a {
    text-decoration: none;
  }

  margin-left: 980px;
  margin-top: 20px;

  div {
    margin-left: -15px;
    color: rgb(18, 150, 219);
  }
}</style>
<<<<<<< HEAD
=======
>>>>>>> 5ee3af9 ([登录功能实现及规定不登录不能使用 分析页面改进 类案检索页面改进])
>>>>>>> 9a62955 ([登录功能实现及规定不登录不能使用 分析页面改进 类案检索页面改进])
