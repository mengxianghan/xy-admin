import Storage from 'xy-storage'

const options = {
    namespace: import.meta.env.VITE_STORAGE_NAMESPACE,
}

export const useSession = () =>
    new Storage({
        ...options,
        name: 'session',
    })
export const useLocal = () =>
    new Storage({
        ...options,
        name: 'local',
    })

export const useCookie = () =>
    new Storage({
        ...options,
        name: 'cookie',
    })
