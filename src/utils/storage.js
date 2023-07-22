import Storage from 'xy-storage'
import { config } from '@/config'

const options = {
    namespace: config('storage.namespace'),
}

export default {
    local: new Storage({
        ...options,
        name: 'local',
    }),
    session: new Storage({
        ...options,
        name: 'session',
    }),
    cookie: new Storage({
        ...options,
        name: 'cookie',
    }),
}
