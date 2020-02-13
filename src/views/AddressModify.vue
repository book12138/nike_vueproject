<template>
  <div>
    <!-- 页眉 -->
    <div class="settingHead">
      <span class="back fl_left" @click="backClickHandle">﹤</span>
      修改收货地址
      <span class="addressDelete fl_right" @click="deleteAddress">删除</span>
    </div>

    <!-- 收货人 -->
    <div class="moudles" style="margin-top:51px;">
      <div class="titleContainer">
        <span>收货人</span>
      </div>
      <div class="userInputContainer">
        <input type="text" v-model="consignee" placeholder="请输入收货人姓名" />
      </div>
    </div>

    <!-- 手机号码 -->
    <div class="moudles">
      <div class="titleContainer">
        <span>手机号码</span>
      </div>
      <div class="userInputContainer">
        <input type="text" v-model="phoneNumber" placeholder="请输入收货人手机号码" />
      </div>
    </div>
    <!-- 所在地区 -->
    <div class="moudles">
      <div class="titleContainer">
        <span>所在地区</span>
      </div>
      <div class="userInputContainer" @click="addressSelectDrawerVisible = true">
        {{ region !== '' ? region : `${provinceName} ${cityName} ${districtName}` }}
        <span class="fl_right">
          <i class="el-icon-add-location" style="font-size:12px;">定位</i>
        </span>
        <div class="clr"></div>
      </div>
    </div>
    <!-- 地址选择抽屉 -->
    <el-drawer
      title="请选择所在地区"
      size="70%"
      :visible.sync="addressSelectDrawerVisible"
      :direction="direction"
      :before-close="handleClose"
      style="overflow:auto"
      @open="addressDrawerOpenHandle"
    >
      <div class="addressSelectContainer">
        <div class="selectItemNameContainer">
          <div
            @click="showProvinceSelectContent"
            :class="[showProvinceName ? 'showSelectItemName' : 'dontShowSelectName', 'selectItemName']"
          >
            <div>{{ provinceName }}</div>
            <div class="nameUnderline"></div>
          </div>
          <div
            @click="showCitySelectContent"
            :class="[showCityName ? 'showSelectItemName' : 'dontShowSelectName', 'selectItemName']"
          >
            <div>{{ cityName }}</div>
            <div class="nameUnderline"></div>
          </div>
          <div
            @click="showDistrictSelectContent"
            :class="[showDistrictName ? 'showSelectItemName' : 'dontShowSelectName', 'selectItemName']"
          >
            <div>{{ districtName }}</div>
            <div class="nameUnderline"></div>
          </div>
        </div>
        <div v-loading="loading">
          <Address
            class="addressSelectItem"
            :id.sync="provinceId"
            :name.sync="provinceName"
            :datas="provinces"
            v-show="showProvinceSelectContainer"
          ></Address>
          <Address
            class="addressSelectItem"
            :id.sync="cityId"
            :name.sync="cityName"
            :datas="cities"
            v-show="showCitySelectContainer"
          ></Address>
          <Address
            class="addressSelectItem"
            :id.sync="districtId"
            :name.sync="districtName"
            :datas="districts"
            v-show="showDistrictSelectContainer"
          ></Address>
        </div>
      </div>
    </el-drawer>
    <!-- 详细地址 -->
    <div class="moudles">
      <div class="titleContainer fl_left">
        <span class>详细地址</span>
      </div>
      <div class="userInputContainer" style="margin-top:6px;">
        <textarea rows="5" v-model="detailAddress" placeholder="街道、楼牌号等" />
      </div>
      <div class="clr"></div>
    </div>
    <!-- 是否设置为默认 -->
    <div class="setDefault">
      <div class="fl_left">
        <span style>设置默认地址</span>
        <span style="font-size:11px;">提醒：每次下单会默认推荐使用该地址</span>
      </div>
      <el-switch
        class="fl_right"
        v-model="setDefault"
        active-color="#13ce66"
        inactive-color="#e48125"
      ></el-switch>
      <div class="clr"></div>
    </div>

    <div class="saveBtn" @click="commitAddressModify">保存</div>
  </div>
</template>
<script>
import Address from '@/components/Tool/Address'
import { api } from '@/axios/config.js'
import { auth } from '@/router/auth.js'

