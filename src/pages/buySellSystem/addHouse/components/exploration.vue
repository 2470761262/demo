<style lang="less" scoped>
.page-cell-addHouse {
  padding: 30px 50px 0;
  .upLoadFile {
    display: flex;
    margin-bottom: 100px;
    &:last-child {
      margin-bottom: 0;
    }
    .upLoadFile-title {
      align-self: flex-start;
      width: 80px;
      font-size: 15px;
      flex-shrink: 0;
    }
    .upLoadFile-input {
      border: 2px dashed #dcdfe6;
      width: 100px;
      height: 100px;
      margin-right: 40px;
      box-sizing: border-box;
      flex-shrink: 0;
      label {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 50px;
        color: #c0c4cc;
        display: flex;
        justify-content: center;
        align-items: center;
        input {
          display: none;
        }
      }
    }
    .upLoadFile-file-list {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
      .file-list-item {
        margin-bottom: 10px;
        flex: 0 0 25%;
        position: relative;
        padding: 0 10px;
        box-sizing: border-box;
        .upLoadFile-remove {
          position: absolute;
          top: -5px;
          right: 5px;
          font-size: 10px;
          color: #fff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: red;
          text-align: center;
          line-height: 20px;
        }
        img {
          width: 100%;
          height: 100px;
          object-fit: cover;
        }
      }
    }
    .upLoadFile-file-phone {
      margin-left: 40px;
      flex-shrink: 0;
      border: 2px dashed #dcdfe6;
      width: 100px;
      height: 100px;
      margin-right: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 70px;
        height: 70px;
      }
    }
  }
}
</style>
<template>
  <div class="page-cell-addHouse">
    <!-- accept=".jpg,.png" -->
    <!-- 外景图 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">外景图</div>
      <div class="upLoadFile-input">
        <label for="list1"
               class="el-icon-upload">
          <input id="list1"
                 type="file"
                 @change="getFile('outdoorImgList',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="index in 0"
             :key="index">
          <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
               alt="图片">
          <div class="upLoadFile-remove el-icon-delete"></div>
        </div>
      </div>
      <div class="upLoadFile-file-phone">
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
        <div>微信扫码上传</div>
      </div>
    </div>
    <!-- 客厅 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">客厅</div>
      <div class="upLoadFile-input">
        <label for="list1"
               class="el-icon-upload">
          <input id="list1"
                 type="file"
                 @change="getFile('list1',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="index in 6"
             :key="index">
          <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
               alt="图片">
          <div class="upLoadFile-remove el-icon-delete"></div>
        </div>
      </div>
      <div class="upLoadFile-file-phone">
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
        <div>微信扫码上传</div>
      </div>
    </div>
    <!-- 卧室 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">卧室</div>
      <div class="upLoadFile-input">
        <label for="list1"
               class="el-icon-upload">
          <input id="list1"
                 type="file"
                 @change="getFile('list1',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="index in 6"
             :key="index">
          <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
               alt="图片">
          <div class="upLoadFile-remove el-icon-delete"></div>
        </div>
      </div>
      <div class="upLoadFile-file-phone">
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
        <div>微信扫码上传</div>
      </div>
    </div>
    <!-- 厨房 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">厨房</div>
      <div class="upLoadFile-input">
        <label for="list1"
               class="el-icon-upload">
          <input id="list1"
                 type="file"
                 @change="getFile('list1',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="index in 6"
             :key="index">
          <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
               alt="图片">
          <div class="upLoadFile-remove el-icon-delete"></div>
        </div>
      </div>
      <div class="upLoadFile-file-phone">
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
        <div>微信扫码上传</div>
      </div>
    </div>
    <!-- 卫生间 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">卫生间</div>
      <div class="upLoadFile-input">
        <label for="list1"
               class="el-icon-upload">
          <input id="list1"
                 type="file"
                 @change="getFile('list1',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="index in 6"
             :key="index">
          <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
               alt="图片">
          <div class="upLoadFile-remove el-icon-delete"></div>
        </div>
      </div>
      <div class="upLoadFile-file-phone">
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
        <div>微信扫码上传</div>
      </div>
    </div>
    <!-- 户型图 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">户型图</div>
      <div class="upLoadFile-input">
        <label for="list1"
               class="el-icon-upload">
          <input id="list1"
                 type="file"
                 @change="getFile('list1',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="index in 6"
             :key="index">
          <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
               alt="图片">
          <div class="upLoadFile-remove el-icon-delete"></div>
        </div>
      </div>
      <div class="upLoadFile-file-phone">
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
        <div>微信扫码上传</div>
      </div>
    </div>
  </div>
</template>
<script>
import util from '@/util/util';
export default {
  name: "exploration",
  created () {
  },
  data () {
    return {
      outdoorImgList: [] //外景图
    }
  },
  methods: {
    getFile (fileList, e) {
      let file = event.target.files;
      let isImgType = ["image/jpeg", "image/png"];
      for (let index = 0; index < file.length; index++) {
        if (!isImgType.includes(file[index].type)) {
          this.$message.error("上传的图片只能是jpg,jpeg格式!");
          return;
        }
      }
      for (let index = 0; index < file.length; index++) {
        this.uploadSectionFile(file[index]);
      }
    },
    uploadSectionFile (uploader) {
      let that = this;
      //   let formData = new FormData();
      //   formData.append('picClass', uploader.filename)
      //   formData.append('draftid', that.$store.state.addHouse.formData.id)
      //   formData.append('file', uploader.file)
      let formData = new FormData();
      formData.append('picClass', 1)
      formData.append('draftid', 41)//that.$store.state.addHouse.formData.id)
      formData.append('file', uploader)
      this.$api.post({
        url: "/draft-house/picture",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((json) => {
        console.log(json.data.data, "json.data.data");
      }).catch(() => {
        that.$message({
          message: '不晓得为什么,反正失败了',
          type: 'warning'
        })
      })
    },
    validateAll () {
      return false;
    },
  },
}
</script>
