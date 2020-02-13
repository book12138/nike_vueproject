<template>
  <div class="container">
    <Login v-if="asLogin" :asLogin.sync="asLogin" :backUrl="backUrl"></Login>
    <Register v-else :asLogin.sync="asLogin"></Register>
  </div>
</template>
<script>
import Login from '@/components/Account/Login.vue'
import Register from '@/components/Account/Register.vue'

export default {
  name: 'account',
  data () {
    return {
      asLogin: true,
      backUrl: this.$route.query.redirect || '/'
    }
  },
  components: {
    Login,
    Register
  }
}
</script>
<style scope>
.container {
  width: 100%;
  height: 100%;
}
</style>
