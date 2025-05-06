import NProgress from 'nprogress'
import './index.less'

export default (options) => {
  NProgress.configure({
    ...options,
    showSpinner: false,
  })
  return NProgress
}
