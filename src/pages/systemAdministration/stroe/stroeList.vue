<style lang="less" scoped>
.query-cell {
  padding: 15px 0;
  display: flex;
  align-items: center;
  .query-right {
    flex: 1;
    text-align: right;
    padding-right: 20px;
    /deep/.el-input {
      width: auto;
    }
  }
}
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
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:top>
        <div class="query-cell">
          <el-button
            type="primary"
            size="mini"
            @click="toAddStroePage"
            v-if="showList"
            >添加</el-button
          >
          <el-button type="primary" size="mini" @click="queryStroeDatas(1)"
            >实体店面</el-button
          >
          <el-button type="primary" size="mini" @click="queryStroeDeptDatas(1)"
            >行政小组</el-button
          >
          <div class="query-right">
            <el-input
              placeholder="门店名/部门/小组"
              size="small"
              v-model="queryData.keyWord"
              clearable
            >
            </el-input>
            <el-button type="primary" size="mini" @click="queryStroeByParams"
              >查询</el-button
            >
          </div>
        </div>
      </template>
      <template v-slot:tableColumn="cell">
        <template v-for="item in cell.tableData">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :key="item.prop"
          ></el-table-column>
        </template>
        <el-table-column label="操作" fixed="right">
          <template v-slot="scope">
            <div v-if="scope.row.operation != ''">
              <el-button
                type="primary"
                size="mini"
                @click="distributeEvent(item.methosName, scope.row.id)"
                v-for="(item, index) in getOpeBtns(scope.row.operation)"
                :key="index"
                >{{ item.name }}</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </list-page>
  </div>
</template>

