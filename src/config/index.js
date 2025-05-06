import { get } from 'lodash-es'

const files = import.meta.glob('./modules/*.js', { eager: true })

const configs = {}

Object.keys(files).forEach((key) => {
  const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
  configs[name] = { ...(files[key]?.default || {}) }
})

/**
 * 配置
 * @param {string} key
 * @param {*} [def] 默认值
 * @returns {*}
 */
export const config = (key, def) => get(configs, key, def)
