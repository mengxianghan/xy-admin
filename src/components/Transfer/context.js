import { provide, inject, computed } from 'vue'
import { TRANSFER_KEY, TRANSFER_LIST_BODY_KEY } from './config'

export const useTransferProvide = (props) => {
    provide(TRANSFER_KEY, props)
}

export const useTransferInject = () =>
    inject(TRANSFER_KEY, {
        modelValue: computed(() => []),
        fieldNames: computed(() => ({})),
        onCheck: () => {},
        onNext: () => {},
    })

export const useTransferListBodyProvide = (props) => {
    provide(TRANSFER_LIST_BODY_KEY, props)
}

export const useTransferListBodyInject = () => inject(TRANSFER_LIST_BODY_KEY)
