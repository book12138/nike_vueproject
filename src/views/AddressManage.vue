<template>
  <div>
    <!-- 页眉 -->
    <div class="settingHead">
      <span class="back fl_left" @click="backClickHandle">﹤</span>
      地址管理
    </div>

    <div style="margin-top:51px;"></div>

    <div class="addressMoudles" v-for="item in addresses" :key="item.id" @click="addressItemClickHandle(item.id)">
      <div class="contentContainer">
        <div class="addresseeInfo">
          <span class="name">{{item.consignee}}</span>
          <span class="phoneNumber">{{item.phoneNumber}}</span>
          <span class="defaultLable" v-show="item.default">默认</span>
        </div>
        <p class="addressInfo">{{item.region + ' ' + item.detailAddress}}</p>
      </div>

      <div class="userPlayContainer">
        <span>
          <i class="el-icon-edit"></i>
        </span>
      </div>
    </div>

    <div
      class="addressMoudles"
      @click="addAddressClickHandle"
      style="margin-top:20px;line-height:30px;text-align:center;"
    >
      <span>
        添加新地址
        <i class="el-icon-edit-outline"></i>
      </span>
    </div>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'

export default {
  name: 'addressManage',
  data () {
    return {
      addresses: []
    }
  },
  created () {
    this.$axios.get(`${api.address}/api/ShippingAddress`)
      .then(successResponse => {
        this.addresses = successResponse.data
      }).catch(error => {
        if (!auth.catchInfoFileter(error, false)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })
  },
  methods: {
    backClickHandle () {
      this.back()
    },
    addAddressClickHandle () {
      this.$router.push({ name: 'addAddress' })
    },
    addressItemClickHandle (id) {
      sessionStorage.setItem('modifyAddressItemId', id)
      this.$router.push({ name: 'addressModify' })
    }
  }
}
</script>
<style scoped>
/* 页眉 */
.settingHead {
  height: 50px;
  width: 100%;
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

/* 一个一个模块，指代每一行 */
.addressMoudles {
  width: 94%;
  background-color: white;
  border-bottom: 1px solid #ededed;
  padding: 5px 3%;
  min-height: 30px;
  font-size: 13px;
  text-align: left;
}

.addressMoudles .contentContainer {
  width: 80%;
  padding-left: 2%;
  line-height: 30px;
  display: inline-block;
}

.contentContainer .addresseeInfo .name,
.phoneNumber {
  font-weight: 600;
  font-size: 16px;
  font-family: 宋体;
  color: black;
}

.contentContainer .addresseeInfo .phoneNumber {
  margin-left: 12%;
}

.contentContainer .addresseeInfo .defaultLable {
  font-size: 10px;
  padding: 4px 6px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: palevioletred;
  color: white;
}

.contentContainer .addressInfo {
  line-height: 18px;
  margin-top: 2px;
}

.addressMoudles .userPlayContainer {
  width: 16%;
  display: inline-block;
  text-align: right;
  font-size: 16px;
}
</style>
