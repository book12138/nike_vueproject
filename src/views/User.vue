<template>
  <div>
    <div class="user">
      <!-- 用户的基本信息 -->
      <div class="userInfo">
        <img class="headImg fl_left" :src="imageServerUrl + '/headImg/' + headImg" />
        <div class="elseInfo fl_left">
          <div class="settingImgContianer">
            <img @click="settingClickHandle" src="@/assets/icon/设置.png" />
          </div>
          <span class="nickname">- {{nickname}} -</span>
          <div class="lable">
            <img class="fl_left" style="height:18px;" src="@/assets/icon/VIP (1).png" />
            <span class="lableItem fl-Left">购物积分0</span>
            <div class="clr"></div>
          </div>
        </div>
        <div class="clr"></div>
      </div>

      <!-- 常用功能 -->
      <div class="commonFunction">
        <div class="commonFunctionItem" @click="$router.push({name:'favorite'})">
          <span>{{favoriteCount}}</span>
          <span>商品收藏</span>
        </div>
        <div class="commonFunctionItem" @click="$router.push({name:'advance'})">
          <span>0</span>
          <span>卡券</span>
        </div>
        <div class="commonFunctionItem" @click="$router.push({name:'advance'})">
          <span>99</span>
          <span>浏览记录</span>
        </div>
      </div>

      <!-- 一些主要功能面板 -->
      <div class="mainFunction">
        <div class="mainFunction-head">
          <span class="fl_left">我的订单</span>
          <span class="fl_right">查看全部订单></span>
          <div class="clr"></div>
        </div>

        <!-- 正文 -->
        <div class="mainFunction-content">
          <div class="mainFunction-contentItem" @click="$router.push({name:'nonPaymentOrder'})">
            <img src="@/assets/icon/待付款.png" />
            <span>待付款</span>
          </div>

          <div class="mainFunction-contentItem" @click="$router.push({name:'nonShipmentsOrder'})">
            <img src="@/assets/icon/待发货.png" />
            <span>待发货</span>
          </div>

          <div class="mainFunction-contentItem" @click="$router.push({name:'deliveryOrder'})">
            <img src="@/assets/icon/待收货.png" />
            <span>待收货</span>
          </div>

          <div class="mainFunction-contentItem" @click="$router.push({name:'nonEvaluateOrder'})">
            <img src="@/assets/icon/待评价.png" />
            <span>待评价</span>
          </div>

          <div class="mainFunction-contentItem" @click="$router.push({name:'advance'})">
            <img src="@/assets/icon/退款.png" />
            <span>退款/售后</span>
          </div>
        </div>
      </div>

      <!-- 免费服务 -->
      <div class="freeService">
        <div class="freeService-head">
          <span class="fl_left">免费服务</span>
          <div class="clr"></div>
        </div>

        <!-- 正文 -->
        <div class="freeService-content">
          <div class="freeService-contentItem" @click="$router.push({name:'advance'})">
            <img src="@/assets/icon/会员充值.png" />
            <span>会员充值</span>
          </div>

          <div class="freeService-contentItem" @click="$router.push({name:'advance'})">
            <img src="@/assets/icon/优惠券.png" />
            <span>申领卡券</span>
          </div>

          <div class="freeService-contentItem"></div>

          <div class="freeService-contentItem"></div>

          <div class="freeService-contentItem"></div>
        </div>
      </div>
    </div>
    <Navigation></Navigation>
  </div>
</template>
<script>
import Navigation from '../components/Navigation.vue'
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'

export default {
  name: 'user',
  data () {
    return {
      email: '',
      nickname: '',
      headImg: '',
      imageServerUrl: api.imageServer,
      favoriteCount: 0
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

    this.$axios
      .get(`${api.favorite}/api/Count`)
      .then(succcessResponse => {
        this.favoriteCount = succcessResponse.data
      })
      .catch(error => {
        if (!auth.catchInfoFileter(error, true)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })
  },
  components: {
    Navigation
  },
  methods: {
    settingClickHandle () {
      this.$router.push({ name: 'accountSetting' })
    }
  }
}
</script>
<style scoped>
.user {
  width: 94%;
  padding: 10px 3% 51px 3%;
  text-align: left;
}

/* 用户的基本信息，如头像昵称等 */
.userInfo {
  display: block;
  margin-top: 10px;
}

.userInfo .headImg {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: 0px solid #999;
  margin-top: 10px;
}

.userInfo .elseInfo {
  height: 90px;
  width: calc(100% - 100px);
  margin-left: 20px;
}

.elseInfo .settingImgContianer {
  height: 20px;
  width: 100%;
  text-align: right;
}

.elseInfo .settingImgContianer img {
  height: 20px;
  width: 20px;
}

.elseInfo .nickname {
  font-size: 17px;
  width: 100%;
  background-image: -webkit-linear-gradient(
    left,
    red,
    #fd8403,
    rgb(201, 201, 15)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 位于昵称下面的小标签 */
.elseInfo .lable {
  font-size: 11px;
  margin-top: 5px;
}

/* 单个小标签 */
.elseInfo .lable .lableItem {
  padding: 2px 5px;
  border-radius: 20px;
  background-color: violet;
  color: white;
  margin-left: 5px;
}

/* 常用功能 */
.commonFunction {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

.commonFunction .commonFunctionItem {
  font-family: 幼圆;
  color: cadetblue;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  display: inline-block;
}

.commonFunction .commonFunctionItem span {
  display: block;
  margin-top: 2px;
}

/* 一些主要功能面板 */
.mainFunction {
  width: calc(100% - 20px);
  padding: 10px 10px;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
}

.mainFunction .mainFunction-head {
  height: 20px;
  font-size: 14px;
  padding-bottom: 2px;
  border-bottom: 0.5px solid #fafafa;
}

.mainFunction .mainFunction-head .fl_right {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

/* 主要功能面本正文 */
.mainFunction .mainFunction-content {
  width: 100%;
  padding: 20px 0px 10px 0px;
  display: flex;
  justify-content: space-around;
}

.mainFunction .mainFunction-content .mainFunction-contentItem {
  display: inline-block;
  text-align: center;
  width: 100px;
}

.mainFunction-contentItem img {
  height: 20px;
  margin: auto;
  display: block;
}

.mainFunction-contentItem span {
  font-size: 12px;
  display: block;
  margin-top: 2px;
}

/* 免费服务面板 */
.freeService {
  width: calc(100% - 20px);
  padding: 10px 10px;
  background-color: white;
  border-radius: 10px;
  margin-top: 20px;
}

.freeService .freeService-head {
  height: 20px;
  font-size: 14px;
  padding-bottom: 2px;
  border-bottom: 0.5px solid #fafafa;
}

.freeService .freeService-head .fl_right {
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

/* 主要功能面本正文 */
.freeService .freeService-content {
  width: 100%;
  padding: 20px 0px 10px 0px;
  display: flex;
  justify-content: space-around;
}

.freeService .freeService-content .freeService-contentItem {
  display: inline-block;
  text-align: center;
  width: 100px;
}

.freeService-contentItem img {
  height: 20px;
  margin: auto;
  display: block;
}

.freeService-contentItem span {
  font-size: 12px;
  display: block;
  margin-top: 2px;
}
</style>
