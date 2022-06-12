/**
 * @name Action
 * @description 权限
 * @example v-action:action || v-action="'action'" || v-action="['action1', 'action2']"
 * @type {{mounted: actionDirective.mounted}}
 */
const actionDirective = {
    mounted: (el, binding) => {
        const route = binding.instance.$route
        const actions = route.meta?.actions ?? []
        const actionName = binding.arg || binding.value
        if (route?.meta?.action.includes('*')) return
        if (!actionName) return

        if (Array.isArray(actionName)) {
            // 多个权限
            if (!actions.some((value) => actionName.includes(value))) {
                ;(el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
            }
        } else {
            // 一个权限，完全匹配
            if (!actions.includes(actionName)) {
                ;(el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
            }
        }
    },
}

export function setupActionDirective(app) {
    app.directive('action', actionDirective)

    return app
}

export default actionDirective
