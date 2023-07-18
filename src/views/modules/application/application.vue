<template>
    <div class="zc-application">
        <div class="nav">
            <div class="back-img"></div>
            <div class="back-color"></div>
            <n-input-group>
                <n-input v-model:value="filterText" placeholder="请输入内容" size="large"></n-input>
                <n-button type="primary" size="large">
                    搜索
                </n-button>
            </n-input-group>
        </div>
        <div class="content">
            <n-card v-for="item in filterData.value" class="card-view" :style="itemBackground(item)" :key="item.id" @click.capture="goZHC(item)">
                <div class="card-view-title">
                    <div class="icon" :style="{ background:item.appIconColor }" :class="item.icon"></div>
                    <div class="about">{{ item.description }}</div>
                </div>
                <div class="card-view-name">
                    {{ item.name }}
                </div>
            </n-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { byUser } from '@/api/path'
import { getLocalStorage, openNewWindow } from "@/utils";
import { StorageEnum } from "@/enums/storageEnum";
import { FetchInfoEnum, SystemStoreEnum } from '@/store/modules/systemStore/systemStore.d'
import { http } from "@/api/http";
import { RequestHttpEnum } from "@/enums/httpEnum";
import { useSystemStore } from "@/store/modules/systemStore/systemStore";
import { MD5 } from "crypto-js";

const filterText =  ref<any>('')
const menuList = ref<any>([])
const filterData = computed(() => {
    return filterText.value ? menuList.value.filter((item: any) => item.name.indexOf(filterText.value) != -1 ) : menuList
})
const systemStore = useSystemStore()



const itemBackground = computed(() => (item: any) => {
    return {
        '--n-color': item.appIconColor + '1A'
    }
})
const getByUser = async () => {
    const res: any = await byUser()
    if (res && res.code == 0) {
        menuList.value = res.data
    }
}
getByUser()

const goZHC = (item:any) => {
    // 内部
    if(item.type == 0){
        if(item.url.indexOf(window.SITE_CONFIG.zhcURL) != -1){``
            const info =  getLocalStorage(StorageEnum.ZHC_SYSTEM_STORE)
            openNewWindow( window.SITE_CONFIG.zhcURL + '/#/?access_token=' + info[SystemStoreEnum.FETCH_INFO][FetchInfoEnum.ACCESS_TOKEN])
        }else {
            openNewWindow(item.url)
        }
    } else if(item.type == 1){
        try {
            let params = JSON.parse("{}")
            if(item.params){
               params = JSON.parse(item.params)
            }
            params.accountName = systemStore.getUserInfo.username
            params.email = systemStore.getUserInfo.email
            let timestamp = Date.now();
            let secret = item.secret;
            let signature = MD5(timestamp+","+secret+","+params).toString()
            http(RequestHttpEnum.POST)(item.url,params,{'Timestamp':timestamp,'signature':signature}).then(res => {
                if (res.code != 0) {
                    return window['$notification'].error({
                        content: res.message,
                        meta: '错误',
                        duration: 2500,
                        keepAliveOnHover: true
                    })
                }
              // @ts-ignore
              openNewWindow(res.redirectUrl+'?token=' + res.token+'&sessionId=' + res.sessionId+'&userName=' + systemStore.getUserInfo.username)
            })
        } catch (error) {
            console.log(error)
            window['$notification'].error({
                content: '请重新配置携带参数',
                meta: '错误',
                duration: 2500,
                keepAliveOnHover: true
            })
        }
    } else if(item.type == 2){
        http(RequestHttpEnum.GET)('/sys/externalApplication/getSSOURL',{  IP: item.ip, domainName: item.domainName, apiSecret: item.apiSecret }).then(res => {
            if (res.code !== 0) {
                return
            }
            openNewWindow(res.data);
        })
    }else if(item.type == 3){
      try {
        let params = JSON.parse("{}")
        if(item.params){
          params = JSON.parse(item.params)
        }
        let userName = systemStore.getUserInfo.username
        var strSysDatetime = Math.floor(Date.now() / 1000);


        // 公钥
        let publicKey = item.publicKey;
        if(item.publicKey){
          publicKey = item.publicKey;
        }else{
          publicKey = "HJEHR";
        }
        let signature = MD5(params.userName+publicKey+params.strSysDatetime).toString()
        openNewWindow(item.url+'?verify=' + signature+'&userName=' + userName +'&strSysDatetime=' + strSysDatetime)
      } catch (error) {
        console.log(error)
        window['$notification'].error({
          content: '请重新配置携带参数',
          meta: '错误',
          duration: 2500,
          keepAliveOnHover: true
        })
      }
    } else {
        window['$notification'].error({
            content: '请联系管理员配置类型',
            meta: '错误',
            duration: 2500,
            keepAliveOnHover: true
        })
    }
}
</script>

<style lang="scss" scoped>
@include zc(application) {
    .nav {
        height: 38vh;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 25vw;
        margin-bottom: 40px;
        
        .back-color, .back-img {
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            height: 100%;
        }
        
        .back-color {
            background-color: #336fcf9e;
        }
        
        .back-img {
            background-image: url("@/assets/images/home/nav-back.jpg");
            background-size: cover;
            z-index: 0;
        }
        
        .el-input-group {
            margin-top: 54px;
        }
    }
    .content {
        min-height: 45vh;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-auto-rows: 200px;
        gap: 60px;
        padding: 0 80px;
    }
    .card-view {
        cursor: pointer;
        height: 150px;
        
        :deep(.n-card__content) {
            gap: 20px;
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;
        }
        
        &-title {
            display: flex;
            gap: 20px;
            
            .icon {
                color: #fff;
                box-sizing: border-box;
                width: 40px;
                height: 40px;
                font-size: 25px;
                line-height: 40px;
                text-align: center;
                border-radius: 5.4px;
            }
            
            .about {
                color: #999;
                font-size: 12px;
                white-space: pre-wrap;
                word-wrap: break-word;
                line-height: 14px;
                padding-top: 10px;
            }
            
        }
        
        &-name {
            font-weight: 400;
            font-size: 20px;
            line-height: 20px;
        }
    }
}
</style>

