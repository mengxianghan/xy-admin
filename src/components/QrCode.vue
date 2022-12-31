<template>
    <img ref="imgRef" />
</template>

<script>
export default {
    name: 'XQrCode',
}
</script>

<script setup>
import { ref, toRefs, onMounted, watch } from 'vue'

import QRCode from 'qrcode'

/**
 * 二维码
 * @property {string} text 内容
 * @property {number} size 大小，默认：100
 * @property {string} logo logo
 * @property {number} logoSize logo 大小，默认：30
 * @property {number} logoPadding logo 间距，默认：5
 * @property {steing} logoBackgroundColor logo 背景色，默认：transparent
 * @property {string} colorDark 背景色
 * @property {string} colorLight 前景色
 * @property {string} errorCorrectionLevel 容错级别，默认：M，【L=low, M=medium, Q=quartile, H=high】
 * @property {number} margin 安静区宽度，默认：2
 */
const props = defineProps({
    text: {
        type: String,
        required: true,
        default: '',
    },
    size: {
        type: Number,
        default: 100,
    },
    logo: {
        type: String,
        default: '',
    },
    logoSize: {
        type: Number,
        default: 30,
    },
    logoPadding: {
        type: Number,
        default: 5,
    },
    logoBackgroundColor: {
        type: String,
        default: '',
    },
    colorDark: {
        type: String,
        default: '#000000',
    },
    colorLight: {
        type: String,
        default: '#ffffff',
    },
    errorCorrectionLevel: {
        type: String,
        default: 'M',
    },
    margin: {
        type: Number,
        default: 2,
    },
})

const emit = defineEmits(['ready'])

const qrcode = ref(null)
const imgRef = ref()

watch(
    () => toRefs(props),
    () => {
        draw()
    },
    {
        deep: true,
    }
)

onMounted(() => {
    draw()
})

/**
 * 创建二维码
 * @return {Promise<unknown>}
 */
async function build() {
    return new Promise((resolve) => {
        ;(async () => {
            const canvas = await QRCode.toCanvas(props.text, {
                width: props.size,
                color: {
                    dark: props.colorDark,
                    light: props.colorLight,
                },
                errorCorrectionLevel: props.errorCorrectionLevel,
                margin: props.margin,
            })
            qrcode.value = canvas
            resolve()
        })()
    })
}

/**
 * 绘制 Logo
 * @return {Promise<unknown>}
 */
async function drawLogo() {
    return new Promise((resolve) => {
        let img = new Image()
        img.src = props.logo
        const logoPos = (props.size - props.logoSize) / 2
        const rectSize = props.logoSize + props.logoPadding
        const rectPos = (props.size - rectSize) / 2
        let ctx = qrcode.value.getContext('2d')
        img.onload = () => {
            // logo 背景色
            if (props.logoBackgroundColor) {
                ctx.fillStyle = props.logoBackgroundColor
                ctx.fillRect(rectPos, rectPos, rectSize, rectSize)
            }
            ctx.drawImage(img, logoPos, logoPos, props.logoSize, props.logoSize)
            resolve()
        }
    })
}

/**
 * 绘制
 * @return {Promise<void>}
 */
async function draw() {
    await build()
    if (props.logo) {
        await drawLogo()
    }
    imgRef.value.src = qrcode.value.toDataURL('image/png')
    emit('ready')
}
</script>

<style scoped></style>
