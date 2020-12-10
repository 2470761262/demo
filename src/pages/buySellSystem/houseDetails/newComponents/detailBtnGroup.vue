<style lang="less" scoped>
.detail-btn-group {
  display: flex;
  flex-direction: column;
  border: 1px solid #d5d5d5;
  // prettier-ignore
  margin: 0 8PX 0 13PX;
  .btn-item {
    // prettier-ignore
    width: 100PX;
    // prettier-ignore
    height: 55PX;
    font-size: @font16;
    outline: none;
    border: none;
    background: #fff;
    border-bottom: 1px solid #d5d5d5;
    //transition: background 0.2s ease-in;
    cursor: pointer;
    &[disabled]:hover {
      background: none;
      color: #999;
      cursor: no-drop;
    }
    &:hover {
      background: @backgroud;
      color: #fff;
    }
    // &:last-child {
    //   border-bottom: none;
    // }
    .iconhot {
      // prettier-ignore
      margin-left: -16PX;
      // prettier-ignore
      font-size: 16PX;
      color: red;
    }
    .el-icon-question {
      color: #327257;
      &:hover {
        color: #fff;
      }
    }
  }
}
.role-btn {
  outline: none;
  border: none;
  background: @backgroud;
  font-size: @font14;
  color: #fff;
  // prettier-ignore
  padding: 5PX 10PX;
  border-radius: 4px;
  cursor: pointer;
  &[disabled] {
    background: #fff;
    color: #c0c4cc;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    cursor: no-drop;
  }
}
.text-middle {
  text-align: center;
  // prettier-ignore
  padding: 10PX 0;
  border-top: 1px solid #d3d3d3;
}
</style>
<style lang="less">
// .popover-phone {
//   // prettier-ignore
//   height: 300PX;
// }
</style>
<template>
  <div class="detail-btn-group">
    <button
      class="btn-item"
      style="order:0"
      :disabled="isLockBtn"
      @click="
        openPop(
          'shareFlag',
          isShare,
          '房源图片少于一张，不允许进行分享，请尽快上传'
        )
      "
    >
      分享房源
    </button>
    <button
      class="btn-item"
      style="order:0"
      @click="openPop('phonePopFlag')"
      :disabled="isLockBtn"
    >
      一键拨号
    </button>
    <button
      class="btn-item"
      style="order:3"
      @click="openPop('interviewFlag', isInterviewDisabled)"
      :disabled="isLockBtn"
    >
      添加面访
    </button>
    <button
      class="btn-item"
      style="order:0"
      v-if="isEditHouse || houseData.plate == 1 || houseData.plate == 4"
      @click="navRouter"
      :disabled="isLockBtn"
    >
      编辑房源
    </button>
    <button
      class="btn-item"
      style="order:0"
      v-if="isEditPicture"
      :disabled="isLockBtn"
      @click="openPop('houseUploadflag')"
    >
      编辑图片
    </button>
    <button
      class="btn-item"
      style="order:2"
      @click="openPop('followUpFlag')"
      :disabled="isLockBtn"
    >
      添加跟进
    </button>
    <button
      class="btn-item"
      style="order:4"
      :disabled="outBtnDisabled || isLockBtn"
      v-if="isOutBtn"
      @click="certificateType"
    >
      发布外网
    </button>
    <button
      class="btn-item"
      style="order:4"
      :disabled="cancelBtnDisabled || isLockBtn"
      v-if="isCancelBtn"
      @click="cancelOutsideHouse"
    >
      取消发布
    </button>
    <button
      class="btn-item"
      style="order:5"
      @click="joinOtherResource"
      v-if="publishBtnType == 1"
      :disabled="isLockBtn"
    >
      <i class="iconfont iconhot"></i>发布58
      <!-- <i class="el-icon-question"></i> -->
    </button>
    <button
      class="btn-item"
      style="order:6"
      :disabled="!reloData.locking"
      @click="houseLock"
    >
      {{ isLockBtn ? "解锁房源" : "锁定房源" }}
    </button>
    <button
      class="btn-item"
      style="order:8"
      :disabled="!reloData.cancelMethod || isLockBtn"
      @click="openPop('cancelTaskFlag')"
    >
      取消角色人
    </button>
    <button
      class="btn-item"
      style="order:0"
      @click="openPop('typeFlag')"
      :disabled="isLockBtn"
    >
      转换状态
    </button>
    <button class="btn-item" style="order:7" @click="tips">
      关注小区
    </button>

    <!-- 写跟进 -->
    <follow-up :visible.sync="followUpFlag" v-if="followUpFlag" />
    <!-- 查看号码 -->
    <phone-pop
      title="业主联系方式"
      width="500px"
      :visible.sync="phonePopFlag"
      v-if="phonePopFlag"
    />
    <!-- 发布外网 -->
    <release-pop
      :visible.sync="releasePopFlag"
      width="300px"
      title
      maskHideEvent
      v-if="releasePopFlag"
    />

    <!-- 转房源状态 -->
    <change-house-type
      title
      :visible.sync="typeFlag"
      width="580px"
      maskHideEvent
      v-if="typeFlag"
    />

    <!-- 取消作业方 -->
    <cancelTask
      title
      :visible.sync="cancelTaskFlag"
      width="680px"
      maskHideEvent
      v-if="cancelTaskFlag"
    />

    <!-- 面访 -->
    <interview-pop
      :visible.sync="interviewFlag"
      title="添加面访"
      width="1000PX"
      v-if="interviewFlag"
    />

    <!-- 分享 -->
    <share-pop
      :visible.sync="shareFlag"
      :shareUrl="appletQRCode"
      title="分享房源"
      width="400PX"
      v-if="shareFlag"
    >
    </share-pop>
    <!-- 上传 -->
    <fixedPopup
      :visible.sync="houseUploadflag"
      title
      v-if="houseUploadflag"
      width="960px"
    >
      <houseUploadExtends
        @reLoadPage="reLoadPage"
        ref="houseUploadExtends"
        :houseId="houseId"
        :paramsObj="paramsObj"
        :getData="true"
      ></houseUploadExtends>
      <template v-slot:floot>
        <div class="text-middle">
          <el-button class="role-btn" @click="submitUpload">
            提交
          </el-button>
        </div>
      </template>
    </fixedPopup>
  </div>
