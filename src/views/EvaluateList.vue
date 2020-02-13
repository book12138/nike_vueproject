<template>
  <div>
    <DetailsHead></DetailsHead>

    <div class="evaluateList-container">
      <div class="evaluateList-elem" v-for="(item,index) in evaluateInfos" :key="index">
        <div>
          <img
            class="userHeadImg fl_left"
            :src="imageServerUrl + '/headImg/' + userInfos[index].headImg"
          />
          <span class="userNickName fl_left">{{userInfos[index].nickName}}</span>
          <div class="clr"></div>
        </div>
        <p class="evaluateContent">{{item.content}}</p>
        <div class="evaluateList-imgs">
          <img
            v-for="(imgName,i) in item.imgFiles"
            :key="i"
            :src="imageServerUrl + '/evaluate/' + imgName"
          />
        </div>
      </div>
    </div>

    <DetailsNavigation></DetailsNavigation>
  </div>
</template>
<script>
import DetailsHead from '@/components/Details/DetailsHead'
import DetailsNavigation from '@/components/Details/DetailsNavigation'
import { api } from '@/axios/config.js'
import { mapGetters } from 'vuex'

export default {
  name: 'evaluateList',
  data () {
    return {
      imageServerUrl: api.imageServer,
      evaluateInfos: [],
      userInfos: []
    }
  },
  computed: {
    ...mapGetters('details', ['id'])
  },
  created () {
    this.$axios
      .get(`${api.evaluate}/api/GetPageData`, {
        params: {
          skuId: this.id,
          page: 1,
          limit: 10
        }
      })
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
  },
  components: {
    DetailsHead,
    DetailsNavigation
  }
}
</script>
<style scoped>
.evaluateList-container {
  width: 94%;
  padding: 55px 3%;
  text-align: left;
}

.evaluateList-elem {
  padding-bottom: 20px;
  padding: 10px 0px;
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

/* 评论相关图片 */
.evaluateList-imgs {
  width: 80%;
  margin-top: 20px;
  margin-left: 25px;
}

.evaluateList-imgs img {
  display: inline-block;
  width: 36%;
  margin:2% 2% 2% 2%;
  border-radius: 10px;
}
</style>
