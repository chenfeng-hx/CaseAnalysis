<template>
  <div class="box">
    <!-- 侧边栏 -->
    <div class="left">
      <h2>功能模块区</h2>
      <div class="slectfile">
        <span>分析的文书类型</span>
        <el-select
          v-model="value"
          style="width: 20%"
          placeholder="请选择"
          @change="valChange(value)"
        >
          <el-option
            style="width: 100%"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style="height: 480px; margin: 30px 36px">
        <el-steps direction="vertical" :active="active" finish-status="success" class="stepInfo">
          <el-step v-if="this.value == 0">
            <template slot="description">
              <!-- <div>起诉状上传成功</div> -->
              <label
                for="file_load"
                :class="{ label_active: this.preview_01 == true }"
                v-html="
                  this.preview_01 == true
                    ? this.text_step.preview_01.new
                    : this.text_step.preview_01.old
                "
              ></label>
              <!-- <label for="file_load" :class="{label_active:this.preview_01 == true}">{{preview_01?text_step.old}}</label> -->
              <input
                id="file_load"
                @change="preview"
                type="file"
                ref="file"
                accept=".docx"
                style="display: none"
              />
            </template>
          </el-step>

          <el-step v-if="this.value == 1">
            <template slot="description">
              <!-- <div>判决书上传成功</div> -->
              <label
                for="file_load2"
                :class="{ label_active: this.preview_02 == true }"
                v-html="
                  this.preview_02 == true
                    ? this.text_step.preview_02.new
                    : this.text_step.preview_02.old
                "
              ></label>
              <input
                id="file_load2"
                @change="preview2"
                type="file"
                ref="file2"
                accept=".docx"
                style="display: none"
              />
            </template>
          </el-step>
          <el-step description="">
            <template slot="description">
              <!-- <div>服务器已接收</div> -->
              <label
                @click="upPload()"
                :class="{
                  label_active: this.preview_up == true,
                  active1: isLock == true,
                }"
                v-html="
                  this.preview_up == true
                    ? this.text_step.preview_up.new
                    : this.text_step.preview_up.old
                "
              ></label>
            </template>
          </el-step>
          <el-step description="">
            <template slot="description">
              <div
                style="font-size: 1.1rem"
                :class="{ label_active: this.preview_04 == true }"
                v-html="
                  this.preview_up == true
                    ? this.text_step.preview_04.new
                    : this.text_step.preview_04.old
                "
              ></div>
            </template>
          </el-step>
          <el-step description="">
            <template slot="description">
              <div
                style="font-size: 1.1rem"
                :class="{ label_active: this.preview_05 == true }"
              >
                模型分析中
              </div>
            </template>
          </el-step>
          <el-step description="">
            <template slot="description">
              <div
                style="font-size: 1.1rem"
                :class="{ label_active: this.preview_06 == true }"
              >
                分析完成
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>

    <div class="right">
      <div>
        <div class="topTitle">
          <div class="firstBtn" v-if="this.value == 0">
            <el-button
              type="primary"
              round
              :class="{ active: this.currentIndex == 0 }"
              @click="changeIndex(0)"
              >起诉状</el-button
            >
            <span :fileName="fileName" class="fileName" v-show="isShow3"
              >只能上传.docx文件</span
            >
            <span :fileName="fileName" class="fileName">{{ fileName }}</span>
          </div>
          <div class="secondBtn" v-if="this.value == 1">
            <el-button
              type="primary"
              round
              :class="{ active: this.currentIndex == 1 }"
              @click="changeIndex(1)"
              >判决书</el-button
            >
            <span :fileName="fileName2" class="fileName2">{{ fileName2 }}</span>
          </div>

          <div>
            <el-button
              type="primary"
              round
              :class="{ active: this.currentIndex == 2 }"
              @click="changeIndex(2)"
              >争议要素</el-button
            >
          </div>
          <div v-if="this.value == 0">
            <el-button
              type="primary"
              round
              :class="{ active: this.currentIndex == 3 }"
              @click="changeIndex(3)"
              >同案智推</el-button
            >
          </div>
        </div>
      </div>
      <!-- 起诉状 -->
      <div class="first" v-show="this.currentIndex == 0">
        <div class="bottom">
          <div class="fileContent">
            <div class="my-component" ref="preview" v-show="!isShow3"></div>
          </div>
        </div>
      </div>

      <!-- 判决书 -->
      <div class="second" v-show="this.currentIndex == 1">
        <div class="bottom">
          <div class="fileContent">
            <div class="my-component" ref="preview2" v-show="!isShow4"></div>
          </div>
        </div>
      </div>

      <!-- 要素提取 -->
      <!-- 起诉状 -->
      <info-box
        v-if="this.currentIndex == 2 && this.value == 0"
        :pictureData="pictureData2"
        :textInfo="textInfo2"
      ></info-box>
      <!-- 判决书 -->
      <info-box
        v-if="this.currentIndex == 2 && this.value == 1"
        :pictureData="pictureData"
        :textInfo="textInfo"
      ></info-box>
      <div
        class="forth"
        v-show="this.currentIndex == 3"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0)"
        element-loading-text="拼命加载中"
      >
        <img
          src="../assets/页面为空 (1).svg"
          alt=""
          v-if="!sameCase.length != 0"
        />
        <div class="title title2" v-show="isShow9">请先上传起诉状!</div>
        <div v-if="sameCase.length != 0">
          <div class="tipTop">
            根据上传的起诉状:<span>{{ fileName }}</span> 检索相似案例!
          </div>
          <sameCase-content
            :sameCase="sameCase"
            :sameCaseLength="sameCaseLength"
          ></sameCase-content>
        </div>
        <div class="title title2" v-show="isShow6">
          没有找到相似案件<img src="../assets/哭泣.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

   
