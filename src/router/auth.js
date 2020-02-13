import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const auth = {

  /**
   * axios请求时，对捕获到的信息进行过滤，检查是否为401错误
   * @param {*} errorInfo axios请求时的错误信息
   * @param {Boolean} historyDotSave 在判断需要跳转至登录页面时，是否无痕跳转
   * @returns {Boolean} 是否已在过滤器内，完成对错误的处理
   */
  catchInfoFileter (errorInfo, historyDotSave) {
    let isFinish = false
    if (errorInfo.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      if (errorInfo.response.status === 401) {
        isFinish = true
        this.redirectToLogin(historyDotSave)
      }
    } else {
      // 在设置触发错误的请求时发生了一些事情
      this.$message.error(errorInfo.message)
    }
    // console.log(error.config)

    return isFinish
  },

  /**
   * 跳转至登录页面
   * @param {Boolean} historyDotSave 是否无痕跳转
   */
  redirectToLogin (historyDotSave) {
    if (historyDotSave) {
      sessionStorage.setItem('lastFullPath', window.location.href)// 存储发起跳转的页面url,后面登录成功时，跳转回来
      window.location.replace('/#/account')
    } else {
      sessionStorage.setItem('lastFullPath', window.location.href)// 存储发起跳转的页面url,后面登录成功时，跳转回来
      window.location.href = '/#/account'
    }
  }
}
