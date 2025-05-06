<script setup>
import { useConfigProvider } from '@/hooks'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const { configProviderAttrs } = useConfigProvider()
</script>

<template>
  <a-config-provider v-bind="configProviderAttrs">
    <router-view />
  </a-config-provider>
</template>

<style lang="less"></style>
