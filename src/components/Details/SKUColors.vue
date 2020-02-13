<template>
  <div class="sku-color">
    <div class="info fl_left" style="letter-spacing:1.5px;">选择颜色</div>
    <!-- sku 相关的颜色 -->
    <div class="colors fl_left" id="skuColorsContent">
       <div class="colors-item fl_left" :class="{select:id===item.skuId}" v-for="item in colors" :key="item.skuId" @click="colorSelectHandler(item.skuId)">
            <img class="fl_left" :src="imageServerUrl + '/thumb/' + item.fileName" width="40" height="40" :alt="item.name" />
            <span class="fl_left" style="margin:15px 5px 0px 5px;">{{item.name}}</span>
            <div class="clr"></div>
        </div>
    </div>
    <div class="clr"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { api } from '@/axios/config.js'

export default {
  name: 'skucolors',
  data () {
    return {
      imageServerUrl: api.imageServer
    }
  },
  computed: {
    ...mapGetters('details', ['id', 'colors'])
  },
  methods: {
    ...mapActions('details', {
      setId: 'setId'
    }),
    colorSelectHandler (id) {
      if (this.id === id) return
      this.setId(id)// 改变skuid
    }
  }
}
</script>
<style scope>
.sku-color {
    display: block;
    width: 100%;
    margin-top: 20px;
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

.colors {
    display: inline;
    cursor: pointer;
}

.colors .colors-item {
    border: 1px dashed #c7c7c7;
    margin-right: 7px;
    margin-bottom: 4px;
    height: 45px;

}
</style>
