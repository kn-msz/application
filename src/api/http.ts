import axiosInstance from './axios'
import { RequestHttpEnum } from '@/enums/httpEnum'

export const get = <T = any>(url: string, params?: object) => {
    return axiosInstance<T>({
        url: url,
        method: RequestHttpEnum.GET,
        params: params,
    })
}

export const post = <T = any>(url: string, data?: object, headers?: object) => {
    return axiosInstance<T>({
        url: url,
        method: RequestHttpEnum.POST,
        data: data,
        headers:{
            ...headers,
        }
    })
}

export const patch = <T = any>(url: string, data?: object, headers?: object) => {
    return axiosInstance<T>({
        url: url,
        method: RequestHttpEnum.PATCH,
        data: data,
        headers:{
            ...headers,
        }
    })
}

export const put = <T = any>(url: string, data?: object, headers?: object) => {
    return axiosInstance<T>({
        url: url,
        method: RequestHttpEnum.PUT,
        data: data,
        headers:{
            ...headers,
        }
    })
}

export const del = <T = any>(url: string, params?: object) => {
    return axiosInstance<T>({
        url: url,
        method: RequestHttpEnum.DELETE,
        params
    })
}

// 获取请求函数，默认get
export const http = (type?: RequestHttpEnum) => {
    switch (type) {
        case RequestHttpEnum.GET:
            return get

        case RequestHttpEnum.POST:
            return post

        case RequestHttpEnum.PATCH:
            return patch

        case RequestHttpEnum.PUT:
            return put

        case RequestHttpEnum.DELETE:
            return del

        default:
            return get
    }
}
const prefix = 'javascript:'
// 对输入字符进行转义处理
export const translateStr = (target: string | Record<any, any>) => {
    if (typeof target === 'string') {
        if (target.startsWith(prefix)) {
            const funcStr = target.split(prefix)[1]
            let result
            try {
                result = new Function(`${funcStr}`)()
            } catch (error) {
                console.log(error)
                window['$message'].error('js内容解析有误！')
            }
            return result
        } else {
            return target
        }
    }
    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            const subTarget = target[key]
            target[key] = translateStr(subTarget)
        }
    }
    return target
}
