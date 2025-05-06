import { theme } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default () => {
  const configProviderAttrs = {
    locale: zhCN,
    theme: {
      algorithm: theme.defaultAlgorithm,
      token: {
        borderRadius: 4,
        borderRadiusSM: 2,
      },
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
