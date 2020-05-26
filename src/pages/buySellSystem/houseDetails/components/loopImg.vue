<style lang="less" scoped>
.loog-body {
  height: 411px;
  margin-bottom: 8px;
  position: relative;
  &:after {
    content: attr(data-validate);
    background: #0d824b;
    color: #fff;
    font-size: 20px;
    right: 0;
    top: 0;
    border-radius: 4px;
    padding: 0px 8px;
    height: 26px;
    line-height: 26px;
    position: absolute;
  }

  .loop-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.img-list {
  position: relative;
  &.scrolPad {
    padding: 0 20px;
  }
  .item-img-for {
    overflow: hidden;
    &.scrollActive {
      .loop-item:nth-child(1) {
        margin-left: 8px !important;
      }
    }
    .img-scroll-translateX {
      transition: transform 0.3s ease-in;
      font-size: 0;
      white-space: nowrap;
      display: inline-block;
      .loop-item {
        display: inline-block;
        margin-left: 8px;
        width: 147px;
        height: 91px;
        cursor: pointer;
        vertical-align: baseline;
        &:first-child {
          margin-left: 0px;
        }
      }
    }
  }
  .item-img-prev,
  .item-img-next {
    background: #585858;
    color: #fff;
    height: 100%;
    position: absolute;
    top: 0;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    z-index: 10;
    cursor: pointer;
    &.item-img-prev {
      left: 0;
    }
    &.item-img-next {
      right: 0;
    }
  }
}
</style>
<template>
  <div>
    <section
      class="loog-body"
      :data-validate="resultData.validateText || '验真通过'"
    >
      <!-- 图片 -->
      <template v-if="loopBig.typeStr == 'picUrl'">
        <el-image
          class="loop-item"
          :src="loopBig.src + '?x-oss-process=style/bigthumb'"
          :preview-src-list="previewList()"
          fit="cover"
        >
          <div slot="placeholder" class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
      </template>
      <!-- 不存在 -->
      <template v-if="!loopBig.typeStr">
        <el-image class="loop-item" :src="'' | defaultImg" fit="cover">
          <div slot="placeholder" class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
      </template>
      <!-- 音频 -->
      <!--      <template v-if="loopBig.typeStr == 'picUrl' && resultData.saleUploadAudioList">-->
      <template v-if="resultData.saleUploadAudioList">
        <el-audio
          fixed
          v-if="resultData.saleUploadAudioList.length > 0"
          :url="resultData.saleUploadAudioList[0].url"
        >
          经纪人讲房
        </el-audio>
      </template>
      <!-- 视频 -->
      <template v-if="loopBig.typeStr == 'videoUrl'">
        <el-video :src="loopBig.src"></el-video>
      </template>
      <!-- 对赌倒计时 -->
      <elCountDown :endTime="betExpire" v-if="betExpire"></elCountDown>
    </section>
    <section class="img-list" :class="{ scrolPad: scrollBar }">
      <div
        class="
        anchor-point
             item-img-prev
             el-icon-arrow-left"
        v-if="scrollBar"
        data-anchor="房源详情轮播图left => click"
        @click="scrollMove('left')"
      ></div>
      <div
        class="item-img-next el-icon-arrow-right anchor-point"
        v-if="scrollBar"
        data-anchor="房源详情轮播图right => click"
        @click="scrollMove('right')"
      ></div>
      <div
        :class="['item-img-for', { scrollActive: scrollBar }]"
        ref="itemOver"
      >
        <div class="img-scroll-translateX" :style="moveX">
          <template v-for="(item, index) in loopList">
            <!-- 循环图片 -->
            <template v-if="item.picUrl">
              <img
                :src="item.picUrl + '?x-oss-process=style/thumb'"
                data-anchor="房源详情轮播图图片 => click"
                @click.stop="changeLoop(item)"
                :key="index"
                alt=""
                class="loop-item anchor-point"
              />
            </template>
            <!-- 视频 -->
            <template v-if="item.videoUrl">
              <video
                data-anchor="房源详情轮播图视频 => click"
                @click="changeLoop(item)"
                class="loop-item anchor-point"
                :src="item.videoUrl"
                :key="item.id"
              ></video>
            </template>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/src/utils/resize-event";
import elVideo from "@/components/elVideo";
import elAudio from "@/components/audio";
import elCountDown from "@/components/countDown";
import but from "@/evenBus/but.js";
export default {
  inject: ["houseDetails"],
  components: {
    elVideo,
    elAudio,
    elCountDown
  },
  created() {
    but.$on("betExpire", value => {
      this.betExpire = value;
    });
  },
  mounted() {
    addResizeListener(this.$refs.itemOver, this.update);
  },
  destroyed() {
    removeResizeListener(this.$refs.itemOver, this.update);
    but.$off("betExpire");
  },
  computed: {
    moveX() {
      return `transform: translateX(${this.renderX}px)`;
    },
    resultData() {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data;
      } else {
        return {};
      }
    },
    //轮播
    loopList() {
      if (Object.keys(this.houseDetails).length > 0) {
        let saleUploadPicDtoList = this.resultData.saleUploadPicDtoList
          ? this.resultData.saleUploadPicDtoList
          : [];
        let saleUploadVideoDtoList = this.resultData.saleUploadVideoDtoList
          ? this.resultData.saleUploadVideoDtoList
          : [];
        let resultList = [...saleUploadVideoDtoList, ...saleUploadPicDtoList];
        if (!resultList[0]) {
          //设置默认的itemImg
          resultList = Array.from({ length: 7 }).fill({
            typeStr: "picUrl",
            picUrl:
              "https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/9b122fa0df5946058c5a254fae9b3bfc.png",
            default: true
          });
        } else {
          this.changeLoop(resultList[0]);
        }
        return resultList;
      }
      return [];
    }
  },
  data() {
    return {
      loopBig: {},
      scrollBar: true,
      translateX: 0,
      renderX: "0",
      betExpire: "" //对赌结束时间
    };
  },
  methods: {
    update() {
      let listFor = this.$refs.itemOver;
      if (listFor)
        if (listFor.clientWidth < listFor.scrollWidth) {
          this.scrollBar = true;
        } else {
          this.scrollBar = false;
        }
    },
    scrollMove(direction) {
      if (!this.scrollBar) {
        return;
      }
      let listFor = this.$refs.itemOver;
      let scrollWidth =
        listFor.querySelector(".img-scroll-translateX").scrollWidth -
        listFor.clientWidth;
      switch (direction) {
        case "left":
          if (this.translateX - listFor.clientWidth > 0) {
            this.translateX -= listFor.clientWidth;
          } else {
            this.translateX = 0;
          }
          break;
        case "right":
          if (this.translateX + listFor.clientWidth < scrollWidth) {
            this.translateX += listFor.clientWidth;
          } else {
            this.translateX += scrollWidth - this.translateX;
          }
          break;
      }

      this.renderX = -this.translateX;
    },
    //预览大图
    previewList() {
      if (this.resultData.saleUploadPicDtoList) {
        return this.resultData.saleUploadPicDtoList.map(item => {
          return item.picUrl + "?x-oss-process=style/bigthumb";
        });
      }
      return [];
    },
    changeLoop(item) {
      if (item.default) {
        return;
      }
      if ("picUrl" in item) {
        this.$set(this.loopBig, "typeStr", "picUrl");
        this.$set(this.loopBig, "src", item.picUrl);
      } else if ("videoUrl" in item) {
        this.$set(this.loopBig, "typeStr", "videoUrl");
        this.$set(this.loopBig, "src", item.videoUrl);
      }
    }
  }
};
</script>
