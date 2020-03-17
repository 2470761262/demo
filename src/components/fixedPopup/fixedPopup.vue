<style lang="less" scoped>
.didLog-content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  .didLog-content-mask {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(129, 148, 148, 0.3);
  }
  .didLog-content-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;

    &.info {
      background: rgba(105, 154, 132, 0.5);
    }
    &.error {
      background: #ad1600;
    }
    padding: 10px;
    .didLog-content-box {
      background: #fff;
      padding: 15px;
      .didLog-content-box-title {
        display: flex;
        justify-content: space-between;
        h3 {
          font-size: 20px;
          font-weight: 500;
        }
        .el-icon-close {
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<template>
  <transition name="dadlog">
    <div class="didLog-content"
         v-if="visible">
      <div class="didLog-content-mask"
           @click.stop="maskHide"></div>
      <div class="didLog-content-body"
           :class="typeClass"
           :style="{'width':width}">
        <div class="didLog-content-box">
          <div class="didLog-content-box-title">
            <h3>{{title}}</h3>
            <i class="el-icon-close"
               @click="close"></i>
          </div>
          <slot>
          </slot>
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
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '680px'
    },
    typeClass: {
      type: String,
      default: 'info'
    },
    maskHideEvent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  methods: {
    maskHide () {
      if (this.maskHideEvent)
        this.close();
    },
    close () {
      this.$emit('update:visible', false);
    }
  },
}
</script>
