import { provide, inject, computed } from 'vue'

const GRID_KEY = Symbol('grid')

export const useGridProvide = (props) => {
    provide(GRID_KEY, props)
}

export const useGridInject = () => {
    return inject(GRID_KEY, {
        columnGap: computed(() => 0),
        columns: computed(() => 24),
        collapsed: computed(() => false),
        collapsedRows: computed(() => 1),
        children: computed(() => []),
        addChild: () => {},
        removeChild: () => {},
    })
}
