import Storage from 'xy-storage'

const storage = new Storage({
    namespace: process.env.VUE_APP_STORAGE_NAMESPACE,
})

export function useStorage() {
    return storage
}

export function useSessionStorage() {
    return storage.session
}

export function useLocalStorage() {
    return storage.local
}

export function useCookieStorage() {
    return storage.cookie
}


