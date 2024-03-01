import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	root: './src/web/vue3',//地址，会打开里面的index.html,
	plugins: [
		react(), vue()
	],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: resolve(__dirname, 'src')
			}
		]
	}
});
