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
              <div class="upLoadFile-file-phone">
                <el-image :src="qrCodeImg"
                          :preview-src-list="[qrCodeImg]"
                          fit="cover">
                  <div slot="placeholder"
                       class="image-slot">
                    加载中<span>...</span>
                  </div>
                </el-image>
                <div>微信扫码上传</div>
              </div>
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
      <el-link slot="reference" @click="hitOuterVisible()" class="feedback_btn" type="warning"
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
        qrCodeImg:null,
        dialogVisible: false
      };
    },
    created () {
     
      this.uploadUrl = this.$api.baseUrl() + "/noticeManage/common/picture";
      this.myHeader = { tk: util.localStorageGet(TOKEN) };
      console.log("upload url ",this.uploadUrl);
      console.log("header data  ",this.myHeader);
      
    },
    mounted(){
      
    },
    methods: {
      hitOuterVisible(){
        this.outerVisible =true;
        this.requestQrCode();

      },
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
      },
      contactSocket (user) {
        console.log("用户【" + user + "】开始接入");
        this.socketApi.initWebSocket(this.$api.baseUrl().replace("http", ""),user);
        this.socketApi.initReceiveMessageCallBack(this.receiveMessage);
        console.log("用户【" + user + "】接入完毕");

      },
     guid(){
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        });
      },
      requestQrCode(){
      
       //请求二维码参数说明，是一个js对象
       //remark 标题，用于显示在小程序上传资源页面标题；
       //resourceType 资源类型 默认picture,还有vedio,audio分别代表视频和音频--扫码后自动适应时选择图片还是视频还是音频
       //businessParams：闭环参数 传过来什么接受消息时回传，注意是一个json字符串，请利用JSON.stringify(js对象)转换
       //webSocketUser:默认是二维码标识，可以不传。发消息就是基于这个标识发送的；如果一个页面有多个二维码需要自己生成全球唯一（见guid()函数实例）
        this.$api.post({
                      url: '/scanUpload/getUploadQrCode',
                      data: {'remark':"请选择图片"},
                      headers: { "Content-Type": "application/json" }
                    }).then((e) => {
                      let result = e.data;
                      if (result.code == 200) {
                      
                          console.log(result.data.url,"拿到二维码地址，直接显示到pc页面即可");
                          this.qrCodeImg = result.data.url,
                          console.log(result.data.qrCode,"二维码唯一标识，用于初始化websocket的连接用户");
                          let qrCode=result.data.qrCode;
                          this.contactSocket(qrCode);
                      } else {
                        console.log("h获取xx二维码结果：" + result.message);
                        alert(result.message);
                      }
                    }).catch((e) => {
                      console.log("查询视频二维码失败");
                      console.log(e);
                    })
      },
      receiveMessage(r){
        //回调函数，用于接收扫码后发送的消息
        console.log(21)
        console.log(r,"消息内容");
        //。。。执行你需要的业务逻辑
       this.uploadUrl = r.content.url;
      }

    },
    
  }

</script>
