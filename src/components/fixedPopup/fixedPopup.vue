<style lang="less" scoped>
.didLog-content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
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
    padding: 10px;
    .didLog-content-box {
      background: #fff;
      padding: 15px;
      .didLog-content-box-title {
        // display: flex;
        // justify-content: space-between;
        position: relative;
        h3 {
          font-size: 20px;
          font-weight: 500;
          text-align: center;
        }
        .el-icon-close {
          font-size: 20px;
          cursor: pointer;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
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
            <h3 :style="{'text-align':titleDirection}">{{title}}</h3>
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
    titleDirection: {
      type: String,
      default: 'left'
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
