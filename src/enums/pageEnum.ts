import { ResultEnum } from '@/enums/httpEnum'

export enum PageEnum {
    // 登录
    BASE_LOGIN = '/login',
    BASE_LOGIN_NAME = 'Login',

    //重定向
    REDIRECT = '/redirect',
    REDIRECT_NAME = 'Redirect',

    // 重载
    RELOAD = '/reload',
    RELOAD_NAME = 'Reload',

    // 首页
    BASE_HOME = '/application',
    BASE_HOME_NAME = 'application',

    APPLICATION = '/application',
    APPLICATION_NAME = 'application',

    // 错误
    ERROR_PAGE_NAME_403 = 'ErrorPage403',
    ERROR_PAGE_NAME_404 = 'ErrorPage404',
}

export const ErrorPageNameMap = new Map([
    [ResultEnum.NOT_FOUND, PageEnum.ERROR_PAGE_NAME_404],
    [ResultEnum.SERVER_FORBIDDEN, PageEnum.ERROR_PAGE_NAME_403],
])
