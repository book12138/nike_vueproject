<template>
  <div style="text-align: left;">
    <!-- 页眉 -->
    <div class="head">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      编辑资料
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <div class="settingModules" style="margin-top:51px">
      <!-- 用户基本信息修改入口 -->
      <div class="userAccess" @click="userAccessClickHandle">
        <img class="headImg fl_left" :src="imageServerUrl + '/headImg/' + headImg" />
        <div class="fl_left" style="margin:10px 0px 0px 10px;">
          <span class="nickname">- {{nickname}} -</span>
          <span class="email">邮箱：{{email}}</span>
        </div>
        <span class="beacon fl_right">
          <i class="el-icon-arrow-right"></i>
        </span>
        <div class="clr"></div>
      </div>

      <!-- 收货地址设置 -->
      <div class="common" @click="addressManageClickHandle">
        地址管理
        <span class="beacon fl_right">
          <i class="el-icon-arrow-right"></i>
        </span>
        <div class="clr"></div>
      </div>

      <!-- 密码设置 -->
      <div class="common" @click="$router.push({name:'checkPassWord'})">
        账户与安全
        <span class="beacon fl_right">
          <i class="el-icon-arrow-right"></i>
        </span>
        <span class="asseccTitle fl_right">密码管理</span>
        <div class="clr"></div>
      </div>
    </div>

    <div class="settingModules">
      <div style="width:100%;font-size:14px;text-align:center;" @click="logOut">退出登录</div>
    </div>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'
import Axios from 'axios'

export default {
  name: 'accountsetting',
  data () {
    return {
      email: '',
      nickname: '',
      headImg: '',
      imageServerUrl: api.imageServer
    }
  },
  created () {
    this.$axios
      .get(`${api.userInfo}/api/UserInfo`)
      .then(succcessResponse => {
        this.email = succcessResponse.data.eMail
        this.nickname = succcessResponse.data.nickName
        this.headImg = succcessResponse.data.headImg
      })
      .catch(error => {
        if (!auth.catchInfoFileter(error, true)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })
  },
  methods: {
    backClickHandle () {
      this.back()
    },
    userAccessClickHandle () {
      this.$router.push({ name: 'userInfoEditor' })
    },
    addressManageClickHandle () {
      this.$router.push({ name: 'addressManage' })
    },
    logOut () {
      Axios.defaults.headers.common['Authorization'] = ''
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style scoped>
.head {
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 15px;
  color: white;
  background-color: #e48125;
  /* background-image: linear-gradient(to bottom, #eb6c23ec, #e48125); */
  position: fixed;
  z-index: 99;
  top: 0px;
}

.back {
  font-size: 25px;
}

/* 每一个模块 */
.settingModules {
  border-radius: 10px;
  background-color: white;
  padding: 10px 0px;
  margin: 0px 5px 10px 5px;
}

/* 用户基本信息修改入口 */
.userAccess {
  width: 94%;
  padding: 0px 3% 10px 3%;
  height: 60px;
  border-bottom: 1px solid #ededed;
}

.userAccess .headImg {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  display: inline-block;
}

.nickname {
  font-size: 14px;
  display: block;
}

.email {
  font-size: 14px;
  display: block;
  color: #999;
}

.userAccess .beacon {
  font-size: 15px;
  font-weight: 300;
  margin-top: 23px;
}

/* 通用模板 */
.common {
  width: 94%;
  padding: 0px 3% 0px 3%;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}

.common .asseccTitle {
  margin-right: 10px;
  font-size: 14px;
  color: #999;
}

.common .beacon {
  font-size: 15px;
}
</style>
