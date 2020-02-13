<template>
  <div>
    <div class="cartHead">
      <span class="fl_left" style="font-size:20px;font-weight:600;">购物车</span>
      <span class="manageBtn fl_right" @click="manageBtnClickHandle">{{manageBtnTitle}}</span>
      <div class="clr"></div>
      <div class="numTitle">共16件宝贝</div>
    </div>

    <div class="cart">
      <div class="cat-container">
        <!-- 购物车元素 -->
        <div class="cart-item" v-for="item in cartInfo" :key="item.id">
          <el-checkbox v-model="item.select" class="cart-item-check"></el-checkbox>
          <img @click="showDetails(item.skuId)" :src="imageServerUrl + '/normal/' + item.colorImgName" class="cart-item-img" />
          <div class="cart-item-info">
            <div class="title">
              <p @click="showDetails(item.skuId)">{{item.title}}</p>
            </div>
            <div>
              <div class="skuinfo fl_left" @click="handleOpen(item.skuId)">{{item.colorName}}</div>
              <div class="skuinfo fl_left" @click="handleOpen(item.skuId)">{{ item.sizeName + ' 码' }}</div>
              <div class="clr"></div>
            </div>
            <span class="fl_left" style="color:#ff5400;">￥{{item.price}}</span>
            <el-input-number
              class="fl_right"
              v-model="item.quantity"
              @change="quantityChangHandle(item.id)"
              size="mini"
              :min="1"
              :max="item.limit"
            ></el-input-number>
            <div class="clr"></div>
          </div>
          <div class="clr"></div>
        </div>

        <img
          v-show="cartInfo.length === 0"
          src="@/assets/icon/空空如也.png"
          style="position:absolute;top:150px;margin:0px calc(50% - 55px);width:100px;"
        />
      </div>
    </div>

    <!-- 从底部弹出的抽屉 -->
    <el-drawer
      title="修改款式"
      size="60%"
      :with-header="false"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div style="width: 96%;margin:auto;">
        <SKUColors></SKUColors>
        <br />
        <SKUSizes></SKUSizes>
      </div>
    </el-drawer>

    <!-- 用户的操作按钮区 -->
    <div class="userPlaysHolder">
      <el-checkbox v-model="checkAll" style="margin-top:15px;margin-left:20px;">全选</el-checkbox>

      <!-- 结算账户 -->
      <div v-if="asCloseAccount" class="closeAccount fl_right">
        <div class="closeBtn fl_right" @click="closeBtnClickHandle">结算</div>
        <div class="moneyContainer fl_right">
          合计：
          <span class="money">{{totalMoney}}</span>
        </div>
      </div>
      <!-- 清理购物车 -->
      <div v-else class="clearCart fl_right">
        <div class="remove fl_right" @click="cartItemDelete">删除</div>
        <div class="addToFavorites fl_right" @click="pushToFavorite">移入收藏夹</div>
        <div class="clr"></div>
      </div>
      <div class="clr"></div>
    </div>
    <Navigation></Navigation>
  </div>
</template>
<script>
import Navigation from '@/components/Navigation'
import { api } from '@/axios/config.js'
import { mapGetters, mapActions } from 'vuex'
import SKUColors from '@/components/Details/SKUColors'
import SKUSizes from '@/components/Details/SKUSizes'
import { auth } from '@/router/auth.js'

