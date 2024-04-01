<template>
    <slot
        :disabled="disabled"
        :running="running"
        :seconds="seconds"></slot>
</template>

<script setup>
import { defineModel, ref } from 'vue'

defineOptions({
    name: 'XSendCode',
})

const emits = defineEmits(['change', 'start', 'end', 'reset'])

const seconds = defineModel('seconds', { type: Number, default: 60 })

const disabled = ref(false)
const timer = ref()
const defaultSeconds = ref()
const running = ref(false)

function start() {
    if (disabled.value) return

    disabled.value = true
    defaultSeconds.value = seconds.value
    running.value = true

    timer.value = setInterval(() => {
        seconds.value -= 1
        emits('change', seconds.value)
        if (seconds.value <= 0) {
            destroy()
            emits('end')
        }
    }, 1000)

    emits('start')
}

function reset() {
    destroy()
    emits('reset')
}

function destroy() {
    timer.value && clearInterval(timer.value)
    timer.value = null
    disabled.value = false
    running.value = false
    seconds.value = defaultSeconds.value
}

defineExpose({
    start,
    reset,
})
</script>

<style lang="less" scoped></style>
