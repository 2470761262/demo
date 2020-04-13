<style lang="less" scoped>
.didLog-content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1950;
  display: flex;
  justify-content: center;
  align-items: center;
  .didLog-content-mask {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(129, 148, 148, 0.3);
  }
  .didLog-content-body {
    position: relative;
    z-index: 200;
    &.info {
      background: rgba(105, 154, 132, 0.5);
    }
    &.error {
      background: #ad1600;
    }
    &.system {
      background: var(--color--primary);
    }
    padding: 10px;
    .didLog-content-box {
      background: #fff;
      overflow: hidden;
      padding-top: 15px;
      .didLog-content-box-title {
        position: relative;
        margin: 0px 15px;
        user-select: none;
        h3 {
          font-size: 20px;
          font-weight: 500;
          text-align: center;
          min-height: 20px;
        }
        .el-icon-close {
          font-size: 20px;
          cursor: pointer;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .didLog-content-sroll {
        max-height: 85vh;
        max-width: 85vw;
        overflow: auto;
        padding: 15px;
        box-sizing: border-box;
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        &::-webkit-scrollbar-button,
        &::-webkit-scrollbar-track,
        &::-webkit-scrollbar-track-piece {
          display: none;
        }
        &::-webkit-scrollbar-thumb {
          background: #c9c9c9;
          border-radius: 50px;
        }
      }
    }
  }
}
</style>
<template>
  <transition name="dadlog">
    <div class="didLog-content"
         v-show="visible"
         v-elDrag>
      <div class="didLog-content-mask"
           @click.stop="maskHide"></div>
      <div class="didLog-content-body"
           :class="typeClass"
           :style="{'width':width}">
        <div class="didLog-content-box">
          <div class="didLog-content-box-title">
            <h3 :style="{'text-align':titleDirection}">{{title}}</h3>
            <i class="el-icon-close"
               @click.stop="close"></i>
          </div>
          <div class="didLog-content-sroll">
            <slot>
            </slot>
          </div>
          <slot name="floot"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    beforeClear:{
      type:Function
    },
    title: {
      type: String,
      default: "提示"
    },
    titleDirection: {
      type: String,
      default: "left"
    },
    width: {
      type: String,
      default: "680px"
    },
    typeClass: {
      type: String,
      default: "info"
    },
    maskHideEvent: {
      type: Boolean,
      default: false
    }
  },
  watch:{
    visible(newValue){
      if(!newValue){
          if (this.beforeClear) {
              this.beforeClear.bind(this.$parent)();
          }
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    closeFun(){

    },
    maskHide() {
      if (this.maskHideEvent) {
        if (this.beforeClose) {
          let mise = this.beforeClose.bind(this.$parent)();
          if (mise instanceof Promise) {
            mise
              .then(() => {
                this.close();
              })
              .catch(() => {});
          }
        } else {
          this.close();
        }
      }
    },
    close(e) {
      this.$emit("update:visible", false);
    }
  }
};
</script>
