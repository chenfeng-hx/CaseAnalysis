<template>
  <!-- <div class="login"> -->
  <!-- <div class="background"></div> -->
  <div class="contain">
    <div class="big-box" :class="{ active: isLogin }">
      <div class="big-contain" v-if="isLogin">
        <div class="btitle">登录</div>
        <div class="box">
          <div class="box1">
            <span class="left">用户名</span>
            <el-input v-model.trim="username" clearable>
            </el-input>
          </div>
          <div class="box2">
            <span class="left">密码</span>
            <el-input placeholder="" v-model="password" show-password></el-input>

          </div>
          <div class="forget" @click="forgetBtn()">忘记密码？邮箱找回</div>
        </div>
        <button class="bbutton" @click="login" @keyup.enter="keydown(e)">登录</button>
      </div>
      <div class="big-contain" v-if="!isLogin">
        <div class="btitle" v-show="changePass">注册账号</div>
        <div class="btitle" v-show="!changePass">修改密码</div>
        <div class="bottom">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" v-show="changePass">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="用户名" v-show="!changePass">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <span class="userTip">只能包含数字、字母、下划线，并且第一个字母为大写</span>

            <el-form-item label="密码" prop="pass" v-show="changePass">
              <el-input type="password" v-model="form.pass" autocomplete="off" placeholder="请输入8~16位的密码"
                show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass" v-show="!changePass">
              <el-input type="password" v-model="form.pass" autocomplete="off" placeholder="请输入8~16位的密码"
                show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="form.checkPass" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item v-show="changePass" prop="email" label="邮箱" :rules="[
              { message: '请输入邮箱地址', trigger: 'blur' },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change'],
              },
            ]">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item v-show="!changePass" prop="email" :rules="[
              { message: '请输入邮箱地址', trigger: 'blur' },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change'],
              },
            ]">
              <label slot="label" class="emailTip">旧密码绑定的邮箱</label>
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item class="shut" v-show="changePass">
              <el-input v-model="code" class="emailBox" placeholder="输入验证码"></el-input><el-button class="remove"
                @click="send()" :class="{ active1: 1 === currentIndex }">{{ this.text }}</el-button>
            </el-form-item>
            <el-form-item class="shut" v-show="!changePass">
              <el-input v-model="code2" class="emailBox" placeholder="输入验证码"></el-input><el-button class="remove"
                @click="send()" :class="{ active1: 1 === currentIndex }">{{ this.text }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <button class="bbutton" @click="submitForm('form')" v-show="changePass">注册</button>
        <button class="bbutton" @click="submitForm2('form')" v-show="!changePass">提交</button>

      </div>
    </div>

    <div class="small-box" :class="{ active: isLogin }">
      <div class="small-contain" key="smallContainRegister" v-if="isLogin">
        <div class="stitle">你好，朋友!</div>
        <p class="scontent">开始注册，和我们一起探索更深层次的司法文本信息</p>
        <button class="sbutton" @click="changeType" v-show="changePass">注册</button>

      </div>
      <div class="small-contain" key="smallContainLogin" v-else>
        <div class="stitle">欢迎回来!</div>
        <p class="scontent">与我们保持联系，请登录你的账户</p>
        <button class="sbutton" @click="changeType">登录</button>
      </div>
    </div>
    <!-- 修改密码 -->
    <div class="blank"></div>
  </div>
  <!-- </div> -->
</template>

<script>
// import { request } from "../network/request.js";
import axios from 'axios'
// import e from 'express';
export default {
  name: "login-register",
  data() {

    //   邮箱验证

    //  密码验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length > 16 || value.length < 8) {
        callback(new Error("密码长度为8~16位"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      changePass: true,
      dialogVisible: true,
      text: "发送验证码",
      currentIndex: 0,
      isLogin: true,
      existed: false,
      //   注册
      form: {
        username: "",
        pass: "",
        checkPass: "",
        email: "",
      },
      // 登录
      username: '',
      password: '',
      // 找回密码
      username1: '',
      email: "",
      code2: '',
      password1: '',


      username2: '',
      code: "",
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 发送邮箱验证码
    send() {

      var reg2 = /^\w{3,20}$/
      //验证邮箱格式
      //   console.log(this.form.email);
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.form.email == "" || !reg.test(this.form.email)) {
        this.$message({
          type: "warning",
          message: "邮箱格式不正确",
        });
      }
      else if (this.form.username == '') {
        this.$message({
          type: "warning",
          message: "请输入用户名",
        });
      } else if (!reg2.test(this.form.username)) {
        this.$message({
          type: "warning",
          message: "用户名格式不正确",
        });
      }
      else {
        this.text = "已发送";
        this.currentIndex = 1;
        axios({
          url: "http://123.249.87.210:8002/send_verify_code",
          method: "GET",
          params: {
            username: this.form.username,
            email: this.form.email,
          },
        }).then((res) => {

          this.username2 = this.form.username
          this.$message({
            type: "success",
            message: "发送成功",
          });


        }).catch((res) => {
          this.$message({
            type: "warning",
            message: "发送失败",
          });
          this.text = "发送验证码";
          this.currentIndex = 0
        });
      }
    },

    // 注册
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.pass.length > 16 || this.form.pass.length < 8) {
            this.$message({
              type: "warning",
              message: "密码格式不对",
            });
          } else {
            let formdata = new FormData();
            formdata.append("password", this.form.pass);
            formdata.append("email", this.form.email);
            formdata.append("verify", this.code);
            formdata.append("username", this.username2);
            //  formdata.append("username", this.form.username);

            axios({
              url: "http://123.249.87.210:8002/register",
              method: "POST",
              data: formdata
            }).then((res) => {

              if (res.data.detail == "success") {
                this.$message({
                  type: "success",
                  message: "注册成功",
                });

                //   this.$store.commit("$_setToken", userInfo);
                //   this.$router.replace("/home");
              } else {
                this.$message({
                  type: "warning",
                  message: "注册失败",
                });
              }
            }).catch((res) => {
              this.$message({
                type: "warning",
                message: "注册失败",
              });
            });
            this.text = "发送验证码";
            this.currentIndex = 0
          }


        } else {
          this.$message({
            type: "warning",
            message: "请输入完整的正确信息",
            center: "true",
            duration: 1000,
            customClass: "press",
          });
          return false;
        }
      });
    },
    changeType() {
      this.isLogin = !this.isLogin;
      this.changePass = true
    },
    // 登录
    login() {
      const self = this;
      if (this.username != "" && this.password != "") {
        let formdata2 = new FormData();
        formdata2.append("username", this.username);
        formdata2.append("password", this.password);
        axios({
          method: "post",
          url: "http://123.249.87.210:8002/login",
          data: formdata2
        })
          .then((res) => {
            this.$message({
              type: "success",
              message: res.data.detail,
              center: "true",
              duration: 1000,
              customClass: "press",
            });
            this.$store.commit("$_setToken", res.data.token);
            this.$emit("loginMsg", false)
            this.$emit("loginName", this.username)
          })
          .catch((err) => {
            this.$message({
              type: "warning",
              message: err.response.data.detail,
              center: "true",
              duration: 1000,
              customClass: "press",
            });

          });
      } else {
        this.$message({
          type: "warning",
          message: "填写不能为空！",
          center: "true",
          duration: 1000,
          customClass: "press",
        });

      }
    },
    // 使用enter实现登录
    keydown() {
      document.onkeyup = e => {
        if (e.key == "Enter") {
          this.login();
        }
      }
    },
    // 找回密码
    forgetBtn() {

      this.isLogin = false
      this.changePass = false
      this.form.username = ''
      this.form.pass = ''
      this.form.checkPass = ''
      this.email = ''
    },

    //修改密码
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.pass.length > 16 || this.form.pass.length < 8) {
            this.$message({
              type: "warning",
              message: "密码格式不对",
              center: "true",
              duration: 1000,
              customClass: "press",
            });
          } else {
            let formdata = new FormData();
            formdata.append("password", this.form.pass);
            formdata.append("email", this.form.email);
            formdata.append("verify", this.code2);
            axios({
              url: "http://123.249.87.210:8002/forget_pwd",
              method: "POST",
              data: formdata
            }).then((res) => {
              // console.log(res);
              this.text = "发送验证码";
              this.currentIndex = 0;
              //           if (res.data.detail == "success") {
              this.$message({
                type: "success",
                message: "修改成功",
                center: "true",
                duration: 1000,
                customClass: "press",
              });

            }).catch((err) => {
              this.text = "发送验证码";
              this.currentIndex = 0;
              this.$message({
                type: "warning",
                message: "修改失败",
                center: "true",
                duration: 1000,
                customClass: "press",
              });
            });
          }
        } else {
          this.$message({
            type: "warning",
            message: "请输入完整的正确信息",
            center: "true",
            duration: 1000,
            customClass: "press",
          });
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
  created() {
    this.keydown()
  },

};
</script>

