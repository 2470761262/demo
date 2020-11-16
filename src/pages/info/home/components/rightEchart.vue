<style lang="less" scoped>
.rank-item {
  background: #ffffff;
  box-shadow: 0px 8px 13px 0px rgba(68, 163, 163, 0.1);
  border-radius: 8px;
  flex: 1;
  margin-right: 16px;
  background: #fff;
  padding: 24px 0;
  .rank-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    .head-title {
      font-size: @font18;
      color: #303133;
      font-weight: bold;
      display: flex;
      align-items: baseline;
      position: relative;
      .after-content {
        margin-left: 16px;
        display: flex;
        align-items: center;
        color: #909399;
        cursor: pointer;
        .after-text {
          font-size: @font14;
        }
        .iconfont {
          font-size: 12px;
          transform: scale(0.5);
          margin-left: 2px;
        }
      }
    }
    .head-btn {
      cursor: pointer;
      color: @backgroud;
      font-size: @font14;
      &::before {
        margin-right: 8px;
      }
    }
  }
  .echart-content {
    padding: 0 24px;
    height: 254px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 24px;
      right: 24px;
      height: 1px;
      background: #f0f2f5;
    }
    #chart {
      width: 100%;
      height: 213px;
    }
    .cheart-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #909399;
        font-size: @font12;
      }
      button {
        background: #fff;
        border: 1px solid @backgroud;
        color: @backgroud;
        width: 85px;
        height: 28px;
        border-radius: 4px;
        font-size: @font12;
        text-align: center;
        line-height: 1;
        outline: none;
        cursor: pointer;
      }
    }
  }
  .rank-list {
    margin-top: 24px;
    .rank-list-head {
      display: flex;
      padding: 0 24px;
      .head-item {
        .head-item-f;
      }
    }
  }
  .rank-list-data {
    margin-top: 7px;
    padding: 16px 0px 0;
    height: 300px;
    position: relative;
    .is-fixed {
      z-index: 10;
      border-radius: 4px;
      position: absolute;
      bottom: 0;
      left: 24px;
      right: 24px;
      background: linear-gradient(
          360deg,
          rgba(48, 192, 181, 0.08) 0%,
          rgba(34, 186, 175, 0.22) 100%
        )
        #fff;
      height: 58px;
      box-shadow: 0px 3px 13px 0px rgba(147, 147, 147, 0.1);
      .scrollbar> .data-item;
    }
    .scrollbar {
      height: 100%;
      /deep/.el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .scroll-pad {
        padding: 0 24px;
        &.is-emplt-split {
          &::after {
            content: "";
            display: block;

            height: 82px;
          }
        }
      }
      .data-item {
        &:last-child {
          margin-bottom: 0;
        }
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        .rank-img {
          padding-left: 16px;
        }
        .rank-icon {
          padding-left: 16px;
          font-size: @font16;
          color: #303133;
          font-family: rank;
        }
        .rank-middle {
          flex: 1;
          display: flex;
          align-items: center;
          margin-left: 24px;
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-right: 8px;
          }
          .per-name {
            font-size: @font16;
            color: #303133;
            font-weight: bold;
          }
        }
        .rank-value {
          display: flex;
          align-items: baseline;
          font-weight: bold;
          padding-right: 16px;
          span {
            &:first-child {
              font-size: @font12;
              margin-right: 2px;
            }
            &:last-child {
              font-size: @font16;
              color: #303133;
              font-family: lsx;
            }
          }
        }
      }
    }
  }
  &:last-child {
    margin-right: 0;
  }
}
.head-item-f(@color:@backgroud,@font:@font16) {
  cursor: pointer;
  color: @color;
  font-size: @font;

  margin-right: 24px;
  &.active {
    position: relative;
    font-weight: bold;
    color: @backgroud;
    font-size: @font16;

    padding-bottom: 9px;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      height: 4px;
      background: @backgroud;

      border-radius: 2px 2px 0px 0px;
    }
  }
}
</style>