<script>
import listPage from "@/components/listPage";
import getMenuRid from "@/minxi/getMenuRid";
import getToken from "@/minxi/getUrlToken";
export default {
  mixins: [getMenuRid, getToken],

  components: {
    listPage
  },

  data() {
    return {
      sidebarFlag: false,
      showList: true,
      loading: false, //控制表格加载动画提示
      queryData: {
        keyWord: "" //查询关键字:以门店名/部门/小组为条件
      },
      configSet: {
        selectToTime: false,
        selectTo: false
      },
      pageJson: {
        currentPage: 1, //当前页码
        total: 9, //总记录数
        pageSize: 10 //每页条数
      },
      tableDataColumn: [],
      tableData: []
    };
  },
  mounted() {
    this.queryStroeDatas(1);
  },
  methods: {
    queryStroeByParams() {
      this.queryStroeDatas(1);
    },
    queryStroeDatas(currentPage) {
      this.showList = true;
      this.tableData = [];
      this.tableDataColumn = [
        //{ prop: "id", label: "门店id", width: "70px" },
        { prop: "storeName", label: "店面", width: "165px" },
        { prop: "flagSale", label: "职务", width: "150px" },
        { prop: "shoreAddress", label: "地址" },
        { prop: "shoreTel", label: "电话" },
        { prop: "shoreType", label: "类型", width: "165px" },
        { prop: "storeDesc", label: "描述" },
        { prop: "regDate", label: "开业时间" }
      ];
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      if (this.queryData.keyWord != null) {
        params.keyWord = this.queryData.keyWord;
      }
      this.$api
        .post({
          url: "/stroe/list",
          data: params,
          token: false,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            if (result.data.list != null && result.data.list.length > 0) {
              for (var i = 0; i < result.data.list.length; i++) {
                switch (result.data.list[i].flagSale) {
                  case "0":
                    result.data.list[i].flagSale = "文职";
                    break;
                  case "1":
                    result.data.list[i].flagSale = "职务";
                    break;
                }
                switch (result.data.list[i].shoreType) {
                  case 0:
                    result.data.list[i].shoreType = "加盟店";
                    break;
                  case 1:
                    result.data.list[i].shoreType = "直营店";
                    break;
                }
                switch (result.data.list[i].shoreTel) {
                  case 0:
                    result.data.list[i].shoreTel = "暂无电话";
                    break;
                }
              }
              this.pageJson.total = result.data.totalCount;
              this.pageJson.currentPage = result.data.currPage;
              this.tableData = result.data.list;
            } else {
              this.$alert("", "请检查你的权限范围!!!", {
                dangerouslyUseHTMLString: false
              });
            }
          } else {
            console.log("查询门店管理列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询门店管理列表失败");
          console.log(e);
        });
    },
    queryStroeDeptDatas(currentPage) {
      this.showList = false;
      this.tableData = [];
      this.tableDataColumn = [
        //{ prop: "id", label: "门店ID" },
        { prop: "deptName", label: "小组" },
        { prop: "storeName", label: "店面", width: "165px" },
        { prop: "shoreAddress", label: "地址" },
        { prop: "shoreTel", label: "电话" },
        { prop: "flagSale", label: "职务", width: "120px" },
        { prop: "shoreType", label: "类型" },
        { prop: "storeDesc", label: "描述" },
        { prop: "regDate", label: "开业时间" }
      ];
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      if (this.queryData.keyWord != null) {
        params.keyWord = this.queryData.keyWord;
      }
      this.$api
        .post({
          url: "/stroe/deptList",
          data: params,
          token: false,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            if (result.data.list != null && result.data.list.length > 0) {
              for (var i = 0; i < result.data.list.length; i++) {
                switch (result.data.list[i].flagSale) {
                  case "0":
                    result.data.list[i].flagSale = "文职";
                    break;
                  case "1":
                    result.data.list[i].flagSale = "职务";
                    break;
                }
                switch (result.data.list[i].shoreType) {
                  case 0:
                    result.data.list[i].shoreType = "加盟店";
                    break;
                  case 1:
                    result.data.list[i].shoreType = "直营店";
                    break;
                }
              }
              this.pageJson.total = result.data.totalCount;
              this.pageJson.currentPage = result.data.currPage;
              this.tableData = result.data.list;
            }
          } else {
            console.log("查询门店管理列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询门店管理列表失败");
          console.log(e);
        });
    },
    toAddStroePage() {
      this.$router.push({ path: "/sys/addStroe" });
    },
    editStroe(id) {
      this.$router.push({ path: "/sys/editStroe", query: { id: id } });
    },
    delStroe(id) {
      this.$api
        .post({
          url: "/stroe/del/" + id,
          token: false,
          headers: { "Content-Type": "application/json" }
        })
        .then(e => {
          let result = e.data;
          if (result.code == 200) {
            this.$alert("", "删除成功", {
              dangerouslyUseHTMLString: false
            });
            this.$router.push({ path: "/sys/stroeList" });
          }
        })
        .catch(e => {
          console.log("删除失败");
          console.log(e);
        });
    },
    distributeEvent(e, id) {
      this[e](id);
    },
    // querySubsidiary(StroeId){
    //   this.queryStroeDatas(1,StroeId);
    // },
    getOpeBtns() {
      let array = [];
      if (this.showList) {
        array = [
          { name: "详情", isType: "1", methosName: "openDetails" },
          { name: "编辑", isType: "1", methosName: "editStroe" },
          { name: "删除", isType: "1", methosName: "delStroe" }
        ];
      } else {
        array = [{ name: "详情", isType: "1", methosName: "openDetails" }];
      }

      // return array.filter((item) => {
      //   return item.isType.includes(type)
      // })
      return array;
    },
    handleSizeChange(val) {
      console.log(`设置了每页 ${val} 条`);
      this.pageJson.pageSize = val;
      if (this.showList) {
        this.queryStroeDatas(1);
      } else {
        this.queryStroeDeptDatas(1);
      }
    },
    handleCurrentChange(val) {
      if (this.showList) {
        this.queryStroeDatas(val);
      } else {
        this.queryStroeDeptDatas(val);
      }
    },
    openDetails(row) {
      console.log(row);

      this.$router.push({ path: "detailsStroe", query: { id: row } });
    }
  }
};
</script>
