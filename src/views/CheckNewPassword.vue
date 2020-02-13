<template>
  <div>
    <!-- 页眉 -->
    <div class="head">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      新密码
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <div style="margin-top:230px;">
      <el-input style="width:90%" v-model="newPassword" placeholder="请输入新的密码" autofocus="true" show-password></el-input>
      <el-input style="width:90%;margin-top:10px" v-model="temp" placeholder="再输一遍" show-password></el-input>
      <el-button style="width:90%;margin-top:20px" @click="handleCommit" type="success" plain>下一步</el-button>
    </div>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'

export default {
  name: 'checkNewPassword',
  data () {
    return {
      newPassword: '',
      temp: ''
    }
  },
  methods: {
    backClickHandle () {
      this.back()
    },
    handleCommit () {
      if (this.newPassword === '' || this.temp === '') {
        this.$message.error('密码框不可为空')
        return ''
      } else if (this.newPassword !== this.temp) {
        this.$message.error('两次密码输入不一致')
      } else {
        this.$axios
          .put(`${api.userInfo}/api/Password?password=${this.newPassword}`)
          .then(success => {
            if (success.data.success) {
              this.$router.replace({ name: 'accountSetting' })
            } else {
              let errorInfo = ''
              success.data.msg.forEach(element => {
                errorInfo += element.value + '；'
              })
              this.$message.error(errorInfo)
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
