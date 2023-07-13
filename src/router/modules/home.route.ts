import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
    'PageEnum.BASE_HOME_NAME': () => import('@/views/modules/home.vue')
}

const homeRoutes: RouteRecordRaw = {
    path: PageEnum.BASE_HOME,
    name: PageEnum.BASE_HOME_NAME,
    component: importPath['PageEnum.BASE_HOME_NAME'],
    meta: {
        title: '首页',
    }
}


export default homeRoutes
