<template>
    <layout-header>
        <template #left>
            <slot name="left">
                <div @click="goHome" class="logo">
                    <img src="@/assets/images/home/header.png" class="logo-image">
                    <h2>应用中心</h2>
                </div>
            </slot>
        </template>
        <template #center>
            <slot name="center"></slot>
        </template>
        <template #ri-left>
            <slot name="ri-left"></slot>
        </template>
        <template #ri-right>
            <zc-user-info></zc-user-info>
            <slot name="ri-right"></slot>
        </template>
    </layout-header>
</template>
<script setup lang="ts">
import { LayoutHeader } from '@/layout/components/LayoutHeader'
import { ZcUserInfo } from '@/components/ZcUserInfo'

import {PageEnum} from '@/enums/pageEnum'
import {routerTurnByName} from '@/utils'

function goHome() {
    routerTurnByName(PageEnum.APPLICATION_NAME)
}
</script>


<style lang="scss" scoped>
.logo{
    display: flex;
    cursor: pointer;
    gap: 10px;
    align-items: center;
    .logo-image{
        width: 30px;
        height: 30px;
    }
}
</style>
