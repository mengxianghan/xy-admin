import {
    AppstoreOutlined,
    DashboardOutlined,
    HomeOutlined,
    LinkOutlined,
    TableOutlined,
    HistoryOutlined,
    LoginOutlined,
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    RollbackOutlined,
    UserOutlined,
    BellOutlined,
    PlusOutlined,
} from '@ant-design/icons-vue'

export default {
    install(app) {
        app.component('IconAppstoreOutlined', AppstoreOutlined)
        app.component('IconDashboardOutlined', DashboardOutlined)
        app.component('IconHomeOutlined', HomeOutlined)
        app.component('IconLinkOutlined', LinkOutlined)
        app.component('IconTableOutlined', TableOutlined)
        app.component('IconHistoryOutlined', HistoryOutlined)
        app.component('IconLoginOutlined', LoginOutlined)
        app.component('IconDownOutlined', DownOutlined)
        app.component('IconMenuFoldOutlined', MenuFoldOutlined)
        app.component('IconMenuUnfoldOutlined', MenuUnfoldOutlined)
        app.component('IconRollbackOutlined', RollbackOutlined)
        app.component('IconUserOutlined', UserOutlined)
        app.component('IconBellOutlined', BellOutlined)
        app.component('IconPlusOutlined', PlusOutlined)
        return app
    },
}
