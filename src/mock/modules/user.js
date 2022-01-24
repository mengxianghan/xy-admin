import Mock from 'mockjs'
import {builder, getBody} from '../util'

// 登录
Mock.mock(new RegExp('/user/login'), 'post', options => {
    const {username} = getBody(options)

    return builder(Mock.mock({
        'id': '@id',
        'username': username,
        'avatar': '@dataImage',
        'token': '@guid',
        'email': '@email',
    }))
})

