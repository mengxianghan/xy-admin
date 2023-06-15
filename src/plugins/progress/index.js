import NProgress from 'nprogress'

import './index.less'

export const createProgress = (options = {}) => {
    NProgress.configure(options)
    return NProgress
}
