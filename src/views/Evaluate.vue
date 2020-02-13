<template>
  <div style="text-align:left">
    <!-- 页眉 -->
    <div class="evaluate-head">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      评价
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <!-- 填写评价以及选择图片 -->
    <div class="evaluate-container">
      <textarea class="evaluate-input" v-model="content" placeholder="请尽情发表您宝贵的意见或建议"></textarea>
      <div>
        <el-upload
          action="http://www.mystory.store:5008/api/SingleImageUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
    </div>

    <!-- 评分 -->
    <div class="grade-container">
      <div class="grade-item">
        <span>物流速度</span>
        <el-rate class="grade-rate" v-model="logisticsScore"></el-rate>
      </div>
      <div class="grade-item">
        <span>服务态度</span>
        <el-rate class="grade-rate" v-model="serviceScore"></el-rate>
      </div>
      <div class="grade-item">
        <span>商品质量</span>
        <el-rate class="grade-rate" v-model="qualityScore"></el-rate>
      </div>
    </div>

    <div class="evaluate-saveBtn" @click="handleSave">保存</div>
  </div>
</template>
<script>
import { auth } from '@/router/auth.js'
import { api } from '@/axios/config.js'

export default {
  props: ['orderId', 'skuId'],
  name: 'evaluate',
  data () {
    return {
      content: '',
      dialogImageUrl: '',
      dialogVisible: false,
      logisticsScore: null,
      serviceScore: null,
      qualityScore: null,
      images: []
    }
  },
  methods: {
    backClickHandle () {
      this.back()
    },
    handleRemove (file, fileList) {
      this.images.forEach((element, index, arr) => {
        if (file.name === element.oldFile.name) {
          arr.splice(index, 1)
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleUploadSuccess (response, file, fileList) {
      this.images.push({
        newFileName: response.newFileName, // 服务器端的新文件名，即后端回调过来的数据
        oldFile: {
          name: file.name, // 上传之前的文件名，客户端的
          url: file.url // 页面显示上传的图片的src属性绑定用的
        }
      })
    },
    handleUploadError (response, file, fileList) {
      this.$message.error(JSON.parse(response.message).msg)
    },
    handleSave () {
      if (this.logisticsScore == null || this.serviceScore == null || this.qualityScore == null) {
        this.$message.error('请完成评分')
      } else if (this.content === '') {
        this.$message.error('请输入评价内容')
      } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
          target: document.querySelector('.div1')
        })

        let flag = true
        let imgFile = ''
        this.images.forEach(element => {
          if (flag) {
            imgFile += element.newFileName
            flag = false
          } else {
            imgFile += ',' + element.newFileName
          }
        })
        this.$axios.post(`${api.evaluate}/api/Evaluate`, {
          skuId: this.skuId,
          content: this.content,
          imgFile: imgFile,
          logisticsScore: this.logisticsScore,
          serviceScore: this.serviceScore,
          qualityScore: this.qualityScore
        }).then(res => {
          if (res.data.success) {
            this.$axios.put(`${api.order}/api/EvaluateOrder`, {
              id: this.orderId,
              skuId: this.skuId
            }).then(successResponse => {
              if (successResponse.data.success) {
                this.back()
              } else {
                this.$message.error('评价已提交，但订单状态修改失败')
              }
              loading.close()
            }).catch(error => {
              loading.close()
              if (!auth.catchInfoFileter(error, true)) {
                this.$message.error('对于你的请求处理出现了错误')
              }
            })
          } else {
            this.$message.error('保存失败')
          }
          loading.close()
        }).catch(error => {
          loading.close()
          if (!auth.catchInfoFileter(error, true)) {
            this.$message.error('对于你的请求处理出现了错误')
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.evaluate-head {
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

.evaluate-container {
  width: 94%;
  padding: 61px 3% 10px 3%;
  background-color: white;
  margin-bottom: 10px;
}

.evaluate-container .evaluate-input {
  width: 100%;
  height: 180px;
  background-color: white;
  letter-spacing: 2px;
  line-height: 20px;
  color: rgb(82, 80, 80);
}

.grade-container {
  width: 94%;
  padding: 10px 3% 10px 3%;
  background-color: white;
}

.grade-item {
  width: 94%;
  padding: 0px 3%;
  line-height: 30px;
}

.grade-item span {
  display: inline-block;
  width: 80px;
  font-size: 13px;
}

.grade-item .grade-rate {
  display: inline-block;
}

.evaluate-saveBtn {
  text-align: center;
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
