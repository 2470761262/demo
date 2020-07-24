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
  <div class="btn-content">
    <div class="bet-btn">我要对赌</div>
    <div class="bet-tips">
      <div class="bet-tips-title">对赌规则<i class="el-icon-question"></i></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      houseId: state => state.houseDateil.id
    })
  },
  data() {
    return {
      loading: true //加载对赌接口loading
    };
  },
  created() {
    this.getBetInfo();
  },
  methods: {
    //获取对赌结束时间
    getBetInfo() {
      var that = this;
      this.$api
        .get({
          url: "/house/bet/inBet/" + this.houseId
        })
        .then(e => {
          let data = e.data;
          if (data.data != null) {
            // if (
            //   data.data.EndTime != null &&
            //   Date.parse(data.data.EndTime) > new Date().getTime()
            // ) {
            // }
          }
        })
        .catch(e => {})
        .finally(() => {});
    }
  }
};
</script>
