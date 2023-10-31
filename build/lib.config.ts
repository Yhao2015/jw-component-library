import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path'

export default defineConfig({
    build: {
        outDir: 'lib',
        minify: false,
        lib: {
            entry: resolve(__dirname, '../packages/index.ts'),
            name: 'jw-component-library',
            fileName: (format) => `jw.${format}.js`
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue', 'element-plus'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    plugins: [vue()]
})
