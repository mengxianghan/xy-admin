import Storage from 'xy-storage'

const options = {
    namespace: import.meta.env.VITE_STORAGE_NAMESPACE,
}

export const useStorage = () => {
    return {
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
}
