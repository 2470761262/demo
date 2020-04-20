<style lang="less" scoped>
.detail-content {
  padding-left: 68px;
  .detail-price-content {
    padding-bottom: 23px;
    border-bottom: 1px solid #cccccc;
    font-size: 0;
    line-height: 1;
    .detail-price {
      display: inline-block;
      color: #dc4638;
      span:first-child {
        font-size: 60px;
      }
      span:last-child {
        font-size: 23px;
        vertical-align: text-bottom;
        font-weight: 600;
      }
    }
    .detail-price-avg {
      display: inline-block;
      vertical-align: text-bottom;
      font-size: 23px;
      font-weight: 600;
      color: #878787;
      margin-left: 40px;
    }
  }
  .content-flex {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    &.content-pad {
      padding: 26px 0;
    }
    .cell-item {
      text-align: center;
      .cell-item-head {
        font-size: 31px;
        color: #515151;
        font-weight: 600;
      }
      .cell-tiem-floot {
        margin-top: 9px;
        font-size: 21px;
        color: #999999;
      }
    }
  }
  .cell-tabs-content {
    // display: flex;
    border-bottom: 1px solid #cccccc;
    padding: 19px 0 25px 11px;
    .flex-row {
      display: flex;
      .cell-tabs {
        margin-left: 80px;
        margin-top: 0;
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .cell-tabs {
      display: flex;
      margin-top: 25px;
      .cell-tabs-title {
        color: #a7a7a7;
        font-size: 20px;
        width: 150px;
        &.last-tabs-title {
          width: 120px;
        }
      }
      .cell-tabs-detail {
        font-size: 20px;
        color: #606060;
      }
      .cell-tabs-nav {
        align-self: center;
        color: #0e834e;
        font-size: 20px;
        margin-left: 15px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .cell-pro {
    display: flex;
    padding-top: 15px;
    .cell-pro-item {
      flex: 1;
      display: flex;
      align-items: center;
      border-right: 1px solid #cccccc;
      box-sizing: border-box;
      //justify-content: space-around;
      &:last-child {
        border-right: none;
      }
      .cell-pro-left-img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        overflow: hidden;
      }
      .cell-pro-detail {
        //padding: 0 17px;
        text-align: center;
        flex: 1;
        width: 0;
        .cell-pro-detail-name {
          font-size: 26px;
          color: #515151;
          font-weight: 600;
        }
        .cell-pro-detail-other {
          color: #bbbbbb;
          font-size: 18px;
          margin-top: 5px;
        }
      }
      .cell-pro-but {
        padding: 10px;
        color: #fff;
        border-radius: 4px;
        background: #0d824b;
        font-size: 16px;
        cursor: pointer;
        border: none;
        outline: none;
        position: relative;
        overflow: hidden;
        &[disabled="disabled"] {
          background: #fff;
          color: #c0c4cc;
          cursor: not-allowed;
          border: 1px solid #ebeef5;
          box-sizing: border-box;
          border-radius: 4px;
          &::after {
            display: none;
          }
        }
        &.el-button {
          line-height: normal !important;
          i {
            display: none;
          }
        }
        &:first-of-type {
          margin-right: 10px;
        }
        &::after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, black 10%, transparent 10%);
          transform: scale(10, 10);
          opacity: 0;
          transition: transform 0.3s, opacity 0.5s;
        }
        &:active:after {
          transform: scale(0, 0);
          opacity: 0.3;
          transition: 0s;
        }
      }
    }
  }
}
</style>
<template>
  <div class="detail-content">
    <div class="detail-price-content">
      <div class="detail-price">
        <span>{{resultData.Price}}</span>
        <span v-if="resultData.Price">万元</span>
      </div>
      <div class="detail-price-avg">{{resultData.averagePrice | emptyRead('元/㎡')}}</div>
    </div>
    <div class="content-flex content-pad">
      <div class="cell-item">
        <div class="cell-item-head">{{resultData.houseType | emptyRead}}</div>
        <div class="cell-tiem-floot">{{resultData.Floor| emptyRead('层')}}/{{resultData.FloorNum | emptyRead('层','共')}}</div>
      </div>
      <div class="cell-item">
        <div class="cell-item-head">{{resultData.Face | emptyRead}}</div>
        <div class="cell-tiem-floot">{{resultData.FamilyStructure  | familyStructureFiletr('ROOMTYPE') | emptyRead }}/{{resultData.Decoration}}</div>
      </div>
      <div class="cell-item">
        <div class="cell-item-head">{{resultData.InArea | emptyRead('平米')}}</div>
        <div class="cell-tiem-floot">{{resultData.BuildingTime | emptyRead('年建')}}</div>
      </div>
    </div>
    <div class="cell-tabs-content">
      <div class="flex-row"
           v-if="resultData.agentHouseMethod">
        <div class="cell-tabs">
          <div class="cell-tabs-title">看房方式</div>
          <div class="cell-tabs-detail">{{resultData.agentHouseMethod.keyOwnerName | lookHouseModeFiletr}}</div>
        </div>
        <div class="cell-tabs">
          <div class="cell-tabs-title last-tabs-title">存放门店</div>
          <div class="cell-tabs-detail">{{resultData.agentHouseMethod.keyStorageDeptName | keyStorageFilter(resultData.agentHouseMethod.keyOwnerName) | emptyRead }}</div>
        </div>
      </div>
      <div class="cell-tabs">
        <div class="cell-tabs-title">小区名称</div>
        <div class="cell-tabs-detail">{{resultData.CommunityName}}</div>
        <div class="cell-tabs-nav"
             v-if="isShowBuilding">{{resultData.BuildingName | emptyRead}}-{{resultData.RoomNo | emptyRead}}</div>
        <div class="cell-tabs-nav"
             v-if="!isShowBuilding && !buttonDisabled"
             @click="getShowBuliding">楼栋号</div>
      </div>
      <div class="cell-tabs">
        <div class="cell-tabs-title">被看次数</div>
        <div class="cell-tabs-detail">{{resultData.seenNum | emptyRead('次')}}</div>
      </div>
      <div class="cell-tabs">
        <div class="cell-tabs-title">未跟进天数</div>
        <div class="cell-tabs-detail">{{resultData.outfollow |emptyRead('天')}}</div>
      </div>
    </div>
    <div class="cell-pro">
      <div class="cell-pro-item"
           v-if="resultData.agentPerName!=null&& resultData.plate!=1&&resultData.plate!=4">
        <el-image class="cell-pro-left-img"
                  :src="resultData.agentPerHeadImg"
                  fit="fill">
          <div slot="placeholder"
               class="image-slot">
            加载中<span>...</span>
          </div>
        </el-image>
        <div class="cell-pro-detail">
          <div class="cell-pro-detail-name overText">{{resultData.agentPerName | emptyRead}}</div>
          <div class="cell-pro-detail-other overText">{{resultData.agentPerDepartmentName | emptyRead}}</div>
        </div>
        <button class="cell-pro-but"
                v-if="resultData.agentPerName"
                @click="oneTouchDialPhone"
                :disabled="isDisabled">一键拨号</button>
      </div>
      <div class="cell-pro-item"
           v-else>
        <span> 暂无</span>
      </div>
      <div class="cell-pro-item">
        <div class="cell-pro-detail">
          <div class="cell-pro-detail-name overText">{{resultData.Customers | emptyRead}}</div>
          <div class="cell-pro-detail-other overText">业主称呼</div>
        </div>
        <el-dropdown @command="contactOwer">
          <el-button class="cell-pro-but"
                     :disabled="isDisabled">
            查看号码<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="resultData.Tel!=''"
                              v-text="resultData.Tel"
                              command=""></el-dropdown-item>
            <el-dropdown-item v-if="resultData.Tel1!=''"
                              v-text="resultData.Tel1"
                              command="1"></el-dropdown-item>
            <el-dropdown-item v-if="resultData.Tel2!=''"
                              v-text="resultData.Tel2"
                              command="2"></el-dropdown-item>
            <el-dropdown-item v-if="resultData.Tel3!=''"
                              v-text="resultData.Tel3"
                              command="3"></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <button>查看号码</button> -->
        <button class="cell-pro-but"
                @click="dialPhoneToFD"
                :disabled="isDisabled||fdDial">一键拨号</button>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
import {LOGINDATA} from "../../../../util/constMap";
export default {
  inject: ["houseDetails", "houseId", "buttonDisabled"],
  computed: {
    isDisabled() {
      return this.buttonDisabled;
    },
    resultData() {
      if (Object.keys(this.houseDetails).length > 0) {
        return this.houseDetails.data;
      } else {
        return {};
      }
    },
    fdDial() {
      let perId = util.localStorageGet("logindata").accountId;
      if (Object.keys(this.houseDetails).length > 0) {
        let detailData = this.houseDetails.data;
        if(!detailData){
          return true;
        }
        if(!detailData.isNew){
          return false;
        }
        if(!detailData.agentHouseMethod){
          return true;
        }
        if(perId!=detailData.agentHouseMethod.addPer&&perId!=detailData.agentHouseMethod.agentPer
          &&perId!=detailData.agentHouseMethod.keyOwner&&perId!=detailData.agentHouseMethod.onlyOwner
          &&perId!=detailData.agentHouseMethod.realOwner){
          return  true;
        }
      } else {
        return true;
      }
      return false
    }
  },
  data() {
    return {
      isShowBuilding: false
    };
  },
  mounted() {},
  methods: {
    getShowBuliding() {
      let that = this;
      this.$api
        .get({
          url: "/agent_house/isShowBuilding",
          data: {
            houseId: that.houseId.id
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.isShowBuilding = true;
          } else {
            that.isShowBuilding = false;
            that.$message(e.data.message);
          }
        })
        .catch(e => {});
    },
    oneTouchDialPhone() {
      let phone = this.resultData.agentPerTel;
      if (!phone) {
        this.$message({
          message: "该经纪人号码为空"
        });
        return;
      }
      let p = {
        contactPhone: phone
      };
      this.dailPhone(0, p);
    },
    dialPhoneToFD() {
      let p = {
        contactPhone: this.resultData.Tel,
        contactPhone1: this.resultData.Tel1,
        contactPhone2: this.resultData.Tel2,
        contactPhone3: this.resultData.Tel3
      };
      this.dailPhone(1, p);
    },
    contactOwer(cmd) {
      console.log(cmd);
      let p = {};
      p["contactPhone" + cmd] = this.resultData["Tel" + cmd];
      p["isLookPhone"] = true;
      this.dailPhone(1, p);
    },
    dailPhone(contactPerType, phoneObj) {
      let that = this;
      //console.log(that.houseDetails);
      this.$confirm("确定一键拨号吗？", "友情提醒", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          console.log(that.houseDetails);
          let oldParams = {
            houseId: that.houseId.id,
            houseType: 0,
            housePrice: that.resultData.Price,
            houseArea: that.resultData.InArea,
            contactPerType: contactPerType, //电话联系人类型，0为经纪人，1为业主
            remark: that.resultData.Title
          };
          let dailParams = {};
          Object.assign(dailParams, oldParams, phoneObj);
          if (contactPerType == 0) {
            //联系人类型如果是经纪人，才需要联系人id
            dailParams.contactPerId = that.resultData.AgentPer; //联系人id
            dailParams.unitName = that.resultData.agentPerDepartmentName;
            dailParams.contactPerName = that.resultData.agentPerName;
          } else {
            dailParams.unitName = that.resultData.CommunityName; //联系人是业主，名称取小区名
            dailParams.contactPerName = that.resultData.Customers;
          }
          that.$api
            .post({
              url: "/noticeManage/common/OneTouchDialPhone",
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
  },
  filters: {
    familyStructureFiletr(value, listName) {
      return util.countMapFilter(value, listName);
    },
    lookHouseModeFiletr(value) {
      return value != null ? "有钥匙" : "无钥匙";
    },
    keyStorageFilter(value, keyOwnerName) {
      return keyOwnerName == null ? "暂无" : value;
    }
  }
};
</script>
