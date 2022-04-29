import Loading from './src/main.js'

export const useLoading = Loading

export default {
    install: function (Vue) {
        Vue.prototype.$xloading = Loading
    }
}
