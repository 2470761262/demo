
<template>
  <list-page :parentData="$data"
             @sort-change="sortMethod"
             @queryTabData="queryTabData"
             @handleClick="handleClick"
             pageName="historyDetails"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange">
    <template v-slot:top>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">楼盘</h3>
          <el-select v-model="data.comId"
                     @focus="remoteInput"
                     @change="queryCBId"
                     filterable
                     remote
                     clearable
                     placeholder="楼盘名称"
                     :remote-method="remoteMethod"
                     :loading="loading">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"></el-option>
          </el-select>
          <el-select v-model="data.cbId"
                     filterable
                     clearable
                     placeholder="楼栋"
                     @change="queryRoomNo">
            <el-option v-for="item in cbIdList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"></el-option>
          </el-select>
          <el-select v-model="data.roomNo"
                     filterable
                     @change="queryNotPhoneParams"
                     placeholder="房间号">
            <el-option v-for="item in roomNoList"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">业主</h3>
          <el-input placeholder="姓名"
                    v-model="data.customName"
                    class="set-input120"
                    @change="queryNotPhoneParams"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">电话</h3>
          <el-input placeholder="业主电话"
                    v-model="data.tel"
                    class="set-input200"
                    @change="queryNotPhoneParams"
                    clearable />
        </div>
        <div class="query-content-cell cell-interval45">
          <h3 class="query-cell-title">价格</h3>
          <el-input placeholder="最小值"
                    v-model="data.minPrice"
                    class="set-input90"
                    @change="queryNotPhoneParams"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="data.maxPrice"
                    class="set-input90"
                    @change="queryNotPhoneParams"
                    clearable />
          <span class="query-cell-suffix">万</span>
        </div>
      </div>
      <div class="page-list-query-row">
        <div class="query-content-cell">
          <h3 class="query-cell-title">面积</h3>
          <el-input placeholder="最小值"
                    v-model="data.minInArea"
                    class="set-input90"
                    @change="queryNotPhoneParams"
                    clearable />
          <span class="cut-off-rule"></span>
          <el-input placeholder="最大值"
                    v-model="data.maxInArea"
                    class="set-input90"
                    @change="queryNotPhoneParams"
                    clearable />
          <span class="query-cell-suffix">平方</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <h3 class="query-cell-title">录入时间</h3>
          <el-date-picker v-model="data.timeSelect"
                          type="daterange"
                          class="set-data-pricker"
                          @change="queryNotPhoneParams"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"></el-date-picker>
          <span class="query-cell-suffix handlebut"
                @click="Remove">清除</span>
        </div>
        <div class="query-content-cell cell-interval75">
          <el-button type="primary"
                     size="mini"
                     @click="queryNotPhoneParams">查询</el-button>
        </div>
        <div class="query-content-cell cell-interval25">
          <moreSelect @moreSelectChange="moreSelectChange"></moreSelect>
        </div>
        <div class="query-content-cell cell-interval25">
          <definitionmenu :renderList="tableDataColumn"
                          :tableColumn="tableColumn"
                          @change="tabColumnChange"></definitionmenu>
        </div>
      </div>
    </template>
    <template #tableColumn>
      <template v-for="(item) in tableColumn">
        <el-table-column :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :sortable="item.order"
                         show-overflow-tooltip
                         :sort-orders="['ascending', 'descending']"
                         :key="item.prop"></el-table-column>
      </template>
      <el-table-column prop
                       label="户型"
                       :formatter="formatHouseType"></el-table-column>
      <el-table-column label="操作"
                       fixed="right"
                       width="205">
        <template v-slot="scope">
          <el-button type="primary"
                     size="mini"
                     @click="addPhone(scope.row.bhid,scope.row.id)"
                     style="">录入号码</el-button>
          <el-button type="primary"
                     size="mini"
                     @click="toSale(scope.row.comId,scope.row.cbId,scope.row.bhId,scope.row.communityName,scope.row.buildingName,scope.row.roomNo)">转在售</el-button>
        </template>
      </el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import definitionmenu from "@/components/definitionMenu";
