import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
import TablesPage from './pages/TablesPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const app = createApp(App)
    .use(Vueform, vueformConfig)
    .use(VueRouter.createRouter({
        // history: VueRouter.createWebHistory(process.env.BASE_URL  || 'http://localhost:5173'),
        history: VueRouter.createWebHistory('http://localhost:5173'),
        routes: [{
            path: '/',
            component: App,
        }, {
            path: '/tables',
            component: TablesPage,
        }, {
            path: '/:pathMatch(.*)*',
            component: NotFoundPage,
        }]
    }))
    .mount('#app')