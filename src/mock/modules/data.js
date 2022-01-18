import Mock from 'mockjs'
import {builder} from '../util'

// 获取动态列表
Mock.mock(new RegExp('/manage/getDynamicList'), 'post', options => {
    const data = Mock.mock({
        'list|5': [{
            'id': '@id',
            'avatar': '@image(32, @color, @cfirst)',
            'title': '@cparagraph(1, 2)',
            'time': '@datetime',
        }],
    })
    return builder(data.list)
})

// 获取分页列表
Mock.mock(new RegExp('/data/getPageList'), 'post', options => {
    return builder(Mock.mock({
        'list|10': [{
            'id': '@id',
            'avatar': '@image(60, @color, @cfirst)',
            'title': '@ctitle',
            'desc': '@cparagraph(3)',
        }],
        'total': 32,
    }))
})

