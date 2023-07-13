import { Router } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum'
import { loginCheck } from '@/utils'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'


// 路由白名单
const routerAllowList = [
    // 登录
    PageEnum.BASE_LOGIN_NAME,
]

interface dynamicRouteParams {
    path: string;
    query?: IObject;
    mete?: IObject;
}

export function createRouterGuards(router: Router) {

    // 前置
    router.beforeEach(async (to:any, from, next) => {
        const Loading = window['$loading'];

        const routerStore = useSystemStore()

        Loading && Loading.start();
        const isErrorPage = router.getRoutes().findIndex((item) => item.name === to.name);
        if (isErrorPage === -1) {
            next({ name: PageEnum.ERROR_PAGE_NAME_404 })
        }

        if(!routerAllowList.includes(to.name)){
            await routerStore.initApp()
            if(!loginCheck()){
                next({ name: PageEnum.BASE_LOGIN_NAME })

            }
        }
        next()
    })
    router.afterEach((to, _, failure) => {
        const Loading = window['$loading'];
        document.title = (to?.meta?.title as string) || document.title;
        Loading && Loading.finish();
    })

    // 错误
    router.onError((error) => {
        console.log(error, '路由错误');
    });
}
