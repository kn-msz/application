<template>
    <n-config-provider
        :theme="darkTheme"
        :hljs="hljsTheme"
        :locale="locale"
        :date-locale="dateLocale"
        :theme-overrides="overridesTheme"
    >
        <zc-app-provider>
            <I18n></I18n>
            <router-view></router-view>
        </zc-app-provider>
    </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { ZcAppProvider } from '@/components/ZcAppProvider'
import { I18n } from '@/components/I18n'
import { useSystemInit, useDarkThemeHook, useThemeOverridesHook, useCode, useLang } from '@/hooks'

// 暗黑主题
const darkTheme = useDarkThemeHook()

// 主题配置
const overridesTheme = useThemeOverridesHook()

// 代码主题
const hljsTheme = useCode()

// 系统全局数据初始化
useSystemInit()

// 全局语言
const { locale, dateLocale } = useLang()

</script>
