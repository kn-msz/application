import type { App } from 'vue'

import { ZcSkeleton  } from '@/components/ZcSkeleton'
import { ZcLoading } from '@/components/ZcLoading'
/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
    // 骨架屏
    app.component('ZcSkeleton', ZcSkeleton)
    // 加载
    app.component('ZcLoading', ZcLoading)
}
