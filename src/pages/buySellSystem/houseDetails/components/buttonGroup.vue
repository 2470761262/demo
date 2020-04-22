<style lang="less" scoped>
.page-button-group {
  display: flex;
  justify-content: center;
  padding-top: 28px;
  padding-bottom: 60px;
  .button-set {
    margin-left: 0;
    &:last-child {
      margin-right: 0;
    }
    /deep/span {
      font-size: 22px;
    }
  }
  /deep/ .el-button {
    margin-right: 26px;
    height: 56px;
    /deep/span {
      font-size: 22px;
    }
  }
}
.node-centent {
  text-align: center;
  i {
    font-size: 60px;
    color: #fec354;
  }
  p {
    margin-top: 15px;
  }
}

.button-set {
  .iconfont {
    font-size: 31px;
    vertical-align: middle;
    color: #606266;
  }
  button[disabled="disabled"] {
    .iconfont {
      color: #c0c4cc;
    }
  }
  .button-title {
    vertical-align: middle;
  }
}
</style>
<template>
  <section>
    <div class="page-button-group">
      <!-- 发布外网 -->
      <div class="button-set">
        <el-button :disabled="isDisabled"
                   @click="certificateType"
                   v-if="resultData.isReleaseOutside!=1&&(resultData.AgentPer==perId||isShowButton.releaseOutsideHouse)&&resultData.plate!=4&&resultData.plate!=1">
          <i class="iconfabu iconfont el-icon--left"></i>
          <span class="button-title">发布外网</span>
        </el-button>
        <el-button :disabled="isDisabled"
                   v-if="resultData.isReleaseOutside==1&&(resultData.AgentPer==perId||isShowButton.cancelOutsideHouse)&&resultData.plate!=4&&resultData.plate!=1"
                   @click="cancelOutsideHouse">
          <i class="iconfabu iconfont el-icon--left"></i>
          <span class="button-title">取消发布</span>
        </el-button>
      </div>
      <!-- 总监推荐 -->
      <div class="button-set">
        <el-button :disabled="isDisabled"
                   @click="nodePop"
                   v-if="!isRecommend&&(inspector==true||Shopowner==true)">
          <i class="icontuijian iconfont el-icon--left"></i>
          <span class="button-title"
                v-if="inspector==true">总监推荐</span>
          <span class="button-title"
                v-if="Shopowner==true&&inspector==false">店长推荐</span>
        </el-button>
        <el-button :disabled="isDisabled"
                   v-if="isRecommend"
                   @click="nodePop">
          <i class="icontuijian iconfont el-icon--left"></i>
          <span class="button-title">取消推荐</span>
        </el-button>
      </div>
      <!-- 成交对赌 -->
      <div class="button-set">
        <el-button :disabled="isDisabled"
                   @click="showBetView"
                   v-if="!isBet&&resultData.AgentPer==perId&&resultData.plate!=4&&resultData.plate!=1">
          <i class="icontuijian iconfont el-icon--left"></i>
          <span class="button-title">成交对赌</span>
        </el-button>
      </div>
      <!-- 转房源状态 -->
      <div class="button-set">
        <el-button @click="changePopUp"
                   :disabled="isDisabled">
          <i class="iconzhuanhuan iconfont el-icon--left"></i>
          <span class="button-title">转房源状态</span>
        </el-button>
      </div>
      <!-- 取消作业方 -->
      <div class="button-set">
        <el-button :disabled="isDisabled"
                   @click="openPopUp('cencelTaskFlag')"
                   v-if="isShowButton.cancelMethod">
          <i class="iconfont iconquxiao el-icon--left"></i>
          <span class="button-title">取消角色人</span>
        </el-button>
      </div>
      <!-- 锁定房源 -->
      <div class="button-set">
        <el-button :disabled="isDisabled"
                   v-if="isShowButton.locking"
                   @click="houseLock">
          <i class="iconfont el-icon--left"
             :class="resultData.isLocking == 1 ? 'iconjiesuo':'iconsuoding'"></i>
          <span class="button-title">{{resultData.isLocking==1 ?"解锁房源":"锁定房源"}}</span>
        </el-button>
      </div>
      <!-- 修改钥匙存放门店 -->
      <div class="button-set"
           v-if="resultData.agentHouseMethod">
        <el-button :disabled="isDisabled||!(resultData.keyOwner>0)"
                   @click="openPopUp('keyStorageFlag')"
                   v-if="resultData.agentHouseMethod.keyOwner==perId||isShowButton.updateKeyStorageDept">
          <i class="iconyuechi iconfont el-icon--left"></i>
          <span class="button-title">修改钥匙存放门店</span>
        </el-button>
      </div>
    </div>
    <!-- 发布外网 -->
    <releasePop :visible.sync="releasePopFlag"
                width="300px"
                title
                maskHideEvent
                v-if="releasePopFlag"></releasePop>
    <!-- 成交对赌 -->
    <betPop :visible.sync="betPopFlag"
            v-if="betPopFlag"
            title="说明"
            maskHideEvent
            width="600px"></betPop>
    <!-- 转房源状态 -->
    <changeHouseType title
                     :visible.sync="typeFlag"
                     width="580px"
                     maskHideEvent
                     v-if="typeFlag"></changeHouseType>
    <!-- 取消作业方 -->
    <cancelTask title
                :visible.sync="cencelTaskFlag"
                width="680px"
                maskHideEvent
                v-if="cencelTaskFlag"></cancelTask>
    <!-- 修改存放门店 -->
    <keyStorage title="修改存放门店"
                :visible.sync="keyStorageFlag"
                width="320px"
                maskHideEvent
                v-if="keyStorageFlag"></keyStorage>
  </section>
