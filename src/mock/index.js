import Mock from 'mockjs'

import './modules/common.js'
import './modules/system.js'
import './modules/user.js'

export const setupMock = () => {
    Mock.setup({
        timeout: 200,
    })
}
