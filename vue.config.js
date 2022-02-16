const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
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
        env: {},
        production: {}
    },
    css: {
        env: []
    },
    js: {
        env: [],
        production: []
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
            '/api': {
                target: '/', // 接口地址
                changeOrigin: true, // 允许 webSockets 跨域
                secure: false,
                pathRewrite: {
                    '^/api': ''
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
                filename: '[path][base].gz',
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
                    tinymce: {
                        name: 'tinymce',
                        test: /[\\/]node_modules[\\/]tinymce[\\/]/
                    },
                    echarts: {
                        name: 'echarts',
                        test: /[\\/]node_modules[\\/]echarts[\\/]/
                    }
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.plugin('html').tap(options => {
            options[0].title = process.env.VUE_APP_TITLE
            options[0].cdn = {}
            options[0].cdn.css = getAssetsCDN('css')
            options[0].cdn.js = getAssetsCDN('js')
            return options
        })
        config.module.rule('vue').use('vue-loader').tap(options => ({
            ...options,
            compilerOptions: {
                isCustomElement: tag => ['a-icon'].includes(tag)
            }
        }))
    },
    productionSourceMap: !isProd, // 生产环境是否生成 sourceMap 文件
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import '${path.resolve(__dirname, 'src/styles/vars.less')}'; @import '${path.resolve(__dirname, 'src/styles/util.less')}'`
                },
                javascriptEnabled: true
            }
        }
    }
}
