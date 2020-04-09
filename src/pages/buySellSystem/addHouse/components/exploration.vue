<style lang="less" scoped>
@import url(../../../../assets/publicLess/upLoadFile.less);
.page-cell-addHouse {
  padding: 30px 50px 0;
}
/deep/.el-loading-spinner {
  top: 30%;
}
</style>
<template>
  <div class="page-cell-addHouse"
       element-loading-text="我在去获取数据的路上了~"
       v-loading="loading">
    <!-- accept=".jpg,.png" -->
    <!-- 外景图 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">外景图</div>
      <div class="upLoadFile-input"
           v-loading="outdoorImgListLoading"
           element-loading-text="文件上传中~">
        <label for="outdoorImgList"
               class="el-icon-upload">
          <input id="outdoorImgList"
                 type="file"
                 @change="getFile(1,'outdoorImgList',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="(item,index) in outdoorImgList"
             :key="item.id">
          <el-image :src="item.url"
                    fit="cover"
                    :preview-src-list="fillterImgList('outdoorImgList')">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <div class="upLoadFile-remove el-icon-delete"
               @click="deleteImg(item.id,item.url,index,'outdoorImgList')"></div>
        </div>
      </div>
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
    </div>
    <!-- 客厅 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">客厅</div>
      <div class="upLoadFile-input"
           v-loading="livingRoomImgListLoading"
           element-loading-text="文件上传中~">
        <label for="livingRoomImgList"
               class="el-icon-upload">
          <input id="livingRoomImgList"
                 type="file"
                 @change="getFile(2,'livingRoomImgList',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="item in livingRoomImgList"
             :key="item.id">
          <el-image :src="item.url"
                    :preview-src-list="fillterImgList('livingRoomImgList')"
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <div class="upLoadFile-remove el-icon-delete"
               @click="deleteImg(item.id,item.url,index,'livingRoomImgList')"></div>
        </div>
      </div>
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
    </div>
    <!-- 卧室 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">卧室</div>
      <div class="upLoadFile-input"
           v-loading="bedroomImgListLoading"
           element-loading-text="文件上传中~">
        <label for="bedroomImgList"
               class="el-icon-upload">
          <input id="bedroomImgList"
                 type="file"
                 @change="getFile(3,'bedroomImgList',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="item in bedroomImgList"
             :key="item.id">
          <el-image :src="item.url"
                    :preview-src-list="fillterImgList('bedroomImgList')"
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <div class="upLoadFile-remove el-icon-delete"
               @click="deleteImg(item.id,item.url,index,'bedroomImgList')"></div>
        </div>
      </div>
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
    </div>
    <!-- 厨房 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">厨房</div>
      <div class="upLoadFile-input"
           v-loading="kitchenImgListLoading"
           element-loading-text="文件上传中~">
        <label for="kitchenImgList"
               class="el-icon-upload">
          <input id="kitchenImgList"
                 type="file"
                 @change="getFile(4,'kitchenImgList',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="item in kitchenImgList"
             :key="item.id">
          <el-image :src="item.url"
                    :preview-src-list="fillterImgList('kitchenImgList')"
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <div class="upLoadFile-remove el-icon-delete"
               @click="deleteImg(item.id,item.url,index,'kitchenImgList')"></div>
        </div>
      </div>
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
    </div>
    <!-- 卫生间 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">卫生间</div>
      <div class="upLoadFile-input"
           v-loading="toiletImgListLoading"
           element-loading-text="文件上传中~">
        <label for="toiletImgList"
               class="el-icon-upload">
          <input id="toiletImgList"
                 type="file"
                 @change="getFile(5,'toiletImgList',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="item in toiletImgList"
             :key="item.id">
          <el-image :src="item.url"
                    :preview-src-list="fillterImgList('toiletImgList')"
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <div class="upLoadFile-remove el-icon-delete"
               @click="deleteImg(item.id,item.url,index,'toiletImgList')"></div>
        </div>
      </div>
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
    </div>
    <!-- 户型图 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">户型图</div>
      <div class="upLoadFile-input"
           v-loading="layoutImgListLoading"
           element-loading-text="文件上传中~">
        <label for="layoutImgList"
               class="el-icon-upload">
          <input id="layoutImgList"
                 type="file"
                 @change="getFile(6,'layoutImgList',$event)"
                 multiple="multiplt">
        </label>
      </div>
      <div class="upLoadFile-file-list">
        <div class="file-list-item"
             v-for="item in layoutImgList"
             :key="item.id">
          <el-image :src="item.url"
                    :preview-src-list="fillterImgList('layoutImgList')"
                    fit="cover">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span>...</span>
            </div>
          </el-image>
          <div class="upLoadFile-remove el-icon-delete"
               @click="deleteImg(item.id,item.url,index,'layoutImgList')"></div>
        </div>
      </div>
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
    </div>
    <!-- 房源视频 -->
    <div class="upLoadFile">
      <div class="upLoadFile-title">房源视频</div>
      <div class="upLoadFile-flex">
        <div class="upLoadFile-right">
          <div class="upLoadFile-input"
               v-loading="houseVideoLoading"
               element-loading-text="文件上传中~">
            <label for="houseVideoList"
                   class="el-icon-upload">
              <input id="houseVideoList"
                     type="file"
                     @change="getVideoFile('houseVideo',$event)">
            </label>
          </div>
          <div class="upLoadFile-file-list">
            <div class="file-list-item"
                 v-if="houseVideo.url">
              <video :src="houseVideo.url"
                     @click="imgdiaLog = true"></video>
              <div class="upLoadFile-remove el-icon-delete"
                   @click="deleteVideo(houseVideo)"></div>
            </div>
          </div>
          <div class="upLoadFile-file-phone">
            <el-image :src="qrCodeImgVedio"
                      :preview-src-list="[qrCodeImgVedio]"
                      fit="cover">
              <div slot="placeholder"
                   class="image-slot">
                加载中<span>...</span>
              </div>
            </el-image>
            <div>微信扫码上传</div>
          </div>
        </div>
        <div>仅可以上传一个视频,时间为60秒.</div>
      </div>
    </div>
    <!-- 视频弹框 -->
    <el-model-box v-model="imgdiaLog">
      <video :src="houseVideo.url"
             controls></video>
    </el-model-box>
  </div>
