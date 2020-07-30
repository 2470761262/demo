<style lang="less" scoped>
.page-row-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.head-fun-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  .btn-primary {
    display: flex;
    align-items: center;
    margin-right: 30px;
    font-size: @font16;
    border-radius: 30px;
    height: auto;
    i {
      font-size: @font16;
      margin-right: 5px;
    }
    &.house-back {
      background: @backgroud;
      color: #fff;
      box-shadow: 0 4px 10px @opacityBackground;
    }
  }
}
</style>
<template>
  <div class="page-row-flex">
    <list-page
      @sort-change="sortMethod"
      :parentData="$data"
      @queryTabData="queryTabData"
      @handleClick="handleClick"
      @cell-dblclick="handleDbclick"
      :dblclick="true"
      :sidebarFlag="false"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:top>
        <div class="page-list-query-row">
          <div class="query-content-cell cell-interval75">
            <el-button
              type="primary"
              size="mini"
              @click="queryDisplayboardListParams"
              >查询
            </el-button>
          </div>
          <div class="query-content-cell cell-interval25">
            <definitionmenu
              :renderList="renderList"
              :tableColumn="tableColumn"
              @change="tabColumnChange"
              :loading="menuLoading"
              :resetList="tableColumnField"
            ></definitionmenu>
          </div>
        </div>
      </template>
      <template #tableColumn>
        <template v-for="item in tableColumnField">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :min-width="item.width"
            :key="item.prop"
            show-overflow-tooltip
            :formatter="item.formart"
            :sort-orders="['ascending', 'descending']"
            :sortable="item.order"
          ></el-table-column>
        </template>
      </template>
    </list-page>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import tableMenu from "@/util/getTableMenu";
import definitionmenu from "@/components/definitionMenu";
import util from "@/util/util";
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    definitionmenu
  },
  data() {
    return {
      loading: true,
      id: 0,
      queryData: {
        type: "",
        houseName: "",
        brokerName: "",
        brokerPhone: "",
        timeSelect: "",
        isCheck: ""
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        size: 10, //每页条数
        sizes: [10, 15, 20, 50] //每页条数
      },
      tableColumnField: [
        // {
        //   prop: "dispalycode",
        //   label: "看板编码",
        //   width: "170",
        //   order: false,
        //   disabled: false,
        //   default: true
        // }
      ],
      tableData: [],
      tableColumn: [],
      menuLoading: true, //自定义菜单
      sortColumn: "id", //排序字段
      sortType: "descending", //排序类型
      renderList: []
    };
  },
  mounted() {
    this.id = JSON.parse(this.$route.query.id);
    if (!this) {
      this.$message.error("缺少必要参数!");
    }
    tableMenu.getTableMenu(this.tableColumnField, 11).then(e => {
      this.menuLoading = false;
      this.renderList = e;
      this.queryDisplayboardList(1);
    });
  },
  methods: {
    remove() {
      let tab = this.tableColumn;
      let renderList = this.renderList;
      Object.assign(this.$data, this.$options.data.call(this));
      this.renderList = renderList;
      this.menuLoading = false;
      this.tabColumnChange(tab);
      this.queryDisplayboardList(1);
    },
    distributeEvent(e, id) {
      var that = this;
      console.log("hhhhhhhhhhhhhhhhhh", id);
      util.openPage.call(this, {
        name: "houseDetails",
        params: { houseId: id }
      });
    },
    tabColumnChange(e, length = 0) {
      this.tableColumn = e;
      if (length > 0) {
        let prop = e.map(item => {
          return { prop: item.prop };
        });
        tableMenu.insert(prop, 3);
      }
    },
    sortMethod(e) {
      console.log();
      this.sortColumn = e.prop;
      this.sortType = e.order;
      this.querySaleNotTrack(1);
    },
    // queryTabData() {
    //   console.log(this, "111");
    // },
    queryDisplayboardListParams() {
      this.queryDisplayboardList(1);
    },
    queryDisplayboardList(currentPage) {
      var that = this;
      let params = { limit: that.pageJson.size + "", page: currentPage + "" };
      params.dispalyname = that.queryData.dispalyname;
      params.id = that.id;

      console.log(params);
      this.$apiReport
        .post({
          url: "/xjwreport/displayboard/dataList",
          data: JSON.stringify(params),
          token: false
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.pagetotal;
            that.pageJson.currentPage = currentPage;
            let columns = data.data.columns;
            that.tableColumnField = [];
            for (var i = 0; i < columns.length; i++) {
              let ColumnField = {
                prop: columns[i].column,
                label: columns[i].name,
                width: "170",
                order: false,
                disabled: false,
                default: true
              };
              that.tableColumnField.push(ColumnField);
            }
            that.tableData = data.data.list;
            console.log(that.tableColumnField, " that.tableColumnField");
            this.$forceUpdate();
          }
        })
        .catch(e => {
          console.log("查询列表失败");
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toEdit(id) {
      var that = this;
      that.$router.push({
        path: "/report/addReport",
        query: { id: id }
      });
    },
    toDelete(id) {
      var that = this;
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$apiReport
            .delete({
              url: "/xjwreport/displayboard/conf",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              token: false,
              // qs: true,
              data: JSON.stringify({ id: id })
            })
            .then(e => {
              if (e.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                that.queryDisplayboardList(that.pageJson.currentPage);
              } else {
                this.$message.error("提交失败，请检查数据或联系管理员！");
              }
            });
        })
        .catch(() => {});
    },
    isForBut(type) {
      let array = [{ name: "查看", isType: "3", methosName: "" }];
      return array.filter(item => {
        return item.isType.includes(type);
      });
    },
    //跳转页面
    navToPath(path) {
      this.$router.push({ path: path });
    },
    handleDbclick(row) {
      var that = this;
      that.$router.push({
        path: "/buySellSystem/checkFloorList",
        query: { id: row.id }
      });
    },
    handleClick() {
      return false;
    },
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);

      this.queryDisplayboardListParams();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryDisplayboardList(val);
    },
    handleSizeChange(val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.size = val;
      this.queryDisplayboardList(1);
    }
  }
};
</script>
