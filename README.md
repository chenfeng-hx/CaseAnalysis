# 开发指南

## 代码规范
1. 尽量做到每行代码或每个功能点都有注释, 每个变量名都见名知义, 而不是使用 show 1-18 ..., 还有最开头的文档注释
2. views 中的每一个页面都作为一个单独的目录存放, 如将 Home.vue 放在 views/Home 中
3. src/components 中只存放全局通用组件, views/xxx/components 存放的是当前页面所用到的独立组件
4. setup 语法糖中的所有的函数都使用箭头函数的形式, 联系语法 + 没有 this
5. Tab 键尽量使用 4 个空格
6. 

## 项目结构


## 单个文件注意点 mark
1. 插件内容：
   1. unplugin-vue-components 和 unplugin-auto-import：自动导入组件插件，可以在 element-plus 快速上手查看，适用于 vue3 ，不用自己手动导入组件
   2. axios：用来发送网络请求
   3. pinia 低一个版本安装，否则报错
   4. rollup-plugin-babel + @babel/plugin-transform-runtime 代码打包时去掉所有的 log 日志文件, 可以问 gpt
   5. bootstrap 版本采用第四版最新版，用于 recommendation 中
   6. @element-plus/icons-vue: 自动按需引入 element-plus 中的字体图标
   7. @vue-office/docx + vue-demi 做上传文件的文件预览(docx文件)
   8. echarts 做各种数据图表展示
   9. 
2. 文件内容：
   1. api 目录中的导出函数, 对用到的部分函数进行了修改使其可以在发生某些变化的时候取消请求
   2. 
   

## 说明 test
1. 整体项目使用 vue3 + vite4 搭建，路由使用 vue-router4，状态管理使用 pinia2
2. element-plus 采用按需引入的方式，减少包的体积
3. 包管理器使用 yarn `yarn` `yarn add` `yarn remove`
4. echarts 采用按需引入的方式，减少包的体积


## 项目更新点 update
1. Recommendation 页面 css 采用手写的方式, 将之前的引入的大量的重复CSS效果优化, 并使用 v-for 优化重复文档结构,保证文档的结构清晰明了
2. Analysis 页面重构页面：左侧的步骤条更改样式, 并可以进行向侧边折叠, 右侧的三个面板采用“标签页”形式, 当步骤条展示时只能依次观看, 但是步骤条折叠之后可以进行左右分屏观看
3. Home 页面没有改变, DataDisplay 页面基本不变采用之前的写法, 但是去掉了很多没有用处的 CSS 文件
4. 部分px采用rem和em方式



## 新增需求 todo (功能完成后使用 ==> 标注并将解决过程说明在后面)
1. gzip ==> vue3 + vite 默认开启
2. token失效跳转登录
3. 加载进度条
4. 雪碧图
5. 滚动条 ==> 已经解决，简略修改了以前学长留下的代码
6. 路由目录 ==> 把一些零散的路由规整到了 loginOrNot.js 里面，封装了方法并暴露
7. 回车登录/注册 ==> 更改了方式, 改为在 input 框中添加回车事件
8. 回到顶部  ==> 完成功能：在滑动页面一定距离后展示，并通过在 store 中创建全局变量控制在哪个页面展示与否
9. 分享按钮, 位置在 BackToTop 下面, 点击后有"截屏分享"和"链接分享"两种, 和后端商量看能不能给链接做一个标记"id", 通过特定的 id 可以访问到和要分享的人同一个页面, 是不通过上传文件的
10. 将多余的 ELMessage 进行封装(2023-06-07 19:06)
11. sepcialInfo 知识图谱的样式往上提(2023-06-07 19:06)


## 待修复 fixme
1. recommendation 页面中文字鼠标经过会有下滑线的问题
2. 滚动条在鼠标不经过的时候不显示的问题
3. 回车登录记得改一下发送请求的函数m, 节流函数, 避免发送大量的请求
4. 路由和 store 内部的 appTab 不匹配的问题, 比如刷新后路由在 recommendation, 但是 AppBar 的高亮在 home, store 中的 apptab 也在 home
5. 文书分析左侧步骤条区域有时会出现浮动现象, 及脱标, 会让右侧内容垫在下面(左移), 建议去掉固定组件重新设计fixed ==> 已修改,使用左侧fixed, 右侧margin-left
6. mapKnowledge组件的props传值过去, 非响应式问题, 解构问题, 
7. recommendation页面中存在一些点击错位的问题
