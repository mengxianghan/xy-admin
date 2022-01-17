import Mock from 'mockjs'
import {builder} from '../util'

//
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

