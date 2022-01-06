import AliOSS from 'xy-ali-oss'
import {getOssConfig} from '@/api/modules/common'

function buildOptions({platform, key}) {
    return {
        async: true,
        getConfig: async () => {
            const {code, data} = await getOssConfig({
                server: platform,
                serverBiz: key
            })
            if (code === '200') {
                const {
                    accessKeyId,
                    accessKeySecret,
                    securityToken,
                    bucket,
                    endpoint,
                    rootPath
                } = data
                return {
                    accessKeyId,
                    accessKeySecret,
                    stsToken: securityToken,
                    bucket,
                    endpoint,
                    rootPath
                }
            }
        },
        getToken: async () => {
            const {code, data} = await getOssConfig()
            if (code === '200') {
                const {accessKeyId, accessKeySecret, securityToken} = data
                return {
                    accessKeyId,
                    accessKeySecret,
                    stsToken: securityToken
                }
            }
        }
    }
}

export function useOssBase() {
    return new AliOSS(buildOptions({
        platform: process.env.VUE_APP_OSS_PLATFORM_BASE,
        key: process.env.VUE_APP_OSS_KEY_BASE
    }))
}
