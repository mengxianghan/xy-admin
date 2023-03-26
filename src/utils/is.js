import { RE_EMAIL } from '@/config/regexp'

/**
 * 验证 url
 * @param {string} str
 */
export const isUrl = (str) => RE_EMAIL.test(str)
