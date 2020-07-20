<template>
  <div class="content-box">
    <div class="content-top">
      <div class="title">跟进信息</div>
      <div class="btn-box">
        <div class="btn font-g" @click="openDevelop()">预约带看</div>
        <div
          class="btn font-g"
          @click="toPage()"
          v-if="permissionList.addLookButtonEable.isDisable"
        >
          添加带看
        </div>
        <div
          class="btn back font-w"
          @click="openPopUp('followUpFlag')"
          v-if="permissionList.addFollowLookButtonEable.isDisable"
        >
          写跟进
        </div>
      </div>
    </div>

    <div class="content-tabs">
      <el-tabs
        class="tabs-box"
        v-model="changeTabsValue"
        @tab-click="handleClick"
      >
        <!-- 全部记录 -->
        <el-tab-pane label="全部" name="all" class="point">
          <div class="list-content">
            <el-timeline>
              <el-timeline-item
                v-for="(item, idx) in allData"
                :key="idx"
                :timestamp="item.type ? '带看信息' : '跟进信息'"
                placement="top"
              >
                <i
                  :class="idx == 0 ? 'car-icon-green' : 'car-icon-grey'"
                  class="car-icon"
                  ><i
                    :class="idx == 0 ? 'car-icon-s-green' : 'car-icon-s-grey'"
                    class="car-icon-s"
                  ></i
                ></i>
                <div v-if="!item.type">
                  <p class="time-txt">{{ item.FollowTime }}</p>
                  <section class="list-car">
                    <div class="car-row">
                      <div class="car-title">跟进人：</div>
                      <div class="car-right">{{ item.perName || "暂无" }}</div>
                    </div>
                    <div class="car-row">
                      <div class="car-title">跟进类型：</div>
                      <div class="car-right">
                        {{ item.FollowType || "暂无" }}
                      </div>
                    </div>
                    <div class="car-row">
                      <div class="car-title">跟进方式：</div>
                      <div class="car-right">
                        {{ item.FollowWay || "暂无" }}
                      </div>
                    </div>
                    <div class="car-row car-mar-no">
                      <div class="car-title">跟进内容：</div>
                      <VueAudio
                        v-if="item.FollowType == '电话跟进'"
                        :theUrl="item.Memo.slice(6)"
                        theControlList="onlyOnePlaying"
                      ></VueAudio>
                      <div class="car-right" v-else>
                        {{ item.Memo || "暂无" }}
                      </div>
                    </div>
                  </section>
                </div>

                <div v-if="item.type">
                  <p class="time-txt">{{ item.AddTime }}</p>
                  <section class="list-car">
                    <div class="car-row">
                      <div class="car-title">带看类型：</div>
                      <div class="car-right">
                        {{ item.salePairType[0] || "暂无" }}
                      </div>
                    </div>
                    <div class="car-row">
                      <div class="car-title">带看经纪：</div>
                      <div class="car-right">
                        {{ item.perName }} - {{ item.companyName }}
                        {{ item.deptName }}
                      </div>
                    </div>
                    <div class="car-row">
                      <div class="car-title">带看日期：</div>
                      <div class="car-right">{{ item.st || "暂无" }}</div>
                    </div>
                    <div class="car-row">
                      <div class="car-title">带看房源：</div>
                      <div
                        class="car-right"
                        v-if="item.housingResource.length > 0"
                      >
                        <p
                          v-for="(housingResource, idx) in item.housingResource"
                          :key="idx"
                        >
                          {{ housingResource }}
                        </p>
                      </div>
                      <div class="car-right" v-else>无法找到对应房源</div>
                    </div>
                    <div class="car-row">
                      <div class="car-title">带看反馈：</div>
                      <div class="car-right">
                        {{ item.Cusfeedback | cusfeedbackName }}
                      </div>
                    </div>
                    <div class="car-row car-mar-no">
                      <div class="car-title">带看总结：</div>
                      <div class="car-right">{{ item.Memo || "暂无" }}</div>
                    </div>
                  </section>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
        <!-- 跟进记录 -->
        <el-tab-pane label="跟进" name="followUp" class="point">
          <div class="list-content">
            <el-timeline>
              <el-timeline-item
                v-for="(item, idx) in followData"
                :key="idx"
                timestamp="跟进信息"
                placement="top"
              >
                <i
                  :class="idx == 0 ? 'car-icon-green' : 'car-icon-grey'"
                  class="car-icon"
                  ><i
                    :class="idx == 0 ? 'car-icon-s-green' : 'car-icon-s-grey'"
                    class="car-icon-s"
                  ></i
                ></i>
                <p class="time-txt">{{ item.FollowTime }}</p>
                <section class="list-car">
                  <div class="car-row">
                    <div class="car-title">跟进人：</div>
                    <div class="car-right">{{ item.perName || "暂无" }}</div>
                  </div>
                  <div class="car-row">
                    <div class="car-title">跟进类型：</div>
                    <div class="car-right">{{ item.FollowType || "暂无" }}</div>
                  </div>
                  <div class="car-row">
                    <div class="car-title">跟进方式：</div>
                    <div class="car-right">{{ item.FollowWay || "暂无" }}</div>
                  </div>
                  <div class="car-row car-mar-no">
                    <div class="car-title">跟进内容：</div>
                    <VueAudio
                      v-if="item.FollowType == '电话跟进'"
                      :theUrl="item.Memo.slice(6)"
                      theControlList="onlyOnePlaying"
                    ></VueAudio>
                    <div class="car-right" v-else>
                      {{ item.Memo || "暂无" }}
                    </div>
                  </div>
                </section>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
        <!-- 约看/带看记录 -->
        <el-tab-pane label="约看/带看" name="lookAt" class="point">
          <div class="list-content">
            <el-timeline>
              <el-timeline-item
                v-for="(item, idx) in lookAtData"
                :key="idx"
                timestamp="带看信息"
                placement="top"
              >
                <i
                  :class="idx == 0 ? 'car-icon-green' : 'car-icon-grey'"
                  class="car-icon"
                  ><i
                    :class="idx == 0 ? 'car-icon-s-green' : 'car-icon-s-grey'"
                    class="car-icon-s"
                  ></i
                ></i>
                <p class="time-txt">{{ item.AddTime }}</p>
                <section class="list-car">
                  <div class="car-row">
                    <div class="car-title">带看类型：</div>
                    <div class="car-right">
                      {{ item.salePairType[0] || "暂无" }}
                    </div>
                  </div>
                  <div class="car-row">
                    <div class="car-title">带看经纪：</div>
                    <div class="car-right">
                      {{ item.perName }} - {{ item.companyName }}
                      {{ item.deptName }}
                    </div>
                  </div>
                  <div class="car-row">
                    <div class="car-title">带看日期：</div>
                    <div class="car-right">{{ item.st || "暂无" }}</div>
                  </div>
                  <div class="car-row">
                    <div class="car-title">带看房源：</div>
                    <div class="car-right">
                      <p
                        v-for="(housingResource, idx) in item.housingResource"
                        :key="idx"
                      >
                        {{ housingResource }}
                      </p>
                    </div>
                  </div>
                  <!-- <div class="car-row">
                    <div class="car-title">带看户型：</div>
                    <div class="car-right">{{ item.FollowWay }}</div>
                  </div> -->
                  <div class="car-row">
                    <div class="car-title">带看反馈：</div>
                    <div class="car-right">
                      {{ item.Cusfeedback | cusfeedbackName }}
                    </div>
                  </div>
                  <div class="car-row car-mar-no">
                    <div class="car-title">带看总结：</div>
                    <div class="car-right">{{ item.Memo || "暂无" }}</div>
                  </div>
                </section>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <followUpDialog
      styleType="0"
      width="554px"
      title="写跟进"
      @upData="getData"
      :visible.sync="followUpFlag"
      v-if="followUpFlag"
    ></followUpDialog>
    <fixedPopup
      :visible.sync="alertflag"
      styleType="0"
      :butJson="btnJson"
      @confirmEmit="alertflag = false"
      ><div class="alert-txt">该功能正在开发中，敬请期待</div></fixedPopup
    >
  </div>