export default {
  name: 'addressModify',
  data () {
    return {
      provinces: [],
      cities: [],
      districts: [],
      addressSelectDrawerVisible: false, // 地址选择抽屉是否显示
      direction: 'btt',
      provinceName: '',
      provinceId: '',
      cityName: '',
      cityId: '',
      districtName: '',
      districtId: '',
      showProvinceSelectContainer: true,
      showCitySelectContainer: false,
      showDistrictSelectContainer: false,
      loading: false,
      setDefault: false,
      consignee: '',
      phoneNumber: '',
      detailAddress: '',
      region: '',
      id: ''
    }
  },
  components: {
    Address
  },
  computed: {
    showProvinceName () {
      if (this.provinceName !== '') {
        this.provinceEditAgain()
        this.showCitySelectContent()
        this.loadCityData()
        this.clearRegion()
      }
      return this.provinceName !== ''
    },
    showCityName () {
      let result = this.cityName !== ''
      if (result) {
        this.cityEditAgain()
        this.showDistrictSelectContent()
        this.loadDistrictData()
      }
      return result
    },
    showDistrictName () {
      return this.districtName !== ''
    }
  },
  created () {
    if (sessionStorage.getItem('modifyAddressItemId')) {
      this.$axios.get(`${api.address}/api/ShippingAddress/id?id=${sessionStorage.getItem('modifyAddressItemId')}`)
        .then(successResponse => {
          this.id = successResponse.data.id
          this.consignee = successResponse.data.consignee
          this.phoneNumber = successResponse.data.phoneNumber
          this.detailAddress = successResponse.data.detailAddress
          this.setDefault = successResponse.data.default

          this.region = successResponse.data.region
        }).catch(error => {
          if (!auth.catchInfoFileter(error, true)) {
            this.$message.error('对于你的请求处理出现了错误')
          }
        })
    }
  },
  methods: {
    backClickHandle () {
      this.back()
    },
    /** 地址选择抽屉关闭 */
    handleClose (done) {
      if (this.provinceName !== '' && this.cityName !== '' && this.districtName !== '') {
        done()
        this.showCitySelectContainer = false
        this.showDistrictSelectContainer = false
        this.showProvinceSelectContainer = true
      } else {
        this.$message.error('区域选择步骤未完成')
      }
    },
    /** 再次编辑省份 */
    provinceEditAgain () {
      this.cityName = ''
      this.districtName = ''
    },
    /** 再次编辑城市 */
    cityEditAgain () {
      this.districtName = ''
    },
    /** 显示省份选择 */
    showProvinceSelectContent () {
      this.showCitySelectContainer = false
      this.showProvinceSelectContainer = true
      this.showDistrictSelectContainer = false
    },
    /** 显示城市选择 */
    showCitySelectContent () {
      this.showCitySelectContainer = true
      this.showProvinceSelectContainer = false
      this.showDistrictSelectContainer = false
    },
    /** 显示区域选择 */
    showDistrictSelectContent () {
      this.showCitySelectContainer = false
      this.showProvinceSelectContainer = false
      this.showDistrictSelectContainer = true
    },
    /** 地区选择抽屉打开 */
    addressDrawerOpenHandle () {
      this.loading = true
      this.$axios.get(`${api.address}/api/Province`).then(successResponse => {
        this.provinces = successResponse.data
      })
      this.loading = false
    },
    /** 加载市级城市信息 */
    loadCityData () {
      this.$axios
        .get(`${api.address}/api/City/provinceId`, {
          params: {
            provinceId: this.provinceId
          }
        })
        .then(successResponse => {
          this.cities = successResponse.data
        })
    },
    /** 加载区域数据 */
    loadDistrictData () {
      this.$axios
        .get(`${api.address}/api/District/cityId`, {
          params: { cityId: this.cityId }
        })
        .then(successResponse => {
          this.districts = successResponse.data
        })
    },
    /** 提交新地址信息 */
    commitAddressModify () {
      if (this.consignee !== '' && this.phoneNumber !== '' && this.detailAddress !== '') {
        this.$axios.put(`${api.address}/api/ShippingAddress`, {
          id: sessionStorage.getItem('modifyAddressItemId'),
          consignee: this.consignee,
          phoneNumber: this.phoneNumber,
          region: this.region !== '' ? this.region : `${this.provinceName} ${this.cityName} ${this.districtName}`,
          detailAddress: this.detailAddress,
          default: this.setDefault
        }).then(successResponse => {
          if (successResponse.data.success) {
            this.back()
          } else {
            let errorInfo = ''
            successResponse.data.msg.forEach(element => {
              errorInfo += element.value + '；'
            })
            this.$message.error(errorInfo)
          }
        }).catch(error => {
          if (!auth.catchInfoFileter(error, false)) {
            this.$message.error('对于你的请求处理出现了错误')
          }
        })
      } else {
        this.$message.error('您还有信息未填写')
      }
    },
    clearRegion () {
      this.region = ''
    },
    /** 删除地址信息 */
    deleteAddress () {
      this.$axios.delete(`${api.address}/api/ShippingAddress`, {
        params: {
          id: this.id
        }
      }).then(successResponse => {
        if (successResponse.data.success) {
          this.back()
        } else {
          let errorInfo = ''
          successResponse.data.msg.forEach(element => {
            errorInfo += element.value + '；'
          })
          this.$message.error(errorInfo)
        }
      }).catch(error => {
        if (!auth.catchInfoFileter(error, false)) {
          this.$message.error('对于你的请求处理出现了错误')
        }
      })
    }
  }
}
</script>
<style scoped>
/* 页眉 */
.settingHead {
  height: 50px;
  width: 100%;
  text-align: center;
  line-height: 50px;
  font-size: 15px;
  color: white;
  background-color: #e48125;
  /* background-image: linear-gradient(to bottom, #eb6c23ec, #e48125); */
  position: fixed;
  z-index: 99;
  top: 0px;
}

