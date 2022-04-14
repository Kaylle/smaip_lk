import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import MasonryWall from '@yeger/vue-masonry-wall'

createApp(App).use(store).use(router).use(PerfectScrollbar).use(MasonryWall).mount('#app')
