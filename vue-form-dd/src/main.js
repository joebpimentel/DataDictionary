import { createApp } from 'vue'
import './style.css'
import './style.scss'
import App from './App.vue'
import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
import * as VueRouter from 'vue-router'
import process from 'process'
import TablesListPage from './pages/TablesListPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import LandingPage from './pages/LandingPage.vue'

const app = createApp(App)
  .use(VueRouter.createRouter({
    history: VueRouter.createWebHistory("/"),
    routes: [{
      path: '/',
      component: LandingPage,
    }, {
      path: '/tables',
      component: TablesListPage,
    }, {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
    } //{
    //   path: '/products',
    //   component: ProductsPage,
    // }, {
    //   path: '/products/:productId',
    //   component: ProductDetailPage,
    // }, {
    //   path: '/',
    //   redirect: '/products',
    // },
    // {
    //   path: '/:pathMatch(.*)*',
    //   component: NotFoundPage,
    // }
    ]
  }))
  .use(Vueform, vueformConfig)
  .mount('#app')