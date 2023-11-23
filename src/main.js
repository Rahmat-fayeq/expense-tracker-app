import { createApp } from 'vue'
import App from './App.vue'
import Vue3Toastify from 'vue3-toastify';
import './assets/style.css'
import 'vue3-toastify/dist/index.css';

const app = createApp(App)
app.use(Vue3Toastify, {
    autoClose: 3000,
  });
app.mount('#app')
