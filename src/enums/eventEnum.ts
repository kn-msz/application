// 基础事件类型(vue不加 on)
export enum BaseEvent {

}

// vue3 生命周期事件
export enum EventLife {
    // 渲染之后
    VNODE_MOUNTED = 'vnodeMounted',
    // 渲染之前
    VNODE_BEFORE_MOUNT = 'vnodeBeforeMount',
}

// 内置字符串函数对象列表
export const excludeParseEventKeyList = [
    EventLife.VNODE_BEFORE_MOUNT,
    EventLife.VNODE_MOUNTED,
    //过滤器
    'filter'
]
