<style lang="less" scoped>
.page-content {
  padding-left: 60px;
  padding-top: 60px;
  min-height: 100%;
  background: #fff;
  box-sizing: border-box;
  .page-house-cell {
    display: flex;
    .page-house-ditali {
      width: 540px;
      border-right: 1px solid #dddddd;
      box-sizing: border-box;
      .page-title-head {
        display: flex;
        padding-bottom: 50px;
        border-bottom: 1px solid #dddddd;
        width: 400px;
        .page-title-left {
          :nth-child(1) {
            font-size: 24px;
            margin-bottom: 10px;
          }
          :nth-child(2) {
            font-size: 18px;
            font-weight: normal;
            color: #666;
          }
        }
        .right-btn {
          margin-left: 50px;
          align-self: center;
        }
      }
      .page-title-just {
        display: flex;
        width: 400px;
        justify-content: space-between;
        padding: 20px 5px;
        border-bottom: 1px solid #dddddd;
        .title-just-item {
          text-align: center;
          :nth-child(1) {
            font-size: 24px;
            margin-bottom: 10px;
          }
          :nth-child(2) {
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: normal;
            color: #666;
          }
        }
      }
      .detail-title {
        font-size: 20px;
        padding: 20px 0px;
        border-bottom: 1px solid #dddddd;
        width: 200px;
      }
      .detail-layout {
        display: flex;
        flex-wrap: wrap;
        .detail-layout-item {
          flex: 0 0 50%;
          margin-top: 30px;
          display: flex;
          min-width: 0;
          .layout-item-title,
          .layout-item-detail {
            font-size: 16px;
            color: #333;
            flex: 1;
          }
          .layout-item-detail {
            padding-right: 10px;
            box-sizing: border-box;
          }
        }
      }
    }
    .page-house-right {
      width: 430px;
      margin-left: 30px;
      .right-huose-detail {
        padding: 15px;
        border: 1px solid #dddddd;
        border-radius: 4px;
        display: flex;
        .detail-image {
          width: 90px;
          height: 75px;
          border-radius: 4px;
        }
        .detail-image-msg {
          margin-left: 10px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5px 0;
          .detail-image-top {
            font-size: 22px;
            font-weight: 600;
            color: black;
          }
          .detail-num {
            display: flex;
            .detail-num-data {
              font-size: 15px;
              color: #333;
              margin-right: 20px;
              &::after {
                color: var(--color--primary);
                content: "(" attr(data-num) ")";
              }
            }
          }
        }
      }
      .add-phone-title {
        margin-top: 60px;
        font-size: 24px;
        color: black;
        font-weight: 600;
      }
      .add-cut-content {
        padding: 15px;
        border-radius: 4px;
        border: 1px solid #dddddd;
        margin-top: 20px;
        > h3 {
          font-size: 18px;
          color: #666;
          margin-bottom: 15px;
          &:not(:first-child) {
            margin-top: 15px;
          }
        }
        .add-cut-content-row {
          display: flex;
          border-bottom: 1px solid #dddddd;
          padding-bottom: 15px;
          .row-just-item {
            flex: 1;
            font-size: 16px;
          }
          &.article-row {
            padding-top: 15px;
            min-height: 50px;
            font-size: 16px;
            line-height: 25px;
          }
        }
        .per-content {
          display: flex;
          align-items: center;
          padding-top: 15px;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
          }
          .per-content-column {
            padding: 0 10px;
            h3 {
              font-size: 16px;
            }
            div {
              margin-top: 5px;
              font-size: 14px;
            }
          }
          > div:not(.per-content-column) {
            border: 1px solid #ddd;
            border-radius: 30px;
            padding: 4px 10px;
            font-size: 16px;
            margin-right: 10px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
.empty-message {
  margin-top: 30px;
  font-size: 16px;
}
</style>
<template>
  <div
    class="page-content"
    v-loading="load.loading"
    element-loading-custom-class="loadingTop"
    :element-loading-text="load.loadingMessage"
  >
    <section class="page-house-cell">
      <div class="page-house-ditali">
        <div class="page-title-head">
          <div class="page-title-left">
            <h3>
              {{ resultData.buildingName | emptyRead("栋") }}-{{
                resultData.RoomNo | emptyRead("室")
              }}
            </h3>
            <h6>
              {{ resultData.Floor | emptyRead("层") }}/{{
                resultData.floorNum | emptyRead("层", "共")
              }}
            </h6>
          </div>
          <el-button class="right-btn" type="primary" @click="tosele"
            >转在售</el-button
          >
        </div>
        <div class="page-title-just">
          <div class="title-just-item">
            <h4>{{ resultData.rooms | emptyRead("室") }}</h4>
            <div>户型</div>
          </div>
          <div class="title-just-item">
            <h4>{{ resultData.InArea | emptyRead("㎡") }}</h4>
            <div>面积</div>
          </div>
          <div class="title-just-item">
            <h4>{{ resultData.decoration | emptyRead }}</h4>
            <div>装修程度</div>
          </div>
        </div>
        <h3 class="detail-title">房屋概况</h3>
        <section class="detail-layout">
          <div class="detail-layout-item">
            <div class="layout-item-title">房屋用途</div>
            <div class="layout-item-detail overText">
              {{ resultData.buildtype | emptyRead }}
            </div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">电梯配套</div>
            <div class="layout-item-detail overText">
              {{ resultData.elevator | emptyRead }}
            </div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">产权性质</div>
            <div class="layout-item-detail overText">
              {{ resultData.HouseProperty | emptyRead }}
            </div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">附属配套</div>
            <div class="layout-item-detail overText">
              {{ resultData.HouseBelong | emptyRead }}
            </div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">小学划片</div>
            <div class="layout-item-detail overText">
              {{ resultData.primarySchool | emptyRead }}
            </div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">中学划片</div>
            <div class="layout-item-detail overText">
              {{ resultData.middleSchool | emptyRead }}
            </div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">物业公司</div>
            <div class="layout-item-detail overText">
              {{ resultData.propertyCompany | emptyRead }}
            </div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">评估价</div>
            <div class="layout-item-detail overText">
              {{ resultData.valuation | emptyRead }}
            </div>
          </div>
        </section>
      </div>
      <div class="page-house-right">
        <div class="right-huose-detail">
          <el-image
            class="detail-image"
            fit="cover"
            src="https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/4/16/6e35732669034e24a6448324b3d8a33d.jpg?x-oss-process=style/thumb"
          ></el-image>
          <div class="detail-image-msg">
            <div class="detail-image-top">
              {{ resultData.communityName | emptyRead }}
            </div>
            <div class="detail-num">
              <div
                class="detail-num-data"
                :data-num="resultData.existHouseNum | emptyRead"
              >
                在售房源
              </div>
              <div
                class="detail-num-data"
                :data-num="resultData.saleHouseNum | emptyRead"
              >
                存量房源数
              </div>
            </div>
          </div>
        </div>
        <div class="add-phone-title">最近成交信息</div>
        <div class="add-cut-content" v-if="this.houseType == 2">
          <div class="add-cut-content-row">
            <div class="row-just-item overText">
              房源证件:&nbsp;{{
                tradeDetail.certificateType
                  | constMapFilter("CERTIFICATETYPE")
                  | emptyRead
              }}
            </div>
            <div class="row-just-item overText">
              产权性质:&nbsp;{{ tradeDetail.ownerProperty | emptyRead }}
            </div>
          </div>
          <div class="add-cut-content-row article-row">
            小区介绍:<br />
            {{ tradeDetail.remark | emptyRead }}
          </div>
          <div class="add-cut-content-row article-row">
            核心卖点:<br />
            {{ tradeDetail.characteristic | emptyRead }}
          </div>
          <div class="per-content">
            <img :src="tradeDetail.agentPerHeadImg | defaultImg" alt="头像" />
            <div class="per-content-column">
              <h3>{{ tradeDetail.agentPerName | emptyRead }}</h3>
              <div>{{ tradeDetail.agentPerDepartmentName | emptyRead }}</div>
            </div>
            <div>
              {{ tradeDetail.tradePrice | parseIntNum | emptyRead("万") }}
            </div>
            <div>
              {{ tradeDetail.tradeTime | timeFormat("yyyy-MM-dd") | emptyRead }}
            </div>
          </div>
        </div>
        <div v-else class="empty-message">暂无成交数据</div>
      </div>
    </section>
  </div>
</template>
<script>
import util from "@/util/util";
export default {
  data() {
    return {
      houseId: null,
      houseType: null,
      resultData: {},
      tradeDetail: {},
      load: {
        loading: false,
        loadingMessage: "努力加载中~"
      }
    };
  },
  filters: {
    constMapFilter() {
      return util.countMapFilter(...arguments);
    },
    timeFormat(value, fmt) {
      return value ? util.format(value, fmt) : value;
    },
    parseIntNum(value) {
      return value ? parseInt(value) : value;
    }
  },
  created() {
    if (this.$route.params.houseId) {
      this.houseId = this.$route.params.houseId;
      this.houseType = this.$route.params.houseType;
      util.sessionLocalStorageSet("potentialHouse.vue:houseId", this.houseId);
      util.sessionLocalStorageSet(
        "potentialHouse.vue:houseType",
        this.houseType
      );
    } else {
      this.houseId = util.sessionLocalStorageGet("potentialHouse.vue:houseId");
      this.houseType = util.sessionLocalStorageGet(
        "potentialHouse.vue:houseType"
      );
    }
    if (this.houseType == 1) {
      this.getHouseDetails().then(() => {
        this.load.loading = false;
      });
    } else if (this.houseType == 2) {
      Promise.all([
        this.getHouseDetails(),
        this.getTradeHouseTradeDetail()
      ]).then(() => {
        this.load.loading = false;
      });
    } else {
      this.$message.error(
        "无法识别潜在房源的类型，到底是楼盘还是交易过的房源呢？"
      );
    }
  },
  methods: {
    getTradeHouseTradeDetail() {
      return this.$api
        .post({
          url: "/history/agent_house/getTradeHouseTradeDetail/" + this.houseId,
          qs: true
        })
        .then(e => {
          if (e.data.code == 200) {
            this.tradeDetail = e.data.data;
          }
        })
        .catch(e => {});
    },
    tosele() {
      let _that = this;
      this.$router.push({
        path: "/buySellSystem/addHouse",
        query: {
          comId: _that.resultData.Comid,
          cbId: _that.resultData.CBId,
          bhId: _that.resultData.id,
          communityName: _that.resultData.communityName,
          buildingName: _that.resultData.buildingName,
          roomNo: _that.resultData.roomNo,
          flag: "potentia"
        }
      });
    },
    getHouseDetails() {
      let that = this;
      return this.$api
        .post({
          url: "/building/getBuildingDetail/" + this.houseId,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.resultData = result.data;
            let logParam = {
              Type: 6,
              HouseId: that.houseId,
              // houseNo: result.data.HouseNo,
              Comid: result.data.Comid,
              CBid: result.data.CBId,
              BHID: that.houseId,
              CommunityName: result.data.communityName,
              BuildingName: result.data.buildingName,
              RoomNo: result.data.RoomNo,
              Floor: result.data.Floor,
              InArea: result.data.InArea,
              Price: result.data.Price,
              Rooms: result.data.Rooms,
              Hall: result.data.hall,
              Toilet: result.data.toilet
            };
            that.addBrowseHouseLog(logParam);
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(e => {});
    },
    addBrowseHouseLog(param) {
      let that = this;
      let url = "/house/browse/add";
      this.$api
        .post({
          url: url,
          data: param,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log("浏览记录添加成功");
          } else {
            console.log("浏览记录添加失败" + result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            console.log(e.response);
          }
        });
    }
  },
  destroyed() {}
};
</script>
