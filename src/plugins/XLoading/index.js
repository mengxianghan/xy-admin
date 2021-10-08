import XLoading from './XLoading.vue';
import {createApp} from 'vue';

const instance = createApp(XLoading).mount(document.createElement('div'));
document.body.appendChild(instance.$el);

export function useLoading() {
    return instance;
}

