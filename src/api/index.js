const modules = import.meta.glob('./modules/*.js', { eager: true })

const api = {}

Object.keys(modules).forEach((key) => {
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
    api[`${name}Api`] = { ...modules[key] }
})

export default api
