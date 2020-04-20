<style lang="less" scoped>
.tips-abs {
  padding: 6px 12px;
  color: #fff;
  background: #73b1ff;
  font-size: 16px;
  border-radius: 4px;
}
.page-row-flex {
  flex: 1;
  padding-top: 10px;
  box-sizing: border-box;
  display: flex;
  .echart-query {
    background: #fff;
    width: 628px;
    height: 100%;
    .echart-query-header {
      position: relative;
      font-size: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
      .query-heander-abs {
        align-self: flex-start;
        .tips-abs;
      }
      .query-content {
        .query-content-row {
          padding: 0 30px;
          display: flex;
          align-items: center;
          margin-top: 20px;
          .query-row-title {
            font-size: 15px;
            color: black;
          }
          @height: 34px;
          /deep/.query-input {
            width: 152px;
            margin: 0 7px;
            .el-input__inner {
              background: #f6f6f6;
              height: @height;
              line-height: @height;
              &::placeholder {
                color: #9c9c9c;
              }
            }
            .el-input__icon {
              line-height: @height;
              font-size: 20px;
            }
          }
          /deep/.query-date {
            width: 260px;
            height: @height;
            line-height: @height;
            margin: 0 7px;
            background: #f6f6f6;
            input::placeholder {
              color: #9c9c9c;
            }
            .el-range-separator,
            .el-input__icon {
              height: @height;
              line-height: @height;
            }
          }
          /deep/.el-button {
            height: @height;
            padding-top: 0;
            padding-bottom: 0;
          }
        }
      }
      //表格
      .query-table-conten {
        padding: 0 30px;
        margin-top: 25px;
        flex: 1;
        &::before {
          content: "";
          display: block;
          height: 1px;
          background: #e8dfdd;
          margin-bottom: 15px;
        }
        .query-table-data {
          padding: 0 8px;
        }
        /deep/.current-row {
          td {
            background: #feb55f;
          }
        }
      }
      .query-table-foot {
        padding: 0 10px;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
        .table-foot-bor {
          border: 1px solid #ebeef5;
          border-radius: 4px;
          padding: 10px 0;
        }
      }
    }
  }
  .echart-data {
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    .echart-data-content {
      height: 366px;
      background: #fff;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      .query-heander-abs {
        display: inline-flex;
        span {
          .tips-abs;
        }
        &::after {
          content: "数据范围(区域)";
          margin-left: 10px;
          color: #a9a9a9;
          align-self: flex-end;
          font-size: 14px;
        }
      }
      .data-content-progress {
        .progress-layout {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          /deep/.progress-content {
            margin-right: 40px;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
    .echart-canvas {
      //height: 454px;
      flex: 1;
      min-height: 454px;
      background: #fff;
      position: relative;
      .query-heander-abs {
        display: inline-block;
        .tips-abs;
      }
      #chart {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        // position: absolute;
        // top: 0;
        // left: 0;
        // right: 0;
        // bottom: 0;
      }
    }
  }
}
.tableColSet {
  vertical-align: middle;
  text-align: center;
  height: 50px;
  padding: 0;
}
/deep/.cellItemSet {
  color: #262626;
  .tableColSet;
}
/deep/.headerCellSet {
  background: #fafafa;
  color: #262626;
  font-weight: normal;
  .tableColSet;
}
.mar40 {
  margin-right: 40px;
  &:last-child {
    margin-right: 0;
  }
}
</style>
<template>
  <section class="page-row-flex">
    <section class="echart-query">
      <section class="echart-query-header">
        <h3 class="query-heander-abs">热点搜索</h3>
        <!-- 搜索 -->
        <div class="query-content">
          <div class="query-content-row">
            <div class="query-row-title">小区搜索</div>
            <el-autocomplete class="query-input"
                             v-model="queryContent.communityName"
                             prefix-icon="el-icon-search"
                             :fetch-suggestions="querySearch"
                             placeholder="你想找那个小区?"></el-autocomplete>
            <el-button type="primary">确定</el-button>
          </div>
          <div class="query-content-row">
            <div class="query-row-title">时间搜索</div>
            <el-date-picker class="query-date"
                            v-model="queryContent.queryTime"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="选择开始时间"
                            end-placeholder="选择结束时间">
            </el-date-picker>
            <el-button type="primary">确定</el-button>
          </div>
        </div>
        <!-- 表格 -->
        <div class="query-table-conten">
          <div class="query-table-data">
            <el-table :data="tableDataText"
                      highlight-current-row
                      header-cell-class-name="headerCellSet"
                      cell-class-name="cellItemSet"
                      show-overflow-tooltip
                      border>
              <el-table-column type="index"
                               width="50">
              </el-table-column>
              <el-table-column v-for="item in tableDataColumn"
                               :key="item.label"
                               :sort-orders="['ascending', 'descending']"
                               :label="item.label"
                               :sortable="item.order"
                               :width="item.item"
                               :prop="item.prop">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 分页 -->
        <div class="query-table-foot"
             v-if="pageJson.total > 1">
          <div class="table-foot-bor">
            <el-pagination background
                           :current-page.sync="pageJson.current"
                           hide-on-single-page
                           layout=" prev, pager, next, jumper"
                           :total="pageJson.total">
            </el-pagination>
          </div>
        </div>
      </section>
    </section>
    <section class="echart-data">
      <div class="echart-data-content">
        <h3 class="query-heander-abs">
          <span>热点搜索</span>
        </h3>
        <div class="data-content-progress">
          <div class="progress-layout">
            <progress-content :houseNum="30"
                              :compare="30"
                              progress="6%"
                              reset-progress
                              proportion="公司总占比"></progress-content>
            <progress-content :houseNum="100"
                              :compare="-30"
                              progress="25%"
                              reset-progress
                              proportion="公司总占比"></progress-content>
            <progress-content :houseNum="120"
                              :compare="20"
                              progress="19%"
                              reset-progress
                              proportion="公司总占比"></progress-content>
          </div>
          <div class="progress-layout">
            <progress-content :houseNum="140"
                              :compare="-200"
                              progress="10%"
                              reset-progress
                              proportion="公司总占比"></progress-content>
            <progress-content :houseNum="120"
                              :compare="220"
                              progress="100%"
                              reset-progress
                              proportion="公司总占比"></progress-content>
            <progress-content :houseNum="120"
                              :compare="-220"
                              progress="96%"
                              reset-progress
                              proportion="公司总占比"></progress-content>
          </div>
        </div>
      </div>
      <div class="echart-canvas">
        <h3 class="query-heander-abs">
          <span>进七日分析</span>
        </h3>
        <div id="chart"
             ref="chart">
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import progressContent from "./components/progressContent";
import echarts from "@/util/echartsConfig";
import {
  addResizeListener,
  removeResizeListener
} from "element-ui/src/utils/resize-event";
export default {
  components: {
    progressContent
  },
  data () {
    return {
      livingChart: null,
      queryContent: {
        communityName: "",
        queryTime: ""
      },
      pageJson: {
        current: 1,
        total: 300
      },
      tableDataColumn: [
        { label: "小区", width: "", prop: "communityName", order: false },
        {
          label: "看房客户",
          width: "",
          prop: "communitycount",
          order: "custom"
        },
        { label: "被看次数", width: "", prop: "const", order: "custom" }
      ],
      tableDataText: [
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 },
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 },
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 },
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 },
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 },
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 },
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 },
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 },
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 },
        { communityName: "国贸天琴弯(二期)", communitycount: 26, const: 33 }
      ]
    };
  },
  mounted () {
    addResizeListener(this.$refs.chart, this.resetEcharts);
    this.draw();
  },
  destroyed () {
    removeResizeListener(this.$refs.chart, this.resetEcharts);
  },
  methods: {
    querySearch (value, resolve) {
      resolve([{ value: "小区1" }, { value: "小区2" }]);
    },
    resetEcharts () {
      if (!this.livingChart) return;
      this.livingChart.resize();
    },
    draw () {
      // 实例化echarts对象
      this.livingChart = echarts.init(this.$refs.chart);
      // 绘制条形图
      this.livingChart.setOption({
        title: {
          text: "2020年3月第一周",
          right: 0,
          textStyle: {
            fontSize: 15,
            fontFamily: "SimHei"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["看房跟单数", "看房客户数", "房源被看次数"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          axisLine: {
            show: false
          },
          //  type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: ["#fde2bf"],
              type: "dashed"
            }
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: "看房跟单数",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "看房客户数",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "房源被看次数",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      });
    }
  }
};
</script>