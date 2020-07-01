<style lang="less" scoped>
.didLog-content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3000;
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
    &.style1-body {
      padding: 0;
      border-radius: 10px;
      .didLog-content-box {
        border-radius: inherit;
        padding-top: 24px;
        .didLog-content-box-title {
          margin: 0 24px;
          h3 {
            // prettier-ignore
            font-size: 24PX;
            font-weight: bold;
            color: rgba(48, 49, 51, 1);
          }
          .el-icon-close {
            // prettier-ignore
            font-size: 18PX;
            top: 50%;
            right: 11px;
            transform: translateY(-50%);
          }
        }
        .didLog-content-sroll {
          padding: 0 24px;
        }
        .foot-btn-content {
          display: flex;
          justify-content: flex-end;
          padding: 24px;
          .floot-btn {
            width: 136px;
            height: 48px;
            // prettier-ignore
            font-size: 16PX;
          }
          .close-btn {
            background: #fff;
            color: rgba(144, 147, 153, 1);
            border: 1px solid rgba(206, 206, 206, 1);
          }
          .success-btn {
            background: @backgroud;
            color: rgba(255, 255, 255, 1);
            border: none;
          }
          .floot-btn + .floot-btn {
            margin-left: 16px;
          }
        }
      }
    }
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
        max-height: 80vh;
        max-width: 85vw;
        overflow: auto;
        padding: 15px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
<template>
  <transition name="dadlog">
    <!-- v-elDrag -->
    <div class="didLog-content" v-show="visible">
      <div
        class="didLog-content-mask anchor-point"
        @click.stop="maskHide"
      ></div>
      <div
        class="didLog-content-body"
        :class="[typeClass, { 'style1-body': isStyleType2 }]"
        :style="{ width: width }"
      >
        <div class="didLog-content-box">
          <div class="didLog-content-box-title">
            <h3 :style="{ 'text-align': titleDirection }">{{ title }}</h3>
            <i class="el-icon-close anchor-point" @click.stop="close"></i>
          </div>
          <div class="didLog-content-sroll">
            <slot> </slot>
          </div>
          <slot name="floot">
            <div v-if="isStyleType2" class="foot-btn-content">
              <el-button
                class="floot-btn close-btn"
                type="info"
                v-show="mergeConfig.cancelBtnShow"
                @click="close"
                >{{ mergeConfig.cancelBtnText }}</el-button
              >
              <el-button
                class="floot-btn success-btn"
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
    butJson: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
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
  data() {
    return {};
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