import moreSelect from "@/components/moreSelect";
import "@/assets/publicLess/pageListQuery.less";
export default {
  mixins: [getMenuRid],
  components: {
    listPage,
    definitionmenu,
    moreSelect
  },
  data() {
    return {
      loading: true,

      data: {
        comId: "",
        cbId: "",
        roomNo: "",
        timeSelect: "",
        customName: "",
        tel: "",
        minInArea: "",
        maxInArea: ""
      },
      options: [],
      cbIdList: [],
      roomNoList: [],
      tableColumn: [],
      moreSelect: [],
      pageJson: {
        currentPage: 1, //当前页码
        total: 0, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        {
          prop: "communityName",
          label: "小区名称",
          width: "",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "buildingName",
          label: "楼栋号",
          width: "",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "roomNo",
          label: "房间号",
          width: "",
          order: "custom",
          disabled: false,
          default: true
        },
        {
          prop: "inArea",
          label: "面积(m²)",
          width: "",
          order: "custom",
          disabled: false,
          default: true
        }
      ],
      tableData: []
    };
  },
  mounted() {
    this.queryNotPhone(1);
  },
  methods: {
    queryTabData() {
      console.log(this, "111");
    },
    tabColumnChange(e) {
      this.tableColumn = e;
    },
    moreSelectChange(e) {
      this.moreSelect = e;
      this.queryNotPhone(1, "id", "ascending");
    },
    formatHouseType(row, column) {
      if (row.Rooms != null && row.Rooms != "") {
        return row.Rooms + "室";
      } else {
        return "---";
      }
    },

    formatOrientation(row, column) {
      if (row.orientation != null && row.orientation != "") {
        return row.orientation;
      } else {
        return "---";
      }
    },
    Remove() {
      let tab = this.tableColumn;
      Object.assign(this.$data, this.$options.data.call(this));
      this.tabColumnChange(tab);
      this.queryNotPhone(1, "id", "ascending");
    },
    addPhone(id, esId) {
      console.log(id);
      this.$prompt("请输业主手机号码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d{11}$/,
        inputErrorMessage: "手机号码格式不正确"
      })
        .then(({ value }) => {
          this.$api
            .get({
              url: "/houseResource/updatePhone",
              headers: { "Content-Type": "application/json;charset=UTF-8" },
              token: false,
              qs: true,
              data: {
                id: id,
                tel: value,
                esId: esId
              }
            })
            .then(e => {
              console.log(e.data.code);
              if (e.data.code == 200) {
                // this.$router.push({ path: '/buySellSystem/notPhone' });
                this.queryNotPhone(1);
              } else {
                alert(e.data.message);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
      //that.$router.push({ path: '/buySellSystem/updatePhone', query: { "id": id } });
    },
    toSale(comId, cbId, bhId, communityName, buildingName, roomNo) {
      var that = this;
      that.$router.push({
        path: "/buySellSystem/addHouse",
        query: {
          comId: comId,
          cbId: cbId,
          bhId: bhId,
          communityName: communityName,
          buildingName: buildingName,
          roomNo: roomNo,
          flag: "potentia",
          customerName: null,
          tel: null
        }
      });
    },

    queryNotPhoneParams() {
      this.queryNotPhone(1);
    },
    remoteInput() {
      if (this.data.comId.length == 0) {
        this.remoteMethod();
      }
    },
    remoteMethod(query) {
      var that = this;
      if (query !== "") {
        that.loading = true;

        that.$api
          .get({
            url: "/community/notPhone",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            token: false,
            qs: true,
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
        that.options = [];
      }
    },
    sortMethod(e) {
      console.log(e.prop, e.order);
      this.queryNotPhone(1, e.prop, e.order);
    },
    queryCBId() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryComBuilding",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
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
      this.querySaleNotTrackParams();
    },
    queryRoomNo() {
      var that = this;
      this.$api
        .get({
          url: "/mateHouse/queryBuildIngHouses",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          token: false,
          qs: true,
          data: {
            comId: that.data.comId,
            cbId: that.data.cbId,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            that.data.roomNo = "";
            that.roomNoList = e.data.data.list;
          }
        });
      this.querySaleNotTrackParams();
    },
    queryNotPhone(currentPage, column, type) {
      var that = this;
      that.loading = true;
      let params = { limit: that.pageJson.pageSize, page: currentPage - 1 };
      if (Object.keys(this.moreSelect).length != 0) {
        for (let key in this.moreSelect) {
          if (key == "addTime" && this.moreSelect[key] !== "") {
            params.biginTime = this.moreSelect[key][0];
            params.endTime = this.moreSelect[key][1];
          } else if (key == "followTime" && this.moreSelect[key] !== "") {
            params.biginFollowTime = this.moreSelect[key][0];
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
        params.customName = that.data.customName;
        params.tel = that.data.tel;
        params.minInArea = that.data.minInArea;
        params.maxInArea = that.data.maxInArea;
      }
      if (column == "" || type == null || type == undefined) {
        params.sortColumn = "id";
      } else {
        params.sortColumn = column;
      }
      if (type == "" || type == null || type == undefined) {
        params.sortType = "descending";
      } else {
        params.sortType = type;
      }
      console.log(params);
      this.$api
        .get({
          url: "/houseResource/getNotPhone",
          data: params,
          token: false
        })
        .then(e => {
          console.log(e.data);
          that.loading = false;
          if (e.data.code == 200) {
            that.pageJson.total = e.data.data.dataCount;
            that.tableData = e.data.data.data;
          } else {
            console.log("查询无号码列表结果：" + result.message);

            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询无号码列表失败");
          console.log(e);
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
      this.queryNotPhone(1, "id", "ascending");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryNotPhone(1, "id", "ascending");
    },
    handleSizeChange(val) {
      console.log(`每1页 ${val} 条`);
      this.pageJson.pageSize = val;
      this.queryNotPhone(1, "id", "ascending");
    }
  }
};
</script>
