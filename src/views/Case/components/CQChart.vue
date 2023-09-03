<script setup>
/**
 * 当前代码编辑信息:
 *     由用户 尘封 使用 WebStorm 在 “vue3” 中
 *     于 2023/9/3 编写而成！
 *     祝你食用愉快！！！
 */

import * as echarts from 'echarts';
import * as opt from '@/static/json/areaJson.json';
import {onMounted, ref} from 'vue'

const props = defineProps({
	allLike1: Object
})

let MapData = ref([]);

let area_json = ref();

//计算地区
const countArea = obj => {
	let reg = /^[\u4e00-\u9fa5]{1,4}$/
	for(let i in obj){
		if(reg.test(i)){
			const obj2 = {}
			obj2.name = i
			obj2.value = obj[i]
			obj2.selected = false
			MapData.value.push(obj2)
		}
	}
}

const initExcharts = () => {
	const myChart = echarts.init(area_json.value);
	echarts.registerMap('重庆', opt)
	myChart.setOption(
		{
			title: {
				text: '地区分布图',
				x: 'left',
				y: 'top',
				left: 20,
				textStyle: {
					fontWeight: 'bold',
					fontSize: '18',
					color:'#434343'
				}
			},
			tooltip: {
				show: true,
				trigger: 'item',
				backgroundColor: 'rgba(3, 22, 96, 0.5)',
				// 这里修改data  提示框的数据
				formatter: function(params, ticket, callback) {
					let res = ''
					if (params.value > 0) {
						res = params.name +' '+ params.value+'件'
					} else {
						res = params.name+' '+ '0'
					}
					return res
				},
				textStyle: {
					color: '#fff'
				}
			},
			// 内置下载图片功能，这里关闭
			toolbox: {
				show: false,
				orient: 'vertical',
				left: 'right',
				top: 'center',
				feature: {
					mark: { show: true },
					dataView: { show: true, readOnly: false },
					restore: { show: true },
					saveAsImage: { show: true }
				}
			},
			dataRange: [
				{
					left: '20px',
					bottom: '20px',
					show: false,
					itemGap: 1,
					itemWidth: 10,
					itemHeight: 5,
					orient: 'vertical', // 'horizontal'
					color: [], // 颜色
					splitList: [
						{ start: 500, color: '#1592E6' },
						{ start: 100, end: 500, color: '#47AEF3' },
						{ start: 50, end: 100, color: '#77C9FF' },
						{ start: 10, end: 50, color: '#98D6FF' },
						{ start: 0, end: 10, color: '#B8E3FF' },
						{ start: -1, end: -1, color: '#CCCCCC', label: '未开通' },
						{ start: -2, end: -2, color: '#FD716F', label: '已掉线' }
					],
					textStyle: {
						// 字体设置
						fontSize: 12,
						fontWeight: '500',
						color: '#444444'
					}

				}
			],
			series: [
				{
					name: '重庆市地图',
					type: 'map',
					zoom: 1.2, // 显示比例大小
					mapType: '重庆', // 自定义扩展图表类型
					itemStyle: {
						normal: { label: { show: false }},
						emphasis: { label: { show: false }}
					},
					label: {
						normal: {
							show: true, // 是否显示区域label
							textStyle: {
								fontSize: 8,
								color: '#333'
							}
						}
					},
					data: MapData.value,
					nameMap: {
						// 名称映射
					}
				}
			]
		})
}

onMounted(() => {
	countArea(props.allLike1.court_area)
	initExcharts()
})

</script>

<template>
	<div>
		<div ref="area_json" class="map_body" />
	</div>
</template>

<style scoped lang="scss">
.map_body{height: 400px;width: 450px}
</style>