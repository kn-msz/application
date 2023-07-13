import { RouteRecordRaw } from 'vue-router'
import type { AppRouteRecordRaw } from '@/router/types';
import { ErrorPage404, ErrorPage403, RedirectHome } from '@/router/constant';
import { PageEnum } from '@/enums/pageEnum'
import { ZcReload } from '@/components/ZcReload'


export const LoginRoute: RouteRecordRaw = {
    path: PageEnum.BASE_LOGIN,
    name: PageEnum.BASE_LOGIN_NAME,
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: '登录',
    },
};

export const HttpErrorPage: RouteRecordRaw[] = [
    {
        path: '/error/404',
        name: PageEnum.ERROR_PAGE_NAME_404,
        component: ErrorPage404,
        meta: {
            title: PageEnum.ERROR_PAGE_NAME_404,
        },
    },
    {
        path: '/error/403',
        name: PageEnum.ERROR_PAGE_NAME_403,
        component: ErrorPage403,
        meta: {
            title: PageEnum.ERROR_PAGE_NAME_403,
        },
    },
    // {
    //     path: '/error/500',
    //     name: PageEnum.ERROR_PAGE_NAME_500,
    //     component: ErrorPage500,
    //     meta: {
    //         title: PageEnum.ERROR_PAGE_NAME_500,
    //     },
    // },
]

export const ReloadRoute: AppRouteRecordRaw = {
    path: PageEnum.RELOAD,
    name: PageEnum.RELOAD_NAME,
    component: ZcReload,
    meta: {
        title: PageEnum.RELOAD_NAME,
    },
}

export const RedirectRoute: RouteRecordRaw[] = [
    {
        path: PageEnum.REDIRECT,
        name: PageEnum.REDIRECT_NAME,
        component: RedirectHome,
        meta: {
            title: PageEnum.REDIRECT_NAME,
        },
    },
]