export default {
  name: 'cart',
  data () {
    return {
      cartInfo: [],
      asCloseAccount: true,
      manageBtnTitle: '管理',
      drawer: false,
      direction: 'btt',
      currentSku: '',
      imageServerUrl: api.imageServer
    }
  },
  components: {
    Navigation,
    SKUColors,
    SKUSizes
  },
  computed: {
    ...mapGetters('details', ['userSelectSku']),
    totalMoney: function () {
      let temp = 0
      this.cartInfo.forEach(element => {
        if (element.select) {
          temp += parseInt(element.price) * element.quantity
        }
      })
      return `￥${temp}`
    },
    checkAll: {
      get: function () {
        let temp = true
        this.cartInfo.forEach(element => {
          if (!element.select) {
            temp = false
          }
        })
        if (this.cartInfo.length === 0) {
          temp = false
        }
        return temp
      },
      set: function (params) {
        this.cartInfo.forEach(element => {
          element.select = params
        })
      }
    }
  },
  methods: {
    ...mapActions('details', {
      setId: 'setId',
      setUserSelectSku: 'setUserSelectSku'
    }),
    /**
     * 数量的修改
     */
    quantityChangHandle (id) {
      // var temp = [id]
      let quantityNow = 0
      this.cartInfo.forEach(element => {
        if (element.id === id) {
          quantityNow = element.quantity
        }
      })
      this.$axios
        .put(`${api.cart}/api/Cartinfo`, {
          id: id,
          skuId: '',
          quantity: parseInt(quantityNow)
        })
        .then(
          successResponse => {
            if (!successResponse.data.success) {
              let errorInfo = ''
              successResponse.data.msg.forEach(element => {
                errorInfo += element.value + '；'
              })
              this.$message.error(errorInfo)
            }
          }
        ).catch(error => {
          if (!auth.catchInfoFileter(error, false)) {
            this.$message.error('对于你的请求处理出现了错误')
          }
        })
    },
    /** 打开抽屉 */
    handleOpen (skuId) {
      this.setId(skuId)
      this.setUserSelectSku(skuId)
      this.currentSku = skuId
      this.drawer = true
    },
    /** 关上抽屉 */
    handleClose (done) {
      done()
      if (this.currentSku === this.userSelectSku) {
        return
      }
      let quantityNow = 0
      let cartItemId = ''
      this.cartInfo.forEach(element => {
        if (element.skuId === this.currentSku) {
          quantityNow = element.quantity
          cartItemId = element.id
        }
      })
      this.$axios
        .put(`${api.cart}/api/Cartinfo`, {
          id: cartItemId,
          skuId: this.userSelectSku,
          quantity: parseInt(quantityNow)
        })
        .then(
          successResponse => {
            if (!successResponse.data.success) {
              let errorInfo = ''
              successResponse.data.msg.forEach(element => {
                errorInfo += element.value + '；'
              })
              this.$message.error(errorInfo)
            } else {
              this.$axios.get(`${api.cart}/api/Cartinfo/skuId?skuId=${this.userSelectSku}`)
                .then(success => {
                  this.cartInfo.forEach(element => {
                    if (element.skuId === this.currentSku) {
                      element.skuId = this.userSelectSku
                      element.colorName = success.data.colorName
                      element.sizeName = success.data.sizeName
                      element.colorImgName = success.data.colorImgName
                      element.limit = success.data.limit
                      element.price = success.data.price
                      element.quantity = success.data.quantity
                    }
                  })
                })
            }
          }
        ).catch(error => {
          if (!auth.catchInfoFileter(error, false)) {
            this.$message.error('对于你的请求处理出现了错误')
          }
        })
    },
    /** 管理按钮的点击 */
    manageBtnClickHandle () {
      if (this.asCloseAccount) {
        this.asCloseAccount = false
        this.manageBtnTitle = '完成'
      } else {
        this.asCloseAccount = true
        this.manageBtnTitle = '管理'
      }
    },
    closeBtnClickHandle () {
      let skus = []
      this.cartInfo.forEach(element => {
        if (element.select) {
          skus.push(element.skuId)
        }
      })
      if (skus.length > 0) {
        sessionStorage.setItem('userSelectSkus', skus)
        this.$router.push({ name: 'checkOrder' })
      }
    },
    /** 删除购物车内商品 */
    cartItemDelete () {
      let temp = ''
      let flag = true
      this.cartInfo.forEach(element => {
        if (element.select) {
          if (flag) {
            temp = element.id
            flag = false
          } else {
            temp += ',' + element.id
          }
        }
      })
      if (temp !== '') {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
          target: document.querySelector('.div1')
        })
        this.$axios.delete(`${api.cart}/api/CartInfo?ids=${temp}`)
          .then(success => {
            if (success.data.success) {
              this.$axios
                .get(`${api.cart}/api/Cartinfo`)
                .then(successResponse => {
                  // 请求成功
                  this.cartInfo = successResponse.data
                  loading.close()
                })
                .catch(error => {
                  loading.close()
                  if (!auth.catchInfoFileter(error, false)) {
                    this.$message.error('对于你的请求处理出现了错误')
                  }
                })
            } else {
              let errorInfo = ''
              success.data.msg.forEach(element => {
                errorInfo += element.value + '；'
              })
              this.$message.error(errorInfo)
              loading.close()
            }
          }).catch(error => {
            loading.close()
            if (!auth.catchInfoFileter(error, false)) {
              this.$message.error('对于你的请求处理出现了错误')
            }
          })
      }
    },
    /** 移入收藏夹 */
    pushToFavorite () {
      let temp = ''
      let flag = true
      this.cartInfo.forEach(element => {
        if (element.select) {
          if (flag) {
            temp = element.skuId
            flag = false
          } else {
            temp += ',' + element.skuId
          }
        }
      })
      if (temp !== '') {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
          target: document.querySelector('.div1')
        })

        this.$axios.post(`${api.favorite}/api/Favorite?ids=${temp}`)
          .then(success => {
            loading.close()
            this.cartItemDelete()
          }).catch(error => {
            loading.close()
            if (!auth.catchInfoFileter(error, false)) {
              this.$message.error('对于你的请求处理出现了错误')
            }
          })
      }
    },
    showDetails (id) {
      this.setId(id)
      this.$router.push({ name: 'details' })
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
      .get(`${api.cart}/api/Cartinfo`)
      .then(successResponse => {
        // 请求成功
        this.cartInfo = successResponse.data
        loading.close()
      })
      .catch(error => {
        loading.close()
        if (!auth.catchInfoFileter(error, true)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })
  }
}
</script>
<style scope>
.cartHead {
  width: 94%;
  padding: 10px 3%;
  position: fixed;
  z-index: 99;
  top: 0px;
  text-align: left;
  background-color: #fafafa;
}

