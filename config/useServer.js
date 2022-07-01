export default () => ({
    host: true,
    proxy: {
        '/api': {
            target: '/',
            changeOrigin: true,
            rewrite: (path) => path.replace('^/api', ''),
        },
    },
})
