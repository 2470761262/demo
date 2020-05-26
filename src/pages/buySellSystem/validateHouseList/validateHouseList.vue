<style lang="less" scoped>
.div-line {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 350px;
}
.span-width {
  flex: 1;
}
.cus-box {
  display: flex;
  flex-wrap: wrap;
  line-height: 30px;
}
.tag-group {
  display: flex;
  flex-wrap: wrap;
  > .el-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
.page-row-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.flex-cell-content {
  display: flex;
  justify-content: space-between;
}
.checkTel-type {
  position: relative;
  .checkTel-type- {
    &success {
      color: #40a375;
    }
    &error {
      color: red;
    }
  }
  .icon {
    position: absolute;
    right: 0;
    font-size: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
.elTree {
  height: 550px;
  overflow-y: auto;
}
</style>
<template>
  <div class="page-row-flex">
    <list-page
      @sort-change="sortMethod"
      :parentData="$data"
      @queryTabData="queryTabData"
      @handleClick="handleClick"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :dblclick="true"
      @cellDblClick="toHouseDetail"
    >
      <template v-slot:left>
        <div class="elTree" v-if="treeData.length > 0">
          <el-input
            data-anchor="验真列表树 => input"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            class="treeSearch"
          ></el-input>
          <el-tree
            ref="treeForm"
            :data="treeData"
            node-key="nodeId"
            show-checkbox
            :props="defaultProps"
            @check-change="handleCheckChange"
            :highlight-current="true"
            :filter-node-method="filterNode"
            check-strictly
            :action="''"
            empty-text="暂无数据，请检查权限"
            auto-expand-parent
            v-loading="treeLoading"
          ></el-tree>
        </div>
      </template>
      <template v-slot:top>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">楼盘</h3>
            <el-select
              data-anchor="验真列表楼盘 => select"
              class="anchor-point"
              v-model="data.comId"
              @focus="remoteInput"
              @change="queryCBId"
              filterable
              remote
              clearable
              placeholder="楼盘名称"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                data-anchor="验真列表楼盘 => select => option"
                class="anchor-point"
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              data-anchor="验真列表楼栋 => select"
              class="anchor-point"
              v-model="data.cbId"
              filterable
              clearable
              placeholder="楼栋"
              @change="buildChange"
            >
              <el-option
                data-anchor="验真列表楼栋 => select => option"
                class="anchor-point"
                v-for="item in cbIdList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              data-anchor="验真列表房间号 => select"
              class="anchor-point"
              v-model="data.roomNo"
              filterable
              @change="queryVerifyHouseByParams"
              placeholder="房间号"
              :loading="HouseNoLoading"
              v-loadmore="loadMore"
            >
              <el-option
                data-anchor="验真列表房间号 => select => option"
                class="anchor-point"
                v-for="item in roomNoList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">编号</h3>
            <el-input
              data-anchor="验真列表房源编号 => input"
              placeholder="房源编号"
              v-model="data.houseNo"
              class="set-input200 anchor-point"
              @change="queryVerifyHouseByParams"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">业主</h3>
            <el-input
              data-anchor="验真列表业主姓名 => input"
              placeholder="姓名"
              v-model="data.customName"
              class="set-input120 anchor-point"
              @change="queryVerifyHouseByParams"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">电话</h3>
            <el-input
              data-anchor="验真列表业主电话 => input"
              placeholder="业主电话"
              v-model="data.tel"
              class="set-input200 anchor-point"
              @change="queryVerifyHouseByParams"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">价格</h3>
            <el-input
              data-anchor="验真列表价格最小值 => input"
              placeholder="最小值"
              v-model="data.minPrice"
              class="set-input90 anchor-point"
              @change="queryVerifyHouseByParams"
              clearable
            />
            <span class="cut-off-rule"></span>
            <el-input
              data-anchor="验真列表价格最大值 => input"
              placeholder="最大值"
              v-model="data.maxPrice"
              class="set-input90 anchor-point"
              @change="queryVerifyHouseByParams"
              clearable
            />
            <span class="query-cell-suffix">万</span>
          </div>
        </div>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">面积</h3>
            <el-input
              data-anchor="验真列表面积最小值 => input"
              placeholder="最小值"
              v-model="data.minInArea"
              class="set-input90 anchor-point"
              @change="queryVerifyHouseByParams"
              clearable
            />
            <span class="cut-off-rule"></span>
            <el-input
              data-anchor="验真列表面积最大值 => input"
              placeholder="最大值"
              v-model="data.maxInArea"
              class="set-input90 anchor-point"
              @change="queryVerifyHouseByParams"
              clearable
            />
            <span class="query-cell-suffix">平方</span>
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">录入时间</h3>
            <el-date-picker
              data-anchor="验真列表录入时间 => input"
              v-model="data.timeSelect"
              type="daterange"
              class="set-data-pricker anchor-point"
              @change="queryVerifyHouseByParams"
              range-separator="至"
              :default-time="['00:00:00', '23:59:59']"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <div class="query-content-cell cell-interval75">
              <h3 class="query-cell-title">验证状态</h3>
              <el-select
                v-model="data.checkStatusValue"
                @change="queryVerifyHouseByParams"
                clearable
                class="set-select100 anchor-point"
                placeholder="全部"
              >
                <el-option
                  class="anchor-point"
                  v-for="item in checkStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="query-content-cell cell-interval25">
              <h3 class="query-cell-title">号码状态</h3>
              <el-select
                v-model="data.phoneStatusValue"
                @change="queryVerifyHouseByParams"
                clearable
                class="set-select100 anchor-point"
                placeholder="全部"
              >
                <el-option
                  class="anchor-point"
                  v-for="item in phoneStatusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <span
              data-anchor="验真列表清除 => input"
              class="query-cell-suffix handlebut anchor-point"
              @click="Remove"
              >清除</span
            >
          </div>
          <div class="query-content-cell cell-interval25">
            <el-button
              data-anchor="验真列表查询 => input"
              class="anchor-point"
              type="primary"
              size="mini"
              @click="queryVerifyHouseByParams"
              >查询</el-button
            >
          </div>
          <div class="query-content-cell cell-interval25">
            <moreSelect
              class="anchor-point"
              @moreSelectChange="moreSelectChange"
              :configRule="{ entrustType: false, taskType: false }"
              deptUrl="/myHouse/myVerifyList"
            ></moreSelect>
          </div>
        </div>
      </template>
      <template #tableColumn>
        <el-table-column
          class-name="anchor-point"
          :width="item.width"
          :formatter="item.formart"
          :label="item.label"
          show-overflow-tooltip
          v-for="(item, index) in tableDataColumn"
          :key="index"
          :prop="item.prop"
          :sort-orders="['ascending', 'descending']"
          :sortable="item.order"
        ></el-table-column>
        <el-table-column label="操作" width="320" fixed="right">
          <template v-slot="scope">
            <div class="flex-cell-content">
              <el-button
                class="anchor-point"
                :type="item.buttonType"
                size="mini"
                :data-anchor="'验真列表查询' + item.name + '=> input'"
                :disabled="item.disabled"
                @click.stop="distributeEvent(item.methodName, scope.row)"
                v-for="(item, index) in isForBut(scope.row.checkStatus)"
                :key="index"
                >{{ item.name }}</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
    <el-dialog
      title="验真详情"
      :visible.sync="showVeryfyDetail"
      width="30%"
      :before-close="() => (showVeryfyDetail = false)"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>步骤</span>
        </div>
        <el-steps :active="stepNow" align-center :process-status="stepStatus">
          <el-step
            :title="item.title"
            :description="item.description"
            :key="item.index"
            v-for="item in stepsListNow"
          ></el-step>
        </el-steps>
      </el-card>
      <el-card
        v-if="employeeDiff.show"
        class="box-card"
        style="line-height:30px"
      >
        <div slot="header" class="clearfix">
          <span>店长异议</span>
        </div>
        <div>
          <div class="tag-group">
            <el-tag
              size="small"
              type="danger"
              v-for="item in employeeDiff.spanList"
              :key="item.index"
              >{{ diffList[item] }}</el-tag
            >
          </div>
          <div>{{ employeeDiff.remark }}</div>
        </div>
      </el-card>
      <el-card
        v-if="customerDiff.show"
        class="box-card"
        style="line-height:30px"
      >
        <div slot="header" class="clearfix">
          <span>客户异议</span>
        </div>
        <div>
          <div class="tag-group">
            <el-tag
              size="small"
              type="danger"
              v-for="item in customerDiff.spanList"
              :key="item.index"
              >{{ diffList[item] }}</el-tag
            >
          </div>
          <div>{{ customerDiff.remark }}</div>
        </div>
      </el-card>
      <el-card class="box-card" style="line-height:30px">
        <div slot="header" class="clearfix">
          <span>房源详情</span>
        </div>
        <div>
          <span class="font-small-title">小区：</span>
          <span class="font-middle-title">{{
            nowRow.communityName +
              "-" +
              nowRow.buildingName +
              "-" +
              nowRow.roomNo
          }}</span>
        </div>
        <div class="div-line">
          <div class="span-width">
            <span class="font-small-title">售价：</span>
            <span>{{ nowRow.price }}万元</span>
          </div>
          <div class="span-width">
            <span class="font-small-title">均价：</span>
            <span>{{ nowRow.unitPrice }}元/㎡</span>
          </div>
        </div>
        <div class="div-line">
          <div class="span-width">
            <span class="font-small-title">面积：</span>
            <span>{{ nowRow.area || 0 }}/㎡</span>
          </div>
          <div class="span-width">
            <span class="font-small-title">户型：</span>
            <span>{{
              (nowRow.room || 0) +
                "室" +
                (nowRow.hall || 0) +
                "厅" +
                (nowRow.toilet || 0) +
                "卫"
            }}</span>
          </div>
        </div>
        <div class="div-line">
          <div class="span-width">
            <span class="font-small-title">朝向：</span>
            <span>{{ nowRow.face }}</span>
          </div>
          <div class="span-width">
            <span class="font-small-title">装修：</span>
            <span>{{ nowRow.decoration }}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>业主信息</span>
        </div>
        <div class="cus-box">
          <img
            width="55px"
            height="55px"
            :src="
              nowRow.headImg == null
                ? 'https://lsxjytestimgs.oss-cn-shenzhen.aliyuncs.com/FileUpload/default.jpg'
                : nowRow.headImg
            "
          />
          <div style="margin-left:20px">
            <span class="font-small-title">{{ nowRow.customerName }}</span>
            <el-tag type="warning" size="mini">vip</el-tag>
            <div>
              <span>{{ nowRow.tel }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </el-dialog>
    <tel-pop
      title=""
      :visible.sync="telPopFlag"
      width="auto"
      :type-class="telPopFlagTypeClass"
      v-if="telPopFlag"
      :data="rowData"
    >
    </tel-pop>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import util from "@/util/util";
import getMenuRid from "@/minxi/getMenuRid";
import moreSelect from "@/components/moreSelect";
//验真电话弹框
import telPop from "./components/telPop";
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    moreSelect,
    telPop
  },
  computed: {
    avgPrice() {
      if (!this.nowRow.price || this.nowRow.area == 0) {
        return "-";
      }
      return (this.nowRow.price / this.nowRow.area).toFixed(4) * 10000;
    }
  },
  data() {
    return {
      HouseNoLoading: false,
      houseNoPage: {
        // 房间分页数据
        currentPage: 1,
        totalPage: 1,
        limit: 30
      },
      telPopFlag: false,
      telPopFlagTypeClass: "info",
      loading: true, //控制表格加载动画提示
      showVeryfyDetail: false, //验真详情弹出层
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      options: [],
      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        timeSelect: "",
        beginTime: "",
        endTime: "",
        customName: "",
        tel: "",
        minInArea: "",
        maxInArea: "",
        minPrice: "",
        maxPrice: "",
        checkStatusValue: "",
        phoneStatusValue: "",
        houseNo: ""
      },
      cbIdList: [],
      roomNoList: [],
      customerDiff: {
        spanList: [],
        remark: "",
        show: false
      },
      diffList: ["楼盘信息", "价格不准确", "面积错误", "户型错误"],
      employeeDiff: {
        spanList: [],
        remark: "",
        show: false
      },
      steps: [
        { title: "业主验真", description: "" },
        { title: "店长验真", description: "" },
        { title: "完成验真", description: "" }
      ],
      stepsListNow: [],
      moreSelect: [],
      stepStatus: "",
      stepNow: 0,
      tableDataColumn: [
        {
          prop: "communityName",
          label: "楼盘名称",
          formart: row => {
            return row.communityName;
          },
          width: "170",
          order: false
        },
        {
          prop: "buildingNo",
          label: "房源坐落",
          formart: row => {
            return row.buildingName + "-" + row.roomNo;
          },
          width: "170",
          order: false
        },
        {
          prop: "price",
          label: "售价(万元)",
          formart: row => row.price,
          width: "120",
          order: true
        },
        {
          prop: "inArea",
          label: "面积(㎡)",
          formart: row => row.inArea || 0,
          width: "120",
          order: true
        },
        {
          prop: "unitPrice",
          label: "单价(元/㎡)",
          formart: row => row.unitPrice || 0,
          width: "140",
          order: true
        },
        {
          prop: "addPerName",
          label: "录入人",
          formart: row => row.addPerName,
          width: "100"
        },
        {
          prop: "roomType",
          label: "户型",
          formart: row => {
            let room = row.rooms || 0;
            let hall = row.hall || 0;
            let toilet = row.toilet || 0;
            return room + "室-" + hall + "厅-" + toilet + "卫";
          },
          width: "120",
          order: false
        },
        {
          prop: "checkStatus",
          label: "验真状态",
          formart: row => row.checkStatus,
          width: "120",
          order: false
        },
        {
          prop: "phoneStatus",
          label: "电话检索",
          formart: row => row.phoneStatus,
          width: "120",
          order: false
        },
        {
          prop: "customerName",
          label: "业主姓名",
          formart: row => row.customerName,
          width: "120",
          order: false
        },
        {
          prop: "tel",
          label: "业主电话",
          formart: row => row.tel,
          width: "120",
          order: false
        },
        {
          prop: "checkTelStatus",
          label: "验真电话",
          formart: row => {
            return (
              <div class="checkTel-type">
                {row.checkTelStatus == "正常" ? (
                  <span class="checkTel-type-success">
                    {row.checkTelStatus}
                  </span>
                ) : (
                  <span class="checkTel-type-error">{row.checkTelStatus}</span>
                )}
                <span
                  class="el-icon-s-order icon"
                  onClick={this.openCheckTelPop.bind(this, row)}
                ></span>
              </div>
            );
          },
          width: "120",
          order: false
        },
        {
          prop: "addTime",
          label: "录入时间",
          formart: row => row.addTime,
          width: "180",
          order: true
        }
        // {
        //   prop: "decoration",
        //   label: "装修程度",
        //   formart: row => row.decoration,
        //   width: "120"
        // },
        // {
        //   prop: "creatorName",
        //   label: "经纪人",
        //   formart: row => row.creatorName,
        //   width: "120"
        // },
        // {
        //   prop: "createTime",
        //   label: "录入时间",
        //   formart: row => row.createTime,
        //   width: "160"
        // }
      ],
      tableData: [],
      elTabs: {
        activeName: "tab1",
        list: [
          { label: "待验真", name: "tab1" },
          { label: "验真通过", name: "tab2" },
          { label: "验真未通过", name: "tab3" },
          { label: "已过期", name: "tab4" },
          { label: "全部", name: "tab5" }
        ]
      },
      queryData: {
        houseName: "",
        taskName: "",
        selectValue: "",
        timeSelect: ""
      },
      nowRow: {},
      checkStatusList: [
        { key: "0", label: "草稿", value: "0" },
        { key: "1", label: "待验真", value: "1" },
        { key: "2", label: "验真成功", value: "2" },
        { key: "3", label: "验真失败", value: "3" },
        { key: "4", label: "已过期", value: "4" }
      ],
      phoneStatusList: [
        { key: "1", label: "号码正常", value: "0" },
        { key: "2", label: "号码异常", value: "1" }
      ],
      checkStatusValue: "",
      phoneStatusValue: "",
      sortColumn: "id",
      sortType: 1,
      showValidityBtn: false, //验真按钮
      // showEditBtn : false,//编辑按钮
      rowData: {}, //行数据
      treeData: [], //结构树
      filterText: "",
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      treeLoading: false,
      treeCondition: {
        0: [], //公司数组
        1: [], //部门数组
        2: [] //人员数组
      },
      chooseTree: [] //选中的树节点
    };
  },
  created() {
    this.queryVerifyHouseByParams(1);
  },
  mounted() {
    this.queryVerifyHouseByParams(1);
    this.getTree();
  },
  methods: {
    /**
     *  展开验证电话弹框
     */
    openCheckTelPop(row) {
      this.telPopFlagTypeClass = "error";
      if (row.checkTelStatus == "正常") {
        this.telPopFlagTypeClass = "info";
      }
      this.rowData = row;
      this.telPopFlag = true;
    },
    toHouseDetail(row) {
      var that = this;
      console.log(row, "进入验真房源（sale_house_draft）详情");
      that.$router.push({
        name: "validateHouseDetails",
        params: { houseId: row.id }
      });
    },
    sortMethod(e) {
      this.sortColumn = e.prop;
      if (e.order == "descending") {
        this.sortType = 1;
      } else {
        this.sortType = 0;
      }
      this.queryVerifyHouseByParams(1);
    },
    GetRequest() {
      var url = location.href; //获取url中"?"符后的字串
      console.log("$$$$$$$", location);
      var theRequest = new URLSearchParams(
        location.hash.substring(location.hash.indexOf("?"))
      );
      var token = theRequest.get("token");
      util.localStorageSet("token", token);
      return token;
    },
    moreSelectChange(e) {
      this.moreSelect = e;
      this.queryVerifyHouseDatas(1);
    },
    queryVerifyHouseByParams(currentPage) {
      this.queryVerifyHouseDatas(1);
    },
    Remove() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.queryVerifyHouseDatas(1);
    },
    queryVerifyHouseDatas(currentPage) {
      let that = this;
      that.loading = true;

      let params = { limit: that.pageJson.pageSize, page: currentPage };
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          console.log(key, this.moreSelect[key]);
          if (key == "addTime" && this.moreSelect[key] !== "") {
            params.beginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (key == "followTime" && this.moreSelect[key] !== "") {
            params.beginFollowTime = this.moreSelect[key][0];
            params.endFollowTime = this.moreSelect[key][1];
          } else {
            params[key] = this.moreSelect[key];
          }
        }
      } else {
        params.comId = that.data.comId;
        params.cbId = that.data.cbId;
        params.bhId = that.data.roomNo;
        params.beginTime = that.data.timeSelect[0];
        params.endTime = that.data.timeSelect[1];
        params.customrName = that.data.customName;
        params.tel = that.data.tel;
        params.minInArea = that.data.minInArea;
        params.maxInArea = that.data.maxInArea;
        params.minPrice = that.data.minPrice;
        params.maxPrice = that.data.maxPrice;
        params.checkStatusValue = that.data.checkStatusValue;
        params.phoneStatusValue = that.data.phoneStatusValue;
        params.houseNo = that.data.houseNo;
        if (params.checkStatusValue == "1") {
          params.checkSubStatus = "0";
        } else if (params.checkStatusValue == "4") {
          params.checkStatusValue = "1";
          params.checkSubStatus = "1";
        }
      }
      params.treeCompany = this.treeCondition[0].join(",");
      params.treeDepartment = this.treeCondition[1].join(",");
      params.treeAccount = this.treeCondition[2].join(",");
      params.sortColumn = this.sortColumn;
      params.sortType = this.sortType;
      this.$api
        .post({
          url: "/myHouse/myVerifyList",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          that.loading = false;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            let data = result.data.houseList;
            that.pageJson.total = data.totalCount;
            that.pageJson.currentPage = data.currPage;
            that.tableData = data.list;

            let btnList = result.data.btnList;
            if (btnList && btnList.length > 0) {
              btnList.forEach(btn => {
                if (btn.rName == "邀请验真") {
                  that.showValidityBtn = true;
                }
              });
            }
          } else {
            console.log("查询验真房源列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询验真房源列表失败");
          console.log(e);
        });
    },
    getVerifyImg(row) {
      let trueId = row.id;
      if (row.isMul != null && row.isMul !== 0) {
        trueId = row.isMul;
      }
      console.log("trueId............" + trueId);
      let params = { id: trueId };
      let that = this;
      that.loading = true;
      this.$api
        .post({
          url: "/verifyHouse/invitationToVerify/verifyList",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          that.loading = false;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.$alert(
              '<img class="invitationToVerify" src="' +
                result.data +
                '"></img>',
              "业主邀请二维码",
              {
                dangerouslyUseHTMLString: true
              }
            );
            that.loading = false;
          } else {
            console.log("查询结果：" + result.message);
            alert(result.message);
            that.loading = false;
          }
        })
        .catch(e => {
          console.log("查询失败");
          console.log(e);
          that.loading = false;
        });
    },
    remoteInput() {
      if (this.data.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        this.loading = true;

        this.$api
          .get({
            url: "/community/validate",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            data: {
              communityName: query,
              page: 1,
              limit: 50
            }
          })
          .then(e => {
            console.log(e.data);
            if (e.data.code == 200) {
              that.loading = false;
              that.options = e.data.data.list;
            }
          });
      } else {
        this.options = [];
      }
    },
    queryCBId() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: that.data.comId,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            that.data.cbId = "";
            that.cbIdList = e.data.data.list;
          }
        });
      this.queryVerifyHouseByParams();
    },
    buildChange() {
      Object.assign(this.$data.houseNoPage, this.$options.data().houseNoPage);
      this.roomNoList = [];
      this.queryRoomNo();
    },
    loadMore() {
      if (this.houseNoPage.currentPage < this.houseNoPage.totalPage) {
        ++this.houseNoPage.currentPage;
        this.queryRoomNo();
      }
    },
    queryRoomNo() {
      var that = this;
      this.HouseNoLoading = true;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: that.data.comId,
            cbId: that.data.cbId,
            page: this.houseNoPage.currentPage,
            limit: this.houseNoPage.limit
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            this.roomNoList = [...this.roomNoList, ...e.data.data.list];
            this.houseNoPage.totalPage = e.data.data.totalPage;
          }
        })
        .finally(() => {
          this.HouseNoLoading = false;
        });
      this.queryVerifyHouseByParams();
    },
    queryTabData() {
      console.log(this.queryData);
    },
    distributeEvent(e, row) {
      if (!e) return;
      this[e](row);
    },
    //空方法
    isForBut(type) {
      let array = [
        {
          name: "邀请验真",
          isType: "待业主验真,待店长验真,已过期,草稿",
          methodName: "getVerifyImg",
          buttonType: "primary"
        },
        {
          name: "重新验真",
          isType: "验真失败",
          methodName: "reVerify",
          buttonType: "warning"
        },
        {
          name: "编辑",
          isType: "待业主验真,待店长验真,已过期,验真失败,草稿",
          methodName: "edit",
          buttonType: "info"
        },
        {
          name: "查看",
          isType: "待业主验真,待店长验真,已过期,验真失败,验真成功",
          methodName: "getResult",
          buttonType: "success"
        }
      ];
      return array.map(item => {
        if (item.isType.includes(type)) {
          item.disabled = false;
        } else {
          item.disabled = true;
          item.methodName = null;
        }
        if (!this.showValidityBtn && item.name == "邀请验真") {
          item.disabled = true;
          item.methodName = null;
        }
        return item;
      });
    },
    getResult(row) {
      let that = this;
      that.showVeryfyDetail = true;
      that.nowRow = row;
      //初始化
      that.customerDiff.spanList = [];
      that.customerDiff.remark = "";
      that.customerDiff.show = false;
      that.employeeDiff.spanList = [];
      that.employeeDiff.remark = "";
      that.employeeDiff.show = false;
      //步骤设置
      that.stepsListNow = that.steps;
      switch (row.checkStatus) {
        case "待业主验真":
          break;
        case "待店长验真":
          that.stepNow = 1;
          that.stepsListNow[0].description = "业主未验真";
          break;
        case "已过期":
          that.stepNow = 2;
          that.stepStatus = "wait";
          that.stepsListNow[0].description = "业主未验真";
          that.stepsListNow[1].description = "店长未验真";
          break;
        case "验真失败":
          that.stepNow = 2;
          that.stepStatus = "error";
          if (row.checkEmployee) {
            that.stepsListNow[1].description = "店长验真不通过";
            that.getVerifyDiff(row.id, 0);
          }
          if (row.checkCustomer) {
            that.stepsListNow[0].description = "业主验真不通过";
            that.getVerifyDiff(row.id, 2);
          }
          break;
        case "验真成功":
          that.stepNow = 2;
          that.stepStatus = "success";
          if (row.checkEmployee) {
            that.stepsListNow[1].description = "店长验真通过";
          }
          if (row.checkCustomer) {
            that.stepsListNow[0].description = "业主验真通过";
          }
          break;
      }
    },
    getCheckStatus(key) {
      let that = this;
      console.log("key=" + key);
      return that.checkStatusList.filter(item => {
        return item.key.includes(key);
      });
    },
    getVerifyDiff(id, perType) {
      this.$api
        .get({
          url: "/verifyHouse/diffrent/" + id,
          data: {
            perType: perType
          }
        })
        .then(e => {
          let that = this;
          let res = e.data;
          if (perType == 2) {
            that.customerDiff.spanList = JSON.parse(res.data.dissentType);
            that.customerDiff.remark = res.data.remark;
            that.customerDiff.show = true;
          } else {
            that.employeeDiff.spanList = JSON.parse(res.data.dissentType);
            that.employeeDiff.remark = res.data.remark;
            that.employeeDiff.show = true;
          }
          console.log(that.employeeDiff.show);
        })
        .catch(e => {
          console.log("查询失败");
          console.log(e);
        });
    },
    handleClick() {
      console.log(this.queryData);
    },
    handleSizeChange(val) {
      this.pageJson.pageSize = val;
      this.queryVerifyHouseDatas(1);
    },
    handleCurrentChange(val) {
      this.queryVerifyHouseDatas(val);
    },
    edit(val) {
      this.$api
        .get({
          url: "/verifyHouse/check/" + val.id
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$router.push({
              path: "/buySellSystem/addHouse?method=edit&id=" + val.id
            });
          } else {
            this.$message.error(e.date.message);
          }
        })
        .catch(e => {});
    },
    reVerify(val) {
      this.$api
        .get({
          url: "/verifyHouse/check/" + val.id
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$router.push({
              path: "/buySellSystem/addHouse?method=edit&id=" + val.id
            });
          } else {
            this.$message.error(e.date.message);
          }
        })
        .catch(e => {});
    },
    handleCheckChange(data, checked) {
      let key = data.type;
      this.chooseTree = []; //清空数组
      this.chooseTree.push(data.businessId);
      if (key == 1) {
        this.getUnderDepartment(data.childrenNodes);
      }
      if (checked) {
        let set = new Set([...this.treeCondition[key], ...this.chooseTree]);
        this.treeCondition[key] = [...set];
      } else {
        this.treeCondition[key] = this.treeCondition[key].filter(item => {
          return !this.chooseTree.includes(item);
        });
      }
      this.queryVerifyHouseByParams(1);
    },
    getUnderDepartment(list) {
      list.forEach(item => {
        if (item.type == 1) {
          this.chooseTree.push(item.businessId);
          if (item.childrenNodes != null && item.childrenNodes.length > 0) {
            this.getUnderDepartment(item.childrenNodes);
          }
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      if (data.labelName != null) {
        return data.labelName.indexOf(value) !== -1;
      }
    },
    getTree() {
      this.treeLoading = true;
      this.$api
        .post({
          url: "/myHouse/myVerifyList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            tree: "1"
          }
        })
        .then(e => {
          this.treeLoading = false;
          if (e.data.code == 200 && e.data.data.length > 0) {
            this.treeData = e.data.data;
          }
        })
        .catch(e => {
          this.treeLoading = false;
        });
    }
  }
};
</script>
