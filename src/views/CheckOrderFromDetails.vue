<template>
  <div style="text-align: left;">
    <div class="checkOrderHead">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      确认订单
    </div>

    <!-- 收货地址 -->
    <div class="checkOrder-address" @click="addressClickHandle">
      <img
        src="@/assets/icon/收货地址1.png"
        style="height:35px;margin:5px 20px 0px 10px;"
        class="fl_left"
      />
      <div v-if="address != ''" class="fl_left" style="width:calc(90% - 80px);">
        <div class="addresseeInfo">
          <span class="name">{{address.consignee}}</span>
          <span class="phoneNumber">{{address.phoneNumber}}</span>
        </div>
        <p class="addressInfo">{{address.region + ' ' + address.detailAddress}}</p>
      </div>

      <div v-else class="fl_left" style="width:calc(90% - 80px);margin-top:15px;">
        <i class="el-icon-edit"> 点击前往新建收货地址</i>
      </div>

      <span class="fl_right" style="margin:15px 10px 0px 0px;width:5%;">
        <i class="el-icon-arrow-right"></i>
      </span>
      <div class="clr"></div>
    </div>

   <!-- 产品列表 -->
    <div class="checksku-item-container">
      <!-- 购物车元素 -->
      <div class="checksku-item">
        <img :src="imageServerUrl + '/normal/' + images[0].fileName" class="checksku-item-img" />
        <div class="checksku-item-info">
          <p class="checksku-item-title">{{info.title}}</p>
          <div class="checksku-item-skuinfo">{{colorName + ',' + sizeName + '码'}}</div>
        </div>

        <div class="checksku-item-rigthContent">
          <span style="color:#ff5400;">￥{{price}}</span>
          <span>×{{userSelectNum}}</span>
        </div>
      </div>
    </div>

    <div class="checkOrder-tool">
      <div class="checkOrder-tool-btn fl_right" @click="commitBtnClickHandle">提交订单</div>
      <div class="checkOrder-tool-total fl_right">
        合计：
        <span style="color:#ff5400;">{{price}}</span>
      </div>
      <div class="checkOrder-tool-quantity fl_right">共{{userSelectNum}}件,</div>
    </div>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'
import { mapGetters } from 'vuex'

export default {
  name: 'checkOrder',
  data () {
    return {
      address: '',
      imageServerUrl: api.imageServer
    }
  },
  computed: {
    ...mapGetters('details', ['userSelectSku', 'userSelectNum', 'sizes', 'info', 'colors', 'images', 'id']),
    colorName () {
      let name = ''
      this.colors.forEach(element => {
        if (element.skuId === this.id) { name = element.name }
      })
      return name
    },
    sizeName () {
      let name = ''
      this.sizes.forEach(element => {
        if (element.skuId === this.userSelectSku) { name = element.name }
      })
      return name
    },
    price () {
      let money = this.info.price
      if (this.info.skuSuggestivePromotion) {
        let startTime = this.info.skuSuggestivePromotion.startTime
        let endTime = this.info.skuSuggestivePromotion.endTime
        if (startTime != null && startTime !== undefined &&
          endTime != null && endTime !== undefined) {
          let datetimenow = new Date()
          startTime = new Date(Date.parse(startTime))
          endTime = new Date(Date.parse(endTime))
          if (datetimenow >= startTime && datetimenow < endTime) { // 促销正在进行，且未结束
            money = this.info.skuSuggestivePromotion.price
          }
        }
      }
      return money
    }
  },
  created () {
    if (sessionStorage.getItem('userSelectOrderAddress')) {
      this.$axios
        .get(
          `${api.address}/api/ShippingAddress/id?id=${sessionStorage.getItem(
            'userSelectOrderAddress'
          )}`
        )
        .then(successResponse => {
          this.address = successResponse.data
        }).catch(error => {
          if (!auth.catchInfoFileter(error, false)) {
            this.$message.error('对于你的请求处理出现了错误')
          }
        })
    } else {
      this.$axios
        .get(`${api.address}/api/DefaultShippingAddress`)
        .then(successResponse => {
          if (successResponse.data.success) {
            this.address = successResponse.data.shippingAddressInfo
          }
        }).catch(error => {
          if (!auth.catchInfoFileter(error, false)) {
            this.$message.error('对于你的请求处理出现了错误')
          }
        })
    }
  },
  methods: {
    backClickHandle () {
      this.back()
    },
    commitBtnClickHandle () {
      if (this.address.id) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
          target: document.querySelector('.div1')
        })

        this.$axios
          .post(`${api.order}/api/Order`, {
            cartBasicInformationDtos: JSON.stringify([{ cartId: '', skuId: this.userSelectSku, price: this.price, quantity: this.userSelectNum }]),
            shippingAddressId: this.address.id
          })
          .then(successResponse => {
            if (successResponse.data.success) {
              sessionStorage.setItem('orderId', successResponse.data.id)
              this.$router.replace({ name: 'payment' })
            }
          })
          .catch(error => {
            if (!auth.catchInfoFileter(error, true)) {
              this.$message.error('对于你的请求处理出现了错误')
            }
          })
        loading.close()
      } else {
        this.$message.error('请选择收货地址')
      }
    },
    addressClickHandle () {
      this.$router.push({ name: 'selectAddress' })
    }
  },
  beforeDestroy () {
    sessionStorage.removeItem('userSelectOrderAddress')
  }
}
</script>
<style scoped>
.checkOrderHead {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 50px;
  font-size: 15px;
  color: white;
  background-color: #e48125;
  position: fixed;
  z-index: 99;
  padding: 0 10px;
  top: 0px;
}

/* 收货地址 */
.checkOrder-address {
  margin-top: 60px;
  background-color: white;
  border-radius: 10px;
  width: 94%;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 10px;
}

/* sku展示 */
.checksku-item-container {
  width: 94%;
  padding: 10px 0px;
  margin: 0px 3%;
  border-radius: 10px;
  background-color: white;
}

.checksku-item {
  width: 100%;
  margin: auto;
}

.checksku-item .checksku-item-img {
  width: 30%;
  display: inline-block;
}

.checksku-item .checksku-item-info {
  width: 50%;
  display: inline-block;
  margin: 0px 5%;
  font-size: 12px;
}

.checksku-item-info .checksku-item-title {
  line-height: 16px;
}

.checksku-item-info .checksku-item-skuinfo {
  background-color: #fafafa;
  border-radius: 5px;
}

.checksku-item .checksku-item-rigthContent {
  width: 10%;
  display: inline-block;
}

.checksku-item-rigthContent span {
  display: block;
  margin-top: 10px;
}

/* 底部工具栏 */
.checkOrder-tool {
  width: 100%;
  background-color: white;
  height: 50px;
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #fafafa;
}

.checkOrder-tool .checkOrder-tool-quantity {
  font-size: 12px;
  margin-top: 20px;
  margin-right: 5px;
}

.checkOrder-tool .checkOrder-tool-total {
  margin-top: 16.5px;
  margin-right: 10px;
}

.checkOrder-tool .checkOrder-tool-btn {
  border-radius: 25px;
  width: 110px;
  background-image: linear-gradient(to bottom right, #e25e3a, #f58012);
  height: 40px;
  margin-top: 5px;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  margin-right: 10px;
}
</style>
