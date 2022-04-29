import Vue from 'vue'
import {Modal, Icon} from 'ant-design-vue'

const XPreview = Vue.extend({
    data() {
        return {
            type: 'image',
            visible: false,
            src: ''
        }
    },
    methods: {
        onCancel() {
            this.visible = false
        }
    },
    render(createElement, context) {
        const {type, src, visible, onCancel} = this
        const closeBtn = <Icon type={'close-circle'}
                               style={{
                                   fontSize: '24px',
                                   position: 'absolute',
                                   right: '-40px',
                                   top: '4px',
                                   color: '#fff',
                                   cursor: 'pointer'
                               }}
                               onClick={onCancel}/>
        // 图片预览
        let el = '',
            width = 560
        switch (type) {
            case 'image':
                el = <img src={src}
                          style={{
                              width: '100%'
                          }}/>
                break
            case 'audio':
                el = <audio src={src}
                            controls
                            style={{
                                width: '100%'
                            }}></audio>
                break
            case 'video':
                el = <video src={src}
                            controls
                            style={{
                                width: '100%',
                                height: '400px'
                            }}></video>
                break
            case 'webview':
                el = <iframe src={src}
                             frameBorder="no"
                             style={{
                                 width: '100%',
                                 height: '667px',
                                 display: 'block'
                             }}></iframe>
                width = 375
        }
        return (
            <div>
                <Modal visible={visible}
                       footer={false}
                       body-style={{
                           padding: '0',
                           position: 'relative'
                       }}
                       closable={false}
                       onCancel={onCancel}
                       width={width}>
                    {closeBtn}
                    {el}
                </Modal>
            </div>
        )
    }
})

const instance = new XPreview({
    el: document.createElement('div')
})

class XPreviewClass {
    constructor(options) {
        this.opts = {
            type: 'image',
            ...options ?? {}
        }
    }

    show(src) {
        document.body.appendChild(instance.$el)
        instance.type = this.opts.type
        instance.src = src
        instance.visible = true
    }

    hide() {
        instance.visible = false
    }
}

export default {
    install() {
        Vue.prototype.$xpreview = {
            image: new XPreviewClass({type: 'image'}),
            audio: new XPreviewClass({type: 'audio'}),
            video: new XPreviewClass({type: 'video'}),
            webview: new XPreviewClass({type: 'webview'})
        }
    }
}
