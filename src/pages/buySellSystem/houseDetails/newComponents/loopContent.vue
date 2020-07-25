<style lang="less" scoped>
@width: 225px * @base;
@height: 168px * @base;
.loop-warp {
  width: @width;
  height: @height;
  position: relative;
  .loop-warp-static {
    width: 100%;
    height: 100%;
    .is-now-image {
      width: 100%;
      height: 100%;
    }
  }
  .loop-warp-abso {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    // prettier-ignore
    padding: 5PX 0;
    display: flex;
    background: #91918e;
    border-radius: 20px;
    &::after {
      content: "";
      position: absolute;
      width: 33.33%;
      height: 100%;
      border-radius: 20px;
      background: #5a5a57;
      top: 0;
      transition: 0.3s ease-out;
    }
    &.loop-warp-abso3 {
      &::after {
        width: 33.33%;
      }
    }
    &.loop-warp-abso2 {
      &::after {
        width: 50%;
      }
    }
    &.abso-move0 {
      &::after {
        transform: translateX(0);
      }
    }
    &.abso-move1 {
      &::after {
        transform: translateX(100%);
      }
    }
    &.abso-move2 {
      &::after {
        transform: translateX(200%);
      }
    }
    .warp-abso-item {
      // prettier-ignore
      width:50PX;
      text-align: center;
      font-size: @font12;
      color: #fff;
      position: relative;
      z-index: 10;
      cursor: pointer;
    }
  }
}
.scroll-warp {
  position: relative;
  .scroll-content-left,
  .scroll-content-right {
    position: absolute;
    height: 100%;
    width: 11px * @base;
    border: 0;
    background: #ababab;
    padding: 0;
    // prettier-ignore
    color: #fff;
    cursor: pointer;
    outline: none;
    &[disabled="disabled"] {
      background: #f2f2f2;
      cursor: not-allowed;
    }
  }
  .scroll-content-left {
    left: 0;
    // prettier-ignore
    left: -5PX;
    transform: translateX(-100%);
  }
  .scroll-content-right {
    right: 0;
    // prettier-ignore
    right: -5PX;
    transform: translateX(100%);
  }

  .loop-scroll-content {
    margin-top: 5px * @base;
    width: @width;
    height: 52px * @base;
    display: flex;
    overflow: hidden;
    .loop-scroll-move {
      flex: 1;
      width: 0;
      display: flex;
      height: 100%;
      transition: transform 0.4s ease-in;
      transform: translateX(0);
      .scroll-move-item {
        flex-shrink: 0;
        width: 70px * @base;
        height: 100%;
        cursor: pointer;
      }
      :nth-child(2n) {
        margin: 0 7.5px * @base;
      }
    }
  }
}
</style>
<template>
  <div>
    <section class="loop-warp">
      <div class="loop-warp-static">
        <el-video
          v-if="!loopActiveFlag"
          :src="houseData.saleUploadVideoDtoList[0].videoUrl"
        />
        <el-image
          v-if="loopActiveFlag"
          class="is-now-image"
          :src="loopActiveShowData.picUrl"
        ></el-image>
      </div>
      <div
        class="loop-warp-abso"
        :class="[
          'abso-move' + loopTypeActive,
          'loop-warp-abso' + loopType.length
        ]"
      >
        <span
          @click="handelLoopActive(index)"
          class="warp-abso-item"
          v-for="(item, index) in loopType"
          :key="item.type"
          >{{ item.title }}</span
        >
      </div>
    </section>
    <section class="scroll-warp">
      <section class="loop-scroll-content" ref="itemOver">
        <button
          :disabled="leftBtnDisable"
          class="scroll-content-left"
          @click="scrollMove('left')"
          v-if="scrollBar"
        >
          <i class="iconicon- iconfont"></i>
        </button>
        <button
          :disabled="rightBtnDisable"
          class="scroll-content-right"
          @click="scrollMove('right')"
          v-if="scrollBar"
        >
          <i class="icondibudaohanglan- iconfont"></i>
        </button>
        <div class="loop-scroll-move" :style="moveX">
          <el-image
            @click.native="setActiveImg(index)"
            v-for="(item, index) in mergeHouseImage"
            :key="index"
            class="scroll-move-item"
            :src="item.smallPicUrl"
          />
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/src/utils/resize-event";
import { mapState } from "vuex";
import { SMALLThumb } from "@/util/constMap";

function fittArrayList() {
  let img =
    "https://imgtest.0be.cn/FileUpload/PicFile_AHouseF2020/3/26/9b122fa0df5946058c5a254fae9b3bfc.png";
  return Array.from({ length: 7 }).fill({
    picUrl: img,
    smallPicUrl: img + SMALLThumb
  });
}

