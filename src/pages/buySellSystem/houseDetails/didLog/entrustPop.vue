<style lang="less" scoped>
.replace-content {
  display: flex;
  margin-top: 30px;
  align-items: center;
  .replace-left {
    .replace-left-row {
      margin-top: 30px;
      &:first-child {
        margin-top: 0px;
      }
      display: flex;
      align-items: center;
      h3 {
        margin-right: 20px;
        font-weight: normal;
        font-size: 15px;
      }
      .raido-group {
        margin-top: 0;
        .raido-group-label {
          margin-bottom: 0;
          span {
            font-size: 15px;
          }
          i::before {
            width: 5px;
            height: 5px;
            margin-right: 5px;
          }
        }
      }
      .replace-select {
        width: 150px;
      }
      &.passWord-input {
        h3 {
          width: 60px;
        }
        /deep/.el-input {
          flex: 1;
          .el-input__inner {
            height: 27px;
            line-height: 27px;
          }
        }
      }
    }
  }
  .replace-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    .replace-upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1;
      .icon {
        font-size: 60px;
      }
      .replace-upload-but {
        cursor: pointer;
        border: 1px solid #999;
        border-radius: 4px;
        color: black;
        padding: 3px 2px;
        box-sizing: border-box;
        input {
          display: none;
        }
        span {
          font-size: 13px;
        }
      }
    }
  }
  .replace-qr {
    position: relative;
    width: 80px;
    height: 80px;
    .icon {
      position: absolute;
      color: black;
      top: -5px;
      right: -5px;
      font-size: 14px;
      background: black;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      z-index: 10;
      color: #fff;
      text-align: center;
      line-height: 20px;
      display: none;
      cursor: pointer;
    }
    &:hover .icon {
      display: block;
    }
  }
}
.fieldError {
  font-size: 15px;
  color: red;
}
.pop-but {
  /deep/span {
    font-size: 12px !important;
  }
  .button-back {
    background: #108f51;
    /deep/span {
      color: #fff;
    }
  }
}
#uploadFile {
  display: none;
}
</style>
<template>
  <fixedPopup v-bind="$attrs"
              v-on="$listeners">
    <template>
      <div class="replace-content">
        <div class="replace-left">
          <div class="replace-left-row">
            <h3>钥匙类型</h3>
            <div class="raido-group">
              <label class="raido-group-label"
                     v-for="(item,index) in pop.checkList"
                     :key="index">
                <input type="radio"
                       :value="item.value"
                       v-model="pop.model">
                <i></i>
                <span>{{item.title}}</span>
              </label>
            </div>
          </div>
          <div class="replace-left-row">
            <h3>委托截止时间</h3>
            <el-date-picker class="replace-select"
                            size="mini"
                            v-model="entrustTime"
                            type="date"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            data-vv-as="委托时间"
                            data-vv-name="fileLoad"
                            v-validate="'required'"
                            placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <div class="replace-right">
          <div class="replace-upload">
            <i class="el-icon-upload icon"></i>
            <label class="replace-upload-but">
              <input type="file"
                     @change="getFileChange" />
              <input type="text"
                     v-model="fileLoad.id"
                     data-vv-as="文件"
                     data-vv-name="fileLoad"
                     v-validate="'required'"
                     id="uploadFile" />
              <span>请上传委托文件</span>
            </label>
          </div>
        </div>
        <div class="replace-qr">
          <el-image :src="fileLoad.url || fileLoad.qrImg"
                    fit="cover"
                    :preview-src-list="[fileLoad.url ? fileLoad.url : fileLoad.qrImg]">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <i class="el-icon-close icon"
             v-if="fileLoad.url"
             @click="removeImg"></i>
        </div>
      </div>
      <div class="fieldError">{{ errorBags.all()[0] }}</div>
      <div class="pop-but">
        <el-button size="small"
                   @click="hidePop">取消</el-button>
        <el-button size="small"
                   class="button-back"
                   :loading="pop.loading"
                   @click="result">确定</el-button>
      </div>
    </template>
  </fixedPopup>
</template>

