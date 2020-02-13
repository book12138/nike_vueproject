<template>
  <div>
    <el-form ref="registerForm" :model="form" :rules="rules" class="register-box">
      <el-form-item>
        <img style="height:50px;" src="@/assets/images/nike-logo.png" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          prefix-icon="el-icon-message"
          type="text"
          placeholder="请输入邮箱"
          v-model="form.email"
        ></el-input>
      </el-form-item>

      <el-form-item prop="pass">
        <el-input
          prefix-icon="el-icon-view"
          type="password"
          placeholder="请输入密码"
          v-model="form.pass"
        ></el-input>
      </el-form-item>

      <el-form-item prop="checkPass">
        <el-input
          prefix-icon="el-icon-view"
          type="password"
          placeholder="请再次输入密码"
          v-model="form.checkPass"
        ></el-input>
      </el-form-item>

      <el-form-item prop="nickname">
        <el-input
          prefix-icon="el-icon-user"
          type="text"
          placeholder="请输入昵称"
          v-model="form.nickname"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-checkbox class="fl_left" v-model="form.agreeProtocol">同意用户协议</el-checkbox>
        <!-- <span class="fl_left" style="color:#909399"></span> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%" v-on:click="onSubmit('registerForm')">注册</el-button>
      </el-form-item>

      <el-form-item label="社交账号注册">
        <img class="fl_left" style="height:25px;margin-top:8px;" src="@/assets/icon/qq.png" />
        <span class="fl_right" style="margin-right:10px;color:#2D83E4" @click="cut">登入</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import Axios from 'axios'

export default {
  name: 'register',
  props: {
    asLogin: {
      type: Boolean,
      default: () => true
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    var emailValidate = (rule, value, callback) => {
      var reg = new RegExp(
        '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
      ) // 正则表达式
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!reg.test(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    }

    return {
      form: {
        email: '',
        pass: '',
        checkPass: '',
        nickname: '',
        agreeProtocol: true
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        email: [{ validator: emailValidate, trigger: 'change' }],
        nickname: [
          { required: true, message: '昵称不可为空', trigger: 'blur' }
        ],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(`${api.userInfo}/api/Account`, {
              email: this.form.email,
              password: this.form.pass,
              nickname: this.form.nickname
            })
            .then(function (response) {
              if (response.data.success) {
                Axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}` // axios 请求头中Authorization的全局设置，一次配置，后续所有使用，都会携带着这个token，一起发送给后台api
                if (
                  sessionStorage.getItem('lastFullPath') ===
                  window.location.href
                ) {
                  window.location.replace('/#/home')
                } else {
                  window.location.replace(
                    sessionStorage.getItem('lastFullPath')
                  ) // 登录成功，回退页面
                }
              } else {
                let errorInfo = ''
                response.data.msg.forEach(element => {
                  errorInfo += element.value + '；'
                })
                confirm(errorInfo)
              }
            })
            .catch(function (error) {
              confirm(`错误信息：${error}`)
            })
        } else {
          this.$notify.error({
            title: '哎呀，出错了',
            message: '亲，您好像还有信息忘了填哦'
          })
        }
      })
    },
    cut () {
      this.$emit('update:asLogin', true)
    }
  }
}
</script>
<style scope>
.register-box {
  width: 320px;
  height: 450px;
  margin: auto;
  padding-top: 80px;
}
</style>
