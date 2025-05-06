export default () => ({
  host: '0.0.0.0',
  strictPort: false,
  proxy: {
    '/api': {
      target: 'https://m1.apifoxmock.com/m1/3156808-1518008-default',
      changeOrigin: true,
      rewrite: path => path.replace('/api', ''),
    },
  },
})
