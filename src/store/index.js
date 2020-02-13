import Vue from 'vue'
import Vuex from 'vuex'

import details from './modules/details.js'
import cart from './modules/cart.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  //   formDatas: null,
  //   token: '1'
  // },
  // mutations: {
  //   getFormData (state, data) {
  //     state.formDatas = data
  //   },
  //   saveToken (state, data) {
  //     state.token = data
  //     window.localStorage.setItem('Token', data)// 就是这里，保存到了 localStorage 中
  //   }
  // },
  modules: {
    details,
    cart
  }
})
