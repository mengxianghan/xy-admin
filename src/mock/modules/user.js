import Mock from 'mockjs'

import { builder, getBody } from '../util'

// 登录
Mock.mock(new RegExp('/user/login'), 'post', (options) => {
    const { username, password } = getBody(options)

    if ('admin' === username && '123456' === password) {
        return builder(
            Mock.mock({
                id: '@increment',
                username: username,
                avatar: '@dataImage',
                token: '@guid',
                email: '@email',
            })
        )
    } else {
        return builder({}, '301', '用户名或密码错误')
    }
})
