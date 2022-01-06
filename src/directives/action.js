import Vue from 'vue'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:method 或 v-action="[method]" 如下：
 *    <a-button v-action:insert>新增</a-button>
 *    或
 *    <a-button v-action="['insert']">新增</a-button>
 *    或
 *    <a-button v-action="'insert'">新增</a-button>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被禁用
 */
Vue.directive('action', {
    inserted: (el, binding, vnode, oldVnode) => {
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
})
