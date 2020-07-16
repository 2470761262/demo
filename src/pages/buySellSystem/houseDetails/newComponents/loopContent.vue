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
        <el-image
          class="is-now-image"
          src="http://www.xmfczc.com/images/wx/index_banner.png"
        ></el-image>
      </div>
      <div class="loop-warp-abso" :class="'abso-move' + loopTypeActive">
        <span
          @click="handelLoopActive(index)"
          class="warp-abso-item"
          v-for="(item, index) in loopType"
          :key="item"
          >{{ item }}</span
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
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426/file_20190426090208760_35409.jpg?x-oss-process=style/thumb"
          />
          <el-image
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426/file_20190426090210522_35409.jpg?x-oss-process=style/thumb"
          />
          <el-image
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426/file_20190426090212132_35409.jpg?x-oss-process=style/thumb"
          />
          <el-image
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426/file_20190426090213797_35409.jpg?x-oss-process=style/thumb"
          />
          <el-image
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426/file_20190426090227707_35409.jpg?x-oss-process=style/thumb"
          />
          <el-image
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426/file_20190426090210522_35409.jpg?x-oss-process=style/thumb"
          />
          <el-image
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426_1/file_20190426095207029_35409.jpg?x-oss-process=style/thumb"
          />
          <el-image
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426_1/file_20190426095209106_35409.jpg?x-oss-process=style/thumb"
          />
          <el-image
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426_1/file_20190426095207029_35409.jpg?x-oss-process=style/thumb"
          />
          <el-image
            class="scroll-move-item"
            src="http://img.0be.cn/FileUpload/PicFile_Agent2019/PicFile_Agent201904/20190426_1/file_20190426095209106_35409.jpg?x-oss-process=style/thumb"
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
const LOOPTYPE = ["视频", "图片", "户型图"];
export default {
  data() {
    return {
      loopType: LOOPTYPE,
      loopTypeActive: 0, //Type激活index
      translateX: 0,
      renderX: 0,
      scrollBar: false, //按钮显示开关
      leftBtnDisable: false, //左边按钮禁用开关
      rightBtnDisable: false //右边按钮禁用开关
    };
  },
  computed: {
    moveX() {
      return `transform: translateX(${this.renderX}px)`;
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
     * @example: 当前轮播图类型激活Index设置
     * @param {number} index
     */
    handelLoopActive(index) {
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
