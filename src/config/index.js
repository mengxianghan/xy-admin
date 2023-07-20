import { get } from 'lodash-es'

const files = import.meta.glob('./*.js', { eager: true })

const configs = {}

Object.keys(files).forEach((key) => {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    if ('index' !== name) {
        configs[name] = { ...(files[key]?.default || {}) }
    }
})

export const config = (key, def) => get(configs, key, def)
