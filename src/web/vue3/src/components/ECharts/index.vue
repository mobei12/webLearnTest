<script setup lang="ts">
import * as echarts from 'echarts/core';
import {BarChart, LineChart} from 'echarts/charts';
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers';
import type {BarLineOption} from '@/web/vue3/src/components/ECharts/types';
import {onMounted, onUnmounted, ref, watch} from 'vue';

echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LineChart,
	BarChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
]);
const props = defineProps(['series']);

const options: BarLineOption = {
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: [120, 200, 150, 80, 70, 110, 130],
			type: 'bar',
		},
		{
			data: [20, 40, 90, 40, 30, 70, 120],
			type: 'bar',
		},
		{
			data: [140, 230, 120, 50, 30, 150, 120],
			type: 'bar',
		},
	],
	aria: {
		enabled: true,
		decal: {
			show: true,
		},
	},
};
const chartDom = ref(null);
let myChart: echarts.EChartsType | null = null;
onMounted(() => {
	myChart = echarts.init(chartDom.value);
	myChart.setOption(options);
});
watch(props.series, (series) => {
	//myChart.setOption();
	myChart && myChart.setOption({...options, series}, true);
}, {deep: true});
onUnmounted(() => {
	myChart&&myChart?.dispose()
	myChart = null;
});
</script>

<template>
	<div class="ref-wrapper" ref="chartDom"></div>
</template>

<style scoped>
.ref-wrapper {
	width: 100%;
	height: 100%;
	min-width: 300px;
	min-height: 200px;
}
</style>
