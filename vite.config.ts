import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { OUTPUT_DIR, reportCompressedSize, chunkSizeWarningLimit, terserOptions, rollupOptions } from './build/constant'
import viteCompression from 'vite-plugin-compression'

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    // 路径重定向
    resolve: {
        alias: [
            {
                find: /\/#\//,
                replacement: pathResolve('types')
            },
            {
                find: '@',
                replacement: pathResolve('src')
            },
            {
                find: 'vue-i18n',
                replacement: 'vue-i18n/dist/vue-i18n.cjs.js', //解决i8n警告
            }
        ],
        dedupe: ['vue']
    },
    // 全局 css 注册
    css: {
        preprocessorOptions: {
            scss: {
                javascriptEnabled: true,
                additionalData: `@import  "src/styles/common/style.scss";`
            }
        }
    },
    // 开发服务器配置
    server: {
        host: true,
        open: true,
        port: 3000,
    },
    plugins: [
        vue(),
        // 压缩
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz'
        })
    ],
    optimizeDeps: {
        include: [
            `monaco-editor/esm/vs/language/json/json.worker`,
            `monaco-editor/esm/vs/language/css/css.worker`,
            `monaco-editor/esm/vs/language/html/html.worker`,
            `monaco-editor/esm/vs/language/typescript/ts.worker`,
            `monaco-editor/esm/vs/editor/editor.worker`
        ],
    },
    build: {
        target: 'es2015',
        outDir: OUTPUT_DIR,
        // minify: 'terser', // 如果需要用terser混淆，可打开这两行
        // terserOptions: terserOptions,
        rollupOptions: rollupOptions,
        reportCompressedSize: reportCompressedSize,
        chunkSizeWarningLimit: chunkSizeWarningLimit
    }
})
