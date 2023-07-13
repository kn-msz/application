import { h } from 'vue'
import { NIcon } from 'naive-ui'
import screenfull from 'screenfull'
import Image_404 from '../assets/images/exception/image-404.png'
import { excludeParseEventKeyList } from '@/enums/eventEnum'



/**
 * * 判断是否是开发环境
 * @return { Boolean }
 */
export const isDev = () => {
    return import.meta.env.DEV
}

/**
 * * 获取 uuid
 *
 */
export const getUuid = () :string  => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    })
}

/**
 * * render 图标
 *  @param icon 图标
 *  @param set 设置项
 */
export const renderIcon = (icon: any, set = {}) => {
    return () => h(NIcon, set, { default: () => h(icon) })
}
/**
 * * 获取错误处理图片，默认 404 图
 * @returns url
 */
export const requireErrorImg = () => {
    return Image_404
}
/**
 * * render 语言
 *  @param lang 语言标识
 *  @param set 设置项
 *  @param tag 要渲染成的标签
 */
export const renderLang = (lang: string, set = {}, tag = 'span') => {
    return () => h(tag, set, { default: () => window['$t'](lang) })
}
/**
 * * 全屏操作函数
 * @param isFullscreen
 * @param isEnabled
 * @returns
 */
export const screenfullFn = (isFullscreen?: boolean, isEnabled?: boolean) => {
    // 是否是全屏
    if (isFullscreen) return screenfull.isFullscreen

    // 是否支持全屏
    if (isEnabled) return screenfull.isEnabled

    if (screenfull.isEnabled) {
        screenfull.toggle()
        return
    }
    // TODO lang
    window['$message'].warning('您的浏览器不支持全屏功能！')
}



/**
 * * JSON序列化，支持函数和 undefined
 * @param data
 */
export const JSONStringify = <T>(data: T) => {
    return JSON.stringify(
        data,
        (key, val) => {
            // 处理函数丢失问题
            if (typeof val === 'function') {
                return `${val}`
            }
            // 处理 undefined 丢失问题
            if (typeof val === 'undefined') {
                return null
            }
            return val
        },
        2
    )
}

/**
 * * JSON反序列化，支持函数和 undefined
 * @param data
 */
export const JSONParse = (data: string) => {
    var eval2 = eval
    return JSON.parse(data, (k, v) => {
        if (excludeParseEventKeyList.includes(k)) return v
        if (typeof v === 'string' && v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
            return eval2(`(function(){return ${v}})()`)
        } else if (typeof v === 'string' && v.indexOf && (v.indexOf('return ') > -1)) {
            const baseLeftIndex = v.indexOf('(')
            if (baseLeftIndex > -1) {
                const newFn = `function ${v.substring(baseLeftIndex)}`
                return eval2(`(function(){return ${newFn}})()`)
            }
        }
        return v
    })
}



/**
 * 是否外链
 * @param path
 * @returns
 */
export const isExternalLink = (path: string): boolean => {
    return /^(https?:|\/\/|mailto:|tel:|{{([^}}]+)?}})/.test(path);
};

export const getGlobalParamConfig =  (attribute:string) =>{
    if(['globalParamsConfig']){
        let value = window.SITE_CONFIG['globalParamsConfig'][attribute]
        return value
    }
    return null
}

/**
 * 获取对象下的字段值
 * @param record {}
 * @param key 'a.b.c'
 * @param defaultValue
 * @returns
 */
export const getValueByKeys = (record: IObject = {}, key: string, defaultValue?: unknown): any => {
    const keys = key.split(".");
    for (let i = 0; i < keys.length; i++) {
        record = record[keys[i]] || (i === keys.length - 1 ? defaultValue : {});
    }
    return record || defaultValue;
};
