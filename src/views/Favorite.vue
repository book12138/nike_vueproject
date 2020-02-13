<template>
  <div style="text-align:left">
    <img
      v-show="favoriteInfo.length === 0"
      src="@/assets/icon/空空如也.png"
      style="position:absolute;top:150px;margin:0px calc(50% - 55px);width:100px;"
    />

    <!-- 页眉 -->
    <div class="favorite-head">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      收藏夹
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <div style="width:100%;height:51px;"></div>

    <!-- 收藏夹商品列表 -->
    <div class="favorite-item" v-for="item in favoriteInfo" :key="item.skuId" @click="showDetails(item.skuId)">
      <img :src="imageServerUrl + '/normal/' + item.info.imgName" class="fl_left" />
      <div class="fl_right">
        <p>{{item.info.title}}</p>
        <div class="favorite-btn">找相似</div>
      </div>
      <div class="clr"></div>
    </div>
  </div>
</template>
<script>
import { auth } from '@/router/auth.js'
import { api } from '@/axios/config.js'
import { mapActions } from 'vuex'

export default {
  name: 'favorite',
  data () {
    return {
      favoriteInfo: [],
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
      .get(`${api.favorite}/api/Favorite`)
      .then(success => {
        success.data.forEach(element => {
          this.$axios
            .get(`${api.skuservice}/api/SkuBasicInformation?skuId=${element}`)
            .then(successResponse => {
              this.favoriteInfo.push({
                skuId: element,
                info: successResponse.data
              })
            })
            .catch(error => {
              if (!auth.catchInfoFileter(error, false)) {
                this.$message.error('对于你的请求处理出现了错误')
              }
            })
        })
        loading.close()
      })
      .catch(error => {
        loading.close()
        if (!auth.catchInfoFileter(error, false)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })
  },
  methods: {
    ...mapActions('details', {
      setId: 'setId'
    }),
    backClickHandle () {
      this.back()
    },
    showDetails (id) {
      this.setId(id)
      this.$router.push({ name: 'details' })
    }
  }
}
</script>
<style scoped>
.favorite-head {
  position: fixed;
  top: 0px;
  height: 50px;
  width: 94%;
  padding: 0px 3%;
  background-color: #e48125;
  text-align: center;
  line-height: 50px;
  color: white;
}

.favorite-item {
  width: 94%;
  padding: 0px 3%;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 10px;
}

.favorite-item .fl_left {
  width: 40%;
}

.favorite-item .fl_right {
  width: 55%;
}

.favorite-item .fl_right .favorite-btn {
  height: 30px;
  font-size: 13px;
  border: 1px dotted #999;
  line-height: 30px;
  width: 80px;
  text-align: center;
  border-radius: 30px;
}
</style>
