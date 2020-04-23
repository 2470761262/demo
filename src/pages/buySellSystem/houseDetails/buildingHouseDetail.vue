
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
        h3 {
          font-size: 18px;
          color: #666;
          margin-bottom: 15px;
          &:not(:first-child) {
            margin-top: 15px;
          }
        }
        .errors-tips {
          color: red;
          font-size: 14px;
          margin-top: 20px;
        }
        .but-content {
          margin-top: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
<template>
  <div class="page-content"
       v-loading="load.loading"
       element-loading-custom-class="loadingTop"
       :element-loading-text="load.loadingMessage">
    <section class="page-house-cell">
      <div class="page-house-ditali">
        <div class="page-title-head">
          <div class="page-title-left">
            <h3>{{buildingName | emptyRead('栋')}}-{{resultData.RoomNo | emptyRead('室')}}</h3>
            <h6>{{resultData.Floor | emptyRead('层')}}/{{resultData.floorNum | emptyRead('层','共')}}</h6>
          </div>
          <el-button class="right-btn"
                     type="primary">转在售</el-button>
        </div>
        <div class="page-title-just">
          <div class="title-just-item">
            <h4>{{resultData.rooms | emptyRead('室')}}</h4>
            <div>户型</div>
          </div>
          <div class="title-just-item">
            <h4>{{resultData.InArea | emptyRead('㎡')}}</h4>
            <div>面积</div>
          </div>
          <div class="title-just-item">
            <h4>{{resultData.decoration | emptyRead}}</h4>
            <div>装修程度</div>
          </div>
        </div>
        <h3 class="detail-title">房屋概况</h3>
        <section class="detail-layout">
          <div class="detail-layout-item">
            <div class="layout-item-title">房屋用途</div>
            <div class="layout-item-detail overText">{{resultData.buildtype | emptyRead}}</div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">电梯配套</div>
            <div class="layout-item-detail overText">{{resultData.elevator | emptyRead}}</div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">产权性质</div>
            <div class="layout-item-detail overText">{{resultData.HouseProperty | emptyRead}}</div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">附属配套</div>
            <div class="layout-item-detail overText">{{resultData.HouseBelong | emptyRead}}</div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">小学划片</div>
            <div class="layout-item-detail overText">{{resultData.primarySchool | emptyRead}}</div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">中学划片</div>
            <div class="layout-item-detail overText">{{resultData.middleSchool | emptyRead}}</div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">物业公司</div>
            <div class="layout-item-detail overText">{{resultData.propertyCompany | emptyRead}}</div>
          </div>
          <div class="detail-layout-item">
            <div class="layout-item-title">评估价</div>
            <div class="layout-item-detail overText">{{resultData.valuation | emptyRead }}</div>
          </div>
        </section>
      </div>
      <div class="page-house-right">
        <div class="right-huose-detail">
          <el-image class="detail-image"
                    fit="cover"
                    src="https://imgtest.0be.cn/FileUpload/PicFile_Agent2020/4/16/6e35732669034e24a6448324b3d8a33d.jpg?x-oss-process=style/thumb"></el-image>
          <div class="detail-image-msg">
            <div class="detail-image-top">{{resultData.communityName | emptyRead}}</div>
            <div class="detail-num">
              <div class="detail-num-data"
                   :data-num="resultData.existHouseNum |  emptyRead">在售房源</div>
              <div class="detail-num-data"
                   :data-num="resultData.saleHouseNum | emptyRead">存量房源数</div>
            </div>
          </div>
        </div>
        <div class="add-phone-title">补充号码</div>
        <div class="add-cut-content">
          <h3>业主姓名:</h3>
          <el-input v-model="addCut.cutName"
                    data-vv-name="cutName"
                    data-vv-as="业主姓名"
                    v-validate="'required'"
                    placeholder="请输入业主姓名"></el-input>
          <h3>电话号码:</h3>
          <el-input v-model="addCut.cutPhone"
                    data-vv-name="cutPhone"
                    data-vv-as="业主号码"
                    v-validate="'required|phone'"
                    placeholder="请输入业主号码"></el-input>
          <h3 v-show="cutPhone1Flag">业主号码1:</h3>
          <el-input v-show="cutPhone1Flag"
                    data-vv-name="cutPhone1"
                    data-vv-as="业主号码1"
                    v-validate="{required:cutPhone1Flag,phone:true}"
                    v-model="addCut.cutPhone1"
                    placeholder="请输入业主号码1"></el-input>
          <div class="errors-tips">{{errorBags.all()[0]}}</div>
          <div class="but-content">
            <el-button type="primary">立即提交</el-button>
            <el-button type="primary"
                       @click="addPhone">添加号码</el-button>
          </div>
        </div>
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
      resultData: {},
      cutPhone1Flag: false,
      addCut: {
        cutName: "",
        cutPhone: ""
      },
      load: {
        loading: true,
        loadingMessage: "努力加载中~"
      }
    };
  },
  created() {
    if (this.$route.params.houseId) {
      this.houseId = this.$route.params.houseId;
      util.localStorageSet("buildingHouseDetail.vue:houseId", this.houseId);
    } else {
      this.houseId = util.localStorageGet("buildingHouseDetail.vue:houseId");
    }
    this.getHouseDetails();
  },
  methods: {
    getHouseDetails() {
      this.load.loading = true;
      this.$api
        .post({
          url: "/building/getBuildingDetail/" + this.houseId,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.resultData = result.data;
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(e => {})
        .finally(() => {
          this.load.loading = false;
        });
    },
    addPhone() {
      this.cutPhone1Flag = !this.cutPhone1Flag;
      if (this.cutPhone1Flag) {
        this.$set(this.addCut, "cutPhone1", "");
      } else {
        this.$delete(this.addCut, "cutPhone1");
      }
    }
  },
  destroyed() {
    // this.$store.commit("resetFormData");
  }
};
</script>

