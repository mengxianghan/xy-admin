<template>
    <div
        :class="{
            'x-qrcode--bordered': bordered,
        }"
        :style="styleComputed"
        class="x-qrcode">
        <template v-if="'active' !== status">
            <div class="x-qrcode__mask">
                <template v-if="'loading' === status">
                    <a-spin></a-spin>
                </template>
                <template v-if="'expired' === status">
                    <div>二维码已过期</div>
                    <a-button
                        class="x-qrcode__reload-btn"
                        type="link"
                        @click="handleRefresh">
                        <template #icon>
                            <reload-outlined></reload-outlined>
                        </template>
                        点击刷新
                    </a-button>
                </template>
                <template v-if="'scanned' === status">
                    <a-typography-text type="success">
                        <check-outlined></check-outlined>
                        已扫描
                    </a-typography-text>
                </template>
            </div>
        </template>
        <canvas ref="qrcodeRef"></canvas>
    </div>
</template>

<script setup>
import QRCode from 'qrcode'
import { computed, onMounted, ref, toRefs, watch } from 'vue'
import { CheckOutlined, ReloadOutlined } from '@ant-design/icons-vue'

defineOptions({
    name: 'XQrcode',
})

const props = defineProps({
    value: {
        type: String,
        required: true,
        default: '',
    },
    /**
     * 边框
     */
    bordered: {
        type: Boolean,
        default: true,
    },
    /**
     * 大小。默认：120
     */
    size: {
        type: Number,
        default: 160,
    },
    /**
     * 颜色。默认：#000
     */
    color: {
        type: String,
        default: '#000',
    },
    /**
     * 背景色。默认：#fff
     */
    backgroundColor: {
        type: String,
        default: '#fff',
    },
    /**
     * icon 的地址（目前只支持图片地址）
     */
    icon: {
        type: String,
        default: '',
    },
    /**
     * icon 的大小。默认：30
     */
    iconSize: {
        type: Number,
        default: 40,
    },
    /**
     * icon 间距。默认：0
     */
    iconPadding: {
        type: Number,
        default: 0,
    },
    /**
     * icon 背景色
     */
    iconBackgroundColor: {
        type: String,
        default: '',
    },
    /**
     * 纠错等级。默认：M，【L=low, M=medium, Q=quartile, H=high】
     */
    errorLevel: {
        type: String,
        default: 'M',
    },
    /**
     * 状态，【active=有效，loading=加载中，expired=已过期，scanned=已扫描】
     */
    status: {
        type: String,
        default: 'active',
    },
    /**
     * 安全区宽度（四周留白）
     */
    margin: {
        type: Number,
        default: 12,
    },
})

const emits = defineEmits(['initialized', 'refresh'])

const qrcodeRef = ref()

const styleComputed = computed(() => {
    return {
        width: `${props.size}px`,
        height: `${props.size}px`,
    }
})
const qrcodeSizeComputed = computed(() => props.size - props.margin * 2)

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
    emits('initialized', qrcodeRef.value)
}

/**
 * 渲染二维码
 * @return {Promise<unknown>}
 */
async function renderQRCode() {
    return new Promise((resolve) => {
        ;(async () => {
            await QRCode.toCanvas(qrcodeRef.value, props.value, {
                width: qrcodeSizeComputed.value,
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
        const logoPos = (qrcodeSizeComputed.value - props.iconSize + props.iconPadding) / 2
        const logoSize = props.iconSize - props.iconPadding
        const rectSize = props.iconSize
        const rectPos = (qrcodeSizeComputed.value - rectSize) / 2
        let ctx = qrcodeRef.value.getContext('2d')
        img.onload = () => {
            if (props.iconBackgroundColor) {
                ctx.fillStyle = props.iconBackgroundColor
                ctx.fillRect(rectPos, rectPos, rectSize, rectSize)
            }
            ctx.drawImage(img, logoPos, logoPos, logoSize, logoSize)
            resolve()
        }
    })
}

/**
 * 刷新
 */
function handleRefresh() {
    emits('refresh')
}

/**
 * 转换成 data URI
 * @returns {Promise<*>}
 */
async function toDataURL() {
    return qrcodeRef.value.toDataURL('image/png')
}

defineExpose({
    toDataURL,
})
</script>

<style lang="less" scoped>
.x-qrcode {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: @border-radius;

    &__mask {
        background: rgba(255, 255, 255, 0.96);
        position: absolute;
        inset: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .ant-spin {
            line-height: 1;
        }
    }

    &--bordered {
        border: @color-border solid 1px;
    }
}
</style>
