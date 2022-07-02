import visualizer from 'rollup-plugin-visualizer'

export default () => {
    return visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
    })
}
