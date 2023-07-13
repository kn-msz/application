import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
    'PageEnum.APPLICATION_NAME': () => import('@/views/modules/application/application.vue')
}

const homeRoutes: RouteRecordRaw = {
    path: PageEnum.APPLICATION,
    name: PageEnum.APPLICATION_NAME,
    component: importPath['PageEnum.APPLICATION_NAME'],
    meta: {
        title: '应用中心',
    }
}


export default homeRoutes
