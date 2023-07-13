import { defineStore } from 'pinia'
import { SystemStoreType, UserInfoType, FetchInfoType , GlobalInfoType} from './systemStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { userInfo ,globalParamsConfig  } from "@/api/path";

const { ZHC_SYSTEM_STORE } = StorageEnum

const storageSystem: SystemStoreType = getLocalStorage(ZHC_SYSTEM_STORE)



// 系统数据记录
export const useSystemStore = defineStore({
    id: 'useSystemStore',
    state: (): SystemStoreType => storageSystem || {
        userInfo: {
            id: undefined,
            name: undefined,
            realName: undefined,
            superAdmin: undefined,
            deptName: undefined,
            deptNames: undefined,
            email: undefined,
            abbreviation: undefined,
            deptId: undefined,
            unitId: undefined,
            unitName: undefined,
            isUseSign: undefined,
            accountSuitId: undefined,
            accountSuitName: undefined,
            signaturePassword: undefined,
        },
        fetchInfo: {
            accessToken: undefined
        },
        globalInfo:{
            encryptEnable: undefined,
            projectName: undefined
        }
    },
    getters: {
        getUserInfo(): UserInfoType {
            return this.userInfo
        },
        getFetchInfo(): FetchInfoType {
            return this.fetchInfo
        },
        getGlobalInfo(): GlobalInfoType {
            return this.globalInfo
        },
    },
    actions: {
        setItem<T extends keyof SystemStoreType, K extends SystemStoreType[T]>(key: T, value: K): void {
            this.$patch(state => {
                state[key] = value
            });
            setLocalStorage(ZHC_SYSTEM_STORE, this.$state)
        },
        initApp(){
            return Promise.all([userInfo(),globalParamsConfig()]).then(([user,global]:any) => {
                if(user){
                    this.userInfo = user.data
                }
                if(global){
                    this.globalInfo = global.data
                }
                console.log(this)
                console.log(this.$state)
                setLocalStorage(ZHC_SYSTEM_STORE, this.$state)
            })
        }
    }
})
