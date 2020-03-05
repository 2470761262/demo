
<style lang="less" scoped>
.diaLogModel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4000;
  .imgdiaLog {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.5;
    background: #000;
  }
  .diaLogModel-close {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    font-size: 40px;
    z-index: 11;
    cursor: pointer;
  }
  .diaLogModel-warp {
    position: relative;
    z-index: 10;
    text-align: center;
  }
}
.dadlog-enter-active {
  animation: dadlog-in 0.3s;
}
.dadlog-leave-active {
  animation: dadlog-in 0.3s reverse;
}
@keyframes dadlog-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0px, 0);
    opacity: 1;
  }
}
</style>
<template>
  <transition name="dadlog">
    <div class="diaLogModel"
         v-if="diaLog">
      <div class="diaLogModel-close el-icon-circle-close"
           @click="changeModel"></div>
      <div class="imgdiaLog">
      </div>
      <div class="diaLogModel-warp">
        <slot v-slot:default></slot>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 *  v-model=""
 *  :imgdiaLog.sync=""
 */
export default {
  model: {
    prop: 'diaLog',
    event: 'input'
  },
  props: {
    diaLog: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    changeModel () {
      this.$emit('input', false);
      this.$emit('update:diaLog', false);
    }
  },
}
</script>
