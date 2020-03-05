<style lang="less" scoped>
.page-cell-addHouse {
  padding: 30px 50px 0;
  .upLoadFile {
    display: flex;
    margin-bottom: 100px;
    &:last-child {
      margin-bottom: 0 !important;
    }
    .upLoadFile-title {
      align-self: flex-start;
      width: 80px;
      font-size: 15px;
      flex-shrink: 0;
    }
    .upLoadFile-flex {
      flex: 1;
    }
    .upLoadFile-right {
      flex: 1;
      display: flex;
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
        &:hover .upLoadFile-remove {
          display: block;
        }
        .upLoadFile-remove {
          display: none;
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
          cursor: pointer;
        }
        /deep/.el-image {
          width: 100%;
          height: 100px;
        }
        img,
        video {
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
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
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
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
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
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
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
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
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
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
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
        <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
             alt="图片">
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
            <img src="http://sys.lsxjy.com.cn/images/androidDownload.png"
                 alt="图片">
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
export default {
  name: "exploration",
  props: {
    getData: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    //true 则去获取数据
    if (this.getData) {
      this.promiseAllViodeoAndImg();
    }
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
      houseVideo: {}//房源视频
    }
  },
  methods: {
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
      this.$api.post({ url: `/draft-house/videos/${this.$store.state.addHouse.formData.id}` })
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
      return this.$api.post({ url: `/draft-house/pictures/${this.$store.state.addHouse.formData.id}` })
        .then((e) => {
          let data = e.data;
          if (data.code == 200) {
            let imgList = data.data;
            imgList.forEach((item) => {
              switch (item.picClass) {
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
      console.log(fileListName, e);
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
    uploadSectionFile (picClass, uploader, fileListName) {
      let that = this;
      this[fileListName + 'Loading'] = true;
      let formData = new FormData();
      if (picClass != undefined) {
        formData.append('picClass', picClass)
      }
      formData.append('draftId', that.$store.state.addHouse.formData.id)
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
