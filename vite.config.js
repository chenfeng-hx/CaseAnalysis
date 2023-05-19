import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 配置将 @ 转换为 src
import { resolve } from 'path'
// element-plus 按需引入配置
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
  }

})