</template>

<script>
import util from "@/util/util";
import { mapState, mapActions, mapMutations } from "vuex";
//发布外网
import release from "../common/releaseHouse.js";
//房源审核
import houseCheck from "../common/houseCheck";
export default {
  components: {
    followUp: () => import("../newDidLog/followUp"),
    phonePop: () => import("../newDidLog/phonePop"),
    releasePop: () => import("../newDidLog/releasePop"),
    changeHouseType: () => import("../newDidLog/changeHouseType"),
    cancelTask: () => import("../newDidLog/cancelTask"),
    interviewPop: () => import("../newDidLog/interviewPop"),
    sharePop: () => import("../newDidLog/sharePop"),
    //上传图片
    houseUploadExtends: () => import("../newDidLog/houseUploadExtends")
  },
  props: {
    publishBtnType: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      houseData: state => state.houseDateil.houseData,
      reloData: state => state.houseDateil.reloData,
      betData: state => state.houseDateil.betData
    }),
    //发布外网按钮是否禁用
    outBtnDisabled() {
      return (
        !this.reloData.releaseOutsideHouse || this.houseData.isLocking == 1
      );
    },
    //发布外网按钮是否显示
    isOutBtn() {
      return this.houseData.isReleaseOutside != 1 && this.houseData.plate == 0;
    },
    //取消发布外网
    cancelBtnDisabled() {
      //return !this.reloData.cancelOutsideHouse || this.houseData.isLocking == 1;
      return  this.houseData.isLocking == 1;
    },
    //取消发布外网按钮是否显示
    isCancelBtn() {
      return (
        this.houseData.isReleaseOutside == 1 &&
        this.houseData.AgentPer == this.perId &&
        this.houseData.plate == 0
      );
    },
    //房源是否被锁定
    isLockBtn() {
      if (this.houseData.isLocking) {
        return true;
      }
      return false;
    },
    //编辑房源是否禁用
    editHouseDisabled() {
      if (this.houseData.plate > 6 || this.houseData.isLocking) {
        return true;
      }
      return false;
    },
    //是否显示编辑房源
    isEditHouse() {
      if (
        this.houseData.plate == 0 &&
        this.getEditAuthority(
          this.betData.find(item => item.rUrl == "editAgentHouse")
            ?.authorityUnderName,
          this.houseData
        )
      ) {
        return true;
      }
      return false;
    },
    //是否显示编辑图片
    isEditPicture() {
      let editAgentPicture = this.betData.find(
        item => item.rUrl == "editAgentPicture"
      );
      if (editAgentPicture) {
        if (
          this.houseData.plate == 0 &&
          this.getEditAuthority(
            editAgentPicture.authorityUnderName,
            this.houseData
          )
        ) {
          return true;
        } //判断跟单人是否在数据权限范围内
        return this.getRoleAuthority(
          editAgentPicture.authorityUnderName,
          this.houseData
        ); //判断角色人是否存在
      }
      return false;
    },
    //面访按钮禁用
    isInterviewDisabled() {
      //暂时不做控制
      // return !(this.houseData.AgentPer == this.perId);
      return false;
    },
    //是否能打开分享弹框
    isShare() {
      return !this.houseData.shareQRCode;
    }
  },
  data() {
    return {
      paramsObj: {
        buttonText: "保存",
        editUrl: "/agent_house/editAgentHouse",
        getAudioUrl: "/agentHouse/audio/getAudioList/",
        getEditUrl: "/agent_house/getEditDetails/",
        getPicturesUrl: "/agentHouse/pictures/getPicturesList/",
        getVideoUrl: "/agentHouse/video/getVideoList/"
      },
      perId: util.localStorageGet("logindata").accountId,
      followUpFlag: false, //跟进弹框开关
      phonePopFlag: false, //查看号码开关
      releasePopFlag: false, //发布外网
      typeFlag: false, // 转状态按钮
      cancelTaskFlag: false, //取消角色人开关
      interviewFlag: false, //添加面访开关
      shareFlag: false, //分享弹框
      appletQRCode: "", //小程序分享二维码
      houseUploadflag: false, //上传图片弹窗,
      echoData: []
    };
  },
  methods: {
    /**
     * @example: 重新加载页面
     */
    reLoadPage() {
      this.$nextTick(() => {
        this.$router.go(0);
      });
    },
    /**
     * @example:编辑图片提交
     */
    submitUpload() {
      this.$refs.houseUploadExtends.validateAll().then(e => {
        if (e) {
          this.houseUploadflag = false;
          this.$message({
            message: "编辑成功"
          });
        }
      });
    },
    ...mapMutations(["setParam"]),
    ...mapActions(["commitHouseData"]),
    /**
     * @example: 发布58
     */
    joinOtherResource() {
      this.$parent.dialogJoinResourceVisible = true;
    },
    getEditAuthority(authorityUnderName, houseDatails) {
      if (!authorityUnderName) return;
      return (
        (authorityUnderName.coIdList &&
          authorityUnderName.coIdList.includes(
            houseDatails.agentPerCompanyId
          )) ||
        (authorityUnderName.deptList &&
          authorityUnderName.deptList.includes(
            houseDatails.agentPerDepartmentId
          )) ||
        (authorityUnderName.accountId &&
          houseDatails.AgentPer == authorityUnderName.accountId)
      );
    },
    /**
     * 获取除跟单人外角色人数据权限
     */
    getRoleAuthority(authorityUnderName, houseDatails) {
      if (!authorityUnderName || !houseDatails.agentHouseMethod) return false;
      let roleArray = ["addPer", "keyOwner", "onlyOwner", "realOwner"];
      for (let item in roleArray) {
        let value = roleArray[item];
        if (
          (authorityUnderName.coIdList &&
            authorityUnderName.coIdList.includes(
              houseDatails.agentHouseMethod[value + "CompanyId"]
            )) ||
          (authorityUnderName.deptList &&
            authorityUnderName.deptList.includes(
              houseDatails.agentHouseMethod[value + "DepartmentId"]
            )) ||
          (authorityUnderName.accountId &&
            houseDatails.agentHouseMethod[value] ==
              authorityUnderName.accountId)
        ) {
          return true;
        }
      }
      return false;
    },
    //是否显示转状态弹窗
    async changePopUp() {
      let result = await houseCheck.isChecking(
        8,
        0,
        this.houseId,
        "当前正在审核"
      );
      if (!result) {
        this.typeFlag = true;
      }
    },
    //是否展示产权证号弹窗
    async certificateType() {
      // if (parseInt(this.houseData.certificateType) != 1) {
      //   this.releasePopFlag = true;
      // } else {
      let params = {
        houseId: this.houseId,
        houseType: 0
      };
      const loading = this.$loading({
        lock: true,
        text: "发布外网中..."
      });
      let result = await release.releaseOutsideHouse(params);
      loading.close();
      if (result.data.code == 200) {
        this.commitHouseData({
          isReleaseOutside: 1
        });
        this.$message(result.data.message);
      } else {
        this.$message("操作失败");
      }
      // }
    },
    /**
     * @example: 按鈕組点击事件 事件分发
     * @param {Ojbect} item  当前点击对象
     */
    setBtnIndex(item) {
      if (item.fun && this[item.fun]) {
        this[item.fun](item);
      }
    },
    //取消发布外网
    async cancelOutsideHouse() {
      let params = {
        HouseNo: this.houseData.HouseNo,
        id: this.houseId
      };
      let result = await release.cancelOutsideHouse(params);
      if (result) {
        this.commitHouseData({
          isReleaseOutside: 0
        });
        this.$message(result);
      } else {
        this.$message("操作失败");
      }
    },
    /**
     * @example: 打开弹框
     * @param {string} item 弹框的开关名字
     * @param { boolean }isPermissions 是否需要提升没有权限
     */
    openPop(item, isPermissions, message = "不是跟单人没有权限操作") {
      // 图片视频上传组件
      if (item == "houseUploadflag") {
        this.echoData = [
          ...this.houseData.saleUploadPicDtoList,
          ...this.houseData.saleUploadVideoDtoList
        ];
      }
      if (isPermissions != undefined && isPermissions) {
        return this.$message.error(message);
      }
      if (typeof item == "object") {
        this[item.pop] = true;
      } else {
        this[item] = true;
      }
      console.log("==item===>", item);
      if (item == "shareFlag") {
        this.getAppletQRCode();
      }
    },
    getAppletQRCode() {
      let that = this;
      const json = this.$api
        .get({
          url: "outsideHouse/getAppletQRCode",
          data: {
            houseId: this.houseId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.commitHouseData({
              isReleaseOutside: 1
            });
            that.appletQRCode = e.data.data;
          }
        });
    },
    //锁定或解锁房源
    houseLock() {
      let isLocking = this.houseData.isLocking == 1 ? 0 : 1;
      if (this.houseData.isLocking == undefined) {
        this.$message("操作失败");
        return;
      }
      const loading = this.$loading({
        lock: true,
        text: "操作房源锁定按钮中..."
      });
      this.$api
        .post({
          url: "/agentHouse/property/locking",
          data: {
            Eid: this.houseId,
            Islocking: isLocking
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          this.$message(result.message);
          if (result.code == 200) {
            this.setParam({
              paramName: "followUpdate",
              value: new Date().getTime()
            });
            this.commitHouseData({
              isLocking: isLocking
            });
            this.$router.go(0);
          }
        })
        .catch(e => {})
        .finally(e => {
          loading.close();
        });
    },
    /**
     * @example: 编辑房源
     */
    navRouter() {
      this.$router.push({
        name: "addHouse",
        params: {
          id: this.houseId,
          method: "edit",
          paramsObj: {
            getEditUrl: "/agent_house/getEditDetails/",
            buttonText: "保存",
            editUrl: "/agent_house/editAgentHouse",
            getAudioUrl: "/agentHouse/audio/getAudioList/",
            getPicturesUrl: "/agentHouse/pictures/getPicturesList/",
            getVideoUrl: "/agentHouse/video/getVideoList/"
          }
        }
      });
    },
    tips() {
      this.$alert("新功能开发中，敬请期待~", "提示信息", {
        confirmButtonText: "确定"
      });
    }
  }
};
</script>
