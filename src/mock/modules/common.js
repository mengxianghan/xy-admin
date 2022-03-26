import Mock from 'mockjs'
import {builder, getQueryParams} from '../util'

// 获取欢迎页数据
Mock.mock(new RegExp('/welcome/getData'), 'get', options => {
    return builder(Mock.mock({
        'dynamicRows|5': [{
            'id': '@increment',
            'avatar': '@image(32, @color, @cfirst)',
            'title': '@cparagraph(1, 2)',
            'time': '@datetime',
        }],
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
            'keyValue': '@word',
        }],
        'total': 32,
    }))
})

// 保存/删除
Mock.mock(new RegExp(/(save|delete)/), 'post', options => {
    return builder(Mock.mock({
        'result': true,
    }))
})

// 获取地区列表
Mock.mock(new RegExp('/common/getRegionList'), 'get', options => {
    const {parentId = 0} = getQueryParams(options)

    const list = {
        0: [
            {id: 1, name: '北京'},
            {id: 2, name: '山东省'},
        ],
        1: [
            {id: 11, name: '北京市'},
        ],
        2: [
            {id: 21, name: '济南市'},
            {id: 22, name: '菏泽市'},
            {id: 23, name: '青岛市'},
        ],
        11: [
            {id: 111, name: '东城区'},
            {id: 112, name: '西城区'},
            {id: 113, name: '海淀区'},
            {id: 114, name: '昌平区'},
            {id: 114, name: '朝阳区'},
        ],
        21: [
            {id: 211, name: '历下区'},
            {id: 212, name: '市中区'},
            {id: 213, name: '槐荫区'},
        ],
        22: [
            {id: 221, name: '牡丹区'},
            {id: 222, name: '定陶区'},
            {id: 223, name: '郓城县'},
        ],
        23: [
            {id: 231, name: '市南区'},
            {id: 232, name: '市北区'},
            {id: 233, name: '黄岛区'},
        ],
    }

    return builder(Mock.mock({
        'rows': list[parentId],
    }))
})
