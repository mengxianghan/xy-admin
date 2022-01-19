<template>
    <div>
        <tiny-editor v-model="content"
                     v-bind="$attrs"
                     api-key="d6vzo7lwm6my7lu42uk2jhnhui7cdk842rb0tzc6sfxgffgm"
                     :init="opts"></tiny-editor>
    </div>
</template>

<script>
import {onMounted, ref, toRefs, watch} from 'vue'
import {mergeDeep} from '@/utils'

import Editor from '@tinymce/tinymce-vue'

export default {
    name: 'Editor',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        option: {
            type: Object,
            default: () => ({}),
        },
    },
    components: {
        'tiny-editor': Editor,
    },
    setup(props, ctx) {
        const {modelValue, option} = toRefs(props)
        const content = ref('')
        const opts = mergeDeep({
            language: 'zh_CN',
            height: 480,
            branding: false,
            resize: false,
        }, option.value)

        watch(() => modelValue.value, (val) => content.value = val)
        watch(() => content.value, (val) => ctx.emit('update:modelValue', val))

        onMounted(() => {
            content.value = modelValue.value
        })

        return {
            content,
            opts,
        }
    },
}
</script>

<style scoped>

</style>
