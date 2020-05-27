<style lang="less" scoped>
.didLog {
  /deep/.didLog-content-sroll {
    padding: 0 !important;
    width: 350px;
  }
}
.pop-custome-head {
  width: 200px;
  font-size: 15px;
  margin-bottom: 15px;
  padding-left: 15px;
  .custome-head-tips {
    color: #666;
    font-size: inherit;
    .icon {
      margin-right: 5px;
    }
  }
  .custome-head-name {
    text-indent: 21px;
    margin-top: 5px;
  }
  .retrievalInfo- {
    font-size: 13px;
    &success {
      color: #40a375;
    }
    &error {
      color: red;
    }
  }
}
.tel-content {
  padding: 15px;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  display: flex;
  .pop-custome-head {
    width: 100%;
    padding-left: 0;
    margin-bottom: 0;
  }
  .call-phone {
    align-self: center;
    width: 35px;
    height: 35px;
    color: #fff;
    background: #40a375;
    border-radius: 50%;
    font-size: 22px;
    text-align: center;
    line-height: 35px;
  }
}
.pop-custome-foot {
  text-align: center;
  padding: 10px 0;
}
</style>
<template>
  <fixedPopup v-bind="$attrs" v-on="$listeners" class="didLog">
    <template>
      <div class="pop-custome-head">
        <h3 class="custome-head-tips">
          <i class="el-icon-s-custom icon"></i>业主姓名
        </h3>
        <div class="custome-head-name">{{ data.customerName }}</div>
      </div>
      <div class="tel-content">
        <div class="pop-custome-head">
          <h3 class="custome-head-tips">
            <i class="el-icon-phone icon"></i>录入电话
            <span
              :class="
                retrievalInfo == '首次出现'
                  ? 'retrievalInfo-success'
                  : 'retrievalInfo-error'
              "
              >({{ retrievalInfo | emptyRead }})</span
            >
          </h3>
          <div class="custome-head-name">{{ data.tel }}</div>
        </div>
        <i class="el-icon-phone call-phone" @click="dailPhone(data.id)"></i>
      </div>
      <div class="tel-content">
        <div class="pop-custome-head">
          <h3 class="custome-head-tips">
            <i class="el-icon-phone icon"></i>验真电话
          </h3>
          <div class="custome-head-name">{{ data.checkTel }}</div>
        </div>
        <i
          class="el-icon-phone call-phone"
          @click="dailPhone(data.id)"
          v-if="data.checkTel != '-' && data.checkTel != ''"
        ></i>
      </div>
      <div class="pop-custome-foot">
        <el-button type="info" size="mini" @click="cancel">关闭</el-button>
      </div>
    </template>
  </fixedPopup>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.getTelRetrieval();
  },
  data() {
    return {
      retrievalInfo: ""
    };
  },
  methods: {
    getTelRetrieval() {
      this.$api
        .post({
          url: `/verifyHouse/listTelRetrieval/${this.data.id}`,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {}
        })
        .then(e => {
          console.log(e);
          this.retrievalInfo = e.data.data.retrievalInfo;
        })
        .catch(e => {});
    },
    cancel() {
      this.$emit("update:visible", false);
    },
    dailPhone(id) {
      this.$confirm("确定一键拨号吗？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          let params = {
            draftId: id,
            houseType: 0
          };
          this.$api
            .post({
              url: "/noticeManage/common/DraftOneTouchDialPhone",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: params
            })
            .then(e => {
              let result = e.data;
              console.log(result);
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
