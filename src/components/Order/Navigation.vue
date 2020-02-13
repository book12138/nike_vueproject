<template>
  <div class="orderNavigation">
    <div class="orderNavigation-head">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      我的订单
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <span class="orderNavigation-menu">
      <div class=".orderNavigation-menu-item" @click="$router.replace({name:'nonPaymentOrder'})">
        <span :class="[flag == 1 ? 'orderNavigation_currentTextColor':'']">待付款</span>
        <div :class="[flag == 1 ? 'orderNavigation_show':'orderNavigation_hiden']"></div>
      </div>
      <div class=".orderNavigation-menu-item" @click="$router.replace({ name: 'nonShipmentsOrder' })">
        <span :class="[flag == 2 ? 'orderNavigation_currentTextColor':'']">待发货</span>
        <div :class="[flag == 2 ? 'orderNavigation_show':'orderNavigation_hiden']"></div>
      </div>
      <div class=".orderNavigation-menu-item"  @click="$router.replace({name:'deliveryOrder'})">
        <span :class="[flag == 3 ? 'orderNavigation_currentTextColor':'']">待收货</span>
        <div :class="[flag == 3 ? 'orderNavigation_show':'orderNavigation_hiden']"></div>
      </div>
      <span class=".orderNavigation-menu-item"  @click="$router.replace({name:'nonEvaluateOrder'})">
        <span :class="[flag == 4 ? 'orderNavigation_currentTextColor':'']">待评价</span>
        <div :class="[flag == 4 ? 'orderNavigation_show':'orderNavigation_hiden']"></div>
      </span>
    </span>
  </div>
</template>
<script>
export default {
  props: ['flag'],
  name: 'orderNavigation',
  methods: {
    backClickHandle () {
      this.back()
    }
  }
}
</script>
<style scoped>
/* 订单导航栏 */
.orderNavigation {
  position: fixed;
  top: 0px;
  height: 100px;
  width: 94%;
  padding: 0px 3%;
  background-color: #fafafa;
  padding-bottom: 10px;
}

/* 头 */
.orderNavigation .orderNavigation-head {
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
}

/* 菜单 */
.orderNavigation-menu {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  line-height: 50px;
}

.orderNavigation-menu .orderNavigation-menu-item {
  display: inline-block;
  width: 60px;
  font-size: 13px;
  text-align: center;
}

.orderNavigation_currentTextColor {
  color: #e66465;
}

.orderNavigation_hiden {
  visibility: hidden;
  height: 2px;
  width: 20px;
  background-image: linear-gradient(#e66465, #9198e5);
  margin: auto;
}

.orderNavigation_show {
  visibility: visible;
  height: 3px;
  width: 20px;
  margin-top: 0px;
  background-image: linear-gradient(#e66465, #da7828);
  margin: auto;
}
</style>
