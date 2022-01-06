const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV !== 'development'

/**
 * 获取对应的 CDN 资源
 * @param {string} key
 * @param {any} defaults 默认值
 * @returns {[]}
 */
const getAssetsCDN = (key, defaults = []) => {
    const data = assetsCDN[key]
    let res = data.env || defaults
    if (data[process.env.NODE_ENV]) {
        res = res instanceof Array ? [...res, ...data[process.env.NODE_ENV]] : {...res, ...data[process.env.NODE_ENV]}
    }
    return res
}

const assetsCDN = {
    externals: {
        production: {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'moment': 'moment',
            'ant-design-vue': 'antd',
            'jschardet': 'jschardet',
            'bignumber.js': 'BigNumber',
            'ali-oss': 'OSS',
            'lodash': '_'
        }
    },
    css: {
        env: []
    },
    js: {
        env: [
            '//cdn.jsdelivr.net/npm/tinymce@5.7.1/tinymce.min.js',
            '//cdn.jsdelivr.net/npm/tinymce-i18n@20.12.25/langs5/zh_CN.js'
        ],
        production: [
            '//cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
            '//cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
            '//cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.min.js',
            '//cdn.jsdelivr.net/npm/axios@0.24.0/dist/axios.min.js',
            '//cdn.jsdelivr.net/npm/moment@2.29.1/min/moment.min.js',
            '//cdn.jsdelivr.net/npm/moment@2.29.1/locale/zh-cn.js',
            '//cdn.jsdelivr.net/npm/ant-design-vue@1.7.8/dist/antd.min.js',
            '//cdn.jsdelivr.net/npm/jschardet@3.0.0/dist/jschardet.min.js',
            '//cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
            '//cdn.jsdelivr.net/npm/bignumber.js@9.0.1/bignumber.min.js',
            '//cdn.jsdelivr.net/npm/ali-oss@6.16.0/dist/aliyun-oss-sdk.min.js'
        ]
    }
}

module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    outputDir: process.env.VUE_APP_OUTPUT_DIR,
    assetsDir: 'static',
    runtimeCompiler: true,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '/api_base': {
                target: '/',
                changeOrigin: true, // 允许 webSockets 跨域
                secure: false,
                pathRewrite: {
                    '^/api_base': ''
                }
            }
        },
        watchOptions: {
            ignored: /node_modules|dist|.git|.idea/,
            poll: true
        }
    },
    configureWebpack: {
        externals: getAssetsCDN('externals', {}),
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css)$/,
                filename: '[path].gz[query]',
                threshold: 10240,
                deleteOriginalAssets: false
            })
        ],
        performance: {
            hints: false
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendor: {
                        name: 'modules',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    lodash: {
                        name: 'lodash',
                        test: /[\\/]node_modules[\\/]lodash[\\/]/
                    }
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.plugin('html').tap(args => {
            args[0].title = process.env.VUE_APP_TITLE
            args[0].cdn = {}
            args[0].cdn.css = getAssetsCDN('css')
            args[0].cdn.js = getAssetsCDN('js')
            return args
        })
    },
    productionSourceMap: !isProd, // 生产环境是否生成 sourceMap 文件
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import '${path.resolve(__dirname, 'src/assets/styles/vars.less')}'`
                },
                javascriptEnabled: true
            }
        }
    }
}

