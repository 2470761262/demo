<style lang="less" scoped >
.page-form-inline {
  display: flex;
  /deep/.el-input-group__append {
    color: #606266;
    background: none;
    border: none;
  }
  &::after {
    content: attr(data-tips);
    line-height: 40px;
    font-size: 14px;
    margin-left: 20px;
    color: #606266;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.page-form-tips {
  height: 50px;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 20px;
  //line-height: 50px;
  display: table-cell;
  vertical-align: middle;
}
.dividingLine {
  height: 1px;
  background: #c0c4cc;
  width: 10px;
  align-self: center;
  margin: 0 10px 20px;
}
/deep/.is-bordered {
  margin-left: 0 !important;
}
.marLeft20 {
  margin-left: 20px;
  flex-shrink: 0;
}
</style>
<template >
  <div>
    <div class="page-form-tips">Tips：楼盘信息补充成功后，管理员将尽快进行审核！</div>
    <el-form ref="form"
             @submit.native.prevent
             :model="form"
             label-width="80px"
             label-position="right">
     
      <div class="page-form-inline">
        <el-form-item label="楼盘名称">
          <el-input placeholder="请输入楼盘名称"
                    v-model="form.communityName">
          </el-input>
        </el-form-item>
      </div>

       <div class="page-form-inline">
        <el-form-item label="楼栋">
          <el-input placeholder="请输入楼栋名称"
                    v-model="form.comBuildingName">
          </el-input>
        </el-form-item>
      </div>

     <div class="page-form-inline">
        <el-form-item label="房间号">
          <el-input placeholder="请输入房间号"
                    v-model="form.buildIngHouses">
          </el-input>
        </el-form-item>
      </div>

      <div class="page-form-inline">
        <el-form-item label="材料说明">
          <el-input placeholder="请输入材料说明"
                    v-model="form.ReplenishRemark">
          </el-input>
        </el-form-item>
      </div>
      <div class="form-error-tips">
      <div class="page-cell-item">
        <div class="item-before item-before-top">怎么材料</div>
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
                       :file-list="form.proveImg"
                       multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </div>
          <div class="text-center">最多可上传9张格式为jpg、jpeg图，尺寸不得小于600*600</div>
        </div>
      </div>
    </div>
      

     
      

      <el-button-group>
        <el-button type="primary"
                 @click="apply()"  >申请</el-button>
      </el-button-group>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt=""
           >
    </el-dialog>
  </div>
</template>
<script>

export default {
  data () {
    return {
      form: {
        communityName:'',
        comBuildingName:'',
        buildIngHouses:'',
        ReplenishRemark:'',
        proveImg:[],
        prove:[],
      },
      dialogImageUrl:'',
      dialogVisible: false,
    }
  },
  mounted () {
    


  },
  methods: {
    handlePreview (file) {
      this.dialogImageUrl = file.url;// file.url;
      this.dialogVisible = true;
      this.showFlag = true;
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
    uploadSectionFile (uploader) {
      let that = this;
      let formData = new FormData();
      formData.append('picClass', uploader.filename)
      formData.append('draftid', 1)
      formData.append('file', uploader.file)
      this.$api.post({
        url: "/draft-house/picture",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
        onUploadProgress: progressEvent => { //静读条
          let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
          uploader.onProgress({ percent: percent })
        }
      }).then((json) => {
        uploader.onSuccess()
        let data = json.data.data;
        that.form.proveImg.push({ name: data.id, url: data.url, id: data.id });
         that.form.prove.push(data.url);
        console.log(that.form.proveImg.join(','))
      }).catch(() => {
        that.$message({
          message: '不晓得为什么,反正失败了',
          type: 'warning'
        })
        uploader.onError()
      })
    },
     removeImg (file) {
      if (file.id) {
        this.form.proveImg = this.form.proveImg.filter((item) => {
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
      apply(){
           var that = this
          if (that.form.prove==null) {
              alert("证明材料不能为空");
              return;
            }
           
            this.$api.get({
                url: "/CommunityReplenish/add",
                headers: { "Content-Type": "application/json;charset=UTF-8" },
                token: false,
                qs: true,
                data: {
                communityName: that.form.communityName,
                comBuildingName: that.form.comBuildingName,
                buildIngHouses: that.form.buildIngHouses,
                ReplenishRemark: that.form.ReplenishRemark,
                proveImg: that.form.prove.join(',')
                }
            }).then((e) => {
                if (e.data.code == 200) {
                     this.$router.push({ path: '/buySellSystem/addHouse'});
                }
            })
      }
    
  }
}
</script>