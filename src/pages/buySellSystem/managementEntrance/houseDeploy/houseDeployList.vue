<style lang="less" scoped>
.content-child {
  // prettier-ignore
  margin-top: 16PX;
  display: flex;
  background: #fff;
  // prettier-ignore
  border-radius: 8PX;
  // prettier-ignore
  padding: 0 16PX;
  // prettier-ignore
  padding-top: 27PX;
  flex: 1;
  height: 0;
  .col-height {
    display: flex;
    flex-direction: column;
    // prettier-ignore
    width:  224PX;
    flex-shrink: 0;
    .list-left {
      flex: 1;
      height: 0;
      background: #f0f7f7;
      // prettier-ignore
      padding: 10PX 0;
      // prettier-ignore
      margin-bottom: 7PX;
      display: flex;
      flex-direction: column;
      .treeSearch {
        // prettier-ignore
        height: 36PX;
        // prettier-ignore
        padding:0 10PX;
        box-sizing: border-box;
        /deep/.el-input__inner {
          height: 100%;
          // prettier-ignore
          line-height: 36PX;
          // prettier-ignore
          padding-left: 30PX;
          border: none;
          background: #fff;
        }
        /deep/.el-input__prefix {
          // prettier-ignore
          width: 30PX;
          // prettier-ignore
          left: 10PX;
          /deep/.el-input__icon {
            font-size: @font14;
          }
        }
      }
      .scroll-tree {
        flex: 1;
        overflow: auto;
      }
      /deep/.el-tree {
        background: inherit;
        .el-tree-node__content {
          // prettier-ignore
          height: 40PX;
          .el-icon-caret-right {
            font-size: @font14;
            color: #8ebebe;
          }
          .is-leaf {
            color: transparent !important;
          }
          .el-tree-node__label {
            font-size: @font14;
          }
          .el-checkbox {
            .el-checkbox__inner {
              // prettier-ignore
              width: 16PX;
              // prettier-ignore
              height: 16PX;
              font-size: @font14;
              &::after {
                // prettier-ignore
                height: 10PX;
                // prettier-ignore
                left:5PX;
                // prettier-ignore
                width: 3PX;
              }
            }
          }
        }
      }
      /deep/.is-focusable {
        .el-tree-node__children {
          background: #d5f0f0;
        }
      }
    }
  }
  .list-right {
    flex: 1;
    // prettier-ignore
    padding-left: 16PX;
    display: flex;
    flex-direction: column;
    width: 0;
    .list-head {
      display: flex;
      .list-head-type {
        display: flex;
        flex: 1;
        .head-type-item {
          color: #303133;
          // prettier-ignore
          min-width: 90PX;
          cursor: pointer;
          // prettier-ignore
          line-height: 24PX;
          div {
            // prettier-ignore
            font-size: 18PX;
          }
          &.active {
            color: #247257;
            font-weight: bold;
            font-size: 0;
            div {
              position: relative;
              display: inline-block;
              // prettier-ignore
              font-size: 24PX;
              &::after {
                content: "";
                position: absolute;
                // prettier-ignore
                bottom: -12PX;
                left: 0;
                width: 100%;
                background: @backgroud;
                // prettier-ignore
                border-radius: 8PX;
                // prettier-ignore
                height: 4PX;
              }
            }
          }
        }
      }
      .list-head-check {
        /deep/.el-checkbox__inner {
          // prettier-ignore
          width:18PX ;
          // prettier-ignore
          height: 18PX;
          &::after {
            // prettier-ignore
            height: 10PX;
            // prettier-ignore
            left:5PX;
            // prettier-ignore
            width: 3PX;
          }
        }
        /deep/.el-checkbox__label {
          // prettier-ignore
          font-size: 18PX;
          color: #606266;
        }
      }
    }
    .scroll-tab {
      flex: 1;
      height: 0;
      // prettier-ignore
      margin-top: 10PX;
    }
  }
}
/deep/.header-tab-cell,
/deep/.header-tab-cell-left {
  // prettier-ignore
  height: 48PX;
  font-size: @font16;
  background: #f0f5f4;
  color: #303133;
  .cell {
    justify-content: center;
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-weight: normal;
    line-height: normal;
    .caret-wrapper {
      height: auto;
      .sort-caret {
        position: static;
        &:nth-child(1) {
          // border-bottom-color: #8ebebe;
          // prettier-ignore
          margin-bottom: 4PX;
        }
        &:nth-child(2) {
          //  border-top-color: #8ebebe;
        }
      }
    }
  }
}
/deep/.header-tab-cell-left {
  div {
    justify-content: flex-start !important;
    // prettier-ignore
    padding-left: 16PX;
  }
}
/deep/.tab-cell-item,
/deep/.tab-cell-left {
  // prettier-ignore
  height: 64PX;
  font-size: @font16;
}
/deep/.tab-cell-item {
  // prettier-ignore
  text-align: center;
  .cell {
    line-height: normal;
  }
}
/deep/.tab-cell-left {
  text-align: left;
  .cell {
    // prettier-ignore
    padding-left: 16PX;
    line-height: normal;
  }
}
.page-foot {
  // prettier-ignore
  padding: 21PX 0;
  text-align: right;
}
</style>
<template>
  <div class="content-child">
    <div class="col-height" v-if="curreTypeIndex != 5">
      <div class="list-left">
        <el-input
          data-anchor="我的对赌树 => input"
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          class="treeSearch"
          prefix-icon="el-icon-search"
        ></el-input>
        <div class="scroll-tree">
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
      </div>
    </div>
    <div class="list-right">
      <div class="list-head">
        <div class="list-head-type">
          <div
            class="head-type-item "
            :class="{ active: index == curreTypeIndex }"
            v-for="(item, index) in curreType"
            :key="item.title"
            @click="setCureeIndex(index)"
          >
            <div>{{ item.title }}</div>
          </div>
        </div>
        <div class="list-head-check" v-if="curreTypeIndex != 5">
          <el-checkbox v-model="checked" @change="deployCheck"
            >可调配</el-checkbox
          >
        </div>
      </div>
      <div class="scroll-tab">
        <el-table
          v-loading="loading"
          :height="height"
          :data="renderList"
          :header-cell-class-name="tabHeaderDirection"
          :cell-class-name="tabDirection"
          @sort-change="sortMethod"
          @row-dblclick="navDetailt"
          :default-sort="{ prop: 'addTime', order: 'ascending' }"
        >
          <el-table-column
            v-for="(item, index) in tableColumnField"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :sort-method="sortDevName"
            :sortable="item.order"
            :formatter="item.formart"
            :sort-orders="['ascending', 'descending']"
            :fixed="item.fixed"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
      <div class="page-foot">
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
    </div>
    <el-dialog
      :title="curreType[curreTypeIndex].title + '人将调配至本公司人员'"
      :visible.sync="dialogVisible"
      width="20%"
    >
      <el-select
        class="anchor-point"
        v-model="newAgentName"
        @change="queryAddPerId"
        key-value="accountID"
        filterable
        remote
        clearable
        placeholder="请输入跟单人姓名进行搜索"
        :loading="agentLoading"
      >
        <el-option
          class="anchor-point"
          v-for="(item, index) in AgentPerList"
          :key="index"
          :label="item.perName"
          :value="item"
        >
          <span style="float: left">{{ item.perName }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            item.deptName
          }}</span>
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="anchor-point"
          >取 消</el-button
        >
        <el-button class="anchor-point" type="primary" @click="updateAgentPer"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import util from "@/util/util";
