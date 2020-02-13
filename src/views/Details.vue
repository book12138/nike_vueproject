<template>
  <div style="width:100%;">
    <!-- 头 -->
    <DetailsHead></DetailsHead>
    <div class="details">
      <!-- sku图片轮播 -->
      <SKUImages></SKUImages>

      <!-- sku 标题信息 -->
      <div id="skutitle" class="sku-name">{{info.title}}</div>

      <!-- sku 价格信息 -->
      <div class="sku-price">
        <div class="fl_left">
          <div style="display:block">
            <div class="info fl_left" style="margin-top:6px;letter-spacing:8px;">价 格</div>
            <div class="fl_left">
              <!-- sku 价格 -->
              <span class="p-price" :style="priceStyle">{{info.price}}</span>
              <a style="font-size:14px;display: inline;" href="#">降价通知</a>
            </div>
            <div class="clr"></div>
          </div>

          <!-- 促销信息 -->
          <div id="promotion" v-if="hasPromotion" style="margin-top:5px;">
            <div
              class="info fl_left"
              style="margin-top:6px;letter-spacing:5px;"
            >{{ info.skuSuggestivePromotion.type }}</div>
            <div class="fl_left">
              <!-- 价格 -->
              <span class="bargin-price">{{ info.skuSuggestivePromotion.price }}</span>
              <!-- 标题 -->
              <span class="promotion-title">{{info.skuSuggestivePromotion.title}}</span>
            </div>
            <div class="clr"></div>
          </div>
        </div>

        <div class="fl_right" style="text-align:center;margin-right:10px;">
          <div style="color:#808080;margin-top:5px;font-size:13px;">累计评价</div>
          <div style="font-size:12px;margin-top:5px;">
            <a href="#">{{evaluateCount}}</a>
          </div>
        </div>
        <div class="clr"></div>
      </div>
      <hr />

      <!-- 颜色款式 -->
      <SKUColors></SKUColors>

      <!-- 尺码 -->
      <SKUSizes></SKUSizes>

      <!-- 库存信息 -->
      <div class="sku-quantity">
        <div class="info" style="letter-spacing:10px;">
          <span style="display:block;">库 存</span>
        </div>
        <div class="quantity" id="quantity">
          <span id="sku_quantity" max style="color: brown;">{{quantity}}</span> 件
        </div>
      </div>

      <!-- 选择购买数量 -->
      <div class="play-number">
        <div class="info" style="letter-spacing:1px;">
          <span>购买数量</span>
        </div>
        <br />
        <br />
        <el-input-number
          v-model="num"
          @change="numChangeHandler"
          :min="1"
          :max="parseInt(maxNum)"
          label="购买数量"
        ></el-input-number>
        <div>
          <p style="margin-left: 10px;color: #999;font-size:12px">
            每人限购
            <span style="color: brown;">{{maxNum}}</span> 件
          </p>
        </div>
      </div>

      <hr />

      <!-- 评价信息 -->
      <div class="evaluate">
        <div>
          <span class="titleWithNum fl_left">宝贝评价（{{evaluateCount}}）</span>
          <span class="seaall fl_right" @click="$router.push({name:'evaluateList'})">查看全部 ></span>
          <div class="clr"></div>
        </div>
        <div class="evaluate-elem" v-for="(item,index) in evaluateInfos" :key="index">
          <div>
            <img class="userHeadImg fl_left" :src="imageServerUrl + '/headImg/' + userInfos[index].headImg" />
            <span class="userNickName fl_left">{{userInfos[index].nickName}}</span>
            <div class="clr"></div>
          </div>
          <p class="evaluateContent">{{item.content}}</p>
        </div>
      </div>

      <hr />

      <!-- 参数信息 -->
      <SKUParemeter style="text-align:left;"></SKUParemeter>
    </div>

    <!-- 底部 -->
    <DetailsNavigation></DetailsNavigation>
  </div>
</template>
<script>
import SKUColors from '@/components/Details/SKUColors'
import SKUImages from '@/components/Details/SKUImages'
import SKUSizes from '@/components/Details/SKUSizes'
import DetailsHead from '@/components/Details/DetailsHead'
import DetailsNavigation from '@/components/Details/DetailsNavigation'
import SKUParemeter from '@/components/Details/SKUParemeter'
import { mapGetters, mapActions } from 'vuex'
import { api } from '@/axios/config.js'

