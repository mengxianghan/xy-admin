import { computed, inject, provide } from 'vue'

const GRID_KEY = Symbol('grid')

export function useGridProvide(props) {
  provide(GRID_KEY, props)
}

export function useGridInject() {
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
