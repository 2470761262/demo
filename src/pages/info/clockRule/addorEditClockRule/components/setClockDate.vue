<template>
  <!-- 设置特殊考勤日期弹窗 -->
  <el-dialog
    title="设置特殊考勤日期"
    :visible.sync="visible"
    @close="close"
    :show="dialogVisible"
    width="522px"
    :closeOnClickModal="false"
  >
    <div class="component-container">
      <el-tabs class="sub-nav" v-model="activeTabName" @tab-click="switchTab">
        <el-tab-pane
          v-for="(item, index) in sidebarNavs"
          :key="index"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      activeTabName: "first",
      sidebarNavs: [
        {
          label: "设置上班日",
          name: "first"
        },
        {
          label: "设置休息日",
          name: "second"
        }
      ]
    };
  },
  watch: {
    dialogVisible() {
      this.visible = this.dialogVisible;
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("update:dialogVisible", false);
    },
    cancel() {
      this.$emit("update:dialogVisible", false);
    },
    /**
     * @description: nav切换
     * @return {*}
     */
    switchTab() {
      console.log(this.activeTabName, "=========");
    },
  }
};
</script>
<style lang="less" scoped>
/deep/.el-dialog {
  border-radius: 10px;
  .el-dialog__header {
    position: relative;
    padding: 24px;
    .el-dialog__title {
      line-height: 1;
      font-size: @font24;
      font-weight: bold;
      color: #303133;
    }
    .el-dialog__headerbtn {
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      .el-icon-close {
        font-size: @font24;
      }
    }
  }
  .el-dialog__body {
    display: flex;
    min-height: 460px;
    max-height: 70vh;
    overflow: auto;
    padding: 0;
  }
}
/deep/.component-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 24px 30px;
  /deep/.sub-nav {
    display: flex;
    flex-direction: row;
    padding: 0 24px;
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__item {
      height: 32px;
      line-height: 1;
      font-size: @font18;
      font-weight: bold;
      color: #303133;
      &.is-active {
        color: @backgroud;
      }
    }
    .el-tabs__active-bar {
      height: 4px;
      border-radius: 4px;
    }
    .el-tabs__nav-wrap::after {
      background: rgba(0, 0, 0, 0);
    }
  }
}
</style>
