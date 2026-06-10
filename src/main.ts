import { createApp } from 'vue'
import App from './App.vue'

import router from "./router";
import { createPinia } from 'pinia';
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
// Styling
import "./assets/css/eden-main.scss";
// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/element-main.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {register} from '@/components/Global';
import { initAuthListener } from '@/services/firebase/authListener.js';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)
app.use(ElementPlus);
register(app)
// GlobalComponents.register(app);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
initAuthListener()
router.isReady().then(() => {
    setTimeout(() => {
        app.mount('#app');
    }, 1000)
});