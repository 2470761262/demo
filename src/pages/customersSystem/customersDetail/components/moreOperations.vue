<template>
  <div class="more-box">
    <div class="more-title">更多操作</div>
    <ul class="more-list">
      <li>
        <span>修改基本信息</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="openPopUp('impressionFlag')">
        <span>客源印象</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="openPopUp('uselessFlag')">
        <span>无效客源</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="openPopUp('operationLogFlag')">
        <span>操作日志</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="openPopUp('attentionFlag')">
        <span>暂不关注</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="attention()">
        <span>取消暂不关注</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="openDevelop()">
        <span>转为成交</span>
        <i class="el-icon-arrow-right"></i>
      </li>
      <li @click="openDevelop()">
        <span>发起合作</span>
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
    <impressionDIalog
      styleType="0"
      width="auto"
      title="添加客源印象"
      :visible.sync="impressionFlag"
      v-if="impressionFlag"
    ></impressionDIalog>

    <uselessDialog
      styleType="0"
      width="auto"
      title="无效客源申请"
      :visible.sync="uselessFlag"
      v-if="uselessFlag"
    ></uselessDialog>

    <attentionDialog
      styleType="0"
      width="auto"
      title="暂不关注客源"
      :visible.sync="attentionFlag"
      v-if="attentionFlag"
    ></attentionDialog>

    <operationLogDialog
      styleType="0"
      width="953px"
      title="操作日志"
      :visible.sync="operationLogFlag"
      v-if="operationLogFlag"
    ></operationLogDialog>
  </div>
</template>

<script>
export default {
  inject: ["customerId"],
  data() {
    return {
      impressionFlag: false,
      uselessFlag: false,
      attentionFlag: false,
      operationLogFlag: false
    };
  },
  components: {
    // 客源印象
    impressionDIalog: () => import("../didLog/impressionDialog"),
    // 转无效
    uselessDialog: () => import("../didLog/uselessDialog"),
    // 转无效
    attentionDialog: () => import("../didLog/attentionDialog"),
    // 操作日志
    operationLogDialog: () => import("../didLog/operationLogDialog")
  },
  methods: {
    /**
     * @example: 研发提示弹窗
     */
    attention() {
      let that = this;
      that.$api
        .post({
          url: "/saleCustomerDetail/attention",
          data: { customerId: this.customerId },
          qs: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$message({
              type: "success",
              message: "已取消该客户的暂不关注"
            });
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message(e.response.data.message);
          }
        });
    },
    /**
     * @example: 研发提示弹窗
     */
    openDevelop() {
      this.$alert("该功能正在开发中，敬请期待", "提示", {
        confirmButtonText: "确定",
        callback: () => {}
      });
    },
    /**
     * @example: 弹出弹窗事件
     * @param: {string} PopName 弹窗名称
     */
    openPopUp(PopName) {
      this[PopName] = true;
    }
  }
};
</script>

<style lang="less" scoped>
.more-box {
  padding: 24px;
  margin-top: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  .more-title {
    font-size: @font24;
    color: #303133;
    font-weight: bold;
    padding-bottom: 16px;
  }
  .more-list {
    li {
      display: flex;
      padding: 16px 0;
      border-bottom: 1px solid #f0f2f5;
      font-size: @font16;
      cursor: pointer;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        span {
          color: @backgroud;
        }
      }
      span {
        display: inline-block;
        color: #909399;
      }
      i {
        display: inline-block;
        color: #c1c1c1;
        text-align: right;
        margin-left: auto;
      }
    }
  }
}
</style>
