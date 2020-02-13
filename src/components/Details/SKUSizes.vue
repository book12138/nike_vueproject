<template>
  <div class="sku-size">
    <div class="info" style="letter-spacing:1.5px;">
      <span style="display:block;">选择尺码</span>
    </div>
    <!-- sku 尺码 -->
    <div class="sizes" id="sizes">
      <div class="size-item" v-for="item in sizes" @click="selectChangeHandle(item.skuId)" :class="{select:item.select}" :key="item.skuId">
            {{item.name}}
        </div>
      <div class="clr"></div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'skusizes',
  computed: {
    ...mapGetters('details', ['sizes'])
  },
  methods: {
    ...mapActions('details', {
      setUserSelectSku: 'setUserSelectSku'
    }),
    selectChangeHandle (skuId) {
      this.setUserSelectSku(skuId)
    }
  }
}
</script>
<style scope>
.sku-size {
  padding-top: 20px;
  display: inline;
}

.select{
  background-image: linear-gradient(to right, rgb(68, 120, 155) , rgb(125, 233, 125));
  color: white
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

.sizes {
  cursor: pointer;
}

.sizes .size-item {
  border: 1px dashed #c7c7c7;
  margin-right: 7px;
  width: 40px;
  height: 30px;

  text-align: center;
  line-height: 30px;
  font-size: 12px;
  float: left;
  margin-left: 6px;
  margin-bottom: 8px;
}
</style>
