import axios, { AxiosResponse, AxiosRequestConfig, Axios } from 'axios'
import { ResultEnum } from "@/enums/httpEnum"
import { PageEnum, ErrorPageNameMap } from "@/enums/pageEnum"
import { StorageEnum } from '@/enums/storageEnum'
import { redirectErrorPage, getLocalStorage, routerTurnByName ,getGlobalParamConfig } from '@/utils'
import isPlainObject from 'lodash/isPlainObject'
import { aesDecode, aesEncode, generateKey, rsaDecode, rsaEncode,reviver } from './encrypt'
import qs from 'qs'
import router from "@/router";
import { parse } from 'lossless-json'
import { Reviver } from "lossless-json/lib/types/types";
import { useSystemStore } from '@/store/modules/systemStore/systemStore'


export interface MyResponseType<T> {
    code: ResultEnum
    data: T
    message: string
}

export interface MyRequestInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>>
}

const axiosInstance = axios.create({
    baseURL: window.SITE_CONFIG.apiURL ,
    timeout: ResultEnum.TIMEOUT,
}) as unknown as MyRequestInstance

/**
 * 请求拦截
 */

const Urls = [
    '/auth/oauth/token',
    '/bpm/task/getBackActivity',
    '/bpm/task/addSynergy',
    '/bpm/task/backPreviousTask'
]

axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 获取 token

        const systemStore = useSystemStore()
        const info = getLocalStorage(StorageEnum.ZHC_SYSTEM_STORE)
        // 重新登录
        var defaults = {}
        config.headers = {
            ...config.headers,
            "X-Requested-With":'XMLHttpRequest',
            "Request-Start": new Date().getTime(),
        }
        if (info && config.url !== "/auth/oauth/token") {
            config.headers["Authorization"] = "Bearer " +  info.fetchInfo.accessToken
        }

        let encrypt = systemStore.getGlobalInfo?.encryptEnable
        if(encrypt == null){
            encrypt = true;
        }
        // @ts-ignore
        if (encrypt && !Urls.includes(config.url)) {
            let key = generateKey()
            let data = JSON.stringify(config.data)
            data = aesEncode(data, key)
            config.data = {}
            config.data.data = data
            let encodeAesKey = rsaEncode(key);
            config.headers['x-magic-front-header'] = encodeAesKey
        }
        if (isPlainObject(config.params)) {
            config.params = {
                ...defaults,
                ...config.params
            }
        }
        if (isPlainObject(config.data)) {
            config.data = {
                ...defaults,
                ...config.data
            }
            const header:any = config.headers['content-type']
            if (/^application\/x-www-form-urlencoded/.test(header)) {
                config.data = qs.stringify(config.data)
            }
        }
        return config
    },
    (err: AxiosRequestConfig) => {
        Promise.reject(err)
    }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
        const { code } = res.data as { code: number }

        if (code === undefined || code === null) return Promise.resolve(res)

        // 成功

        if (code === ResultEnum.SUCCESS) {
            let data = res.data.data;
            let key=res.headers['x-magic-header']
            if( key && key != null) {
                key = rsaDecode(key)
                let decodeData = aesDecode(data, key)
                res.data.data = parse(decodeData,reviver)
            }
            return Promise.resolve(res.data)
        }
        // 登录过期
        if (code === ResultEnum.TOKEN_OVERDUE) {
            window['$notification'].error(window['$t']('http.token_overdue_message'))
            routerTurnByName(PageEnum.BASE_LOGIN_NAME)
            return Promise.resolve(res.data)
        }

        if (ErrorPageNameMap.get(code)) {
            redirectErrorPage(code)
            return Promise.resolve(res.data)
        }
        // 提示错误
        if(res.data.code == 401){
            redirectLogin()
        }


        return Promise.resolve(res.data)
    },
    (err: AxiosResponse) => {
        Promise.reject(err)
    }
)
const redirectLogin = () => {
    router.replace("/login");
    return;
};

export default axiosInstance
