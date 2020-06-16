<style lang="less" scoped>
.follow-content {
  padding: 5px 0 30px 0;
  display: flex;
  .is-require {
    color: red;
    font-size: 20px;
    margin-right: 10px;
  }
  /deep/.el-textarea {
    width: auto;
    flex: 1;
    textarea {
      background: #f8f8f5;
    }
  }
}
</style>
<template>
  <fixed-popup
    v-bind="$attrs"
    v-on="$listeners"
    @confirmEmit="confirmEmit"
    :butJson="{ confirmBtnText: '提交' }"
    iconClass="iconzaishouwugendan iconfont"
  >
    <template>
      <div class="follow-content">
        <i class="is-require">*</i>
        <el-input
          type="textarea"
          resize="none"
          :autosize="{ minRows: 5, maxRows: 7 }"
          placeholder="对这个客户想说点什么？请写下来吧"
          v-model="textarea"
        >
        </el-input>
      </div>
    </template>
  </fixed-popup>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      activeProData: null
    };
  },
  methods: {
    confirmEmit() {
      this.$emit("followConfirmEmit", this);
      this.close();
    },
    close() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
