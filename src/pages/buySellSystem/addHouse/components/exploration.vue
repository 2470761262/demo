<style lang="less" scoped>
.page-cell-addHouse {
  // prettier-ignore
  width: 876PX;
  .cell {
    display: flex;
    .content {
      // prettier-ignore
      flex: 0 0 556PX;
      background: #fff;
      // prettier-ignore
      padding-top: 24PX;
      // prettier-ignore
      border-radius: 8px;
      .content-head {
        display: flex;
        justify-content: space-between;
        // prettier-ignore
        padding: 0 16PX;
        .head-title {
          font-size: @font18;
          color: #303133;
          font-weight: bold;
        }
        .head-add {
          color: #247257;
          font-size: @font14;
          cursor: pointer;
        }
      }
      .image-type-content {
        display: flex;
        justify-content: space-between;
        // prettier-ignore
        height: 42PX;
        background: #f0f2f5;
        // prettier-ignore
        padding: 0 6PX 0 16PX;
        // prettier-ignore
        margin-top: 16PX;
        .image-type-item {
          font-size: @font14;
          color: #303133;
          // prettier-ignore
          line-height: 42PX;
          cursor: pointer;
          &.active {
            position: relative;
            color: @backgroud;
            font-weight: bold;
            z-index: 1;
            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              // prettier-ignore
              left: 2PX;
              // prettier-ignore
              right: 10PX;
              // prettier-ignore
              height: 2PX;
              background: @backgroud;
            }
          }
        }
      }
      .layuout-drag {
        display: flex;
        flex-wrap: wrap;
        // prettier-ignore
        padding-left: 46PX;
        // prettier-ignore
        padding-top: 41PX;
        .image-item {
          // prettier-ignore
          width: 96PX;
          // prettier-ignore
          height: 96PX;
          position: relative;
          box-sizing: border-box;
          border: 2px solid transparent;
          .multi-posi {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
          }
          &.border {
            // prettier-ignore
            border-radius: 6PX;
            border: 2px solid @backgroud;
          }
          .check-multi {
            // prettier-ignore
            width: 18PX;
            // prettier-ignore
            height: 18PX;
            // prettier-ignore
            top: 6PX;
            // prettier-ignore
            right: 6PX;
            position: absolute;
            span {
              background: #ffffff;
              border: 1px solid #909399;
              border-radius: 50%;
              position: absolute;
              height: 100%;
              width: 100%;
              cursor: pointer;
              box-sizing: border-box;
            }
            input {
              display: none;
              &:checked {
                & + span {
                  border: none;
                  &::after {
                    font-family: element-icons !important;
                    content: "\e79c";
                    font-size: @font18;
                    color: @backgroud;
                  }
                }
              }
            }
          }
          .remove-btn {
            position: absolute;
            // prettier-ignore
            top: -7PX;
            // prettier-ignore
            right:-7PX ;
            color: #d62727;
            font-size: @font14;
            text-align: center;
            display: none;
            cursor: pointer;
          }
          &:hover .remove-btn {
            display: block;
          }
          img {
            user-select: none;
            pointer-events: none;
            // prettier-ignore
            border-radius: 6PX;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .split-line {
      // prettier-ignore
      height: 16PX;

      background: #f4f4f4;
    }
    .video-content {
      // prettier-ignore
      min-height: 307PX;
      // prettier-ignore
      border-radius: 8PX;
      display: flex;
      flex-direction: column;
      .video-title {
        // prettier-ignore
        padding-top: 24PX;
        // prettier-ignore
        padding-left: 16PX;
        font-size: @font18;
        color: #303133;
      }
      .video-flex {
        flex: 1;
        display: flex;
        // prettier-ignore
        margin: 20PX 0 41PX;
        .video-show {
          border-right: 1px solid #d3d3d3;
          display: flex;
          justify-content: center;
          align-items: center;
          .upload-video {
            // prettier-ignore
            width: 148PX;
            // prettier-ignore
            height: 48PX;

            span {
              // prettier-ignore
              border-radius: 4PX;
              cursor: pointer;
              width: 100%;
              height: 100%;
              color: #fff;
              background: @backgroud;
              display: block;
              // prettier-ignore
              line-height: 48PX;
              font-size: @font16;
              text-align: center;
            }
            input {
              display: none;
            }
          }
        }
        .video-qr,
        .video-show {
          flex: 1;
        }
        .video-qr {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          img {
            // prettier-ignore
            width: 122PX;
            // prettier-ignore
            height: 122PX;
          }
          div {
            // prettier-ignore
            margin-top: 13PX;
            font-size: @font16;
            color: #909399;
          }
        }
        .video-play {
          // prettier-ignore
          width: 350PX;
          // prettier-ignore
          height: 198PX;
          position: relative;
          // prettier-ignore
          border-radius: 6PX;
          overflow: hidden;
          .remove-video {
            position: absolute;
            right: 0;
            top: 0;
            // prettier-ignore
            width: 68PX;
            // prettier-ignore
            height: 30PX;
            background: rgba(0, 0, 0, 0.36);
            // prettier-ignore
            border-radius: 0px 0px 0px 6PX;
            font-size: @font14;
            // prettier-ignore
            line-height: 30PX;
            text-align: center;
            color: #fff;
            cursor: pointer;
          }
          video {
            width: 100%;
            height: 100%;
            outline: none;
          }
        }
      }
    }
    .tips {
      align-self: flex-start;
      background: #ffff;
      // prettier-ignore
      border-radius: 8PX;
      // prettier-ignore
      padding: 24PX 16PX 19PX 16PX;
      // prettier-ignore
      margin-left: 16PX;
      .head-img {
        // prettier-ignore
        width: 24PX;
        // prettier-ignore
        height: 24PX;
        // prettier-ignore
        margin-bottom: 13PX;
      }
      h3 {
        font-weight: bold;
        color: #303133;
        font-size: @font16;
      }
      p {
        color: #606266;
        line-height: @font21;
        font-size: @font14;
        // prettier-ignore
        margin-top: 8PX;
        &:first-of-type {
          // prettier-ignore
          margin-bottom: 24PX;
        }
      }
    }
  }
}
</style>
<template>
  <div
    class="page-cell-addHouse"
    v-loading="loading"
    element-loading-text="我在去获取数据的路上了~"
  >
    <div class="cell">
      <div class="content">
        <!-- 头部 -->
        <div class="content-head">
          <div class="head-title">添加照片 ({{ isMaxImageLength }}/12)</div>
          <div class="head-add" @click="openAddImagePop">添加新照片</div>
        </div>
        <!-- 图片类型 -->
        <div class="image-type-content">
          <div
            class="image-type-item"
            :class="{ active: activeImageType == index }"
            v-for="(item, index) in imageType"
            :key="index"
            @click="setImageTypeIndex(index)"
          >
            {{ item.title }}({{ sectionContent[item.targetArray].length }})
          </div>
        </div>
        <!-- 拖拽 -->
        <!-- 
            拖拽组件实现流程说明 打开下方链接查看
https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/13/e719b8118de94879898d87c06aefe9a5.jpg

         -->
        <drag-content
          @spliceOnce="spliceOnce"
          ref="dragContent"
          :multi-arr.sync="multiSelectMove"
          :current-type="activeImageType"
        >
          <image-content
            :cover-data-id.sync="coverDataId"
            @isEmptyList="isEmptyList"
            @restoreImageType="restoreImageType"
            :title="imageType[activeImageType].title"
            :current-array="
              sectionContent[imageType[activeImageType].targetArray]
            "
          />
          <div class="layuout-drag">
            <drag-item
              v-for="(item, index) in originalImageList"
              :key="item.id"
              :drag-id="item.id"
              gap-style="margin-right: 24px;margin-bottom: 24px;"
              :drag-height="96"
              :drag-width="96"
              :gap="0.4"
              :drag-index="index"
            >
              <template v-slot:default="prop">
                <div
                  class="image-item"
                  :class="{ border: multiSelectMove.includes(item.id) }"
                  v-loading="item.rLoading"
                >
                  <div class="multi-posi" v-if="prop.isDrag">
                    选中{{ multiSelectMove.length }}张
                  </div>
                  <img :src="item.url" />
                  <label class="check-multi" @mousedown.stop="">
                    <input
                      type="checkbox"
                      v-model="multiSelectMove"
                      :value="item.id"
                    />
                    <span></span>
                  </label>
                  <div
                    class="remove-btn iconbianzu12 iconfont"
                    @click="originalImage(item, index)"
                  ></div>
                </div>
              </template>
            </drag-item>
          </div>
        </drag-content>
        <!-- 间距 -->
        <div class="split-line"></div>
        <!-- 视频 -->
        <div class="video-content">
          <h3 class="video-title">
            添加视频({{ !videoData.videoJson.url ? 0 : 1 }}/1)
          </h3>
          <div class="video-flex">
            <div class="video-show" v-show="!videoData.videoJson.url">
              <label class="upload-video">
                <span v-loading="videoData.videoLoading">选择视频</span>
                <input
                  ref="houseVideo"
                  type="file"
                  @change="getVideoFile"
                  accept="video/mp4"
                />
              </label>
            </div>
            <div class="video-qr" v-show="!videoData.videoJson.url">
              <img :src="socketPic.video" alt="视频上传二维码" />
              <div>微信扫码上传</div>
            </div>
            <div class="video-play" v-if="videoData.videoJson.url">
              <video :src="videoData.videoJson.url" controls="controls"></video>
              <div class="remove-video" @click="deleteVideo">删除</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tips">
        <img
          class="head-img"
          src="https://imgtest.0be.cn/FileUpload/SaleInterview2020/10/12/c594f348360348f0b455bdf623179d24.svg"
          alt=""
        />
        <h3>照片</h3>
        <p>
          请确保上传的照片大小在5M以内，图片尺寸为600 X 600px，图片格式为
          JPG、PNG、JPEG
        </p>
        <h3>视频</h3>
        <p>
          请确保上传的视频大小在100M以内，视频格式为 MP4
        </p>
        <!-- WMV、MOV、AVI -->
      </div>
    </div>
    <!-- 弹框提示 -->
    <validate-img-tips
      @stillSave="stillSave"
      v-if="imgTipsPop"
      :visible.sync="imgTipsPop"
    />

    <!-- 上传图片弹框 -->
    <add-image-pop
      :house-id="id"
      ref="addImagePop"
      :socket-image-list.sync="socketPicArr"
      :qr-img="socketPic.picture"
      :is-max-length="isMaxImageLength"
      :max-image-length="12"
      :visible.sync="addImagePopFlag"
      v-if="addImagePopFlag"
      @commitImage="commitImage"
      @removeSocketItem="deleteImg"
    />
    <!-- 操作提示框 -->
    <operation-model
      :posi-rect="headAddRect"
      :now-step="operationStep"
      :visible.sync="operationPopFlag"
      v-if="operationPopFlag"
      @setStep="setStep"
    />
  </div>
</template>
<script>
import util from "@/util/util";
import but from "@/evenBus/but.js";
import { LOGINDATA, SMALLThumb } from "@/util/constMap";
import dragContent from "@/components/drag/dragContent";
import imageContent from "@/components/drag/imageContent";
import dragItem from "@/components/drag/dragItem";
const imageType = [
  { targetArray: "outdoorImgList", title: "外景图", picClass: 1 },
  { targetArray: "livingRoomImgList", title: "客厅", picClass: 2 },
  { targetArray: "bedroomImgList", title: "卧室", picClass: 3 },
  { targetArray: "kitchenImgList", title: "厨房", picClass: 4 },
  { targetArray: "toiletImgList", title: "卫生间", picClass: 5 },
  { targetArray: "layoutImgList", title: "户型图", picClass: 6 }
];
const guid = (() => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
})();
export default {
  props: {
    getData: {
      type: Boolean,
      default: false
    },
    paramsObj: {
      type: Object,
      default: () => {}
    }
  },
  name: "exploration",
  components: {
    dragContent,
    imageContent,
    dragItem,
    operationModel: () => import("./operationModel"),
    addImagePop: () => import("./addImagePop"),
    validateImgTips: () => import("./validateImgTips")
  },
  computed: {
    /**
     * @example: 计算当前最大长度
     */

    isMaxImageLength() {
      //已经上传图片的长度
      const alreadyUploadLeng = Object.keys(this.sectionContent).reduce(
        (prevValue, currentItem, index) => {
          if (index == 1) {
            return (
              this.sectionContent[prevValue].length +
              this.sectionContent[currentItem].length
            );
          }
          return prevValue + this.sectionContent[currentItem].length;
        }
      );
      return (
        alreadyUploadLeng +
        this.originalImageList.length +
        this.socketPicArr.length
      );
    }
  },
  data() {
    return {
      operationStep: 0, //当前执行步骤
      headAddRect: {}, //headAdd元素定位
      operationPopFlag: false, //操作步驟提示框开关
      isHouseDetailOpen: false, //如果是房源详情打开将是true
      coverDataId: null, //封面图片ID
      isEditCoverDataIdOrd: null, //用于判断是否修改了封面ID 如果与coverDataId不同则更新封面ID
      id: this.$store.state.addHouse.formData.id,
      loading: false,
      socketPicArr: [], //socketImage
      socketPic: {
        picture: "",
        video: ""
      },
      imgTipsPop: false,
      isBreakSave: false, //是否仍然保存开关
      //video Msg
      videoData: {
        videoJson: {},
        videoLoading: false
      },
      comparison: {
        outdoorImgList: [], //外景图
        livingRoomImgList: [], //客厅
        bedroomImgList: [], //卧室
        kitchenImgList: [], //厨房
        toiletImgList: [], //卫生间
        layoutImgList: [] //户型图
      },
      multiSelectMove: [], //多选移动
      addImagePopFlag: false, //上传图片弹框开关
      originalImageList: [
        // {
        //   id: 631456,
        //   rLoading: false,
        //   url:
        //     "https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/11/8d1af145e13f43ae880dc4e0f25b0097.png"
        // },
        // {
        //   id: 631455,
        //   rLoading: false,
        //   url:
        //     "https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/11/8fdd7d97ba224e22b7b16b263e99712e.png"
        // },
        // {
        //   id: 631457,
        //   rLoading: false,
        //   url:
        //     "https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/11/2f76b4e16dc547a6b3e6590457b666be.png"
        // },
        // {
        //   id: 631513,
        //   rLoading: false,
        //   url:
        //     "https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/12/7c9c5181a1b94178aaa0f293407019e9.jpg"
        // },
        // {
        //   id: 631514,
        //   rLoading: false,
        //   url:
        //     "https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/12/07f10a93465c47d183b6b67766d3acb9.png"
        // },
        // {
        //   id: 631516,
        //   rLoading: false,
        //   url:
        //     "https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/12/73c0a4482ac3475daa7a10987cff6945.jpg"
        // },
        // {
        //   id: 631518,
        //   rLoading: false,
        //   url:
        //     "https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/12/433c5dfe0468452790596192431a1c8a.png"
        // },
        // {
        //   id: 631522,
        //   rLoading: false,
        //   url:
        //     "https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/12/9a2b9c73d3c94676ab2484f0a66a6fd2.jpg"
        // },
        // {
        //   id: 631521,
        //   rLoading: false,
        //   url:
        //     "https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/10/12/11d5c387196b43eda14c84306c49c82e.jpg"
        // }
      ], //还未归类的上传图片
      sectionContent: {
        outdoorImgList: [], //外景图
        livingRoomImgList: [], //客厅
        bedroomImgList: [], //卧室
        kitchenImgList: [], //厨房
        toiletImgList: [], //卫生间
        layoutImgList: [] //户型图
      },
      imageType: imageType,
      activeImageType: 0,
      SMALLThumb: SMALLThumb //小图
    };
  },
  created() {
    if (this.getData) {
      this.promiseAllViodeoAndImg();
    }
    this.isOperationPop();
    //接入聊天
    this.contactSocket();
  },
  methods: {
    /**
     * @example: 修改了步骤之后的回调
     */
    setStep(v) {
      if (v.done) {
        util.localStorageSet("isOperation", true);
      }
      this.operationPopFlag = v.visible;
      this.operationStep = v.next;
    },
    wiResize() {
      const { left, bottom, x, y, top, width } = document
        .querySelector(".head-add")
        .getBoundingClientRect();
      console.log(document.querySelector(".head-add").getBoundingClientRect());
      this.headAddRect = { left, bottom, x, y, top, width: width / 2 };
    },
    /**
     * @example: 判断是否浏览器有缓存有缓存,无缓存将打开操作步骤提示
     */
    isOperationPop() {
      this.$nextTick(() => {
        const isOperation = util.localStorageGet("isOperation");
        console.log(isOperation, "isOperation");
        if (!isOperation) {
          this.wiResize();
          this.operationStep = 0;
          this.operationPopFlag = true;

          window.addEventListener("resize", this.wiResize);
        }
      });
    },
    /**
     * @example: 如果当前激活类型数组是空,点击拖拽目标区域将直接打开弹框
     */
    isEmptyList() {
      if (
        this.sectionContent[this.imageType[this.activeImageType].targetArray]
          .length == 0
      ) {
        this.openAddImagePop();
      }
    },
    /**
     * @example: 查询图片和视频
     */
    promiseAllViodeoAndImg() {
      this.loading = true;
      Promise.all([this.getLoadDataImg(), this.getLoadDataVideo()])
        .catch(() => {
          this.$message.error("获取数据失败~");
        })
        .finally(() => {
          this.loading = false;
          this.wiResize();
        });
    },
    //获取上传的图片
    getLoadDataImg() {
      let url = this.paramsObj.getPicturesUrl + this.id;

      return this.$api.post({ url: url }).then(e => {
        let data = e.data;
        if (data.code == 200) {
          let imgList = data.data;
          imgList.forEach(item => {
            let type = item.picClass ? item.picClass : item.PicClass;
            //查找对应的封面ID
            if (item.id === item.coverPictureId) {
              this.coverDataId = item.coverPictureId;
              this.isEditCoverDataIdOrd = item.coverPictureId;
            }

            const imgList = [
              "outdoorImgList",
              "livingRoomImgList",
              "bedroomImgList",
              "kitchenImgList",
              "toiletImgList",
              "layoutImgList"
            ];
            if (imgList[type - 1]) {
              this.sectionContent[imgList[type - 1]].push({
                ...item,
                loading: false,
                rLoading: false
              });
            } else {
              this.originalImageList.push({ ...item, rLoading: false });
            }
          });
          //保存图片数组
          Object.keys(this.comparison).forEach(item => {
            this.comparison[item] = JSON.parse(
              JSON.stringify(this.sectionContent[item])
            );
          });
        }
      });
    },
    /**
     * @example: 获取上传视频
     */
    getLoadDataVideo() {
      this.videoData.videoLoading = true;
      let url = this.paramsObj.getVideoUrl + this.id;
      this.$api
        .post({ url: url })
        .then(e => {
          if (e.data.code == 200 && e.data.data.length > 0) {
            this.videoData.videoJson = e.data.data[0];
          }
        })
        .catch(() => {
          this.$message.error("获取数据失败~");
        })
        .finally(() => {
          this.videoData.videoLoading = false;
        });
    },
    /**
     * @example: 获取小程序上传二维码
     * @param {string} resourceType
     */
    getQrCode2(resourceType) {
      this.$api
        .post({
          url: "/scanUpload/getUploadQrCode",
          data: {
            remark: resourceType == "picture" ? "上传图片" : "上传视频",
            businessType: 0,
            webSocketUser: guid,
            resourceType: resourceType // "picture" || "video"
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(({ data }) => {
          console.log(resourceType, "resourceType", data.data.url);
          if (data.code == 200) {
            this.socketPic[resourceType] = data.data.url;
          }
        })
        .catch(e => {
          console.log(e, "查询二维码失败");
        });
    },
    /**
     * @example: 链接webSocket
     */
    contactSocket() {
      console.log("用户【" + guid + "】开始接入");
      this.socketApi.initWebSocket(
        this.$api.baseUrl().replace("http", ""),
        guid,
        () => {
          ["picture", "vedio"].forEach(key => {
            this.getQrCode2(key);
          });
        }
      );
      this.socketApi.initReceiveMessageCallBack(this.receiveMessagePic);
    },
    /**
     * @example: socket回调 需要弹框打开才会填入socket数组
     */
    receiveMessagePic(r) {
      if (
        r.content.resourceType == "video" &&
        Object.keys(this.videoData.videoJson).length == 0
      ) {
        this.uploadFileInfo(r.content.picUrl, "videoDraft");
      } else if (r.content.resourceType == "picture" && this.addImagePopFlag) {
        this.$nextTick(() => {
          const v =
            this.$refs.addImagePop.temporaryFile.length + this.isMaxImageLength;
          if (v + 1 <= 12) {
            this.uploadFileInfo(r.content.picUrl, "pictureDraft");
          } else {
            this.$message.warning(
              `您当前选择的房源图片数已超过最大张数12张，请重新选择后上传！`
            );
          }
        });
      }
    },
    /**
     * @example: 更新socket图片ID
     */
    uploadFileInfo(url, suffix) {
      this.$api
        .post({
          url: `/verifyHouse/${suffix}`,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            IpStr: url,
            Eid: this.id
          }
        })
        .then(json => {
          if (json.data.code == 200) {
            if (suffix == "pictureDraft") {
              this.socketPicArr.push({
                ...json.data.data,
                url,
                rLoading: false
              });
            } else if (suffix == "videoDraft") {
              json.url = url;
              json.id = json.data.data.id;
              this.videoData.videoJson = json;
            }
          } else {
            this.$message({
              message: json.data.message,
              type: "warning"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: e.message,
            type: "warning"
          });
        })
        .finally(() => {});
    },
    /**
     * @example: 执行父级下一步方法并且将isBreakSave修改为true
     * 在父级nextPage再次将此变量修改为false 防止失败直接下一步
     */
    stillSave() {
      this.isBreakSave = true;
      if (!this.isHouseDetailOpen) {
        this.$parent.nextPage(this.$options.name);
      } else {
        this.updateCover();
        this.$parent.close();
        this.$emit("reLoadPage");
      }
    },
    /**
     * @example: 将有状态图片设置为无状态
     */
    restoreImageType(item, index) {
      let activeType = this.imageType[this.activeImageType];
      let activeArr = this.sectionContent[activeType.targetArray];
      let spliceItem = activeArr.splice(index, 1);
      spliceItem[0].rLoading = true;
      let splicePushIndex = this.originalImageList.push(spliceItem[0]);
      this.updateImageType(spliceItem[0], null)
        .then(v => {
          // this.$message.success(v.data.message);

          spliceItem[0].rLoading = false;
        })
        .catch(e => {
          this.$message.error(e.data.message);
          activeArr.push(
            ...this.originalImageList.splice(splicePushIndex - 1, 1)
          );
        });
    },
    /**
     * @example: 删除originalImageList的元素
     */
    originalImage(item, index) {
      this.deleteImg(item, index).then(() => {
        this.$refs.dragContent.emitChildInitXY();
      });
    },
    /**
     * @example: 打开上传图片0弹框
     */
    openAddImagePop() {
      this.addImagePopFlag = true;
    },
    /**
     * @example: 无状态图片弹框上传回调
     */
    commitImage(v) {
      this.originalImageList = [...this.originalImageList, ...v];
      const isOperation = util.localStorageGet("isOperation");
      if (!isOperation) {
        this.$nextTick(() => {
          this.setStep({
            done: false,
            visible: true,
            next: 1
          });
        });
      }
    },
    /**
     * @example: 触发成功之后删除originalImageList对应的数组元素
     * 并且执行done通知还未被移除元素重新获取新的坐标
     */
    spliceOnce({ index, id, done, recall }) {
      let fix = this.originalImageList.findIndex((t, i) => t.id == id);
      //获取当前激活
      let active = this.imageType[this.activeImageType];
      //获取激活数组
      let activeSectionArr = this.sectionContent[active.targetArray];
      //查找当前数组元素
      let spliceItem = this.originalImageList.splice(fix, 1);

      //获取激活数组添加返回新长度同等Index
      let pushIndex = activeSectionArr.push({
        ...spliceItem[0],
        loading: true
      });

      this.updateImageType(spliceItem[0], active.picClass)
        .then(v => {
          //   this.$message.success(v.data.message);

          activeSectionArr[pushIndex - 1].loading = false;

          done();
        })
        .catch(e => {
          this.$message.error(e.data.message);

          this.originalImageList.push(
            ...activeSectionArr.splice(pushIndex - 1, 1)
          );
          //  recall();
        })
        .finally(() => {
          this.$nextTick(() => {
            done();
          });
        });
    },
    /**
     * @example: 修改图片类型
     */
    updateImageType(item, pic) {
      return this.$api.post({
        url: `/agentHouse/pictures/updatePicClass`,
        data: {
          id: item.id,
          picClass: pic
        },
        headers: { "Content-Type": "application/json" }
      });
    },
    /**
     * @example: 修改图片激活类型
     */
    setImageTypeIndex(index) {
      this.activeImageType = index;
    },
    /**
     * @example: 传视频
     */
    getVideoFile(e) {
      let file = e.target.files[0];
      const isLt100M = file.size / 1024 / 1024 < 100;

      if (!isLt100M) {
        this.$message.warning("视频大小需小于100M");
        return;
      }
      this.videoData.videoLoading = true;
      let formData = new FormData();
      formData.append("file", file);
      //修改
      if (this.id) {
        formData.append("Eid", this.id);
      }
      return this.$api
        .post({
          url: `/verifyHouse/video`,
          headers: { "Content-Type": "multipart/form-data" },
          data: formData
        })
        .then(json => {
          if (json.data.code == 200) {
            this.videoData.videoJson = json.data.data;
          }
          this.$message.success(json.data.message);
        })
        .catch(e => {
          this.$message({
            message: e.message,
            type: "warning"
          });
        })
        .finally(() => {
          this.videoData.videoLoading = false;
        });
    },
    /**
     * @example: 删除无类型图片
     */

    deleteImg(item, index, spliceArr = "originalImageList") {
      return this.$api
        .delete({
          url: `/verifyHouse/picture/${item.id}`,
          data: {
            url: item.url
          },
          qs: true
        })
        .then(e => {
          if (e.data.code == 200) {
            this[spliceArr].splice(index, 1);
          }
        });
    },
    /**
     * @example: 删除视频
     */
    deleteVideo(item) {
      this.$api
        .delete({
          url: `/verifyHouse/video/${this.videoData.videoJson.id}`,
          data: {
            url: this.videoData.videoJson.url
          },
          qs: true
        })
        .then(e => {
          if (e.data.code == 200) {
            this.videoData.videoJson = {};
            this.$refs.houseVideo.value = null;
          }
          this.$message.success(e.data.message);
        });
    },
    /**
     * @example: 验证是否有为归类图片
     */
    validatePop() {
      return new Promise((r, s) => {
        if (this.originalImageList.length != 0 && !this.isBreakSave) {
          this.imgTipsPop = true;
          r(false);
        } else {
          this.updateCover();
          if (!this.isHouseDetailOpen) {
            //提交数据到store
            Object.keys(this.sectionContent).forEach(key => {
              this.$store.commit("updateFile", {
                [key]: this.sectionContent[key]
              });
            });
            //提交封面图片ID
            this.$store.commit("updateFile", {
              coverPictureId: this.coverDataId
            });
            //提交无状态
            this.$store.commit("updateFile", {
              originalImageList: this.originalImageList
            });
            //提交视频
            this.$store.commit("updateFile", {
              houseVideo: this.videoData.videoJson
            });
          }
          r(true);
        }
      });
    },
    /**
     * @example: 更新封面ID
     */

    updateCover() {
      if (
        this.coverDataId !== null &&
        this.coverDataId !== this.isEditCoverDataIdOrd
      ) {
        this.$api.post({
          url: "/agentHouse/pictures/updateCover",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            houseId: this.id,
            coverPictureId: this.coverDataId
          }
        });
      }
    },
    edit() {
      let sendData = {
        id: this.id
      };
      let url = "/verifyHouse";
      let change = false;
      Object.keys(this.comparison).forEach(key => {
        if (this.sectionContent[key].length != this.comparison[key].length) {
          change = true;
        } else {
          this.sectionContent[key].forEach(item => {
            let result = this.comparison[key].filter(
              filter => filter.url == item.url
            );
            if (result.length == 0) {
              change = true;
            }
          });
        }
      });
      if (!change) {
        return true;
      }
      url = this.paramsObj.editUrl;
      sendData.saleHouseUpdateRecordList = [];
      sendData.saleHouseUpdateRecordList.push({
        houseId: this.id,
        updateFiled: "修改图片",
        oldValue: "暂无",
        newValue: "暂无"
      });

      // 编辑
      return this.$api.put({
        url: url,
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        data: sendData
      });
    },
    validateAll() {
      return this.validatePop();
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.wiResize);
    if (this.paramsObj.editUrl) {
      this.edit();
    }
  }
};
</script>
