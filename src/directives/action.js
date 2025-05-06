/**
 * @name Action
 * @description 权限
 * @example v-action="'action'" || v-action="['action1', 'action2']"
 */
import router from '@/router'

function onCheckAction(el, binding) {
  if (!checkAction(binding.value)) {
    el.remove() || (el.style.display = 'none')
  }
}

const action = {
  mounted: onCheckAction,
  updated: onCheckAction,
}

/**
 * 校验权限
 * @param {string | Array} actions
 */
export function checkAction(actions = '') {
  const route = router.currentRoute.value
  const currentActions = route?.meta?.actions ?? []
  actions = typeof actions === 'string' ? actions.split() : actions

  if (currentActions.includes('*')) {
    return true
  }

  return currentActions.some(action => actions.includes(action))
}

export function setupActionDirective(app) {
  app.directive('action', action)
  app.config.globalProperties.$checkAction = checkAction
  return app
}
