import baseConfig from './base.config'
import { defineConfig } from 'vite'

export default defineConfig({
    ...baseConfig,
    base: '/jw-component-library',
    build: {
        outDir: 'docs'
    }
})
