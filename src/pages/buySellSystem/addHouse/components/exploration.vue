<style lang="less" scoped>
@import url("../../../../assets/publicLess/addHouse.less");
.el-alert--info.is-light {
  width: fit-content;
  margin-top: 20px;
}
.Division {
  align-self: center;
  margin-right: 20px;
}
.phone-upload {
  margin-left: 20px;
  display: flex;
  align-self: flex-start;
  .phone-upload-img {
    width: 180px;
    height: 180px;
  }
  .phone-upload-text {
    text-align: center;
  }
}
.text-center {
  text-align: center;
  margin-top: 20px;
}
.videoClass {
  max-width: 100%;
  height: 600px;
  margin: 0 auto;
  display: block;
  object-fit: scale-down;
}
</style>
<template>
  <div class="page-cell">
    <div class="page-cell-title">房源描述</div>
    <!-- 小区介绍 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('communityDesc')}"
         :data-tips="errorBags.first('communityDesc')">
      <div class="page-cell-item">
        <div class="item-before item-before-top"
             data-before="*">小区介绍</div>
        <el-input type="textarea"
                  resize="none"
                  maxlength="20"
                  v-validate="'required|max:20'"
                  data-vv-name="communityDesc"
                  data-vv-as="小区介绍"
                  placeholder="请输入小区介绍"
                  v-model="formData.communityDesc">
        </el-input>
        <div class="textarea-tips">
          {{textarea2.length}}/{{20}}
        </div>
      </div>
    </div>
    <!-- 户型介绍 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">户型介绍</div>
        <el-input type="textarea"
                  resize="none"
                  maxlength="300"
                  placeholder="请输入户型介绍"
                  v-model="textarea2">
        </el-input>
        <div class="textarea-tips">
          {{textarea2.length}}/{{300}}
        </div>
      </div>
    </div>
    <!-- 税费解析 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">税费解析</div>
        <el-input type="textarea"
                  resize="none"
                  maxlength="20"
                  placeholder="请输入税费解析"
                  v-model="textarea2">
        </el-input>
        <div class="textarea-tips">
          {{textarea2.length}}/{{20}}
        </div>
      </div>
    </div>
    <!-- 核心卖点 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">核心卖点</div>
        <el-input type="textarea"
                  resize="none"
                  maxlength="20"
                  placeholder="请输入核心卖点"
                  v-model="textarea2">
        </el-input>
        <div class="textarea-tips">
          {{textarea2.length}}/{{20}}
        </div>
      </div>
    </div>
    <div class="page-cell-title">房源图片</div>
    <el-alert title="注：请勿填写联系方式或与房源无关的图片、链接等。请勿直接从其他网站或其他房源描述中拷贝。"
              type="info"
              :closable="false"
              show-icon>
    </el-alert>
    <!-- 外景图 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">外景图</div>
        <div>
          <div class="page-cell-item">
            <el-upload drag
                       :action="''"
                       :on-preview="handlePreview"
                       :limit="9"
                       name="1"
                       :before-upload="beforeAvatarUpload"
                       :http-request="uploadSectionFile"
                       :on-remove="removeImg"
                       :file-list="fileList.list1"
                       multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div class="phone-upload">
              <div class="Division">or</div>
              <div>
                <img class="phone-upload-img"
                     src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                     alt="手机上传图片二维码">
                <div class="phone-upload-text">手机上传</div>
              </div>
            </div>
          </div>
          <div class="text-center">最多可上传9张格式为jpg、jpeg图，尺寸不得小于600*600</div>
        </div>
      </div>
    </div>
    <!-- 卧室 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">卧室</div>
        <div>
          <div class="page-cell-item">
            <el-upload drag
                       :action="''"
                       :on-preview="handlePreview"
                       :limit="9"
                       name="2"
                       :before-upload="beforeAvatarUpload"
                       :http-request="uploadSectionFile"
                       :on-remove="removeImg"
                       :file-list="fileList.list2"
                       multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div class="phone-upload">
              <div class="Division">or</div>
              <div>
                <img class="phone-upload-img"
                     src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                     alt="手机上传图片二维码">
                <div class="phone-upload-text">手机上传</div>
              </div>
            </div>
          </div>
          <div class="text-center">最多可上传9张格式为jpg、jpeg图，尺寸不得小于600*600</div>
        </div>
      </div>
    </div>
    <!-- 内景图 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">内景图</div>
        <div>
          <div class="page-cell-item">
            <el-upload drag
                       :action="''"
                       :on-preview="handlePreview"
                       :limit="9"
                       name="3"
                       :before-upload="beforeAvatarUpload"
                       :http-request="uploadSectionFile"
                       :on-remove="removeImg"
                       :file-list="fileList.list3"
                       multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div class="phone-upload">
              <div class="Division">or</div>
              <div>
                <img class="phone-upload-img"
                     src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                     alt="手机上传图片二维码">
                <div class="phone-upload-text">手机上传</div>
              </div>
            </div>
          </div>
          <div class="text-center">最多可上传9张格式为jpg、jpeg图，尺寸不得小于600*600</div>
        </div>
      </div>
    </div>
    <!-- 厨房 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">厨房</div>
        <div>
          <div class="page-cell-item">
            <el-upload drag
                       :action="''"
                       :on-preview="handlePreview"
                       :limit="9"
                       name="4"
                       :before-upload="beforeAvatarUpload"
                       :http-request="uploadSectionFile"
                       :on-remove="removeImg"
                       :file-list="fileList.list4"
                       multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div class="phone-upload">
              <div class="Division">or</div>
              <div>
                <img class="phone-upload-img"
                     src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                     alt="手机上传图片二维码">
                <div class="phone-upload-text">手机上传</div>
              </div>
            </div>
          </div>
          <div class="text-center">最多可上传9张格式为jpg、jpeg图，尺寸不得小于600*600</div>
        </div>
      </div>
    </div>
    <!-- 客厅 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">客厅</div>
        <div>
          <div class="page-cell-item">
            <el-upload drag
                       :action="''"
                       :on-preview="handlePreview"
                       :limit="9"
                       name="5"
                       :before-upload="beforeAvatarUpload"
                       :http-request="uploadSectionFile"
                       :on-remove="removeImg"
                       :file-list="fileList.list5"
                       multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div class="phone-upload">
              <div class="Division">or</div>
              <div>
                <img class="phone-upload-img"
                     src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                     alt="手机上传图片二维码">
                <div class="phone-upload-text">手机上传</div>
              </div>
            </div>
          </div>
          <div class="text-center">最多可上传9张格式为jpg、jpeg图，尺寸不得小于600*600</div>
        </div>
      </div>
    </div>
    <!-- 户型图 -->
    <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">户型图</div>
        <div>
          <div class="page-cell-item">
            <el-upload drag
                       :action="''"
                       :on-preview="handlePreview"
                       :limit="9"
                       name="6"
                       :before-upload="beforeAvatarUpload"
                       :http-request="uploadSectionFile"
                       :on-remove="removeImg"
                       :file-list="fileList.list6"
                       multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div class="phone-upload">
              <div class="Division">or</div>
              <div>
                <img class="phone-upload-img"
                     src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                     alt="手机上传图片二维码">
                <div class="phone-upload-text">手机上传</div>
              </div>
            </div>
          </div>
          <div class="text-center">最多可上传9张格式为jpg、jpeg图，尺寸不得小于600*600</div>
        </div>
      </div>
    </div>
    <div class="page-cell-title">房源视频</div>
    <!-- 房源视频 -->
    <div class="form-error-tips"
         :class="{'after-tips':errorBags.has('houseVideo')}"
         :data-tips="errorBags.first('houseVideo')">
      <div class="page-cell-item">
        <div class="item-before item-before-top"
             data-before="*">室内视频</div>
        <div>
          <div class="page-cell-item">
            <el-upload ref="videoUpload"
                       drag
                       name="video"
                       :limit="3"
                       :on-remove="removeVideo"
                       :on-preview="handlePreviewVideo"
                       accept=".mp4"
                       :file-list="fileList.video"
                       :auto-upload="false"
                       action="''"
                       multiple>
              <template v-if="progressFlag">
                <el-progress type="circle"
                             :percentage="progressNum"
                             status="success"></el-progress>
              </template>
              <template v-if="!progressFlag">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <el-button type="primary"
                           size="mini"
                           @click.stop="uploadSectionFileVideo">提交服务器</el-button>
              </template>
            </el-upload>
            <div class="phone-upload">
              <div class="Division">or</div>
              <div>
                <img class="phone-upload-img"
                     src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                     alt="手机上传图片二维码">
                <div class="phone-upload-text">手机上传</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt=""
           v-if="showFlag">
      <video :src="dialogImageUrl"
             v-if="!showFlag"
             controls="controls"
             class="videoClass">您的浏览器不支持此视频播放</video>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "exploration",
  computed: {
    formData () {
      this.$set(this.$data, "step", JSON.parse(JSON.stringify(this.$store.state.addHouse.formData.step3)))
      return this.step
    }
  },
  created () {
    this.setValidate();
  },
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      showFlag: true,
      progressFlag: false,
      progressNum: 0,
      fileList: {
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        list5: [],
        list6: [],
        video: []
      },
      actionUrl: '',
      step: {},
      textarea2: ''
    }
  },
  methods: {
    setValidate () {
      this.$validator.attach("houseVideo", "required");
      const dictionary = {
        zh_CN: {
          messages: {
            required: field => field + "不能为空"
          },
          attributes: {
            houseVideo: "房源视频"
          }
        }
      };
      this.$validator.updateDictionary(dictionary);
    },
    removeVideo (file) {
      this.fileList.video = this.fileList.video.filter((item) => {
        return item.url != file.url;
      })
    },
    // 上传图片前处理函数
    uploadSectionFileVideo () {
      console.log(this.$refs.videoUpload);
      let that = this;
      let allSize = 0;
      this.$refs.videoUpload.uploadFiles.forEach((item, index) => {
        if (item.size / 1024 / 1024 > 50) {
          this.$message.error(`${index}号文件超过50M大小.已删除`);
          this.$refs.videoUpload.uploadFiles.splice(index, 1);
        } else {
          allSize + item.size / 1024 / 1024 > 50;
        }
      })
      if (allSize > 100) {
        this.$message.error(`一次多文件上传最高100M,已超过大小`);
      }
      if (this.$refs.videoUpload.uploadFiles.length <= 0) {
        return;
      }
      that.progressFlag = true;
      let count = 0;
      this.$refs.videoUpload.uploadFiles.forEach((item, index) => {
        if (!item.id) {
          count++;
          let formData = new FormData();
          formData.append('draftid', 1)
          formData.append('file', item.raw)
          this.$api.post({
            url: "/draft_house/video",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
            onUploadProgress: progressEvent => { //静读条
              let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
              that.progressNum = percent == 100 ? 90 : percent;
            },
          }).then((json) => {
            let data = json.data.data;
            that.fileList.video.push({ name: data.id, url: data.url, id: data.id });
          }).then(() => {
            that.progressNum = 100;
            setTimeout(() => {
              that.progressFlag = false;
            }, 200)
          }).catch(() => {
            that.$message({
              message: '不晓得为什么,反正失败了',
              type: 'warning'
            })
            that.progressFlag = false;
          })
        }
      })
      if (count == 0) {
        that.progressFlag = false;
      }
    },
    removeImg (file, fileList) {
      if (file.id) {
        this.fileList[file.listName] = this.fileList[file.listName].filter((item) => {
          return item.url != file.url;
        })
        this.$api.delete({
          url: `/draft_house/picture/${file.id}`,
          qs: true,
          data: {
            url: file.url
          }
        })
      }
    },
    uploadSectionFile (uploader) {
      let that = this;
      let formData = new FormData();
      formData.append('picClass', uploader.filename)
      formData.append('draftid', 1)
      formData.append('file', uploader.file)
      this.$api.post({
        url: "/draft_house/picture",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
        onUploadProgress: progressEvent => { //静读条
          let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
          uploader.onProgress({ percent: percent })
        }
      }).then((json) => {
        uploader.onSuccess()
        console.log(json.data.data, "json.data.data");
        let data = json.data.data;
        that.fileList["list" + uploader.filename].push({ id: data.id, name: data.id + ".png", url: data.url, listName: "list" + uploader.filename });
      }).catch(() => {
        that.$message({
          message: '不晓得为什么,反正失败了',
          type: 'warning'
        })
        uploader.onError()
      })
    },
    beforeAvatarUpload (file) {
      // 上传图片前处理函数
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png";
      let that = this;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是jpg,jpeg 格式!");
      }
      // const isSize = new Promise(function (resolve, reject) {
      //   let width = 600;
      //   let height = 600;
      //   let _URL = window.URL || window.webkitURL;
      //   let image = new Image();
      //   image.onload = function () {
      //     let valid = image.width == width && image.height == height;
      //     valid ? resolve() : reject();
      //   };
      //   image.src = _URL.createObjectURL(file);
      // }).then(
      //   () => {
      //     return file;
      //   },
      //   () => {
      //     this.$message.error("上传头像图片尺寸不符合,只能是600*600!");
      //     return Promise.reject();
      //   }
      // );
      //  return isJPG && isSize;
      return isJPG;
    },
    handlePreviewVideo (file) {
      if (!file.id) {
        this.dialogImageUrl = window.URL.createObjectURL(file.raw);// file.url;
      } else {
        this.dialogImageUrl = file.url;
      }

      this.dialogVisible = true;
      this.showFlag = false;

    },
    handlePreview (file) {
      this.dialogImageUrl = file.url;// file.url;
      this.dialogVisible = true;
      this.showFlag = true;
    },
    validateAll () {
      let that = this;
      return this.$validator.validateAll({
        communityDesc: that.fileList.list1,
        houseVideo: that.fileList.video
      }).then((e) => {
        return e;
      });
    }
  },
}
</script>
