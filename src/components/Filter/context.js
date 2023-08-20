import { inject, provide } from 'vue'

import { FILTER_ITEM_DATA_SOURCE_KEY, FILTER_KEY, FILTER_TAG_KEY, FILTER_TAG_SELECTED_VALUE_KEY } from './config'

export const useFilterCtx = (props) => {
    provide(FILTER_KEY, props)
}

export const useInjectFilterCtx = () => {
    return inject(FILTER_KEY, {
        onChange: () => {},
    })
}

export const useFilterItemDataSourceCtx = (props) => {
    provide(FILTER_ITEM_DATA_SOURCE_KEY, props)
}

export const useInjectFilterItemDataSourceCtx = () => {
    return inject(FILTER_ITEM_DATA_SOURCE_KEY)
}

export const useFilterTagCtx = (props) => {
    provide(FILTER_TAG_KEY, props)
}

export const useInjectFilterTagCtx = () => {
    return inject(FILTER_TAG_KEY, {
        multiple: false,
        onTagClick: () => {},
    })
}

export const useFilterTagSelectedValueCtx = (props) => {
    provide(FILTER_TAG_SELECTED_VALUE_KEY, props)
}

export const useInjectFilterTagSelectedValueCtx = () => {
    return inject(FILTER_TAG_SELECTED_VALUE_KEY, [])
}
