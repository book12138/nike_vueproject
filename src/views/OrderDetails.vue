<template>
  <div class="paymentContainer">
    <!-- 页眉 -->
    <div class="paymentHead">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      订单详情
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <div class="paymentTitle">
      <div class="paymentTitle-content">
        <div class="paymentTitle-content-text fl_left">
          <span style="font-size:20px;">订单详情</span>
          <p style="font-size:12px;">即使订单已确认收货，我们也接受七天内无条件退款</p>
        </div>
        <img class="paymentTitle-content-img fl_right" src="@/assets/icon/支付.png" />
        <div class="clr"></div>
      </div>
    </div>

    <!-- 收货地址 -->
    <div class="payment-address">
      <img
        src="@/assets/icon/收货地址1.png"
        style="height:35px;margin:5px 20px 0px 10px;"
        class="fl_left"
      />
      <div class="fl_left" style="width:calc(95% - 70px);">
        <div class="addresseeInfo">
          <span class="name">{{address.consignee}}</span>
          <span class="phoneNumber">{{address.phoneNumber}}</span>
        </div>
        <p class="addressInfo">{{address.region + ' ' + address.detailAddress}}</p>
      </div>
      <div class="clr"></div>
    </div>

    <!-- 商品列表 -->
    <div class="payment-item-container">
      <div class="ordersku-item" v-for="item in orderInfo.orderInfos" :key="item.skuId">
        <img
          @click="showDetails(item.skuId)"
          :src="imageServerUrl + '/normal/' + item.skuInfo[0].imgName"
          class="ordersku-item-img fl_left"
        />
        <div class="ordersku-item-info fl_left">
          <p @click="showDetails(item.skuId)" class="ordersku-item-title">{{item.skuInfo[0].title}}</p>
          <div
            class="ordersku-item-skuinfo"
          >{{item.skuInfo[0].colorName + ',' + item.skuInfo[0].sizeName + '码'}}</div>
        </div>

        <div class="ordersku-item-rigthContent fl_right">
          <span style="color:#ff5400;">￥{{item.price}}</span>
          <span>×{{item.quantity}}</span>
        </div>

        <div class="clr"></div>
      </div>

      <div class="payment-priceInfo">
        <div class="payment-priceInfo-moudle">
          <span class="fl_left ss">商品总价</span>
          <span class="fl_right ss">￥{{ orderInfo.total }}</span>
          <div class="clr"></div>
        </div>
        <div class="payment-priceInfo-moudle">
          <span class="fl_left ss">运费（快递）</span>
          <span class="fl_right ss">￥0</span>
          <div class="clr"></div>
        </div>
        <div class="payment-priceInfo-moudle">
          <span class="fl_left">订单总价</span>
          <span class="fl_right">￥{{ orderInfo.total }}</span>
          <div class="clr"></div>
        </div>
        <div
          class="payment-priceInfo-moudle"
          style="border-top:1px solid #fafafa;padding-top:10px;"
        >
          <span class="fl_left">代付款</span>
          <span class="fl_right" style="color:red">￥{{ orderInfo.total }}</span>
          <div class="clr"></div>
        </div>
      </div>
    </div>

    <!-- 订单信息 -->
    <div class="payment-orderInfo">
      <div class="payment-orderInfo-head">订单信息</div>
      <div class="payment-orderInfo-moudle">
        <div style="width:110px;">发票</div>
        <div>个人</div>
      </div>
      <div class="payment-orderInfo-moudle">
        <div style="width:110px;">购物积分</div>
        <div>可获得100积分</div>
      </div>
      <div class="payment-orderInfo-moudle">
        <div style="width:110px;">订单编号</div>
        <div>{{orderInfo.id}}</div>
      </div>
      <div class="payment-orderInfo-moudle">
        <div style="width:110px;">创建时间</div>
        <div>{{orderInfo.createTime}}</div>
      </div>
    </div>

    <!-- 底部工具栏 -->
    <div class="payment-tool">
      <div class="payment-tool-btn fl_right" style="border-color: #e25e3a;">退款</div>
      <div class="clr"></div>
    </div>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'
import { mapActions } from 'vuex'

