import { createVNode, render } from 'vue'
import { getScrollWidth, onPopState, onUnPopState, setStyle } from '../utils'
import LoadingConstructor from './Loading.vue'

let container

function show(option = {}) {
  hide()
  const vm = createVNode(LoadingConstructor, {
    ...option,
    type: 'fullscreen',
  })
  container = document.createElement('div')
  render(vm, container)
  setStyle(document.body, {
    paddingRight: `${getScrollWidth()}px`,
    overflow: 'hidden',
  })
  document.body.appendChild(container)
  onPopState(hide)
}

function hide() {
  if (!container)
    return
  container.remove()
  container = null
  setStyle(document.body, {
    paddingRight: '',
    overflow: '',
  })
  onUnPopState(hide)
}

const Loading = show

Loading.destroy = hide

Loading.install = (app) => {
  app.config.globalProperties.$loading = Loading
  return app
}

export { Loading }
