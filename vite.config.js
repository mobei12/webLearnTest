import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'

const pathRoot = process.cwd();
export default defineConfig({
	root: './src/web/React',//地址，会打开里面的index.html,
	plugins: [
		react(), vue()
	],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: resolve(__dirname, 'src')
			}
		]
	}
});
