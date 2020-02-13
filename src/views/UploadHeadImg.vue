<template>
  <div>
    <!-- 页眉 -->
    <div class="head">
      <span class="fl_left" @click="backClickHandle">
        <i class="el-icon-arrow-left"></i>
      </span>
      头像上传
      <span class="fl_right" style="visibility: hidden;">
        <i class="el-icon-arrow-left"></i>
      </span>
      <div class="clr"></div>
    </div>

    <div style="margin-top:150px;">
      <el-upload
        action="http://www.mystory.store:5008/api/HeadImgUpload"
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
</template>
<script>
import { auth } from '@/router/auth.js'
import { api } from '@/axios/config.js'

export default {
  name: 'uploadHeadImg',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    backClickHandle () {
      this.back()
    },
    handleRemove (file, fileList) {

    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleUploadSuccess (response, file, fileList) {
      this.$axios.put(`${api.userInfo}/api/headImg?fileName=${response.newFileName}`)
        .then(success => {
          if (success.data) { this.back() } else { this.$message.error('修改失败') }
        }).catch(error => {
          if (!auth.catchInfoFileter(error, false)) {
            this.$message.error('对于你的请求处理出现了错误')
          }
        })
    },
    handleUploadError (response, file, fileList) {
      this.$message.error(JSON.parse(response.message).msg)
    }
  }
}
</script>
<style scoped>
.head {
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
</style>