const CURRETYPE = [
  { title: "跟单", value: "2" },
  { title: "录入", value: "3" },
  { title: "实勘", value: "6" },
  { title: "钥匙", value: "4" },
  { title: "委托", value: "5" },
  { title: "店公共盘", value: "1" }
];
const dom = document;
export default {
  inject: ["form"],
  data() {
    return {
      dialogVisible: false,
      newAgentName: "",
      agentLoading: true,
      AgentPerList: [],
      showUpdateAgentPer: false, //调配功能
      filterText: "",
      treeData: [], //结构树
      treeLoading: false,
      defaultProps: {
        children: "childrenNodes",
        label: "labelName"
      },
      height: 0,
      curreType: CURRETYPE,
      curreTypeIndex: 0,
      loading: true,
      renderList: [],
      tableColumnField: [
        {
          prop: "communityName",
          label: "楼盘名称",
          order: false,
          width: "166",
          fixed: "left"
        },
        {
          prop: "houseType",
          label: "户型",
          order: "custom",
          formart: item =>
            (item.rooms || 0) +
            "-" +
            (item.hall || 0) +
            "-" +
            (item.toilet || 0) +
            "-" +
            (item.balcony || 0)
        },
        {
          prop: "inArea",
          label: "面积",
          order: "custom",
          formart: item => item.inArea + "㎡"
        },
        {
          prop: "price",
          label: "总价",
          order: "custom",
          formart: item => Math.round(item.price) + "万"
        },
        {
          prop: "unitPrice",
          label: "单价",
          order: "custom",
          formart: item => this.unitPrice(item) + "元/㎡"
        },
        {
          prop: "seenNumRecent",
          label: "30天带看",
          order: "custom",
          formart: item => item.seenNumRecent || "0"
        },
        {
          prop: "customerType",
          label: "业主类型",
          order: false
        },
        // {
        //   prop: "saleReson",
        //   label: "卖房原因",
        //   order: false,
        //   formart: item => item.saleReson || "暂无"
        // },
        {
          prop: "floor",
          label: "楼层",
          order: true,
          formart: item => {
            return `${item.floor}/${item.floorNum || "暂无"}`;
          }
        },
        {
          prop: "addTime",
          label: "挂牌",
          order: "custom"
        },
        {
          prop: "brokerName",
          label: "跟单人",
          order: false
        }
      ],
      treeCondition: {
        0: [], //公司数组
        1: [], //部门数组
        2: [] //人员数组
      },
      checked: false,
      chooseTree: [], //选中的树节点
      pageJson: {
        total: 1,
        pageSize: 30,
        currentPage: 1,
        dataCount: 0
      },
      AgentPerId: ""
    };
  },
  watch: {
    curreTypeIndex(val) {
      if (val == 5) {
        this.checked = false;
        this.deployCheck();
      }
    },
    filterText(val) {
      this.$refs.treeForm.filter(val);
    },
    form: {
      deep: true,
      immediate: true,
      handler: function(value, ordvalue) {
        this.getHouseData(JSON.parse(JSON.stringify(value))).then(() => {
          dom.querySelector(".scroll-tab").scrollTop = 0;
        });
      }
    }
  },
  mounted() {
    this.getTree();

    this.computeTabHeight();
    window.addEventListener("resize", this.computeTabHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.computeTabHeight);
  },
  methods: {
    toHouseData(id, CommunityName, agentName, agentper) {
      var that = this;
      that.agentLoading = true;
      that.queryCompanyPerList();
      that.agentName = agentName;
      console.log(agentper);
      that.agentper = agentper;
      that.dialogVisible = true;
      console.log("得到房源id为:" + id + "------楼盘名称" + CommunityName);
      that.toHouseId = id;
      that.toComName = CommunityName;
    },
    queryCompanyPerList() {
      var that = this;
      that.agentLoading = true;
      this.$api
        .get({
          url: "/employee/deployment/per",
          data: {
            workType:
              this.curreType[this.curreTypeIndex].title != "店公共盘"
                ? this.curreType[this.curreTypeIndex].value
                : null
          },
          token: false
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            that.AgentPerList = result.data;
          } else {
            console.log("查询同公司下的所有经纪人失败");
            this.$message({
              message: result.message,
              type: "warning"
            });
          }
        })
        .catch(e => {
          console.log("查询同公司下的所有经纪人失败");
        })
        .finally(e => {
          that.agentLoading = false;
        });
    },
    queryAddPerId(row) {
      let data = row;
      var that = this;
      this.AgentPerId = data;
      that.newAgentName = data.perName;
      return this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          qs: true,
          data: {
            comId: that.comId
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.cbIdList = e.data.data.list;
          }
        });
    },
    updateAgentPer() {
      var that = this;
      console.log(
        "得到跟单人id为:" +
          that.newAgentName +
          "======" +
          JSON.stringify(that.AgentPerId.accountID)
      );
      console.log(
        "得到房源id为:" +
          that.agentPer +
          "------楼盘名称" +
          that.AgentPerId.accountID
      );
      if (!that.newAgentName) {
        this.$message({
          message: "请选择调配跟单人！",
          type: "warning"
        });
        return false;
      }
      if (that.agentPer == that.AgentPerId.accountID) {
        this.$message({
          message: "调配跟单人和原跟单人相同，请重新选择！",
          type: "warning"
        });
        return false;
      }
      let params = {
        houseId: parseInt(that.toHouseId) + "",
        newAgentPer: parseInt(JSON.stringify(that.AgentPerId.accountID)),
        oldAgentPer: parseInt(that.agentper != null ? that.agentper : ""),
        newAgentName: that.AgentPerId.perName
      };
      this.$api
        .post({
          url: "/static/updateWorkPer",
          data: params,
          qs: true
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
          } else {
            console.log("修改失败");
          }
        })
        .catch(e => {
          console.log("修改失败");
        });
      that.dialogVisible = false;
      // this.deployCheck();
    },
    deployCheck() {
      if (this.checked) {
        this.tableColumnField.push({
          label: "操作",
          width: "116",
          fixed: "right",
          formart: item => {
            return (
              <el-button
                type="text"
                onClick={this.toHouseData.bind(
                  this,
                  item.id,
                  item.communityName,
                  item.agentName,
                  item.agentPer
                )}
              >
                调配
              </el-button>
            );
          }
        });
      } else {
        this.tableColumnField.splice(this.tableColumnField.length - 1, 1);
      }

      this.getHouseData(JSON.parse(JSON.stringify(this.form)), true);
    },
    /**
     * @example: 设置类型
     */
    setCureeIndex(index) {
      this.curreTypeIndex = index;
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), true);
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
          //this.$parent.ListeningScroll();
        }
      );
    },
    tabHeaderDirection({ column }) {
      return column.label == "楼盘名称"
        ? "header-tab-cell-left"
        : "header-tab-cell";
    },
    computeTabHeight() {
      this.$nextTick(() => {
        this.height = parseInt(
          getComputedStyle(document.querySelector(".scroll-tab")).height
        );
      });
    },
    /**
     * @example: 设置Tab方向
     */
    tabDirection({ column }) {
      return column.label == "楼盘名称" ? "tab-cell-left" : "tab-cell-item";
    },
    getTree() {
      this.treeLoading = true;
      //读取树数据
      this.$api
        .post({
          url: this.checked
            ? "/static/soleHouseDeploy"
            : "/static/soleAllHouseIndex",
          data: {
            tree: "1"
          },
          headers: { "Content-Type": "application/json;charset=UTF-8" }
        })
        .then(e => {
          this.treeLoading = false;
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.treeData = result.data;
          } else {
            console.log("载入结果" + +result.message);
            alert(result.message);
          }
        })
        // .then(() => {
        //   if (this.$route.query.cur != null) {
        //     this.curNodeId = [this.$route.query.cur];
        //     this.$nextTick(() => {
        //       this.handleCheckChange(
        //         this.$refs.treeForm.getNode(...this.curNodeId).data,
        //         true
        //       );
        //     });
        //   }
        // })
        .catch(e => {
          this.treeLoading = false;
          console.log("读取失败");
          console.log(e);
        });
    },
    handleCheckChange(data, checked, node) {
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
      this.getHouseData(JSON.parse(JSON.stringify(this.form)), true);
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
    unitPrice(row, column) {
      if (row.inArea > 0 && row.unitPrice) {
        return Math.round(row.unitPrice);
      } else {
        return 0;
      }
    },
    /**
     * @example: 双击前往详情
     */
    navDetailt(item) {
      util.openPage.call(this, {
        name: "houseDetails",
        params: { houseId: item.id, dept: item.perDept }
      });
    },
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
        res = str1.addTime > str2.addTime ? 1 : -1;
      }

      return res;
    },
    /**
     * @example: 远程排序
     */
    sortMethod(item) {
      let order = JSON.parse(JSON.stringify(item));
      //户型修改为prop为rooms
      if (item.column.property == "houseType") {
        order.prop = "rooms";
      }
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
      if (this.curreTypeIndex == 5) {
        //  this.$refs.treeForm.setCheckedKeys([]);
        this.treeCondition = {
          0: [], //公司数组
          1: [], //部门数组
          2: [] //人员数组
        };
      }
      if (initPage) this.InitPageJson();
      let url = this.checked
        ? "/static/soleHouseDeploy"
        : "/static/soleAllHouseIndex";
      let restuleParms = Object.assign({}, value, {
        page: this.pageJson.currentPage,
        limit: this.pageJson.pageSize
      });
      if (this.curreType[this.curreTypeIndex].title === "店公共盘") {
        restuleParms.plate = "1";
      } else {
        restuleParms.workType = this.curreType[this.curreTypeIndex].value;
      }
      if (restuleParms.time && restuleParms.time.length == 2) {
        restuleParms.beginTime = restuleParms.time[0];
        restuleParms.endTime = restuleParms.time[1];
      }
      restuleParms.treeCompany = this.treeCondition[0].join(",");
      restuleParms.treeDepartment = this.treeCondition[1].join(",");
      restuleParms.treeAccount = this.treeCondition[2].join(",");
      delete restuleParms.random;
      delete restuleParms.time;
      return this.$api
        .post({
          url,
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: restuleParms
        })
        .then(e => {
          let data = e.data;
          if (data.code == 200) {
            this.renderList = data.data.data;
            this.pageJson.total = data.data.pageSum;
            this.pageJson.dataCount = data.data.dataCount;
          }
          this.$nextTick(() => {
            this.$emit("addListener");
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
