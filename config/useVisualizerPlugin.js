import process from 'node:process'
import visualizer from 'rollup-plugin-visualizer'

const lifecycle = process.env.npm_lifecycle_event

export default () => {
  if (lifecycle === 'report') {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  }
}
