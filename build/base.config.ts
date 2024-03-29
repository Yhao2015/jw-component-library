import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 文档: https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
            packages: resolve(__dirname, '../packages')
        }
    },
    server: {
        host: '0.0.0.0',
        port: 9999,
        open: true
    },
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/]
        }),
        Markdown()
    ]
})
