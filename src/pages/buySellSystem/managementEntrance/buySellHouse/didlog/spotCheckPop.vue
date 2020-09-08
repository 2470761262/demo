<style lang="less" scoped>
.pop {
  border-radius: 10px;
  .pop-title {
    font-size: @font24;
    color: #303133;
  }
  .pop-content {
    color: #606266;
    font-size: @font18;
  }
  .pop-button {
    width: 136px;
    height: 48px;
    border-radius: 4px;
    cursor: pointer;
    font-size: @font16;
    &.cancel {
      background: #ffffff;
      border: 1px solid #cecece;
      color: #909399;
      margin-right: 16px;
    }
    &.sumbit {
      background: @backgroud;
      color: #ffffff;
      outline: none;
      border: none;
    }
  }
}
/deep/.el-dialog__headerbtn {
  font-size: @font18;
}
</style>
<template>
  <el-dialog :visible.sync="visible" class="pop" width="647px">
    <div slot="title">
      <span class="pop-title">抽检确认</span>
    </div>
    <div class="pop-content">
      您是否要抽检选中的房源？确认后，将下发通知告知经纪人进行房源抽检验真！
    </div>
    <div slot="footer" class="dialog-footer">
      <button class="pop-button cancel" @click="cancel">取消</button>
      <el-button
        class="pop-button sumbit"
        @click="spotCheckSubmit"
        :loading="sumbitLoading"
      >
        确认提交
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showFlag: {
      type: Boolean,
      default: false
    }, //显示变量
    houseIdList: {
      type: Array,
      default: () => []
    } //抽检id集合
  },
  data() {
    return {
      sumbitLoading: false,
      visible: false
    };
  },
  watch: {
    showFlag(newValue) {
      this.visible = newValue;
    }
  },
  methods: {
    /**
     * @example:确定点击事件
     */
    spotCheckSubmit() {
      this.sumbitLoading = true;
      this.$api
        .post({
          url: "/spotCheck/insertSpotCheck",
          data: {
            houseIdList: this.houseIdList
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let type = "error";
          if (e.data.code == 200) {
            type = "success";
            this.$emit("update:showFlag", false);
            this.$emit("spotCheckSubmit");
          }
          this.$message({
            message: e.data.message,
            type: type
          });
        })
        .finally(e => {
          this.sumbitLoading = false;
        });
    },
    /**
     * @example:取消点击事件
     */
    cancel() {
      this.$emit("update:showFlag", false);
    }
  }
};
</script>
