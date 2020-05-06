<style lang="less" scoped>
.page-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<template>
  <div class="page-content">
    <list-page
      :parentData="$data"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="querylist"
    >
      <template v-slot:top>
        <div class="page-list-query-row">
          <div class="query-content-cell">
            <h3 class="query-cell-title">楼盘</h3>
            <el-select
              v-model="queryData.CommunityName"
              @focus="remoteCommunityFoucus"
              remote
              clearable
              placeholder="楼盘名称"
              @change="querylist(null)"
              :remote-method="remoteCommunity"
              :loading="communitySelect.loading"
            >
              <el-option
                v-for="item in communitySelect.list"
                :key="item.value"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval75">
            <h3 class="query-cell-title">业主</h3>
            <el-input
              placeholder="姓名"
              @change="querylist(null)"
              class="set-input120"
              v-model="queryData.Customers"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">电话</h3>
            <el-input
              placeholder="业主电话"
              v-number
              @change="querylist(null)"
              v-model="queryData.tel"
              class="set-input200"
              clearable
            />
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">录入时间</h3>
            <el-date-picker
              v-model="queryData.timeSelect"
              type="daterange"
              class="set-data-pricker"
              range-separator="至"
              @change="querylist(null)"
              start-placeholder="开始日期"
              :default-time="['00:00:00', '23:59:59']"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="query-content-cell cell-interval45">
            <h3 class="query-cell-title">房源类型</h3>
            <el-select
              clearable
              placeholder="房源类型"
              class="set-select110"
              v-model="queryData.houseStates"
            >
              <el-option
                v-for="item in houseStatesList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="query-content-cell cell-interval45">
            <el-button type="primary" size="mini" @click="querylist(null)"
              >查询</el-button
            >
          </div>
        </div>
      </template>
      <template v-slot:tableColumn>
        <el-table-column
          v-for="item in tableDataColumn"
          :key="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formart"
          show-overflow-tooltip
          :prop="item.prop"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="90">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="navPage(scope.row.id)"
              >查看</el-button
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
export default {
  mixins: [getMenuRid],
  components: {
    listPage
  },
  data() {
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
          formart: item =>
            Math.round((item.price * 10000) / item.inArea) + "元/m²"
        },
        {
          prop: "hall",
          label: "户型",
          width: "170",
          formart: item =>
            item.rooms + "室" + item.hall + "厅" + item.toilet + "卫"
        },
        { prop: "decoration", label: "装修程度", width: "160" }
        // ,
        // { prop: "FollowEndTime", label: "最后带看时间", width: "160" }
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
  created() {
    this.querylist();
  },
  methods: {
    navPage(id) {
      this.$router.push({ name: "houseDetails", params: { houseId: id } });
    },
    handleSizeChange(e) {
      this.pageJson.pageSize = e;
      this.querylist();
    },
    remoteCommunityFoucus() {
      if (this.communitySelect.list.length == 0) {
        this.remoteCommunity();
      }
    },
    remoteCommunity(query = "") {
      this.communitySelect.loading = true;
      this.$api
        .post({
          url: "/concern_community/queryCommunityConcern",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: {
            comId: query,
            page: 1,
            limit: 50
          }
        })
        .then(e => {
          if (e.data.code == 200) {
            this.communitySelect.list = e.data.data;
          }
        })
        .finally(() => {
          this.communitySelect.loading = false;
        });
    },
    querylist(currentPage) {
      let _that = this;
      let params = {
        limit: _that.pageJson.pageSize,
        page: currentPage || 1,
        minFollowEndTime: _that.queryData.timeSelect[0] || "",
        maxFollowEndTime: _that.queryData.timeSelect[1] || "",
        Tel: _that.queryData.tel,
        CommunityName: _that.queryData.CommunityName,
        Customers: _that.queryData.Customers,
        houseStates: _that.queryData.houseStates
      };
      this.loading = true;
      this.$api
        .get({
          //   url: "/agent_house/doubleclick/listFollowHouse",
          url: "/mateHouse/getMateHouse/sevenDayHouse",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          data: params
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            console.log("result.code", result.code);
            this.pageJson.total = result.data.totalCount;
            this.pageJson.currentPage = result.data.currPage;
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
    }
  }
};
</script>
