<script setup>
import { useColors } from '@/hooks'
import { theme } from 'ant-design-vue'
import { computed, useAttrs, useSlots } from 'vue'
import { getSlotProps } from '../utils'

defineOptions({
  name: 'XButton',
})

const props = defineProps({
  color: { type: String, default: '' },
  colorText: { type: String, default: '' },
  shape: { type: String, default: 'default' },
})

const slots = useSlots()
const attrs = useAttrs()
const { generate } = useColors()
const { token } = theme.useToken()

const cpColor = computed(() => {
  let color = ''

  switch (props.color) {
    case 'primary':
      color = token.value.colorPrimary
      break
    case 'success':
      color = token.value.colorSuccess
      break
    case 'error':
      color = token.value.colorError
      break
    case 'warning':
      color = token.value.colorWarning
      break
    default:
      color = props.color
      break
  }
  return color
})
const cpTheme = computed(() => {
  const Button = {}

  if (cpColor.value) {
    const colors = generate(cpColor.value)
    Button.colorPrimary = cpColor.value
    Button.colorPrimaryActive = colors[6]
    Button.colorPrimaryBorder = colors[2]
    Button.colorPrimaryHover = colors[4]
    Button.controlOutline = colors[1]
  }

  if (props.colorText) {
    Button.colorTextLightSolid = props.colorText
  }

  if (props.shape === 'square') {
    Button.borderRadius = 0
  }

  return { components: { Button } }
})
const cpStyles = computed(() => {
  const style = {}

  if (props.color?.startsWith('linear-gradient')) {
    style.background = cpColor.value
    style.border = 0
    style.boxShadow = 'none'
  }

  return style
})
</script>

<template>
  <a-config-provider :theme="cpTheme">
    <a-button
      :shape="shape"
      :style="cpStyles"
      v-bind="attrs"
    >
      <template
        v-for="(item, key) in slots"
        :key="key"
        #[key]="slotProps"
      >
        <slot
          :name="key"
          v-bind="getSlotProps(slotProps)"
        />
      </template>
    </a-button>
  </a-config-provider>
</template>

<style lang="less" scoped></style>
