import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
// import { config, singin } from './auth.js'

Vue.use(VueRouter)

export const router = new VueRouter({
  // mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//     if (sessionStorage.getItem('token') && sessionStorage.getItem('token').length >= 128) {
//       next()// 已经获得了认证
//     } else {
//       sessionStorage.setItem('lastFullPath', to.fullPath)

//       next({
//         path: '/account' // 去登陆
//       })
//     }
//   } else if (to.meta.redirect) { // 按钮级别的验证跳转，目标路由是虚构的，仅仅只是为了进到这个地方
//     sessionStorage.setItem('lastFullPath', from.fullPath)

//     next({
//       path: '/account' // 去登陆
//     })
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//     if (sessionStorage.getItem(`oidc.user:${config.authority}:${config.client_id}`) && sessionStorage.getItem('oidc.user:http://localhost:5000:spaCore').length >= 128) { // 通过vuex state获取当前的token是否存在
//       next()// 已经获得了认证
//     } else {
//       sessionStorage.setItem('lastFullPath', to.fullPath)
//       singin.call() // 去登陆
//     }
//   } else {
//     next()
//   }
// })

export default router
