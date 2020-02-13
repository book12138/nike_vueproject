<template>
  <div class="toolBar">
    <div class="toolItem">
      <img src="@/assets/icon/主页.png" @click="$router.push({name:'home'})" />
      <span>主页</span>
    </div>
    <div class="toolItem">
      <img src="@/assets/icon/客服.png" />
      <span>客服</span>
    </div>
    <div class="toolItem">
      <img src="@/assets/icon/收 藏.png" />
      <span>收藏</span>
    </div>
    <div>
      <input type="button" class="check" value="立即购买" @click="goToPay"/>
      <input type="button" class="addToCart" @click="addToCartHandle" value="加入购物车" />
    </div>
  </div>
</template>
<script>
import { api } from '@/axios/config.js'
import { mapGetters } from 'vuex'
import { auth } from '@/router/auth.js'

export default {
  name: 'detailsnavigation',
  computed: {
    ...mapGetters('details', ['userSelectNum', 'userSelectSku'])
  },
  methods: {
    addToCartHandle () {
      this.$axios.post(`${api.cart}/api/CartInfo`, {
        skuid: this.userSelectSku,
        quantity: this.userSelectNum
      }).then(
        successResponse => {
          if (successResponse.data.success) {
            this.$message({
              message: '商品添加至购物车成功',
              type: 'success'
            })
          } else {
            let errorInfo = ''
            successResponse.data.msg.forEach(element => {
              errorInfo += element.value + '；'
            })
            this.$message.error(errorInfo)
          }
        }
      ).catch(error => {
        if (!auth.catchInfoFileter(error, true)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })
    },
    goToPay () {
      sessionStorage.setItem('userSelectSkus', this.userSelectSku)
      this.$router.push({ name: 'checkOrderFromDetails' })
    }
  }
}
</script>
<style scope>
.toolBar {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: #f2f2f2;
  border-top: 1px solid f0f0f0;
  z-index: 99;
  display: flex;
  justify-content: space-around;
}

.toolBar .check {
  float: right;
  margin-right: 10px;
  border-bottom-right-radius: 18px;
  border-top-right-radius: 18px;
  width: 100px;
  background-image: linear-gradient(to bottom right, #ee5429, #e21b4d);
}

.toolBar .toolItem {
  float: left;
  margin-left: 8px;
  margin-right: 5px;
  text-align: center;
  margin-top: 10px;
}

.toolBar .toolItem img {
  height: 18px;
  display: block;
  margin-left: 13px;
}

.toolBar .toolItem span {
  float: left;
  margin-left: 10px;
  font-size: 10px;
  display: block;
  color: #999;
}

.toolBar .addToCart {
  float: right;
  border-bottom-left-radius: 18px;
  border-top-left-radius: 18px;
  width: 110px;
  background-image: linear-gradient(to right, #fec901, #eb8e0d);
}

.toolBar .check,
.addToCart {
  border: 0px;
  height: 40px;
  margin-top: 5px;
  text-align: center;
  font-weight: 600;
  color: #ffffff;
}
</style>
