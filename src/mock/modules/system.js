import Mock from 'mockjs'
import {builder} from '../util'

// 获取角色列表
Mock.mock(new RegExp('/system/getUserRoleList'), 'get', options => {
    return builder(Mock.mock({
        'rows': [{
            'title': '全部',
            'key': '@id',
        },
            {
                'title': '超级管理员',
                'key': '@id',
            },
            {
                'title': '管理员',
                'key': '@id',
                'children': [{
                    'title': '系统管理员',
                    'key': '@id',
                },
                    {
                        'title': '业务管理员',
                        'key': '@id',
                    },
                    {
                        'title': '数据管理员',
                        'key': '@id',
                    },
                ],
            },
            {
                'title': '操作员',
                'key': '@id',
                'children': [{
                    'title': '公告维护员',
                    'key': '@id',
                },
                    {
                        'title': '审核员',
                        'key': '@id',
                    },
                    {
                        'title': '复审员',
                        'key': '@id',
                    },
                ],
            },
        ],
    }))
})

// 获取用户分页列表
Mock.mock(new RegExp('/system/getUserPageList'), 'post', options => {
    return builder(Mock.mock({
        'rows|3-5': [{
            'id|+1': 100,
            'userName': '@name',
            'avatar': '@image(60x60, @color, @cfirst)',
            'mail': '@email',
            'name': '@cname',
            'roleName|+1': ['超级管理员', '业务管理员', '数据管理员'],
            'date': '@date',
        }],
        'total': 32,
    }))
})
