<style lang="less" scoped>
.page-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div class="page-content">
    <list-page :parentData="$data"
               @handleSizeChange="handleSizeChange"
               @handleCurrentChange="querylist">
      <template v-slot:top>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">楼盘</h3>
            <el-select v-model="queryData.CommunityName"
                       @focus="remoteCommunityFoucus"
                       @change="querylist(null)"
                       filterable
                       remote
                       clearable
                       placeholder="楼盘名称"
                       :remote-method="remoteCommunity"
                       :loading="communitySelect.loading">
              <el-option v-for="item in communitySelect.list"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value"></el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">业主</h3>
            <el-input placeholder="姓名"
                      class="set-input120"
                      v-model="queryData.Customers"
                      clearable />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">电话</h3>
            <el-input placeholder="业主电话"
                      v-number
                      v-model="queryData.tel"
                      class="set-input200"
                      clearable />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">录入时间</h3>
            <el-date-picker v-model="queryData.timeSelect"
                            type="daterange"
                            class="set-data-pricker"
                            range-separator="至"
                            start-placeholder="开始日期"
                            :default-time="['00:00:00', '23:59:59']"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </div>
          <!-- <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">房源类型</h3>
            <el-select clearable
                       placeholder="房源类型"
                       class="set-select110"
                       v-model="queryData.houseStates">
              <el-option v-for="item in houseStatesList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div> -->
          <div class="query-content-cell cell-interval45">
            <el-button type="primary"
                       size="mini"
                       @click="querylist(null)">查询</el-button>
          </div>
        </div>
      </template>
      <template v-slot:tableColumn>
        <el-table-column v-for="item in tableDataColumn"
                         :key="item.prop"
                         :label="item.label"
                         :width="item.width"
                         :formatter="item.formart"
                         show-overflow-tooltip
                         :prop="item.prop">
        </el-table-column>
        <el-table-column label="操作"
                         width="150"
                         fixed="right">
          <template v-slot="scope">
            <!-- <div v-if="scope.row.operation!=''"> -->
            <el-button type="primary"
                       size="mini"
                       @click="toLook(scope.row.id)">查看</el-button>
            <!-- </div> -->
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>
<script>
import listPage from "@/components/listPage";
import houseContrast from "@/minxi/houseContrast";
import getMenuRid from "@/minxi/getMenuRid";
export default {
  mixins: [getMenuRid, houseContrast],
  components: {
    listPage,
    houseContrast
  },
  data () {
    return {
      loading: false, //控制表格加载动画提示
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [
        { prop: "houseNo", label: "房源编号", width: "" },
        { prop: "communityName", label: "楼盘名称", width: "" },
        { prop: "price", label: "售价(万元)", width: "160" },
        { prop: "inArea", label: "面积(m²)", width: "160" },
        {
          label: "单价(元/㎡)",
          width: "160",
          prop: "unitPrice",
        },
        {
          prop: "hall",
          label: "户型",
          width: "170",
          formart: item =>
            (item.rooms == null ? "0" : item.rooms) + "室" + (item.hall == null ? "0" : item.hall) + "厅" + (item.toilet == null ? "0" : item.toilet) + "卫"
        },
        { prop: "decoration", label: "装修程度", width: "160" },
        { prop: "addTime", label: "录入时间" }
      ],
      tableData: [],
      communitySelect: {
        loading: false,
        list: []
      },
      houseStatesList: [
        { value: "选项1", label: "全部" },
        { value: "选项2", label: "待验真" },
        { value: "选项3", label: "客户验真" },
        { value: "选项4", label: "店长验真" },
        { value: "选项5", label: "验真失败" },
        { value: "选项6", label: "已过期" }
      ],
      queryData: {
        CommunityName: "",
        Customers: "",
        tel: "",
        timeSelect: [],
        houseStates: ""
      }
    };
  },
  created () {
    this.querylist();
  },
  methods: {
    remoteCommunityFoucus () {
      if (this.communitySelect.list.length == 0) {
        this.remoteCommunity();
      }
    },
    remoteCommunity (query = "") {
      this.communitySelect.loading = true;
      this.$api
        .get({
          url: "/community/newAddHouse",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            communityName: query,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.communitySelect.list = e.data.data.list;
          }
        })
        .finally(() => {
          this.communitySelect.loading = false;
        });
    },
    handleSizeChange () {
      this.pageJson.pageSize = e;
      this.querylist();
    },
    querylist (currentPage) {
      let _that = this;
      let params = {
        limit: _that.pageJson.pageSize,
        page: currentPage || 1,
        beginTime: _that.queryData.timeSelect != null ? _that.queryData.timeSelect[0] : "" || "",
        endTime: _that.queryData.timeSelect != null ? _that.queryData.timeSelect[1] : "" || "",
        tel: _that.queryData.tel,
        comId: _that.queryData.CommunityName,
        customName: _that.queryData.Customers,
        type: 3,
        title: "新增房源",
        sortColumn: "id",
        sortType: "descending"
      };
      this.loading = true;
      this.$api
        .get({
          url: "/mateHouse/getMateHouse/addHouse",
          data: params
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.pageJson.total = result.data.dataCount;
            this.tableData = result.data.data;
          } else {
            return Promise.reject(result.message);
          }
        })
        .catch(e => {
          this.$message.error(e.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toLook (id, dept) {
      var that = this;
      that.$router.push({ name: "houseDetails", params: { houseId: id, dept: dept } });
    },
  }
};
</script>