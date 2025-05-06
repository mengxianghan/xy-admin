import { computed, inject, provide } from 'vue'

const tagSelectKey = Symbol('tagSelect')

export function useTagSelectProvide(props) {
  provide(tagSelectKey, props)
}

export function useTagSelectInject() {
  return inject(tagSelectKey, {
    onSelect: () => {},
    modelValue: computed(() => undefined),
    multiple: computed(() => false),
  })
}
