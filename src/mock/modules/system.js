import Mock from 'mockjs'
import {builder, getQueryParams} from '../util'

// 获取角色列表
Mock.mock(new RegExp('/system/getUserRoleList'), 'get', options => {
    return builder(Mock.mock({
        'rows': [{
            'title': '全部',
            'key': '@increment',
        },
            {
                'title': '超级管理员',
                'key': '@increment',
            },
            {
                'title': '管理员',
                'key': '@increment',
                'children': [{
                    'title': '系统管理员',
                    'key': '@increment',
                },
                    {
                        'title': '业务管理员',
                        'key': '@increment',
                    },
                    {
                        'title': '数据管理员',
                        'key': '@increment',
                    },
                ],
            },
            {
                'title': '操作员',
                'key': '@increment',
                'children': [{
                    'title': '公告维护员',
                    'key': '@increment',
                },
                    {
                        'title': '审核员',
                        'key': '@increment',
                    },
                    {
                        'title': '复审员',
                        'key': '@increment',
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
            'id': '@increment',
            'avatar': '@image(60x60, @color, @cfirst)',
            'email': '@email',
            'name': '@cname',
            'roleName|+1': ['超级管理员', '业务管理员', '数据管理员'],
            'date': '@date',
        }],
        'total': 40,
    }))
})
