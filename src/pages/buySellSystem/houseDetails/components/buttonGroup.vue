<style lang="less" scoped>
.page-button-group {
  display: flex;
  justify-content: center;
  padding-top: 28px;
  padding-bottom: 60px;
  .button-set {
    margin-left: 0;
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
    /deep/span {
      font-size: 22px;
    }
  }
  /deep/ .el-button {
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
</style>
<template>
  <section>
    <div class="page-button-group">
      <!-- 发布外网 -->
      <div class="button-set">
        <el-button @click="certificateType"
                   v-if="resultData.isReleaseOutside!=1&&(resultData.AgentPer==perId||isShowButton.releaseOutsideHouse)">
          <i class="el-icon-s-promotion el-icon--left"></i>发布外网
        </el-button>
        <el-button v-if="resultData.isReleaseOutside==1&&(resultData.AgentPer==perId||isShowButton.cancelOutsideHouse)"
                   @click="cancelOutsideHouse">
          <i class="el-icon-s-promotion el-icon--left"></i>取消发布
        </el-button>
      </div>
      <!-- 成交对赌 -->
      <div class="button-set">
        <el-button @click="openPopUp('betPopFlag')">
          <i class="el-icon-s-promotion el-icon--left"></i>成交对赌
        </el-button>
      </div>
      <!-- 转房源状态 -->
      <div class="button-set">
        <el-button @click="changePopUp">
          <i class="el-icon-s-promotion el-icon--left"></i>转房源状态
        </el-button>
      </div>
      <!-- 取消作业方 -->
      <div class="button-set">
        <el-button @click="openPopUp('cencelTaskFlag')"
                   v-if="isShowButton.cancelMethod">
          <i class="el-icon-s-promotion el-icon--left"></i>取消作业方
        </el-button>
      </div>
      <!-- 锁定房源 -->
      <div class="button-set">
        <el-button v-if="isShowButton.locking"
                   @click="houseLock">
          <i class="el-icon-s-promotion el-icon--left"></i>{{resultData.isLocking==1 ?"解锁房源":"锁定房源"}}
        </el-button>
      </div>
      <!-- 修改钥匙存放门店 -->
      <div class="button-set"
           v-if="resultData.agentHouseMethod">
        <el-button @click="openPopUp('keyStorageFlag')"
                   v-if="resultData.agentHouseMethod.keyOwner==perId||isShowButton.updateKeyStorageDept">
          <i class="el-icon-s-promotion el-icon--left"></i>修改钥匙存放门店
        </el-button>
      </div>
    </div>
    <!-- 发布外网 -->
    <releasePop :visible.sync="releasePopFlag"
                width="300px"
                title=""
                maskHideEvent
                v-if="releasePopFlag"></releasePop>
    <!-- 成交对赌 -->
    <betPop :visible.sync="betPopFlag"
            v-if="betPopFlag"
            title="说明"
            maskHideEvent
            width="600px"></betPop>
    <!-- 转房源状态 -->
    <changeHouseType title=""
                     :visible.sync="typeFlag"
                     width="580px"
                     maskHideEvent
                     v-if="typeFlag"></changeHouseType>
    <!-- 取消作业方 -->
    <cancelTask title=""
                :visible.sync="cencelTaskFlag"
                width="680px"
                maskHideEvent
                v-if="cencelTaskFlag">
    </cancelTask>
    <keyStorage title='修改存放门店'
                :visible.sync="keyStorageFlag"
                width="320px"
                maskHideEvent
                v-if="keyStorageFlag">

    </keyStorage>
  </section>
</template>

<script>
//发布外网弹出层
import releasePop from '../didLog/releasePop';
//成交对赌
import betPop from '../didLog/betPop';
//转房源状态
import changeHouseType from '../didLog/changeHouseType';
//取消作业方
import cancelTask from '../didLog/cancelTask';
//存放门店
import keyStorage from '../didLog/keyStorage';
import util from "@/util/util";
//发布外网
import release from "../common/releaseHouse.js"
//房源审核
import houseCheck from "../common/houseCheck";
import but from "@/evenBus/but.js";
export default {
  inject: ["houseDetails", "houseId", "load"],
  components: {
    releasePop,
    betPop,
    changeHouseType,
    cancelTask,
    keyStorage
  },
  computed: {
    resultData () {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data
      } else {
        return {};
      }
    }
  },
  data () {
    return {
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
        telFollow: false
      },//是否显示按钮
      perId: "",//登录人id
    }
  },
  mounted () {
    this.getAgentRules();
    if (util.localStorageGet("logindata")) {
      this.perId = util.localStorageGet("logindata").accountId;
    }
  },
  methods: {
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
        .catch(e => {

        });
    },
    //获取按钮权限
    getAgentRules () {
      let that = this;
      this.$api.get({
        url: '/sys/rule/function/list',
        data: {
        },
        token: false
      }).then((e) => {
        e.data.data.functionRuleList.forEach(element => {
          if (that.isShowButton.hasOwnProperty(element.rUrl)) {
            that.isShowButton[element.rUrl] = true;
            if (element.rUrl == 'deleteFollow') {
              but.$emit("deleteFollow");
            }
            if (element.rUrl == "telFollow") {
              but.$emit("telFollow");
            }
          }
        })
      }).catch((e) => {
      })
    },
    async  cancelOutsideHouse () {
      let params = {
        HouseNo: this.resultData.HouseNo
      }
      let reslut = await release.cancelOutsideHouse(params);
      if (reslut) {
        this.resultData.isReleaseOutside = 0;
        this.$message("操作成功");
      }
      else {
        this.$message("操作失败");
      }
    },
    //是否展示产权证号弹窗
    async certificateType () {
      if (parseInt(this.resultData.certificateType) != 1) {
        this.releasePopFlag = true;
      }
      else {
        let params = {
          houseId: this.houseId.id,
          houseType: 0
        }
        this.load.loadingMessage = "正在发布";
        this.load.loading = true;
        let reslut = await release.releaseOutsideHouse(params);
        this.load.loading = false;
        if (reslut) {
          this.resultData.isReleaseOutside = 1;
          this.$message("操作成功");
        }
        else {
          this.$message("操作失败");
        }
      }
    },
    //是否显示转状态弹窗
    async  changePopUp () {
      let reslut = await houseCheck.isChecking(8, 0, this.houseId.id, "当前正在审核");
      if (!reslut) {
        this.typeFlag = true;
      }
    },
    openPopUp (PopName) {
      this[PopName] = true;
    },
    //钥匙存储
    keyStorage () {
      this.$prompt(null, '您的钥匙要存放哪个门店?', {
        confirmButtonText: '确定',
        showCancelButton: false,
        lockScroll: false,
      }).then((value) => {
        console.log(value);
      }).catch(() => {

      })
    },
    message (icon, text) {
      const h = this.$createElement;
      return this.$msgbox({
        title: '',
        lockScroll: false,
        customClass: 'mini-message-box but-center',
        message: h('div', {
          attrs: {
            class: 'node-centent'
          }
        }, [
          h('i', {
            attrs: {
              class: icon
            }
          }),
          h('p', null, text)
        ]),
        showCancelButton: false,
        confirmButtonText: '确定',
      }).then(() => {

      }).catch(() => {

      })
    },
  },
}
</script>
