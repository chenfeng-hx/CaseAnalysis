# 开发指南

## 项目结构

## 单个文件注意点
1. 插件内容：
   1. unplugin-vue-components 和 unplugin-auto-import：自动导入组件插件，可以在 element-plus 快速上手查看，适用于 vue3 ，不用自己手动导入组件
   2. axios：用来发送网络请求
   3. pinia 低一个版本安装，否则报错
   4. rollup-plugin-babel + @babel/plugin-transform-runtime 代码打包时去掉所有的 log 日志文件
   

## 说明
1. 整体项目使用 vue3 + vite 搭建，路由使用 vue-router，状态管理使用 pinia
2. element-plus 采用按需引入的方式，减少包的体积
3. 
