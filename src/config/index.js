import { get } from 'lodash-es'

const files = import.meta.glob('./modules/*.js', { eager: true })

const configs = {}

Object.keys(files).forEach((key) => {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    configs[name] = { ...(files[key]?.default || {}) }
})

export const config = (key, def) => get(configs, key, def)
