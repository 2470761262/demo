<template>
  <list-page
    :parentData="$data"
    @handleSizeChange="sizeChange"
    @handleCurrentChange="currentChange"
  >
    <template v-slot:top>
      <div class="query-cell">
        <el-input placeholder="关键字" size="small" v-model="queryData.keyword" clearable>
          <template slot="prepend">关键字</template>
        </el-input>
        <el-button type="primary" style="margin-left:10px" size="mini" @click="queryByParams">查询</el-button>
        <el-button type="primary" style="margin-left:10px" size="mini" @click="addDocument">添加</el-button>
      </div>
    </template>
    <template v-slot:tableColumn="cell">
      <template v-for="item in cell.tableData">
        <el-table-column
          v-if="!item.show"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="downStr"
        ></el-table-column>
      </template>
      <el-table-column label="操作"></el-table-column>
    </template>
  </list-page>
</template>
<script>
import listPage from "@/components/listPage";
export default {
  components: {
    listPage
  },
  data() {
    return {
      loading: false,
      queryData: {
        keyword: ""
      },
      pageJson: {
        currentPage: 1,
        pageSize: 5
      },
      tableDataColumn: [
        { prop: "id", label: "id", show: true },
        { prop: "title", label: "标题", show: false },
        { prop: "addPer", label: "添加人", show: false },
        { prop: "unitName", label: "单位", show: false },
        { prop: "addTime", label: "添加时间", show: false },
        { prop: "remark", label: "备注", show: false },
        { prop: "filePath", label: "文档地址", show: false }
      ],
      tableData: []
    };
  },
  mounted() {
    this.queryPcManagementDatas(1);
  },
  methods: {
    queryPcManagementDatas(currentPage) {
      let params = { limit: this.pageJson.pageSize, page: currentPage };
      let that = this;
      if (this.queryData.keyword != null) {
        params.keyword = this.queryData.keyword;
      }

      this.$api
        .post({
          url: "/document/list",
          data: params,
          qs: true
        })
        .then(e => {
          console.log(e.data);
          let result = e.data;
          if (result.code == 200) {
            console.log(result.message);
            console.log(result.data);
            this.pageJson.total = result.data.totalCount;
            this.pageJson.currentPage = result.data.currPage;
            this.tableData = result.data.list;
          } else {
            console.log("查询文档列表结果：" + result.message);
            alert(result.message);
          }
        })
        .catch(e => {
          console.log("查询文档列表失败");
          console.log(e);
        });
    },
    sizeChange(val) {
      console.log("每页 ${val} 条数据");
      this.pageJson.pageSize = val;
      this.queryPcManagementDatas(1);
    },
    currentChange(val) {
      this.queryPcManagementDatas(val);
    },
    queryByParams() {
      this.queryPcManagementDatas(1);
    },
    downStr(row, column) {
      if (column.property == "filePath") {
        //return row.filePath;
        return (
          <a href={row.filePath} target="_blank">
            点击下载
          </a>
        );
      }
      if (column.property == "unitName") {
        return row[column.property].trim().replace(/>$/, "");
      }
      return row[column.property];
    },
    addDocument() {
      this.$router.push({ path: "/sys/document/edit" });
    }
  }
};
</script>