<script>
import Picture from "../components/pictureImg.vue";
import sameCaseContent from "../components/sameCaseContent.vue";
import infoBox from "../components/infoBox.vue";
// import  ElStep  from 'element-ui/types/step';
const docx = require("docx-preview");
window.JSZip = require("jszip");
export default {
  name: "analysis",
  components: {
    Picture,
    sameCaseContent,
    infoBox,
  },

  data() {
    return {
      // 文书类型选择
      options: [
        {
          value: 0,
          label: "起诉状",
        },
        {
          value: 1,
          label: "判决书",
        },
      ],
      value: 0,
      // 同案检索
      isShow9: true,
      //没有找到
      isShow6: false,
      //进行同案检索
      loading: false,
      isLock: false,
      isLock2: false,
      // 同案检索
      sameCase: [],
      sameCaseLength: 0,
      currentIndex: 0,
      //文书内容和文件名是否展示
      isShow3: true,
      isShow4: true,
      textInfo: {},
      textInfo2: {},
      fileName: "",
      fileName2: "",
      previewDialogVisible: false,
      FileList: {}, //诉求书
      FileList2: {}, //判决书
      // 判决书的知识图谱
      pictureData: {},
      //  起诉状的知识图谱
      pictureData2: {},
      // 没登陆时步骤条别动
      stop: true,
      // 步骤条
      active: 0,
      // 步骤条状态参数
      preview_01: false,
      preview_02: false,
      preview_up: false,
      preview_04: false,
      preview_05: false,
      preview_06: false,
      text_step: {
        preview_01: {
          old: "<span>选择起诉状</span>",
          new: "<span>起诉状上传成功</span>",
        },
        preview_02: {
          old: "<span>选择判决书</span>",
          new: "<span>判决书上传成功</span>",
        },
        preview_up: {
          old: "<span>AI智能分析</span>",
          new: "<span>已提交AI分析</span>",
        },
        preview_04: {
          old: "<span>分析模型加载中</span>",
          new: "<span>分析模型加载完成</span>",
        },
        preview_05: {
          old: "<span>模型分析中</span>",
          new: "<span>模型分析中</span>",
        },
        preview_06: {
          old: "<span>分析完成</span>",
          new: "<span>分析完成</span>",
        },
      },
      timer: null,
      caseNum: "",
      sameCase2: [],
    };
  },

  methods: {
    // 通过知识图谱列表是否为空来判断后的操作
    blankChange(obj, value) {
      this.timer = null;
      const arr = Object.keys(obj);
      if (arr.length == 0) {
        if (value == 0) {
          this.preview_01 = false;
        } else {
          this.preview_02 = false;
        }
        [this.preview_up, this.preview_04, this.preview_05, this.preview_06] = [
          false,
          false,
          false,
          false,
        ];
        this.active = 0;
      } else {
        if (value == 0) {
          this.preview_01 = true;
        } else {
          this.preview_02 = true;
        }

        [this.preview_up, this.preview_04, this.preview_05, this.preview_06] = [
          true,
          true,
          true,
          true,
        ];

        this.active = 5;
      }
    },
    //  判断起诉状或者判决书是否已经分析
    // 通过知识图谱列表是否为空来判断
    valChange(i) {
      this.currentIndex = i;
      if (this.value == 0) {
        this.blankChange(this.pictureData2, 0);
      } else {
        this.blankChange(this.pictureData, 1);
      }
    },
    changeIndex(i) {
      this.currentIndex = i;
      document.documentElement.scrollTop = 0;
    },

    // 同案检索
    sameCaseSearch() {
      this.loading = true;
      this.isShow9 = false;
      this.sameCase = [];
      let formdata3 = new FormData();
      formdata3.append("submit_file", this.FileList[0]);
      this.$api.analysisDocx
        .getSamecaseForm(formdata3)
        .then((res) => {
          const data = res.data.res_list;
          this.sameCaseLength = data.length;
          if (data.length == 0) {
            this.isShow6 = true;
          } else {
            // if(data[0][0] == )
            this.sameCase2 = res.data.res_list;
            this.isShow9 = false;
            this.isShow6 = false
          }
        
        })
        .catch((res) => {
          this.isShow9 = false;
          this.isShow6 = true;
          this.loading = false;
          this.sameCase = [];
        });
    },

    //将起诉书文件内容展示到页面中且上传
    preview(e) {
      this.textInfo2 = {};
      this.pictureData2 = {};
      this.sameCase = [];
      this.isShow9 = true;
      // 保存文件 将内容展示到页面
      this.FileList = this.$refs.file.files;
      if (this.FileList.length == 0) {
        this.preview_01 = false;
        this.active = 0;
        this.fileName = "";
        this.isShow3 = true;
      } else {
        const last = this.$refs.file.files[0].name;
        this.fileName = last;
        this.isShow3 = false;
        docx.renderAsync(this.$refs.file.files[0], this.$refs.preview); // 渲染到页面预览
        //上传起诉状成功 步骤条变色
        this.preview_01 = true;
        this.active = 1;
      }
    },

    //将判决书文件内容展示到页面中且上传
    preview2(e) {
      this.textInfo = {};
      this.pictureData = {};
      //  保存文件 将内容展示到页面
      this.FileList2 = this.$refs.file2.files;
      // 如果没上传判决书
      if (this.FileList2.length == 0) {
        this.fileName2 = "";
        this.isShow4 = true;
        this.active = 0;
        //步骤条不变色
        this.preview_02 = false;
      } else {
        const last2 = this.$refs.file2.files[0].name;
        // console.log(this.$refs.file2.files);
        this.fileName2 = last2;
        this.isShow4 = false;
        docx.renderAsync(this.$refs.file2.files[0], this.$refs.preview2); // 渲染到页面预览
        this.preview_02 = true;
        // if (this.active++ > 5) this.active = 0;
        this.active = 1;
      }
    },

    stepChange() {
      this.stop = true;
      // 步骤条
      setTimeout(() => {
        if (this.stop) {
          this.timer = setInterval(() => {
            this.active++;
            if (this.active == 3) this.preview_04 = true;
            if (this.active == 4) {
              this.preview_05 = true;
              clearInterval(this.timer);
            }
          }, 1000);
          clearInterval(this.timer);
        }
      }, 500);
    },
    //上传文件
    upPload() {
      this.isLock = true;
      // 先判断当前分析的文件类型
      // 上传的是起诉状
      if (this.value == 0) {
        this.sameCase = [];
        var arr = Object.keys(this.FileList);
        if (arr.length == 0) {
          this.$message({
            type: "warning",
            message: "您还没选择诉求文件",
          });
        } else {
          let formdata2 = new FormData();
          formdata2.append("submit_file", this.FileList[0]);
          // 后端交互部分
          //上传诉求文件
          this.preview_01 = true;
          this.preview_up = true;
          this.active = 2;
          this.$message.success("正在分析中");
          this.stepChange();
          this.sameCaseSearch();
          this.$api.analysisDocx
            .getClaimGeneration(formdata2)
            .then((res) => {
              if (res.data != "token校验失败") {
                if (res.data.claim_kg.node_list.length != 0) {
                  this.pictureData2 = res.data.claim_kg;
                  this.textInfo2 = res.data.claim_info;
                  const data = this.sameCase2;
                  const len = this.textInfo2.title.length;
                  const len2 = parseInt(0.7 * len);
                  for (let i = 0; i < data.length; i++) {
                    const vote = {};
                    vote.title = data[i][1];
                    vote.case_number = data[i][0];
                    vote.sameNum = parseFloat(data[i][3] * 100).toFixed(3) + "%";
                    this.sameCase.push(vote);
                    if (
                      data[i][1].substr(0, len2) == this.textInfo2.title.substr(0, len2)
                    ) {
                      vote.sameNum = "100.00%";
                      this.sameCase.pop()
                      this.sameCase.unshift(vote)
                    }
                      
                  }
                  if (this.sameCase.length!=0) {
                    this.$message.success("分析成功");
                    this.active = 5;
                    this.preview_06 = true;
                  } else {
                    this.$message({
                      message: "知识图谱分析成功，同案检索分析失败",
                      type: "warning",
                      center: "true",
                      duration: 2000,
                      customClass: "press",
                    });
                  }
                } else {
                  if (this.sameCase.length != 0) {
                    this.$message({
                      message: "知识图谱分析失败,同案检索分析成功",
                      type: "warning",
                      center: "true",
                      duration: 2000,
                    });
                  } else {
                    this.$message({
                      message: "分析失败，请重新上传文件",
                      type: "warning",
                      duration: 2000,
                    });
                  }
                }
              } else {
                this.$message.warning("未登录或者登录过期");
                this.preview_up = false;
                this.stop = false;
                this.active = 1;
              }
              this.loading = false;
            })
            .catch((res) => {
              this.loading = false;
              if (this.sameCase.length != 0) {
                this.$message({
                  message: "同案检索分析成功,知识图谱分析失败",
                  type: "warning",
                  duration: 2000,
                });
              } else {
                this.$message({
                  message: "分析失败，请重新上传文件",
                  type: "warning",
                  duration: 2000,
                });
              }
            });
        }
      }
      // 判决书
      else {
        let arr2 = Object.keys(this.FileList2);
        if (arr2.length == 0) {
          this.$message({
            type: "warning",
            message: "您还没选择判决文件",
          });
        } else {
          this.preview_02 = true;
          this.preview_up = true;
          this.active = 2;
          let formdata = new FormData();
          formdata.append("submit_file", this.FileList2[0]);
          formdata.append("flag", 0);
          // 后端交互部分
          //上传判决文件
          this.stepChange();
          this.$api.analysisDocx
            .upJugment(formdata)
            .then((res) => {
              if (res.data != "token校验失败") {
                this.$message.success("正在分析");
                // 获取case_number
                const caseId = res.data.replace('"', "");
                //获取案件基本信息
                this.$api.analysisDocx
                  .getCaseInfo(caseId)
                  .then((res) => {
                    this.textInfo = res.data;
                  })
                  .catch((res) => {
                    this.$message({
                      message: "基本信息分析失败，请重新上传文件",
                      type: "warning",
                      duration: 2000,
                    });
                  });
                this.$api.analysisDocx
                  .getJugementGeneration(caseId)
                  .then((res) => {
                    if (res.data.judgement_kg.node_list != []) {
                      this.pictureData = res.data.judgement_kg;
                      this.$message.success("分析完成");
                      this.active = 5;
                    } else {
                      this.$message({
                        message: "知识图谱分析失败，请重新上传文件",
                        type: "warning",
                        duration: 2000,
                      });
                    }
                  })
                  .catch((res) => {
                    this.$message({
                      message: "知识图谱分析失败，请重新上传文件",
                      type: "warning",
                      duration: 2000,
                    });
                  });
              } else {
                this.$message.warning("未登录或者登录过期");
                this.stop = false;
                this.preview_up = false;
                this.active = 1;
              }
            })
            .catch((res) => {
              this.$message({
                message: "文件上传失败",
                type: "warning",
                duration: 2000,
              });
              this.stop = false;
              this.preview_up = false;
              this.active = 1;
            });
        }
      }

      setTimeout(() => {
        this.isLock = false;
      }, 3000);
    },
  },
};
</script>

