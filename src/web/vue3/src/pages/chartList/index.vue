<script setup lang="ts">
import ECharts from '../../components/ECharts/index.vue';
import axios from 'axios';
import {onMounted, reactive} from 'vue';
const service = axios.create({
	baseURL: '/api' // 注意这里是完整路径
})
const data = reactive<{ series: any[] }>({series: []});
const getData = async () => {
	const res = await service.get('/data');
	if (res.data) {
		data.series.push(...res.data);
	}
};
onMounted((() => {
	getData();
}))
</script>

<template>
	<div class="chart-wrapper">
		<ECharts v-for="i in 25" :series="data.series"  :key="i"/>
	</div>
</template>

<style scoped>
.chart-wrapper {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(5, 1fr);
	grid-column-gap: 10px;
	grid-row-gap: 10px;
	background-color: lightslategray;
}
</style>
