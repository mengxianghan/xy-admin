<template>
    <img ref="imgRef">
</template>

<script>
import {ref, toRefs, onMounted, watch} from 'vue'

import QRcode from 'qrcodejs2'

/**
 * 二维码
 * @property {string} text 内容
 * @property {number} size 大小，默认：100
 * @property {string} logo logo
 * @property {number} logo-size logo 大小，默认：30
 * @property {number} logo-padding logo 间距，默认：5
 * @property {string} color-dark 背景色
 * @property {string} color-light 前景色
 * @property {number} correct-level 容错级别，默认：2
 */
export default {
    name: 'QrCode',
    props: {
        text: {
            type: String,
            required: true,
            default: ''
        },
        size: {
            type: Number,
            default: 100
        },
        logo: {
            type: String,
            default: ''
        },
        logoSize: {
            type: Number,
            default: 30
        },
        logoPadding: {
            type: Number,
            default: 5
        },
        colorDark: {
            type: String,
            default: '#000000'
        },
        colorLight: {
            type: String,
            default: '#ffffff'
        },
        correctLevel: {
            type: Number,
            default: 2
        }
    },
    setup(props) {
        const {text, size, logo, logoSize, logoPadding, colorDark, colorLight, correctLevel} = toRefs(props)
        const qrcode = ref(null)
        const imgRef = ref()

        watch(() => toRefs(props), () => {
            draw()
        }, {
            deep: true
        })

        onMounted(() => {
            draw()
        })

        /**
         * 创建二维码
         * @return {Promise<unknown>}
         */
        async function build() {
            return new Promise((resolve) => {
                let element = document.createElement('div');
                new QRcode(element, {
                    text: text.value,
                    width: size.value,
                    height: size.value,
                    colorDark: colorDark.value,
                    colorLight: colorLight.value,
                    correctLevel: correctLevel.value
                })
                if (element.getElementsByTagName('canvas')[0]) {
                    qrcode.value = element
                    resolve()
                }
            })
        }

        /**
         * 绘制 Logo
         * @return {Promise<unknown>}
         */
        async function drawLogo() {
            return new Promise((resolve) => {
                let img = new Image()
                img.src = logo.value
                const logoPos = (size.value - logoSize.value) / 2
                const rectSize = logoSize.value + logoPadding.value
                const rectPos = (size.value - rectSize) / 2
                let ctx = qrcode.value.getElementsByTagName('canvas')[0].getContext('2d')
                img.onload = () => {
                    ctx.fillRect(rectPos, rectPos, rectSize, rectSize)
                    ctx.drawImage(img, logoPos, logoPos, logoSize.value, logoSize.value)
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
            if (logo.value) {
                await drawLogo()
            }
            imgRef.value.src = qrcode.value.getElementsByTagName('canvas')[0].toDataURL('image/png')
        }

        return {
            imgRef
        }
    }
}
</script>

<style scoped>

</style>
