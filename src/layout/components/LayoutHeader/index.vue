<template>
    <n-layout-header  class="zc-header">
        <header class="zc-header-box">
            <div class="header-item left">
                <n-space>
                    <slot name="left"></slot>
                </n-space>
            </div>
            <div class="header-item center">
                <slot name="center"></slot>
            </div>
            <div class="header-item right">
                <n-space>
                    <slot name="ri-left"> </slot>
<!--                    <zc-lang-select></zc-lang-select>-->
<!--                    <theme-color-select></theme-color-select>-->
<!--                    <zc-theme-select></zc-theme-select>-->
                    <slot name="ri-right"> </slot>
                </n-space>
            </div>
        </header>
    </n-layout-header>
</template>

<script setup lang="ts">
import { ZcThemeSelect } from '@/components/ZcThemeSelect'
import { ZcLangSelect } from '@/components/ZcLangSelect'
import { ThemeColorSelect } from '@/components/Pages/ThemeColorSelect'
import {computed, toRefs} from "vue";
import { useDesignStore } from "@/store/modules/designStore/designStore";

</script>

<style lang="scss" scoped>
$min-width: 400px;
@include zc(header) {
    background: #1f2639;
    color: #ffffff;
    &-box {
        display: grid;
        grid-template-columns: repeat(3, 33.33%);
        .header-item {
            display: flex;
            align-items: center;
            min-width: $min-width;
            &.left {
                justify-content: start;
            }
            &.center {
                justify-content: center;
            }
            &.right {
                justify-content: end;
            }
        }
        height: $--header-height;
        padding: 0 32px 0 32px;
    }
}
</style>
