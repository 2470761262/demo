<template>
  <div class="demand-box">
    <div
      class="demand-btn"
      @click="moreSelectFlag = true"
      v-if="permissionList.modifyCustomerButtonEable.isDisable"
    >
      新增需求
    </div>
    <el-tabs
      v-model="changeTabsValue"
      @tab-click="handleClick"
      class="demand-tabs"
    >
      <el-tab-pane
        v-for="(item, idx) in demand.data"
        :key="idx"
        :name="idx + ''"
      >
        <span slot="label">{{ item }}</span>
      </el-tab-pane>
    </el-tabs>
    <template v-for="(item, idx) in demandList.data">
      <el-tabs
        v-model="demandTabsValue"
        type="card"
        v-show="changeTabsValue == idx"
        class="infor-tabs"
        :key="idx"
      >
        <el-tab-pane label="需求信息" name="demand">
          <div class="demand-msg">
            <div class="msg-title">
              <span class="msg-headline">需求信息</span>
              <span class="msg-time"
                >更新时间：{{ customer.data.ModTime }}</span
              >
              <span
                class="msg-update"
                @click="demandConfirm"
                v-if="permissionList.modifyCustomerButtonEable.isDisable"
                >修改</span
              >
            </div>
            <div class="msg-content">
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">期望首付：</span>
                  <div class="msg-row-txt">
                    {{ item.minFirstPrice | formatMoney }} -
                    {{ item.maxFirstPrice | formatMoney }}万
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望面积：</span>
                  <div class="msg-row-txt">
                    {{ item.minArea }} - {{ item.maxArea }}m²
                  </div>
                </div>
                <div
                  class="msg-row"
                  v-if="
                    item.requireType == 64 ||
                      item.requireType == 128 ||
                      item.requireType == 256
                  "
                >
                  <span class="msg-row-title">期望租金：</span>
                  <div class="msg-row-txt">
                    {{ item.minPrice }} -
                    {{ item.maxPrice }}
                  </div>
                </div>
                <div class="msg-row" v-else>
                  <span class="msg-row-title">期望总价：</span>
                  <div class="msg-row-txt">
                    {{ item.minPrice | formatMoney }} -
                    {{ item.maxPrice | formatMoney }}万
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">付款方式：</span>
                  <div class="msg-row-txt">
                    {{ item.payWay | formatPayWay }}
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">购买户型：</span>
                  <div class="msg-row-txt">{{ item.rooms | formatSymbol }}</div>
                </div>
              </section>
              <section class="msg-row-group">
                <div class="msg-row">
                  <span class="msg-row-title">装修需求：</span>
                  <div class="msg-row-txt">{{ item.decoration }}</div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望小学：</span>
                  <div class="msg-row-txt">
                    <p
                      v-for="(primarySchool, idx) in item.primarySchool"
                      :key="idx"
                    >
                      {{ primarySchool }}
                    </p>
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">期望中学：</span>
                  <div class="msg-row-txt">
                    <p
                      v-for="(middleSchool, idx) in item.middleSchool"
                      :key="idx"
                    >
                      {{ middleSchool }}
                    </p>
                  </div>
                </div>
                <div class="msg-row">
                  <span class="msg-row-title">看房经历：</span>
                  <div class="msg-row-txt">{{ item.remark }}</div>
                </div>
              </section>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="推荐房源" name="recommend">
          <img src="../../../../assets/images/inDevelopment.png" alt="" />
        </el-tab-pane>
        <el-tab-pane label="客源解读" name="unscramble">
          <img src="../../../../assets/images/inDevelopment.png" alt="" />
        </el-tab-pane>
        <el-tab-pane label="合作信息" name="cooperation">
          <img src="../../../../assets/images/inDevelopment.png" alt="" />
        </el-tab-pane>
      </el-tabs>
    </template>
    <!-- 多选弹出层 -->
    <demand-more-select
      ref="moreSelect"
      styleType="0"
      :visible.sync="moreSelectFlag"
      width="506px"
      title="选择需求信息(多选)"
      @demandConfirm="demandConfirm"
      v-model="demandValueData"
      data-vv-name="moreSelect"
      data-vv-as="需求信息"
      v-validate="'required|arrFlatLength:0'"
    >
    </demand-more-select>
  </div>
</template>

<script>
import { division } from "../../../../util/accurateComputeUtil";
import demandMoreSelect from "../../addCustomers/components/demandMoreSelect";
export default {
  inject: [
    "demand",
    "demandList",
    "customer",
    "permissionList",
    "demandValue",
    "customerId"
  ],
  data() {
    return {
      moreSelectFlag: false,
      changeTabsValue: "0",
      demandTabsValue: "demand",
      demandValueData: this.demandValue
    };
  },
  components: { demandMoreSelect },
  filters: {
    formatMoney(val) {
      return division(val, 10000);
    },
    formatPayWay(val) {
      switch (val) {
        case 1:
          return "一次性";
        case 2:
          return "商业贷款";
        case 4:
          return "公积金贷款";
        case 8:
          return "组合贷款";
      }
    },
    formatSymbol(val) {
      return val.replace(/\$/g, ",");
    }
  },
  methods: {
    /**
     * @example: tabs点击事件
     */
    handleClick(e) {
      this.demandTabsValue = "demand";
    },
    demandConfirm() {
      this.$store.commit("updateDemandValue", this.demandValueData);
      this.$router.push({
        path: "/customers/addCustomers",
        query: { customerId: this.customerId, step: 2 }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.demand-box {
  padding: 24px;
  margin-top: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  .demand-btn {
    display: inline-block;
    font-size: @font16;
    color: #fff;
    background: @backgroud;
    border-radius: 4px;
    padding: 8px 16px;
    position: absolute;
    right: 24px;
    z-index: 10;
    cursor: pointer;
  }
  .demand-tabs {
    margin-bottom: 9px;
    /deep/ .el-tabs__item {
      margin-bottom: 15px;
      font-size: @font18;
      font-weight: bold;
    }
  }
  .infor-tabs {
    /deep/ .el-tabs__item {
      font-size: @font16;
      //prettier-ignore
      line-height: 48PX;
      height: auto;
      border: none;
      border-radius: 4px;
      margin-right: 16px;
      background: #f0f2f5;
      color: #909399;
    }
    /deep/ .el-tabs__item.is-active {
      background: @backgroud;
      color: #fff;
    }
    .demand-msg {
      .msg-title {
        display: flex;
        align-items: flex-end;
        padding-bottom: 40px;
        padding-top: 10px;
        font-size: @font14;
        .msg-headline {
          margin-right: 8px;
          font-size: @font24;
          color: #303133;
          font-weight: bold;
        }
        .msg-time {
          color: #606266;
        }
        .msg-update {
          margin-left: auto;
          color: @backgroud;
          cursor: pointer;
        }
      }
      .msg-content {
        display: flex;
        .msg-row-group {
          flex: 0.5;
          &:first-child {
            margin-right: 48px;
          }
          .msg-row {
            display: flex;
            flex: 0.5;
            //prettier-ignore
            font-size: @font16;
            margin-bottom: 33px;
            .msg-row-title {
              display: inline-block;
              color: #606266;
            }
            .msg-row-txt {
              display: inline-block;
              margin-left: auto;
              color: #303133;
              p {
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
  /deep/ .el-tabs--card > .el-tabs__header {
    border-bottom: none;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
}
</style>
