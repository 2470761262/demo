<style lang="less" scoped>
.btn-content {
  display: flex;
  justify-content: center;
  align-items: center;
  // prettier-ignore
  height: 137PX;
  border: 1px solid #d5d5d5;
  position: relative;
  .bet-btn {
    // prettier-ignore
    width: 145PX;
    // prettier-ignore
    height: 45PX;
    // prettier-ignore
    line-height: 45PX;
    text-align: center;
    font-size: @font16;
    border: 1px solid black;
    border-radius: 4px;
    cursor: pointer;
    background: none;
    outline: none;
    padding: 0;
  }
  .bet-tips {
    position: absolute;
    bottom: 5px;
    text-align: center;
    font-size: @font14;
    color: #d51e05;
    .bet-tips-title {
      display: flex;
      align-items: center;

      i {
        font-size: @font16;
      }
    }
  }
}
</style>
<template>
  <div
    class="btn-content"
    v-loading="loading"
    element-loading-text="对赌加载中..."
  >
    <button
      class="bet-btn"
      v-if="isBetCountShow"
      @click="showBetView"
      v-loading="btnLoading"
    >
      我要对赌
    </button>
    <conut-down :end-time="isBetTime" v-else />
    <div class="bet-tips">
      <div class="bet-tips-title">对赌规则<i class="el-icon-question"></i></div>
    </div>

    <bet-pop
      :visible.sync="betPopFlag"
      v-if="isBetPop"
      title="说明"
      @getBetInfo="getBetInfo"
      maskHideEvent
      width="600px"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {
    conutDown: () => import("../otherCom/countDown"),
    betPop: () => import("../newDidLog/betPop")
  },
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id,
      houseData: state => state.houseDateil.houseData
    }),
    isBetCountShow() {
      return this.isBet && this.isBetTime == null;
    },
    //判断显示对赌弹框权限
    isBetPop() {
      return this.betPopFlag && this.houseData.plate === 0;
    }
  },
  data() {
    return {
      loading: true, //加载对赌接口loading
      isBet: true, //是否对赌
      isBetTime: null, //对赌时间
      betPopFlag: false, //对赌弹框开关
      btnLoading: false
    };
  },
  created() {
    this.getBetInfo();
  },
  methods: {
    ...mapActions(["commitHouseBet", "commitRoleData"]),
    //获取对赌配置参数
    showBetView() {
      this.btnLoading = true;
      this.$api
        .get({
          url: "/house/bet/conf"
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.betPopFlag = true;
            this.commitHouseBet(data.data);
            this.commitRoleData({
              roleName: "betBtn",
              roleValue: true
            });
          } else {
            this.$message.warning({ message: data.message, offset: 400 });
          }
        })
        .catch(e => {})
        .finally(() => {
          this.btnLoading = false;
        });
    },
    //获取对赌结束时间
    getBetInfo() {
      this.$api
        .get({
          url: "/house/bet/inBet/" + this.houseId
        })
        .then(e => {
          let data = e.data;
          if (data.data != null) {
            if (
              data.data.EndTime != null &&
              Date.parse(data.data.EndTime) > new Date().getTime()
            ) {
              this.isBetTime = data.data.EndTime;
              this.isBet = false;
            }
          } else {
            this.isBet = true;
          }
        })
        .catch(e => {})
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
