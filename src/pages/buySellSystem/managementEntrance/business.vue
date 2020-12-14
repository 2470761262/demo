<template>
  <!-- 房源系统-业务管理 -->
  <div class="container" v-loading="pageLoading">
    <breadcrumb></breadcrumb>
    <nav-menu :navMenuIndex="0"></nav-menu>
    <div class="conditions-box">
      <div class="header-bottom">
        <div class="head-content-input">
          <input
            type="text"
            placeholder="请输入姓名、门店、区域"
            class="content-input anchor-point"
            :data-anchor="'业务管理搜索（姓名/门店/区域）:' + businessKeyword"
            v-model="businessKeyword"
            @keydown.enter="fuzzySearch"
          />
          <button
            class="inquire-content anchor-point"
            :data-anchor="'业务管理搜索{' + businessKeyword + '}'"
            @click="fuzzySearch"
          >
            <i class="el-icon-search"></i>
          </button>
        </div>
        <div class="right">
          <el-radio-group v-model="searchType" @change="fuzzySearch">
            <el-radio-button
              class="btn anchor-point"
              :data-anchor="'业务管理搜索类型：' + item.name"
              :label="item.value"
              v-for="(item, index) in searchTypes"
              :key="index"
              >{{ item.name }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 作业数据 -->
    <div class="work">
      <div class="head">
        <div class="topic">
          资源统计
          <p class="tip">注：数据取值截止到昨天24点整</p>
        </div>
        <div class="right">
          <button class="export" @click="excelFirstExport">导出</button>
          <el-tooltip placement="right">
            <div slot="content">
              1、房源跟单量：名下作为房源跟单人的在售房源总数量；<br />
              2、独家委托量：名下作为独家委托人的在售房源总数量；<br />
              3、实勘房源量：名下作为房源实勘人的在售房源总数量；<br />
              4、钥匙委托量：名下作为钥匙委托人的在售房源总数量；<br />
              5、房源录入量：名下作为房源录入人的在售房源总数量；<br />
              6、客户量：名下录入客户需求类型为买二手的私客数量。
            </div>
            <div class="tip-box">
              <div class="text">数据说明</div>
              <i class="el-icon-question"></i>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="content">
        <el-table
          :data="workData"
          height="368"
          @sort-change="changeWorkSort"
          v-loading="workLoading"
          ref="workTable"
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
            :sort-orders="['ascending', 'descending']"
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
          :total="workPaginate.total"
        >
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
              prefix-icon="prefix-icon"
              v-model="developDateSelect"
              type="daterange"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </div>
          <button
            class="search-btn anchor-point"
            @click="resetDevelopDate"
            data-anchor="业务管理开发数据查询时间重置"
          >
            重置
          </button>
          <button
            class="search-btn active anchor-point"
            @click="queryDevelopData"
            :data-anchor="
              '业务管理开发数据查询时间搜索{' + developDateSelect + '}'
            "
          >
            搜索
          </button>
          <p class="tip">
            注：数据从2020-05-01日开始统计，数据取值截止到昨天24点整
          </p>
        </div>
        <div class="right">
          <button class="export" @click="excelSecondExport">导出</button>
          <el-tooltip placement="right">
            <div slot="content">
              1、房源开发<br />
              电开次数：在“开发线索”列表累计回访房源的次数；<br />
              新增验真：新增录入房源累计验真通过的房源数量；<br />
              公盘获取：店公共盘、公司公盘申请跟单人成功的房源数量；<br />
              2、房源维护<br />
              被看次数：名下跟单房源累计被带看的次数<br />
              电话回访：跟单人回访名下跟单房源累计回访的次数<br />
              写面访：跟单房源在选定时间区间内添加面访的数量<br />
              新增实勘：上传全景VR且制作成功的实勘量<br />
              3、客源开发<br />
              电开次数：在“公客池”列表累计回访客源的次数<br />
              新增客户：累计新增录入私客的数量<br />
              认领客户：公客池累计认领客户的数量<br />
              4、客源维护<br />
              带看客户数：累计带看的客户数量（去重）<br />
              1带多看：添加带看记录，添加两套房源以上的客户数量<br />
              3日内首看：客户自录入时间起, 3日内有过首次带看的客户数量<br />
              7日内首看：客户自录入时间起, 7日内有过首次带看的客户数量<br />
              复看：首看后，有产生第二次带看的客户数量<br />
            </div>
            <div class="tip-box">
              <div class="text">数据说明</div>
              <i class="el-icon-question"></i>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="content">
        <el-table
          :data="developData"
          height="417"
          @sort-change="changeDevelopSort"
          v-loading="developLoading"
          ref="developTable"
        >
          <el-table-column
            v-for="(item, index) in developColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :fixed="item.fixed"
          >
            <el-table-column
              v-for="(list, i) in item.children"
              :key="i"
              :prop="list.prop"
              :label="list.label"
              :width="list.width"
              :min-width="list.minWidth"
              :align="list.align"
              :sortable="list.sortable"
              :sort-orders="['ascending', 'descending']"
            >
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
          :total="developPaginate.total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 鑫币数据 -->
    <div class="currency">
      <div class="head">
        <div class="search-box">
          <div class="title">查询时间</div>
          <div class="time-box">
            <el-date-picker
              prefix-icon="prefix-icon"
              v-model="currencyDateSelect"
              type="daterange"
              range-separator="至"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </div>
          <button
            class="search-btn anchor-point"
            @click="resetCurrencyDate"
            data-anchor="业务管理鑫币数据查询时间重置"
          >
            重置
          </button>
          <button
            class="search-btn active anchor-point"
            @click="queryCurrencyData"
            :data-anchor="
              '业务管理鑫币数据查询时间搜索{' + currencyDateSelect + '}'
            "
          >
            搜索
          </button>
        </div>
        <div class="right">
          <button class="export" @click="excelThirdExport">导出</button>
          <el-tooltip placement="right">
            <div slot="content">
              1、新增鑫币：昨日新增的鑫币值；<br />
              2、兑换（品牌分）：本月兑换成品牌分的鑫币值；<br />
              3、兑换（物品）：本月兑换成物品的鑫币值；<br />
              4、剩余鑫币：当前剩余的鑫币值。
            </div>
            <div class="tip-box">
              <div class="text">数据说明</div>
              <i class="el-icon-question"></i>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="nav-box">
        <div
          class="item anchor-point"
          :data-anchor="'鑫币数据类型:' + item.name"
          v-for="(item, index) in currencyTypes"
          :key="index"
          :class="{ active: currencyTypeIndex === index }"
          @click="changeCurrencyType(index)"
        >
          {{ item.name }}
        </div>
        <p class="tip">
          注：数据从2020-05-01日开始统计，数据取值截止到昨天24点整
        </p>
      </div>
      <div class="content">
        <el-table
          :data="currencyData"
          height="368"
          @sort-change="changeCurrencySort"
          v-loading="currencyLoading"
          ref="currencyTable"
        >
          <el-table-column
            v-for="(item, index) in currencyColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :sortable="item.sortable"
            :sort-orders="['ascending', 'descending']"
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
          :total="currencyPaginate.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import breadcrumb from "./components/entranceBreadcrumb.vue";
import navMenu from "./components/entranceNavMenu.vue";
export default {
  components: {
    breadcrumb,
    navMenu
  },
  data() {
    return {
      pageLoading: false,
      workLoading: false,
      developLoading: false,
      currencyLoading: false,
      businessKeyword: "",
      perName: "",
      searchTypes: [
        {
          name: "个人",
          value: 0
        },
        {
          name: "门店",
          value: 1
        },
        {
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
        },
        {
          name: "业绩统计",
          value: 1
        }
      ],
      workColumn: [
        {
          prop: "perName",
          label: "姓名/门店/区域",
          minWidth: "120",
          align: "left"
        },
        {
          prop: "agentNum",
          label: "跟单房源量",
          minWidth: "150",
          align: "right",
          sortable: true
        },
        {
          prop: "onlyNum",
          label: "独家委托量",
          minWidth: "150",
          align: "right",
          sortable: true
        },
        {
          prop: "realNum",
          label: "实勘房源量",
          minWidth: "150",
          align: "right",
          sortable: true
        },
        {
          prop: "keyNum",
          label: "钥匙委托量",
          minWidth: "150",
          align: "right",
          sortable: true
        },
        {
          prop: "addNum",
          label: "房源录入量",
          minWidth: "150",
          align: "right",
          sortable: true
        },
        {
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
        limit: 15,
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
        },
        {
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
            },
            {
              prop: "newVerifyNum",
              label: "新增验真",
              minWidth: "100",
              align: "center",
              sortable: true
            },
            {
              prop: "stockVerifyNum",
              label: "公盘获取",
              minWidth: "100",
              align: "center",
              sortable: true
            }
          ]
        },
        {
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
            },
            {
              prop: "callBackNum",
              label: "电话回访",
              minWidth: "100",
              align: "center",
              sortable: true
            },
            {
              prop: "intervierNum",
              label: "写面访",
              minWidth: "100",
              align: "center",
              sortable: true
            },
            {
              prop: "realNum",
              label: "新增实勘",
              minWidth: "100",
              align: "center",
              sortable: true
            }
          ]
        },
        {
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
            },
            {
              prop: "newCustNum",
              label: "新增客户",
              minWidth: "100",
              align: "center",
              sortable: true
            },
            {
              prop: "claimCustNum",
              label: "认领客户",
              minWidth: "100",
              align: "center",
              sortable: true
            }
          ]
        },
        {
          label: "客源维护",
          align: "center",
          children: [
            {
              prop: "pairCustNum",
              label: "带看客户数",
              minWidth: "120",
              align: "center",
              sortable: true
            },
            {
              prop: "manyViewOnePairNum",
              label: "1带多看",
              minWidth: "100",
              align: "center",
              sortable: true
            },
            {
              prop: "firstView3DaysNum",
              label: "3日内首看",
              minWidth: "120",
              align: "center",
              sortable: true
            },
            {
              prop: "firstView7DaysNum",
              label: "7日内首看",
              minWidth: "120",
              align: "center",
              sortable: true
            },
            {
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
        limit: 15,
        total: 0,
        pageSum: 0
      },
      currencyColumn: [
        {
          prop: "perName",
          label: "姓名/门店/区域",
          minWidth: "120",
          align: "left"
        },
        {
          prop: "curDayAddScore",
          label: "新增鑫币",
          minWidth: "100",
          align: "right",
          sortable: true
        },
        {
          prop: "curDayExXinScore",
          label: "兑换（品牌分）",
          minWidth: "150",
          align: "right",
          sortable: true
        },
        {
          prop: "curDayExGoodScore",
          label: "兑换（物品）",
          minWidth: "150",
          align: "right",
          sortable: true
        },
        {
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
        limit: 15,
        total: 0,
        pageSum: 0
      },
      developDateSelect: "",
      developDateSelectFlag: "",
      currencyDateSelect: "",
      currencyDateSelectFlag: "",
      workSortColumn: "",
      workSortType: 1,
      developSortColumn: "",
      developSortType: 1,
      currencySortColumn: "",
      currencySortType: 1
    };
  },
  created() {
    this.getDefaultDate();
    this.getWorkData();
    this.getDevelopData();
    this.getCurrencyData();
  },
  methods: {
    /**
     * @example: 获取默认查询日期
     */
    getDefaultDate(type) {
      function getDate(time) {
        let d = time ? new Date(time) : new Date();
        let seperator1 = "-";
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let strDate = d.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let result = year + seperator1 + month + seperator1 + strDate;
        let result2 = year + seperator1 + month + seperator1 + "01";
        if (strDate == "01") {
          let prevYear = d.getFullYear();
          let preMonth = d.getMonth();
          if (preMonth == "0") {
            preMonth = "12";
            prevYear--;
          }
          if (preMonth >= 1 && preMonth <= 9) {
            preMonth = "0" + preMonth;
          }
          result2 = prevYear + seperator1 + preMonth + seperator1 + "01";
        }
        return [result, result2];
      }
      let currentDate = getDate()[0];
      let prevDate = getDate()[1];
      let prevDaytime = new Date().getTime() - 24 * 60 * 60 * 1000;
      let prevDayDate = getDate(prevDaytime)[0];
      switch (type) {
        case 1:
          this.developDateSelect = [prevDate, prevDayDate];
          this.developDateSelectFlag = [prevDate, prevDayDate];
          break;
        case 2:
          this.currencyDateSelect = [prevDayDate, prevDayDate];
          this.currencyDateSelectFlag = [prevDayDate, prevDayDate];
          break;
        default:
          this.developDateSelect = [prevDate, prevDayDate];
          this.developDateSelectFlag = [prevDate, prevDayDate];
          this.currencyDateSelect = [prevDayDate, prevDayDate];
          this.currencyDateSelectFlag = [prevDayDate, prevDayDate];
      }
    },
    /**
     * @example: 获取作业数据
     */
    getWorkData() {
      this.workLoading = true;
      let params = {
        staLev: this.searchType, //0经纪人,1门店,2区域
        dateFlag: "", //日
        perName: this.perName,
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
          if (e.data.code == 200) {
            this.$refs.workTable.bodyWrapper.scrollTop = 0;
            this.workData = e.data.data.data;
            this.workPaginate.pageSum = e.data.data.pageSum;
            this.workPaginate.total = e.data.data.dataCount;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.workLoading = false;
        });
    },
    /**
     * @example: 获取开发数据
     */
    getDevelopData() {
      this.developLoading = true;
      let params = {
        staLev: this.searchType, //0经纪人,1门店,2区域
        beginDateFlag: this.developDateSelectFlag
          ? this.developDateSelectFlag[0]
          : "",
        endDateFlag: this.developDateSelectFlag
          ? this.developDateSelectFlag[1]
          : "",
        perName: this.perName,
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
          if (e.data.code == 200) {
            this.$refs.developTable.bodyWrapper.scrollTop = 0;
            this.developData = e.data.data.data;
            this.developPaginate.pageSum = e.data.data.pageSum;
            this.developPaginate.total = e.data.data.dataCount;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.developLoading = false;
        });
    },
    /**
     * @example: 获取鑫币统计数据
     */
    getCurrencyData() {
      this.currencyLoading = true;
      let params = {
        staLev: this.searchType, //0经纪人,1门店,2区域
        beginDateFlag: this.currencyDateSelectFlag
          ? this.currencyDateSelectFlag[0]
          : "",
        endDateFlag: this.currencyDateSelectFlag
          ? this.currencyDateSelectFlag[1]
          : "",
        perName: this.perName,
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
          if (e.data.code == 200) {
            this.$refs.currencyTable.bodyWrapper.scrollTop = 0;
            this.currencyData = e.data.data.data;
            this.currencyPaginate.pageSum = e.data.data.pageSum;
            this.currencyPaginate.total = e.data.data.dataCount;
          }
        })
        .catch(() => {})
        .finally(() => {
          this.currencyLoading = false;
        });
    },
    /**
     * @example: 姓名/门店/区域模糊搜索 (经纪人/门店/区域切换)
     */
    fuzzySearch() {
      this.perName = this.businessKeyword;
      Object.assign(this.workPaginate, this.$options.data().workPaginate);
      Object.assign(this.developPaginate, this.$options.data().developPaginate);
      Object.assign(
        this.currencyPaginate,
        this.$options.data().currencyPaginate
      );
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
      this[type].limit = val;
      switch (type) {
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
      this[type].page = val;
      switch (type) {
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
      if (index === 1) {
        this.$msgbox({
          title: "提示",
          message: <div>功能升级中，敬请期待...</div>,
          showCancelButton: false
        })
          .then(() => {
            this.currencyTypeIndex = 0;
          })
          .catch(() => {
            this.currencyTypeIndex = 0;
          });
      }
    },
    /**
     * @example: 重置开发数据查询日期
     */
    resetDevelopDate() {
      this.getDefaultDate(1);
      Object.assign(this.developPaginate, this.$options.data().developPaginate);
      this.getDevelopData();
    },
    /**
     * @example: 根据日期查询开发数据
     */
    queryDevelopData() {
      this.developDateSelectFlag = this.developDateSelect;
      this.getDevelopData();
    },
    /**
     * @example: 重置鑫币数据查询日期
     */
    resetCurrencyDate() {
      this.getDefaultDate(2);
      Object.assign(
        this.currencyPaginate,
        this.$options.data().currencyPaginate
      );
      this.getCurrencyData();
    },
    /**
     * @example: 根据月份查询鑫币数据
     */
    queryCurrencyData() {
      this.currencyDateSelectFlag = this.currencyDateSelect;
      this.getCurrencyData();
    },
    /**
     * @example: 作业数据排序变化触发事件
     */
    changeWorkSort({ column, prop, order }) {
      this.workSortColumn = prop;
      this.workSortType = order == "ascending" ? 0 : 1;
      Object.assign(this.workPaginate, this.$options.data().workPaginate);
      this.getWorkData();
    },
    /**
     * @example: 开发数据排序变化触发事件
     */
    changeDevelopSort({ column, prop, order }) {
      this.developSortColumn = prop;
      this.developSortType = order == "ascending" ? 0 : 1;
      Object.assign(this.developPaginate, this.$options.data().developPaginate);
      this.getDevelopData();
    },
    /**
     * @example: 鑫币数据排序变化触发事件
     */
    changeCurrencySort({ column, prop, order }) {
      this.currencySortColumn = prop;
      this.currencySortType = order == "ascending" ? 0 : 1;
      Object.assign(
        this.currencyPaginate,
        this.$options.data().currencyPaginate
      );
      this.getCurrencyData();
    },
    excelFirstExport() {
      this.pageLoading = true;
      let params = {
        staLev: this.searchType, //0经纪人,1门店,2区域
        dateFlag: "", //日
        perName: this.perName,
        page: this.workPaginate.page,
        limit: this.workPaginate.limit,
        sortColumn: this.workSortColumn,
        sortType: this.workSortType
      };
      this.$api
        .post({
          url: "/static/exportStaticResource",
          data: params,
          responseType: "blob",
          headers: { "Content-Type": "application/json" },
          isShowErrMsg: false
        })
        .then(res => {})
        .catch(e => {
          let url = window.URL.createObjectURL(new Blob([e.data]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "资源统计1.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .finally(e => {
          this.pageLoading = false;
        });
    },
    excelSecondExport() {
      this.pageLoading = true;
      let params = {
        staLev: this.searchType, //0经纪人,1门店,2区域
        beginDateFlag: this.developDateSelectFlag
          ? this.developDateSelectFlag[0]
          : "",
        endDateFlag: this.developDateSelectFlag
          ? this.developDateSelectFlag[1]
          : "",
        perName: this.perName,
        page: this.developPaginate.page,
        limit: this.developPaginate.limit,
        sortColumn: this.developSortColumn,
        sortType: this.developSortType
      };
      this.$api
        .post({
          url: "/static/exportStaticResource2",
          data: params,
          responseType: "blob",
          headers: { "Content-Type": "application/json" },
          isShowErrMsg: false
        })
        .then(res => {})
        .catch(e => {
          let url = window.URL.createObjectURL(new Blob([e.data]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "资源统计2.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .finally(e => {
          this.pageLoading = false;
        });
    },
    excelThirdExport() {
      this.pageLoading = true;
      let params = {
        staLev: this.searchType, //0经纪人,1门店,2区域
        beginDateFlag: this.currencyDateSelectFlag
          ? this.currencyDateSelectFlag[0]
          : "",
        endDateFlag: this.currencyDateSelectFlag
          ? this.currencyDateSelectFlag[1]
          : "",
        perName: this.perName,
        page: this.currencyPaginate.page,
        limit: this.currencyPaginate.limit,
        sortColumn: this.currencySortColumn,
        sortType: this.currencySortType
      };
      this.$api
        .post({
          url: "/static/exportStaticXinScore",
          data: params,
          responseType: "blob",
          headers: { "Content-Type": "application/json" },
          isShowErrMsg: false
        })
        .then(res => {})
        .catch(e => {
          let url = window.URL.createObjectURL(new Blob([e.data]));
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "鑫币统计.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .finally(e => {
          this.pageLoading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  .conditions-box {
    // prettier-ignore
    padding: 0 24PX 20PX 24PX;
    background: #fff;
    // prettier-ignore
    border-bottom-left-radius: 8PX;
    // prettier-ignore
    border-bottom-right-radius: 8PX;
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
    // prettier-ignore
    border-radius: 8PX;
    .head {
      display: flex;
      justify-content: space-between;
      .topic {
        line-height: 1;
        font-size: @font24;
        font-weight: bold;
        color: #303133;
        .tip {
          display: inline-block;
          // prettier-ignore
          margin-left: 26PX;
          font-size: @font14;
          color: #f56c6c;
          font-weight: normal;
        }
      }
      .right {
        display: flex;
        .export {
          // prettier-ignore
          width: 78PX;
          // prettier-ignore
          height: 34PX;
          // prettier-ignore
          margin-right: 20PX;
          background: #fff;
          border: 1px solid @backgroud;
          // prettier-ignore
          border-radius: 4PX;
          color: @backgroud;
          outline: none;
          cursor: pointer;
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
      }
      .search-box {
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
        /deep/.time-box {
          // prettier-ignore
          width: 288PX;
          margin-right: 16px;
          .el-input__inner {
            // prettier-ignore
            height: 36PX;
            font-size: @font14;
          }
          .el-form-item {
            // prettier-ignore
            margin-bottom: 24PX;
          }
          .el-range-input {
            text-align: left;
            // prettier-ignore
            text-indent: 10PX;
            font-size: @font14;
          }
          .prefix-icon {
            width: 0;
          }
          .el-date-editor {
            width: 100%;
            .el-range-separator {
              display: flex;
              justify-content: center;
              align-items: center;
              width: auto;
              padding: 0;
              line-height: 1;
              text-indent: 0;
              font-size: @font14;
            }
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
        .tip {
          // prettier-ignore
          margin-left: 26PX;
          font-size: @font14;
          color: #f56c6c;
          font-weight: normal;
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
        margin: 24PX 0 5PX;
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
        margin: 24PX 0 0 26PX;
        font-size: @font14;
        color: #f56c6c;
      }
    }
    /deep/.content {
      // prettier-ignore
      margin-top: 24PX;
      .caret-wrapper {
        // prettier-ignore
        width: 15PX;
        // prettier-ignore
        height: 14PX;
        .sort-caret.ascending {
          // prettier-ignore
          top: -5PX;
        }
        .sort-caret.descending {
          // prettier-ignore
          bottom: -3PX;
        }
      }
      .has-gutter:not(.is-group) {
        background: #f0f5f4;
        tr:nth-child(1) {
          th:nth-child(1) {
            .cell {
              // prettier-ignore
              padding-left: 16PX;
            }
          }
          th:nth-last-child(2) {
            .cell {
              // prettier-ignore
              padding-right: 16PX;
            }
          }
        }
      }

      .el-table__body-wrapper::-webkit-scrollbar {
        display: none;
      }

      .el-table__body-wrapper {
        tr {
          td:nth-child(1) {
            .cell {
              // prettier-ignore
              padding-left: 16PX;
            }
          }
          td:last-child {
            .cell {
              // prettier-ignore
              padding-right: 16PX;
            }
          }
        }
      }
      .el-table {
        td {
          .cell {
            line-height: 1;
            font-size: @font16;
            color: #606266;
          }
        }
        th {
          // prettier-ignore
          height: 48PX;
          padding: 0;
          background: #f0f5f4;
          font-weight: normal;
          font-size: @font16;
          color: #303133;
          .cell {
            line-height: 1;
          }
        }
      }
      .el-table__body td {
        // prettier-ignore
        height: 64PX;
      }
      .el-pagination {
        // prettier-ignore
        padding: 24PX 5PX 8PX;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .el-pager li,
        .btn-next .el-icon,
        .btn-prev .el-icon,
        button,
        span:not([class*="suffix"]) {
          height: auto;
          line-height: 1;
          font-size: @font16;
          font-weight: normal;
        }
        .el-select .el-input {
          // prettier-ignore
          width: 85PX;
        }
        .el-pagination__sizes .el-input .el-input__inner {
          // prettier-ignore
          height: 22PX;
          // prettier-ignore
          line-height: 20PX;
          font-size: @font14;
        }
        .el-pager .more::before {
          line-height: 1;
        }
        .el-pagination__editor {
          height: auto;
          .el-input__inner {
            // prettier-ignore
            height: 22PX;
          }
        }
        .el-input--mini .el-input__icon {
          line-height: 1;
        }
      }
      .el-table--border,
      .el-table--group {
        border: none;
      }
      .el-table--border::after,
      .el-table--group::after,
      .el-table::before {
        background-color: transparent;
      }
      .el-table--border td {
        border-right: none;
      }
      .is-group {
        tr:first-child {
          th:nth-child(2),
          th:nth-child(3),
          th:nth-child(4) {
            border-bottom: 1px solid #c3dfd9;
            border-right: 1px solid #c3dfd9;
          }
          th:nth-child(5) {
            border-bottom: 1px solid #c3dfd9;
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
    // prettier-ignore
    line-height: 22PX;
  }
}
</style>
