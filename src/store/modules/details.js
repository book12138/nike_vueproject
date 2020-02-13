import Axios from 'axios'

import { api } from '@/axios/config.js'

export default {
  namespaced: true,
  state: {
    id: localStorage.getItem('details_id') || '',
    images: JSON.parse(sessionStorage.getItem('details_images')) || [],
    colors: JSON.parse(sessionStorage.getItem('details_colors')) || [],
    sizes: JSON.parse(sessionStorage.getItem('details_sizes')) || [],
    info: JSON.parse(sessionStorage.getItem('details_info')) || {},
    maxNum: sessionStorage.getItem('details_maxNum') || 1,
    userSelectNum: sessionStorage.getItem('details_userSelectNum') || 1,
    userSelectSku: sessionStorage.getItem('details_userSelectSku') || '',
    quantity: sessionStorage.getItem('details_quantity') || ''
  },
  mutations: {
    // 修改skuid
    setId (state, skuid) {
      localStorage.setItem('details_id', skuid) // 将传递的数据先保存到localStorage中
      state.id = skuid
    },

    // 加载sku的相关图片
    loadSkuImages: (state) => Axios
      .get(`${api.skuservice}/api/SkuImages`, {
        params: { skuid: state.id }
      })
      .then(res => {
        state.images = res.data
        sessionStorage.setItem('details_images', JSON.stringify(res.data))
      }),

    // 加载sku 所有同种产品下所有颜色
    loadSkuColors: (state) => Axios.get(`${api.skuservice}/api/SkuColors`,
      { params: { skuid: state.id } }
    ).then(res => {
      state.colors = res.data
      sessionStorage.setItem('details_colors', JSON.stringify(res.data))
    }),

    // 加载该sku 此颜色属性里所有的尺码
    loadSkuSizes: (state) => {
      Axios
        .get(`${api.skuservice}/api/SkuSizesAndQuantity`, {
          params: { skuid: state.id }
        })
        .then(res => {
          let temp = true
          let infos = []
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index]
            if (temp) {
              element.select = true
              state.userSelectSku = element.skuId
              sessionStorage.setItem('details_userSelectSku', element.skuId)
              state.maxNum = element.limit
              sessionStorage.setItem('details_maxNum', element.limit)
              temp = false
              state.quantity = element.quantity
              sessionStorage.setItem('details_quantity', element.quantity)
            }
            infos.push(element)
          }
          state.sizes = infos
          sessionStorage.setItem('details_sizes', JSON.stringify(infos))
          sessionStorage.setItem('details_userSelectNum', 1)
          state.userSelectNum = 1
        })
    },

    // 记载一些基础信息
    loadSkuInfos: (state) => Axios.get(`${api.skuservice}/api/SkuInfo`,
      { params: { skuid: state.id } }
    ).then(res => {
      state.info = res.data
      sessionStorage.setItem('details_info', JSON.stringify(res.data))

      // 计算在有优惠活动的情况下，单次 交易所限制的数量
      if (!res.data.onlyShowOnePrice) {
        let startTime = res.data.skuSuggestivePromotion.startTime
        let endTime = res.data.skuSuggestivePromotion.endTime
        if (startTime != null && startTime !== undefined &&
          endTime != null && endTime !== undefined) {
          let datetimenow = new Date()
          startTime = new Date(Date.parse(startTime))
          endTime = new Date(Date.parse(endTime))
          if (datetimenow >= startTime && datetimenow < endTime) { // 促销正在进行，且未结束
            state.maxNum = res.data.skuSuggestivePromotion.canBuyCouponNum
            sessionStorage.setItem('details_maxNum', res.data.skuSuggestivePromotion.canBuyCouponNum)
          }
        }
      }
    }),

    // 修改单次交易所能下单的最大数量
    setMaxNum: (state, maxNum) => {
      state.maxNum = maxNum
      sessionStorage.setItem('details_maxNum', maxNum)
    },

    // 设置用户选择的数量
    setUserSelectNum: (state, num) => {
      state.userSelectNum = num
      sessionStorage.setItem('details_userSelectNum', num)
    },

    // 设置用户选择的sku
    setUserSelectSku: (state, skuId) => {
      state.userSelectSku = skuId
      sessionStorage.setItem('details_userSelectSku', skuId)
      state.sizes.forEach(element => {
        if (element.select) { element.select = false }
        if (element.skuId === skuId) {
          element.select = true
          state.quantity = element.quantity
          sessionStorage.setItem('details_quantity', element.quantity)
        }
      })
    },

    // 清空缓存
    clearCache: (state) => {
      for (var i = sessionStorage.length - 1; i >= 0; i--) {
        if (sessionStorage.key(i).indexOf('details') >= 0) {
          sessionStorage.removeItem(sessionStorage.key(i))
        }
      }
    }
  },
  actions: {
    setId: ({ commit }, skuid) => {
      commit('setId', skuid)
      /* id 被修改的时候，其他信息跟着变 */
      commit('loadSkuSizes')
      commit('loadSkuColors')
      commit('loadSkuImages')
      commit('loadSkuInfos')
    },
    loadSkuImages: ({ commit }) => commit('loadSkuImages'),
    loadSkuColors: ({ commit }) => commit('loadSkuColors'),
    loadSkuSizes: ({ commit }) => commit('loadSkuSizes'),
    loadSkuInfos: ({ commit }) => commit('loadSkuInfos'),
    setMaxNum: ({ commit }) => commit('setMaxNum'),
    setUserSelectNum: ({ commit }, num) => commit('setUserSelectNum', num),
    setUserSelectSku: ({ commit }, skuId) => commit('setUserSelectSku', skuId),
    clearCache: ({ commit }) => commit('clearCache')
  },
  getters: {
    id: (state) => state.id,
    images: (state) => state.images,
    colors: (state) => state.colors,
    sizes: (state) => state.sizes,
    info: (state) => state.info,
    maxNum: (state) => state.maxNum,
    userSelectNum: (state) => state.userSelectNum,
    paremeters: (state) => state.info.paremeters,
    userSelectSku: (state) => state.userSelectSku,
    quantity: (state) => state.quantity
  }
}
