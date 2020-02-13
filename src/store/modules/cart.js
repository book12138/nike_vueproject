import Axios from 'axios'

import { api } from '@/axios/config.js'

export default {
  namespaced: true,
  state: {
    cartItems: JSON.parse(sessionStorage.getItem('cart_cartitems')) || []
  },
  mutations: {
    /**
     * 初始化购物车内容
     */
    loadCartItems: (state) => {
      Axios.get(`${api.cart}/api/CartInfo`).then(
        (successResponse) => {
          state.cartItems = successResponse.data
          sessionStorage.setItem('cart_cartitems', JSON.stringify(successResponse.data))
        }, (errorResponse) => {

        }
      )
    },

    /**
     * 清空缓存
     */
    clearCartCache: (state) => {
      for (var i = sessionStorage.length - 1; i >= 0; i--) {
        if (sessionStorage.key(i).indexOf('cart') >= 0) {
          sessionStorage.removeItem(sessionStorage.key(i))
        }
      }
    }
  },
  actions: {
    loadCartItems: ({ commit }) => commit('loadCartItems'),
    clearCartCache: ({ commit }) => commit('clearCartCache')
  },
  getters: {
    cartItems: (state) => state.cartItems
  }
}
