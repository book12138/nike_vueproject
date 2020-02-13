<template>
  <!-- 页面底部导航栏 -->
  <div class="navigation">

    <div class="navigation-item" @click="homeLinkClickHander">
      <img src="../assets/icon/主页.png" />
      <span>主 页</span>
    </div>
    <div class="navigation-item" @click="customerserviceLinkClickHander">
      <img src="../assets/icon/客服.png" />
      <span>客 服</span>
    </div>
    <div class="navigation-item" @click="$router.push({name:'nonPaymentOrder'})">
      <img src="../assets/icon/订单.png" />
      <span>订 单</span>
    </div>
    <div class="navigation-item" @click="cartLinkClickHander">
      <img src="../assets/icon/购物车.png" />
      <span>购物车</span>
    </div>
    <div class="navigation-item" @click="userLinkClickHander">
      <img src="../assets/icon/user-fill.png" />
      <span>我 的</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'navigation',
  methods: {
    homeLinkClickHander () {
      this.$router.push({ name: 'home' })
    },
    cartLinkClickHander () {
      this.$router.push({ name: 'cart' })
    },
    customerserviceLinkClickHander () {
      this.$router.push({ name: 'customerservice' })
    },
    userLinkClickHander () {
      this.$router.push({ name: 'user' })
    }
  }
}
</script>
<style scoped>
.navigation {
  cursor: pointer;
  height: 50px;
  background-color: white;
  width: 100%;
  position: fixed;
  bottom: 0px;
  border-top: 1px solid #f0f0f0;
  display: -webkit-flex;
  display: flex;
  justify-content: space-around;
  z-index: 99;
}

.navigation .navigation-item {
  width: 30px;
  text-align: center;
  height: 40px;
  font-size: 10px;
  color: #999;
  margin-top: 10px;
  display: inline-block;
}

.navigation-item img {
  height: 20px;
  display: block;
  margin-left: 4px;
}

.navigation-item span {
  display: block;
}
</style>
