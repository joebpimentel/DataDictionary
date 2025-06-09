import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
import TablesPage from './pages/TablesPage.vue';
import TablesDescriptionPage from './pages/TablesDescriptionPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const pinia = createPinia()
const app = createApp(App)
    .use(Vueform, vueformConfig)
    .use(pinia)
    .use(VueRouter.createRouter({
        history: VueRouter.createWebHistory('/'),
        routes: [{
            path: '/',
            component: App,
        }, {
            path: '/tables',
            component: TablesPage,
        }, {
            path: '/tables_description',
            component: TablesDescriptionPage,
        }, {
            path: '/:pathMatch(.*)*',
            component: NotFoundPage,
        }]
    }))
    .mount('#app')