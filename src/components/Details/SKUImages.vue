<template>
  <el-carousel style="margin:0px;width:100%" :interval="5000" arrow="always">
    <el-carousel-item v-for="(item,index) in images" :key="index">
      <img class="carouselImg" :src="imageServerUrl + '/normal/' + item.fileName" />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { mapGetters } from 'vuex'
import { api } from '@/axios/config.js'

export default {
  name: 'skuimages',
  data () {
    return {
      imageServerUrl: api.imageServer
    }
  },
  computed: {
    ...mapGetters('details', ['images'])
  }
}
</script>
<style scope>
.carouselImg {
  width: 350px;
  height: 350px;
}
</style>
