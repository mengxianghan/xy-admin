import Mock from 'mockjs'
import {builder} from '../util'

/**
 * 登录
 */
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

