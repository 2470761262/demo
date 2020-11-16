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
      <div class="content">
        <div class="panel" v-if="activeTabName == 'first'">
          <ls-calendar
            :is-empty="true"
            :current="workCurrent"
            v-model="workCalendarTiem"
            choice="multiple"
            :gridCount="35"
          >
            <template v-slot:dots="{ col }">
              <div
                class="calendar-dots"
                :class="{ 'is-hide': workCalendarTiem == col.time }"
                :style="{ 'background-color': color[col.type] }"
              ></div>
            </template>
          </ls-calendar>
        </div>
        <div class="panel" v-else>
          <ls-calendar
            :is-empty="true"
            :current="restCurrent"
            v-model="restCalendarTiem"
            choice="multiple"
            :gridCount="35"
          >
            <template v-slot:dots="{ col }">
              <div
                class="calendar-dots"
                :class="{ 'is-hide': restCalendarTiem == col.time }"
                :style="{ 'background-color': color[col.type] }"
              ></div>
            </template>
          </ls-calendar>
        </div>
      </div>
      <div class="bottom">
        <div class="tip">
          可一次性设置多个{{ activeTabName == "first" ? "上班" : "休息" }}日
        </div>
        <div class="btn-box">
          <button class="cancel" @click="cancel">取消</button>
          <button class="confirm" @click="confirm">确定</button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import lsCalendar from "@/pages/info/components/calendar";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  components: { lsCalendar },
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
      ],
      color: ["#0DA88B", "#F6A420", "#EF5656"],
      workCalendarTiem: "",
      workCurrent: [],
      restCalendarTiem: "2020-11-05",
      restCurrent: []
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
    confirm() {
      console.log("confirm");
    }
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
    width: 100%;
    box-sizing: border-box;
    .el-tabs__header {
      width: 100%;
      margin: 0;
    }
    .el-tabs__item {
      height: 32px;
      line-height: 1;
      font-size: @font18;
      color: #303133;
      &.is-active {
        color: @backgroud;
        font-weight: bold;
      }
    }
    .el-tabs__active-bar {
      height: 4px;
      border-radius: 4px;
    }
    .el-tabs__nav-wrap::after {
      background: #f0f2f5;
    }
  }
  .content {
    padding-bottom: 16px;
    .panel {
      .calendar-content {
        box-shadow: none !important;
        .calendar-data {
          padding: 0;
        }
        .cell-item {
          height: 64px !important;
          line-height: 64px !important;
        }
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tip {
      font-size: @font16;
      color: #ff9600;
    }
    .btn-box {
      button {
        width: 109px;
        height: 40px;
        border-radius: 4px;
        border: none;
        line-height: 40px;
        outline: none;
        cursor: pointer;
      }
      .cancel {
        background: #f4f4f5;
        color: #606266;
      }
      .confirm {
        margin-left: 16px;
        background: @backgroud;
        color: #fff;
      }
    }
  }
}
</style>
