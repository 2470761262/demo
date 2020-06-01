<style lang="less" scoped>
//primary
.progress-content {
  display: flex;
  justify-content: space-between;
  @defaultColor: #e6e6e6;
  @commonColor: #fb5554;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: calc(50% - 2px);
    left: 30px;
    right: 30px;
    transform: translateY(-50%);
    height: 4px;
    background: @commonColor;
  }
  .progress-item-content {
    text-align: center;
    position: relative;
    z-index: 10;
    @pad: 5px;
    &-common,
    &-success {
      .item-content-type {
        padding: @pad;
        box-sizing: border-box;
        background: rgba(251, 85, 84, 0.6);
        &::after {
          background: @commonColor;
          top: @pad;
          left: @pad;
          right: @pad;
          bottom: @pad;
        }
      }
      .item-content-tips {
        color: @commonColor;
      }
    }
    &-default {
      .item-content-title {
        visibility: hidden;
        &::before {
          content: "-";
        }
      }
      .item-content-type {
        &::after {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: @defaultColor;
        }
      }
      .item-content-tips {
        color: #989899;
      }
    }
    &-success {
      .item-content-type {
        padding: 0;
        font-family: "element-icons";
        &::after {
          content: "\e6da" !important;
          color: #fff;
          font-size: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
    }
    .item-content-title {
      font-size: 16px;
      color: #666;
    }
    .item-content-type {
      width: 33px;
      height: 33px;
      border-radius: 50%;
      position: relative;
      margin: 10px auto 7px;
      &::after {
        content: "";
        position: absolute;
        border-radius: 50%;
      }
    }
    .item-content-tips {
      font-size: 20px;
    }
  }
}
</style>
<template>
  <div class="progress-content">
    <div
      v-for="(item, i) in list"
      v-bind:key="i"
      :class="item.type"
      class="progress-item-content"
    >
      <div class="item-content-title">{{ item.date }}</div>
      <div class="item-content-type"></div>
      <div class="item-content-tips">{{ item.message }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      list: [
        {
          type: "progress-item-content-common",
          date: "2019-11-19",
          message: "录入"
        },
        {
          type: "progress-item-content-default",
          date: "",
          message: "首次带看"
        },
        {
          type: "progress-item-content-default",
          date: "",
          message: "二次带看"
        },
        {
          type: "progress-item-content-default",
          date: "",
          message: "三次带看"
        },
        {
          type: "progress-item-content-default",
          date: "",
          message: "四次带看"
        },
        {
          type: "progress-item-content-default",
          date: "",
          message: "五次带看"
        },
        {
          type: "progress-item-content-default",
          date: "",
          message: "五次以上"
        },
        {
          type: "progress-item-content-default",
          date: "",
          message: "签约"
        }
      ]
    };
  },
  mounted() {},
  methods: {},
  watch: {
    detail: {
      deep: true,
      handler(newValue) {
        if (newValue.code == 200) {
          //设置带看进度
          let list = newValue.data.SalePairOrderTblDtoList;
          console.log(newValue.data);
          let y = 1;
          for (let i = list.length - 1; i >= 0; i--) {
            if (y > 5) {
              this.list[6].type = "progress-item-content-common";
              this.list[6].date = "-";
              return;
            }
            this.list[y].type = "progress-item-content-common";
            this.list[y].date = moment(list[i].EndTime).format("YYYY-MM-DD");
            y++;
          }
          //设置录入时间
          this.list[0].date = moment(
            newValue.data.bsAgentCustomersTbl.addTime
          ).format("YYYY-MM-DD");

          //设置是否签约
          if (newValue.data.saleCusPropertyTbl.isBuy == 1) {
            this.list[7].type = "progress-item-content-success";
            this.list[7].date = moment(
              newValue.data.saleCusPropertyTbl.buyTime
            ).format("YYYY-MM-DD");
          }
        } else {
          this.$message({
            type: "info",
            message: newValue.message
          });
        }
      }
    }
  },
  computed: {
    ...mapState({
      detail: value => {
        return value.customers.process.salePairProcess;
      }
    })
  }
};
</script>
