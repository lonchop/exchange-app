import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3Spinner from 'vue3-spinner'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

const app = createApp(App)
app.use(router)
app.use(vue3Spinner)
app.use(VueChartkick)

app.mount('#app')
