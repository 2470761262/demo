<style lang="less" scoped>
.task-content {
  margin-left: 48px;
}

.other-title {
  font-size: 30px;
  font-weight: 400;
  margin-top: 80px;
}
.task-pro-flex {
  display: flex;

  &.seat {
    &::after {
      content: "";
      .task-pro-content;
      visibility: hidden;
    }
  }

  .task-pro-content {
    margin-top: 30px;
    height: 85px;
    flex: 1;
    margin-right: 25px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    position: relative;
    display: flex;
    align-items: center;
    width: 0;
    flex-shrink: 0;

    &.flex-center {
      justify-content: center;

      .el-button {
        padding: 0 5px;
        width: auto;
        margin-right: 0;
      }
    }

    &:after {
      content: attr(data-detail);
      position: absolute;
      top: 0;
      left: 0;
      background: #a5a5a5;
      color: #fff;
      font-weight: 600;
      font-size: 15px;
      padding: 2px 4px;
      border-radius: 4px;
    }

    .task-pro-img {
      width: 67px;
      height: 67px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      margin-left: 55px;
    }

    .task-pro-message {
      margin-left: 15px;
      flex: 1;
      width: 0;

      .task-pro-name {
        font-size: 24px;
        color: #515151;
        font-weight: 600;
      }

      .task-pro-options {
        color: #bbbbbb;
        font-size: 16px;
        margin-top: 5px;
      }
    }

    /deep/ .el-button {
      margin-right: 8px;
      flex-shrink: 0;
      width: 100px;
      height: 35px;
      line-height: 35px;
      padding: 0;
      background-image: linear-gradient(
        115deg,
        var(--color--primary) 60%,
        var(--color--primary)
      );
      letter-spacing: 4px;

      &[disabled="disabled"] {
        background: #fff;

        span {
          color: #c0c4cc;
        }
      }

      .icon {
        font-size: 20px;
        vertical-align: middle;
      }

      span {
        font-size: 16px;
        color: #fff;
      }
    }

    .only {
      width: 50px;
      height: 10px;
      height: 25px;
      line-height: 25px;
      margin-top: 25px;
      position: absolute;
    }
  }
}

