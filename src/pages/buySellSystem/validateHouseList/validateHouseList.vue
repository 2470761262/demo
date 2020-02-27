<style lang="less" scoped>
.div-line {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 300px;
}
.span-width {
  width: 150px;
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
</style>
<template>
  <div style="height:100%">
    <list-page
      :parentData="$data"
      @queryTabData="queryTabData"
      @handleClick="handleClick"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:tableColumn="cell">
        <el-table-column
          :width="item.width"
          :formatter="item.formart"
          :label="item.label"
          show-overflow-tooltip
          v-for="(item,index) in tableDataColumn"
          :key="index"
        ></el-table-column>
        <el-table-column prop="operation" label="操作" fixed="right" key="992">
          <template v-slot="scope">
            <!-- <div v-if="scope.row.operation!=''"> -->

            <el-button
              :type="item.buttonType"
              size="mini"
              @click="distributeEvent(item.methosName,scope.row)"
              v-for="(item,index) in isForBut(scope.row.checkStatus)"
              :key="index"
            >{{item.name}}</el-button>
            <!-- </div> -->
          </template>
        </el-table-column>
      </template>
    </list-page>
    <el-dialog
      title="验真详情"
      :visible.sync="showVeryfyDetail"
      width="30%"
      :before-close="()=> showVeryfyDetail = false"
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
      <el-card v-if="employeeDiff.show" class="box-card" style="line-height:30px">
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
            >{{item}}</el-tag>
          </div>
          <div>{{employeeDiff.remark}}</div>
        </div>
      </el-card>
      <el-card v-if="customerDiff.show" class="box-card" style="line-height:30px">
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
            >{{item}}</el-tag>
          </div>
          <div>{{customerDiff.remark}}</div>
        </div>
      </el-card>
      <el-card class="box-card" style="line-height:30px">
        <div slot="header" class="clearfix">
          <span>房源详情</span>
        </div>
        <div>
          <span class="font-small-title">小区：</span>
          <span
            class="font-middle-title"
          >{{nowRow.communityName+"-"+nowRow.buildingNo+"-"+nowRow.roomNo}}</span>
        </div>
        <div class="div-line">
          <div class="span-width">
            <span class="font-small-title">售价：</span>
            <span>{{nowRow.price}}万元</span>
          </div>
          <div class="span-width">
            <span class="font-small-title">均价：</span>
            <span>{{avgPrice}}元/㎡</span>
          </div>
        </div>
        <div class="div-line">
          <div class="span-width">
            <span class="font-small-title">面积：</span>
            <span>{{nowRow.area}}/㎡</span>
          </div>
          <div class="span-width">
            <span class="font-small-title">户型：</span>
            <span>{{(nowRow.room||0)+"室"+(nowRow.hall||0)+"厅"+(nowRow.toilet||0)+"卫"}}</span>
          </div>
        </div>
        <div class="div-line">
          <div class="span-width">
            <span class="font-small-title">朝向：</span>
            <span>{{nowRow.face}}</span>
          </div>
          <div class="span-width">
            <span class="font-small-title">装修：</span>
            <span>{{nowRow.decoration}}</span>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>客户信息</span>
        </div>
        <div class="cus-box">
          <img
            width="55px"
            height="55px"
            src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoBoothYIicibib53FVCgxhBCBYQpa0vL1caT9E1iaFP4bKqA07PZicqInw19IB91icibswy0KmqJGM5QkJQ/132"
          >
          <div style="margin-left:20px">
            <span class="font-small-title">{{nowRow.customerName}}</span>
            <el-tag type="warning" size="mini">vip</el-tag>
            <div>
              <span>{{nowRow.tel}}</span>
            </div>
          </div>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import util from "@/util/util";

export default {
  components: {
    listPage
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
      loading: true, //控制表格加载动画提示
      showVeryfyDetail: false, //验真详情弹出层
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      customerDiff: {
        spanList: [],
        remark: "",
        show: false
      },
      employeeDiff: {
        spanList: [],
        remark: "",
        show: false
      },
      steps: [
        { title: "客户验真", description: "" },
        { title: "店长验真", description: "" },
        { title: "完成验真", description: "" }
      ],
      stepsListNow: [],
      stepStatus: "",
      stepNow: 0,
      tableDataColumn: [
        {
          prop: "communityName",
          label: "房源坐落",
          formart: row => {
            return row.communityName + "-" + row.buildingNo + "-" + row.roomNo;
          },
          width: ""
        },
        {
          prop: "price",
          label: "售价(万元)",
          formart: row => row.price,
          width: "120"
        },
        {
          prop: "area",
          label: "面积(㎡)",
          formart: row => row.area,
          width: "120"
        },
        {
          prop: "roomType",
          label: "户型",
          formart: row => {
            let room = row.room || 0;
            let hall = row.hall || 0;
            let toilet = row.toilet || 0;
            return room + "室-" + hall + "厅-" + toilet + "卫";
          },
          width: "120"
        },
        {
          prop: "decoration",
          label: "装修程度",
          formart: row => row.decoration,
          width: "120"
        },
        {
          prop: "creatorName",
          label: "经纪人",
          formart: row => row.creatorName,
          width: "120"
        },
        {
          prop: "createTime",
          label: "录入时间",
          formart: row => row.createTime,
          width: "160"
        },
        {
          prop: "checkStatus",
          label: "状态",
          formart: row => row.checkStatus,
          width: "120"
        }
      ],
      tableData: [
        {
          house: "龙腾花园-16栋-604室",
          price: "234",
          area: "1252",
          type: "3室2厅1卫",
          levae: "精装修",
          economicPro: "周杰伦",
          addTime: "2019-01-01 18:00:00",
          cellType: "待店长验真",
          operation: "1"
        },
        {
          house: "龙腾花园-16栋-604室",
          price: "234",
          area: "12",
          type: "3室2厅1卫",
          levae: "精装修",
          economicPro: "周杰伦1",
          addTime: "2019-01-01 18:00:00",
          cellType: "待店长验真",
          operation: "3"
        }
      ],
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
      options: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "待验真"
        },
        {
          value: "选项3",
          label: "客户验真"
        },
        {
          value: "选项4",
          label: "店长验真"
        },
        {
          value: "选项5",
          label: "验真失败"
        },
        {
          value: "选项6",
          label: "已过期"
        }
      ],
      queryData: {
        houseName: "",
        taskName: "",
        selectValue: "",
        timeSelect: ""
      },
      nowRow: {},
      checkStatusList: [
        { key: "1", value: "待客户验真" },
        { key: "2", value: "待店长验真" }, //客户验真过期
        { key: "3", value: "店长验真通过" },
        { key: "4", value: "验真过期" },
        { key: "5", value: "验真失败" },
        { key: "6", value: "验真成功" }
      ]
    };
  },
  created() {
    console.log("===========" + JSON.stringify(this.GetRequest()));
  },
  mounted() {
    this.queryVerifyHouseByParams(1);
  },
  methods: {
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
    queryVerifyHouseByParams() {
      this.queryVerifyHouseDatas(1);
    },
    queryVerifyHouseDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      that.loading = true;
      if (this.queryData.newsTitle != null) {
        params.newsTitle = this.queryData.newsTitle;
      }
      this.$api
        .post({
          url: "/draft-house/page",
          data: params,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          that.loading = false;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            that.pageJson.total = result.data.totalCount;
            that.pageJson.currentPage = result.data.currPage;
            that.tableData = result.data.list;
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
      let params = { id: row.id };
      let that = this;
      that.loading = true;
      this.$api
        .post({
          url: "/verifyHouse/invitationToVerify",
          data: params,
          token: false,
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
              '<img src="' + result.data + '"></img>',
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
    open() {
      this.$alert(
        '<img src="https://lsxjytestimgs.oss-cn-shenzhen.aliyuncs.com/verifyHouseShare/b25076270b8248509e9fe815005ced60.jpg"></img>',
        "HTML 片段",
        {
          dangerouslyUseHTMLString: true
        }
      );
    },
    queryTabData() {
      console.log(this.queryData);
    },
    distributeEvent(e, row) {
      this[e](row);
    },
    isForBut(type) {
      let array = [
        {
          name: "邀请验真",
          isType: "待业主验真,待店长验真,已过期",
          methosName: "getVerifyImg",
          buttonType: "primary"
        },
        {
          name: "重新验真",
          isType: "验真失败",
          methosName: "reVerify",
          buttonType: "warning"
        },
        {
          name: "编辑",
          isType: "待业主验真,待店长验真,已过期,验真失败",
          methosName: "edit",
          buttonType: ""
        },
        {
          name: "查看",
          isType: "待业主验真,待店长验真,已过期,验真失败,验真成功",
          methosName: "getResult",
          buttonType: "info"
        }
      ];
      return array.filter(item => {
        return item.isType.includes(type);
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
    }
  }
};
</script>