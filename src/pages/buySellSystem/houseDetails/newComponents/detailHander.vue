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
    .impression-tag-item {
      border-radius: 4px;
      padding: 5px 15px;
      background: @backgroud;
      color: #fff;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
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
        <span>楼栋号</span>
        <div>房源编号： {{ houseData.HouseNo | emptyRead }}</div>
      </div>
      <div class="content-header-right">
        <button>
          <i class="iconyinxiang iconfont "></i>
          <span>添加印象</span>
        </button>
        <button>
          <i class="iconguanzhu iconfont yellow"></i>
          <span>取消关注</span>
        </button>
        <button>
          <i class="iconjubao iconfont red"></i>
          <span>举报</span>
        </button>
      </div>
    </div>
    <div class="impression-tag">
      <div
        class="impression-tag-item"
        v-for="item in impressionList"
        :key="item.id"
      >
        {{ item.impression }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      houseData: state => state.houseDateil.houseData,
      houseId: state => state.houseDateil.id
    })
  },
  data() {
    return {
      impressionList: []
    };
  },
  created() {
    this.getImpressionList();
  },
  methods: {
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
