import { createPinia } from 'pinia'

import useAppStore from './modules/app'
import useMultiTabStore from './modules/multiTab'
import useRouterStore from './modules/router'
import useUserStore from './modules/user'

const store = createPinia()

const setupStore = (app) => {
    app.use(store)

    return app
}

export { setupStore, useAppStore, useMultiTabStore, useRouterStore, useUserStore }

export default store
