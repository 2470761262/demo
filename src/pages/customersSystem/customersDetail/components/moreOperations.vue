<template>
  <div class="more-box">
    <div class="more-title">更多操作</div>
    <ul class="more-list">
      <li
        @click="demandConfirm"
        v-if="
          permissionList.modifyCustomerButtonEable.isDisable &&
            attentionStatus.flag == 1
        "
      >
        <span>修改基本信息</span>
        <i class="el-icon-arrow-right"></i>
      </li>

      <li
        @click="openPopUp('impressionFlag')"
        v-if="
          permissionList.customerDetailForAddImpression.isDisable &&
            attentionStatus.flag == 1
        "
      >
        <span>客源印象</span>
        <i class="el-icon-arrow-right"></i>
      </li>

      <li
        @click="openPopUp('uselessFlag')"
        v-if="
          permissionList.customerDetailForTurnInvalid.isDisable &&
            attentionStatus.flag == 1
        "
      >
        <span>无效客源</span>
        <i class="el-icon-arrow-right"></i>
      </li>

      <li @click="openPopUp('operationLogFlag')">
        <span>操作日志</span>
        <i class="el-icon-arrow-right"></i>
      </li>

      <li
        @click="openPopUp('attentionFlag')"
        v-if="
          permissionList.customerDetailUnAttention.isDisable &&
            attentionStatus.flag == 1
        "
      >
        <span>暂不关注</span>
        <i class="el-icon-arrow-right"></i>
      </li>

      <li
        @click="attention()"
        v-if="
          permissionList.customerDetailAttention.isDisable &&
            !attentionStatus.flag == 1
        "
      >
        <span>取消暂不关注</span>
        <i class="el-icon-arrow-right"></i>
      </li>

      <li @click="openDevelop()" v-if="attentionStatus.flag == 1">
        <span>转为成交</span>
        <i class="el-icon-arrow-right"></i>
      </li>

      <li @click="openDevelop()" v-if="attentionStatus.flag == 1">
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

    <fixedPopup
      :visible.sync="alertflag"
      styleType="0"
      :butJson="btnJson"
      @confirmEmit="alertflag = false"
      ><div class="alert-txt">该功能正在开发中，敬请期待</div></fixedPopup
    >
  </div>
</template>

<script>
export default {
  inject: ["customerId", "permissionList", "attentionStatus", "getInformation"],
  data() {
    return {
      impressionFlag: false,
      uselessFlag: false,
      attentionFlag: false,
      operationLogFlag: false,
      alertflag: false,
      btnJson: {
        cancelBtnShow: false,
        confirmBtnText: "确定",
        confirmBtnShow: true
      }
    };
  },
  components: {
    // 客源印象
    impressionDIalog: () => import("../didlog/impressionDialog"),
    // 转无效
    uselessDialog: () => import("../didlog/uselessDialog"),
    // 暂不关注
    attentionDialog: () => import("../didlog/attentionDialog"),
    // 操作日志
    operationLogDialog: () => import("../didlog/operationLogDialog")
  },
  methods: {
    /**
     * @example: 取消暂不关注
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
              type: "xinjia",
              message: "已取消该客户的暂不关注"
            });
            that.getInformation();
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message({
              type: "xinjia-info",
              message: e.response.data.message
            });
          }
        });
    },
    /**
     * @example: 研发提示弹窗
     */
    openDevelop() {
      this.alertflag = true;
    },
    /**
     * @example: 弹出弹窗事件
     * @param: {string} PopName 弹窗名称
     */
    openPopUp(PopName) {
      this[PopName] = true;
    },
    demandConfirm() {
      this.$router.push({
        path: "/customers/editCustomers",
        query: { customerId: this.customerId }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.more-box {
  padding: 24px;
  padding-bottom: 0;
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
.alert-txt {
  padding-top: 24px;
  font-size: @font16;
}
</style>