export default {
  props: ['orderId'],
  name: 'payment',
  data () {
    return {
      address: '',
      orderInfo: '',
      imageServerUrl: api.imageServer
    }
  },
  created () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.3)',
      target: document.querySelector('.div1')
    })

    this.$axios
      .get(
        `${api.order}/api/Order?id=${this.orderId}`
      )
      .then(success => {
        this.orderInfo = success.data
        this.appendSkuInfo()
        this.$axios
          .get(
            `${api.address}/api/ShippingAddress/id?id=${this.orderInfo.shippingAddressId}`
          )
          .then(successResponse => {
            this.address = successResponse.data
          })
      })
      .catch(error => {
        if (!auth.catchInfoFileter(error, true)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })

    loading.close()
  },
  methods: {
    ...mapActions('details', {
      setId: 'setId'
    }),
    backClickHandle () {
      this.back()
    },
    appendSkuInfo () {
      this.orderInfo.orderInfos.forEach(ele => {
        let target = ele
        this.$axios
          .get(`${api.skuservice}/api/SkuBasicInformation`, {
            params: { skuId: target.skuId }
          })
          .then(successResponse => {
            this.orderInfo.orderInfos.forEach(s => {
              if (s.skuId === target.skuId) {
                s.skuInfo.push(successResponse.data)
              }
            })
          })
      })
    },
    showDetails (id) {
      this.setId(id)
      this.$router.push({ name: 'details' })
    }
  }
}
</script>
<style scoped>
.paymentContainer {
  text-align: left;
  padding-bottom: 51px;
  width: 100%;
}

/* 页眉 */
.paymentHead {
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  text-align: center;
  color: white;
  background-image: linear-gradient(to right, #f79133, #e25e3a);
  position: fixed;
  top: 0px;
  width: 94%;
  padding: 0px 3%;
}

/* 关于代付款的提示性标题 */
.paymentTitle {
  width: 94%;
  height: 150px;
  margin-top: 50px;
  padding: 0px 3%;
  background-image: linear-gradient(to right, #f79133, #e25e3a);
}

.paymentTitle .paymentTitle-content {
  margin: auto;
  padding-top: 40px;
  width: 290px;
}

.paymentTitle-content .paymentTitle-content-text {
  color: aliceblue;
  width: 150px;
}

.paymentTitle-content .paymentTitle-content-img {
  width: 80px;
  height: 80px;
  margin-left: 60px;
}

/* 收货地址 */
.payment-address {
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 94%;
  padding: 20px 3% 10px 3%;
  margin-bottom: 10px;
}

/* sku展示 */
.payment-item-container {
  width: 94%;
  padding: 10px 3%;
  border-radius: 10px;
  background-color: white;
}

.ordersku-item {
  width: 100%;
  margin: auto;
  padding-bottom: 10px;
}

.ordersku-item .ordersku-item-img {
  width: 30%;
  margin-left: 5px;
}

.ordersku-item .ordersku-item-info {
  width: 48%;
  margin: 25px 0px 0px 5%;
  font-size: 12px;
}

.ordersku-item-info .ordersku-item-title {
  line-height: 16px;
}

.ordersku-item-info .ordersku-item-skuinfo {
  background-color: #fafafa;
  border-radius: 5px;
  margin-top: 10px;
}

.ordersku-item .ordersku-item-rigthContent {
  width: 12%;
  margin-top: 20px;
}

.ordersku-item-rigthContent span {
  display: block;
  margin-top: 10px;
}

/* 订单价格信息 */
.payment-priceInfo {
  margin-top: 20px;
}

.payment-priceInfo .payment-priceInfo-moudle {
  width: 94%;
  padding: 3px 3%;
  background-color: white;
  font-size: 13px;
}

.payment-priceInfo-moudle .ss {
  color: #999;
}

.payment-orderInfo {
  margin-top: 10px;
  background-color: white;
  padding: 10px 0px;
}

.payment-orderInfo .payment-orderInfo-head {
  border-left: 2px solid #e25e3a;
  width: 100%;
  margin-left: 2%;
  text-indent: 10px;
  margin-bottom: 10px;
}

.payment-orderInfo .payment-orderInfo-moudle {
  width: 94%;
  padding: 8px 3%;
  font-size: 13px;
  color: #999;
  margin: 0 10px;
}

.payment-orderInfo-moudle div {
  display: inline-block;
}

/* 工具栏 */
.payment-tool {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0px;
  background-color: white;
  border-top: 1px solid #fafafa;
  z-index: 99;
}

.payment-tool .payment-tool-btn {
  border-radius: 25px;
  height: 30px;
  margin-top: 8px;
  text-align: center;
  line-height: 30px;
  margin-right: 20px;
  border: 1px solid rgb(185, 184, 184);
  font-size: 13px;
  width: 100px;
}
</style>
