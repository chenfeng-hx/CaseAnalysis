import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// 配置将 @ 转换为 src
import {resolve} from 'path'
// element-plus 按需引入配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
// 配置在代码打包时自动去掉所有的 log 日志语句
import babel from 'rollup-plugin-babel'

export default defineConfig({
	plugins: [
		vue(),
		// element-plus 按需引入配置
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		// 代码打包去掉 log 语句
		babel({
			babelrc: true,
			runtimeHelpers: true,
		}),

	],
	// 配置将 @ 转换为 src
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	// 配置代理
	server: {
		proxy: {
			'/api': {
				target: 'http://123.249.87.210:8002',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		},
	},

})
