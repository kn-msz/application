<template>
    <div class="zc-error">
        <n-card text class="text">
            <h1>Error 404</h1>
        </n-card>
        <!--        <n-button type="primary" @click="goHome">回到首页</n-button>-->
    </div>
</template>

<script lang="ts" setup>
import {PageEnum} from '@/enums/pageEnum'
import {routerTurnByName} from '@/utils'

function goHome() {
    routerTurnByName(PageEnum.BASE_HOME_NAME)
}
</script>

<style lang="scss" scoped>
@include zc(error) {
    @include background-image('background-image');
    display: table;
    width: 100%;
    height: 100vh;
    text-align: center;
    .text {
        display: table-cell;
        vertical-align: middle;
        @include background-image('color');
    
    
        h1 {
            font-size: 50px;
            display: inline-block;
            padding-right: 12px;
            animation: type .5s alternate infinite;
        }
    }
    
    @keyframes type {
        from {
            box-shadow: inset -3px 0px 0px #888;
        }
        to {
            box-shadow: inset -3px 0px 0px transparent;
        }
    }
}
</style>
