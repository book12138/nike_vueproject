<template>
  <div style="margin-top:50px;">
    Loading 。。。
  </div>
</template>
<script>
import Oidc from 'oidc-client'

new Oidc.UserManager()
  .signinRedirectCallback()
  .then(function () {
    const url = sessionStorage.getItem('lastFullPath')
    window.location = `/#${url}` // 登录成功，回退页面
  })

  .catch(function (e) {

  })
export default {
  name: 'signincallback'
}
</script>