.cart {
  height: 100%;
  margin: auto;
  padding: 65px 10px 102px 10px;
  text-align: left;
}

.manageBtn {
  font-size: 16px;
  margin-top: 5px;
  color: #111111;
}

/* 共有多少件宝贝这几个字 */
.numTitle {
  color: #999;
  margin-top: 10px;
  font-size: 14px;
  width: 100%;
}

/* 购物车内容 */
.cat-container {
  margin-top: 20px;
}

/* 购物车单个产品 */
.cart-item {
  width: 320px;
  padding: 10px 5px;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  margin-bottom: 10px;
  box-shadow: 0 5px 5px rgb(241, 243, 219);
}

/* 复选框 */
.cart-item .cart-item-check {
  float: left;
  margin-top: 40px;
}

/* sku 图片 */
.cart-item .cart-item-img {
  float: left;
  height: 100px;
  width: 100px;
  margin-left: 10px;
}

/* 一些别的信息 */
.cart-item .cart-item-info {
  float: right;
  width: 190px;
  padding: opx 10px;
}

.cart-item-info .title {
  height: 50px;
  overflow: hidden;
}

/* 产品标题 */
.cart-item-info .title p {
  line-height: 20px;
  font-size: 14px;
  color: #111111;
}

/* 产品的款式信息 */
.cart-item-info .skuinfo {
  background-color: #fafafa;
  margin: 10px 0px;
  font-size: 12px;
  height: 18px;
  border-radius: 10px;
  padding: 2px 6px;
  line-height: 18px;
  margin-left: 2px;
}

/* 用户操作区 */
.userPlaysHolder {
  position: fixed;
  z-index: 99;
  bottom: 51px;
  width: 100%;
  background-color: white;
  border-top: 1px solid #f0f0f0;
  height: 50px;
  text-align: left;
}

/* 显示金额区 */
.moneyContainer {
  float: left;
  font-size: 14px;
  margin-top: 15px;
  margin-right: 10px;
}

.moneyContainer .money {
  color: #ff5500;
}

/* 结算按钮 */
.closeBtn {
  height: 40px;
  margin-top: 5px;
  border-radius: 30px;
  width: 80px;
  text-align: center;
  line-height: 40px;
  color: white;
  background-image: linear-gradient(to right, #ff8201, #ff5e0d);
  margin-right: 20px;
}

/* 移入收藏夹按钮 */
.addToFavorites {
  height: 20px;
  margin-top: 10px;
  border: 1px solid #ff9000;
  color: #ff9000;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 10px;
  font-size: 14px;
}

/* 从购物车删除的按钮 */
.remove {
  height: 20px;
  margin-top: 10px;
  border: 1px solid #cb4045;
  color: #cb4045;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 20px;
  font-size: 14px;
}
</style>
