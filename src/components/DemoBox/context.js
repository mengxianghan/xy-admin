import { computed, inject, provide } from 'vue'

const DEMO_BOX_KEY = Symbol('demo_box')

export const useDemoBoxProvide = (props) => {
    provide(DEMO_BOX_KEY, props)
}

export const useDemoBoxInject = () => {
    return inject(DEMO_BOX_KEY, {
        span: computed(() => undefined),
        md: computed(() => undefined),
        lg: computed(() => undefined),
        xl: computed(() => undefined),
        xxl: computed(() => undefined),
    })
}
