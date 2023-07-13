<template>
    <div class="zc-login-box">
        <div class="zc-login-box-bg" :style="backgroundStyle"></div>
        <div class="zc-login">
            <div class="zc-login-carousel"></div>
            <div class="login-account">
                <div class="login-account-container">
                    <n-collapse-transition :appear="true" :show="show">
                        <n-card class="login-account-card">
                            <template #header>
                                <h2>{{ captchaData.brandTitle }}</h2>
                            </template>
                            <n-tabs type="line" animated>
                                <n-tab-pane name="username" :tab="$t('login.form_username')">
                                    <n-form
                                        @keyup.enter.passive="handleSubmit"
                                        ref="formRef"
                                        label-placement="left"
                                        size="large"
                                        :model="dataForm"
                                        :rules="rules"
                                    >
                                        <n-form-item path="username">
                                            <n-input
                                                v-model:value="dataForm.username"
                                                :placeholder="$t('global.form_account')"
                                            >
                                                <template #prefix>
                                                    <n-icon size="18">
                                                        <PersonOutlineIcon></PersonOutlineIcon>
                                                    </n-icon>
                                                </template>
                                            </n-input>
                                        </n-form-item>
                                        <n-form-item path="password">
                                            <n-input
                                                v-model:value="dataForm.password"
                                                type="password"
                                                show-password-on="click"
                                                :placeholder="$t('global.form_password')"
                                            >
                                                <template #prefix>
                                                    <n-icon size="18">
                                                        <LockClosedOutlineIcon></LockClosedOutlineIcon>
                                                    </n-icon>
                                                </template>
                                            </n-input>
                                        </n-form-item>
                                        <n-form-item path="captcha" v-if="captchaData.show">
                                            <n-space>
                                                <n-input
                                                    v-model:value="dataForm.captcha"
                                                    :placeholder="$t('global.form_captcha')"
                                                >
                                                    <template #prefix>
                                                        <n-icon size="18">
                                                            <LockClosedOutlineIcon></LockClosedOutlineIcon>
                                                        </n-icon>
                                                    </template>
                                                </n-input>
                                                <img :src="captchaData.url" alt="" @click="getCaptcha"
                                                     style="vertical-align: middle;height: 40px; cursor: pointer;">
                                            </n-space>
                                        </n-form-item>
                                        <n-form-item>
                                            <n-button type="primary" @click="handleSubmit" size="large"
                                                      :loading="loading" block>{{ $t('login.form_button') }}
                                            </n-button>
                                        </n-form-item>
                                    </n-form>
                                </n-tab-pane>
                            </n-tabs>
                        </n-card>
                    </n-collapse-transition>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { reactive, ref, onMounted  } from "vue";
import { icon } from '@/plugins'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import {  SystemStoreEnum } from '@/store/modules/systemStore/systemStore.d'
import { routerTurnByName } from '@/utils'
import { PageEnum } from '@/enums/pageEnum'
import { loginApi, captcha , backGroundImg } from '@/api/path'
import { getUuid } from '@/utils'
import backgroundImage from '@/assets/images/login/backgroundImg.jpg'

const systemStore = useSystemStore()
const {PersonOutlineIcon, LockClosedOutlineIcon} = icon.ionicons5
const formRef = ref()
const autoLogin = ref(true)
const loading = ref(false)
const show = ref(false)
const t = window['$t']
const captchaData = reactive({
    url: '',
    show: false,
    brandTitle: '',
})

const backgroundStyle = reactive({
    backgroundImage: '',
    backgroundRepeat: "no-repeat",
    // backgroundSize: "100% 100%",
    backgroundSize: "cover",
    marginTop: "0px",
    height: "100%"
})

const dataForm = reactive({
    username: "",
    password: "",
    captcha: "",
    uuid: "",
    grant_type: "password",
    isLoginQRcode: 1
})

const rules = {
    username: {
        required: true,
        message: t('global.form_account'),
        trigger: 'blur',
    },
    password: {
        required: true,
        message: t('global.form_password'),
        trigger: 'blur',
    },
    captcha: {
        required: true,
        message: t('global.form_captcha'),
        trigger: 'blur',
    },
}

