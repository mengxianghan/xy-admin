import Storage from 'xy-storage'
import { config } from '@/config'

const options = {
    namespace: config('storage.namespace'),
}

export const local = new Storage({
    ...options,
    name: 'local',
})

export const session = new Storage({
    ...options,
    name: 'session',
})

export const cookie = new Storage({
    ...options,
    name: 'cookie',
})

export default {
    local,
    session,
    cookie,
}
