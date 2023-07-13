// @ts-ignore
import path from 'path'
export const OUTPUT_DIR = 'dist'

// chunk 警告大小
export const chunkSizeWarningLimit = 2000

// 禁用 reportCompressedSize 压缩大小报告
export const reportCompressedSize = false

// 分包
export const rollupOptions = {
  output: {
    chunkFileNames: 'static/js/[name]-[hash].js',
    entryFileNames: 'static/js/[name]-[hash].js',
    assetFileNames: (chunkInfo : any) => {
      if(['.png', '.jpg', '.jpeg'].includes(path.extname(chunkInfo.name))) {
        return `static/[ext]/[name].[ext]`
      }
      return `static/[ext]/[name]-[hash].[ext]`
    },
  }
}

// 去除开发代码
export const terserOptions = {
  compress: {
    keep_infinity: true,
    drop_console: true,
    drop_debugger: true
  }
}