export default {
  components: {
    elVideo: () => import("@/components/elVideo")
  },
  data() {
    return {
      activeIndex: 0, //当前点击的激活下标
      //activeData: {}, //当前用于显示的对象 , 视频 或者 图片
      // loopType: LOOPTYPE,
      loopTypeActive: 0, //Type激活index
      translateX: 0,
      renderX: 0,
      scrollBar: false, //按钮显示开关
      leftBtnDisable: false, //左边按钮禁用开关
      rightBtnDisable: false //右边按钮禁用开关
    };
  },
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      houseData: state => state.houseDateil.houseData
    }),
    moveX() {
      return `transform: translateX(${this.renderX}px)`;
    },
    //图片添加缩略
    ImageAddSMALLThumb() {
      //如果没有图片使用默认填充
      if (this.houseData.saleUploadPicDtoList.length == 0) {
        return fittArrayList();
      }
      return this.houseData.saleUploadPicDtoList.map(item => {
        return { ...item, smallPicUrl: item.picUrl + SMALLThumb };
      });
    },
    //根据loopTypeActive显示对应的轮播图片数组
    mergeHouseImage() {
      let imageList = [];
      if (this.houseData.saleUploadPicDtoList.length == 0) {
        imageList = this.ImageAddSMALLThumb;
      } else {
        switch (this.loopType[this.loopTypeActive].type) {
          case 2:
            imageList = this.ImageAddSMALLThumb.filter(
              item => item.PicClass == 6
            );
            console.log(imageList, "imageList");
            if (imageList.length == 0) return fittArrayList();
            break;
          default:
            imageList = this.ImageAddSMALLThumb;
        }
      }
      this.$nextTick(() => {
        this.initScroll();
      });
      return imageList;
    },
    //首屏显示类型判断
    loopActiveFlag() {
      return (
        this.loopType[this.loopTypeActive].type == 1 ||
        this.loopType[this.loopTypeActive].type == 2
      );
    },
    //返回当前激活的图片对象数据
    loopActiveShowData() {
      return this.mergeHouseImage[this.activeIndex];
    },
    loopType() {
      if (this.houseData.saleUploadVideoDtoList.length == 0) {
        return [
          { title: "图片", type: 1 },
          { title: "户型图", type: 2 }
        ];
      }
      return [
        { title: "视频", type: 0 },
        { title: "图片", type: 1 },
        { title: "户型图", type: 2 }
      ];
    }
  },
  mounted() {
    addResizeListener(this.$refs.itemOver, this.update);
  },
  destroyed() {
    removeResizeListener(this.$refs.itemOver, this.update);
  },
  methods: {
    /**
     * @example: 设置
     * @param {type}
     */
    setActiveImg(index) {
      this.activeIndex = index;
    },
    /**
     * @example: 当前轮播图类型激活Index设置
     * @param {number} index
     */
    handelLoopActive(index) {
      //切换类型的时候先把激活ID重置为0
      this.setActiveImg(0);
      this.loopTypeActive = index;
    },
    /**
     * @example: 判断是否需要显示左右切换按钮
     */
    update() {
      let listFor = this.$refs.itemOver;
      if (listFor)
        if (listFor.clientWidth < listFor.scrollWidth) {
          this.scrollBar = true;
        } else {
          this.scrollBar = false;
        }
    },
    /**
     * @example: 初始化Scroll
     */
    initScroll() {
      let listFor = this.$refs.itemOver;
      let scrollWidth = listFor.querySelector(".loop-scroll-move").scrollWidth;
      this.leftBtnDisable = true;
      this.translateX = 0;
      this.renderX = 0;
      if (this.translateX + listFor.clientWidth < scrollWidth) {
        this.rightBtnDisable = false;
      } else {
        this.rightBtnDisable = true;
      }
    },
    /**
     * @example: 切换方向
     * @param {string} direction
     */
    scrollMove(direction) {
      if (!this.scrollBar) {
        return;
      }
      let listFor = this.$refs.itemOver;
      let scrollWidth =
        listFor.querySelector(".loop-scroll-move").scrollWidth -
        listFor.clientWidth;
      switch (direction) {
        case "left":
          if (this.translateX - listFor.clientWidth > 0) {
            this.translateX -= listFor.clientWidth;
            this.leftBtnDisable = false;
          } else {
            this.translateX = 0;
            this.leftBtnDisable = true;
          }
          this.rightBtnDisable = false;
          break;
        case "right":
          if (this.translateX + listFor.clientWidth < scrollWidth) {
            this.translateX += listFor.clientWidth;
            this.rightBtnDisable = false;
          } else {
            this.translateX += scrollWidth - this.translateX;
            this.rightBtnDisable = true;
          }
          this.leftBtnDisable = false;
          break;
      }

      this.renderX = -this.translateX;
    }
  }
};
</script>
