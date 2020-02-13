<template>
  <div class="addressItems">
      <span class="addressItem" v-for="item in datas" :key="item.id" @click="itemSelectHandle(item.id)">
        <i :class="{'el-icon-check':item.select}" :style="item.selectStyle">{{item.name}}</i>
      </span>
    </div>
</template>
<script>
export default {
  props: ['id', 'name', 'datas'],
  name: 'address',
  data () {
    return {
      // datas: [
      //   { id: '1', name: '111', select: false, selectStyle: '' },
      //   { id: '2', name: '121', select: false, selectStyle: '' },
      //   { id: '3', name: '131', select: false, selectStyle: '' },
      //   { id: '4', name: '141', select: false, selectStyle: '' },
      //   { id: '5', name: '151', select: false, selectStyle: '' },
      //   { id: '6', name: '161', select: false, selectStyle: '' },
      //   { id: '7', name: '171', select: false, selectStyle: '' },
      //   { id: '8', name: '181', select: false, selectStyle: '' },
      //   { id: '9', name: '191', select: false, selectStyle: '' },
      //   { id: '0', name: '101', select: false, selectStyle: '' }
      // ]
    }
  },
  created () {
  },
  methods: {
    itemSelectHandle (id) {
      this.datas.forEach(element => {
        if (element.id === id) {
          element.select = true
          element.selectStyle = 'color:#F66D0A'
          this.$emit('update:id', element.id)
          this.$emit('update:name', element.name)
        } else if (element.select) {
          element.select = false
          element.selectStyle = ''
        }
      })
    }
  }
}
</script>
<style scoped>
/* 元素列表 */
.addressItems{
  height: 100%;
  overflow: scroll;
}

.addressItems .addressItem{
  display: block;
  font-size: 11px;
  margin-top: 20px;
}
</style>
