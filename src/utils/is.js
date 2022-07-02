import { EMIAL_REG } from '@/config/regexp'

/**
 * 验证 url
 * @param {string} str
 */
export const isUrl = (str) => EMIAL_REG.test(str)
