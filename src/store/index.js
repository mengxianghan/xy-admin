import { createPinia } from 'pinia'

export { default as useAppStore } from './modules/app'
export { default as useMultiTabStore } from './modules/multiTab'
export { default as useRouterStore } from './modules/router'
export { default as useUserStore } from './modules/user'

const store = createPinia()

export function setupStore(app) {
  app.use(store)

  return app
}

export default store