</template>
<script>
import util from '@/util/util';
import { LOGINDATA } from "@/util/constMap";
export default {
  name: "exploration",
  props: {
    getData: {
      type: Boolean,
      default: false
    },
    paramsObj: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    let that = this;
    //true 则去获取数据
    if (that.getData) {
      that.promiseAllViodeoAndImg();
    }
    that.currentIndex = 0;
    that.qrCodeImg = '';

    that.webSocketUser = this.guid();
    //接入聊天
    that.contactSocket(that.webSocketUser);
    // let obj=that.picParams;
    // let temp;
    // for(let key  in obj){
    //     console.log(key + '---' + obj[key]);
    //     temp=obj[key];
    //     temp.webSocketUser=that.webSocketUser;
    //     that.getQrCode2(temp,function(data){
    //             // that.qrCodeImgTemp[key]=(data.url);
    //             //二维码标识，用于消息接受的路由
    //             console.log("回调执行开始");
    //             //console.log(that.picParams[key]);
    //             that.picParams[key].qrCode=data.qrCode;
    //             that.qrCodeImg[key]=data.url;
    //             //console.log(that.picParams[key]);
    //             //console.log("回调执行结束");
    //     });
    // }
    //businessType=0代表录入房源（业务类型）
    let businessParams = { 1: "外景", 2: "客厅", 3: "卧室", 4: "厨房", 5: "卫生间", 6: "户型" };
    let pa = { "businessType": 0, "businessParams": JSON.stringify(businessParams), "remark": "录入房源-上传图片" };
    pa.webSocketUser = that.webSocketUser;
    that.getQrCode2(pa, function (data) {
      that.qrCodeImg = data.url;
      console.log(that.qrCodeImg, "图片二维码地址");
      that.getQrCodeForVedio(function (data) {
        that.qrCodeImgVedio = data;
        console.log(that.qrCodeImgVedio, "视频二维码地址");
      });
    });
  },
  data () {
    return {
      imgdiaLog: false,
      loading: false,
      outdoorImgListLoading: false,
      livingRoomImgListLoading: false,
      bedroomImgListLoading: false,
      kitchenImgListLoading: false,
      toiletImgListLoading: false,
      layoutImgListLoading: false,
      houseVideoLoading: false,
      outdoorImgList: [], //外景图
      livingRoomImgList: [],//客厅
      bedroomImgList: [],//卧室
      kitchenImgList: [],//厨房
      toiletImgList: [],//卫生间
      layoutImgList: [],//户型图
      houseVideo: {},//房源视频
      qrCodeImg: '',
      qrCodeImgVedio: '',
      picParams: {        1: { "picContainer": "outdoorImgList", "remark": "录入房源上传-外景图片" },
        2: { "picContainer": "livingRoomImgList", "remark": "录入房源上传-客厅图片" },
        3: { "picContainer": "bedroomImgList", "remark": "录入房源上传-卧室图片" },
        4: { "picContainer": "kitchenImgList", "remark": "录入房源上传-厨房图片" },
        5: { "picContainer": "toiletImgList", "remark": "录入房源上传-卫生间图片" },
        6: { "picContainer": "layoutImgList", "remark": "录入房源上传-户型图片" }      },
      websock: null,
      webSocketUser: ''
    }
  },
  methods: {
    guid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    receiveMessage (r) {
      let that = this;
      console.log(r, "接收到了消息");
      if (r.content.resourceType == "vedio") {
        console.log(r.content, "视频消息内容，准备插入草稿箱")
        that.uploadFileInfo(undefined, r.content.picUrl, function (data) {
          that.houseVideo = data;
        });
      } else {
        let temp = that.picParams[r.content.picClass];

        //找到消息是发送给哪个二维码的
        let name = temp.picContainer;
        console.log(that[name], "找到了指定用户");
        console.log(r.content.picUrl, "接受到消息的图片地址");
        that.uploadFileInfo(r.content.picClass, r.content.picUrl, function (data) {
          that[name].push(data);
        });
      }
    },
    contactSocket (user) {
      console.log("用户【" + user + "】开始接入");
      this.socketApi.initWebSocket(this.$api.baseUrl().replace("http", ""), user);
      this.socketApi.initReceiveMessageCallBack(this.receiveMessage);
      console.log("用户【" + user + "】接入完毕");
    },
    getQrCodeForVedio (callback) {
      let that = this;
      let loginUser = util.localStorageGet(LOGINDATA);

      that.$api.post({
        url: '/scanUpload/getUploadQrCode',
        data: { 'operatePerId': loginUser.accountId, 'operatePerName': loginUser.userName, 'remark': "录入房源-上传视频", "resourceType": "vedio", "webSocketUser": that.webSocketUser, "businessParams": JSON.stringify({ "test": "闭环参数" }) },
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        let result = e.data;
        if (result.code == 200) {
          callback(result.data.url);
        } else {
          console.log("h获取视频二维码结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询视频二维码失败");
        console.log(e);
      })
    },
    getQrCode2 (data, callback) {
      let that = this;
      that.$api.post({
        url: '/scanUpload/getUploadQrCode',
        data: data,
        headers: { "Content-Type": "application/json" }
      }).then((e) => {
        let result = e.data;
        console.log("请求二维码成功");
        if (result.code == 200) {
          //that.qrCodeImg="data:image/png;base64,"+item.img;
          callback(result.data);
        } else {
          console.log("h获取二维码结果：" + result.message);
          alert(result.message);
        }
      }).catch((e) => {
        console.log("查询二维码失败");
        console.log(e);
      })
    },
    openVideo () {

    },
    promiseAllViodeoAndImg () {
      this.loading = true;
      Promise.all([this.getLoadDataImg(), this.getLoadDataVideo()]).catch(() => {
        this.$message.error('获取数据失败~');
      }).finally(() => {
        this.loading = false;
      })
    },
    getLoadDataVideo () {
      let url = `/draft-house/videos/${this.$store.state.addHouse.formData.id}`;
      if (this.paramsObj.getVideoUrl) {
        url = this.paramsObj.getVideoUrl + this.$store.state.addHouse.formData.id
      }
      this.$api.post({ url: url })
        .then((e) => {
          let data = e.data;
          if (data.code == 200 && data.data.length != 0) {
            this.houseVideo = data.data[0];
          }
        }).catch(() => {
          this.$message.error('获取数据失败~');
        }).finally(() => {
          this.loading = false;
        })
    },
    //返回预览大图list
    fillterImgList (imgList) {
      if (this[imgList].length > 0) {
        return this[imgList].map((item) => {
          return item.url;
        })
      } else {
        return [];
      }
    },
    //获取上传的图片
    getLoadDataImg () {
      let url = `/draft-house/pictures/${this.$store.state.addHouse.formData.id}`;
      if (this.paramsObj.getPicturesUrl) {
        url = this.paramsObj.getPicturesUrl + this.$store.state.addHouse.formData.id;
      }
      return this.$api.post({ url: url })
        .then((e) => {
          let data = e.data;
          if (data.code == 200) {
            let imgList = data.data;
            imgList.forEach((item) => {
              let type = item.picClass ? item.picClass : item.PicClass;
              switch (type) {
                case 1:
                  this.outdoorImgList.push(item);
                  break;
                case 2:
                  this.livingRoomImgList.push(item);
                  break;
                case 3:
                  this.bedroomImgList.push(item);
                  break;
                case 4:
                  this.kitchenImgList.push(item);
                  break;
                case 5:
                  this.toiletImgList.push(item);
                  break;
                case 6:
                  this.layoutImgList.push(item);
                  break;
              }
            })
          }
        })
    },
    //上传视频
    getVideoFile (fileListName, e) {
      let file = event.target.files;
      let isVideoType = ["video/mp4"];
      if (!isVideoType.includes(file[0].type)) {
        this.$message.error("上传的视频只能是MP4格式!");
        return;
      }
      if (Object.keys(this[fileListName]).length != 0) {
        this.$message.error("只能上传一个视频");
        return;
      }
      let audioElement = new Audio(URL.createObjectURL(file[0]));
      audioElement.addEventListener("loadedmetadata", () => {
        if (audioElement.duration > 60) {
          this.$message.error("视频时长大于60秒了~");
        } else {
          this.uploadSectionFile(undefined, file[0], fileListName);
        }
      });
    },
    //上传图片
    getFile (picClass, fileListName, e) {
      let file = event.target.files;
      let isImgType = ["image/jpeg", "image/png"];
      if (file.length > 6) {
        this.$message.error("最多一次上传6张图片");
        return;
      }
      for (let index = 0; index < file.length; index++) {
        if (!isImgType.includes(file[index].type)) {
          this.$message.error("上传的图片只能是jpg,jpeg格式!");
          return;
        }
      }
      for (let index = 0; index < file.length; index++) {
        this.uploadSectionFile(picClass, file[index], fileListName);
      }
    },
    //删除图片
    deleteImg (id, url, index, listName) {
      this.$api.delete({
        url: `/draft-house/picture/${id}`,
        data: {
          url: url
        },
        qs: true
      }).then((e) => {
        if (e.data.code == 200) {
          this[listName].splice(index, 1)
        }
      })
    },
    deleteVideo (item) {
      //微信上传的视频或图片，没必要删除。他删除的也是草稿箱，我微信上传图片没放那个草稿箱，而且oss不限容量，没必要删除图片      
      if (item.id == -1) {
        this.houseVideo = {};
        return;
      }
      this.$api.delete({
        url: `/draft-house/video/${item.id}`,
        data: {
          url: item.url
        },
        qs: true
      }).then((e) => {
        if (e.data.code == 200) {
          this.houseVideo = {}
        }
      })
    },
    uploadFileInfo (picClass, url, callBack) {
      let that = this;
      let formData = {};
      //注意大驼峰
      formData.PicClass = picClass;
      formData.IpStr = url;
      formData.FileStr = '';
      formData.PicName = '';
      if (this.paramsObj.getEditUrl) {
        formData.Eid = that.$store.state.addHouse.formData.id;
      }
      else {
        formData.DraftId = that.$store.state.addHouse.formData.id;
      }
      this.$api.post({
        url: `/draft-house/${picClass != undefined ? 'pictureDraft' : 'videoDraft'}`,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: formData
      }).then((json) => {
        if (json.data.code == 200) {
          let result = json.data.data;
          result.url = url;
          callBack(result);
        } else {
          that.$message({
            message: json.data.message,
            type: 'warning'
          })
        }
      }).catch((e) => {
        console.log(e);
        that.$message({
          message: '不晓得为什么,反正失败了2',
          type: 'warning'
        })
      }).finally(() => {

      })
    },
    uploadSectionFile (picClass, uploader, fileListName) {
      let that = this;
      this[fileListName + 'Loading'] = true;
      let formData = new FormData();
      if (picClass != undefined) {
        formData.append('picClass', picClass)
      }
      if (this.paramsObj.getEditUrl) {
        formData.append('eid', that.$store.state.addHouse.formData.id)
      }
      else {
        formData.append('draftId', that.$store.state.addHouse.formData.id)
      }
      formData.append('file', uploader)
      this.$api.post({
        url: `/draft-house/${picClass != undefined ? 'picture' : 'video'}`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
        // onUploadProgress: (progressEvent) => { //原生获取上传进度的事件
        //   if (progressEvent.lengthComputable) {
        //     let num = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        //     console.log(num, "num");
        //   }
        // }
      }).then((json) => {
        if (json.data.code == 200) {
          if (picClass != undefined) {
            this[fileListName].push(json.data.data);
          } else {
            this[fileListName] = json.data.data;
          }
        }
      }).catch((e) => {
        console.log(e);
        that.$message({
          message: '不晓得为什么,反正失败了',
          type: 'warning'
        })
      }).finally(() => {
        this[fileListName + 'Loading'] = false;
      })
    },
    validateAll () {
      return true;
    },
  },
}
</script>
