<template>
  <div>
    <!-- 页眉 -->
    <div class="head">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      身份确认
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <div style="margin-top:230px;">
      <el-input style="width:90%" v-model="oldPassword" placeholder="请输入账户原来的密码" show-password></el-input>
      <el-button style="width:90%;margin-top:10px" @click="handleCommit" type="warning" plain>下一步</el-button>
    </div>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'

export default {
  name: 'checkPassword',
  data () {
    return {
      oldPassword: ''
    }
  },
  methods: {
    backClickHandle () {
      this.back()
    },
    handleCommit () {
      if (this.oldPassword === '') {
        this.$message.error('密码框不可为空')
        return ''
      }
      this.$axios
        .get(`${api.userInfo}/api/Password?password=${this.oldPassword}`)
        .then(success => {
          if (success.data.isValid) {
            this.$router.replace({ name: 'checkNewPassword' })
          } else {
            this.$message.error('密码错误')
          }
        })
        .catch(error => {
          if (!auth.catchInfoFileter(error, true)) {
            this.$message.error('对于你的请求处理出现了错误')
          }
        })
    }
  }
}
</script>
<style scoped>
.head {
  position: fixed;
  top: 0px;
  height: 50px;
  width: 94%;
  padding: 0px 3%;
  background-color: #e48125;
  text-align: center;
  line-height: 50px;
  color: white;
}
</style>