<style scoped lang="scss">
.third {
  margin-top: 80px;
  margin-left: 10px;
}

.special {
  display: flex;
}
//侧边栏样式
.box {
  display: flex;
  margin-top: 10px;
  position: relative;
  .left {
    // position: fixed;
    background-color: rgb(255, 255, 255);
    color: #111;
    box-shadow: 3px 2px 2px rgb(232, 233, 238);
    width: 17%;
    height: 1200px;
    h2 {
      text-align: center;
      margin-top: 20px;
    }
    .slectfile {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 16px;
        font-weight: 600;
        margin-right: 30px;
      }
      /deep/ .el-input__inner {
        width: 100px;
        //  margin-left: -20px;
      }
      /deep/ .el-input {
        width: 100px;
        margin-left: -20px;
      }
    }

    ul {
      width: 100%;
      overflow: hidden;
      li {
        display: flex;
        padding-left: 20%;
        // padding-right: 30px;
        // justify-content: center;
        align-items: center;
        width: 100%;
        height: 70px;
        font-size: 1.25rem;
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
        // color: #ccc;
        color: black;
      }
    }
  }
  .right {
    // margin-left: 17%;
    width: 84%;
    .topTitle {
      margin-left: -12%;
      display: flex;
      justify-content: center;
      text-align: center;
      /deep/.el-button {
        border-radius: 25px;
        border: none;
        background-color: rgb(84, 112, 198);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 115px;
        margin: 20px 50px;
        height: 50px;
        font-size: 1.1rem;
      }

      .active {
        background: rgb(94, 85, 85);
        // border: 1px solid rgb(94, 85, 85);
      }
      .firstBtn,
      .secondBtn {
        position: relative;
        span {
          position: absolute;
          top: 75px;
        }
      }
      .fileName {
        left: 30px;
        width: 150px;
      }
      .fileName2 {
        top: 85px;
        left: 30px;
        width: 150px;
      }
    }
  }
}
.first,
.second,
.third {
  user-select: text;
  position: relative;
}
.txtTitle {
  margin: 20px auto;
  display: flex;
  justify-content: center;
}

