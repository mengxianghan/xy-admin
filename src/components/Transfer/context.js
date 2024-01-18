import { provide, inject, computed } from 'vue'
import { TRANSFER_KEY, TRANSFER_LIST_KEY } from './config'

export const useTransferProvide = (props) => {
    provide(TRANSFER_KEY, props)
}

export const useTransferInject = () => {
    return inject(TRANSFER_KEY, {
        fieldNames: computed(() => ({})),
        modelValue: computed(() => []),
        breadcrumb: computed(() => []),
        clearText: computed(() => ''),
        placeholder: computed(() => undefined),
        showSearch: computed(() => false),
        showCheckAll: computed(() => false),
        onItemCheck: () => {},
        onCheckAll: () => {},
        onClear: () => {},
        onNext: () => {},
        onBreadcrumb: () => {},
    })
}

export const useTransferListProvide = (props) => {
    provide(TRANSFER_LIST_KEY, props)
}

export const useTransferListInject = () => {
    return inject(TRANSFER_LIST_KEY, {
        direction: computed(() => ''),
    })
}
