/**
 * @name Action
 * @description 权限
 * @example v-action:action || v-action="'action'" || v-action="['action1', 'action2']"
 * @type {{mounted: actionDirective.mounted}}
 */
const actionDirective = {
    mounted: (el, binding, vnode) => {
        const route = vnode.context.$route
        const action = route.meta?.action ?? []
        const actionName = binding.arg || binding.value
        if (route?.meta?.action.includes('*')) return
        if (!actionName) return

        if (Array.isArray(actionName)) {
            // 多个权限
            if (!action.some((value) => actionName.includes(value))) {
                el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
                el.setAttribute('disabled', 'disabled')
            }
        } else {
            // 一个权限，完全匹配
            if (!action.includes(actionName)) {
                el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
                el.setAttribute('disabled', 'disabled')
            }
        }
    }
}

export function setupActionDirective(app) {
    app.directive('action', actionDirective)
}

export default actionDirective
