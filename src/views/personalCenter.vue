<template>
    <div class="center-page">
        <el-dialog
           :title=dialogTitle
           :visible.sync="dialogVisible"
           width="30%"
           :before-close="handleClose">
           <changemsg></changemsg>
           <!-- <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
           </span> -->
         </el-dialog>
        <div class="myCount">
            <div class="title">我的账号</div>
            <div class="form-item">
                <!-- <div class="form-line">
                    <div class="leftText">手机</div>
                    <div class="righrText">130******0120</div>
                </div>
                <div class="form-line">
                    <div class="leftText">登陆密码</div>
                    <div class="righrText">********</div>
                </div>
                <div class="form-line">
                    <div class="leftText">绑定邮箱</div>
                    <div class="righrText">130******0120@163.com</div>
                </div> -->
                <div class="left">
                    <div class="text">手机</div>
                    <div class="text">登陆密码</div>
                    <div class="text">绑定邮箱</div>
                </div>
                <div class="right">
                    <div class="form">130******0120</div>
                    <div class="form">
                        <div>*********</div>
                        <div @click="chooseDialog('设置登陆密码')">忘记密码</div>
                    </div>
                    <div class="form">
                        <div>130******0120@163.com</div>
                        <div @click="chooseDialog('换绑邮箱')">换绑邮箱</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="order">
             <div class="title">订单列表</div>
             <div class="tab-title">
                 <div class="text">订单内容</div>
                 <div class="text">订单编号</div>
                 <div class="text">有效期至</div>
                 <div class="text">支付方式</div>
                 <div class="text">订单金额</div>
                 <div class="text">支付时间</div>
                 <div class="text">交易状态</div>
                 <div class="text">操作</div>
             </div>
             <div class="tab-content">
                 暂无数据
             </div>

        </div>
    </div>
</template>

<script>
import changemsg from "../components/changemsg.vue";
export default {
      name: "personal",
      data(){
          return{
               dialogVisible: false,
               dialogTitle:''
          }
      },
      components:{
          changemsg
      },
      methods:{
          chooseDialog(item){
              this.dialogVisible = true
              this.dialogTitle = item
          }
      }
}
</script>

<style scoped lang="scss">
.center-page{
    width: 85%;
    min-width: 1280px;
    margin: 30px auto;
}
.myCount{
    background: #f0f0f0;
    border-radius: 4px;
    padding: 30px 40px;
    margin-bottom: 20px;
    .title{
        font-size: 16px;
        line-height: 22px;
        font-weight: 700;
        color: #222;
        margin-bottom: 20px;
    }
    .form-item{
        display: flex;
        .left{
            padding: 5px 20px;
            position:relative;

            .text{
                padding: 11px 0px;
                vertical-align: middle;
                font-size: 14px;
                color: #606266;
                line-height: 40px;
                padding: 0 12px 0 0;
                box-sizing: border-box;
            }
        }
        .right{
             padding: 5px 20px;
             .form{
                 padding: 11px 0px;
                 border-bottom: 1px solid #c0c1c2;
                 vertical-align: middle;
                 font-size: 14px;
                 color: #606266;
                 line-height: 40px;
                 padding: 0 12px 0 0;
                 box-sizing: border-box;
                 display: flex;
                 div:first-child{
                     width: 70%;
                     padding-right: 20px;
                 }
                 div:last-child{
                     width: 30%;
                     text-align: end;
                     color: red;
                     font-size: 12px;
                     cursor: pointer;
                 }
             }

        }
    }
}

.order{
    background: #f0f0f0;
    border-radius: 4px;
    padding: 30px 40px;
    margin-bottom: 20px;
    .title{
        font-size: 16px;
        line-height: 22px;
        font-weight: 700;
        color: #222;
        margin-bottom: 20px;
    }
    .tab-title{
        display: flex;
        width: 85%;
        border-bottom: 1px solid #c0c1c2;
        text-align: center;
        .text{
            width: 13%;
            padding-bottom: 8px;
        }
    }
    .tab-content{
        line-height: 60px;
        width: 85%;
        color: #909399;
        text-align: center;
        border-bottom: 1px solid #c0c1c2;

    }
}
</style>