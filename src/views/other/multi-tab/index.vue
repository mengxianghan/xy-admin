<template>
    <div>
        <a-card title="打开">
            <a-space>
                <a-button @click="handleOpen">打开欢迎页</a-button>
            </a-space>
        </a-card>
        <a-card
            class="mt-8-2"
            title="刷新">
            <a-space>
                <a-button @click="handleReload">刷新当前</a-button>
                <span>{{ date }}</span>
            </a-space>
        </a-card>
        <a-card
            class="mt-8-2"
            title="关闭">
            <a-space>
                <a-button @click="handleClose">关闭当前</a-button>
                <a-button @click="handleCloseOther">关闭其他</a-button>
            </a-space>
        </a-card>
        <a-card
            class="mt-8-2"
            title="设置">
            <a-space>
                <a-input v-model:value="title"></a-input>
                <a-button @click="handleSetTitle">设置标题</a-button>
                <a-button @click="handleRevertTitle">还原</a-button>
            </a-space>
        </a-card>
    </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMultiTab } from '@/hooks'

defineOptions({
    name: 'otherMultiTab',
})

const router = useRouter()
const { reload, close, closeOther, setTitle } = useMultiTab()
const date = ref('')
const title = ref('自定义名称')

onMounted(() => {
    date.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
})

/**
 * 打开欢迎页
 */
function handleOpen() {
    router.push({ name: 'welcome' })
}

/**
 * 刷新当前
 */
function handleReload() {
    reload()
}

/**
 * 关闭
 */
function handleClose() {
    close()
}

/**
 * 关闭其他
 */
function handleCloseOther() {
    closeOther()
}

/**
 * 设置标题
 */
function handleSetTitle() {
    setTitle(title.value)
}

/**
 * 还原标题
 */
function handleRevertTitle() {
    setTitle(router.currentRoute.value.meta?.title)
}
</script>

<style lang="less" scoped></style>
