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
            //new CompressionPlugin({
            //    test: /\.(js|css)$/,
            //    filename: '[path].gz[query]',
            //    threshold: 10240,
            //    deleteOriginalAssets: false
            //})
        ]
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
                    // Button
                    'btn-shadow': 'none',
                    'btn-primary-shadow': 'none',
                    'btn-text-shadow': 'none'
                },
                javascriptEnabled: true
            },
            sass:{
                prependData: `@import '~@/assets/styles/vars.scss';`
            }
        }
    }
}