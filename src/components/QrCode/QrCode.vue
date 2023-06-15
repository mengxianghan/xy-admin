<template>
    <div
        class="x-qrcode"
        :style="{
            width: `${size}px`,
            height: `${size}px`,
        }">
        <template v-if="'active' !== status">
            <div class="x-qrcode__mask">
                <template v-if="'loading' === status">
                    <a-spin></a-spin>
                </template>
                <template v-if="'expired' === status">
                    <div>二维码已过期</div>
                    <a-button
                        type="link"
                        class="x-qrcode__reload-btn"
                        @click="handleRefresh">
                        <template #icon>
                            <reload-outlined></reload-outlined>
                        </template>
                        点击刷新
                    </a-button>
                </template>
            </div>
        </template>
        <canvas ref="qrCodeRef"></canvas>
    </div>
</template>

<script setup>
import QRCode from 'qrcode'
import { onMounted, ref, toRefs, watch } from 'vue'

import { ReloadOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'XQrCode',
})
/**
 * 二维码
 * @property {string} value 内容
 * @property {number} size 大小。默认：120
 * @property {string} color 颜色。默认：#000
 * @property {string} backgroundColor 背景色。默认：#fff
 * @property {string} icon icon 的地址（目前只支持图片地址）
 * @property {number} iconSize icon 的大小。默认：30
 * @property {number} iconPadding icon 间距。默认：0
 * @property {string} iconBackgroundColor icon 背景色
 * @property {string} errorLevel 纠错等级。默认：M，【L=low, M=medium, Q=quartile, H=high】
 * @property {string} status 状态，【active=有效，loading=加载中，expired=已过期】
 */
const props = defineProps({
    value: {
        type: String,
        required: true,
        default: '',
    },
    size: {
        type: Number,
        default: 120,
    },
    color: {
        type: String,
        default: '#000',
    },
    backgroundColor: {
        type: String,
        default: '#fff',
    },
    icon: {
        type: String,
        default: '',
    },
    iconSize: {
        type: Number,
        default: 30,
    },
    iconPadding: {
        type: Number,
        default: 0,
    },
    iconBackgroundColor: {
        type: String,
        default: '',
    },
    errorLevel: {
        type: String,
        default: 'M',
    },
    status: {
        type: String,
        default: 'active',
    },
})

const emit = defineEmits(['refresh'])

const qrCodeRef = ref()

watch(
    () => toRefs(props),
    () => {
        init()
    },
    {
        deep: true,
    }
)

onMounted(() => {
    init()
})

/**
 * 初始化
 * @return {Promise<void>}
 */
async function init() {
    await renderQRCode()
    if (props.icon) {
        await renderIcon()
    }
    emit('ready', qrCodeRef.value)
}

/**
 * 渲染二维码
 * @return {Promise<unknown>}
 */
async function renderQRCode() {
    return new Promise((resolve) => {
        ;(async () => {
            await QRCode.toCanvas(qrCodeRef.value, props.value, {
                width: props.size,
                color: {
                    dark: props.color,
                    light: props.backgroundColor,
                },
                errorCorrectionLevel: props.errorLevel,
                margin: 0,
            })
            resolve()
        })()
    })
}

/**
 * 渲染 icon
 * @return {Promise<unknown>}
 */
async function renderIcon() {
    return new Promise((resolve) => {
        let img = new Image()
        img.src = props.icon
        const logoPos = (props.size - props.iconSize) / 2
        const rectSize = props.iconSize + props.iconPadding
        const rectPos = (props.size - rectSize) / 2
        let ctx = qrCodeRef.value.getContext('2d')
        img.onload = () => {
            if (props.iconBackgroundColor) {
                ctx.fillStyle = props.iconBackgroundColor
                ctx.fillRect(rectPos, rectPos, rectSize, rectSize)
            }
            ctx.drawImage(img, logoPos, logoPos, props.iconSize, props.iconSize)
            resolve()
        }
    })
}

/**
 * 刷新
 */
function handleRefresh() {
    emit('refresh')
}

/**
 * 转换成 data URI
 * @returns {Promise<*>}
 */
async function toDataURL() {
    return qrCodeRef.value.toDataURL('image/png')
}

defineExpose({
    toDataURL,
})
</script>

<style lang="less" scoped>
.x-qrcode {
    position: relative;

    &__mask {
        background: rgba(255, 255, 255, 0.96);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .ant-spin {
            line-height: 1;
        }
    }
}
</style>
