import { env } from '@/utils/util'

export default {
    title: env('title'),
    logo: `${import.meta.env.BASE_URL}images/logo.svg`,
    mock: env('mock'),
    permission: env('permission'),
}
