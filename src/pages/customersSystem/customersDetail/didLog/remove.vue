<style lang="less" scoped>
@import url(../../less/popScroll);
.remove-content {
  .pop-head {
    span {
      color: red;
      margin-right: 10px;
    }
    font-size: 17px;
  }
  .radio-content {
    .radio-content();
  }
}
</style>
<template>
  <!-- 删除 -->
  <fixed-popup v-bind="$attrs" v-on="$listeners" @confirmEmit="confirmEmit">
    <template>
      <div class="remove-content">
        <div class="pop-head"><span>*</span>请选择删除客户的原因</div>
        <div class="radio-content">
          <label class="radio-content-item">
            <input
              v-model.number="removeCheck"
              type="radio"
              name="removePop"
              value="0"
            />
            <div>客户无意向</div>
          </label>
          <label class="radio-content-item">
            <input
              v-model.number="removeCheck"
              type="radio"
              name="removePop"
              value="1"
            />
            <div>空号</div>
          </label>
        </div>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
export default {
  data() {
    return {
      removeCheck: "0"
    };
  },
  methods: {
    confirmEmit() {
      this.$emit("transmitConfirm", this.removeCheck);
    }
  }
};
</script>
