import Mock from 'mockjs'

import { builder } from '../util'

// 获取角色列表
Mock.mock(new RegExp('/system/getUserRoleList'), 'get', () => {
    return builder(
        Mock.mock({
            rows: [
                {
                    name: '超级管理员',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                },
                {
                    name: '管理员',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    children: [
                        {
                            name: '系统管理员',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                        {
                            name: '业务管理员',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                        {
                            name: '数据管理员',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                    ],
                },
                {
                    name: '操作员',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    children: [
                        {
                            name: '公告维护员',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                        {
                            name: '审核员',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                        {
                            name: '复审员',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                    ],
                },
            ],
        })
    )
})

// 获取用户分页列表
Mock.mock(new RegExp('/system/getUserPageList'), 'get', () => {
    return builder(
        Mock.mock({
            'rows|10': [
                {
                    id: '@id',
                    avatar: '@image(60x60, @color, @cfirst)',
                    userName: '@email',
                    name: '@cname',
                    'roleName|+1': ['超级管理员', '业务管理员', '数据管理员'],
                    date: '@date',
                },
            ],
            total: 40,
        })
    )
})

// 获取菜单列表
Mock.mock(new RegExp('/system/getMenuList'), 'get', () => {
    return builder(
        Mock.mock({
            rows: [
                {
                    name: '欢迎页',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    type: 'menu',
                },
                {
                    name: '表单页',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    type: 'menu',
                    children: [
                        {
                            name: '基础表单',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                            type: 'menu',
                            children: [
                                {
                                    name: '新增',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '编辑',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '删除',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                            ],
                        },
                        {
                            name: '分步表单',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                            type: 'menu',
                            children: [
                                {
                                    name: '新增',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '编辑',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '删除',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: '列表页',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    type: 'menu',
                    children: [
                        {
                            name: '基础列表',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                            type: 'menu',
                            children: [
                                {
                                    name: '新增',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '编辑',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '删除',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                            ],
                        },
                        {
                            name: '卡片列表',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                            type: 'menu',
                            children: [
                                {
                                    name: '新增',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '编辑',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '删除',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                            ],
                        },
                        {
                            name: '搜索列表',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                            type: 'menu',
                            children: [
                                {
                                    name: '新增',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '编辑',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                                {
                                    name: '删除',
                                    alias: '@word(2,4)',
                                    sort: '@increment',
                                    key: '@id',
                                    type: 'button',
                                },
                            ],
                        },
                    ],
                },
            ],
        })
    )
})

// 获取菜单列表
Mock.mock(new RegExp('/system/getNewMenuList'), 'get', () => {
    return builder(
        Mock.mock({
            rows: [
                {
                    name: '欢迎页',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                },
                {
                    name: '表单页',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    children: [
                        {
                            name: '基础表单',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                        {
                            name: '分步表单',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                    ],
                },
                {
                    name: '列表页',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    children: [
                        {
                            name: '基础列表',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                        {
                            name: '卡片列表',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                        {
                            name: '搜索列表',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                        },
                    ],
                },
            ],
        })
    )
})

// 获取字典分类列表
Mock.mock(new RegExp('/system/getDictTypeList'), 'get', () => {
    return builder(
        Mock.mock({
            rows: [
                {
                    name: '通知类型',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    code: '@word',
                },
                {
                    name: '性别',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    code: '@word',
                },
                {
                    name: '菜单类型',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    code: '@word',
                },
                {
                    name: '用户类型',
                    alias: '@word(2,4)',
                    sort: '@increment',
                    key: '@id',
                    code: '@word',
                    children: [
                        {
                            name: '移动端',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                            code: '@word',
                        },
                        {
                            name: '桌面端',
                            alias: '@word(2,4)',
                            sort: '@increment',
                            key: '@id',
                            code: '@word',
                        },
                    ],
                },
            ],
        })
    )
})
