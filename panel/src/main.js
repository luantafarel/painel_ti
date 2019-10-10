import Vue from 'vue'
import './plugins/vuetify'
import './plugins/base'
import App from './App.vue'
import store from './store'
import Axios from 'axios'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import responsive from 'vue-responsive'
Vue.config.productionTip = false

Vue.prototype.$http = Axios
Vue.use(responsive)
new Vue({
  router,
  store,
  data () {
    return {
      loader: null,
      loading2: false
    }
  },
  render: h => h(App)
}).$mount('#app')
