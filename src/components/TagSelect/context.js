import { provide, inject, computed } from 'vue'

const tagSelectKey = Symbol('tagSelect')

export const useTagSelectProvide = (props) => {
    provide(tagSelectKey, props)
}

export const useTagSelectInject = () => {
    return inject(tagSelectKey, {
        onSelect: () => {},
        modelValue: computed(() => undefined),
        multiple: computed(() => false),
    })
}
