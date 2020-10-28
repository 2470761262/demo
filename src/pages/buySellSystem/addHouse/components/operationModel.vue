<style lang="less" scoped>
.content {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  left: 0;
  .content-back {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.28);
  }
  .offset-content {
    position: absolute;
    height: 100%;
    right: 0;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    .content-body {
      position: absolute;
      background: #ffffff;
      // prettier-ignore
      border-radius: 4PX;
      // prettier-ignore
      padding: 17PX 10PX 10PX 17PX;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      // prettier-ignore
      width: 257PX;
      // prettier-ignore
      height: 102PX;
      transform: translateX(-50%);
      &.next-1 {
        // prettier-ignore
        width: 443PX;
        // prettier-ignore
        height: 162PX;
        background: #ffffff;
        // prettier-ignore
        border-radius: 4PX;
        // prettier-ignore
        padding: 16PX 12PX 16PX 16PX;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        transform: translateX(0);
        .next-1-left {
          // prettier-ignore
          width: 166PX;
          // prettier-ignore
          height: 120PX;
          // prettier-ignore
          border-radius: 4PX;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
            // prettier-ignore
            border-radius: 4PX;
          }
        }
        .next-1-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          // prettier-ignore
          margin-left: 19PX;
          .next-title {
            font-size: @font16;
            color: #303133;
          }
          .next-text {
            flex: 1;
            font-size: @font12;
            color: #606266;
            // prettier-ignore
            margin: 15PX 0 22PX;
          }
          .next-btn {
            display: flex;
            justify-content: flex-end;
            div {
              color: @backgroud;
              font-size: @font12;
              cursor: pointer;
              &:last-child {
                // prettier-ignore
                margin-left: 19PX;
              }
            }
          }
        }
      }
      .triangle {
        // prettier-ignore
        width: 12PX;
        // prettier-ignore
        height: 12PX;
        background: #fff;
        transform: rotateZ(45deg) translate(-50%, -50%);
        position: absolute;
        top: 3px;
        left: 50%;
      }
      .body-p-title {
        font-size: @font14;
        color: #303133;
        font-weight: 700;
      }
      .body-p-text {
        font-size: @font12;
        color: #606266;
        // prettier-ignore
        margin-top: 12PX;
        flex: 1;
      }
      .body-p-btn {
        color: #247257;
        cursor: pointer;
        text-align: right;
      }
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="content-back"></div>
    <div class="offset-content" :style="`left:${left}px`">
      <div class="content-body" v-if="nowStep == 0" :style="stypeStep">
        <div class="triangle"></div>
        <div class="body-p-title">添加照片</div>
        <div class="body-p-text">点击后可添加所有需上传的照片。</div>
        <div class="body-p-btn" @click="setStep(1)">继续探索</div>
      </div>
      <div class="content-body next-1" v-if="nowStep == 1">
        <div class="next-1-left">
          <img
            src="https://imgtest.0be.cn/FileUpload/SaleInterview2020/10/20/56d77357aa264c2196ff8571d0819b40.gif"
            alt=""
          />
        </div>
        <div class="next-1-right">
          <h3 class="next-title">房源图片分组归类</h3>
          <div class="next-text">
            上传完图片后，需要将已上传的图片，通过拖拽的形式，拖拽至相应的类型中，房源的图片才会在系统内及外网进行展示。
          </div>
          <div class="next-btn">
            <div @click="setStep(2)">再看一遍</div>
            <div @click="setStep(3)">我会了</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const elMain = document.querySelector(".el-main");
export default {
  props: {
    posiRect: Object, //步骤1的定位
    nowStep: Number, //当前激活步骤
    visible: Boolean // 关闭开关
  },
  computed: {
    /**
     * @example: 步骤1的样式计算
     */
    stypeStep() {
      return {
        top: this.posiRect.bottom + 10 + "px",
        left: this.posiRect.left - this.left + this.posiRect.width + "px"
      };
    }
  },
  data() {
    return {
      left: elMain.offsetLeft
    };
  },
  methods: {
    setStep(v) {
      if (v == 1) {
        this.$emit("setStep", {
          done: false,
          visible: false,
          next: 1
        });
      } else if (v == 2) {
        this.$emit("setStep", {
          done: false,
          visible: true,
          next: 0
        });
      } else {
        this.$emit("setStep", {
          done: true,
          visible: false,
          next: 0
        });
      }
    },
    closePop() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
