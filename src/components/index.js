import * as components from './components'
import * as directives from './directives'
import { Loading } from './Loading'
import { Preview } from './Preview'

export * from './components'

const install = (app) => {
    for (const key in components) {
        const component = components[key]
        app.component(component.name, component)
    }

    for (const key in directives) {
        const directive = directives[key]
        app.directive(directive.name, directive)
    }

    app.config.globalProperties.$loading = Loading
    app.config.globalProperties.$preview = Preview

    return app
}

export { Loading, Preview }

export default { install }