</template>

<script>
export default {
  inject: ["customerId", "permissionList"],
  data() {
    return {
      followUpFlag: false, //跟进开关
      changeTabsValue: "all",
      allData: [],
      followData: [],
      lookAtData: [],
      alertflag: false,
      btnJson: {
        cancelBtnShow: false,
        confirmBtnText: "确定",
        confirmBtnShow: true
      }
    };
  },
  components: {
    //写跟进弹出层
    followUpDialog: () => import("../didlog/followUpDialog"),
    VueAudio: () => import("../../publicCustomersDetail/components/vueAudio")
  },
  created() {
    this.getData();
  },
  filters: {
    cusfeedbackName(value) {
      switch (value) {
        case 0:
          return "有意向";
        case 1:
          return "在考虑";
        case 2:
          return "不满意";
        default:
          return "暂无";
      }
    }
  },
  methods: {
    handleClick() {},
    /**
     * @example: 获取跟进和带看信息
     */
    getData() {
      let that = this;
      that.$api
        .post({
          url: "/saleCustomerDetail/getFollowAndTakeLook",
          data: { customerId: this.customerId },
          qs: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.followData = e.data.data.saleList;
            that.lookAtData = e.data.data.salePairOrderTblDtoList;
            that.processingData();
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            that.$message({
              type: "xinjia-info",
              message: e.response.data.message
            });
          }
        });
    },
    /**
     * @example: 数据处理
     */
    processingData() {
      let that = this;
      that.followData.forEach(item => {
        item.type = 0;
      });
      that.lookAtData.forEach(item => {
        item.type = 1;
      });
      for (let i = 0; i < that.lookAtData.length; i++) {
        that.lookAtData[i].housingResource = [];
        if (that.lookAtData[i].currentLookId != null) {
          for (let j = 0; j < that.lookAtData.length; j++) {
            if (
              that.lookAtData[i].currentLookId ==
              that.lookAtData[j].currentLookId
            ) {
              let housingResource =
                that.lookAtData[j].communityName +
                that.lookAtData[j].buildingName +
                that.lookAtData[j].roomNo;
              that.lookAtData[i].housingResource.push(housingResource);
            }
          }
        } else {
          let housingResource =
            that.lookAtData[i].communityName +
            that.lookAtData[i].buildingName +
            that.lookAtData[i].roomNo;
          that.lookAtData[i].housingResource.push(housingResource);
        }
      }
      //currentLookId为空的不参与去重
      let temporary = [];
      for (let i = 0; i < that.lookAtData.length; i++) {
        if (that.lookAtData[i].currentLookId == null) {
          temporary.push(that.lookAtData[i]);
        }
      }
      that.lookAtData = that.lookAtData.filter(function(item) {
        return item.currentLookId != null;
      });
      // 数组去重，相同currentLookId的带看只需要一条
      const res = new Map();
      that.lookAtData = that.lookAtData.filter(
        arr => !res.has(arr.currentLookId) && res.set(arr.currentLookId, 1)
      );
      that.lookAtData = that.lookAtData.concat(temporary);
      //数组合并
      that.allData = that.followData.concat(that.lookAtData);
      //数组按日期排序
      that.allData.sort((a, b) => {
        let x = a.AddTime;
        let y = b.AddTime;
        return x < y ? (x > y ? 1 : 0) : -1;
      });
    },
    /**
     * @example: 研发提示弹窗
     */
    openDevelop() {
      this.alertflag = true;
    },
    /**
     * @example: 弹出弹窗事件
     * @param: {string} PopName 弹窗名称
     */
    openPopUp(PopName) {
      this[PopName] = true;
    },
    /**
     * @example: 跳转到添加带看页面
     */
    toPage() {
      this.$router.push({
        path: "takeLook",
        query: { customerId: this.customerId }
      });
    }
  }
};
</script>

