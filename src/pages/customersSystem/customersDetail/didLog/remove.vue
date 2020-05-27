<style lang="less" scoped>
.remove-content {
  .pop-head {
    span {
      color: red;
      margin-right: 10px;
    }
    font-size: 17px;
  }
  .radio-content {
    padding: 40px 15px;
    display: flex;
    align-items: center;
    .radio-content-item {
      // display: flex;
      flex: 1;
      margin-right: 40px;
      &:last-child {
        margin-right: 0;
      }
      justify-content: center;
      //  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      align-items: center;
      input {
        display: none;
      }
      input:checked ~ div {
        background: #fed566;
        color: #fff;
        border: none;
      }
      div {
        // flex: 1;
        font-size: 16px;
        height: 33px;
        box-sizing: border-box;
        border-radius: 6px;
        color: #666;
        border: 1px solid #ddd;
        text-align: center;
        line-height: 31px;
        cursor: pointer;
      }
    }
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
