<template>
  <div class="sku-paremeters">
    <div class="sku-paremeters-head">-- 参数信息 --</div>
    <div class="sku-paremeters-content">
      <div class="paremeterItem" v-for="(item,index) in paremeters" :key="index">
            <p>{{item.paremeter}}</p>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'skuparemeter',
  computed: {
    ...mapGetters('details', ['paremeters'])
  }
}
</script>
<style scope>
.sku-paremeters {
    margin-top: 10px;
}

.sku-paremeters-head {
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    background-color: #ECE6EC;
    border-radius: 10px;
    color: #646464;
}

.sku-paremeters-content {
    font-size: 13px;
    color: #999;
}

.paremeterItem {
    display: block;
    line-height: 20px;
    margin-left: 10px;
}
</style>
