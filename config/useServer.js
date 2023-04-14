export default () => ({
    host: true,
    port: 9211,
    proxy: {
        '/api': {
            target: '/',
            changeOrigin: true,
            rewrite: (path) => path.replace('^/api', ''),
        },
    },
})
