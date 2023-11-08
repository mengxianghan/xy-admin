import { setupActionDirective } from './action'

export const setupDirective = (app) => {
    setupActionDirective(app)
    return app
}
