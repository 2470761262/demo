<style lang="less" scoped>
.pop {
  border-radius: 10px;
  .pop-title {
    font-size: @font24;
    color: #303133;
    font-weight: bold;
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
  <el-dialog :visible.sync="visible" class="pop" width="647px" @close="cancel">
    <div slot="title">
      <span class="pop-title">申请跟单人</span>
    </div>
    <div class="pop-content">
      您是否愿意全力以赴为本业主服务，运用平台优势为本套房源寻找合适的客户，并实时与业主保持沟通，当房源状态有变化时，及时更改？
    </div>
    <div slot="footer" class="dialog-footer">
      <button class="pop-button cancel" @click="cancel">不同意</button>
      <el-button
        class="pop-button sumbit"
        @click="spotCheckSubmit"
        :loading="sumbitLoading"
      >
        同意
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    showFlag: {
      type: Boolean,
      default: false
    } //显示变量
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
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id
    })
  },
  methods: {
    /**
     * @example:确定点击事件
     */
    spotCheckSubmit() {
      this.sumbitLoading = true;
      this.$api
        .post({
          url: `/agentHouse/propertyCheck/apply/agent/${this.houseId}`,
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
            this.$emit("applyAgent", e.data.data);
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
  },
  destroyed() {
    this.$emit("update:showFlag", false);
  }
};
</script>