const getCaptcha = async () => {
    dataForm.uuid = getUuid();
    const res: any = await captcha(dataForm.uuid)
    if (res && res.config) {
        captchaData.url = window.SITE_CONFIG['apiURL'] + res.config['url']
        captchaData.show = res.headers['is-show-captcha'] === 'true'
        captchaData.show = false
        if (res.headers['brand-title']) {
            captchaData.brandTitle = decodeURI(res.headers['brand-title'])
        }
        
    }
}
const checkImg = (url:string)  => {
    var imgObj = new Image();
    imgObj.src = url;
    imgObj.onload = () => {
        backgroundStyle.backgroundImage =`url(${url})`
    }
    imgObj.onerror = () =>{
        backgroundStyle.backgroundImage = `url(${backgroundImage})`
    }
}
const getBackGroundImg = async ()=>{
    const res: any = await backGroundImg()
    if(res && res.code == 0){
        if(res.data.path){
            let url = res.data.path.split('/')
            url = window.SITE_CONFIG['apiURL'] +'/fileView/static/' + url[url.length-2]  +'/'+  url[url.length-1]
            checkImg(url)
        }else {
            backgroundStyle.backgroundImage = `url(${backgroundImage})`
        }
    }
}

const handleSubmit = async () => {
    formRef.value.validate(async (err: any) => {
        if (!err) {
            loading.value = true
            const res: any = await loginApi(dataForm)
            if (res && res.code == 0) {
                const { access_token } = res
                systemStore.setItem(SystemStoreEnum.FETCH_INFO, {
                    accessToken: access_token,
                    t
                })
                window['$message'].success(t('login.login_success'))
                routerTurnByName(PageEnum.APPLICATION_NAME, true)
                
            } else {
                window['$notification'].error({
                    title:'登录失败',
                    content: res.msg,
                })
                await getCaptcha()
            }
            loading.value = false
        }
    })
}

getCaptcha()
getBackGroundImg()
onMounted(() => {
    setTimeout(() => {
        show.value = true
    }, 300)
})
</script>

<style lang="scss" scoped>
$width: 450px;
$zc-login-height: 100vh;
$account-img-height: 210px;
$footer-height: 50px;
$carousel-width: 30%;
$carousel-image-height: 60vh;

* {
    box-sizing: border-box;
}

@include zc(login-box) {
    height: $zc-login-height;
    overflow: hidden;
    @include background-image('background-image');
    
    
    &-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        height: $--header-height;
    }
    &-divider {
        margin: 0;
        padding-top: 0;
    }
    @include zc(login) {
        z-index: 2;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: -$--header-height;
        height: $zc-login-height;
        width: 100vw;
        &-carousel {
            width: $carousel-width;
            margin-top: 100px;
            min-width: 500px;
            
            &-img {
                display: block;
                margin: 0 auto;
                height: $carousel-image-height;
            }
        }
        .login-account {
            display: flex;
            flex-direction: column;
            margin: 0 160px;
            
            &-container {
                width: $width;
            }
            
            &-card {
                .n-card-header {
                    h2 {
                        text-align: center;
                    }
                }
                
                @extend .zc-background-filter;
                @include fetch-bg-color('filter-color');
                box-shadow: 0 0 20px 5px rgba(40, 40, 40, 0.3);
                
                .n-tab-pane {
                    padding: 75px 0;
                }
                
                .qrcode {
                    display: block;
                    width: 200px;
                    height: 200px;
                    margin: 32px auto;
                }
            }
            
            &-top {
                padding-top: 10px;
                text-align: center;
                height: $account-img-height;
                margin-bottom: 20px;
            }
        }
    }
    &-footer {
        z-index: 2;
        position: fixed;
        width: 100%;
        bottom: 0;
    }
    &-bg {
        z-index: 0;
        position: fixed;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100vw;
        height: 100vh;
        //background-image: url('@/assets/images/login/login-bg.png');
        background-size: cover;
        background-repeat: no-repeat;
        
        .bg-slot {
            width: $carousel-width;
        }
        
        .bg-img-box {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            width: 770px;
            margin-right: -20px;
            
            &-li {
                img {
                    margin-right: 20px;
                    margin-top: 20px;
                    width: 230px;
                    border-radius: 2 * $--border-radius-base;
                    opacity: 0.9;
                }
            }
        }
    }
    
}

@media only screen and (max-width: 1200px) {
    .bg-img-box,
    .bg-slot,
    .zc-login-carousel {
        display: none !important;
    }
    .zc-login-box-footer {
        position: relative;
    }
}

</style>