<style scoped="scoped" lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}


.emailTip {
  display: block;
  margin-left: -80px;
  width: 150px;
}

// 登录页面
.box1,
.box2 {
  display: flex;
  align-items: center;
  margin: 30px 0;

  .left {
    width: 80px;
    font-size: 16px;
    color: black;
  }

}

.forget {
  margin-left: 56%;
  font-size: 14px;
  margin-top: 15px;
  //   color: rgb(233, 126, 126);
  cursor: pointer;
  margin-bottom: 20px;
}

.forget:hover {
  cursor: pointer;
  color: rgb(143, 143, 225);
}

.close {
  font-size: 20px;
}

/* 增高页面高度 */
.blank {
  width: 0.1px;
  /* background-color: pink; */
  height: 1500px;
}

.contain {
  width: 50vw;
  height: 500px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
  z-index: -1000;
}

.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}

.big-contain {
  // display: flex;
  // margin-top: -30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}

.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}

.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 2em;
  line-height: 1.7em;
}

.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}


.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}








.shut {
  // display: flex;
  margin-top: -20px;

  .emailBox {
    // margin-top: 20px;
    width: 150px;
  }

  .remove {
    width: 100px;
    margin-top: 20px;
    margin-left: 20px;
  }
}

.active1 {
  pointer-events: none; // 禁止鼠标点击事件
}

// 注册表单样式
.bottom {
  margin-top: 35px;
}

.userTip {
  display: block;
  width: 100%;
  font-size: 10px;
  margin-left: 70px;
  margin-top: -15px;
  margin-bottom: 10px;
  color: rgb(54, 171, 152);
}

@media screen and (max-width:600px) {
  .contain {
    width: 88vw;
    height: 84vh;


  }

  .big-box {
    width: 100%;
    height: 70%;
    position: absolute;
    top: 30%;
    left: 0;
    transform: none;
    transition: all 1s;
  }

  .small-box {
    width: 100%;
    height: 30%;
    background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
    position: absolute;
    top: 0;
    left: 0;
    transform: none;
    transition: all 1s;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }

  .big-box.active {
    left: 0;
    transition: all 0.5s;
  }


  .small-box.active {
    left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    transform: none;
    transition: all 1s;
  }

}
</style>