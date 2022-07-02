import visualizer from 'rollup-plugin-visualizer'

const lifecycle = process.env.npm_lifecycle_event

export default () => {
    if ('report' === lifecycle) {
        return visualizer({
            filename: './node_modules/.cache/visualizer/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true,
        })
    }
}
