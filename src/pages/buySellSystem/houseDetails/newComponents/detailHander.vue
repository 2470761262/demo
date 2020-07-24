<style lang="less" scoped>
.hander-warp {
  margin-top: 20px;
  .content {
    display: flex;
    align-items: center;
    .content-header-left {
      //display: flex;
      font-size: 0;
      h3 {
        font-size: @font22;
        font-weight: normal;
        margin-right: 10px;
        display: inline-block;
      }
      span,
      div {
        color: @backgroud;
        font-size: @font12;
        display: inline-block;
        vertical-align: text-bottom;
      }
      span {
        text-decoration: underline;
        cursor: pointer;
      }
      div {
        color: #525252;
        // prettier-ignore
        margin: 0 17PX;
        min-width: 200px;
      }
    }
    .content-header-right {
      display: flex;
      button {
        background: #fff;
        border-radius: 4px;
        border: 1px solid #d5d5d5;
        padding: 5px 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        // prettier-ignore
        width: 110PX;
        box-sizing: border-box;
        margin-right: 20px;
        outline: none;
        &:last-child {
          margin-right: 0;
        }
        &:active {
          border-color: #999;
        }
        .iconfont {
          // prettier-ignore
          font-size: 25PX;
          margin-left: 13px;
          margin-right: 6px;
        }
        span {
          flex: 1;
          text-align: center;
          font-size: @font14;
          padding-right: 7px;
        }
      }
    }
  }
  .impression-tag {
    display: flex;
    // prettier-ignore
    margin-top: 10PX;
    .impression-tag-content {
      display: flex;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        .impression-tag-remove {
          display: block;
        }
      }
      .impression-tag-remove {
        display: none;
        align-self: center;
        font-size: @font16;
        cursor: pointer;
      }
      .impression-tag-item {
        border-radius: 4px;
        padding: 5px 15px;
        background: @backgroud;
        color: #fff;
      }
    }
  }
}
.yellow {
  color: #f5ec2a;
}
.red {
  color: #d91f05;
}
</style>

<template>
  <div class="hander-warp">
    <div class="content">
      <div class="content-header-left">
        <h3>{{ houseData.Title | emptyRead }}</h3>
        <span @click="getShowBuliding">{{ buildNum }}</span>
        <div>房源编号： {{ houseData.HouseNo | emptyRead }}</div>
      </div>
      <div class="content-header-right">
        <button @click="nodePop">
          <i class="iconyinxiang iconfont "></i>
          <span>添加印象</span>
        </button>
        <button @click="changCollectHouse">
          <i
            class="iconfont yellow"
            :class="isCollect ? 'iconguanzhu' : 'iconguanzhu1'"
          ></i>
          <span>{{ isCollect ? "已关注" : "关注" }}</span>
        </button>
        <button @click="openReport">
          <i class="iconjubao iconfont red"></i>
          <span>举报</span>
        </button>
      </div>
    </div>
    <div class="impression-tag">
      <div
        class="impression-tag-content"
        v-for="item in impressionList"
        :key="item.id"
      >
        <div class="impression-tag-item">{{ item.impression }}</div>
        <div
          class="impression-tag-remove el-icon-close"
          @click="deleteImpression(item.id, index)"
        ></div>
      </div>
    </div>
    <!-- 举报 -->
    <report
      :visible.sync="reportFlag"
      v-if="reportFlag"
      typeClass="error"
      title="!举报"
    ></report>
    <!-- 关注 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
