<template>
    <n-layout  position="absolute">
        <layout-header-pro></layout-header-pro>
        <n-layout position="absolute" style="top: 50px">
            <layout-transition-main>
                <router-view></router-view>
            </layout-transition-main>
        </n-layout>
    </n-layout>
   
</template>

<script setup lang="ts">
import { LayoutHeaderPro } from '@/layout/components/LayoutHeaderPro'
import { LayoutTransitionMain } from '@/layout/components/LayoutTransitionMain/index'
import { goDialog } from '@/utils'

</script>