<style lang="less" scoped>
//prettier-ignore
@btn-lin: 36PX;
.content-box {
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  .content-top {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: @font24;
      font-weight: bold;
      line-height: 36px;
    }
    .btn-box {
      display: flex;
      .btn {
        width: 96px;
        font-size: @font16;
        text-align: center;
        line-height: @btn-lin;
        border: 1px solid @backgroud;
        border-radius: 4px;
        margin-left: 8px;
        cursor: pointer;
      }
      .back {
        background: @backgroud;
      }
      .font-w {
        color: #fff;
      }
      .font-g {
        color: @backgroud;
      }
    }
  }
  .content-tabs {
    width: 100%;
    margin-top: 20px;
    .tabs-box {
      .list-content {
        max-height: 770px;
        padding-top: 15px;
        overflow-y: auto;
        .car-icon-green {
          background: @opacityBackground;
          .car-icon-s-green {
            background: @backgroud;
          }
        }
        .car-icon-grey {
          background: rgba(144, 147, 153, 0.2);
          .car-icon-s-grey {
            background: #909399;
          }
        }
        .car-icon {
          width: 24px;
          height: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          padding: 5px;
          box-sizing: border-box;
          position: absolute;
          left: -8px;
          top: -3px;
          .car-icon-s {
            width: 14px;
            height: 14px;
            display: inline-block;
            border-radius: 50%;
          }
        }
        .time-txt {
          font-size: @font16;
          color: #303133;
          margin-bottom: 20px;
        }
        .list-car {
          // width: 516px;
          padding: 16px;
          width: 700px;
          // margin-right: 98px;
          background-color: #f8f8f8;
          border-radius: 4px;
          font-size: @font14;
          color: #606266;
          .car-row {
            display: flex;
            margin-bottom: 24px;
            .car-title {
              width: 94px;
            }
            .car-right {
              width: 70%;
              color: #303133;
            }
          }
          .car-mar-no {
            //prettier-ignore
            line-height: 23PX;
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
.alert-txt {
  padding-top: 24px;
  font-size: @font16;
}
/deep/ .el-tabs__item {
  font-size: @font18;
  color: #606266;
}
/deep/ .el-tabs__item.is-active {
  color: @backgroud;
  font-weight: bold;
}
/deep/.el-timeline-item__timestamp.is-top {
  position: absolute;
  left: -100px;
  top: -3px;
  font-size: @font16;
  font-weight: bold;
  color: #303133;
}
/deep/.el-timeline {
  //prettier-ignore
  padding-left: 100px;
}
/deep/ .el-timeline-item__tail {
  border-left-width: 1px;
  border-left-color: #909399;
  height: 85%;
  top: 26px;
}
</style>
