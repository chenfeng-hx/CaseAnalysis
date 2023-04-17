<template>
  <div>

    <div class="background-card">


      <el-card :body-style="{ padding: '0px' }" class="card1">
        <img src="../assets/smile.png" class="image">
        <div style="padding: 14px;text-align: center;">
          <span class="intro1">自动化</span>
          <br>
          <br>
          <span class="intro2">文本分词、类案检索、数据分析...</span>
        </div>
      </el-card>

      <el-card :body-style="{ padding: '0px' }" class="card2">
        <img src="../assets/lawHall.png" class="image">
        <div style="padding: 14px;text-align: center;">
          <span class="intro1">200+</span>
          <br>
          <br>
          <span class="intro2">人工标注数据集训练与测试</span>
        </div>
      </el-card>

      <el-card :body-style="{ padding: '0px' }" class="card3">
        <img src="../assets/hall.png" class="image">
        <div style="padding: 14px;text-align: center;">
          <span class="intro1">反馈学习</span>
          <br>
          <br>
          <span class="intro2">根据用户标注反馈训练优化模型</span>
        </div>
      </el-card>

    </div>

    <div style="background:linear-gradient(to left,#FFFFFF,#b6b6b6,#FFFFFF);
                height:3px;
                position: relative;
                margin-top: 30px"></div>

  </div>
</template>

<script>
export default {
  name: "cardBody"
}
</script>

<style scoped>
.background-card {
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #F5F9FC;
  height: 350px;
  width: 84vw;
  margin-top: 30px;
  margin-left: 7vw;
}

.card1 {
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: #FFFFFF;
  height: 73%;
  width: 30%;
  top: 15%;
  left: 2%;
  z-index: 1;
}

.card2 {
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: #FFFFFF;
  height: 73%;
  width: 30%;
  top: 15%;
  left: 35%;
  z-index: 1;
}

.card3 {
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: #FFFFFF;
  height: 73%;
  width: 30%;
  top: 15%;
  left: 68%;
  z-index: 1;
}

.intro1 {
  font-family: "思源宋体 CN Heavy";
  font-size: xx-large;
  color: #1D5C93;

}

.intro2 {
  font-family: "方正苏新诗柳楷简体";
  font-size: medium;
  color: #2C3E50;
}

.image {
  width: 20%;
  margin-left: 40%;
  margin-top: 4%;

  display: block;
}
</style>
<!-- 
一些可以优化的地方：
1、将卡片中的内容存储在数组中，通过v-for渲染
2、卡片css重复部分可写在一起
3、卡片采用flex定位方式，在屏幕宽度减小时，调整每行卡片数量 -->

