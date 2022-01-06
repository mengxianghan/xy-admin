import Mock from 'mockjs'
import {builder, getBody} from '@/mock/util'

// 登录
Mock.mock(/\/user\/login/, 'post', options => {
    const {username} = getBody(options)

    return builder(Mock.mock({
        'username': username,
        'token': '@id'
    }))
})

