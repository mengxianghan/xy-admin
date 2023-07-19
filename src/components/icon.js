import { AppstoreAddOutlined, DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue'

export default {
    install(app) {
        app.component('IconDownOutlined', DownOutlined)
        app.component('IconPlusOutlined', PlusOutlined)
        app.component('IconEditOutlined', EditOutlined)
        app.component('IconAppstoreAddOutlined', AppstoreAddOutlined)
        app.component('IconDeleteOutlined', DeleteOutlined)

        return app
    },
}
