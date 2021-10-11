import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './plugins/element'
import './assets/scss/main.scss'
import MIconFont from '@/components/m-iconfont/m-iconfont.vue'
Vue.component('m-icon-font', MIconFont)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
