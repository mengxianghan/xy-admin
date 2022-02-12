import Mock from 'mockjs'
import {builder, getQueryParams} from '../util'

// 获取角色列表
Mock.mock(new RegExp('/system/getUserRoleList'), 'get', options => {
    return builder(Mock.mock({
        'rows': [
            {
                'name': '超级管理员',
                'alias': '@word(2,4)',
                'sort|1-100': 1,
                'key': '@id',
            },
            {
                'name': '管理员',
                'alias': '@word(2,4)',
                'sort|1-100': 1,
                'key': '@id',
                'children': [{
                    'name': '系统管理员',
                    'alias': '@word(2,4)',
                    'sort|1-100': 1,
                    'key': '@id',
                },
                    {
                        'name': '业务管理员',
                        'alias': '@word(2,4)',
                        'sort|1-100': 1,
                        'key': '@id',
                    },
                    {
                        'name': '数据管理员',
                        'alias': '@word(2,4)',
                        'sort|1-100': 1,
                        'key': '@id',
                    },
                ],
            },
            {
                'name': '操作员',
                'alias': '@word(2,4)',
                'sort|1-100': 1,
                'key': '@id',
                'children': [{
                    'name': '公告维护员',
                    'alias': '@word(2,4)',
                    'sort|1-100': 1,
                    'key': '@id',
                },
                    {
                        'name': '审核员',
                        'alias': '@word(2,4)',
                        'sort|1-100': 1,
                        'key': '@id',
                    },
                    {
                        'name': '复审员',
                        'alias': '@word(2,4)',
                        'sort|1-100': 1,
                        'key': '@id',
                    },
                ],
            },
        ],
    }))
})

// 获取用户分页列表
Mock.mock(new RegExp('/system/getUserPageList'), 'get', options => {
    return builder(Mock.mock({
        'rows|10': [{
            'id': '@id',
            'avatar': '@image(60x60, @color, @cfirst)',
            'userName': '@email',
            'name': '@cname',
            'roleName|+1': ['超级管理员', '业务管理员', '数据管理员'],
            'date': '@date',
        }],
        'total': 40,
    }))
})
