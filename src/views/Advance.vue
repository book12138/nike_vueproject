<template>
  <div>
    <!-- 页眉 -->
    <div class="advance-head">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      预告
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <div class="advance-text">此功能将在2.0版本推出，敬请期待</div>
  </div>
</template>
<script>
export default {
  name: 'advance',
  methods: {
    backClickHandle () {
      this.back()
    }
  }
}
</script>
<style scoped>
.advance-head {
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

.advance-text{
  margin-top: 150px;
  font-size: 18px;
   background-image:-webkit-linear-gradient(left,red,#fd8403,rgb(201, 201, 15));
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
}
</style>
