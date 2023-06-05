/**
* 当前代码编辑信息:
*    由用户 晚年不详 使用 vscode 在 “Relevant” 中
*    于 2023-06-1 14:28:38 编写而成！
*    祝你食用愉快！！！
*/
<script setup>

import { reactive, ref } from 'vue'
import axios from 'axios'
import { renderAsync } from "docx-preview"
import JSzip from "jszip"
window.JSZip = JSzip


const staticData = reactive({
    itemName: '劳动保障监察条例',
    screenWidth: 0,
    isshownav: false
})
const preview = ref()


function getWord(item) {
    axios({
        method: "get",
        url: '/static/' + item + '.docx',
        responseType: 'arraybuffer'
    }).then((res) => {

        renderAsync(res.data, preview.value);
    })

}

getWord(staticData.itemName)

function changeContent(item) {
    document.documentElement.scrollTop = 0;
    if (item !== staticData.itemName) {
        staticData.itemName = item
        getWord(item)
    }



}

</script>

<template>
    <div class="content">

        <!-- 侧边栏 -->

        <div class="left">
            <ul>
                <li :class="{ active: staticData.itemName === '劳动保障监察条例' }" @click="changeContent('劳动保障监察条例')">《劳动保障监察条例》
                </li>
                <li :class="{ active: staticData.itemName === '女职工劳动保护特别规定' }" @click="changeContent('女职工劳动保护特别规定')">
                    《女职工劳动保护特别规定》
                </li>
                <li :class="{ active: staticData.itemName === '社会保险费征缴暂行条例' }" @click="changeContent('社会保险费征缴暂行条例')">
                    《社会保险费征缴暂行条例》
                </li>
                <li :class="{ active: staticData.itemName === '工伤保险条例' }" @click="changeContent('工伤保险条例')">《工伤保险条例》</li>
                <li :class="{ active: staticData.itemName === '中华人民共和国劳动法' }" @click="changeContent('中华人民共和国劳动法')">
                    《中华人民共和国劳动法》</li>
                <li :class="{ active: staticData.itemName === '中华人民共和国劳动合同法' }" @click="changeContent('中华人民共和国劳动合同法')">
                    《中华人民共和国劳动合同法》
                </li>
                <li :class="{ active: staticData.itemName === '中华人民共和国劳动争议调解仲裁法' }"
                    @click="changeContent('中华人民共和国劳动争议调解仲裁法')">
                    《中华人民共和国劳动争议调解仲裁法》</li>
                <li :class="{ active: staticData.itemName === '中华人民共和国职业病防治法' }" @click="changeContent('中华人民共和国职业病防治法')">
                    《中华人民共和国职业病防治法》</li>



            </ul>

        </div>

        <!--下载文书-->


        <div class="my-component" ref="preview"></div>
        <div class="down">
            <div class="center-container">
                <a :href="'/static/' + item + '.docx'" target="_blank" :download="itemName + '.docx'">
                    <img src="../../assets/svg/下载.svg" alt="">
                    <div>下载</div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.content {

    padding: 3em 0;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 85vh;
    color: gray;

    background-color: rgb(238, 238, 238);

    .left {

        padding: 1.2em;
        overflow: auto;
        background-color: white;
        margin-right: 2em;
        align-self: start;
        max-height: 75vh;
        width: 18%;

        ul li {
            padding: 1em;


        }

        li:hover {
            color: rgb(70, 156, 255);
            background-color: rgba(70, 156, 255, 0.1);
        }
    }


    .my-component {

        margin-bottom: 1.2em;
        overflow: auto;
        background-color: white;

    }

    .down {

        margin-left: 2em;
        float: right;
        font-size: 0.9rem;
        height: 4em;
        width: 3.5em;
        border-radius: 0.5em;
        background-color: rgba(70, 156, 255, 0.2);
        ;

        .center-container {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                padding-top: 0.2em
            }

            div {
                color: rgba(70, 156, 255);
                ;
            }
        }



    }
}





.active {
    color: rgb(70, 156, 255);
    background-color: rgba(70, 156, 255, 0.2);
}
</style>

