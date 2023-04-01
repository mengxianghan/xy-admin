import { createApp } from 'vue'

import App from '@/App.vue'
import { useCore } from '@/core'

const app = createApp(App)
useCore(app)
app.mount('#app')
