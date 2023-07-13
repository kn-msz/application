import { useRoute   } from 'vue-router'
import { ResultEnum, RequestHttpHeaderEnum } from '@/enums/httpEnum'
import { ErrorPageNameMap, PageEnum } from '@/enums/pageEnum'
import { SystemStoreEnum } from '@/store/modules/systemStore/systemStore.d'
import { StorageEnum } from '@/enums/storageEnum'
import { clearLocalStorage, getLocalStorage, clearCookie } from './storage'
import router from '@/router'
import { logoutApi } from '@/api/path'

/**
 * * 根据名字跳转路由
 * @param pageName
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByName = (
    pageName: string,
    isReplace?: boolean,
    windowOpen?: boolean
) => {
    if (windowOpen) {
        const path = fetchPathByName(pageName, 'href')
        openNewWindow(path)
        return
    }
    if (isReplace) {
        router.replace({
            name: pageName,
        })
        return
    }
    router.push({
        name: pageName,
    })
}

/**
 * * 根据名称获取路由信息
 * @param pageName
 * @param pageName
 */
export const fetchPathByName = (pageName: string, p?: string) => {
    try {
        const pathData = router.resolve({
            name: pageName,
        })
        return p ? (pathData as any)[p] : pathData
    } catch (error) {
        window['$message'].warning('查询路由信息失败，请联系管理员！')
    }
}

/**
 * * 根据路径跳转路由
 * @param path
 * @param query
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByPath = (
    path: string,
    query?: Array<string | number>,
    isReplace?: boolean,
    windowOpen?: boolean
) => {
    let fullPath = ''
    if (query?.length) {
        fullPath = `${path}/${query.join('/')}`
    }
    if (windowOpen) {
        return openNewWindow(fullPath)
    }
    if (isReplace) {
        router.replace({
            path: fullPath,
        })
        return
    }
    router.push({
        path: fullPath,
    })
}


/**
 * * 错误页重定向
 * @param icon
 * @returns
 */
export const redirectErrorPage = (code: ResultEnum) => {
    if (!code) return false
    const pageName = ErrorPageNameMap.get(code)
    if (!pageName) return false
    routerTurnByName(pageName)
}

/**
 * * 重新加载当前路由页面
 */
export const reloadRoutePage = () => {
    routerTurnByName(PageEnum.RELOAD_NAME)
}

/**
 * * 退出登录
 */
export const logout = async () => {
    try {
        const res = await logoutApi()
        if(res && res.code === ResultEnum.SUCCESS) {
            window['$message'].success(window['$t']('global.logout_success'))
            clearCookie(RequestHttpHeaderEnum.COOKIE)
            clearLocalStorage(StorageEnum.ZHC_SYSTEM_STORE)
            routerTurnByName(PageEnum.BASE_LOGIN_NAME)
        }
    } catch (error) {
        window['$message'].success(window['$t']('global.logout_failure'))
    }
}

/**
 * * 新开页面
 * @param url
 */
export const openNewWindow = (url: string) => {
    return window.open(url, '_blank')
}

/**
 * * 获取当前路由下的参数
 * @returns object
 */
export const fetchRouteParams = () => {
    try {
        const route = useRoute()
        return route.params
    } catch (error) {
        window['$message'].warning('查询路由信息失败，请联系管理员！')
    }
}

/**
 * * 通过硬解析获取当前路由下的参数
 * @returns object
 */
export const fetchRouteParamsLocation = () => {
    try {
        let id = document.location.hash
        if(document.location.hash.indexOf('access_token') != -1){
            id = id.split('?')[0]
        }
        return id.split('/').pop() || ''
    } catch (error) {
        window['$message'].warning('查询路由信息失败，请联系管理员！')
        return ''
    }
}

/**
 * * 回到主页面
 * @param confirm
 */
export const goHome = () => {
    routerTurnByName(PageEnum.BASE_HOME_NAME)
}

/**
 * * 判断是否登录
 * @return boolean
 */
export const loginCheck = () => {
    try {
        const info = getLocalStorage(StorageEnum.ZHC_SYSTEM_STORE)
        if (!info) return false
        if (info[SystemStoreEnum.FETCH_INFO]['accessToken']) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
}
