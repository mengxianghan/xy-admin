import { setupActionDirective } from './action'

export function setupDirective(app) {
  setupActionDirective(app)
  return app
}