export default {
  name: 'detail',
  components: {
    SKUColors,
    SKUImages,
    SKUSizes,
    DetailsHead,
    DetailsNavigation,
    SKUParemeter
  },
  data () {
    return {
      num: 1,
      evaluateInfos: [],
      userInfos: [],
      imageServerUrl: api.imageServer,
      evaluateCount: 0
    }
  },
  created () {
    this.$axios
      .get(`${api.evaluate}/api/TopEvaluate?skuId=${this.id}`)
      .then(success => {
        this.evaluateInfos = success.data
        success.data.forEach(element => {
          this.$axios
            .get(
              `${api.userInfo}/api/NickNameWithHeadImg?userId=${element.userId}`
            )
            .then(successResponse => {
              this.userInfos.push(successResponse.data)
            })
        })
      })

    this.$axios
      .get(`${api.evaluate}/api/Count?skuId=${this.id}`)
      .then(success => { this.evaluateCount = success.data.count })
  },
  computed: {
    ...mapGetters('details', ['info', 'maxNum', 'userSelectNum', 'id', 'quantity']),
    hasPromotion () {
      // 是否有优惠活动
      let isTrue = false

      if (this.info.onlyShowOnePrice) {
        let startTime = this.info.skuSuggestivePromotion.startTime
        let endTime = this.info.skuSuggestivePromotion.endTime
        if (
          startTime != null &&
          startTime !== undefined &&
          endTime != null &&
          endTime !== undefined
        ) {
          let datetimenow = new Date()
          startTime = new Date(Date.parse(startTime))
          endTime = new Date(Date.parse(endTime))
          if (datetimenow >= startTime && datetimenow < endTime) {
            // 促销正在进行，且未结束
            isTrue = true
          }
        }
      }

      return isTrue
    },
    priceStyle () {
      // 针对原价的内联样式
      if (this.hasPromotion) {
        return {
          color: '#212121',
          fontSize: '18px',
          textDecoration: 'line-through'
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions('details', ['setUserSelectNum', 'clearCache']),
    numChangeHandler () {
      this.setUserSelectNum(this.num)
    }
  },
  // 组件被注销之前
  beforeDestroy () {
    // this.clearCache()
  }
}
</script>
<style scoped>
hr {
  border: 1px solid #e9e9e9;
}

.details {
  width: 350px;
  margin: auto;
  padding-top: 48px;
  padding-bottom: 50px;
}

.sku-name {
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
  font: 700 16px Arial, "microsoft yahei";
  color: #666;
  padding-top: 10px;
  line-height: 28px;
  display: block;
  width: 100%;
  text-align: left;
}

.sku-price {
  display: block;
  background-color: #f3f3f3;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 4px 0 5px 0;
  height: auto;
  width: 100%;
}

.info {
  font: 12px/150% tahoma, arial, Microsoft YaHei, Hiragino Sans GB,
    "\u5b8b\u4f53", sans-serif;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
  float: left;
  padding-left: 10px;
  font-family: simsun;
  color: #999;
  line-height: 20px;
  margin-right: 10px;
}

.p-price {
  display: inline;
  font: 12px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  color: #e4393c;
  font-family: "microsoft yahei";
  margin-right: 10px;
  font-size: 20px;
}

.p-price .price {
  font-family: "microsoft yahei";
  margin: 0;
  padding: 0;
  color: #e4393c;
  font-size: 22px;
}

.bargin-price {
  overflow: hidden;
  color: #e4393c;
  font-family: "microsoft yahei";
  margin-right: 10px;
  font-size: 20px;
}

.bargin-price .price {
  font-family: "microsoft yahei";
  color: #e4393c;
  font-size: 22px;
}

.promotion-title {
  color: white;
  background-image: linear-gradient(
    to right,
    rgb(233, 77, 77),
    rgb(150, 150, 18)
  );
  font-weight: 600;
  font-size: 13px;
  padding: 3px;
}

.sku-quantity {
  padding-top: 20px;
  display: inline;
  text-align: left;
}

.sku-quantity .quantity {
  color: #999;
}

.play-number {
  width: 100%;
  margin-top: 20px;
  text-align: left;
}

.numBtn {
  display: block;
  width: 24px;
  height: 24px;
  text-align: center;
  border: 0px;
  color: white;
  background-image: linear-gradient(to right, #f0f0f0, #999);
}

.userBtn {
  width: 140px;
  border: 1.5px solid #b83636;
  height: 35px;
  color: #585858;
}

/* 评价 */
.evaluate {
  width: 100%;
  margin-top: 10px;
  text-align: left;
  color: #212121;
}

/* 宝贝评价四个字，以及评价数的显示 */
.titleWithNum,
.seaall {
  font-size: 13px;
}

/* 查看全部的连接文字 */
.seaall {
  color: #e4393c;
}

.evaluate .evaluate-elem {
  margin: 10px 0px;
}

/* 用户头像 */
.userHeadImg {
  height: 25px;
  border-radius: 50%;
}

/* 用户名 */
.userNickName {
  margin-left: 10px;
  font-size: 13px;
  margin-top: 4px;
  color: #999;
}

/* 评论内容 */
.evaluateContent {
  text-indent: 28px;
  font-size: 13px;
  line-height: 20px;
  color: #646464;
}
</style>