.upDown {
  height: 35px;
  line-height: 5px;
}

/deep/ .el-select,
/deep/ .el-input,
/deep/ .el-input__inner {
  height: 35px;
  width: 200px;
  line-height: 35px;
  margin-right: 20px;
  // color:#fff;
  // border:0px;
  // border-radius:0px;
  text-align: center;
}

.top2 {
  display: flex;
  width: 500px;
  align-items: center;
  height: 40px;
}

label {
  display: block;

  color: rgb(10, 10, 10);
  width: 132px;
  height: 40px;
  line-height: 40px;
  font-size: 1.1rem;
  text-align: center;
  border-radius: 5px;
}
label:hover {
  background: rgb(94, 85, 85);
  color: #fff;
  cursor: pointer;
}

.label_active {
  color: #104ab6;
}
.txtDesc {
  font-size: 16px;
  text-indent: 2rem;
  line-height: 20px;
  text-align: left;
  padding: 30px 50px 0 50px;
}
.my-component {
  height: 100%;
  margin: 20px auto;
  // overflow: scroll;
  caret-color: auto;
  margin-bottom: 80px;
  height: 800px;
  //   border: 1px solid #000;
}
.top {
  // display: flex;
  padding-top: 10px;
  margin-left: 30px;
  .file {
    display: flex;
    align-items: center; /*垂直居中*/
    justify-content: center; /*水平居中*/
    line-height: 35px;
    border-radius: 10px;
    margin: 0px 5px;

    .text {
      font-size: 16px;
      padding: 0 15px;
    }
  }
}
.middle {
  display: flex;
  padding-top: 50px;
  width: 100%;
  justify-content: center;

  .btn {
    margin: 0px 15px;
    .el-button {
      background: rgb(39, 37, 35) !important;
      border-color: rgb(39, 37, 35) !important;
    }
    .el-button:focus {
      background: rgb(87, 87, 250) !important;
      border-color: rgb(87, 87, 250) !important;
    }
  }
}
.bottom {
  width: 90%;
  margin: 55px auto;
  justify-content: center;
  .fileContent {
    width: 95%;
    height: 700px;
    margin: 0px auto;
    background: rgb(252, 250, 250);
    font-size: 50px;
    text-align: center;
  }
}

