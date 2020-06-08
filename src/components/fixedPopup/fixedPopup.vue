<style lang="less" scoped>
@style2: #fed566;
.didLog-content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  &-style0 {
    .style0;
  }
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

.style0() {
  .didLog-content-body {
    position: relative;
    z-index: 200;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 0 !important;
    .didLog-content-box {
      background: #fff;
      overflow: hidden;
      padding-top: 0px !important;
      .didLog-content-box-title {
        height: 70px;
        background: @style2;
        text-align: center;
        line-height: 70px;
        color: #fff;
        font-size: 20px;
        position: relative;
        margin: 0 !important;
        h3 {
          text-align: inherit !important;
          font-weight: normal;
        }
        .el-icon-close {
          display: none;
          pointer-events: none;
        }
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          border-color: transparent;
          border-style: solid;
          border-width: 12px;
          border-top: 0;
          border-bottom-color: #fff;
        }
      }
      .style-2 {
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
        margin-top: 5px;
        .floot-btn {
          width: 120px;
          height: 30px;
          font-size: 17px;
          border-radius: 30px;
          padding: 0;
          border: none;
          margin-left: 0;
          &:nth-child(1) {
            background: #cccccc;
            margin-right: 20px;
          }
          &:nth-child(2) {
            background: @style2;
          }
        }
      }
    }
  }
}
</style>
<template>
  <transition name="dadlog">
    <div
      class="didLog-content"
      :class="styleClassGet"
      v-show="visible"
      v-elDrag
    >
      <div
        class="didLog-content-mask anchor-point"
        @click.stop="maskHide"
      ></div>
      <div
        class="didLog-content-body"
        :class="typeClass"
        :style="{ width: width }"
      >
        <div class="didLog-content-box">
          <div class="didLog-content-box-title">
            <h3 :style="{ 'text-align': titleDirection }">
              <i :class="iconClass"></i>{{ title }}
            </h3>
            <i class="el-icon-close anchor-point" @click.stop="close"></i>
          </div>
          <div class="didLog-content-sroll">
            <slot> </slot>
          </div>
          <slot name="otherTips"></slot>
          <slot name="floot">
            <div class="style-2" v-if="isStyleType2">
              <el-button
                class="floot-btn"
                type="info"
                v-show="mergeConfig.cancelBtnShow"
                @click="close"
                >{{ mergeConfig.cancelBtnText }}</el-button
              >
              <el-button
                class="floot-btn"
                type="info"
                :loading="loading"
                @click="confirm"
                v-show="mergeConfig.confirmBtnShow"
                >{{ mergeConfig.confirmBtnText }}</el-button
              >
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const defaultBtnData = {
  cancelBtnText: "取消",
  cancelBtnShow: true,
  confirmBtnText: "确定",
  confirmBtnShow: true
};
import util from "@/util/util";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    beforeClear: {
      type: Function
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
    },
    styleType: {
      type: [String, Number],
      default: -1
    },
    iconClass: {
      type: String,
      default: ""
    },
    butJson: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    styleClassGet() {
      if (this.isStyleType2) {
        return `didLog-content-style${this.styleType}`;
      }
      return null;
    },
    isStyleType2() {
      return this.styleType === "0" ? true : false;
    },
    mergeConfig() {
      return util.merge(defaultBtnData, this.butJson);
    }
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        if (this.beforeClear) {
          this.beforeClear.bind(this.$parent)();
        }
      }
    }
  },
  methods: {
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
    confirm() {
      this.$emit("confirmEmit");
    },
    close() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
