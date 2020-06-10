<style lang="less" scoped>
@pad: 0 20px 0 40px;
.page-content-head {
  /** 名字 星星 */
  .customers-head {
    padding: @pad;
    display: flex;
    .customers-head-name {
      font-size: 30px;
      flex: 1;
      &::after {
        content: "(" attr(data-sex) ")";
        color: #cccccc;
        font-size: 20px;
        white-space: nowrap;
      }
    }
    .customers-head-rate {
      // align-self: center;
      // margin-left: 30px;
      flex-shrink: 0;
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
      <div class="customers-head-name" :data-sex="dataItem.sex">
        {{ dataItem.customerName }}
      </div>
      <el-rate
        class="customers-head-rate"
        :value="dataItem.desireIntensity"
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
          <span>{{ item.impression }}</span>
          <i class="el-icon-close icon" @click="removeImpression(item)"></i>
        </div>
      </div>
      <el-button type="text" class="add-impression" @click="addImpression">
        <i class="el-icon-circle-plus"></i> 印象
      </el-button>
    </div>
    <div class="line-break"></div>
    <div class="customers-body">
      <div class="customers-body-detail">
        <div class="body-detail-row" data-before="拥有人数" data-after="人">
          <span class="overText">{{ dataItem.haveAgents }}</span>
        </div>
        <div class="body-detail-row" data-before="公司看房套数" data-after="套">
          <span class="overText">{{ dataItem.lookHouses }}</span>
        </div>
        <div class="body-detail-row" data-before="我的带看套数" data-after="套">
          <span class="overText">{{ dataItem.myLookHouses }}</span>
        </div>
      </div>
      <el-button type="primary" class="customers-phone" @click="dailPhone">
        <i class="el-icon-phone"></i>一键拨号
      </el-button>
    </div>
    <div class="customers-button-gruop" v-if="showOperationButton">
      <el-button
        v-if="cusBShow"
        class="customers-button-item"
        icon="el-icon-refresh"
        @click="openPop('turnPop')"
        >转公客</el-button
      >
      <el-button
        class="customers-button-item"
        icon="el-icon-refresh"
        :disabled="isDisabledTypePop"
        @click="openPop('turnTypePop')"
        >{{ turnTypeTitle }}</el-button
      >

      <el-button
        class="customers-button-item"
        icon="el-icon-delete"
        @click="openPop('removePop')"
        >删除</el-button
      >
      <el-button
        @click="openPop('passPop')"
        class="customers-button-item"
        icon="iconfont iconzhuanhuan"
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
      @confirmTurnType="turnTypeTransmit"
      :customerId="customer.id"
    />

    <pass-customer
      :visible.sync="passPop"
      v-if="passPop"
      style-type="0"
      title="PASS客户"
      width="7.4rem"
      @search="search"
      @pageSearch="pageButtonSearch"
      @passAccount="passAccount"
      :pageInfo="employeePageInfo"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import util from "@/util/util";
export default {
  props: ["customer", "showOperationButton"],
  components: {
    //转公客
    turnClientele: () => import("../didLog/turnClientele"),
    //删除
    remove: () => import("../didLog/remove"),
    //转状态
    turnType: () => import("../didLog/turnType"),
    //pass客户
    passCustomer: () => import("../didLog/passCustomer")
  },
  data() {
    return {
      passPop: false, //pass客户
      turnPop: false, //转公客开关
      removePop: false, //删除按钮弹框开关
      turnTypePop: false, //转状态按钮弹框开关
      impressionList: [],
      isDisabledTypePop: false,
      turnTypeTitle: "转状态",
      dataItem: {
        id: "",
        customerName: "加载中",
        desireIntensity: 0,
        haveAgents: 0,
        lookHouses: 0,
        myLookHouses: 0,
        sex: "性别不详"
      },
      cusBShow: false, //转公客是否显示
      recommandPage: {
        pageSize: 0,
        limit: 10,
        page: 1,
        totalPage: 0,
        perName: ""
      },
      employeePageInfo: []
    };
  },
  mounted() {
    let _that = this;
    _that.setName();
  },
  computed: {
    ...mapState({
      detail: value => {
        return value.customers.extend.cusExtend;
      },
      impress: value => {
        return value.customers.impress.impression;
      }
    })
  },
  watch: {
    impress: {
      deep: true,
      handler(newValue) {
        let _that = this;
        if (newValue.code == 200) {
          console.log("detailButton.vue--------获取用户印象记录", newValue);
          _that.impressionList = newValue.data;
        } else {
          this.$message({
            type: "info",
            message: newValue.message
          });
        }
      }
    },
    detail: {
      deep: true,
      handler(newValue) {
        if (newValue.code == 200) {
          console.log("detailButton.vue--------获取用户拓展信息记录", newValue);
          let _that = this;
          _that.dataItem.id = newValue.data.bsAgentCustomersTbl.id;
          _that.dataItem.customerName =
            newValue.data.bsAgentCustomersTbl.customers;
          _that.dataItem.haveAgents = newValue.data.haveAgents;
          _that.dataItem.lookHouses = newValue.data.lookHouses;
          _that.dataItem.myLookHouses = newValue.data.myLookHouses;
          _that.dataItem.desireIntensity = newValue.data.desireIntensity;
          let sex = newValue.data.bsAgentCustomersTbl.sex;
          if (sex == 0) _that.dataItem.sex = "男";
          if (sex == 1) _that.dataItem.sex = "女";

          //设置是否显示转公客按钮
          let group = [1, 2, 3, 4];
          if (!group.includes(newValue.data.bsAgentCustomersTbl.plate))
            _that.cusBShow = true;
        } else {
          this.$message({
            type: "info",
            message: newValue.message
          });
        }
      }
    }
  },
  methods: {
    //设置客户姓名
    setName() {
      console.log(1111);
    },
    dailPhone() {
      let row = this.customer;
      let that = this;
      console.log(row, "点击了一键拨号");
      if (!row.tel) {
        this.$message({
          type: "info",
          message: "无客源号码"
        });
        return;
      }
      this.$confirm("确定拨号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let dailParams = {
            customerId: row.id,
            remark: "客源一键拨号",
            customerName: row.customers,
            contactPhone: row.tel,
            customerNo: row.customerNo,
            customerPlate: row.plate
          };
          console.log(dailParams, "即将一键拨号");
          that.$api
            .post({
              url: "/saleCustomer/DialPhoneToCustomer",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: dailParams
            })
            .then(e => {
              let result = e.data;
              console.log(result);
              if (result.code == 200) {
                this.$message({
                  type: "info",
                  message: "请注意查收微信消息"
                });
                //but.$emit("followReolad", true);
              } else {
                this.$message({
                  type: "info",
                  message: result.message
                });
              }
            })
            .catch(e => {
              console.log("【【【【uups,客源一键拨号失败】】】】");
              console.log(e);
              this.$message({
                type: "info",
                message: "客源一键拨号失败"
              });
            });
        })
        .catch(() => {});
    },
    /**
     * @example: 转公客确认触发
     */

    turnTransmit() {
      let _that = this;
      //获取客户id
      let id = util.sessionLocalStorageGet("cosDetail:id");
      _that.$api
        .post({
          url: "/saleCustomerDetail/convertBCus",
          data: { eid: id },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          console.log("转公客记录", e);
          if (result.code == 200) {
            if (result.data == 1) {
              _that.$message({
                type: "info",
                message: "转公客成功"
              });
              _that.cusBShow = false;
            }
            if (result.data == -3) {
              _that.$message({
                type: "info",
                message: "转换失败"
              });
            }
            if (result.data == -4) {
              _that.$message({
                type: "info",
                message: "该私客已经在公盘,转换失败"
              });
            }
            //result.data.pageSum
            // this.$store.commit("updateFollow", {
            //   cusFollow: result
            // });
          }
        })
        .catch(e => {
          console.log("转公客失败");
          console.log(e);
        })
        .finally(() => {
          _that.turnPop = false;
        });
    },

    /**
     * @example: 删除弹框确认按钮
     */

    removeTransmit(e) {
      console.log("removeTransmit -> e", e);
      if (!this.customer || !this.customer.id || this.customer.id == 0) {
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
          url: "/saleCustomerOperation/deleteCustomer",
          qs: true,
          data: { customerId: that.customer.id, memo: memo }
        })
        .then(e => {
          let result = e.data;
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "info",
              message: "提交删除申请成功，请等待审核！"
            });
            that.removePop = false;
            that.$emit("deleteCustomerApply");
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

    turnTypeTransmit() {
      console.log("转状态后响应");
      this.turnTypeTitle = "状态审核中";
      this.isDisabledTypePop = true;
    },

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

    removeImpression(item) {
      let _that = this;
      _that.$api
        .post({
          url: "/saleCustomerDetail/deleteImpression",
          data: {
            id: item.id
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          //获取印象
          _that.$api
            .post({
              url: "/saleCustomerDetail/getSaleCusImpressions",
              data: { id: _that.dataItem.id },
              headers: { "Content-Type": "application/json" }
            })
            .then(e => {
              let result = e.data;
              console.log("获取用户印象记录", e);
              if (result.code == 200) {
                //result.data.pageSum
                _that.$store.commit("updateImpress", {
                  impression: result
                });
              }
            })
            .catch(e => {
              console.log("获取印象记录失败");
              console.log(e);
            })
            .finally(() => {});
        })
        .catch(e => {
          console.log("takeLookRecord.vue------------", "添加印象失败");
          console.log("takeLookRecord.vue------------", e);
        })
        .finally(() => {});
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
            _that.$api
              .post({
                url: "/saleCustomerDetail/addImpression",
                data: {
                  impression: instance.inputValue,
                  customerId: _that.dataItem.id
                },
                headers: { "Content-Type": "application/json" }
              })
              .then(e => {
                let result = e.data;
                //获取印象
                _that.$api
                  .post({
                    url: "/saleCustomerDetail/getSaleCusImpressions",
                    data: { id: _that.dataItem.id },
                    headers: { "Content-Type": "application/json" }
                  })
                  .then(e => {
                    let result = e.data;
                    console.log("获取用户印象记录", e);
                    if (result.code == 200) {
                      //result.data.pageSum
                      _that.$store.commit("updateImpress", {
                        impression: result
                      });
                    }
                    done();
                    instance.confirmButtonLoading = false;
                  })
                  .catch(e => {
                    console.log("获取印象记录失败");
                    console.log(e);
                  })
                  .finally(() => {});
              })
              .catch(e => {
                console.log("takeLookRecord.vue------------", "添加印象失败");
                console.log("takeLookRecord.vue------------", e);
              })
              .finally(() => {});
            // console.log(
            //   "-----------5555555555555-----------------------------",
            //   instance.inputValue
            // );
            // // _that.insertImpression(instance.inputValue);
            // setTimeout(() => {
            //   // _that.impressionList.push({ text: instance.inputValue });
            //   done();
            //   instance.confirmButtonLoading = false;
            // }, 500);
          } else {
            done();
          }
        }
      })
        .then(value => {})
        .catch(() => {});
    },
    //搜索框获取员工信息
    search(e) {
      let name = e.target.value;
      let _that = this;
      _that.recommandPage.perName = name;
      _that.$api
        .post({
          url: "/saleCustomerDetail/getAccountInfo",
          data: _that.recommandPage,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          _that.employeePageInfo = e.data.data;
          console.log(e);
        })
        .catch(e => {
          console.log("takeLookRecord.vue------------", e);
        })
        .finally(() => {});
    },
    //底部分页按钮获取员工信息
    pageButtonSearch(obj) {
      let _that = this;
      _that.recommandPage.perName = obj.name;
      _that.recommandPage.page = obj.page;
      _that.$api
        .post({
          url: "/saleCustomerDetail/getAccountInfo",
          data: _that.recommandPage,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          _that.employeePageInfo = e.data.data;
          console.log(e);
        })
        .catch(e => {
          console.log("takeLookRecord.vue------------", e);
        })
        .finally(() => {});
    },
    //pass客户
    passAccount(account) {
      let _that = this;
      _that.$api
        .post({
          url: "/saleCustomerDetail/isCanPASS",
          data: {
            customerId: util.sessionLocalStorageGet("cosDetail:id")
          },
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          console.log(e);
          //获取返回结果
          let out = e.data.data;
          //判断是否能pass客户
          //可以pass客户，调用pass客户接口
          console.log("可以pass客户1", e);
          if (out == 1) {
            //接收人id
            let receiveOwner = account.accountId;
            console.log("可以pass客户2", e);
            //接收人部门id
            let deptParentId = account.deptParentId;
            console.log("可以pass客户3", e);
            //客户id
            let customerId = util.sessionLocalStorageGet("cosDetail:id");
            console.log("可以pass客户4", e);
            _that.$api
              .post({
                url: "/saleCustomerDetail/passCustomer",
                data: {
                  customerId: customerId,
                  receiveOwner: receiveOwner,
                  DeptParentID: deptParentId
                },
                headers: { "Content-Type": "application/json" }
              })
              .then(e => {
                let out = e.data.data;
                if (out == 1) {
                  this.$message({
                    type: "info",
                    message: "Pass成功,等待接收方确认"
                  });
                  _that.passPop = false;
                }
                if (out == -1) {
                  this.$message({
                    type: "info",
                    message: "Pass失败，接收方区域存在30天有交互记录的客户"
                  });
                }
                if (out == -2) {
                  this.$message({
                    type: "info",
                    message: "Pass失败，该客户存在一条记录未审核"
                  });
                }
                if (out == -3) {
                  this.$message({
                    type: "info",
                    message: "Pass失败，接收方存在相同号码的客户未审核"
                  });
                }
                if (out == -4) {
                  this.$message({
                    type: "info",
                    message: "Pass失败，接收方已存在该pass客户，并还未超过30天"
                  });
                }
                if (out == -5) {
                  this.$message({
                    type: "info",
                    message: "Pass失败，接收方和pass方不能相同"
                  });
                }
              })
              .catch(e => {
                console.log("takeLookRecord.vue------------", e);
              })
              .finally(() => {});

            console.log(receiveOwner, deptParentId, customerId);
          } else if (out == -1) {
            this.$message({
              type: "info",
              message: "距离上一次pass还未超过30天"
            });
          } else if (out == -2) {
            this.$message({
              type: "info",
              message: "没有权限操作"
            });
          } else if (out == -3) {
            this.$message({
              type: "info",
              message: "该客户还在等待，接收人操作"
            });
          } else if (out == -4) {
            this.$message({
              type: "info",
              message: "已有pass方"
            });
          }
        })
        .catch(e => {
          console.log("takeLookRecord.vue------------", e);
        })
        .finally(() => {});
    }
  }
};
</script>
