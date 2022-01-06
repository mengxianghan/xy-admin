<template>
    <div>
        <editor v-model="content"
                :init="init"
                :key="key"/>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'XTinyEditor',
    components: {
        Editor
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            init: {
                branding: false,
                statusbar: false,
                language: 'zh_CN',
                height: 450,
                menubar: false,
                plugins: 'code image paste media preview emoticons',
                toolbar: 'code | undo redo | fontsizeselect bold italic forecolor| alignleft aligncenter alignright alignjustify | outdent indent | emoticons image media | preview',
                toolbar_mode: 'sliding',
                autosave_ask_before_unload: true,
                draggable_modal: true,
                content_style: `
                    * {
                        margin:0; padding:0;
                    }
                    body {
                        font:normal normal normal 14px/1.7 -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
                        margin: 8px;
                    }
                `,
                image_dimensions: false,
                image_description: false,
                media_alt_source: false,
                media_dimensions: false,
                media_poster: false,
                media_live_embeds: true,
                images_upload_handler: async (blobInfo, success, failure) => {
                    const file = blobInfo.blob()
                    const {code, data} = await this.upload(file).catch(() => {
                        throw new Error('上传失败')
                    })
                    if (code === '200') {
                        success(data.url)
                    } else {
                        failure('上传失败')
                    }
                },
                file_picker_callback: (callback, value, meta) => {
                    //文件分类
                    let fileType = ''
                    //为不同插件指定文件类型及后端地址
                    switch (meta.filetype) {
                        case 'image':
                            fileType = '.jpg, .jpeg, .png, .gif'
                            break
                        case 'media':
                            fileType = '.mp4'
                            break
                    }
                    //模拟出一个input用于添加本地文件
                    let input = document.createElement('input')
                    input.setAttribute('type', 'file')
                    input.setAttribute('accept', fileType)
                    input.click()
                    input.onchange = async () => {
                        let file = input.files[0]
                        const {code, data} = await this.upload(file)
                        if (code === '200') {
                            callback(data.url)
                        }
                    }
                },
                ...this.options
            },
            content: '',
            key: ''
        }
    },
    watch: {
        value(val) {
            this.content = val
        },
        content(val) {
            this.$emit('input', val)
            this.$emit('change', val)
        }
    },
    mounted() {
        this.key = new Date().getTime()
        this.content = this.value
    },
    methods: {
        /**
         * 上传
         * @param file
         * @return {Promise<unknown>}
         */
        upload(file) {
            return new Promise(async (resolve, reject) => {
                const res = await this.$oss.upload(file.name, file).catch(() => {
                    reject()
                })
                resolve(res)
            })
        }
    }
}
</script>

<style lang="less"
       scoped>
</style>
