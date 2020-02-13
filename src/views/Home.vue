<template>
  <div class="home">
    <Navigation></Navigation>
    <MainHeader></MainHeader>

    <!-- 轮播图 -->
    <el-carousel style="margin:0px;width:100%" :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in images" :key="index">
        <img class="carouselImg" :src="imageServerUrl + '/top/' + item.filename" />
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐与秒杀分隔按钮 -->
    <div class="menu">
      <div id="recommend" class="menu-item" @click="changShow" :class="{menuSelect: showRecommend}">
        <h3>全部</h3>
        <span>猜你喜欢</span>
      </div>
      <div class="split"></div>
      <div id="seckill" class="menu-item" @click="changShow" :class="{menuSelect: !showRecommend}">
        <h3>秒杀</h3>
        <span>限时抢购</span>
      </div>
    </div>

    <div class="productContainer">
      <!-- 商品推荐 -->
      <Recommend v-if="showRecommend"></Recommend>
      <h1 v-else>我是秒杀列表</h1>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import MainHeader from '@/components/MainHeader'
import Recommend from '@/components/Recommend'
import { api } from '@/axios/config.js'

export default {
  name: 'home',
  data () {
    return {
      images: [
        {
          // filename: require('../assets/images/333.jpg')
          filename: '333.jpg'
        },
        {
          filename: '444.jpg'
        }
      ],
      showRecommend: true,
      RecommendList: [],
      SeckillList: [],
      imageServerUrl: ''
    }
  },
  created () {
    this.imageServerUrl = api.imageServer
  },
  components: {
    Navigation,
    MainHeader,
    Recommend
  },
  methods: {
    resolverImgSrc (src) {
      console.log(src)
      return require(src)
    },
    changShow () {
      this.showRecommend = !this.showRecommend
    }
  }
}
</script>
<style scoped>
.home {
  padding: 60px 0px;
  background-color: #fafafa;
}
.carouselImg {
  width: 100%;
  height: 100%;
}

/* 菜单 */
.menu {
  width: 100%;
  height: 50px;
  margin: 5px 0 5px 0;
  cursor: pointer;
}

.menu .menu-item {
  width: 150px;
  display: inline-block;
  text-align: center;
}

.menu .split {
  width: 1px;
  height: 30px;
  padding: 0px;
  background-color: #999;
  display: inline-block;
}

.menu-item h3 {
  font-weight: 500;
  color: #212121;
}

.menu-item span {
  font-size: 13px;
  color: #999;
  padding: 2px 5px 2px 5px;
}

/* 菜单被选中之后的样式 */
.menuSelect h3 {
  color: #ce541c;
}

.menuSelect span {
  color: white;
  background-image: linear-gradient(to right, #ff8c0f, #ff5000);
  border-radius: 10px;
}

/* 产品展示 */
.productContainer{
  width: 100%;
  margin-top:50px;
}
</style>