.back{
  margin-left: 8px;
}

/* 删除按钮 */
.addressDelete{
  font-size: 13px;
  margin-right: 8px;
  margin-top: 3px;
}

/* 一个一个模块，指代每一行 */
.moudles {
  width: 94%;
  border-bottom: 1px solid #ededed;
  padding: 10px 0%;
  margin: 0px 3%;
  min-height: 30px;
  line-height: 30px;
  font-size: 13px;
  text-align: left;
}

.moudles .titleContainer {
  width: 30%;
  display: inline-block;
}

.moudles .userInputContainer {
  width: 65%;
  display: inline-block;
}

/* 详细地址输入框 */
.userInputContainer input,
textarea {
  width: 100%;
  border: 0px;
  background-color: #fafafa;
}

/* 地址选择域 */
.addressSelectContainer {
  height: 70%;
  text-align: left;
  width: 100%;
  margin: auto;
  overflow: scroll;
}

.addressSelectItem {
  margin-left: 30px;
}

/* 选择的省市区等的显示区 */
.selectItemNameContainer {
  width: 100%;
}
/* 选中后的省市区等名称 */
.selectItemNameContainer .selectItemName {
  margin-bottom: 5px;
  font-size: 12px;
  margin-left: 30px;
  text-align: center;
  font-weight: 700;
}

.selectItemName div {
  margin: auto;
}

/* 显示选中的 省市区 名 */
.showSelectItemName {
  display: inline-block;
}

/* 不显示选中的 省市区 名 */
.dontShowSelectName {
  display: none;
}

/* 在选中的地区名下方的一条线 */
.selectItemName .nameUnderline {
  width: 25px;
  height: 2px;
  background-image: linear-gradient(to right, red, pink);
  margin-top: 5px;
}

/* 设为默认地址 */
.setDefault {
  width: 94%;
  border-bottom: 1px solid #ededed;
  padding: 10px 0%;
  margin: 0px 3%;
  font-size: 13px;
  text-align: left;
}

.setDefault .fl_left span {
  display: block;
  margin-top: 5px;
}

/* 保存按钮 */
.saveBtn {
  height: 30px;
  width: 60%;
  margin: auto;
  border-radius: 20px;
  color: white;
  line-height: 30px;
  margin: auto;
  margin-top: 30px;
  background-image: linear-gradient(to right, #d1490a, rgb(248, 210, 38));
}
</style>
