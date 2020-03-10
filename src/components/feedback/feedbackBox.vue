<style lang="less" scoped>

  .feedback_box {
    text-align: right;
    margin: 0px;
  }

  .back_btn{
    text-align: left;
    margin: 0px;
    display: inline-block;
    float: left;
  }

  .feedback_divider {
    margin: 10px 0 24px 0;
  }

</style>
<template>
  <div >

    <el-dialog title="功能点反馈"
               :visible.sync="outerVisible"
               :before-close="beforeClose" >
      <div class="text item">
          <el-form class="form" label-width="80px" style="width: 100%" >
            <el-form-item label="功能点">
              <el-input v-model="form.functionPoint" property="功能点名称" ></el-input>
            </el-form-item>
            <el-form-item label="反馈内容">
              <el-input type="textarea" rows="10" v-model="form.suggest" property="反馈内容" ></el-input>
            </el-form-item>
            <el-form-item label="图片上传">
              <el-upload
                ref="upload"
                :action="uploadUrl"
                :headers="myHeader"
                accept="image"
                list-type="picture-card"
                :on-success="uploadFinished"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>

              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>

            </el-form-item>
          </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goSubmit">提交</el-button>
      </div>
    </el-dialog>

    <div class="feedback_box">
      <div class="back_btn">
        <el-link slot="reference" @click="goHome" class="feedback_btn" type="primary"
                 icon="el-icon-s-home">首页
        </el-link>
        <el-link slot="reference" @click="goBack" class="feedback_btn" type="primary"
                 icon="el-icon-back">返回
        </el-link>
      </div>
      <el-link slot="reference" @click="outerVisible = true" class="feedback_btn" type="warning"
               icon="el-icon-edit-outline">功能反馈
      </el-link>
    </div>
    <el-divider class="feedback_divider"></el-divider>

  </div>
</template>

<script>
  import util from "@/util/util";
  import { TOKEN } from '@/util/constMap';

  export default {
    props: {
      homeUrl: {
        type: String,
        default: "/buySellSystem/houseList"
      },
    },
    data() {
      return {
        form:{
          pics:[]
        },
        uploadUrl: "",
        myHeader: "",
        outerVisible: false,
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    created () {
      this.uploadUrl = this.$api.baseUrl() + "/noticeManage/common/picture";
      this.myHeader = { tk: util.localStorageGet(TOKEN) };
      console.log("upload url ",this.uploadUrl);
      console.log("header data  ",this.myHeader);
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
        let that = this;
        if(file && file.response){
          if(file.response.code == 200){
            let url = file.response.data.url;
            let urls = that.form.pics;
            urls.forEach(u=>{
              if(u == url){
                that.form.pics.pop(url);
              }
            })
            this.form.pics = that.form.pics;
          }
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传成功
      uploadFinished(response, file, fileList){
        let that = this;
        if(response.code == 200){
          if(!that.form.pics){
            that.form.pics = [];
          }
          that.form.pics.push(response.data.url);
        }
        console.log(response,file,fileList,"file list ....");
      },
      cleanFiles(){
        this.$refs.upload.clearFiles();
      },
      goSubmit() {
        let that = this;
        console.log(that.form, "save");
        that.$api
          .put({
            url: "/sys/onlineFeedback",
            data: that.form,
            qs: true,
          })
          .then(e => {
            console.log(e.data);
            let result = e.data;
            if (result.code == 200) {
              console.log(result.message);
              console.log(result.data);
              this.$message.success("提交成功.谢谢您的反馈");
              this.outerVisible = false;
              this.form = {};
              //清空图片
              this.cleanFiles();
              this.$forceUpdate();
            } else {
              console.log("修改查询操作失败：" + result.message);
              this.$message.error("修改查询操作失败：" + result.message);
            }
          });
      },
      //关闭之前调用
      beforeClose(done){
        if(!this.form){
          done();
          return;
        }
        if((this.form.pics && this.form.pics.length > 0) || this.form.functionPoint || this.form.suggest){
          this.$confirm('您还未反馈完确定关闭么？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }else{
          done();
        }
      },
      goBack(){
        this.$router.go(-1);
      },
      goHome(){
        this.$router.push({path:this.homeUrl});
      }
    }
  }

</script>
