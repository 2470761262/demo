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
      // prettier-ignore
      width: 450PX;
      // prettier-ignore
      min-height: 220PX;
      background: #ffffff;
      // prettier-ignore
      border-radius: 10PX;
      // prettier-ignore
      padding: 24PX 24PX 30PX 33PX;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      .body-head {
        display: flex;
        justify-content: space-between;
        .head-left {
          .head-left-title {
            font-size: @font24;
            font-weight: bold;
            color: #303133;
          }
          .head-left-tips {
            color: #606266;
            font-size: @font14;
            // prettier-ignore
            margin-top: 8PX;
          }
        }
        .el-icon-close {
          font-size: @font18;
          cursor: pointer;
        }
      }
      .body-text {
        flex: 1;
        font-size: @font16;
        // prettier-ignore
        margin-top: 20PX;
        // prettier-ignore
        line-height: 24PX;
      }
      .foot-content {
        display: flex;
        justify-content: flex-end;
        button {
          // prettier-ignore
          min-width: 100PX;
          // prettier-ignore
          height: 40PX;
          box-sizing: border-box;
          // prettier-ignore
          border-radius: 4PX;
          outline: none;
          border: none;
          font-size: @font14;
          cursor: pointer;
          & + button {
            // prettier-ignore
            margin-left: 16PX;
          }
        }
        .border {
          background: #fff;
          border: 1px solid #cecece;
        }
        .back {
          background: @backgroud;
          color: #fff;
        }
      }
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="content-back"></div>
    <div class="offset-content" :style="`left:${left}px`">
      <div class="content-body">
        <div class="body-head">
          <div class="head-left">
            <h3 class="head-left-title">温馨提示</h3>
          </div>
          <i class="el-icon-close anchor-point" @click="closePop"></i>
        </div>
        <div class="body-text">
          检测到您当前仍有未选择类型的图片，该类图片将不会展示，请尽快选择图片类型!
        </div>
        <div class="foot-content">
          <button class="border" @click="saveData">仍然保存</button>
          <button class="back" @click="closePop">选择图片类型</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const elMain = document.querySelector(".el-main");
export default {
  props: {
    visible: Boolean // 关闭开关
  },
  data() {
    return {
      left: elMain.offsetLeft
    };
  },
  methods: {
    closePop() {
      this.$emit("update:visible", false);
    },
    saveData() {
      this.$emit("stillSave");
      this.closePop();
    }
  }
};
</script>
