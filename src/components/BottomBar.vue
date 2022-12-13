<template>
    <div class="container">
       <div class="left">
           <div class="top">
               <ul>
                   <li>联系我们</li>
                   <li>电话：**********</li>
                   <li>邮箱：******@**********</li>
                   <li>地址： 重庆| 南岸</li>
               </ul>
           </div>
           <div class="bottom">
               <div>
                   <ul>
                       <li>友情链接</li>
                       <li><a href="http://www.cqupt.edu.cn/">重庆邮电大学</a></li>
                       <li><a href="https://wenshu.court.gov.cn/">裁判文书网</a></li>
                   </ul>
               </div>
           </div>
       </div>
       <div class="center">
           <ul>
               <li>产品</li>
               <li>文书分析</li>
               <li>案例检索</li>
           </ul>
       </div>
       <div class="right">
           <ul>
               <li>公司</li>
               <li>关于我们</li>
               <li>隐私政策</li>
               <li>新手指引</li>
               <li>联系我们</li>
           </ul>
       </div>
    </div>
</template>

<script>
export default {
    name:'bottomBar',
    data () {
      return {
     
     
     }
  },
}
</script>

<style scoped lang="scss">
.container{
    display: flex;
    background-color: rgba(39, 37, 35, 1);
    width: 100%;
    color: #ccc;
    .left{
        width: 40%;
        padding-left: 40px;
        .top{
          ul{
             >li:first-child{
                color: #fff;
                font-size: 16px;
             }
             >li{
                 margin: 10px 0px;
                 font-size: 14px;
             }
           }
        }
        .bottom{
            margin-top: 5px;
            ul{
             >li:first-child{
                color: #fff;
                font-size: 16px;
             }
             >li{
                 display: flex;
                 margin: 10px 0px;
                 font-size: 14px;
                 >a{
                     text-decoration:none;
                     color: #ccc;
                 }
                 a:hover{
                     color: aqua;
                 }
             }
           }
        }

    }
    .center{
        width: 30%;
        ul{
             >li:first-child{
                color: #fff;
                font-size: 16px;
             }
             >li{
                 margin: 10px 0px;
                 font-size: 14px;
                 cursor: pointer;
             }
           }
    }
    .right{
        width: 30%;
         ul{
             >li:first-child{
                color: #fff;
                font-size: 16px;
             }
             >li{
                 margin: 10px 0px;
                 font-size: 14px;
                 cursor: pointer;
             }
           }
    }

}
ul,li{
       list-style:none;
    }
li:hover{
    color: rgb(96, 148, 205);
}
</style>