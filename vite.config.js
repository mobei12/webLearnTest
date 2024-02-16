import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'
export default defineConfig({
	root: './src/web/react',//入口地址，会打开里面的index.html,
	plugins: [
		react()
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
