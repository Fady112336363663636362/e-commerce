import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // ✅ استيراد pinia
import './index.css'

const app = createApp(App)
const pinia = createPinia() // ✅ إنشاء pinia instance

app.use(pinia) // ✅ تفعيل pinia في التطبيق
app.use(router)

app.mount('#app')
