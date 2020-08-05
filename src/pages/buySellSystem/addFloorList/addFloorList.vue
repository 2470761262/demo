<style lang="less" scoped>
.page-row-flex {
  display: flex;
  flex-direction: column;
  height: 100%;
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
    >
      <template v-slot:top>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">楼盘名称</h3>
            <el-input
              placeholder="楼盘名称"
              v-model="queryData.houseName"
              class="set-input120"
              clearable
            >
            </el-input>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">手机号</h3>
            <el-input
              placeholder="手机号"
              v-model="queryData.brokerPhone"
              class="set-input200"
              clearable
            >
            </el-input>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">提交人</h3>
            <el-input
              placeholder="提交人"
              v-model="queryData.brokerName"
              class="set-input120"
              clearable
            >
            </el-input>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">类型</h3>
            <el-select
              v-model="queryData.type"
              placeholder="类型"
              class="set-select150"
              clearable
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <h3 class="query-cell-title">审核状态</h3>
            <el-select
              v-model="queryData.isCheck"
              placeholder="审核"
              class="set-select150"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <span class="query-cell-suffix handlebut" @click="remove"
              >清除</span
            >
          </div>
          <div class="query-content-cell cell-interval75">
            <el-button
              type="primary"
              size="mini"
              @click="queryAddFloorListParams"
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
        <template v-for="item in tableColumn">
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
        <el-table-column label="操作" fixed="right" min-width="150">
          <template v-slot="scope">
            <el-button type="primary" :disabled="scope.row.isCheck" size="mini" @click="toCheck(scope.row.id)"
              >审核</el-button
            >
          </template>
        </el-table-column>
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
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "待审核"
        },
        {
          value: "1",
          label: "审核通过"
        },
        {
          value: "2",
          label: "审核不通过"
        }
      ],
      typeOptions: [
        // {
        //   value: "0",
        //   label: "材料"
        // },
        {
          value: "1",
          label: "面积"
        },
        {
          value: "2",
          label: "房型"
        },
        // {
        //   value: "3",
        //   label: "业主号码"
        // },
        {
          value: "4",
          label: "楼盘补充"
        }
      ],
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
        pageSize: 10 //每页条数
      },
      elTabs: {
        activeName: "tab1",
        list: [
          { label: "全部", name: "tab1" },
          { label: "待审核", name: "tab2" },
          { label: "审核通过", name: "tab3" },
          { label: "审核失败", name: "tab4" }
        ]
      },
      tableColumnField: [
        {
          prop: "communityName",
          label: "小区名称",
          width: "170",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "comBuildingName",
          label: "楼栋号",
          order: false,
          width: "150",
          disabled: true,
          default: true
        },
        {
          prop: "buildIngHouses",
          label: "房间号",
          width: "90",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "brokerName",
          label: "经纪人",
          width: "110",
          order: false,
          disabled: true,
          default: true
        },
        {
          prop: "brokerPhone",
          label: "电话",
          width: "110",
          order: false,
          disabled: false,
          default: true
        },
        {
          prop: "addTime",
          label: "添加时间",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "type",
          label: "类型",
          width: "120",
          order: true,
          disabled: false,
          default: true,
          formart: item => this.formatType(item.type)
        },
        {
          prop: "value",
          label: "数据",
          width: "120",
          order: true,
          disabled: false,
          default: true
        },
        {
          prop: "isCheck",
          label: "审核状态",
          width: "120",
          order: true,
          disabled: false,
          default: true,
          formart: item => this.formatCheck(item.isCheck)
        }
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
    tableMenu.getTableMenu(this.tableColumnField, 11).then(e => {
      this.menuLoading = false;
      this.renderList = e;
      this.queryAddFloorList(1);
    });
  },
  methods: {
    formatCheck(isCheck) {
      switch (isCheck) {
        case 0:
          return "待审核";
        case 1:
          return "审核成功";
        case 2:
          return "审核失败";
        default:
          return "其他";
      }
    },
    formatType(type) {
      switch (type) {
        case 0:
          return "材料";
        case 1:
          return "面积";
        case 2:
          return "房型";
        case 3:
          return "业主号码";
        case 4:
          return "楼盘补充";
        default:
          return "其他";
      }
    },
    remove() {
      let tab = this.tableColumn;
      let renderList = this.renderList;
      Object.assign(this.$data, this.$options.data.call(this));
      this.renderList = renderList;
      this.menuLoading = false;
      this.tabColumnChange(tab);
      this.queryAddFloorList(1);
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
    queryAddFloorListParams() {
      this.queryAddFloorList(1);
    },
    queryAddFloorList(currentPage) {
      var that = this;
      let params = { limit: that.pageJson.pageSize, page: currentPage };
      params.communityName = that.queryData.houseName;
      params.brokerName = that.queryData.brokerName;
      params.brokerPhone = that.queryData.brokerPhone;
      params.beginTime = that.queryData.timeSelect[0];
      params.endTime = that.queryData.timeSelect[1];
      params.isCheck = that.queryData.isCheck;
      params.type = that.queryData.type;

      console.log(params);
      this.$api
        .get({
          url: "/CommunityReplenish/getCommunityReplenishList",
          data: params,
          token: false
        })
        .then(e => {
          console.log(e.data);
          let data = e.data;
          if (data.code == 200) {
            that.pageJson.total = data.data.totalCount;
            that.pageJson.currentPage = data.data.currPage;
            that.tableData = data.data.list;
          }
        })
        .catch(e => {
          console.log("查询新增房源列表失败");
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toCheck(id) {
      var that = this;
      that.$router.push({
        path: "/buySellSystem/checkFloorList",
        query: { id: id }
      });
    },
    isForBut(type) {
      let array = [{ name: "查看", isType: "3", methosName: "" }];
      return array.filter(item => {
        return item.isType.includes(type);
      });
    },
    handleClick() {},
    queryTabData() {
      this.$emit("queryTabData");
      console.log(this.queryData);

      this.queryAddFloorListParams();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryAddFloorList(val);
    },
    handleSizeChange(val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryAddFloorList(1);
    }
  }
};
</script>
