<template>
  <!-- 房源系统-业务管理 -->
  <div class="container">
    <span class="position">当前位置：</span>
    <div class="header">
      <div class="nav">
        <div class="item" v-for="(item, index) in navList" :key="index" :class="{'active': navActiveIndex===index}">{{item}}</div>
      </div>
      <div class="header-bottom">
        <div class="head-content-input">
          <input
            type="text"
            placeholder="请输入姓名、门店、区域"
            class="content-input anchor-point"
            v-model="businessKeyword"
            @keydown.enter="fuzzySearch"
          />
          <button
            class="inquire-content anchor-point"
            @click="fuzzySearch"
          >
            <i class="el-icon-search"></i>
          </button>
        </div>
        <div class="right">
          <el-radio-group v-model="searchType" @change="changeSearchType">
            <el-radio-button
             class="btn"
             :label="item.value"
             v-for="(item, index) in searchTypes"
             :key="index"
            >{{item.name}}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 作业数据 -->
    <div class="work">
      <div class="head">
        <div class="topic">资源统计</div>
        <el-tooltip placement="right">
          <div slot="content">
            1、房源跟单量：名下作为房源跟单人的在售房源总数量；<br/>
            2、独家委托量：名下作为独家委托人的在售房源总数量；<br/>
            3、普通委托量：名下作为普通委托人的在售房源总数量；<br/>
            4、钥匙委托量：名下作为钥匙委托人的在售房源总数量；<br/>
            5、房源录入量：名下作为房源录入人的在售房源总数量；<br/>
            6、客户量：名下录入客户需求类型为买二手的私客数量。
          </div>
          <div class="tip-box">
            <div class="text">数据说明</div>
            <i class="el-icon-question"></i>
          </div>
        </el-tooltip>
      </div>
      <div class="content">
        <el-table
          :data="workData"
          height="368"
          @sort-change="changeWorkSort"
        >
          <el-table-column
            v-for="(item, index) in workColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :sortable="item.sortable"
            :sort-method="sortDevName"
            >
          </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange($event, 'workPaginate')"
        @current-change="handleCurrentChange($event, 'workPaginate')"
        :current-page="workPaginate.page"
        :page-sizes="[5, 10, 15]"
        :page-size="workPaginate.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="workPaginate.total">
        </el-pagination>
      </div>
    </div>
    <!-- 开发数据 -->
    <div class="develop">
      <div class="head">
        <div class="search-box">
          <div class="title">查询时间</div>
          <div class="time-box">
            <el-date-picker
              class="date-picker"
              v-model="developBeginDate"
              type="date"
              value-format="yyyy-MM-dd"
              prefix-icon="none"
              placeholder="起始日期">
            </el-date-picker>
            <span class="pre">至</span>
            <el-date-picker
              class="date-picker"
              v-model="developEndDate"
              type="date"
              value-format="yyyy-MM-dd"
              prefix-icon="none"
              placeholder="结束日期">
            </el-date-picker>
          </div>
          <button class="search-btn" @click="resetDevelopDate">重置</button>
          <button class="search-btn active" @click="queryDevelopData">搜索</button>
        </div>
        <el-tooltip placement="right">
          <div slot="content">
            1、房源开发<br/>
            电开次数：在“开发线索”列表累计回访房源的次数；<br/>
            新增验真：新增录入房源累计验真通过的房源数量；<br/>
            库存验真：店公共盘、公司公盘申请跟单人，累计验真通过的房源数量；<br/>
            2、房源维护<br/>
            被看次数：名下跟单房源累计被带看的次数<br/>
            电话回访：跟单人回访名下跟单房源累计回访的次数<br/>
            写面访：跟单房源累计添加面访的数量<br/>
            3、客源开发<br/>
            电开次数：在“公客池”列表累计回访客源的次数<br/>
            新增客户：累计新增录入私客的数量<br/>
            认领客户：公客池累计认领客户的数量<br/>
            4、客源维护<br/>
            带看客户数：累计带看的客户数量（去重）<br/>
            1带多看：添加带看记录，添加两套房源以上的客户数量<br/>
            3日内首看：客户自录入时间起, 3日内有过首次带看的客户数量<br/>
            7日内首看：客户自录入时间起, 7日内有过首次带看的客户数量<br/>
            复看：首看后，有产生第二次带看的客户数量<br/>
          </div>
          <div class="tip-box">
            <div class="text">数据说明</div>
            <i class="el-icon-question"></i>
          </div>
        </el-tooltip>
      </div>
      <div class="content">
        <el-table
         :data="developData"
          height="417"
          @sort-change="changeDevelopSort">
          <el-table-column
            v-for="(item, index) in developColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :fixed="item.fixed">
            <el-table-column
              v-for="(list, i) in item.children"
              :key="i"
              :prop="list.prop"
              :label="list.label"
              :width="list.width"
              :min-width="list.minWidth"
              :align="list.align"
              :sortable="list.sortable">
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange($event, 'developPaginate')"
        @current-change="handleCurrentChange($event, 'developPaginate')"
        :current-page="developPaginate.page"
        :page-sizes="[5, 10, 15]"
        :page-size="developPaginate.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="developPaginate.total">
        </el-pagination>
      </div>
    </div>
    <!-- 鑫币数据 -->
    <div class="currency">
      <div class="head">
        <div class="search-box">
          <div class="title">查询时间</div>
          <!-- <el-date-picker
            class="month-picker"
            v-model="currencyMonth"
            type="month"
            value-format="yyyy-MM"
            placeholder="选择月份">
          </el-date-picker> -->
          <div class="time-box">
            <el-date-picker
              class="date-picker"
              v-model="currencyBeginDate"
              type="date"
              value-format="yyyy-MM-dd"
              prefix-icon="none"
              placeholder="起始日期">
            </el-date-picker>
            <span class="pre">至</span>
            <el-date-picker
              class="date-picker"
              v-model="currencyEndDate"
              type="date"
              value-format="yyyy-MM-dd"
              prefix-icon="none"
              placeholder="结束日期">
            </el-date-picker>
          </div>
          <button class="search-btn" @click="resetCurrencyDate">重置</button>
          <button class="search-btn active" @click="queryCurrencyData">搜索</button>
        </div>
        <el-tooltip placement="right">
          <div slot="content">
            1、新增鑫币：昨日新增的鑫币值；<br/>
            2、兑换（品牌分）：本月兑换成品牌分的鑫币值；<br/>
            3、兑换（物品）：本月兑换成物品的鑫币值；<br/>
            4、剩余鑫币：当前剩余的鑫币值。
          </div>
          <div class="tip-box">
            <div class="text">数据说明</div>
            <i class="el-icon-question"></i>
          </div>
        </el-tooltip>
      </div>
      <div class="nav-box">
        <div class="item"
         v-for="(item, index) in currencyTypes"
         :key="index"
         :class="{'active': currencyTypeIndex===index}"
         @click="changeCurrencyType(index)"
        >{{item.name}}</div>
        <p class="tip">注：取值数据截止到昨天24点整</p>
      </div>
      <div class="content">
        <el-table
         :data="currencyData"
          height="368"
          @sort-change="changeCurrencySort">
          <el-table-column
            v-for="(item, index) in currencyColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :sortable="item.sortable"
            >
          </el-table-column>
        </el-table>
        <el-pagination
        @size-change="handleSizeChange($event, 'currencyPaginate')"
        @current-change="handleCurrentChange($event, 'currencyPaginate')"
        :current-page="currencyPaginate.page"
        :page-sizes="[5, 10, 15]"
        :page-size="currencyPaginate.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="currencyPaginate.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navActiveIndex: 0,
      navList: ["业务管理", "买卖房源", "租赁房源", "客源", "人员管理"],
      businessKeyword: "",
      searchTypes: [
        {
          name: "经纪人",
          value: 0
        }, {
          name: "门店",
          value: 1
        }, {
          name: "区域",
          value: 2
        }
      ],
      searchType: 0,
      currentPage1: 4,
      currencyTypeIndex: 0,
      currencyTypes: [
        {
          name: "鑫币统计",
          value: 0
        }, {
          name: "业绩统计",
          value: 1
        }
      ],
      workColumn: [
        {
          prop: "perName",
          label: "姓名/门店/区域",
          minWidth: "150",
          align: "left"
        }, {
          prop: "agentNum",
          label: "跟单房源量",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "onlyNum",
          label: "独家委托量",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "normalOnlyNum",
          label: "普通委托量",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "keyNum",
          label: "钥匙委托量",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "addNum",
          label: "房源录入量",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "custNum",
          label: "客户量",
          minWidth: "150",
          align: "right",
          sortable: true
        }
      ],
      workData: [], // 作业数据,
      workPaginate: {
        page: 1,
        limit: 5,
        total: 0,
        pageSum: 0
      },
      developColumn: [
        {
          prop: "perName",
          label: "姓名/门店/区域",
          minWidth: "150",
          align: "left",
          fixed: "left"
        }, {
          label: "房源开发",
          minWidth: "300",
          align: "center",
          children: [
            {
              prop: "houseCallDevNum",
              label: "电开次数",
              minWidth: "100",
              align: "center",
              sortable: true
            }, {
              prop: "newVerifyNum",
              label: "新增验真",
              minWidth: "100",
              align: "center",
              sortable: true
            }, {
              prop: "stockVerifyNum",
              label: "库存验真",
              minWidth: "100",
              align: "center",
              sortable: true
            }
          ]
        }, {
          label: "房源维护",
          minWidth: "400",
          align: "center",
          children: [
            {
              prop: "pairedNum",
              label: "被看次数",
              minWidth: "100",
              align: "center",
              sortable: true
            }, {
              prop: "callBackNum",
              label: "电话回访",
              minWidth: "100",
              align: "center",
              sortable: true
            }, {
              prop: "intervierNum",
              label: "写面访",
              minWidth: "100",
              align: "center",
              sortable: true
            }
            // , {
            //   prop: "",
            //   label: "写跟进",
            //   minWidth: "100",
            //   align: "center",
            //  sortable: true
            // }
          ]
        }, {
          label: "客源开发",
          width: "300",
          align: "center",
          children: [
            {
              prop: "cusCallDevNum",
              label: "电开次数",
              minWidth: "100",
              align: "center",
              sortable: true
            }, {
              prop: "newCustNum",
              label: "新增客户",
              minWidth: "100",
              align: "center",
              sortable: true
            }, {
              prop: "claimCustNum",
              label: "认领客户",
              minWidth: "100",
              align: "center",
              sortable: true
            }
          ]
        }, {
          label: "客源维护",
          align: "center",
          children: [
            {
              prop: "pairCustNum",
              label: "带看客户数",
              minWidth: "120",
              align: "center",
              sortable: true
            }, {
              prop: "manyViewOnePairNum",
              label: "1带多看",
              minWidth: "100",
              align: "center",
              sortable: true
            }, {
              prop: "firstView3DaysNum",
              label: "3日内首看",
              minWidth: "120",
              align: "center",
              sortable: true
            }, {
              prop: "firstView7DaysNum",
              label: "7日内首看",
              minWidth: "120",
              align: "center",
              sortable: true
            }, {
              prop: "reViewNum",
              label: "复看",
              minWidth: "100",
              align: "center",
              sortable: true
            }
          ]
        }
      ],
      developData: [], // 开发数据
      developPaginate: {
        page: 1,
        limit: 5,
        total: 0,
        pageSum: 0
      },
      currencyColumn: [
        {
          prop: "perName",
          label: "姓名/门店/区域",
          minWidth: "150",
          align: "left"
        },
        // {
        //   prop: "curMonthAddScore",
        //   label: "本月新增",
        //   minWidth: "150",
        //   align: "right",
        //   sortable: true
        // }, 
        {
          prop: "lastDayAddScore",
          label: "新增鑫币",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "curMonthExXinScore",
          label: "兑换（品牌分）",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "curMonthExGoodScore",
          label: "兑换（物品）",
          minWidth: "150",
          align: "right",
          sortable: true
        }, {
          prop: "scoreBal",
          label: "剩余鑫币",
          minWidth: "150",
          align: "right",
          sortable: true
        }
      ],
      currencyData: [], // 鑫币数据
      currencyPaginate: {
        page: 1,
        limit: 5,
        total: 0,
        pageSum: 0
      },
      currencyMonth: "",
      developBeginDate: "",
      developEndDate: "",
      currencyBeginDate: "",
      currencyEndDate: "",
      workSortColumn: "",
      workSortType: 1,
      developSortColumn: "",
      developSortType: 1,
      currencySortColumn: "",
      currencySortType: 1
    }
  },
  created() {
    this.getWorkData();
    this.getDevelopData();
    this.getCurrencyData();
  },
  methods: {
    /**
     * @example: 获取作业数据
     */
    getWorkData() {
      let params = {
        staLev: this.searchType, //0经纪人,1门店,2区域
        dateFlag: "",//日
        perName: this.businessKeyword,
        page: this.workPaginate.page,
        limit: this.workPaginate.limit,
        sortColumn: this.workSortColumn,
        sortType: this.workSortType
      };
      this.$api
        .post({
          url: "/static/listStaticResource",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          console.log(e.data,"=========workData");
          if (e.data.code == 200) {
            this.workData = e.data.data.data;
            this.workPaginate.pageSum = e.data.data.pageSum;
            this.workPaginate.total = e.data.data.dataCount;
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    /**
     * @example: 获取开发数据
     */
    getDevelopData() {
      let params = {
        staLev: this.searchType, //0经纪人,1门店,2区域
        dateFlag: "",//日
        perName: this.businessKeyword,
        page: this.developPaginate.page,
        limit: this.developPaginate.limit,
        sortColumn: this.developSortColumn,
        sortType: this.developSortType
      };
      this.$api
        .post({
          url: "/static/listStaticResource2",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          console.log(e.data,"=========developData");
          if (e.data.code == 200) {
            this.developData = e.data.data.data;
            this.developPaginate.pageSum = e.data.data.pageSum;
            this.developPaginate.total = e.data.data.dataCount;
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    /**
     * @example: 获取鑫币统计数据
     */
    getCurrencyData() {
      let params = {
        staLev: this.searchType, //0经纪人,1门店,2区域
        dateFlag: this.currencyMonth,//日
        perName: this.businessKeyword,
        page: this.currencyPaginate.page,
        limit: this.currencyPaginate.limit,
        sortColumn: this.currencySortColumn,
        sortType: this.currencySortType
      };
      this.$api
        .post({
          url: "/static/listStaticXinScore",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          console.log(e.data,"=========currencyData");
          if (e.data.code == 200) {
            this.currencyData = e.data.data.data;
            this.currencyPaginate.pageSum = e.data.data.pageSum;
            this.currencyPaginate.total = e.data.data.dataCount;
          }
        })
        .catch(() => {})
        .finally(() => {});
    },
    /**
     * @example: 姓名/门店/区域模糊搜索
     */
    fuzzySearch() {
      console.log(this.businessKeyword, this.searchType, "模糊搜索-------");
      Object.assign(this.workPaginate, this.$options.data().workPaginate);
      Object.assign(this.developPaginate, this.$options.data().developPaginate);
      Object.assign(this.currencyPaginate, this.$options.data().currencyPaginate);
      this.getWorkData();
      this.getDevelopData();
      this.getCurrencyData();
    },
    /**
     * @example: 经纪人/门店/区域切换
     */
    changeSearchType() {
      console.log(this.businessKeyword, this.searchType, "模糊搜索-------");
      Object.assign(this.workPaginate, this.$options.data().workPaginate);
      Object.assign(this.developPaginate, this.$options.data().developPaginate);
      Object.assign(this.currencyPaginate, this.$options.data().currencyPaginate);
      this.getWorkData();
      this.getDevelopData();
      this.getCurrencyData();
    },
    /**
     * @example: 改变每页请求数据数量
     * @param {val} 请求数
     * @param {type} 分页类型
     */
    handleSizeChange(val, type) {
      console.log(`每页 ${val} 条`,type);
      this[type].limit = val;
      switch(type) {
        case "workPaginate":
          this.getWorkData();
          break;
        case "developPaginate":
          this.getDevelopData();
          break;
        case "currencyPaginate":
          this.getCurrencyData();
          break;
      }
    },
    /**
     * @example: 改变分页当前页码
     * @param {val} 页码
     * @param {type} 分页类型
     */
    handleCurrentChange(val, type) {
      console.log(`当前页: ${val}`,type);
      this[type].page = val;
      switch(type) {
        case "workPaginate":
          this.getWorkData();
          break;
        case "developPaginate":
          this.getDevelopData();
          break;
        case "currencyPaginate":
          this.getCurrencyData();
          break;
      }
    },
    /**
     * @example: 鑫币/业绩统计切换
     * @param {index} 类型
     */
    changeCurrencyType(index) {
      this.currencyTypeIndex = index;
      if (index===1) {
        this.$msgbox({
          title: "提示",
          message: <div>功能升级中，敬请期待...</div>,
          showCancelButton: false
        }).then(() => {
          this.currencyTypeIndex = 0;
          console.log("=====")
        }).catch(() => {
          this.currencyTypeIndex = 0;
        });
      }
    },
    /**
     * @example: 重置开发数据查询月份
     */
    resetDevelopDate() {
      this.developBeginDate = "";
      this.developEndDate = "";
      Object.assign(this.developPaginate, this.$options.data().developPaginate);
      this.getDevelopData();
    },
    /**
     * @example: 根据日期查询开发数据
     */
    queryDevelopData() {
      this.getDevelopData();
    },
    /**
     * @example: 重置鑫币数据查询月份
     */
    resetCurrencyDate() {
      this.currencyBeginDate = "";
      this.currencyEndDate = "";
      Object.assign(this.currencyPaginate, this.$options.data().currencyPaginate);
      this.getCurrencyData();
    },
    /**
     * @example: 根据月份查询鑫币数据
     */
    queryCurrencyData() {
      this.getCurrencyData();
    },
    changeWorkSort(column, prop, order) {
      this.workSortColumn = prop;
      this.workSortType = order=="ascending" ? 0 : 1;
      console.log(column, prop, order, "=============changeWorkSort");
      this.getWorkData();
    },
    changeDevelopSort(column, prop, order) {
      this.developSortColumn = prop;
      this.developSortType = order=="ascending" ? 0 : 1;
      console.log(column, prop, order, "=============changeDevelopSort");
      this.getDevelopData();
    },
    changeCurrencySort(column, prop, order) {
      this.currencySortColumn = prop;
      this.currencySortType = order=="ascending" ? 0 : 1;
      console.log(column, prop, order, "=============changeCurrencySort");
      this.getCurrencyData();
    },
    sortDevName(a, b) {
      console.log(a, b, "2222222222")
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  min-height: 100%;
  // prettier-ignore
  padding: 12PX 16PX 51PX;
  background: #F0F7F7;
  .position {
    line-height: 1;
    font-size: @font12;
    color: #303133;
  }
  .header {
    // prettier-ignore
    margin-top: 12PX;
    // prettier-ignore
    padding: 24PX 24PX 20PX 24PX;
    background: #fff;
    border-radius: 8px;
    .nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #F0F2F5;
      .item {
        // prettier-ignore
        margin: 0 36PX 16PX 0;
        line-height: 1;
        font-size: @font18;
        color: #909399;
        cursor: pointer;
        &.active {
          font-weight: bold;
          color: #303133;
        }
      }
    }
    .header-bottom {
      display: flex;
      justify-content: space-between;
      // prettier-ignore
      padding-top: 10PX;
      .head-content-input {
        // prettier-ignore
        width: 494PX;
        // prettier-ignore
        height: 48PX;
        display: flex;
        .content-input {
          // prettier-ignore
          width: 411PX;
          border: 1px solid rgba(206, 206, 206, 1);
          border-right: none;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          text-indent: 16px;
          // line-height: 48px;
          height: 100%;
          box-sizing: border-box;
          outline: none;
          font-size: @font16;
          &::placeholder {
            font-size: @font16;
            color: #a6aaaf;
          }
        }
        .inquire-content {
          flex: 1;
          background: @backgroud;
          outline: none;
          border: 0;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          font-size: @font24;
          color: #fff;
          cursor: pointer;
        }
      }
      .right {
        display: flex;
        align-items: center;
        // prettier-ignore
        padding: 2PX;
        border: 1px solid @backgroud;
        border-radius: 4px;
        /deep/.el-radio-group {
          line-height: inherit;
          .btn {
            .el-radio-button__inner {
              // prettier-ignore
              width: 114PX;
              // prettier-ignore
              height: 40PX;
              padding: 0;
              border: none;
              border-radius: 4px;
              // prettier-ignore
              line-height: 40PX;
              font-size: @font16;
              color: @backgroud;
              box-shadow: none;
            }
            &.is-active {
              .el-radio-button__inner {
                background: @backgroud;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .work,
  .develop,
  .currency {
    // prettier-ignore
    margin-top: 16PX;
    // prettier-ignore
    padding: 24PX 16PX 18PX;
    background: #fff;
    border-radius: 8px;
    .head {
      display: flex;
      justify-content: space-between;
      .topic {
        line-height: 1;
        font-size: @font24;
        font-weight: bold;
        color: #303133;
      }
      .tip-box {
        display: flex;
        align-items: center;
        cursor: pointer;
        .text {
          // prettier-ignore
          margin-right: 8PX;
          line-height: 1;
          font-size: @font16;
          color: #247257;
        }
        i {
          font-size: @font16;
          color: #247257;
        }
      }
      .search-box{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title {
          // prettier-ignore
          margin-right: 10PX;
          font-size: @font14;
          font-weight: bold;
          color: #303133;
        }
        .time-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          // prettier-ignore
          width: 308PX;
          // prettier-ignore
          height: 36PX;
          padding: 0 10px;
          // prettier-ignore
          margin-right: 16PX;
          border: 1px solid #CECECE;
          border-radius: 4px;
          box-sizing: border-box;
          .pre {
            // prettier-ignore
            margin: 0 10PX;
            font-size: @font12;
            color: #303133;
          }
        }
        .search-btn {
          // prettier-ignore
          width: 90PX;
          // prettier-ignore
          height: 36PX;
          border: none;
          border-radius: 4px;
          background: #fff;
          outline: none;
          line-height: 1;
          text-align: center;
          font-size: @font12;
          color: @backgroud;
          cursor: pointer;
          &.active {
            // prettier-ignore
            margin-left: 9PX;
            background: @backgroud;
            color: #fff;
          }
        }
        /deep/.month-picker {
          // prettier-ignore
          margin-right: 16PX;
          .el-input__inner {
            // prettier-ignore
            height: 36PX;
            // prettier-ignore
            padding-left: 28PX;
          }
          .el-input__icon {
            // prettier-ignore
            width: 25PX;
            // prettier-ignore
            line-height: 34PX;
            font-size: @font18;
          }
          .el-input__suffix{
            .el-input__icon {
              font-size: @font16;
            }
          }
        }
        /deep/.date-picker {
          // prettier-ignore
          width: 125PX;
          .el-input__inner {
            // prettier-ignore
            height: 34PX;
            padding-left: 0;
            border: none;
          }
          .el-input__suffix{
            .el-input__icon {
              // prettier-ignore
              width: 25PX;
              // prettier-ignore
              line-height: 34PX;
              font-size: @font16;
            }
          }
        }
      }
    }
    .nav-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .item {
        position: relative;
        display: flex;
        align-items: flex-end;
        // prettier-ignore
        margin: 24PX 0 29PX;
        // prettier-ignore
        height: 26PX;
        font-size: @font18;
        color: #303133;
        cursor: pointer;
        &:not(:last-of-type) {
          // prettier-ignore
          margin-right: 36PX;
        }
        &.active {
          font-size: @font24;
          color: @backgroud;
          &::after {
            content: "";
            position: absolute;
            // prettier-ignore
            bottom: -17PX;
            width: 100%;
            // prettier-ignore
            height: 4PX;
            background: @backgroud;
            // prettier-ignore
            border-radius: 4PX;
          }
        }
      }
      .tip {
        // prettier-ignore
        margin-left: 26PX;
        font-size: @font14;
        color: #909399;
      }
    }
    /deep/.content {
      // prettier-ignore
      margin-top: 24PX;
      .sort-caret.ascending {
        top: 0.01rem;
      }
      .sort-caret.descending {
        bottom: 0.03rem;
      }
      .el-table__header-wrapper {
        background: #F0F5F4;
      }
      .el-table th {
        // prettier-ignore
        height: 48PX;
        padding: 0;
        background: #F0F5F4;
        font-weight: normal;
        font-size: @font16;
        color: #303133;
        .cell {
          line-height: 1;
        }
      }
      .el-table__body td {
        // perttier-ignore
        height: 64PX;
      }
      .el-pagination {
        // perttier-ignore
        padding: 24PX 5PX 8PX;
        text-align: right;
      }
      .el-table--border td {
        border-right: none;
      }
      .is-group {
        tr:first-child {
          th:nth-child(2),
          th:nth-child(3),
          th:nth-child(4),
          th:nth-child(5) {
            border-bottom: 1px solid #C3DFD9;
            border-right: 1px solid #c3dfd9;
          }
        }
        tr:nth-child(2) {
          th:nth-child(3),
          th:nth-child(6),
          th:nth-child(9) {
            border-right: 1px solid #c3dfd9;
          }
        }
      }
    }
  }
}
.el-tooltip__popper {
  div {
    // perttier-ignore
    line-height: 22PX;
  }
}
</style>