//房源审核
import houseCheck from "../common/houseCheck";
export default {
  computed: {
    ...mapState({
      houseData: state => state.houseDateil.houseData,
      houseId: state => state.houseDateil.id
    }),
    buildNum() {
      if (!this.getBudingNum) {
        const { emptyRead } = this.$options.filters;
        const { BuildingName, RoomNo } = this.houseData;
        return `${emptyRead(BuildingName)}-${emptyRead(RoomNo)}`;
      } else {
        return "楼栋号";
      }
    }
  },
  components: {
    //举报弹出层
    report: () => import("../newDidLog/report")
    //关注弹出层
    // attention: () => import("../newDidLog/attention")
  },
  data() {
    return {
      reportFlag: false, //举报弹框开关
      attentionFlag: false, //关注弹框开关
      isCollect: false,
      getBudingNum: true, //或者楼栋号
      impressionList: []
    };
  },
  created() {
    this.getImpressionList();
    this.getisCollect();
  },
  methods: {
    /**
     * @example: 显示楼栋号
     */

    getShowBuliding() {
      this.$api
        .get({
          url: "/agent_house/isShowBuilding",
          data: {
            houseId: this.houseId
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.getBudingNum = false;
          } else {
            this.getBudingNum = true;
            this.$message(e.data.message);
          }
        })
        .catch(e => {});
    },
    deleteMyAttention() {
      let that = this;
      this.$api
        .post({
          url: "/myHouse/deleteMyAttention",
          data: {
            houseId: this.houseId
          },
          qs: true,
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(e => {});
    },
    //删除印象
    deleteImpression(impressionId, index) {
      let params = {
        impressionId: impressionId
      };
      this.$api
        .post({
          url: "/agentHouse/impression/deleteImpression",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          this.$message(e.data.message);
          if (e.data.code == 200) {
            this.deleteMyAttention();
            this.impressionList.splice(index, 1);
          }
        });
    },
    nodePop() {
      this.$prompt(null, "房源印象显示在房源左上角,仅自己可见", {
        confirmButtonText: "添加",
        cancelButtonText: "取消",
        inputPlaceholder: "推荐5个字以内",
        lockScroll: false,
        inputValidator: e => {
          if (!e || e.length > 5) return "不能是空, 或者不能大于5个字";
          if (!e || /(.+)\1{2,}/.test(e)) {
            return "不能连续输入重复的字符";
          }
        },
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            this.insertImpression(instance.inputValue);
            setTimeout(() => {
              done();
              instance.confirmButtonLoading = false;
            }, 500);
          } else {
            done();
          }
        }
      })
        .then(value => {})
        .catch(() => {});
    },
    //添加印象
    insertImpression(impression) {
      let params = {
        houseId: this.houseId,
        impression: impression
      };
      this.$api
        .post({
          url: "/agentHouse/impression/insertImpression",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          this.$message(e.data.message);
          if (e.data.code == 200) {
            this.getImpressionList();
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            this.$message(e.response.data.message);
          }
        });
    },
    //获取是否关注标记
    getisCollect() {
      this.$api
        .get({
          url: "/agentHouse/collect/isCollectHouse",
          data: {
            houseId: this.houseId
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.isCollect = result.data;
          }
        })
        .catch(e => {});
    },
    //关注或者取消关注
    changCollectHouse() {
      let ajaxurl = "";
      let params = {
        houseId: this.houseId
      };
      if (this.isCollect) {
        ajaxurl = "/agent_house/concernHouseOFF/" + this.houseId;
      } else {
        ajaxurl = "/agentHouse/collect/collectHouse";
      }
      this.$api
        .post({
          url: ajaxurl,
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.isCollect = !this.isCollect;
            if (ajaxurl != "/agentHouse/collect/collectHouse") {
              this.deleteMyAttention();
            }
          } else {
            this.$message(result.message);
          }
        })
        .catch(e => {
          if (e.response != undefined) {
            this.$message(e.response.data.message);
          }
        });
    },
    /**
     * @example: 打开弹框
     * @param {string} PopName 弹框开关名称
     */
    openPopUp(PopName) {
      this[PopName] = true;
    },
    //打开举报弹窗
    async openReport() {
      let isChecking = await houseCheck.isChecking(
        11,
        0,
        this.houseId,
        "该房源已被举报，当前正在审核中"
      );
      if (!isChecking) {
        this.reportFlag = true;
      }
    },
    //获取印象数组
    getImpressionList() {
      this.$api
        .get({
          url: "/agentHouse/impression/getImpressionList",
          data: {
            houseId: this.houseId
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.impressionList = result.data;
          }
        });
    }
  }
};
</script>