<template>
  <div class="rank-item">
    <div class="rank-head">
      <span class="head-title">
        <span class="title-text">门店业绩</span>
        <div class="after-content" @click="changeSelectFlag">
          <span class="after-text">中诚一店</span>
          <span class="iconfont iconjuxing"></span>
        </div>
        <ls-select
          v-if="selectFlag"
          place-str="搜索门店"
          key-value="deptSelectFlag"
          @close="changeSelectFlag"
        />
      </span>
      <span class="head-btn el-icon-refresh">更新数据</span>
    </div>
    <div class="echart-content">
      <div id="chart" ref="echart"></div>
      <div class="cheart-foot">
        <span>更新时间：2020-11-04</span>
        <button>查看上月</button>
      </div>
    </div>
    <div class="rank-list">
      <div class="rank-list-head">
        <div class="head-item active">公司排名</div>
        <div class="head-item">团队级别排名</div>
        <div class="head-item">区域排名</div>
      </div>
      <div class="rank-list-data">
        <el-scrollbar class="scrollbar">
          <!-- 如果需要显示is-fixed 则需要加上这个样式is-emplt-split -->
          <div class="scroll-pad is-emplt-split">
            <div class="data-item">
              <div class="rank-img">
                <img src="https://img.0be.cn/pc/attence_bz_00.svg" alt="" />
              </div>
              <div class="rank-middle">
                <span class="per-name">Redbone</span>
              </div>
              <div class="rank-value">
                <span>￥</span>
                <span>21,391</span>
              </div>
            </div>
            <div class="data-item">
              <div class="rank-img">
                <img src="https://img.0be.cn/pc/attence_bz_01.svg" alt="" />
              </div>
              <div class="rank-middle">
                <span class="per-name">Where We Started</span>
              </div>
              <div class="rank-value">
                <span>￥</span>
                <span>21,391</span>
              </div>
            </div>
            <div class="data-item">
              <div class="rank-img">
                <img src="https://img.0be.cn/pc/attence_bz_02.svg" alt="" />
              </div>
              <div class="rank-middle">
                <span class="per-name">It Ain't Me</span>
              </div>
              <div class="rank-value">
                <span>￥</span>
                <span>21,391</span>
              </div>
            </div>
            <div class="data-item">
              <div class="rank-icon">
                04.
              </div>
              <div class="rank-middle">
                <span class="per-name">Good Love</span>
              </div>
              <div class="rank-value">
                <span>￥</span>
                <span>21,391</span>
              </div>
            </div>
            <div class="data-item">
              <div class="rank-icon">
                05.
              </div>
              <div class="rank-middle">
                <span class="per-name">Creep</span>
              </div>
              <div class="rank-value">
                <span>￥</span>
                <span>21,391</span>
              </div>
            </div>
            <div class="data-item">
              <div class="rank-icon">
                06.
              </div>
              <div class="rank-middle">
                <span class="per-name">空姐陷阱</span>
              </div>
              <div class="rank-value">
                <span>￥</span>
                <span>21,391</span>
              </div>
            </div>
            <div class="data-item">
              <div class="rank-icon">
                07.
              </div>
              <div class="rank-middle">
                <span class="per-name">Outside</span>
              </div>
              <div class="rank-value">
                <span>￥</span>
                <span>21,391</span>
              </div>
            </div>
          </div>
        </el-scrollbar>
        <div class="is-fixed">
          <div class="rank-icon">
            21.
          </div>
          <div class="rank-middle">
            <span class="per-name">Ocean(本店)</span>
          </div>
          <div class="rank-value">
            <span>￥</span>
            <span>21,391</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lsSelect from "../../components/lsSelect";
//echart配置文件
import config from "../config/echartConfig";
//echarts
import echarts from "@/util/echartsConfig";
export default {
  components: {
    lsSelect
  },
  data() {
    return {
      selectFlag: false,
      echartInstance: null
    };
  },
  mounted() {
    this.renderEchart({
      lease: 2000,
      deal: 98000,
      project: 1000
    });
  },
  methods: {
    changeSelectFlag(keyValue, bool) {
      this.selectFlag = !this.selectFlag;
    },
    /**
     * @example: 初始化Echart
     */
    initEchart() {
      this.echartInstance = echarts.init(this.$refs.echart);
    },
    /**
     * @example: 渲染Echart
     */
    renderEchart(echartData) {
      if (!this.echartInstance) this.initEchart();
      this.echartInstance.setOption(config(echartData));
    }
  }
};
</script>
