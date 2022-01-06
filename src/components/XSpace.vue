<script>
export default {
    name: 'XSpace',
    props: {
        divider: {
            type: Boolean,
            default: true
        },
        size: {
            type: Number,
            default: 8
        }
    },
    data() {
        return {
            nodes: []
        }
    },
    render(createElement, context) {
        const {divider, size} = this
        const nodes = this.$slots.default ? this.$slots.default.filter(item => item.tag) : []
        return createElement('a-space', {
            attrs: {
                size: divider ? 0 : size
            }
        }, nodes.map((node, index) => {
            return createElement('div', [
                node,
                divider && (index + 1 < nodes.length) ? createElement('a-divider', {
                    attrs: {
                        type: 'vertical'
                    }
                }) : ''
            ])
        }))
    }
}
</script>

<style lang="less"
       scoped>
.action {
    display: inline;

    &--block {
        display: block;
    }
}
</style>