.text-middle {
  text-align: center;
  padding-bottom: 15px;
}
</style>
<template>
  <div class="task-content" v-if="resultData.agentHouseMethod">
    <h3 class="other-title">房源角色人</h3>
    <div class="task-pro-flex">
      <div class="task-pro-content" data-detail="录入人">
        <el-image
          class="task-pro-img"
          v-if="resultData"
          :src="resultData.agentHouseMethod.addPerHeadImg | defaultImg"
          fit="cover"
        >
          <div slot="placeholder" class="image-slot">
            加载中
            <span>...</span>
          </div>
        </el-image>
        <div class="task-pro-message">
          <div class="task-pro-name overText">
            {{ resultData.agentHouseMethod.addPerName | emptyRead }}
          </div>
          <div class="task-pro-options overText">
            {{ resultData.agentHouseMethod.addPerDepartmentName | emptyRead }}
          </div>
        </div>
      </div>
      <div
        :class="[
          'task-pro-content',
          {
            'flex-center':
              resultData.agentPerName == null ||
              resultData.plate == 1 ||
              resultData.plate == 4
          }
        ]"
        data-detail="跟单人"
      >
        <template
          v-if="resultData.agentPerName != null && resultData.plate == 0"
        >
          <el-image
            class="task-pro-img"
            :src="resultData.agentPerHeadImg | defaultImg"
            fit="cover"
          >
            <div slot="placeholder" class="image-slot">
              加载中
              <span>...</span>
            </div>
          </el-image>
          <div class="task-pro-message">
            <div class="task-pro-name overText">
              {{ resultData.agentPerName }}
            </div>
            <div class="task-pro-options overText">
              {{ resultData.agentPerDepartmentName }}
            </div>
          </div>
        </template>
        <el-button
          data-anchor="房源详情申请跟单人 => click"
          v-else-if="applyAgentRule && resultData.plate < 6"
          :disabled="isDisabled || agentApply"
          @click="openAgentPop"
        >
          <span>申请跟单人</span>
        </el-button>
        <el-button
          v-else-if="resultData.plate >= 6"
          :disabled="lockingDisabled"
          @click="turnOnSale"
        >
          <span>转在售</span>
        </el-button>
        <el-button v-else :disabled="true">
          <span>申请跟单人</span>
        </el-button>
      </div>
    </div>
    <div class="task-pro-flex">
      <div
        :class="[
          'task-pro-content',
          { 'flex-center': resultData.agentHouseMethod.keyOwnerName == null }
        ]"
        data-detail="钥匙人"
      >
        <template v-if="resultData.agentHouseMethod.keyOwnerName != null">
          <el-image
            class="task-pro-img"
            :src="resultData.agentHouseMethod.keyOwnerHeadImg | defaultImg"
            fit="cover"
          >
            <div slot="placeholder" class="image-slot">
              加载中
              <span>...</span>
            </div>
          </el-image>
          <div class="task-pro-message">
            <div class="task-pro-name overText">
              {{ resultData.agentHouseMethod.keyOwnerName }}
            </div>
            <div class="task-pro-options overText">
              {{ resultData.agentHouseMethod.keyOwnerDepartmentName }}
            </div>
          </div>
          <el-button
            :disabled="isDisabled"
            class="anchor-point"
            data-anchor="房源详情钥匙人取代 => click"
            @click="openPop('keyPopFlag', 4, 'keyType', 3)"
          >
            <i class="el-icon-sunny icon"></i>
            <span>取代</span>
          </el-button>
        </template>
        <el-button
          v-else-if="applyKeyOwnerRule"
          :disabled="isDisabled"
          class="anchor-point color"
          data-anchor="房源详情申请钥匙人 => click"
          @click="openPop('keyPopFlag', 0, 'keyType', 0)"
        >
          <span>申请钥匙人</span>
        </el-button>
        <el-button v-else :disabled="true">
          <span>申请钥匙人</span>
        </el-button>
      </div>
      <div
        :class="[
          'task-pro-content',
          { 'flex-center': resultData.agentHouseMethod.onlyOwnerName == null }
        ]"
        data-detail="委托人"
      >
        <template v-if="resultData.agentHouseMethod.onlyOwnerName != null">
          <el-button class="only">{{
            resultData.isOnly | mapFilter("ONLYTYPE")
          }}</el-button>
          <el-image
            class="task-pro-img"
            :src="resultData.agentHouseMethod.onlyOwnerHeadImg | defaultImg"
            fit="cover"
          >
            <div slot="placeholder" class="image-slot">
              加载中
              <span>...</span>
            </div>
          </el-image>
          <div class="task-pro-message">
            <div class="task-pro-name overText">
              {{ resultData.agentHouseMethod.onlyOwnerName }}
            </div>
            <div class="task-pro-options overText">
              {{ resultData.agentHouseMethod.onlyOwnerName }}
            </div>
          </div>
          <el-button
            :disabled="isDisabled"
            class="anchor-point"
            data-anchor="房源详情委托人取代 => click"
            @click="openPop('entrustPopFlag', 4, 'entrustType', 2)"
          >
            <i class="el-icon-sunny icon"></i>
            <span>取代</span>
          </el-button>
        </template>
        <el-button
          v-else-if="applyOnlyOwnerRule"
          :disabled="isDisabled"
          data-anchor="房源详情申请委托人 => click"
          class="anchor-point"
          @click="openPop('entrustPopFlag', 1, 'entrustType', 0)"
        >
          <span>申请委托人</span>
        </el-button>
        <el-button v-else :disabled="true">
          <span>申请委托人</span>
        </el-button>
      </div>
    </div>
    <div class="task-pro-flex seat">
      <div
        :class="[
          'task-pro-content',
          { 'flex-center': resultData.agentHouseMethod.realOwnerName == null }
        ]"
        data-detail="实勘人"
      >
        <template v-if="resultData.agentHouseMethod.realOwnerName != null">
          <el-image
            class="task-pro-img"
            :src="resultData.agentHouseMethod.realOwnerHeadImg | defaultImg"
            fit="cover"
          >
            <div slot="placeholder" class="image-slot">
              加载中
              <span>...</span>
            </div>
          </el-image>
          <div class="task-pro-message">
            <div class="task-pro-name overText">
              {{ resultData.agentHouseMethod.realOwnerName }}
            </div>
            <div class="task-pro-options overText">
              {{ resultData.agentHouseMethod.realOwnerDepartmentName }}
            </div>
          </div>
          <el-button
            :disabled="isDisabled"
            class="anchor-point"
            data-anchor="房源详情取代实勘人 => click"
            @click="openPop('houseUploadflag', 4, 'houseUploadType', 5)"
          >
            <i class="el-icon-sunny icon"></i>
            <span>取代</span>
          </el-button>
        </template>
        <el-button
          data-anchor="房源详情申请实勘人 => click"
          v-else-if="applyRealOwnerRule"
          :disabled="isDisabled"
          class="anchor-point"
          @click="openPop('houseUploadflag', 12, 'houseUploadType', 0)"
          >申请实勘人</el-button
        >
        <el-button v-else :disabled="true">申请实勘人</el-button>
      </div>
    </div>
    <!--取代 -->
    <replacePop
      :replaceType="keyType"
      :visible.sync="keyPopFlag"
      v-if="keyPopFlag"
      width="620px"
      title
      :submitApplyKeyOwner="submitApplyKeyOwner"
    ></replacePop>
    <!-- 委托人 -->
    <entrustPop
      :replaceType="entrustType"
      v-if="entrustPopFlag"
      width="640px"
      title
      :submitApplyOnlyOwner="submitApplyOnlyOwner"
      :visible.sync="entrustPopFlag"
    ></entrustPop>
    <!-- 上传 -->
    <fixedPopup
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
            data-anchor="房源详情上传提交 => click"
            v-if="submitApplyRealOwner"
            size="mini"
            :disabled="isDisabled"
            class="anchor-point"
            @click="submitUpload"
            :loading="houseUploadLoading"
            >{{ houseUploadLoading ? "加载中" : "提交" }}</el-button
          >
          <el-button
            v-else
            size="mini"
            :disabled="true"
            :loading="houseUploadLoading"
            >{{ houseUploadLoading ? "加载中" : "提交" }}</el-button
          >
        </div>
      </template>
    </fixedPopup>

    <fixedPopup
      :visible.sync="applyAgentFlag"
      title="请填写完这些信息才能申请为跟单人"
      v-if="applyAgentFlag"
      width="960px"
    >
      <supplement
        ref="com"
        :required="required"
        :middleRadioTo="middleRadio"
        :primaryRadioTo="primaryRadio"
        :showFollow="showFollow"
        :paramsObj="supplementObj"
        :audioList="audioList"
        :isFromHouseTask="true"
      ></supplement>
      <template>
        <div class="text-middle">
          <el-button
            data-anchor="房源详情申请为跟单人提交 => click"
            class="anchor-point"
            v-if="submitApplyAgent"
            size="mini"
            :disabled="agentApply || isDisabled"
            @click="applyAgent"
            >提交</el-button
          >
          <el-button class="anchor-point" v-else size="mini" :disabled="true"
            >提交</el-button
          >
        </div>
      </template>
    </fixedPopup>
  </div>
