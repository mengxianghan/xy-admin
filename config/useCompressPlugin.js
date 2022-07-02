import compressPlugin from 'vite-plugin-compression'

export default () => {
    return compressPlugin({
        ext: '.gz',
        deleteOriginFile: false,
    })
}
