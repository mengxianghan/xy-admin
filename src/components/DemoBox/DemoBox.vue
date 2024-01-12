<template>
    <a-card class="x-demo-box">
        <div class="x-demo-box__preview">
            <component :is="component"></component>
        </div>
        <div class="x-demo-box__meta">
            <div class="x-demo-box__title">
                <slot name="title">{{ component.title }}</slot>
            </div>
            <div
                class="x-demo-box__description"
                v-if="component.description"
                v-html="component.description"></div>
            <div class="x-demo-box__actions">
                <a-tooltip :title="copied ? '复制成功' : '复制代码'">
                    <span
                        class="x-demo-box__action"
                        @click="handleCopy()">
                        <check-outlined
                            class="color-success"
                            v-if="copied"></check-outlined>
                        <copy-outlined v-else></copy-outlined>
                    </span>
                </a-tooltip>
                <a-tooltip :title="open ? '隐藏代码' : '显示代码'">
                    <span
                        class="x-demo-box__action"
                        @click="open = !open">
                        <code-outlined></code-outlined>
                    </span>
                </a-tooltip>
            </div>
        </div>
        <div v-show="open">
            <div class="x-demo-box__code">
                <pre><code v-html="codeHtml"></code></pre>
            </div>

            <div
                class="x-demo-box__toggle"
                @click="open = !open">
                <caret-up-outlined></caret-up-outlined>隐藏源代码
            </div>
        </div>
    </a-card>
</template>

<script setup>
import { ref } from 'vue'
import { CopyOutlined, CodeOutlined, CheckOutlined, CaretUpOutlined } from '@ant-design/icons-vue'
import hljs from 'highlight.js'
import { useClipboard } from '@vueuse/core'
import 'highlight.js/styles/github.min.css'

defineOptions({
    name: 'XDemoBox',
})

const props = defineProps({
    component: Object,
})

const { copy, copied } = useClipboard()

const codeHtml = ref('')
const open = ref(false)

codeHtml.value = hljs.highlight(props.component.code, { language: 'html' }).value

function handleCopy() {
    copy(props.component.code)
}
</script>

<style lang="less" scoped>
.x-demo-box {
    margin-bottom: 16px;

    :deep(.ant-card-body) {
        padding: 0;
        line-height: 2;
    }

    &__preview {
        padding: 42px 24px;
        border-bottom: @color-split solid 1px;
    }

    &__meta {
        position: relative;
    }

    &__title {
        font-weight: bold;
        position: absolute;
        top: -14px;
        margin-left: 16px;
        padding: 1px 8px;
        background: #fff;
    }

    &__description {
        padding: 18px 24px 12px;

        :deep(p) {
            margin: 0;
        }

        :deep(code) {
            margin: 0 0.2em;
            padding-inline: 0.4em;
            padding-block: 0.2em 0.1em;
            font-size: 85%;
            background: rgba(150, 150, 150, 0.1);
            border: 1px solid rgba(100, 100, 100, 0.2);
            border-radius: 3px;
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 14px 0;
        border-top: 1px dashed @color-split;
        opacity: 0.7;
        transition: opacity @motion-duration-mid;
        gap: 16px;

        &:hover {
            opacity: 1;
        }
    }

    &__action {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    &__code {
        padding: 16px 32px;
        border-top: @color-split dashed 1px;
    }

    &__toggle {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: @color-split dashed 1px;
        gap: 4px;
        position: sticky;
        bottom: 0;
        background: #fff;
        cursor: pointer;
    }
}
</style>
