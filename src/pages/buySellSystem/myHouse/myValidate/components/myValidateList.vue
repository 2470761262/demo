<style lang="less" scoped>
.tab-page {
  /deep/.header-tab-cell {
    // prettier-ignore
    height: 50PX;
    font-size: @font16;
    background: rgba(240, 242, 245, 1);
    color: rgba(48, 49, 51, 1);
    font-weight: normal;
    .cell {
      justify-content: center;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
  }

  /deep/.tab-cell-item {
    // prettier-ignore
    height: 50PX;
    font-size: @font16;
    text-align: center;
    .cell {
      white-space: nowrap;
      color: #606266;
    }
  }
}

/deep/.caret-wrapper {
  height: auto;
  .sort-caret {
    position: static;
    &:first-child {
      margin-bottom: 3px;
    }
  }
}
.checkTel-type {
  .checkTel-type- {
    &success {
      color: #40a375;
    }
    &error {
      color: red;
    }
  }
}
.tab-page-floot {
  padding-top: 16px;
  padding-bottom: 14px;
  display: flex;
  justify-content: flex-end;
}
/deep/.el-table__header-wrapper {
  position: sticky;
  top: 0px;
  z-index: 10;
}
/deep/.el-table {
  overflow: visible;
  .cell {
    // prettier-ignore
    line-height: 23PX;
  }
}
.operation-btn {
  color: @backgroud;
  // prettier-ignore
  margin-right: 24PX;
  font-size: @font16;
  // prettier-ignore
  width: 66PX;
  // prettier-ignore
  padding: 5PX 0;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  &[disabled] {
    color: #909399;
    cursor: no-drop;
  }
  &:last-child {
    margin-right: 0;
  }
}
.div-line {
  display: flex;
  .span-width {
    flex: 1;
  }
}
.cus-box {
  display: flex;
}
.span_success,
.span_danger,
.span_warning {
  display: inline-block;
  // prettier-ignore
  padding: 6PX 13PX;
  border-radius: 2px;
  line-height: 1;
  text-align: center;
  font-size: @font14;
}
.span_success {
  background: #0da88b19;
  color: #0da88b;
}
.span_danger {
  background: #ef565619;
  font-size: @font14;
  color: #ef5656;
}
.span_warning {
  background: #f6a42019;
  font-size: @font14;
  color: #f6a420;
}
</style>
<template>
  <div class="tab-page" v-loading="loading">
    <div class="tab-page-flex">
      <el-table
        :data="renderList"
        header-cell-class-name="header-tab-cell"
        cell-class-name="tab-cell-item"
        @sort-change="sortMethod"
        @row-dblclick="navDetailt"
      >
        <el-table-column
          :fixed="item.fixed"
          v-for="(item, index) in tableColumnField"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :sort-method="sortDevName"
          :sortable="item.order"
          :formatter="item.formart"
          :sort-orders="['ascending', 'descending']"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
    <div class="tab-page-floot">
      <el-pagination
        @current-change="currentchange"
        @size-change="handleSizeChange"
        :page-sizes="[30, 50, 70]"
        :page-size="pageJson.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageJson.dataCount"
        :current-page="pageJson.currentPage"
      >
      </el-pagination>
    </div>
    <fixed-popup
      title="验真详情"
      v-if="showVeryfyDetail"
      :visible.sync="showVeryfyDetail"
      width="30%"
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
            <span>{{ nowRow.inArea || 0 }}/㎡</span>
          </div>
          <div class="span-width">
            <span class="font-small-title">户型：</span>
            <span>{{
              (nowRow.rooms || 0) +
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
    </fixed-popup>
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
const dom = document;

import util from "@/util/util";
//验真电话弹框
import telPop from "./telPop";
let checkStatusStrMap = new Map([
  ["待验真", "span_warning"],
  ["验真成功", "span_success"],
  ["验真失败", "span_danger"]
]);
let pageNameMap = new Map([
  [1, "wxValidate"],
  [2, "pMsgValidate"],
  [3, "messageValidate"]
]);
export default {
  inject: ["form"],
  components: {
    telPop
  },
  data() {
    return {
      telPopFlag: false,
      telPopFlagTypeClass: "info",
      rowData: {}, //行数据
      showVeryfyDetail: false,
      steps: [
        { title: "业主验真", description: "" },
        { title: "完成验真", description: "" }
      ],
      stepStatus: "",
      stepsListNow: [],
      nowRow: {},
      stepNow: 0,
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
      showValidityBtn: false, //验真按钮
      loading: true,
      renderList: [],
      tableColumnField: [
        {
          prop: "communityName",
          label: "楼盘名称",
          formart: item => {
            return `${item.communityName}-${item.buildingName}-${item.roomNo}`;
          }
        },
        {
          prop: "sourceStr",
          label: "验真类型"
        },
        {
          prop: "checkStatusStr",
          label: "验真状态",
          formart: item => {
            let str = checkStatusStrMap.get(item.checkStatusStr);
            return (
              <span class={str}>{str ? item.checkStatusStr : "暂无"}</span>
            );
          }
        },
        {
          prop: "customerName",
          label: "业主姓名"
        },
        {
          prop: "modeStr",
          label: "验真方式"
        },
        {
          prop: "addPerName",
          label: "录入人"
        },
        // {
        //   prop: "addTime",
        //   label: "录入时间",
        //   order: "custom"
        // },
        {
          label: "操作",
          formart: row => this.operation(row),
          width: "272"
          //  fixed: "right"
        }
      ],
      pageJson: {
        total: 1,
        pageSize: 30,
        currentPage: 1,
        dataCount: 0
      }
    };
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler: function(value, ordvalue) {
        this.getHouseData(JSON.parse(JSON.stringify(value))).then(() => {
          dom.querySelector(".scroll-tab").scrollTop = 0;
          //  this.$parent.ListeningScroll();
        });
      }
    }
  },
  methods: {
    accesssoryTabClick(tab, event) {
      let key = parseInt(tab.index) + 1;
      this.bigAccessoryFile.forEach(item => {
        item.data = this.accessoryFile[key][item.key];
      });
    },
    /**
     * @example: 操作按钮
     * @param {type}
     */
    operation(row) {
      let array = [
        {
          name: "邀请验真",
          isType: "待验真",
          methodName: "getVerifyImg"
        },
        {
          name: "重新验真",
          isType: "验真失败",
          methodName: "reVerify"
        },
        // {
        //   name: "编辑",
        //   isType: "待业主验真,待店长验真,已过期,验真失败,草稿",
        //   methodName: "edit"
        // },
        {
          name: "验真详情",
          isType: "待验真,验真失败,验真成功",
          methodName: "getResult"
        }
      ];
      return array
        .map(item => {
          if (item.isType.includes(row.checkStatusStr)) {
            item.disabled = false;
          } else {
            item.disabled = true;
          }
          if (!this.showValidityBtn && item.name == "邀请验真") {
            item.disabled = true;
          }
          if (item.name == "重新验真" && parseInt(row.source) != 1) {
            item.disabled = true;
          }
          return item;
        })
        .map(btnDataItem => {
          return (
            <span
              class="operation-btn"
              onClick={this[btnDataItem.methodName].bind(this, row)}
              disabled={btnDataItem.disabled}
            >
              {btnDataItem.name}
            </span>
          );
        });
    },
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
      switch (row.checkStatusStr) {
        case "待验真":
          that.stepNow = 1;
          //that.stepsListNow[0].description = "待业主验真";
          break;
        case "验真失败":
          that.stepNow = 2;
          that.stepStatus = "error";
          break;
        case "验真成功":
          that.stepNow = 2;
          that.stepStatus = "success";
          break;
      }
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
        .post({
          url: "/verifyHouse/afreshVerify/" + val.id
        })
        .then(e => {
          if (e.data.code == 200) {
            this.$router.push({
              path: "/buySellSystem/addHouse?method=afresh&id=" + val.id
            });
          } else {
            this.$message.error(e.date.message);
          }
        })
        .catch(e => {});
    },
    getImg(params) {
      this.$api
        .post({
          url: "/verifyHouse/invitationToVerify/verifyList",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          this.loading = false;
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
            this.loading = false;
          } else {
            console.log("查询结果：" + result.message);
            alert(result.message);
            this.loading = false;
          }
        })
        .catch(e => {
          console.log("查询失败");
          console.log(e);
          this.loading = false;
        });
    },
    getVerifyImg(row) {
      let trueId = row.id;
      let that = this;
      that.loading = true;
      this.$api
        .get({
          url: "/verifyHouse/inviteVerify/" + row.id
        })
        .then(e => {
          that.loading = false;
          if (e.data.code == 200) {
            let data = e.data.data;

            if (data.mode) {
              this.$router.push({
                name: pageNameMap.get(parseInt(data.mode)),
                query: {
                  id: row.id
                }
              });
            } else {
              this.$router.push({
                path: "/buySellSystem/validateHome",
                query: {
                  id: row.id
                }
              });
            }
          } else {
            this.$message.error(e.date.message);
          }
        })
        .catch(e => {
          that.loading = false;
        });
    },
    //解决索引只排序当前页的问题,增加函数自定义索引序号
    sortDevName(str1, str2) {
      let res = 0;
      for (let i = 0; ; i++) {
        if (!str1[i] || !str2[i]) {
          res = str1.length - str2.length;
          break;
        }

        const char1 = str1[i];
        const char1Type = this.getChartType(char1);
        const char2 = str2[i];
        const char2Type = this.getChartType(char2);
        // 类型相同的逐个比较字符
        if (char1Type[0] === char2Type[0]) {
          if (char1 === char2) {
            continue;
          } else {
            if (char1Type[0] === "zh") {
              res = char1.localeCompare(char2);
            } else if (char1Type[0] === "en") {
              res = char1.charCodeAt(0) - char2.charCodeAt(0);
            } else {
              res = char1 - char2;
            }
            break;
          }
        } else {
          // 类型不同的，直接用返回的数字相减
          res = char1Type[1] - char2Type[1];
          break;
        }
      }

      if (this.form.sortColumn == "floor") {
        res = str1.floor > str2.floor ? 1 : -1;
      } else if (this.form.sortColumn == "addTime") {
        res = -1;
      }

      return res;
    },
    getChartType(char) {
      // 数字可按照排序的要求进行自定义，我这边产品的要求是
      // 数字（0->9）->大写字母（A->Z）->小写字母（a->z）->中文拼音（a->z）
      if (/^[\u4e00-\u9fa5]$/.test(char)) {
        return ["zh", 300];
      }
      if (/^[a-zA-Z]$/.test(char)) {
        return ["en", 200];
      }
      if (/^[0-9]$/.test(char)) {
        return ["number", 100];
      }
      return ["others", 999];
    },
    /**
     * @example: 双击前往详情
     */
    navDetailt(item) {
      util.openPage.call(this, {
        name: "validateHouseDetails",
        params: { houseId: item.id, dept: item.perDept }
      });
    },
    /**
     * @example: 远程排序
     */
    sortMethod(item) {
      let order = JSON.parse(JSON.stringify(item));
      this.InitPageJson();
      //this.pageJson.currentPage = 1;
      switch (order.order) {
        case "ascending":
          this.form.sortColumn = order.prop;
          this.form.sortType = 0;
          break;
        case "descending":
          this.form.sortColumn = order.prop;
          this.form.sortType = 1;
      }
    },
    handleSizeChange(pageSize) {
      this.pageJson.pageSize = pageSize;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), true);
    },
    /**
     * @example: 分页组件页面改变时触发
     * @param {number} pageIndex
     */

    currentchange(pageIndex) {
      this.pageJson.currentPage = pageIndex;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), false).then(
        () => {
          dom.querySelector(".scroll-tab").scrollTop = 0;
          // this.$parent.ListeningScroll();
        }
      );
    },
    InitPageJson() {
      this.pageJson = {
        total: 1,
        currentPage: 1,
        pageSize: this.pageJson.pageSize,
        dataCount: 0
      };
    },
    getHouseData(value, initPage = true) {
      this.loading = true;
      if (initPage) this.InitPageJson();

      let params = Object.assign({}, value, {
        page: this.pageJson.currentPage,
        limit: this.pageJson.pageSize
      });
      if (params.time && params.time.length == 2) {
        params.beginTime = params.time[0];
        params.endTime = params.time[1];
      }
      delete params.random;
      delete params.time;
      return this.$api
        .post({
          url: "/myHouse/myVerifyList",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.renderList = data.data.houseList.list;
            this.pageJson.total = data.data.houseList.totalPage;
            this.pageJson.dataCount = data.data.houseList.totalCount;

            let btnList = data.data.btnList;
            if (btnList && btnList.length > 0) {
              btnList.forEach(btn => {
                if (btn.rName == "邀请验真") {
                  this.showValidityBtn = true;
                }
              });
            }
          }
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
