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
        span {
          .tips-abs;
        }
        &::after {
          content: "默认为本月数据";
          margin-left: 10px;
          color: #a9a9a9;
          align-self: flex-end;
          font-size: 14px;
        }
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
          content: "数据更新时间截止到：昨日24点";
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
      .query-condition-div {
        display: flex;
        align-items: center;
        margin-top: 10px;
        margin-left: 150px;
        .select {
          width: 20%;
          margin-left: 10px;
        }
        .font {
          font-size: 15px;
          margin-left: 10px;
        }
        .reset {
          font-size: 15px;
          margin-left: 10px;
          color: rgb(18, 130, 77);
          cursor: pointer;
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
        <h3 class="query-heander-abs">
          <span>热点搜索</span>
        </h3>
        <!-- 搜索 -->
        <div class="query-content">
          <div class="query-content-row">
            <div class="query-row-title">小区搜索</div>
            <el-autocomplete
              data-anchor="我的数据小区搜索 => input"
              class="query-input anchor-point"
              v-model="queryContent.communityName"
              prefix-icon="el-icon-search"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="true"
              placeholder="你想找那个小区?"
              @select="selectCommunity"
            ></el-autocomplete>
            <!-- <el-button type="primary" @click="reloadList">确定</el-button> -->
          </div>
          <div class="query-content-row">
            <div class="query-row-title">时间搜索</div>
            <el-date-picker
              data-anchor="我的数据时间搜索 => input"
              class="query-date anchor-point"
              v-model="queryContent.queryTime"
              type="daterange"
              range-separator="-"
              start-placeholder="选择开始时间"
              end-placeholder="选择结束时间"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-button
              data-anchor="我的数据确定 => click"
              type="primary"
              class="anchor-point"
              @click="reloadList"
              >确定</el-button
            >
          </div>
        </div>
        <!-- 表格 -->
        <div class="query-table-conten">
          <div class="query-table-data">
            <el-table
              :data="tableDataText"
              highlight-current-row
              header-cell-class-name="headerCellSet anchor-point"
              cell-class-name="cellItemSet"
              show-overflow-tooltip
              border
              @sort-change="sortChange"
            >
              <el-table-column type="index" width="50"> </el-table-column>
              <el-table-column
                class-name="anchor-point"
                v-for="item in tableDataColumn"
                :key="item.label"
                :sort-orders="['ascending', 'descending']"
                :label="item.label"
                :sortable="item.order"
                :width="item.item"
                :prop="item.prop"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 分页 -->
        <div class="query-table-foot" v-if="pageJson.total > 1">
          <div class="table-foot-bor">
            <el-pagination
              class="anchor-point"
              background
              :current-page.sync="pageJson.current"
              hide-on-single-page
              layout=" prev, pager, next, jumper"
              :total="pageJson.total"
              @current-change="currentChange"
            >
            </el-pagination>
          </div>
        </div>
      </section>
    </section>
    <section class="echart-data" v-loading="dailyLoading">
      <div class="echart-data-content">
        <h3 class="query-heander-abs">
          <span>今日推荐</span>
        </h3>
        <div class="query-condition-div">
          <span class="font">区域</span>
          <el-select
            data-anchor="更多筛选组件区域 => select"
            v-model="queryCondition.deptParentId"
            :remote-method="remoteArea"
            clearable
            @focus="remoteSelect"
            @change="queryShop"
            class="select"
          >
            <el-option
              data-anchor="更多筛选组件区域 => select => option"
              class="anchor-point"
              v-for="item in deptParentList"
              :key="item.depId"
              :value="item.depId"
              :label="item.depName"
            ></el-option>
          </el-select>
          <span class="font">门店</span>
          <el-select
            data-anchor="更多筛选组件区域 => select"
            class="select"
            v-model="queryCondition.store"
            @change="queryPer"
            clearable
          >
            <el-option
              data-anchor="更多筛选组件区域 => select => option"
              class="anchor-point"
              v-for="item in storeList"
              :key="item.depId"
              :value="item.depId"
              :label="item.depName"
            ></el-option>
          </el-select>
          <span class="font">个人</span>
          <el-select
            data-anchor="更多筛选组件区域 => select"
            class="select"
            v-model="queryCondition.personnel"
            clearable
            @change="changeAccount"
          >
            <el-option
              data-anchor="更多筛选组件区域 => select => option"
              class="anchor-point"
              v-for="item in perList"
              :key="item.accountId"
              :value="item.accountId"
              :label="item.perName"
            ></el-option>
          </el-select>
          <div class="reset" @click="resetData">
            <i class="el-icon-refresh-left"></i>
            <span>重置</span>
          </div>
        </div>
        <div class="data-content-progress">
          <div class="progress-layout">
            <progress-content
              :houseNum="yesterday.agentCount || 0"
              :compare="yesterday.agentCount - beforeYesterday.agentCount || 0"
              :progress="progress.agentCount || '0%'"
              reset-progress
              proportion="公司总占比"
              title="跟单数"
            ></progress-content>
            <progress-content
              :houseNum="yesterday.addCount || 0"
              :compare="yesterday.addCount - beforeYesterday.addCount || 0"
              :progress="progress.addCount || '0%'"
              reset-progress
              proportion="公司总占比"
              title="录入数"
            ></progress-content>
            <progress-content
              :houseNum="yesterday.keyCount || 0"
              :compare="yesterday.keyCount - beforeYesterday.keyCount || 0"
              :progress="progress.keyCount || '0%'"
              reset-progress
              proportion="公司总占比"
              title="钥匙数"
            ></progress-content>
          </div>
          <div class="progress-layout">
            <progress-content
              :houseNum="yesterday.commonCount || 0"
              :compare="
                yesterday.commonCount - beforeYesterday.commonCount || 0
              "
              :progress="progress.commonCount || '0%'"
              reset-progress
              proportion="公司总占比"
              title="普通委托数"
            ></progress-content>
            <progress-content
              :houseNum="yesterday.onlyCount || 0"
              :compare="yesterday.onlyCount - beforeYesterday.onlyCount || 0"
              :progress="progress.onlyCount || '0%'"
              reset-progress
              proportion="公司总占比"
              title="独家委托数"
            ></progress-content>
            <progress-content
              :houseNum="yesterday.realCount || 0"
              :compare="yesterday.realCount - beforeYesterday.realCount || 0"
              :progress="progress.realCount || '0%'"
              reset-progress
              proportion="公司总占比"
              title="实勘数"
            ></progress-content>
          </div>
        </div>
      </div>
      <div class="echart-canvas">
        <h3 class="query-heander-abs">
          <span>近七日分析</span>
        </h3>
        <div id="chart" ref="chart"></div>
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
import { formatDate } from "element-ui/src/utils/date-util";
import util from "@/util/util";
export default {
  components: {
    progressContent
  },
  data() {
    return {
      livingChart: null,
      queryContent: {
        communityName: "",
        queryTime: [],
        comId: ""
      },
      pageJson: {
        current: 1,
        total: 0,
        pageSize: 10
      },
      tableDataColumn: [
        { label: "小区", width: "", prop: "communityName", order: false },
        {
          label: "看房客户",
          width: "",
          prop: "customerCount",
          order: "custom"
        },
        {
          label: "被看次数",
          width: "",
          prop: "houseMoviesCount",
          order: "custom"
        }
      ],
      tableDataText: [],
      companyProportion: {},
      yesterday: {},
      beforeYesterday: {},
      sortColumn: "customerCount",
      sortType: 1,
      progress: {},
      queryCondition: {
        deptParentId: "",
        store: "",
        personnel: "",
        companyId: ""
      },
      deptParentList: [],
      storeList: [],
      perList: [],
      dailyLoading: true,
      resetQueryCondition: {} //重置查询条件
    };
  },
  mounted() {
    addResizeListener(this.$refs.chart, this.resetEcharts);
    this.getList();
    this.getCompanyDate().then(e => {
      this.getSevenData();
    });
    this.resetQueryCondition = util.deepCopy(this.queryCondition); //深度copy一份查询条件
  },
  destroyed() {
    removeResizeListener(this.$refs.chart, this.resetEcharts);
  },
  methods: {
    /**
     * 重置数据
     */
    resetData() {
      this.queryCondition = util.deepCopy(this.resetQueryCondition); //重置查询条件
      this.storeList = [];
      this.perList = [];
      this.getCompanyDate().then(e => {
        this.getSevenData();
      });
    },
    /**
     * 获取公司的数据
     */
    getCompanyDate() {
      return this.getStatisticsList("company").then(e => {
        if (e.data.data) {
          this.companyProportion = e.data.data;
        }
      });
    },
    /**
     * 获取7天内的统计数据
     */
    getSevenData() {
      this.dailyLoading = true;
      this.getStatisticsList().then(e => {
        let json = {
          dayList: [],
          agentCount: [],
          lookCustomersCount: [],
          houseMoviesCount: []
        };
        if (e.data.data.length > 0) {
          var yesterday = formatDate(
            new Date().setDate(new Date().getDate() - 1),
            "MM-dd"
          );
          var beforeYesterday = formatDate(
            new Date().setDate(new Date().getDate() - 2),
            "MM-dd"
          );
          e.data.data.forEach(element => {
            json.dayList.push(element.createTime);
            //json.agentCount.push(element.agentCount);
            json.lookCustomersCount.push(element.lookCustomersCount);
            json.houseMoviesCount.push(element.houseMoviesCount);
            if (element.createTime == yesterday) {
              this.yesterday = element;
              Object.keys(this.companyProportion).forEach(e => {
                this.progress[e] =
                  this.companyProportion[e] == 0 ||
                  this.companyProportion[e] == undefined
                    ? "0%"
                    : ((element[e] / this.companyProportion[e]) * 100).toFixed(
                        2
                      ) + "%";
              });
            }
            if (element.createTime == beforeYesterday) {
              this.beforeYesterday = element;
            }
          });
        } else {
          this.beforeYesterday = "";
          this.yesterday = "";
        }
        this.draw(json);
        this.dailyLoading = false;
      });
    },
    /**
     * 人员改变事件
     */
    changeAccount() {
      this.getSevenData();
    },
    /**
     * 获取人员
     */
    queryPer() {
      var that = this;
      //清空选中的人员
      this.queryCondition.personnel = "";
      this.getSevenData(); //获取选择的部门数据
      this.$api
        .post({
          url: `/myHouse/myData`,
          token: false,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_PER",
            areaOrStoreId: this.queryCondition.store
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.perList = e.data.data;
          }
        });
    },
    /**
     * 获取门店
     */
    queryShop(e) {
      var that = this;
      let companyId = this.deptParentList.filter(item => item.depId == e);
      this.queryCondition.companyId = companyId[0].companyId;
      //清空选中的数据
      this.queryCondition.personnel = "";
      this.perList = [];
      this.queryCondition.store = "";
      //重新加载数据
      this.getCompanyDate().then(e => {
        this.getSevenData();
      });
      this.$api
        .post({
          url: `/myHouse/myData`,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            selectType: "MORE_SELECT_SHOP",
            areaOrStoreId: this.queryCondition.deptParentId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.storeList = e.data.data;
          }
        });
    },
    remoteSelect() {
      if (this.queryCondition.deptParentId.length == 0) {
        this.remoteArea();
      }
    },
    /**
     * 获取区域
     */
    remoteArea(query) {
      var that = this;
      if (query !== "") {
        this.$api
          .post({
            url: `/myHouse/myData`,
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: {
              selectType: "MORE_SELECT_AREA"
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.deptParentList = e.data.data;
            }
          });
      } else {
        this.deptParentList = [];
      }
    },
    getCommunity(value) {
      return this.$api
        .get({
          url: "/community/myDataList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          qs: true,
          data: {
            communityName: value,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          return e;
        });
    },
    reloadList() {
      this.pageJson.current = 1;
      this.pageJson.total = 0;
      this.getList();
    },
    /**
     * 排序
     */
    sortChange(e) {
      this.sortColumn = e.prop;
      if (e.order == "ascending") {
        this.sortType = 0;
      } else {
        this.sortType = 1;
      }
      this.reloadList();
    },
    /**
     * 分页
     */
    currentChange(e) {
      this.getList();
    },
    /**
     * 获取列表数据
     */
    getList() {
      let params = {
        sortColumn: this.sortColumn,
        sortType: this.sortType,
        limit: this.pageJson.pageSize,
        page: this.pageJson.current,
        beginTime:
          this.queryContent.queryTime.length > 0
            ? this.queryContent.queryTime[0]
            : formatDate(new Date().setDate(new Date().getDate()), "yyyy-MM") +
              "-01",
        endTime:
          this.queryContent.queryTime.length > 0
            ? this.queryContent.queryTime[1]
            : formatDate(
                new Date().setDate(new Date().getDate()),
                "yyyy-MM-dd"
              ),
        comId:
          this.queryContent.communityName == "" ? "" : this.queryContent.comId
      };
      this.$api
        .post({
          url: "/myHouse/myDataList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200 && data.data.list) {
            this.pageJson.total = data.data.totalCount;
            this.tableDataText = data.data.list;
          }
        });
    },
    getStatisticsList(type = "") {
      return this.$api
        .post({
          url: "/myHouse/myData",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            type: type,
            areaId: this.queryCondition.deptParentId,
            departmentId: this.queryCondition.store,
            accountId: this.queryCondition.personnel,
            companyId: this.queryCondition.companyId
          }
        })
        .then(e => {
          return e;
        });
    },
    selectCommunity(e) {
      this.queryContent.comId = e.id;
      this.reloadList();
    },
    querySearch(value, resolve) {
      this.queryContent.comId = "";
      console.log(value, "valuevaluevalue");
      this.getCommunity(value).then(e => {
        if (e.data.code == 200) {
          resolve(
            e.data.data.list.map(item => {
              return { value: item.name, id: item.value };
            })
          );
        }
      });
    },
    resetEcharts() {
      if (!this.livingChart) return;
      this.livingChart.resize();
    },
    draw(data) {
      // 实例化echarts对象
      this.livingChart = echarts.init(this.$refs.chart);
      let text = formatDate(new Date(), "yyyy年MM月");
      // 绘制条形图
      this.livingChart.setOption({
        title: {
          text: text,
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
          data: ["看房客户数", "房源被看次数"]
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
          data: data.dayList
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
            name: "看房客户数",
            type: "line",
            stack: "总量",
            data: data.lookCustomersCount
          },
          {
            name: "房源被看次数",
            type: "line",
            stack: "总量",
            data: data.houseMoviesCount
          }
        ]
      });
    }
  }
};
</script>