.el-button--small {
  font-size: 17px;
  border-radius: 2px;
}

.el-main {
  height: 2000px;
}
.forth {
  height: 1000px;
  margin-top: 20px;
  margin-left: 100px;
  position: relative;
  .title {
    user-select: text;
    font-size: 1.25rem;
    color: rgb(84, 112, 198);
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  .title2 {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -170px;
    margin-top: -80px;
    img {
      width: 1.25em;
      height: 1.25em;
      margin: 0;
    }
  }
  .tipTop {
    margin-bottom: 35px;
    color: black;
    font-size: 1.4rem;
    span {
      margin-left: 10px;
      margin-right: 10px;
      color: rgb(51, 122, 183);
    }
  }
  img {
    margin-top: 10px;
    width: 200px;
    height: 380px;
    margin-left: calc(50% - 200px);
  }
}

.el-step__title {
  padding-bottom: 0px !important;
}
.el-step__head.is-success {
  color: rgb(39, 37, 35);
  border-color: rgb(39, 37, 35);
}

.loginAgain:hover {
  cursor: pointer;
  color: red;
}
.active1 {
  pointer-events: none; // 禁止鼠标点击事件
}
/deep/ .el-steps{
  position: relative;
  // top: 5px;
  // position: relative;
  z-index: 0;
}
</style>