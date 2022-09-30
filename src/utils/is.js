import { REG_EMIAL } from '@/config'

/**
 * 验证 url
 * @param {string} str
 */
export const isUrl = (str) => REG_EMIAL.test(str)