</template>

<script>
import houseCheck from "../common/houseCheck";
import util from "@/util/util";
import but from "@/evenBus/but.js";
export default {
  $_veeValidate: {
    validator: "new" // give me my own validator scope.
  },
  inject: {
    houseDetails: {
      default: {}
    },
    houseId: {
      default: {}
    },
    buttonDisabled: {
      default: false
    },
    buttonLocking: {
      default: {}
    },
    paramsObj: {
      default: {}
    }
  },
  computed: {
    lockingDisabled() {
      return this.buttonLocking.value;
    },
    isDisabled() {
      return this.buttonDisabled || this.buttonLocking.value;
    },
    supplementObj() {
      if (Object.keys(this.paramsObj).length > 0) {
        return this.paramsObj.paramsObj;
      } else {
        return {};
      }
    },
    resultData() {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data;
      } else {
        return {};
      }
    },
    agentApply() {
      let loginDeptId = util.localStorageGet("logindata").deptId;
      if (Object.keys(this.houseDetails).length > 0) {
        let detailData = this.houseDetails.data;
        if (!detailData) {
          return true;
        }
        if (
          detailData.plate == 1 &&
          detailData.agentPerDepartmentId != loginDeptId
        ) {
          return true;
        }
        return false;
      }
      return true;
    }
  },
  components: {
    //取代
    houseUploadExtends: () => import("./houseUploadExtends"),
    //委托人
    replacePop: () => import("../didLog/replacePop"),
    //上传
    entrustPop: () => import("../didLog/entrustPop"),
    //选填信息
    supplement: () =>
      import("@/pages/buySellSystem/addHouse/components/supplement")
  },
  data() {
    return {
      echoData: [], //回显图片视频
      houseUploadLoading: false,
      houseUploadflag: false,
      houseUploadType: null,
      keyPopFlag: false, //钥匙弹出开关
      entrustPopFlag: false, //委托人开关
      keyType: null, //钥匙人类型
      entrustType: null, //委托人类型
      tsttinpit: "",
      required: true, //判断非空
      middleRadio: 0, //中学占用级
      primaryRadio: 0, //小学占用年级
      audioList: [], //音频文件
      showFollow: true, //是否显示组件的跟进
      applyAgentFlag: false, //申请跟单开关
      applyAgentRule: false, //权限控制申请跟单人按钮是否显示
      applyKeyOwnerRule: false, //权限控制申请钥匙人按钮是否显示
      applyOnlyOwnerRule: false, //权限控制申请委托人按钮是否显示
      applyRealOwnerRule: false, //权限控制申请实勘人按钮是否显示
      submitApplyKeyOwner: false, //提交申请钥匙人按钮
      submitApplyOnlyOwner: false, //提交申请委托人按钮
      submitApplyRealOwner: false, //提交申请实勘人按钮
      submitApplyAgent: false //提交申请跟单人
    };
  },
  filters: {
    mapFilter(value, ListName, resultValue = null) {
      return util.countMapFilter(value, ListName, resultValue);
    }
  },
  mounted() {
    let that = this;

    but.$on("applyAgent", () => {
      that.applyAgentRule = true;
    });
    but.$on("applyKeyOwner", () => {
      that.applyKeyOwnerRule = true;
    });
    but.$on("applyOnlyOwner", () => {
      that.applyOnlyOwnerRule = true;
    });
    but.$on("applyRealOwner", () => {
      that.applyRealOwnerRule = true;
    });

    but.$on("submitApplyKeyOwner", () => {
      that.submitApplyKeyOwner = true;
    });
    but.$on("submitApplyOnlyOwner", () => {
      that.submitApplyOnlyOwner = true;
    });
    but.$on("submitApplyRealOwner", () => {
      that.submitApplyRealOwner = true;
    });
    but.$on("submitApplyAgent", () => {
      that.submitApplyAgent = true;
    });
    but.$on("callTaskAgent", this.openAgentPop);
  },
  destroyed() {
    but.$off("applyAgent");
    but.$off("applyKeyOwner");
    but.$off("applyOnlyOwner");
    but.$off("applyRealOwner");
    but.$off("submitApplyKeyOwner");
    but.$off("submitApplyOnlyOwner");
    but.$off("submitApplyRealOwner");
    but.$off("submitApplyAgent");
    but.$off("callTaskAgent");
  },
  methods: {
    /**
     * 转在售
     */
    turnOnSale() {
      let _that = this;
      this.$router.push({
        path: "/buySellSystem/addHouse",
        query: {
          comId: _that.resultData.Comid,
          cbId: _that.resultData.CBid,
          bhId: _that.resultData.BHID,
          communityName: _that.resultData.CommunityName,
          buildingName: _that.resultData.BuildingName,
          roomNo: _that.resultData.RoomNo,
          flag: "potentia",
          customerName: _that.resultData.Customers,
          tel: _that.resultData.Tel
        }
      });
    },
    /**
     * 申请跟单人
     */
    applyAgent() {
      let params = this.$refs.com.formData;
      let that = this;
      this.$refs.com.validateAllNotUpdata().then(e => {
        if (e) {
          params.houseId = that.houseId.id;
          if (that.$refs.com.audioFile.id) {
            params.audioId = that.$refs.com.audioFile.id;
          }
          console.log(params, "params");
          that.applyAgentFlag = false;
          that.$api
            .post({
              url: "/agentHouse/propertyCheck/applyAgent",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              data: params
            })
            .then(e => {
              let result = e.data;
              if (result.code == 200) {
                this.resultData.plate = 0;
                this.resultData.agentPerName = util.localStorageGet(
                  "logindata"
                ).userName;
                this.resultData.agentPerHeadImg = util
                  .localStorageGet("logindata")
                  .headImgUrl.includes("http")
                  ? util.localStorageGet("logindata").headImgUrl
                  : null;
                this.resultData.agentPerDepartmentName = util.localStorageGet(
                  "logindata"
                ).deptName;
              } else {
                that.$message(result.message);
              }
            })
            .catch(e => {});
        }
      });
    },
    /**
     * 申请跟单人打开弹窗
     */
    openAgentPop() {
      if (this.resultData.applyAgentVo != null) {
        this.$store.commit("updateStep2", this.resultData.applyAgentVo);
        this.audioList = this.resultData.applyAgentVo.saleUploadAudioList;
        if (this.resultData.applyAgentVo.middleSchoolUse) {
          this.middleRadio = 1;
        } else {
          this.middleRadio = 0;
        }
        if (this.resultData.applyAgentVo.primarySchoolUse) {
          this.primaryRadio = 1;
        } else {
          this.middleRadio = 0;
        }
      }
      this.applyAgentFlag = true;
    },
    /**
     * 取代打开弹出层
     * @param {String} popName 弹出层的Flag名字
     * @param {number} type 打开类型
     */
    async openPop(popName, type, typeName, replaceType) {
      if (type != 4) {
        let result = await houseCheck.isChecking(
          type,
          replaceType,
          this.houseId.id,
          "正在审核"
        );
        if (popName == "houseUploadflag") {
          this.echoData = [
            ...this.resultData.saleUploadPicDtoList,
            ...this.resultData.saleUploadVideoDtoList
          ];
        }
        if (!result) {
          this[typeName] = type;
          this[popName] = true;
        }
      } else {
        let result = await houseCheck.isChecking(
          type,
          replaceType,
          this.houseId.id,
          "正在审核"
        );
        if (!result) {
          this[typeName] = type;
          this[popName] = true;
        }
      }
    },
    /**
     * refs 获取上传组件实例并且验证非空
     */
    submitUpload() {
      let _that = this;
      let verifyFieldMap = new Map([
        ["outdoorImgList", "外景图"],
        ["livingRoomImgList", "客厅"],
        ["bedroomImgList", "卧室"],
        ["kitchenImgList", "厨房"],
        ["toiletImgList", "卫生间"],
        ["layoutImgList", "户型图"],
        ["houseVideo", "房源视频"]
      ]);
      if (this.$validator.fields.length == 0) {
        verifyFieldMap.forEach((_value, _key) => {
          this.$validator.attach({
            name: _key,
            alias: _value,
            rules: "required",
            getter: function() {
              return _that.$refs.houseUpload[_key];
              // if (_that.$refs.houseUpload[_key] instanceof Array) {  视频必填
              //   return _that.$refs.houseUpload[_key];
              // } else {
              //   if (Object.keys(_that.$refs.houseUpload[_key]).length == 0) {
              //     return "";
              //   } else {
              //     return _that.$refs.houseUpload[_key];
              //   }
              // }
            }
          });
        });
      }
      this.$validator.validateAll().then(e => {
        if (!e) {
          this.$message.warning(this.errorBags.all()[0]);
        } else {
          let url = `/agentHouse/propertyCheck/${
            this.houseUploadType == 12 ? "insertApplyFor" : "insertReplace"
          }`;
          let resultIdList = [];
          verifyFieldMap.forEach((_value, _key) => {
            if (_that.$refs.houseUpload[_key] instanceof Array) {
              _that.$refs.houseUpload[_key].forEach(item => {
                resultIdList.push(item.id);
              });
            } else {
              if (Object.keys(_that.$refs.houseUpload[_key]).length > 0) {
                resultIdList.push(_that.$refs.houseUpload[_key].id);
              }
            }
          });
          console.log(resultIdList);
          let params = {
            Eid: this.houseId.id,
            Type: this.houseUploadType,
            picList: resultIdList,
            followMemo: "提交了实勘申请"
          };
          if (this.houseUploadType == 4) {
            params.ReplaceType = 5;
          }
          this.houseUploadLoading = true;
          houseCheck
            .insertCheck(url, params)
            .then(e => {
              if (e.data.code == 200) {
                this.$message.success(e.data.message);
              }
            })
            .catch(e => {})
            .finally(() => {
              this.houseUploadLoading = false;
              this.houseUploadflag = false;
            });
        }
      });
    }
  }
};
</script>
