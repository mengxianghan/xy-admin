import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default () => {
    const configProviderAttrs = {
        locale: zhCN,
        theme: {
            components: {
                List: {
                    paddingContentHorizontalLG: 0,
                },
                Table: {
                    paddingContentVerticalLG: 12,
                    padding: 12,
                },
                Card: {
                    paddingLG: 16,
                },
            },
        },
    }

    return {
        configProviderAttrs,
    }
}
