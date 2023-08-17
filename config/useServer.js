export default () => ({
    host: true,
    port: 9211,
    proxy: {
        '/api': {
            target: 'https://mock.apifox.cn/m1/3156808-0-default',
            changeOrigin: true,
            rewrite: (path) => path.replace('/api', ''),
        },
    },
})