</template>

<script>
//发布外网弹出层
import releasePop from "../didLog/releasePop";
//成交对赌
import betPop from "../didLog/betPop";
//转房源状态
import changeHouseType from "../didLog/changeHouseType";
//取消作业方
import cancelTask from "../didLog/cancelTask";
//存放门店
import keyStorage from "../didLog/keyStorage";
import util from "@/util/util";
//发布外网
import release from "../common/releaseHouse.js";
//房源审核
import houseCheck from "../common/houseCheck";
import but from "@/evenBus/but.js";
export default {
  inject: ["houseDetails", "houseId", "load", "buttonDisabled"],
  components: {
    releasePop,
    betPop,
    changeHouseType,
    cancelTask,
    keyStorage
  },
  computed: {
    isDisabled () {
      return this.buttonDisabled;
    },
    resultData () {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data;
      } else {
        return {};
      }
    }
  },
  data () {
    return {
      inspector: false,
      Shopowner: false,
      releasePopFlag: false,
      betPopFlag: false,
      typeFlag: false,
      cencelTaskFlag: false,
      keyStorageFlag: false,
      isShowButton: {
        locking: false,
        releaseOutsideHouse: false,
        cancelOutsideHouse: false,
        cancelMethod: false,
        deleteFollow: false,
        updateKeyStorageDept: false,
        telFollow: false,
        editAgentHouse: false
      }, //是否显示按钮
      perId: "", //登录人id
      isRecommend: false, //是否推荐
      isBet: true //是否正在对赌
    };
  },
  mounted () {
    this.getAgentRules();
    this.getisRecommend();
    this.getBetInfo();
  },
  created () {
    but.$on("getBetInfo", () => {
      this.getBetInfo;
    });
    if (util.localStorageGet("logindata")) {
      this.perId = util.localStorageGet("logindata").accountId;
      console.log(this.perId, "this.perId ");
    }
  },
  destroyed () {
    but.$off("getBetInfo");
  },
  methods: {
    //获取对赌结束时间
    getBetInfo () {
      var that = this;
      this.$api
        .get({
          url: "/house/bet/inBet/" + that.houseId.id
        })
        .then(e => {
          let data = e.data;
          if (data.data != null) {
            if (
              data.data.EndTime != null &&
              Date.parse(data.data.EndTime) > new Date().getTime()
            ) {
              that.isBet = true;
              but.$emit("betExpire", data.data.EndTime);
            }
          } else {
            that.isBet = false;
          }
        })
        .catch(e => { });
    },
    //获取对赌配置参数
    showBetView () {
      var that = this;
      this.$api
        .get({
          url: "/house/bet/conf"
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.betPopFlag = true;
            this.$nextTick(() => {
              but.$emit("betConf", data.data);
            });
          } else {
            this.$message.error({ message: data.message, offset: 400 });
          }
        })
        .catch(e => { });
    },
    //推荐或者取消推荐房源
    insertOrCancelRecommend (value) {
      let that = this;
      let url = "/agentHouse/recommend/insertRecommend";
      if (this.isRecommend) {
        url = "/agentHouse/recommend/cancelRecommend";
      }
      this.$api
        .post({
          url: url,
          data: {
            Eid: that.houseId.id,
            Memo: value
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.isRecommend = !that.isRecommend;
          } else {
            that.$message(result.message);
          }
        })
        .catch(e => { });
    },
    //打开推荐弹窗
    nodePop () {
      let that = this;
      this.$prompt(null, this.isRecommend ? "取消推荐" : "推荐房源", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入原因",
        inputType: "textarea",
        lockScroll: false,
        inputValidator: e => {
          if (!e) return "理由不能为空";
        },
        beforeClose (action, instance, done) {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            that.insertOrCancelRecommend(instance.inputValue);
            setTimeout(() => {
              done();
              instance.confirmButtonLoading = false;
            }, 500);
          } else {
            done();
          }
        }
      })
        .then(value => {
          console.log(action, instance, done);
        })
        .catch(() => { });
    },
    /**
     * 是否已经推荐
     */
    getisRecommend () {
      let that = this;
      this.$api
        .get({
          url: "/agentHouse/recommend/isRecommend",
          data: {
            houseId: this.houseId.id
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.data.length > 0) {
            result.data.forEach(element => {
              if (element.RecommendPer == that.perId) {
                that.isRecommend = true;
              }
            });
          } else {
            that.isRecommend = false;
          }
        })
        .catch(e => { });
    },
    //锁定或解锁房源
    houseLock () {
      let that = this;
      let isLocking = this.resultData.isLocking == 1 ? 0 : 1;
      if (this.resultData.isLocking == undefined) {
        this.$message("操作失败");
        return;
      }
      let params = {
        Eid: this.houseId.id,
        Islocking: isLocking
      };
      this.$api
        .post({
          url: "/agentHouse/property/locking",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false
        })
        .then(e => {
          let result = e.data;
          that.$message(result.message);
          if (result.code == 200) {
            that.resultData.isLocking = isLocking;
          }
        })
        .catch(e => { });
    },
    //获取按钮权限
    getAgentRules () {
      let that = this;
      this.$api
        .get({
          url: "/agent_house/detailsFunction"
        })
        .then(e => {
          e.data.data.functionRuleList.forEach(element => {
            if (element.rname == "总监推荐") {
              that.inspector = true
            }
            if (element.rname == "店长推荐") {
              that.Shopowner = true
            }
            if (that.isShowButton.hasOwnProperty(element.rUrl)) {
              that.isShowButton[element.rUrl] = true;
              if (element.rUrl == "deleteFollow") {
                but.$emit("deleteFollow");
              }
              if (element.rUrl == "telFollow") {
                but.$emit("telFollow");
              }
              if (element.rUrl == "editAgentHouse") {
                but.$emit("editAgentHouse");
              }
            }
          });
        })
        .catch(e => { });
    },
    async cancelOutsideHouse () {
      let params = {
        HouseNo: this.resultData.HouseNo
      };
      let reslut = await release.cancelOutsideHouse(params);
      if (reslut) {
        this.resultData.isReleaseOutside = 0;
        this.$message("操作成功");
      } else {
        this.$message("操作失败");
      }
    },
    //是否展示产权证号弹窗
    async certificateType () {
      if (parseInt(this.resultData.certificateType) != 1) {
        this.releasePopFlag = true;
      } else {
        let params = {
          houseId: this.houseId.id,
          houseType: 0
        };
        this.load.loadingMessage = "正在发布";
        this.load.loading = true;
        let reslut = await release.releaseOutsideHouse(params);
        this.load.loading = false;
        if (reslut) {
          this.resultData.isReleaseOutside = 1;
          this.$message("操作成功");
        } else {
          this.$message("操作失败");
        }
      }
    },
    //是否显示转状态弹窗
    async changePopUp () {
      let reslut = await houseCheck.isChecking(
        8,
        0,
        this.houseId.id,
        "当前正在审核"
      );
      if (!reslut) {
        this.typeFlag = true;
      }
    },
    openPopUp (PopName) {
      this[PopName] = true;
    },
    //钥匙存储
    keyStorage () {
      this.$prompt(null, "您的钥匙要存放哪个门店?", {
        confirmButtonText: "确定",
        showCancelButton: false,
        lockScroll: false
      })
        .then(value => {
          console.log(value);
        })
        .catch(() => { });
    },
    message (icon, text) {
      const h = this.$createElement;
      return this.$msgbox({
        title: "",
        lockScroll: false,
        customClass: "mini-message-box but-center",
        message: h(
          "div",
          {
            attrs: {
              class: "node-centent"
            }
          },
          [
            h("i", {
              attrs: {
                class: icon
              }
            }),
            h("p", null, text)
          ]
        ),
        showCancelButton: false,
        confirmButtonText: "确定"
      })
        .then(() => { })
        .catch(() => { });
    }
  }
};
</script>
