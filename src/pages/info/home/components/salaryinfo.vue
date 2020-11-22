<style lang="less" scoped>
.icon-row {
  display: flex;
  margin: 24px -8px 0;
  .row-item {
    background: #ffffff;
    box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
    border-radius: 8px;
    flex: 0 0 calc((100% - 64px) / 4);
    margin: 0 8px;
    height: 110px;
    background: #fff;
    display: flex;
    align-items: center;
    .row-item-icon {
      width: 82px;
      text-align: center;
    }
    .row-item-data {
      line-height: 1;
      .row-data-title {
        color: #909399;
        margin-bottom: 16px;
        line-height: 1;
        font-size: 0;
        display: flex;
        span {
          font-size: @font14;
          line-height: 1;
        }
        .iconfont {
          margin-left: 12px;
          cursor: pointer;
          color: #606266;
          &.iconyincang {
            font-size: @font14;
          }
          &.iconyincang {
            display: block;
            font-size: @font18;
            height: 9px;
            transform: scale(0.5);
            transform-origin: left center;
          }
        }
      }
      .row-data-value {
        display: flex;
        align-items: baseline;
        .value-after {
          font-size: @font16;
          font-weight: bold;

          margin-right: 4px;
        }
        .value-data {
          font-family: lsx;
          font-size: @font24;
          color: #303133;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
<template>
  <div class="icon-row">
    <!-- 本业工资 -->
    <div class="row-item">
      <div class="row-item-icon">
        <img src="https://img.0be.cn/pc/attence_17.svg" alt="" />
      </div>
      <div class="row-item-data">
        <div class="row-data-title">
          <span>本月工资</span>
          <span
            class="iconfont"
            @click="setHidePirce"
            :class="isHidePirce ? 'iconxianshi' : 'iconyincang'"
          ></span>
        </div>
        <div class="row-data-value">
          <span class="value-after">￥</span>
          <span class="value-data">{{
            isHidePirce ? "****" : base.salary
          }}</span>
        </div>
      </div>
    </div>
    <!-- 业绩核算 -->
    <div class="row-item">
      <div class="row-item-icon">
        <img src="https://img.0be.cn/pc/attence_18.svg" alt="" />
      </div>
      <div class="row-item-data">
        <div class="row-data-title"><span>业绩核算(万)</span></div>
        <div class="row-data-value">
          <span class="value-after">￥</span>
          <span class="value-data">{{ base.allCommission }}</span>
        </div>
      </div>
    </div>
    <!-- 品牌分 -->
    <div class="row-item">
      <div class="row-item-icon">
        <img src="https://img.0be.cn/pc/attence_16.svg" alt="" />
      </div>
      <div class="row-item-data">
        <div class="row-data-title"><span>品牌分</span></div>
        <div class="row-data-value">
          <!-- <span class="value-after">￥</span> -->
          <span class="value-data">{{ base.brandScore }}</span>
        </div>
      </div>
    </div>
    <!-- 品牌分 -->
    <div class="row-item">
      <div class="row-item-icon">
        <img src="https://img.0be.cn/pc/attence_19.svg" alt="" />
      </div>
      <div class="row-item-data">
        <div class="row-data-title"><span>级别</span></div>
        <div class="row-data-value">
          <!-- <span class="value-after">￥</span> -->
          <span class="value-data">{{ base.levelCode }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  data() {
    return {
      base: {},
      isHidePirce: true
    };
  },
  created() {
    this.getBase();
  },
  methods: {
    setHidePirce() {
      this.isHidePirce = !this.isHidePirce;
    },
    /**
     * @example: 获取基础信息
     */

    getBase() {
      this.$api
        .get({
          url: "/statistics/index/base"
        })
        .then(({ data }) => {
          this.base = {
            salary: util.regexNum(Number(data.data.salary)),
            allCommission: util.regexNum(
              Number.parseInt(data.data.allCommission / 100) / 100
            ),
            brandScore: util.regexNum(Number(data.data.brandScore)),
            levelCode: data.data.levelCode || "暂无"
          };
        });
    }
  }
};
</script>
