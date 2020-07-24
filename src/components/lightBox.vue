<style lang="less" scoped>
.ls-light-content {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 1900;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  .light-direction-btn {
    position: absolute;
    // prettier-ignore
    font-size: 100PX;
    color: #fff;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    z-index: 10;
    &.left {
      // prettier-ignore
      left: 40PX;
    }
    &.right {
      // prettier-ignore
      right: 40PX;
    }
    &.top {
      // prettier-ignore
      top: 60PX;
      // prettier-ignore
      font-size: 50PX;
    }
  }
  .light-body {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .light-iamge-content {
      position: relative;

      .light-body-title {
        position: absolute;
        // prettier-ignore
        top: 5PX;
        left: 0;
        color: #fff;
        font-size: @font24;
        // prettier-ignore
        text-indent: 20PX;
      }
      .light-body-foot {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: @font18;
        // prettier-ignore
        padding: 10PX 20PX;
        div {
          position: relative;
          z-index: 10;
          color: #fff;
        }
        &::after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.4);
          // prettier-ignore
          filter: blur(2PX);
        }
      }
      img {
        max-width: 100vw;
        max-height: 100vh;
      }
    }
  }
}
</style>
<template>
  <div class="ls-light-content">
    <button class="light-direction-btn left" @click="setDirection('left')">
      <i class="el-icon-arrow-left"></i>
    </button>
    <button class="light-direction-btn right" @click="setDirection('right')">
      <i class="el-icon-arrow-right"></i>
    </button>
    <button class="light-direction-btn top right" @click="closeLight">
      <i class="el-icon-circle-close"></i>
    </button>
    <div class="light-body">
      <div class="light-iamge-content">
        <div class="light-body-title">
          {{ activeData.titleTypeName }} {{ activeIndex + 1 }}/{{
            activeData.ImageList.length
          }}
        </div>
        <div class="light-body-foot">
          <div>上传人：{{ activeData.ImageList[activeIndex].addPerName }}</div>
          <div>上传时间：{{ activeData.ImageList[activeIndex].addTime }}</div>
        </div>
        <img
          :src="activeData.ImageList[activeIndex].picUrl | defaultImg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeData: {
      type: Object
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    closeLight() {
      this.$emit("input", false);
    },
    setDirection(direction) {
      switch (direction) {
        case "left":
          this.activeIndex =
            this.activeIndex == 0
              ? this.activeData.ImageList.length - 1
              : --this.activeIndex;
          break;
        default:
          this.activeIndex =
            this.activeIndex == this.activeData.ImageList.length - 1
              ? 0
              : ++this.activeIndex;
      }
    }
  }
};
</script>
