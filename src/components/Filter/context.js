import { provide, inject } from 'vue'
import { filterCtxKey, filterTagCtxKey, filterTagSelectedValueKey } from './config'

export const useFilterCtx = (props) => {
    provide(filterCtxKey, props)
}

export const useInjectFilterCtx = () => {
    return inject(filterCtxKey, {
        onChange: () => {},
    })
}

export const useFilterTagCtx = (props) => {
    provide(filterTagCtxKey, props)
}

export const useInjectFilterTagCtx = () => {
    return inject(filterTagCtxKey, {
        onTagClick: () => {},
    })
}

export const useFilterTagSelectedValueCtx = (props) => {
    provide(filterTagSelectedValueKey, props)
}

export const useInjectFilterTagSelectedValueCtx = () => {
    return inject(filterTagSelectedValueKey)
}
