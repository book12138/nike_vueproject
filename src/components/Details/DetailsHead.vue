<template>
  <div class="head">
    <div class="head-content">
      <img class="back" @click="goBackClickHandler" src="@/assets/icon/向左箭头.png" />
      <div class="head-search">
        <img src="@/assets/icon/搜索.png" />
        <input type="text" id="searchInput" value placeholder="搜索" />
        <div class="clr"></div>
      </div>
      <img class="menu" src="@/assets/icon/Category.png" />
      <img class="cartLink" src="@/assets/icon/购物车.png" @click="$router.push({name:'cart'})" />
      <img class="share" src="@/assets/icon/skip.png" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'detaishead',
  methods: {
    goBackClickHandler () {
      this.back()
    }
  }
}
</script>
<style scope>
.head {
  width: 100%;
  position: fixed;
  border-bottom: 1px solid f0f0f0;
  height: 48px;
  background-color: #f2f2f2;
  z-index: 99;
  padding:0px;
  margin: 0px;
}

.head-content {
  margin: auto;
  color: #999;
  display: flex;
  height: 48px;
  justify-content: space-around;
  width: 100%;
}

.head-content .back {
  height: 17px;
  margin-top: 15px;
  display: inline-block;
}

.head-content .share,
.cartLink,
.menu {
  height: 17px;
  width: 17px;
  margin-top: 15px;
  display: inline-block;
}

.head-content .head-search {
  background-color: white;
  border-radius: 20px;
  width: 180px;
   height: 30px;
  margin-top: 10px;
  display: inline-block;
}

.head-search img {
  float: left;
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-left: 7px;
}

.head-search #searchInput {
  float: left;
  background-color: white;
  height: 28px;
  width: 130px;
  border: 0px;
  margin-left: 5px;
}
</style>
