import {defineStore} from 'pinia'
import { RouterStoreType } from './routerStore.d'
export const useRouterStore = defineStore({
    id: 'useRouterStore',
    state: (): RouterStoreType => ({
        menus: [],
        permissions: [],
        dicts:[],
        router:[],
        routeMeta:{},
        routeList:[],
    }),
    getters: {
        getRouter(): Array<object> {
            return this.router
        },
    },
})
