import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
const { MdCard, MdButton, MdProgress } = require('vue-material/dist/components')
import 'vue-material/dist/vue-material.min.css'
import './registerServiceWorker'
import store from './store'

Vue.use(VueCompositionApi)
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdProgress)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
