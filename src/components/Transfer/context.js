import { computed, inject, provide } from 'vue'
import { TRANSFER_KEY, TRANSFER_LIST_KEY } from './config'

export const useTransferProvide = (props) => {
    provide(TRANSFER_KEY, props)
}

export const useTransferInject = () => {
    return inject(TRANSFER_KEY, {
        fieldNames: computed(() => ({})),
        selectedKeys: computed(() => []),
        breadcrumb: computed(() => []),
        clearText: computed(() => ''),
        placeholder: computed(() => undefined),
        showSearch: computed(() => false),
        showCheckAll: computed(() => false),
        isDynamicLoadData: computed(() => false),
        keyword: computed(() => ''),
        onItemCheck: () => {},
        onCheckAll: () => {},
        onClear: () => {},
        onNext: () => {},
        onBreadcrumb: () => {},
        initInfiniteScroll: () => {},
        onLoadData: () => {},
        onSearch: () => {},
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
