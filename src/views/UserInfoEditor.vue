<template>
  <div style="text-align: left;">
    <!-- 页眉 -->
    <div class="settingHead">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      编辑资料
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <div class="headImgContianer">
      <img class="headImg" :src="imageServerUrl + '/headImg/' + headImg" />
      <span @click="$router.push({name:'uploadHeadImg'})">更改头像</span>
    </div>

    <div class="moudles" style="margin-top:30px;">
      <div class="titleContainer">邮箱</div>
      <div class="userPlayContainer">
        <input v-model="email" @change="emailChangeHandle" type="text" />
      </div>
    </div>

    <div class="moudles" style>
      <div class="titleContainer">昵称</div>
      <div class="userPlayContainer">
        <input v-model="nickname" @change="nicknameChangeHandle" type="text" />
      </div>
    </div>

    <div
      class="moudles"
      @click="saveBtnClickHandle"
      style="margin-top:20px;text-align:center;line-height:30px;"
    >保存修改</div>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'

export default {
  name: 'userInfoEditor',
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
    emailChangeHandle () {
      if (this.email === '') {
        this.$message.error('邮箱不可为空')
      }
    },
    nicknameChangeHandle () {
      if (this.nickname === '') {
        this.$message.error('昵称不可为空')
      }
    },
    /** 保存按钮被点击 */
    saveBtnClickHandle () {
      let isError = false
      if (this.email === '') {
        this.$message.error('邮箱不可为空')
        isError = true
      }
      if (this.nickname === '') {
        this.$message.error('昵称不可为空')
        isError = true
      }
      if (!isError) {
        this.$axios
          .put(`${api.userInfo}/api/UserInfo`, {
            eMail: this.email,
            nickName: this.nickname
          })
          .then(successResponse => {
            if (successResponse.data.success) {
              this.back()
            } else {
              let errorInfo = ''
              successResponse.data.msg.forEach(element => {
                errorInfo += element.value + '；'
              })
              this.$message.error(errorInfo)
            }
          })
          .catch(error => {
            if (!auth.catchInfoFileter(error, false)) {
              this.$message.error('对于你的请求处理出现了错误')
            }
          })
      }
    }
  }
}
</script>
<style scoped>
/* 页眉 */
.settingHead {
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

/* 头像区 */
.headImgContianer {
  width: 100%;
  text-align: center;
  margin-top: 70px;
}

/* 头像 */
.headImgContianer .headImg {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto;
  display: block;
}

/* 更改头像四个字 */
.headImgContianer span {
  display: block;
  margin-top: 10px;
  font-size: 14px;
  color: #e48125;
}

/* 一个一个模块，指代每一行 */
.moudles {
  width: 94%;
  background-color: white;
  border-bottom: 1px solid #ededed;
  padding: 5px 3%;
  height: 30px;
  font-size: 13px;
}

.moudles .titleContainer {
  width: 30%;
  padding-left: 2%;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}

.moudles .userPlayContainer {
  width: 60%;
  display: inline-block;
}

.userPlayContainer input {
  width: 100%;
  height: 20px;
  border: 0px;
}
</style>
