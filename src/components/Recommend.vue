<template>
  <div class="recommenContainer">
    <div
      v-for="item in recommendlist"
      :key="item.id"
      @click="showDetails(item.id)"
      class="recommend-item"
    >
      <img class="sku-img" :src="imageServerUrl + '/normal/' + item.fileName" />
      <div class="recommend-info">
        <div class="recommend-info-content">
          <p>{{item.title}}</p>
          <div class="icon">
            <img src="@/assets/icon/VIP (1).png" />
            <span>9.5折</span>
            <div class="clr"></div>
          </div>
          <span class="price">￥{{item.price}}</span>
          <span class="info">999人付款</span>
          <div class="clr"></div>
        </div>
      </div>
    </div>

    <div v-if="!showEnd" class="recommend-load" @click="load"><span><i :class="[showLoadingIcon?'el-icon-loading':'el-icon-refresh-right']"></i>{{showLoadingIcon?' 正在加载':' 点击加载更多'}}</span></div>
    <div v-else class="recommend-load"><span><i class="el-icon-warning-outline"></i> 没有更多了</span></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { api } from '@/axios/config.js'

export default {
  name: 'recommend',
  data () {
    return {
      recommendlist: [ ],
      imageServerUrl: api.imageServer,
      page: 1,
      limit: 10,
      showLoadingIcon: false,
      showEnd: false
    }
  },
  created () {
    this.$axios.get(`${api.recommend}/api/HomePageRecommend`,
      { params: { page: this.page, limit: this.limit } }
    ).then(res => {
      for (const key in res.data.skus) {
        if (res.data.skus.hasOwnProperty(key)) {
          const element = res.data.skus[key]
          this.recommendlist.push(element)
        }
      }
    })
  },
  methods: {
    ...mapActions('details', {
      setId: 'setId'
    }),
    showDetails (id) {
      this.setId(id)
      this.$router.push({ name: 'details' })
    },
    load () {
      this.showLoadingIcon = true
      this.$axios.get(`${api.recommend}/api/HomePageRecommend`,
        { params: { page: ++this.page, limit: this.limit } }
      ).then(res => {
        for (const key in res.data.skus) {
          if (res.data.skus.hasOwnProperty(key)) {
            const element = res.data.skus[key]
            this.recommendlist.push(element)
          }
        }
        this.showLoadingIcon = false
        if (res.data.skus.length === 0) { this.showEnd = true }
      }, errorResponse => {
        this.$message.error('加载失败')
        this.showLoadingIcon = false
      })
    }
  }
}
</script>
<style scoped>
.recommenContainer {
  width: 100%;
  text-align: left;
}

/*推荐列表 猜你喜欢*/
.recommend-item {
  display: inline-block;
  background-color: white;
  border-radius: 10px;
  width: 44%;
  margin: 10px 10px;
}

.recommend-item .sku-img {
  width: 100%;
  border-radius: 10px;
}

.recommend-item .recommend-info {
  width: 100%;
  margin: auto;
  background-color: thistle;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-bottom: 10px;
}

.recommend-item .recommend-info .recommend-info-content {
  width: 90%;
  margin: auto;
}

.recommend-info-content p {
  padding-top: 5px;
  font-size: 11px;
  line-height: 15px;
  height: 30px;
  overflow: hidden;
  color: rgb(73, 71, 71);
}

.recommend-info-content .icon {
  display: block;
  margin-top: 5px;
}

.icon img {
  float: left;
  height: 15px;
  width: 22px;
}

.icon span {
  float: left;
  color: white;
  font-size: 8px;
  font-weight: 500;
  background-image: linear-gradient(to bottom right, #ff5929, #ff0340);
  padding: 0 5px 0 5px;
  margin-top: 2px;
}

.recommend-info-content .price {
  margin-top: 5px;
  font-size: 11px;
  color: red;
  font-weight: 500;
  float: left;
}

.recommend-info-content .info {
  margin-top: 5px;
  font-size: 10px;
  color: #212121;
  font-weight: 400;
  float: right;
}

.recommend-load{
  padding:10px 0px;
  text-align: center;
}
</style>
