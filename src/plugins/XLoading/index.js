import XLoading from './XLoading.vue';
import {createApp} from 'vue';

const plugin = createApp(XLoading);
const instance = plugin.mount(document.createElement('div'));
document.body.appendChild(instance.$el);

export const xloading = instance;

export default {
    install: function (app, options) {
        app.config.globalProperties.$xloading = instance;
        app.provide('xloading', options);
    }
};
