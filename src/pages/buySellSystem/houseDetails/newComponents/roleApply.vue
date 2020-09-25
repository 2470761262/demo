<style lang="less" scoped>
@import "../newLess/cardContent";
.role-content {
  margin-top: 17px;
  .card-content;

  .card-message-content {
    display: flex;
    flex-wrap: wrap;
    // prettier-ignore
    padding: 20PX 30PX;
    // prettier-ignore
    margin: 0 -10PX;
    .role-item {
      display: flex;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      // prettier-ignore
      flex: 0 0 calc(( 100% - 60PX)  / 3);
      // prettier-ignore
      margin: 0 10PX;
      // prettier-ignore
      min-height: 89PX;
      box-sizing: border-box;
      &:nth-child(-n + 3) {
        // prettier-ignore
        margin-bottom: 30PX;
      }
      @media screen and (max-width: 1700px) {
        & {
          // prettier-ignore
          flex: 0 0 calc(( 100% - 40PX)  / 2) ;
          &:nth-child(-n + 4) {
            // prettier-ignore
            margin-bottom: 30PX;
          }
        }
      }
      .role-img {
        // prettier-ignore
        width: 58PX;
        // prettier-ignore
        height: 58PX;
        border-radius: 50%;
        object-fit: cover;
        // prettier-ignore
        margin-left: 20PX;
        // prettier-ignore
        padding: 10PX 0;
      }
      .role-middle {
        flex: 1;
        // prettier-ignore
        text-indent: 20PX;
        // prettier-ignore
        padding: 10PX 0;
        color: #727272;
        width: 0;
        .role-title {
          font-size: @font16;
          font-weight: 600;
          color: #535353;
        }
        .role-store,
        .role-phone {
          font-size: @font14;
        }
      }
      .role-type {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .role-type-top {
          font-size: @font13;
          border-radius: 4px;
          background: @backgroud;
          padding: 4px 6px;
          color: #fff;
        }
        .role-type-center {
          font-size: @font12;
          border-radius: 50%;
          display: flex;
          background: @backgroud;
          width: 29px;
          height: 29px;
          line-height: 29px;
          margin-left: 25px;
          text-align: center;
          justify-content: center;
          color: #fff;
        }
        .role-type-bottom {
          font-size: @font12;

          display: flex;
          justify-content: flex-end;
          cursor: pointer;
          .role-type-title {
            border-radius: 50%;
            background: @backgroud;
            color: #fff;
            text-align: center;
            // prettier-ignore
            width: 30PX;
            // prettier-ignore
            height: 30PX;
            // prettier-ignore
            line-height: 30PX;
            &.type-vr {
              // prettier-ignore
              width: 50PX;
              padding: 0;
              border: none;
              font-size: @font12;
              cursor: pointer;
              &:disabled {
                background: #c8c9cc;
                cursor: no-drop;
              }
            }
          }
        }
      }
      &.role-btn-cotnent {
        align-items: center;
        justify-content: center;
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
}
</style>
<template>
  <div class="role-content">
    <div class="card-head">
      <h3 class="card-head-title">角色人申请</h3>
    </div>
    <div class="card-message-content">
      <!-- 录入人 -->
      <div class="role-item">
        <img
          class="role-img"
          :src="houseData.agentHouseMethod.addPerHeadImg | defaultImg"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">
            {{ houseData.agentHouseMethod.addPerName | emptyRead }}
          </div>
          <div class="role-store overText">
            门店:
            {{ houseData.agentHouseMethod.addPerDepartmentName | emptyRead }}
          </div>
          <div class="role-phone overText">
            电话:{{ houseData.agentHouseMethod.addPerTel | emptyRead }}
          </div>
        </div>
        <div class="role-type">
          <div class="role-type-top">录入人</div>
        </div>
      </div>
      <!-- 存在跟单人 -->
      <div class="role-item" v-if="isAgentPer">
        <img
          class="role-img"
          :src="houseData.agentPerHeadImg | defaultImg"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">{{ houseData.agentPerName }}</div>
          <div class="role-store overText">
            门店:{{ houseData.agentPerDepartmentName }}
          </div>
          <div class="role-phone overText">
            电话:{{ houseData.agentPerTel | emptyRead }}
          </div>
        </div>
        <div class="role-type">
          <div class="role-type-top">跟单人</div>
        </div>
      </div>
      <!-- 是否有权限申请跟单人 -->
      <div class="role-item role-btn-cotnent" v-else-if="isAgentPerApply">
        <button class="role-btn" @click="openAgentPop">申请跟单人</button>
      </div>
      <!-- 无跟单人无权限申请 -->
      <div class="role-item role-btn-cotnent" v-else>
        <button class="role-btn" disabled>申请跟单人</button>
      </div>
      <!-- 委托人 -->
      <div class="role-item" v-if="isOnlyOwner">
        <img
          class="role-img"
          :src="houseData.agentHouseMethod.onlyOwnerHeadImg | defaultImg"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">
            {{ houseData.agentHouseMethod.onlyOwnerName }}
          </div>
          <div class="role-store overText">
            门店:{{ houseData.agentHouseMethod.onlyOwnerDepartmentName }}
          </div>
          <div class="role-phone overText">
            电话:{{ houseData.agentHouseMethod.onlyOwnerTel | emptyRead }}
          </div>
        </div>
        <div class="role-type">
          <div class="role-type-top">委托人</div>
          <div class="role-type-center">
            {{ houseData.isOnly == 2 ? "普通" : "独家" }}
          </div>
          <div
            class="role-type-bottom"
            @click="openPop('entrustPopFlag', 4, 'entrustType', 2)"
          >
            <div class="role-type-title">取代</div>
          </div>
        </div>
      </div>
      <!-- 申请委托人 -->
      <div
        class="role-item role-btn-cotnent"
        v-else-if="reloData.applyOnlyOwner"
      >
        <button
          class="role-btn"
          @click="openPop('entrustPopFlag', 1, 'entrustType', 0)"
        >
          申请委托人
        </button>
      </div>
      <!-- 无跟申请委托人权限 -->
      <div class="role-item role-btn-cotnent" v-else>
        <button class="role-btn" disabled>申请委托人</button>
      </div>
      <!-- 钥匙人 -->
      <div class="role-item" v-if="isKeyOwner">
        <img
          class="role-img"
          :src="houseData.agentHouseMethod.keyOwnerHeadImg | defaultImg"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">
            {{ houseData.agentHouseMethod.keyOwnerName }}
          </div>
          <div class="role-store overText">
            门店:{{ houseData.agentHouseMethod.keyOwnerDepartmentName }}
          </div>
          <div class="role-phone overText">
            电话:{{ houseData.agentHouseMethod.keyOwnerTel | emptyRead }}
          </div>
        </div>
        <div class="role-type">
          <div class="role-type-top">钥匙人</div>
          <div
            class="role-type-bottom"
            @click="openPop('keyPopFlag', 4, 'keyType', 3)"
          >
            <div class="role-type-title">取代</div>
          </div>
        </div>
      </div>
      <!-- 申请钥匙人 -->
      <div
        class="role-item role-btn-cotnent"
        v-else-if="reloData.submitApplyKeyOwner"
      >
        <button
          class="role-btn"
          @click="openPop('keyPopFlag', 0, 'keyType', 0)"
        >
          申请钥匙人
        </button>
      </div>
      <!-- 无申请钥匙人权限 -->
      <div class="role-item role-btn-cotnent" v-else>
        <button class="role-btn" disabled>申请钥匙人</button>
      </div>
      <!-- 实勘人 -->
      <div class="role-item" v-if="isRealOwner">
        <img
          class="role-img"
          :src="houseData.agentHouseMethod.realOwnerHeadImg | defaultImg"
          alt=""
        />
        <div class="role-middle">
          <div class="role-title overText">
            {{ houseData.agentHouseMethod.realOwnerName }}
          </div>
          <div class="role-store overText">
            门店: {{ houseData.agentHouseMethod.realOwnerDepartmentName }}
          </div>
          <div class="role-phone overText">
            电话:{{ houseData.agentHouseMethod.realOwnerTel | emptyRead }}
          </div>
        </div>
        <div class="role-type">
          <div class="role-type-top">实勘人</div>
          <div
            class="role-type-bottom"
            @click="openPop('houseUploadflag', 12, 'houseUploadType', 0)"
          >
            <button
              class="role-type-title type-vr"
              :disabled="!isSelfRealOwner"
            >
              申请VR
            </button>
          </div>
        </div>
      </div>
      <!-- 申请实勘人 -->
      <div
        class="role-item role-btn-cotnent"
        v-else-if="reloData.applyRealOwner && !realOwnerDisabled"
        @click="openPop('houseUploadflag', 12, 'houseUploadType', 0)"
      >
        <button class="role-btn">申请实勘人</button>
      </div>
      <div
        class="role-item role-btn-cotnent"
        v-else-if="reloData.applyRealOwner && realOwnerDisabled"
      >
        <button class="role-btn" disabled>VR拍摄中</button>
      </div>
      <!-- 无申请实勘人权限 -->
      <div class="role-item role-btn-cotnent" v-else>
        <button class="role-btn" disabled>申请实勘人</button>
      </div>
      <!-- 跟单人弹框 -->
      <applyAgentPop
        :showFlag.sync="applyAgentFlag"
        @applyAgent="applyAgent"
      ></applyAgentPop>
      <!-- 上传 -->
      <!-- <fixedPopup
        :visible.sync="houseUploadflag"
        title
        v-if="houseUploadflag"
        width="960px"
      >
        <houseUploadExtends
          ref="houseUpload"
          :replaceType="houseUploadType"
          :wxUploadFile="true"
          :echoData="echoData"
          :isFromHouseTask="true"
        ></houseUploadExtends>
        <template v-slot:floot>
          <div class="text-middle">
            <el-button
              class="role-btn"
              v-if="reloData.submitApplyRealOwner"
              :loading="houseUploadLoading"
              @click="submitUpload"
            >
              {{ houseUploadLoading ? "加载中" : "提交" }}
            </el-button>
            <el-button v-else size="mini" disabled>{{
              houseUploadLoading ? "加载中" : "提交"
            }}</el-button>
          </div>
        </template>
      </fixedPopup> -->
      <!--钥匙人 -->
      <replacePop
        :replaceType="keyType"
        :visible.sync="keyPopFlag"
        v-if="keyPopFlag"
        width="620px"
        title
        :submitApplyKeyOwner="reloData.submitApplyKeyOwner"
      ></replacePop>
      <!-- 委托人 -->
      <entrustPop
        :replaceType="entrustType"
        v-if="entrustPopFlag"
        width="640px"
        title
        :submitApplyOnlyOwner="reloData.submitApplyOnlyOwner"
        :visible.sync="entrustPopFlag"
      ></entrustPop>
    </div>
    <investigator-apply-Pop
      :dialogInvestigatorVisible.sync="dialogInvestigatorVisible"
      :houseId="houseId"
      @submit="investigatorApply"
    ></investigator-apply-Pop>
  </div>
</template>

<script>
import { TOKEN } from "@/util/constMap";
import { mapState } from "vuex";
import util from "@/util/util";
import houseCheck from "../common/houseCheck";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  components: {
    //取代
    // houseUploadExtends: () => import("../newDidLog/houseUploadExtends"),
    //取代
    replacePop: () => import("../newDidLog/replacePop"),
    //委托人
    entrustPop: () => import("../newDidLog/entrustPop"),
    //选填信息
    applyAgentPop: () => import("../newDidLog/applyAgentPop"),
    // 申请实勘人
    investigatorApplyPop: () => import("../newDidLog/investigatorApplyPop")
  },
  data() {
    return {
      realOwnerDisabled: false,
      echoData: [],
      houseUploadLoading: false,
      houseUploadflag: false,
      houseUploadType: null,
      keyPopFlag: false, //钥匙弹出开关
      keyType: null, //钥匙人类型
      entrustPopFlag: false, //委托人开关
      entrustType: null, //委托人类型
      applyAgentFlag: false, //申请跟人弹框开关
      middleRadio: 0, //中学占用级
      primaryRadio: 0, //小学占用年级
      showFollow: true, //是否显示组件的跟进
      audioList: [], //音频文件
      dialogInvestigatorVisible: false
    };
  },
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      houseData: state => state.houseDateil.houseData,
      reloData: state => state.houseDateil.reloData
    }),
    agentApply() {
      let loginDeptId = util.localStorageGet("logindata").deptId;
      if (
        this.houseData.plate === 1 &&
        this.houseData.agentPerDepartmentId != loginDeptId
      ) {
        return true;
      } else {
        return false;
      }
    },
    supplementObj() {
      return {
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
      };
    },
    /**
     * @example: 判断是否有跟单人
     * @returns {Boolean} true 有跟单人 false 无跟单人
     */
    isAgentPer() {
      return this.houseData.agentPerName != null && this.houseData.plate == 0;
    },
    /**
     * @example: 判断是否有权限申请更单人
     * @param {type}
     */
    isAgentPerApply() {
      return (
        this.reloData.applyAgent && this.houseData.plate < 6 && !this.agentApply
      );
    },
    /**
     * @example: 判断是否存在委托人
     */
    isOnlyOwner() {
      return this.houseData.agentHouseMethod.onlyOwnerName != null;
    },
    /**
     * @example: 判断是否存在钥匙人
     */
    isKeyOwner() {
      return this.houseData.agentHouseMethod.keyOwnerName != null;
    },
    /**
     * @example: 判断是否存在实勘人
     */
    isRealOwner() {
      return this.houseData.agentHouseMethod.realOwnerName != null;
    },
    /**
     * @example: 判断实勘人是否当前用户且vrUrl为空
     */
    isSelfRealOwner() {
      return (
        this.houseData.agentHouseMethod.realOwner ==
          util.localStorageGet("logindata").accountId && !this.houseData.vrUrl
      );
    }
  },
  mounted() {
    this.getRealOwnerAuthority();
  },
  methods: {
    /**
     * 实勘人申请成功事件
     */
    investigatorApply() {
      this.realOwnerDisabled = true;
    },
    /**
     * 获取申请实勘人按钮权限
     */
    async getRealOwnerAuthority() {
      // 如果进入页面不弹提示框需要直接用axios请求
      this.$api
        .get({
          isShowErrMsg: false,
          url: "/agentHouse/propertyCheck/realowner/can/apply",
          data: {
            houseId: this.houseId,
            type: 12,
            memo: "正在审核",
            replaceType: 0
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.realOwnerDisabled = false;
          }
        })
        .catch(e => {
          this.realOwnerDisabled = true;
        });
    },
    /**
     * refs 获取上传组件实例并且验证非空
     */
    // submitUpload() {
    //   let _that = this;
    //   let verifyFieldMap = new Map([
    //     ["outdoorImgList", "外景图"],
    //     ["livingRoomImgList", "客厅"],
    //     ["bedroomImgList", "卧室"],
    //     ["kitchenImgList", "厨房"],
    //     ["toiletImgList", "卫生间"],
    //     ["layoutImgList", "户型图"],
    //     ["houseVideo", "房源视频"]
    //   ]);
    //   if (this.$validator.fields.length == 0) {
    //     verifyFieldMap.forEach((_value, _key) => {
    //       this.$validator.attach({
    //         name: _key,
    //         alias: _value,
    //         rules: "required",
    //         getter: function() {
    //           return _that.$refs.houseUpload[_key];
    //         }
    //       });
    //     });
    //   }
    //   this.$validator.validateAll().then(e => {
    //     if (!e) {
    //       this.$message.warning(this.errorBags.all()[0]);
    //     } else {
    //       let url = `/agentHouse/propertyCheck/${
    //         this.houseUploadType == 12 ? "insertApplyFor" : "insertReplace"
    //       }`;
    //       let resultIdList = [];
    //       verifyFieldMap.forEach((_value, _key) => {
    //         if (_that.$refs.houseUpload[_key] instanceof Array) {
    //           _that.$refs.houseUpload[_key].forEach(item => {
    //             resultIdList.push(item.id);
    //           });
    //         } else {
    //           if (Object.keys(_that.$refs.houseUpload[_key]).length > 0) {
    //             resultIdList.push(_that.$refs.houseUpload[_key].id);
    //           }
    //         }
    //       });
    //       console.log(resultIdList);
    //       let params = {
    //         Eid: this.houseId,
    //         Type: this.houseUploadType,
    //         picList: resultIdList,
    //         followMemo: "提交了实勘申请"
    //       };
    //       if (this.houseUploadType == 4) {
    //         params.ReplaceType = 5;
    //       }
    //       this.houseUploadLoading = true;
    //       houseCheck
    //         .insertCheck(url, params)
    //         .then(e => {
    //           if (e.data.code == 200) {
    //             this.$message.success(e.data.message);
    //           }
    //         })
    //         .catch(e => {})
    //         .finally(() => {
    //           this.houseUploadLoading = false;
    //           this.houseUploadflag = false;
    //         });
    //     }
    //   });
    // },
    /**
     * 取代打开弹出层
     * @param {String} popName 弹出层的Flag名字
     * @param {number} type 打开类型
     */
    async openPop(popName, type, typeName, replaceType) {
      if (type != 4) {
        if (popName == "houseUploadflag") {
          this.dialogInvestigatorVisible = true;
        }
        let result = await houseCheck.isChecking(
          type,
          replaceType,
          this.houseId,
          "正在审核"
        );
        // 图片视频上传组件
        // if (popName == "houseUploadflag") {
        //   this.echoData = [
        //     ...this.houseData.saleUploadPicDtoList,
        //     ...this.houseData.saleUploadVideoDtoList
        //   ];
        // }
        if (!result) {
          if (popName == "houseUploadflag") {
            this.dialogInvestigatorVisible = true;
          } else {
            this[typeName] = type;
            this[popName] = true;
          }
        }
      } else {
        let result = await houseCheck.isChecking(
          type,
          replaceType,
          this.houseId,
          "正在审核"
        );
        if (!result) {
          this[typeName] = type;
          this[popName] = true;
        }
      }
    },
    /**
     * 申请跟单人
     */
    applyAgent(item) {
      this.$api
        .post({
          url: `/agentHouse/propertyCheck/apply/agent/${this.houseId}`,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let type = "error";
          if (e.data.code == 200) {
            type = "success";
            this.$router.push({
              path: "/buySellSystem/validateHome",
              query: {
                id: e.data.data
              }
            });
          } else {
            this.$message({
              message: e.data.message,
              type: type
            });
          }
        });
    },
    /**
     * 申请跟单人打开弹窗
     */
    openAgentPop() {
      this.$api
        .post({
          url: `/agentHouse/propertyCheck/apply/agent/can/${this.houseId}`,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.applyAgent(this.houseId);
          } else {
            this.$message(result.message);
          }
        })
        .catch(e => {});
    }
  }
};
</script>
