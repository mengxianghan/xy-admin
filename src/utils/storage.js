import Storage from 'xy-storage'

const options = {
    namespace: process.env.VUE_APP_STORAGE_NAMESPACE,
}

export const useSession = ()=> {
    return new Storage({
        ...options,
        name: 'session'
    })
}
export const useLocal = ()=> {
    return new Storage({
        ...options,
        name: 'local'
    })
}

export const useCookie = ()=> {
    return new Storage({
        ...options,
        name: 'cookie'
    })
}