<script>
import '../less/didLogCss.less';
import util from '@/util/util';
import { LOGINDATA } from '@/util/constMap';
import houseCheck from '../common/houseCheck';
export default {
  inject: ["houseId"],
  props: {
    replaceType: {
      type: Number
    }
  },
  data () {
    return {
      pop: {
        model: 0,
        checkList: [
          { title: '普通委托', value: 2 },
          { title: '独家委托', value: 1 },
          { title: '限时委托', value: 3 }
        ]
      },
      entrustTime: '',//委托时间
      fileLoad: {//上传文件
        id: null,
        qrImg: '',
        url: ''
      },
    }
  },
  mounted () {
    this.requestQrCode();
  },
  methods: {
    /**
     * 关闭弹窗
     */
    hidePop () {
      this.$emit('update:visible', false)
    },
    /**
     * submit
     */
    result () {
      this.$validator
        .validateAll().then((e) => {
          if (e) {
            let url = `/agentHouse/propertyCheck/${this.replaceType == 1 ? 'insertApplyFor' : 'insertReplace'}`;
            let params = {
              Eid: this.houseId.id,
              Type: this.replaceType,
              onlyType: this.pop.model,
              picList: [this.fileLoad.id],
              ProxyMaxTime: this.entrustTime,
              followMemo: "提交了委托申请"
            }
            if (this.replaceType == 4) {
              params.ReplaceType = 2;
            }
            this.hidePop();
            houseCheck.insertCheck(url, params).then((e) => {
              if (e.data.code == 200) {
                this.$message.success(e.data.message);
              }
            }).catch((e) => {
              this.$message.error(e.data.message);
            })
          }
        })
    },
    /**
     *  删除图片
     */
    removeImg () {
      houseCheck.removeImg(this.fileLoad.id, this.fileLoad.url).then((e) => {
        if (e.data.code == 200) {
          this.fileLoad.id = null;
          this.fileLoad.url = this.fileLoad.qrImg;
          this.$message.success('删除成功~');
        }
      }).catch(() => {
        this.$message.error('删除失败~');
      })
    },
    /**
    * 上传文件
    * @param {e} event  
    */
    getFileChange (event) {
      let file = event.target.files;
      let isImgType = ["image/jpeg", "image/png"];
      if (this.fileLoad.id != null) {
        this.$message.error("最多一次上传1张图片");
        return;
      }

      if (!isImgType.includes(file[0].type)) {
        this.$message.error("上传的图片只能是jpg,jpeg格式!");
        return;
      }
      this.upLoadFile(file[0]);
    },
    /**
     * 上传文件
     * @param {file} file 
     */
    upLoadFile (file) {
      let formData = new FormData();
      formData.append("type", this.replaceType);
      formData.append("file", file);
      this.$api
        .post({
          url: "/agentHouse/followPic/upload",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        })
        .then(json => {
          if (json.data.code == 200) {
            this.fileLoad.id = json.data.data.id;
            this.fileLoad.url = json.data.data.url;
          }
        })
        .catch(() => {
          that.$message({
            message: "不晓得为什么,反正失败了",
            type: "warning"
          });
        });
    },
    contactSocket (user) {
      console.log("用户【" + user + "】开始接入");
      this.socketApi.initWebSocket(this.$api.baseUrl().replace("http", ""), user);
      this.socketApi.initReceiveMessageCallBack(this.receiveMessage);
      console.log("用户【" + user + "】接入完毕");
    },
    guid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    requestQrCode () {
      let that = this;
      //请求二维码参数说明，是一个js对象
      //remark 标题，用于显示在小程序上传资源页面标题；
      //resourceType 资源类型 默认picture,还有vedio,audio分别代表视频和音频--扫码后自动适应时选择图片还是视频还是音频
      //businessParams：闭环参数 传过来什么接受消息时回传，注意是一个json字符串，请利用JSON.stringify(js对象)转换
      //webSocketUser:默认是二维码标识，可以不传。发消息就是基于这个标识发送的；如果一个页面有多个二维码需要自己生成全球唯一（见guid()函数实例）
      that.$api.post({
        url: '/scanUpload/getUploadQrCode',
        data: { 'remark': "", "resourceType": "picture", "businessParams": JSON.stringify({ "test": "委托人" }) },
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          this.fileLoad.qrImg = result.data.url;
          this.contactSocket(result.data.qrCode)
        } else {
          alert(result.message);
        }
      }).catch((e) => {
      })
    },
    receiveMessage (r) {
      //回调函数，用于接收扫码后发送的消息
      console.log(r.content, "消息内容");
      let that = this;
      if (that.fileLoad.id == null) {
        let str = r.content.picUrl;
        let firstIndex = str.indexOf("/");
        let secondIndex = str.indexOf("/", firstIndex + 1);
        let thirdIndex = str.indexOf("/", secondIndex + 1);
        let lastIndex = str.lastIndexOf("/");
        let params = {
          IpStr: str.substring(0, thirdIndex),
          FileStr: str.substring(thirdIndex + 1, lastIndex),
          PicName: str.substring(lastIndex + 1, str.length - 1),
          Type: that.replaceType
        }
        that.insertPic(params, str);
      }
      //。。。执行你需要的业务逻辑
    },
    //添加图片
    insertPic (params, picUrl) {
      this.$api
        .post({
          url: "/agentHouse/followPic/insert",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params,
        })
        .then(json => {
          if (json.data.code == 200) {
            this.fileLoad.id = json.data.data.id;
            this.fileLoad.url = picUrl;
          }
        })
        .catch(() => {
          that.$message({
            message: "不晓得为什么,反正失败了",
            type: "warning"
          });
        });
    },
  }
}

</script>

