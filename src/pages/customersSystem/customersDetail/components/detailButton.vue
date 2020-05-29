<style lang="less" scoped>
@pad: 0 20px 0 40px;
.page-content-head {
  /** 名字 星星 */
  .customers-head {
    padding: @pad;
    display: flex;
    .customers-head-name {
      font-size: 30px;
      &::after {
        content: "(" attr(data-sex) ")";
        color: #cccccc;
        font-size: 20px;
      }
    }
    .customers-head-rate {
      align-self: center;
      margin-left: 30px;
      /deep/.el-rate__icon {
        font-size: 30px;
      }
    }
  }
  /** 印象 */
  .customers-head-impression {
    padding: @pad;
    display: flex;
    padding-top: 20px;
    .heard-scroll-tag {
      margin-right: 10px;
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 10px;
      flex: 1;
      width: 0;
      font-size: 0;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-button,
      &::-webkit-scrollbar-track,
      &::-webkit-scrollbar-track-piece {
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        background: #c9c9c9;
        border-radius: 50px;
      }
      .tag-content {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 4px;
        background: #11a760;
        position: relative;
        margin-right: 20px;
        &:hover {
          margin-right: 35px;
          .icon {
            display: block;
          }
        }
        span {
          color: #fff;
          line-height: 1;
          font-size: 15px;
          white-space: nowrap;
        }
        .icon {
          padding-left: 4px;
          display: none;
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translate(100%, -50%);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
    .add-impression {
      padding-top: 0;
      padding-bottom: 10px;
      //align-self: flex-start;
      /deep/span {
        text-decoration: underline;
      }
    }
  }
  /** 数据 拨打电话 */
  .customers-body {
    padding: @pad;
    display: flex;
    margin-top: 30px;
    .customers-body-detail {
      flex: 1;
      width: 0;
      .body-detail-row {
        display: flex;
        font-size: 18px;
        margin-top: 0px;
        &:not(:first-child) {
          margin-top: 32px;
        }
        &::after {
          content: attr(data-after);
          color: black;
        }
        > span {
          flex: 1;
          text-align: right;
          padding: 0 10px;
          box-sizing: border-box;
        }
        &::before {
          content: attr(data-before);
          color: #cccccc;
        }
      }
    }
    .customers-phone {
      margin-left: 50px;
      align-self: center;
      padding: 0 10px;
      height: 43px;
      font-size: 18px;
      font-family: "SimHei", sans-serif;
      .el-icon-phone {
        font-size: 22px;
      }
    }
  }
  /** 按钮组 */
  .customers-button-gruop {
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px 0 40px;
    margin: 30px -30px 0;
    .customers-button-item {
      flex: 0 0 calc((100% - 60px * 2) / 2);
      margin: 20px 30px 0px;
      &:nth-child(-n + 2) {
        margin-top: 0;
      }
      height: 53px;
      font-size: 18px;
      color: black;
      padding: 0;
      /deep/i {
        font-size: 28px;
        vertical-align: middle;
        margin-right: 15px;
      }
      /deep/span {
        vertical-align: middle;
      }
    }
  }
}
.line-break {
  height: 1px;
  background: #cccccc;
  margin-top: 10px;
}
</style>
<template>
  <div class="page-content-head">
    <div class="customers-head">
      <div class="customers-head-name" data-sex="男">李先生</div>
      <el-rate
        class="customers-head-rate"
        :value="2"
        :max="3"
        disabled
      ></el-rate>
    </div>
    <div class="customers-head-impression">
      <div class="heard-scroll-tag" v-if="impressionList.length > 0">
        <div
          class="tag-content"
          v-for="(item, index) in impressionList"
          :key="index"
        >
          <span>{{ item.text }}</span>
          <i
            class="el-icon-close icon"
            @click="removeImpression(item, index)"
          ></i>
        </div>
      </div>
      <el-button type="text" class="add-impression" @click="addImpression"
        ><i class="el-icon-circle-plus"></i> 印象</el-button
      >
    </div>
    <div class="line-break"></div>
    <div class="customers-body">
      <div class="customers-body-detail">
        <div class="body-detail-row" data-before="拥有人数" data-after="人">
          <span class="overText">2</span>
        </div>
        <div class="body-detail-row" data-before="公司看房套数" data-after="套">
          <span class="overText">15</span>
        </div>
        <div class="body-detail-row" data-before="我的带看套数" data-after="套">
          <span class="overText">9</span>
        </div>
      </div>
      <el-button type="primary" class="customers-phone"
        ><i class="el-icon-phone"></i>一键拨号</el-button
      >
    </div>
    <div class="customers-button-gruop">
      <el-button
        class="customers-button-item"
        icon="el-icon-refresh"
        @click="openPop('turnPop')"
        >转公客</el-button
      >
      <el-button
        class="customers-button-item"
        icon="el-icon-refresh"
        @click="openPop('turnTypePop')"
        >转状态</el-button
      >

      <el-button
        class="customers-button-item"
        icon="el-icon-delete"
        @click="openPop('removePop')"
        >删除</el-button
      >
      <el-button class="customers-button-item" icon="iconfont iconzhuanhuan"
        >PASS客户</el-button
      >
    </div>

    <!-- 删除-->
    <remove
      :visible.sync="removePop"
      v-if="removePop"
      style-type="0"
      title="删除"
      width="3.28rem"
      @transmitConfirm="removeTransmit"
    />
    <!-- 转公客-->
    <turn-clientele
      :visible.sync="turnPop"
      v-if="turnPop"
      style-type="0"
      title="转公客"
      width="3.28rem"
      @transmitConfirm="turnTransmit"
    />
    <!-- 转状态 -->
    <turn-type
      :visible.sync="turnTypePop"
      v-if="turnTypePop"
      style-type="0"
      title="转状态"
      width="4rem"
      @transmitConfirm="turnTypeTransmit"
    />
  </div>
</template>

<script>
export default {
  components: {
    //转公客
    turnClientele: () => import("../didLog/turnClientele"),
    //删除
    remove: () => import("../didLog/remove"),
    //转状态
    turnType: () => import("../didLog/turnType")
  },
  data() {
    return {
      turnPop: false, //转公客开关
      removePop: false, //删除按钮弹框开关
      turnTypePop: true, //转状态按钮弹框开关
      impressionList: [],
      customerId: null
    };
  },
  methods: {
    /**
     * @example: 转公客确认触发
     */

    turnTransmit() {},

    /**
     * @example: 删除弹框确认按钮
     */

    removeTransmit(e) {
      console.log("removeTransmit -> e", e);
      if (!this.customerId || this.customerId == 0) {
        this.$message({
          type: "info",
          message: "客户id为空，无法删除"
        });
        return;
      }
      let memo = e == 0 ? "客户无意向" : "空号";
      let that = this;
      that.$api
        .post({
          url: "/saleCustomer/deleteCustomer",
          qs: true,
          data: { customerId: that.customerId, memo: memo }
        })
        .then(e => {
          let result = e.data;
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "info",
              message: "提交删除申请成功，请等待审核！"
            });
            that.removePop = true;
          } else {
            this.$message({
              type: "info",
              message: result.message
            });
          }
        })
        .catch(e => {
          console.log("【【【【uups,客源删除申请失败】】】】");
          console.log(e);
        });
    },

    /**
     * @example: 转状态弹框确认按钮
     */

    turnTypeTransmit() {},

    /**
     * @example: 打开弹框
     * @param {popName} string 弹出层开关
     */

    openPop(popName) {
      this[popName] = true;
    },

    /**
     * @example: 删除印象
     */

    removeImpression(index) {
      this.impressionList.splice(index, 1);
    },

    /**
     * @example: 添加印象
     */

    addImpression() {
      let _that = this;
      this.$prompt(null, "房源印象显示在房源左上角,仅自己可见", {
        confirmButtonText: "添加",
        cancelButtonText: "取消",
        inputPlaceholder: "推荐5个字以内",
        lockScroll: false,
        inputValidator: e => {
          if (!e || e.length > 5) return "不能是空, 或者不能大于5个字";
          if (!e || /(.+)\1{2,}/.test(e)) {
            return "不能连续输入重复的字符";
          }
        },
        beforeClose(action, instance, done) {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            // _that.insertImpression(instance.inputValue);
            setTimeout(() => {
              _that.impressionList.push({ text: instance.inputValue });
              done();
              instance.confirmButtonLoading = false;
            }, 500);
          } else {
            done();
          }
        }
      })
        .then(value => {})
        .catch(() => {});
    }
  }
};
</script>
