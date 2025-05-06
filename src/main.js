import App from '@/App.vue'
import { useCore } from '@/core'
import { createApp } from 'vue'

const app = createApp(App)
useCore(app)
app.mount('#app')
