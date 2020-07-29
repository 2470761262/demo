<style lang="less" scoped>
.cur-cell {
  font-size: @font15;
  // prettier-ignore
  margin-bottom: 20PX;
  .el-icon-view {
    // prettier-ignore
    margin-left: 20PX;
    font-size: @font16;
    cursor: pointer;
  }
}
.btn-item {
  display: block;
  background: @backgroud;
  // prettier-ignore
  width: 100PX;
  outline: none;
  border: none;
  color: #fff;
  // prettier-ignore
  height: 40PX;
  margin: 0 auto;
  cursor: pointer;
  &[disabled] {
    background: #f2f2f2;
    color: #999;
    cursor: no-drop;
  }
}
</style>
<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners">
    <template>
      <div class="cur-cell">
        <span>业主姓名：</span>
        <span>{{ houseData.Customers | emptyRead }}</span>
      </div>
      <div class="cur-cell" v-if="telData.Tel != null && telData.Tel != ''">
        <span>手机号：</span>
        <span>{{ telData.Tel }}</span>
        <span class="el-icon-view" title="查看号码"></span>
      </div>
      <div class="cur-cell" v-if="telData.Tel1 != null && telData.Tel1 != ''">
        <span>手机号：</span>
        <span>{{ telData.Tel1 }}</span>
        <span class="el-icon-view" title="查看号码"></span>
      </div>
      <div class="cur-cell" v-if="telData.Tel2 != null && telData.Tel2 != ''">
        <span>手机号：</span>
        <span>{{ telData.Tel2 }}</span>
        <span class="el-icon-view" title="查看号码"></span>
      </div>
      <div class="cur-cell" v-if="telData.Tel3 != null && telData.Tel3 != ''">
        <span>手机号：</span>
        <span>{{ telData.Tel3 }}</span>
        <span class="el-icon-view" title="查看号码"></span>
      </div>

      <button
        @click="oneTouchDialPhone"
        class="btn-item"
        :disabled="!reloData.dialPhone"
      >
        一键拨号
      </button>
    </template>
  </fixedPopup>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      houseData: state => state.houseDateil.houseData,
      reloData: state => state.houseDateil.reloData
    })
  },
  watch: {
    houseData: {
      immediate: true,
      handler: function(val, oldVal) {
        this.telData = {
          Tel: {
            value: val.Tel
          },
          Tel1: val.Tel1,
          Tel2: val.Tel2,
          Tel3: val.Tel3
        };
        console.log(this.telData, "this.telData");
      }
    }
  },
  data() {
    return {
      telData: {}
    };
  },
  methods: {
    contactOwer(cmd) {
      let p = {};
      p["contactPhone" + cmd] = this.houseData["Tel" + cmd];
      p["isLookPhone"] = true;
      this.dailPhone(1, p);
    },
    /**
     * @example: 一键拨号
     */
    oneTouchDialPhone() {
      let phone = this.houseData.agentPerTel;
      if (!phone) {
        this.$message({
          message: "该经纪人号码为空"
        });
        return;
      }
      let p = {
        contactPhone: phone
      };
      this.dailPhone(1, p);
    },
    dailPhone(contactPerType, phoneObj) {
      let that = this;
      //console.log(that.houseDetails);
      this.$confirm("确定一键拨号吗？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showConfirmButton: that.reloData.dialPhone
      })
        .then(() => {
          let oldParams = {
            houseId: that.houseId,
            houseType: 0,
            housePrice: that.houseData.Price,
            houseArea: that.houseData.InArea,
            contactPerType: contactPerType, //电话联系人类型，0为经纪人，1为业主
            remark: that.houseData.Title
          };
          let dailParams = {};
          Object.assign(dailParams, oldParams, phoneObj);
          if (contactPerType == 0) {
            //联系人类型如果是经纪人，才需要联系人id
            dailParams.contactPerId = that.houseData.AgentPer; //联系人id
            dailParams.unitName = that.houseData.agentPerDepartmentName;
            dailParams.contactPerName = that.houseData.agentPerName;
          } else {
            dailParams.unitName = that.houseData.CommunityName; //联系人是业主，名称取小区名
            dailParams.contactPerName = that.houseData.Customers;
          }
          that.$api
            .post({
              url: "/noticeManage/common/OneTouchDialPhone",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: dailParams
            })
            .then(e => {
              let result = e.data;
              if (result.code == 200) {
                this.$message({
                  type: "info",
                  message: "请注意查收微信消息"
                });
                this.$emit("update:visible", false);
              } else {
                this.$message({
                  type: "info",
                  message: result.message
                });
              }
            })
            .catch(e => {
              console.log("【【【【uups,一键拨号失败】】】】");
              console.log(e);
              this.$message({
                type: "info",
                message: "一键拨号失败"
              });
            });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: "取消拨号"
          });
        });
    }
  }
};
</script>
