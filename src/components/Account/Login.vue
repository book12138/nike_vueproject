<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-box">
      <el-form-item>
        <img style="height:50px;" src="@/assets/images/nike-logo.png">
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          prefix-icon="el-icon-message"
          type="text"
          placeholder="请输入邮箱"
          v-model="form.email"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-view"
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-switch
          class="fl_left"
          style="margin-top:10px;margin-right:5px;"
          v-model="form.rememeberme"
          active-color="#13ce66"
          inactive-color="#c8c8c8"
        ></el-switch>
        <span class="fl_left" style="color:#909399">记住密码</span>
        <a class="fl_right" style="color:#2D83E4">忘记密码？</a>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%" v-on:click="onSubmit('loginForm')">登录</el-button>
        <span style="color:red;font-size:14px;">{{errorInfo}}</span>
      </el-form-item>

      <el-form-item label="社交账号登录">
        <img class="fl_left" style="height:25px;margin-top:8px;" src="@/assets/icon/qq.png" />
        <span class="fl_right" style="margin-right:10px;color:#2D83E4" @click="cut">注册账号</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import Axios from 'axios'
// import ElementUI from 'element-ui'

export default {
  name: 'login',
  props: {
    asLogin: {
      type: Boolean,
      default: () => true
    },
    backUrl: {
      type: String,
      default: () => '/'
    }
  },
  data () {
    return {
      errorInfo: '',
      form: {
        email: '',
        password: '',
        rememeberme: false
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        email: [
          { required: true, message: '邮箱不可为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不可为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.get(`${api.userInfo}/api/Account`, { params: {
            eMail: this.form.email,
            password: this.form.password
          } })
            .then(function (response) {
              if (response.data.success) {
                Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`// axios 请求头中Authorization的全局设置，一次配置，后续所有使用，都会携带着这个token，一起发送给后台api
                if (sessionStorage.getItem('lastFullPath') === window.location.href) {
                  window.location.replace('/#/home')
                } else { window.location.replace(sessionStorage.getItem('lastFullPath')) } // 登录成功，回退页面
              } else {
                confirm(response.data.msg)
              }
            })
        }
      })
    },
    cut () {
      this.$emit('update:asLogin', false)
    }
  }
}
</script>
<style scope>
.login-box {
  width: 320px;
  height: 450px;
  margin: auto;
  padding-top: 80px;
}
</style>
