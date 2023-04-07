import {
    LinkOutlined,
    TableOutlined,
    DownOutlined,
    UserOutlined,
    PlusOutlined,
    SettingOutlined,
    EllipsisOutlined,
    EditOutlined,
    WarningOutlined,
    FormOutlined,
    SmileOutlined,
    CheckCircleOutlined,
    AppstoreAddOutlined,
    LayoutOutlined,
    DeleteOutlined,
    ProfileOutlined,
} from '@ant-design/icons-vue'

export default {
    install(app) {
        app.component('IconLinkOutlined', LinkOutlined)
        app.component('IconTableOutlined', TableOutlined)
        app.component('IconDownOutlined', DownOutlined)
        app.component('IconUserOutlined', UserOutlined)
        app.component('IconPlusOutlined', PlusOutlined)
        app.component('IconSettingOutlined', SettingOutlined)
        app.component('IconEllipsisOutlined', EllipsisOutlined)
        app.component('IconEditOutlined', EditOutlined)
        app.component('IconWarningOutlined', WarningOutlined)
        app.component('IconFormOutlined', FormOutlined)
        app.component('IconSmileOutlined', SmileOutlined)
        app.component('IconCheckCircleOutlined', CheckCircleOutlined)
        app.component('IconAppstoreAddOutlined', AppstoreAddOutlined)
        app.component('IconLayoutOutlined', LayoutOutlined)
        app.component('IconDeleteOutlined', DeleteOutlined)
        app.component('IconProfileOutlined', ProfileOutlined)

        return app
    },
}
