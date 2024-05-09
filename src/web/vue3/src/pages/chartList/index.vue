<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive, ref, onUnmounted } from 'vue';
import lodash from 'lodash';
import ECharts from '../../components/ECharts/index.vue';
const service = axios.create({
	baseURL: '/api' // 注意这里是完整路径
})
const data = reactive<{ series: any[] }>({ series: [] });
const getData = async () => {
	const res = await service.get('/data');
	if (res.data) {
		data.series.push(...res.data);
	}
};

const resizeEvent = (e: Event) => {
	console.log(window.innerWidth, window.innerHeight);
}
const isFullScreen = ref(false);
const fullScreen = lodash.debounce(() => {
	isFullScreen.value = !isFullScreen.value
}, 500)
onMounted((() => {
	getData();
	window.addEventListener('resize', lodash.throttle(resizeEvent, 500));
}))
onUnmounted(() => {
	data.series = [];
	window.removeEventListener('resize', resizeEvent);
})
</script>

<template>
	<div :class="[
		'main-wrapper',
		isFullScreen ? 'full' : ''
	]">
		<div :class="['chart-wrapper']" v-show="!isFullScreen">
			<ECharts v-for="i in 3" :series="data.series" :key="i" />
		</div>
		<div class="divCenter">
			<!-- <img src="../../assets/img/center.jpg" style="width: 100%;" /> -->
			<button @click="fullScreen"
				style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);">切换</button>
		</div>
		<div class="chart-wrapper" v-show="!isFullScreen">
			<ECharts v-for="i in 3" :series="data.series" :key="i" />
		</div>
	</div>
</template>

<style scoped>
.main-wrapper {
	display: grid;
	height: 100vh;
	grid-template-columns: 20rem auto 20rem;
	gap: 1rem;
	background-color: lightslategray;
}

.main-wrapper.full {
	grid-template-columns: 1fr;
}

.chart-wrapper {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}


.divCenter {
	position: relative;
}

@media screen and (min-width: 2000px) {
	.main-wrapper {
		grid-template-columns: 25rem auto 25rem;
		gap: 1.5rem;
	}
}

@media screen and (max-width: 960px) {
	.main-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.divCenter {
		order: -1;
	}
}
</style>
