<template>
  <div style="margin-top:120px;text-align:left;margin-bottom:51px;">
    <Navigation :flag="3"></Navigation>
    <img
      v-show="orderInfo.length === 0"
      src="@/assets/icon/空空如也.png"
      style="position:absolute;top:150px;margin:0px calc(50% - 55px);width:100px;"
    />

    <!-- 订单列表 -->
    <div
      v-for="info in orderInfo"
      :key="info.id"
    >
      <div class="ordersku-item" v-for="item in info.orderInfos" :key="item.skuId">
        <img
          @click.self="$router.push({name:'orderDetails',params:{orderId:info.id}})"
          :src="imageServerUrl + '/normal/' + item.skuInfo[0].imgName"
          class="ordersku-item-img fl_left"
        />
        <div class="ordersku-item-info fl_left">
          <p
           @click.self="$router.push({name:'orderDetails',params:{orderId:info.id}})"
           class="ordersku-item-title">{{item.skuInfo[0].title}}</p>
          <div
            class="ordersku-item-skuinfo"
          >{{item.skuInfo[0].colorName + ',' + item.skuInfo[0].sizeName + '码'}}</div>
        </div>

        <div class="ordersku-item-rigthContent fl_right">
          <span style="color:#ff5400;">￥{{item.price}}</span>
          <span>×{{item.quantity}}</span>
        </div>

        <div class="clr"></div>

        <!-- 按钮组 -->
        <div class="ordersku-tool">
          <div class="ordersku-tool-btn fl_right" @click="confirmReceipt(info.id,item.skuId)">确认收货</div>
           <div class="ordersku-tool-btn fl_right" @click="$message.success('已提醒商家发货')">查看物流</div>
          <div class="clr"></div>
        </div>
      </div>
    </div>
     <BottomNavigation></BottomNavigation>
  </div>
</template>
<script>
import Navigation from '@/components/Order/Navigation'
import BottomNavigation from '../components/Navigation.vue'
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'

export default {
  name: 'deliveryOrder',
  data () {
    return {
      imageServerUrl: api.imageServer,
      orderInfo: []
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
      .get(`${api.order}/api/DeliveryOrder`)
      .then(success => {
        this.orderInfo = success.data
        this.appendSkuInfo()
      })
      .catch(error => {
        if (!auth.catchInfoFileter(error, true)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })

    loading.close()
  },
  methods: {
    appendSkuInfo () {
      this.orderInfo.forEach(element => {
        element.orderInfos.forEach(ele => {
          let target = ele
          this.$axios
            .get(`${api.skuservice}/api/SkuBasicInformation`, {
              params: { skuId: target.skuId }
            })
            .then(successResponse => {
              this.orderInfo.forEach(t => {
                t.orderInfos.forEach(s => {
                  if (s.skuId === target.skuId) {
                    s.skuInfo.push(successResponse.data)
                  }
                })
              })
            })
        })
      })
    },
    /** 确认收货 */
    confirmReceipt (orderId, skuId) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
        target: document.querySelector('.div1')
      })

      this.$axios.put(`${api.order}/api/DeliveryOrder`, {
        id: orderId,
        skuId: skuId
      }).then(success => {
        if (success.data.success) {
          this.$router.push({ name: 'evaluate', params: { orderId: orderId, skuId: skuId } })
        }
        loading.close()
      }).catch(error => {
        loading.close()
        if (!auth.catchInfoFileter(error, true)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })
    }
  },
  components: {
    Navigation,
    BottomNavigation
  }
}
</script>
<style scoped>
.ordersku-item {
  width: 94%;
  padding-bottom: 10px;
  margin: 10px 3% 10px 3%;
  border-radius: 10px;
  background-color: white;
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

/* 一行文字信息，显示数量和总价 */
.ordersku-price {
  width: 99%;
  text-align: right;
  margin-top: 5px;
}

/* 按钮组 */
.ordersku-tool {
  width: 100%;
  height: 50px;
  margin-top: 10px;
}

.ordersku-tool .ordersku-tool-btn {
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
