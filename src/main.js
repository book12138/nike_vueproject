import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global.css'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = Axios
Vue.use(Axios)
Vue.prototype.back = function () { // 向后跳转
  if (window.history.length > 1) {
    this.$router.back()
  } else {
    this.$router.push('/')
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
