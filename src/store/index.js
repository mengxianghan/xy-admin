import {createStore} from 'vuex';

const modules = {};

const files = require.context('./modules/', false, /[A-Za-z]+\.(js)$/);
files.keys().forEach(path => {
    const filename = path.replace(/^\.\/(.*)\.\w+$/, '$1');
    const options = () => {
        const config = files(path);
        return config.default || config;
    };
    modules[filename] = options();
});

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules
});

export function setupStore(app) {
    app.use(store);
}

export default store;
