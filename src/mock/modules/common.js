import Mock from 'mockjs'
import {builder} from '../util'

// 获取欢迎页数据
Mock.mock(new RegExp('/welcome/getData'), 'get', options => {
    return builder(Mock.mock({
        'dynamicRows|5': [{
            'id': '@increment',
            'avatar': '@image(32, @color, @cfirst)',
            'title': '@cparagraph(1, 2)',
            'time': '@datetime'
        }]
    }))
})

// 获取分页列表
Mock.mock(new RegExp('/common/getPageList'), 'get', options => {
    return builder(Mock.mock({
        'rows|10': [{
            'id': '@increment',
            'avatar': '@image(60, @color, @cfirst)',
            'title': '@ctitle',
            'name': '@ctitle',
            'desc': '@cparagraph(3)',
            'valid|1': true,
            'keyValue': '@word'
        }],
        'total': 32
    }))
})

// 保存/删除
Mock.mock(new RegExp(/(save|delete)/), 'get', options => {
    return builder(Mock.mock({
        'result': true
    }))
})

