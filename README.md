# 开发指南

## 项目结构

## 单个文件注意点 mark
1. 插件内容：
   1. unplugin-vue-components 和 unplugin-auto-import：自动导入组件插件，可以在 element-plus 快速上手查看，适用于 vue3 ，不用自己手动导入组件
   2. axios：用来发送网络请求
   3. pinia 低一个版本安装，否则报错
   4. rollup-plugin-babel + @babel/plugin-transform-runtime 代码打包时去掉所有的 log 日志文件, 可以问 gpt
   5. bootstrap 版本采用第四版最新版，用于 recommendation 中
   

## 说明 test
1. 整体项目使用 vue3 + vite 搭建，路由使用 vue-router，状态管理使用 pinia
2. element-plus 采用按需引入的方式，减少包的体积
3. 

## 新增需求 todo
1. gzip --> vue3 + vite 默认开启
2. token失效跳转登录
3. 加载进度条
4. 雪碧图
5. 滚动条 ==> 已经解决，简略修改了以前学长留下的代码
6. 路由目录 ==> 把一些零散的路由规整到了 loginOrNot.js 里面，封装了方法并暴露
7. 回车登录
8. 回到顶部  ==> 完成功能：在滑动页面一定距离后展示，并通过在 store 中创建全局变量控制在哪个页面展示与否


## 待修复 fixme
1. recommendation 页面中文字鼠标经过会有下滑线的问题
