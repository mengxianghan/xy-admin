import * as components from './components'
import * as directives from './directives'
export * from './components'

const install = (app) => {
    for (const key in components) {
        const component = components[key]

        if (component.install) {
            app.use(component)
        } else {
            app.component(component.name, component)
        }
    }

    for (const key in directives) {
        const directive = directives[key]
        app.directive(directive.name, directive)
    }

    return app
}

export default { install }
